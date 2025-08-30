import { useState, useEffect } from 'react';
import { Clock, Filter, Search, Shield, AlertTriangle, Zap, Bug, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatDistanceToNow, format } from 'date-fns';
import { websocketService, LiveSecurityEvent } from '@/services/websocketService';

interface TimelineEvent {
  id: string;
  timestamp: Date;
  type: 'sql_injection' | 'brute_force' | 'port_scan' | 'malware' | 'ddos' | 'xss';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source_ip: string;
  target: string;
  description: string;
  blocked: boolean;
  country?: string;
}

const eventTypeConfig = {
  sql_injection: { icon: Shield, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950', label: 'SQL Injection' },
  brute_force: { icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950', label: 'Brute Force' },
  port_scan: { icon: Search, color: 'text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-950', label: 'Port Scan' },
  malware: { icon: Bug, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-950', label: 'Malware' },
  ddos: { icon: Zap, color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950', label: 'DDoS Attack' },
  xss: { icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950', label: 'XSS Attack' }
};

const severityConfig = {
  low: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Low' },
  medium: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Medium' },
  high: { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', label: 'High' },
  critical: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'Critical' }
};

function convertSecurityEventToTimelineEvent(securityEvent: LiveSecurityEvent): TimelineEvent {
  return {
    id: securityEvent.id,
    timestamp: securityEvent.timestamp,
    type: securityEvent.type,
    severity: securityEvent.severity,
    source_ip: securityEvent.source_ip,
    target: securityEvent.target || 'Unknown',
    description: securityEvent.description,
    blocked: securityEvent.blocked,
    country: securityEvent.country
  };
}

function getEventDescription(type: string, severity: string): string {
  const descriptions = {
    sql_injection: {
      low: 'Basic SQL injection attempt detected',
      medium: 'Advanced SQL injection with union queries',
      high: 'Sophisticated blind SQL injection attack',
      critical: 'Critical SQL injection bypassing WAF'
    },
    brute_force: {
      low: 'Multiple failed login attempts',
      medium: 'Coordinated brute force attack',
      high: 'High-volume credential stuffing',
      critical: 'Distributed brute force campaign'
    },
    port_scan: {
      low: 'Basic port enumeration',
      medium: 'Stealth port scanning detected',
      high: 'Aggressive service discovery',
      critical: 'Advanced reconnaissance activity'
    },
    malware: {
      low: 'Suspicious file upload detected',
      medium: 'Malware signature match',
      high: 'Advanced persistent threat',
      critical: 'Zero-day malware detected'
    },
    ddos: {
      low: 'Elevated traffic patterns',
      medium: 'Volumetric DDoS attack',
      high: 'Application layer DDoS',
      critical: 'Multi-vector DDoS assault'
    },
    xss: {
      low: 'Basic XSS attempt blocked',
      medium: 'Stored XSS vulnerability exploit',
      high: 'DOM-based XSS attack',
      critical: 'Advanced XSS with payload obfuscation'
    }
  };
  
  return descriptions[type as keyof typeof descriptions]?.[severity as keyof typeof descriptions.sql_injection] || 'Security event detected';
}

export function AttackTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<TimelineEvent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('24h');

  useEffect(() => {
    const handleSecurityEvent = (event: LiveSecurityEvent) => {
      const timelineEvent = convertSecurityEventToTimelineEvent(event);
      setEvents(prevEvents => {
        const newEvents = [timelineEvent, ...prevEvents].slice(0, 100); // Keep only last 100 events
        return newEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      });
    };

    websocketService.on('security_event', handleSecurityEvent);
  
      return () => {
        websocketService.off('security_event', handleSecurityEvent);
      };
   }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.source_ip.includes(searchTerm) ||
        event.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(event => event.type === selectedType);
    }

    // Filter by severity
    if (selectedSeverity !== 'all') {
      filtered = filtered.filter(event => event.severity === selectedSeverity);
    }

    // Filter by time range
    const now = new Date();
    const timeRangeMs = {
      '1h': 60 * 60 * 1000,
      '24h': 24 * 60 * 60 * 1000,
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000
    };
    
    if (timeRange !== 'all') {
      const cutoff = now.getTime() - timeRangeMs[timeRange as keyof typeof timeRangeMs];
      filtered = filtered.filter(event => event.timestamp.getTime() > cutoff);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedType, selectedSeverity, timeRange]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Attack Timeline
            </CardTitle>
            <CardDescription>
              Chronological view of security events and incidents
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-sm">
            {filteredEvents.length} events
          </Badge>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-4 pt-4">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by IP, target, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {Object.entries(eventTypeConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {Object.entries(severityConfig).map(([key, config]) => (
                <SelectItem key={key} value={key}>{config.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[600px] w-full">
          <div className="space-y-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No events found matching your filters
              </div>
            ) : (
              filteredEvents.map((event, index) => {
                const EventIcon = eventTypeConfig[event.type].icon;
                const isFirstOfDay = index === 0 || 
                  format(event.timestamp, 'yyyy-MM-dd') !== format(filteredEvents[index - 1].timestamp, 'yyyy-MM-dd');
                
                return (
                  <div key={event.id}>
                    {isFirstOfDay && (
                      <div className="flex items-center gap-2 mb-4 mt-6 first:mt-0">
                        <div className="h-px bg-border flex-1" />
                        <span className="text-sm font-medium text-muted-foreground px-2">
                          {format(event.timestamp, 'EEEE, MMMM d, yyyy')}
                        </span>
                        <div className="h-px bg-border flex-1" />
                      </div>
                    )}
                    
                    <div className="flex gap-4 relative">
                      {/* Timeline line */}
                      {index < filteredEvents.length - 1 && (
                        <div className="absolute left-6 top-12 w-px h-16 bg-border" />
                      )}
                      
                      {/* Event icon */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${eventTypeConfig[event.type].bg} border-2 border-background shadow-sm`}>
                        <EventIcon className={`h-5 w-5 ${eventTypeConfig[event.type].color}`} />
                      </div>
                      
                      {/* Event content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-semibold text-sm">
                                  {eventTypeConfig[event.type].label}
                                </h4>
                                <Badge className={severityConfig[event.severity].color}>
                                  {severityConfig[event.severity].label}
                                </Badge>
                                {event.blocked && (
                                  <Badge variant="outline" className="text-green-600 border-green-600">
                                    Blocked
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-sm text-muted-foreground mb-3">
                                {event.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <strong>Source:</strong> {event.source_ip}
                                  {event.country && (
                                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                      {event.country}
                                    </Badge>
                                  )}
                                </span>
                                <span><strong>Target:</strong> {event.target}</span>
                              </div>
                            </div>
                            
                            <div className="text-right text-xs text-muted-foreground">
                              <div>{format(event.timestamp, 'HH:mm:ss')}</div>
                              <div className="mt-1">
                                {formatDistanceToNow(event.timestamp, { addSuffix: true })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}