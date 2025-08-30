import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  HardDrive, 
  Cpu, 
  MemoryStick, 
  Thermometer,
  Zap,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
  threshold: { warning: number; critical: number };
}

export function SystemHealth() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    {
      name: 'CPU Usage',
      value: 45,
      unit: '%',
      status: 'good',
      icon: <Cpu className="h-4 w-4" />,
      threshold: { warning: 70, critical: 90 }
    },
    {
      name: 'Memory Usage',
      value: 68,
      unit: '%',
      status: 'good',
      icon: <MemoryStick className="h-4 w-4" />,
      threshold: { warning: 80, critical: 95 }
    },
    {
      name: 'Disk Usage',
      value: 42,
      unit: '%',
      status: 'good',
      icon: <HardDrive className="h-4 w-4" />,
      threshold: { warning: 85, critical: 95 }
    },
    {
      name: 'Temperature',
      value: 58,
      unit: '°C',
      status: 'good',
      icon: <Thermometer className="h-4 w-4" />,
      threshold: { warning: 70, critical: 85 }
    },
    {
      name: 'Power Usage',
      value: 125,
      unit: 'W',
      status: 'good',
      icon: <Zap className="h-4 w-4" />,
      threshold: { warning: 200, critical: 250 }
    }
  ]);

  const [systemStatus, setSystemStatus] = useState<'healthy' | 'warning' | 'critical'>('healthy');

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => {
        const variation = (Math.random() - 0.5) * 10;
        let newValue = Math.max(0, Math.min(100, metric.value + variation));
        
        // Special handling for power usage (different scale)
        if (metric.name === 'Power Usage') {
          newValue = Math.max(80, Math.min(300, metric.value + variation * 2));
        }
        
        let status: 'good' | 'warning' | 'critical' = 'good';
        if (newValue >= metric.threshold.critical) {
          status = 'critical';
        } else if (newValue >= metric.threshold.warning) {
          status = 'warning';
        }
        
        return { ...metric, value: Math.round(newValue), status };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const criticalCount = metrics.filter(m => m.status === 'critical').length;
    const warningCount = metrics.filter(m => m.status === 'warning').length;
    
    if (criticalCount > 0) {
      setSystemStatus('critical');
    } else if (warningCount > 0) {
      setSystemStatus('warning');
    } else {
      setSystemStatus('healthy');
    }
  }, [metrics]);

  const getStatusIcon = () => {
    switch (systemStatus) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
    }
  };

  const getProgressColor = (status: 'good' | 'warning' | 'critical') => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Activity className="h-4 w-4" />
            System Health Monitor
          </CardTitle>
          <CardDescription>
            Real-time system performance metrics
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <Badge 
            variant={systemStatus === 'healthy' ? 'default' : systemStatus === 'warning' ? 'secondary' : 'destructive'}
            className="capitalize"
          >
            {systemStatus}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={metric.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {metric.icon}
                <span className="font-medium">{metric.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-mono ${getProgressColor(metric.status)}`}>
                  {metric.value}{metric.unit}
                </span>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`} />
              </div>
            </div>
            <Progress 
              value={metric.name === 'Power Usage' ? (metric.value / 300) * 100 : metric.value} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0{metric.unit}</span>
              <span>
                {metric.name === 'Power Usage' ? '300W' : '100%'}
              </span>
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {metrics.filter(m => m.status === 'good').length}
              </div>
              <div className="text-xs text-muted-foreground">Healthy</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {metrics.filter(m => m.status === 'warning').length}
              </div>
              <div className="text-xs text-muted-foreground">Warning</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {metrics.filter(m => m.status === 'critical').length}
              </div>
              <div className="text-xs text-muted-foreground">Critical</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}