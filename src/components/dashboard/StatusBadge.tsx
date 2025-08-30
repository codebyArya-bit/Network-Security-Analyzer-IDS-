import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusType = 'online' | 'offline' | 'warning' | 'critical' | 'info';

interface StatusBadgeProps {
  status: StatusType;
  label: string;
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export function StatusBadge({ 
  status, 
  label, 
  animated = true, 
  size = 'md',
  showIcon = true 
}: StatusBadgeProps) {
  const getStatusConfig = (status: StatusType) => {
    switch (status) {
      case 'online':
        return {
          className: 'bg-status-low/20 text-status-low border-status-low/30',
          iconColor: 'text-status-low',
          emoji: '🟢'
        };
      case 'warning':
        return {
          className: 'bg-status-medium/20 text-status-medium border-status-medium/30',
          iconColor: 'text-status-medium',
          emoji: '🟡'
        };
      case 'critical':
        return {
          className: 'bg-status-critical/20 text-status-critical border-status-critical/30 danger-glow',
          iconColor: 'text-status-critical',
          emoji: '🔴'
        };
      case 'info':
        return {
          className: 'bg-status-info/20 text-status-info border-status-info/30',
          iconColor: 'text-status-info',
          emoji: '🔵'
        };
      case 'offline':
        return {
          className: 'bg-muted/20 text-muted-foreground border-muted/30',
          iconColor: 'text-muted-foreground',
          emoji: '⚫'
        };
      default:
        return {
          className: 'bg-muted/20 text-muted-foreground border-muted/30',
          iconColor: 'text-muted-foreground',
          emoji: '⚫'
        };
    }
  };

  const config = getStatusConfig(status);
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        config.className,
        sizeClasses[size],
        animated && status === 'critical' && 'animate-pulse',
        'transition-all duration-300 font-medium border'
      )}
    >
      {showIcon && (
        <span className="mr-1.5 inline-block">
          {config.emoji}
        </span>
      )}
      {label}
    </Badge>
  );
}