import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock, 
  Unlock,
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap
} from 'lucide-react';

interface SecurityStat {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
  color: string;
}

interface ThreatLevel {
  level: string;
  count: number;
  percentage: number;
  color: string;
}

export function SecurityMetrics() {
  const [securityStats, setSecurityStats] = useState<SecurityStat[]>([
    {
      label: 'Threats Blocked',
      value: 1247,
      change: 12.5,
      trend: 'up',
      icon: <Shield className="h-4 w-4" />,
      color: 'text-green-600'
    },
    {
      label: 'Active Scans',
      value: 23,
      change: -2.1,
      trend: 'down',
      icon: <Eye className="h-4 w-4" />,
      color: 'text-blue-600'
    },
    {
      label: 'Vulnerabilities',
      value: 8,
      change: -15.3,
      trend: 'down',
      icon: <Unlock className="h-4 w-4" />,
      color: 'text-orange-600'
    },
    {
      label: 'Security Score',
      value: 94,
      change: 2.8,
      trend: 'up',
      icon: <Target className="h-4 w-4" />,
      color: 'text-green-600'
    }
  ]);

  const [threatLevels, setThreatLevels] = useState<ThreatLevel[]>([
    { level: 'Critical', count: 3, percentage: 12, color: 'bg-red-500' },
    { level: 'High', count: 8, percentage: 32, color: 'bg-orange-500' },
    { level: 'Medium', count: 12, percentage: 48, color: 'bg-yellow-500' },
    { level: 'Low', count: 2, percentage: 8, color: 'bg-green-500' }
  ]);

  const [securityEvents, setSecurityEvents] = useState([
    { time: '14:32', event: 'Malware blocked', severity: 'high' },
    { time: '14:28', event: 'Suspicious login attempt', severity: 'medium' },
    { time: '14:25', event: 'Port scan detected', severity: 'low' },
    { time: '14:22', event: 'DDoS attempt blocked', severity: 'critical' },
    { time: '14:18', event: 'Firewall rule triggered', severity: 'medium' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setSecurityStats(prev => prev.map(stat => {
        const variation = (Math.random() - 0.5) * 0.1;
        const newChange = Math.max(-20, Math.min(20, stat.change + variation));
        let newValue = stat.value;
        
        if (stat.label === 'Threats Blocked') {
          newValue = Math.max(1000, stat.value + Math.floor(Math.random() * 5));
        } else if (stat.label === 'Security Score') {
          newValue = Math.max(85, Math.min(100, stat.value + (Math.random() - 0.5)));
        } else {
          newValue = Math.max(0, stat.value + Math.floor((Math.random() - 0.5) * 3));
        }
        
        return {
          ...stat,
          value: Math.round(newValue),
          change: Math.round(newChange * 10) / 10,
          trend: newChange > 0 ? 'up' : newChange < 0 ? 'down' : 'stable'
        };
      }));
      
      // Update threat levels occasionally
      if (Math.random() < 0.3) {
        setThreatLevels(prev => prev.map(threat => ({
          ...threat,
          count: Math.max(0, threat.count + Math.floor((Math.random() - 0.5) * 2))
        })));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Activity className="h-3 w-3 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'high':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Security Metrics
        </CardTitle>
        <CardDescription>
          Real-time security performance indicators
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {securityStats.map((stat, index) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(stat.trend)}
                  <span className={`text-xs ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change > 0 ? '+' : ''}{stat.change}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Threat Level Distribution */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Threat Level Distribution
          </h4>
          <div className="space-y-2">
            {threatLevels.map((threat, index) => (
              <div key={threat.level} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{threat.level}</span>
                  <span className="text-muted-foreground">{threat.count} threats</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={threat.percentage} className="flex-1 h-2" />
                  <span className="text-xs text-muted-foreground w-8">
                    {threat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Security Events */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Recent Events
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {securityEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between text-xs p-2 rounded border">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-mono">{event.time}</span>
                  <span className="truncate">{event.event}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getSeverityColor(event.severity)}`}
                >
                  {event.severity}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}