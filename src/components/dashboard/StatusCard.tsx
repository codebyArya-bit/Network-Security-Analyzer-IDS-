import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  Network, 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  TrendingDown,
  Wifi,
  Server
} from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'online' | 'offline' | 'warning' | 'critical';
}

function StatusCardItem({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  trendValue, 
  status = 'online' 
}: StatusCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'status-low';
      case 'warning':
        return 'status-medium';
      case 'critical':
        return 'status-critical';
      case 'offline':
        return 'text-muted-foreground';
      default:
        return 'status-info';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-status-low" />;
      case 'down':
        return <TrendingDown className="h-3 w-3 text-status-critical" />;
      default:
        return null;
    }
  };

  return (
    <Card className={cn(
      "cyber-glow transition-all duration-300 hover:scale-105 scale-in",
      status === 'critical' && "danger-glow animate-pulse"
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn(getStatusColor(), "transition-colors duration-200")}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-cyber-blue transition-all duration-200">
          {value}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{description}</p>
          {trend && trendValue && (
            <div className="flex items-center gap-1 slide-in">
              {getTrendIcon()}
              <span className="text-xs font-medium">{trendValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function StatusCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 fade-in"
         style={{ animationDelay: '0.1s' }}>
      <StatusCardItem
        title="Active Connections"
        value="1,247"
        description="Current network connections"
        icon={<Network className="h-4 w-4" />}
        trend="up"
        trendValue="+12%"
        status="online"
      />
      
      <StatusCardItem
        title="Security Alerts"
        value="23"
        description="Alerts in last 24h"
        icon={<AlertTriangle className="h-4 w-4" />}
        trend="down"
        trendValue="-8%"
        status="warning"
      />
      
      <StatusCardItem
        title="Scan Status"
        value="Active"
        description="Network monitoring active"
        icon={<Shield className="h-4 w-4" />}
        status="online"
      />
      
      <StatusCardItem
        title="System Health"
        value="98.5%"
        description="Overall system performance"
        icon={<Activity className="h-4 w-4" />}
        trend="up"
        trendValue="+0.3%"
        status="online"
      />
      
      <StatusCardItem
        title="Bandwidth Usage"
        value="342 MB/s"
        description="Current network throughput"
        icon={<Wifi className="h-4 w-4" />}
        trend="up"
        trendValue="+15%"
        status="online"
      />
      
      <StatusCardItem
        title="Blocked Threats"
        value="156"
        description="Threats blocked today"
        icon={<Shield className="h-4 w-4" />}
        trend="up"
        trendValue="+28%"
        status="online"
      />
      
      <StatusCardItem
        title="Server Load"
        value="62%"
        description="Average CPU utilization"
        icon={<Server className="h-4 w-4" />}
        trend="stable"
        status="online"
      />
      
      <StatusCardItem
        title="Critical Issues"
        value="2"
        description="Require immediate attention"
        icon={<AlertTriangle className="h-4 w-4" />}
        status="critical"
      />
    </div>
  );
}