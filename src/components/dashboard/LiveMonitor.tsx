import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, Shield, AlertTriangle, Zap, Wifi, WifiOff } from 'lucide-react';
import { websocketService, LiveSecurityEvent } from '@/services/websocketService';

interface LiveEvent {
  id: string;
  timestamp: Date;
  type: 'attack' | 'block' | 'scan' | 'alert';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  source?: string;
}

export function LiveMonitor() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lastActivity, setLastActivity] = useState<Date>(new Date());

  const convertSecurityEventToLiveEvent = (securityEvent: LiveSecurityEvent): LiveEvent => {
    const typeMapping: Record<LiveSecurityEvent['type'], LiveEvent['type']> = {
      sql_injection: 'attack',
      brute_force: 'attack',
      port_scan: 'scan',
      malware: 'attack',
      ddos: 'attack',
      xss: 'attack'
    };

    return {
      id: securityEvent.id,
      timestamp: securityEvent.timestamp,
      type: typeMapping[securityEvent.type],
      severity: securityEvent.severity,
      message: `${securityEvent.description} from ${securityEvent.source_ip}`,
      source: securityEvent.source_ip
    };
  };

  useEffect(() => {
    // Listen for connection status
    websocketService.on('connection', (data: { status: string; timestamp: Date }) => {
      setIsConnected(data.status === 'connected');
    });

    // Listen for security events
    websocketService.on('security_event', (securityEvent: LiveSecurityEvent) => {
      const liveEvent = convertSecurityEventToLiveEvent(securityEvent);
      setEvents(prev => [liveEvent, ...prev.slice(0, 19)]); // Keep only latest 20 events
      setLastActivity(new Date());
    });

    // Set initial connection status
    setIsConnected(websocketService.getConnectionStatus());

    // Cleanup listeners on unmount
    return () => {
      websocketService.off('connection', () => {});
      websocketService.off('security_event', () => {});
    };
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'attack': return '🚨';
      case 'block': return '🛡️';
      case 'scan': return '🔍';
      case 'alert': return '⚠️';
      default: return '📊';
    }
  };

  const getEventTitle = (type: string) => {
    switch (type) {
      case 'attack': return 'Security Attack';
      case 'block': return 'Blocked Action';
      case 'scan': return 'Security Scan';
      case 'alert': return 'Security Alert';
      default: return 'Event';
    }
  };

  const getTimeSinceLastActivity = () => {
    const now = new Date();
    const diff = Math.floor((now.getTime() - lastActivity.getTime()) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Live Security Monitor
          </CardTitle>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <div className="flex items-center gap-2 text-green-500">
                <Wifi className="h-4 w-4" />
                <Badge variant="outline" className="text-green-500 border-green-500">
                  Connected
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-500">
                <WifiOff className="h-4 w-4" />
                <Badge variant="outline" className="text-red-500 border-red-500">
                  Disconnected
                </Badge>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last activity: {getTimeSinceLastActivity()}</span>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {events.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Waiting for security events...</p>
              </div>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="text-lg">{getEventIcon(event.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{getEventTitle(event.type)}</span>
                      <Badge
                        variant={event.severity === 'critical' ? 'destructive' : 
                                event.severity === 'high' ? 'destructive' :
                                event.severity === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {event.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{event.message}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{event.timestamp.toLocaleTimeString()}</span>
                      {event.source && (
                        <>
                          <span>•</span>
                          <span>{event.source}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}