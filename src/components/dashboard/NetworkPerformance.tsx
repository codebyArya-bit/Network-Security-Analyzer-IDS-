import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wifi, 
  Server, 
  Activity, 
  Zap, 
  HardDrive, 
  Cpu, 
  MemoryStick,
  Network,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { websocketService, LiveSecurityEvent } from '@/services/websocketService';

interface NetworkMetrics {
  bandwidth: number;
  latency: number;
  packetLoss: number;
  throughput: number;
  connections: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export function NetworkPerformance() {
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    bandwidth: 85,
    latency: 12,
    packetLoss: 0.2,
    throughput: 1247,
    connections: 2847,
    cpuUsage: 68,
    memoryUsage: 42,
    diskUsage: 78
  });
  
  const [events, setEvents] = useState<LiveSecurityEvent[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleSecurityEvent = (event: LiveSecurityEvent) => {
      setEvents(prev => [event, ...prev.slice(0, 9)]);
      
      // Simulate network impact from security events
      if (event.severity === 'critical') {
        setMetrics(prev => ({
          ...prev,
          latency: Math.min(prev.latency + Math.random() * 5, 50),
          packetLoss: Math.min(prev.packetLoss + Math.random() * 0.5, 5)
        }));
      }
    };

    websocketService.on('security_event', handleSecurityEvent);
    
    // Simulate real-time metrics updates
    const metricsInterval = setInterval(() => {
      setMetrics(prev => ({
        bandwidth: Math.max(20, Math.min(100, prev.bandwidth + (Math.random() - 0.5) * 10)),
        latency: Math.max(1, Math.min(100, prev.latency + (Math.random() - 0.5) * 3)),
        packetLoss: Math.max(0, Math.min(5, prev.packetLoss + (Math.random() - 0.5) * 0.3)),
        throughput: Math.max(500, Math.min(2000, prev.throughput + (Math.random() - 0.5) * 100)),
        connections: Math.max(1000, Math.min(5000, prev.connections + Math.floor((Math.random() - 0.5) * 200))),
        cpuUsage: Math.max(10, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 8)),
        memoryUsage: Math.max(10, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 6)),
        diskUsage: Math.max(20, Math.min(100, prev.diskUsage + (Math.random() - 0.5) * 2))
      }));
    }, 3000);
    
    return () => {
      websocketService.off('security_event', handleSecurityEvent);
      clearInterval(metricsInterval);
    };
  }, []);

  const getStatusColor = (value: number, type: 'usage' | 'latency' | 'loss') => {
    if (type === 'usage') {
      if (value > 80) return 'text-red-500';
      if (value > 60) return 'text-orange-500';
      return 'text-green-500';
    }
    if (type === 'latency') {
      if (value > 50) return 'text-red-500';
      if (value > 20) return 'text-orange-500';
      return 'text-green-500';
    }
    if (type === 'loss') {
      if (value > 1) return 'text-red-500';
      if (value > 0.5) return 'text-orange-500';
      return 'text-green-500';
    }
    return 'text-green-500';
  };

  const getProgressColor = (value: number) => {
    if (value > 80) return 'bg-red-500';
    if (value > 60) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-cyber-blue" />
            <CardTitle>Network Performance</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <Badge variant={isOnline ? 'default' : 'destructive'} className="text-xs">
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="h-4 w-4 text-cyber-blue" />
              <span className="text-sm font-medium">Bandwidth</span>
            </div>
            <div className="text-xl font-bold">{metrics.bandwidth.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Utilization</div>
          </div>
          
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="h-4 w-4 text-cyber-blue" />
              <span className="text-sm font-medium">Latency</span>
            </div>
            <div className={`text-xl font-bold ${getStatusColor(metrics.latency, 'latency')}`}>
              {metrics.latency.toFixed(1)}ms
            </div>
            <div className="text-xs text-muted-foreground">Average</div>
          </div>
          
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingDown className="h-4 w-4 text-cyber-blue" />
              <span className="text-sm font-medium">Packet Loss</span>
            </div>
            <div className={`text-xl font-bold ${getStatusColor(metrics.packetLoss, 'loss')}`}>
              {metrics.packetLoss.toFixed(2)}%
            </div>
            <div className="text-xs text-muted-foreground">Current</div>
          </div>
          
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-cyber-blue" />
              <span className="text-sm font-medium">Throughput</span>
            </div>
            <div className="text-xl font-bold text-green-500">
              {metrics.throughput.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Mbps</div>
          </div>
        </div>
        
        {/* System Resources */}
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center gap-2">
            <Server className="h-4 w-4 text-cyber-blue" />
            System Resources
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">CPU Usage</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={metrics.cpuUsage} className="w-20" />
                <span className={`text-sm font-medium ${getStatusColor(metrics.cpuUsage, 'usage')}`}>
                  {metrics.cpuUsage.toFixed(0)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MemoryStick className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Memory Usage</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={metrics.memoryUsage} className="w-20" />
                <span className={`text-sm font-medium ${getStatusColor(metrics.memoryUsage, 'usage')}`}>
                  {metrics.memoryUsage.toFixed(0)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Disk Usage</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={metrics.diskUsage} className="w-20" />
                <span className={`text-sm font-medium ${getStatusColor(metrics.diskUsage, 'usage')}`}>
                  {metrics.diskUsage.toFixed(0)}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Connection Stats */}
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyber-blue" />
              Active Connections
            </h4>
            <Badge variant="outline" className="text-xs">
              Real-time
            </Badge>
          </div>
          <div className="text-2xl font-bold text-cyber-blue mb-1">
            {metrics.connections.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            {events.length > 0 && (
              <span className="text-orange-500">
                +{events.filter(e => e.severity === 'high' || e.severity === 'critical').length} security events detected
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}