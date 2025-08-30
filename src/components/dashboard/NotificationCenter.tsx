import { useState, useEffect } from 'react';
import { Bell, X, Shield, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { notificationService, SecurityNotification } from '@/services/notificationService';
import { formatDistanceToNow } from 'date-fns';

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<SecurityNotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Update notifications every second
    const interval = setInterval(() => {
      const recent = notificationService.getRecentNotifications(20);
      setNotifications(recent);
      setUnreadCount(notificationService.getCriticalNotificationCount());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityIcon = (severity: SecurityNotification['severity']) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <Shield className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const getSeverityColor = (severity: SecurityNotification['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'info':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-green-500/10 text-green-500 border-green-500/20';
    }
  };

  const getTypeEmoji = (type: SecurityNotification['type']) => {
    switch (type) {
      case 'threat': return '🚨';
      case 'attack': return '⚔️';
      case 'scan': return '🔍';
      case 'breach': return '💥';
      case 'system': return '⚙️';
      case 'blocked': return '🛡️';
      default: return '📡';
    }
  };

  const clearAllNotifications = () => {
    notificationService.clearNotifications();
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium">Security Notifications</CardTitle>
                <CardDescription className="text-xs">
                  {notifications.length} recent alerts
                </CardDescription>
              </div>
              {notifications.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllNotifications}
                  className="text-xs h-7 px-2"
                >
                  Clear All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <Shield className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm">No recent notifications</p>
                  <p className="text-xs">Your system is secure</p>
                </div>
              ) : (
                <div className="space-y-1 p-3">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors hover:bg-muted/50 ${
                        notification.severity === 'critical' ? 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20' :
                        notification.severity === 'warning' ? 'border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/20' :
                        'border-border bg-background'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getSeverityIcon(notification.severity)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs">{getTypeEmoji(notification.type)}</span>
                            <p className="text-sm font-medium truncate">
                              {notification.title}
                            </p>
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-1.5 py-0 ${getSeverityColor(notification.severity)}`}
                            >
                              {notification.severity}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </p>
                            {notification.ip && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                {notification.ip}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}