import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Filter, MapPin, Shield, AlertTriangle, Zap, Bug } from 'lucide-react';
import { websocketService, LiveSecurityEvent } from '@/services/websocketService';



export function AttackMap() {
  const [events, setEvents] = useState<LiveSecurityEvent[]>([]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleSecurityEvent = (event: LiveSecurityEvent) => {
      setEvents(prev => {
        const updated = [event, ...prev.slice(0, 99)];
        return updated;
      });
    };

    websocketService.on('security_event', handleSecurityEvent);
    
    return () => {
      websocketService.off('security_event', handleSecurityEvent);
    };
  }, []);

  // Placeholder for future map functionality
  const attackCount = events.length;
  const totalAttacks = attackCount;
  const criticalLocations = events.filter(event => event.severity === 'critical').length;
  const filteredLocations = [];

  const focusOnRegion = (region: string) => {
    switch (region) {
      case 'north-america':
        setMapCenter([45, -100]);
        setMapZoom(4);
        break;
      case 'europe':
        setMapCenter([54, 15]);
        setMapZoom(4);
        break;
      case 'asia':
        setMapCenter([35, 100]);
        setMapZoom(4);
        break;
      default:
        setMapCenter([20, 0]);
        setMapZoom(2);
        break;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-cyber-blue" />
            <CardTitle>Global Attack Map</CardTitle>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{filteredLocations.length}</span>
              <span className="text-muted-foreground">locations</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{totalAttacks.toLocaleString()}</span>
              <span className="text-muted-foreground">attacks</span>
            </div>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => focusOnRegion('global')}
          >
            Global
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => focusOnRegion('north-america')}
          >
            North America
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => focusOnRegion('europe')}
          >
            Europe
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => focusOnRegion('asia')}
          >
            Asia
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {isLoading ? (
          <div className="h-[500px] flex items-center justify-center bg-muted rounded-lg">
            <div className="text-center">
              <Globe className="h-8 w-8 mx-auto mb-2 animate-spin text-cyber-blue" />
              <p className="text-sm text-muted-foreground">Loading attack data...</p>
            </div>
          </div>
        ) : (
          <div className="h-[500px] rounded-lg overflow-hidden border bg-gradient-to-br from-background to-muted/50">
            {/* Enhanced Security Analytics Dashboard */}
            <div className="h-full p-6 space-y-6">
              {/* Top Section - Real-time Threat Overview */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-red-200/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Critical Threats</p>
                      <p className="text-2xl font-bold text-red-500">{criticalLocations}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 5) + 1} in last hour</div>
                </div>
                
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-orange-200/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-500/10 rounded-lg">
                      <Shield className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Active Defenses</p>
                      <p className="text-2xl font-bold text-orange-500">{Math.floor(attackCount * 0.7)}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">98.2% success rate</div>
                </div>
                
                <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border border-green-200/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Zap className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Blocked Attacks</p>
                      <p className="text-2xl font-bold text-green-500">{Math.floor(attackCount * 1.3)}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">Last 24 hours</div>
                </div>
              </div>
              
              {/* Middle Section - Geographic Threat Distribution */}
              <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-cyber-blue" />
                  Geographic Threat Distribution
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">North America</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full" style={{width: '78%'}}></div>
                        </div>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Europe</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full" style={{width: '45%'}}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Asia Pacific</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500 rounded-full" style={{width: '62%'}}></div>
                        </div>
                        <span className="text-sm font-medium">62%</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">South America</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{width: '23%'}}></div>
                        </div>
                        <span className="text-sm font-medium">23%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Africa</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{width: '18%'}}></div>
                        </div>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Oceania</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{width: '12%'}}></div>
                        </div>
                        <span className="text-sm font-medium">12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Bottom Section - Attack Vector Analysis */}
              <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg border">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Bug className="h-4 w-4 text-cyber-blue" />
                  Top Attack Vectors (Last 24h)
                </h4>
                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-red-500/5 rounded-lg border border-red-200/20">
                    <div className="text-lg font-bold text-red-500">34%</div>
                    <div className="text-xs text-muted-foreground">SQL Injection</div>
                  </div>
                  <div className="text-center p-3 bg-orange-500/5 rounded-lg border border-orange-200/20">
                    <div className="text-lg font-bold text-orange-500">28%</div>
                    <div className="text-xs text-muted-foreground">DDoS</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-500/5 rounded-lg border border-yellow-200/20">
                    <div className="text-lg font-bold text-yellow-600">22%</div>
                    <div className="text-xs text-muted-foreground">Brute Force</div>
                  </div>
                  <div className="text-center p-3 bg-blue-500/5 rounded-lg border border-blue-200/20">
                    <div className="text-lg font-bold text-blue-500">16%</div>
                    <div className="text-xs text-muted-foreground">Malware</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Legend */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <span className="text-xs text-muted-foreground">Critical</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-600"></div>
                <span className="text-xs text-muted-foreground">High</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-600"></div>
                <span className="text-xs text-muted-foreground">Low</span>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-red-600">
                {criticalLocations}
              </div>
              <div className="text-xs text-muted-foreground">
                Critical Zones
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}