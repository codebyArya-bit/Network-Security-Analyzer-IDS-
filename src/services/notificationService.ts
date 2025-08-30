import { toast } from 'sonner';
import { AlertTriangle, Shield, Zap, Eye, Ban, Activity } from 'lucide-react';

export interface SecurityNotification {
  id: string;
  type: 'threat' | 'attack' | 'scan' | 'breach' | 'system' | 'blocked';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  ip?: string;
  timestamp: Date;
  action?: string;
}

class NotificationService {
  private static instance: NotificationService;
  private notifications: SecurityNotification[] = [];

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private getNotificationIcon(type: SecurityNotification['type']) {
    switch (type) {
      case 'threat': return '🚨';
      case 'attack': return '⚔️';
      case 'scan': return '🔍';
      case 'breach': return '💥';
      case 'system': return '⚙️';
      case 'blocked': return '🛡️';
      default: return '📡';
    }
  }

  private getNotificationColor(severity: SecurityNotification['severity']) {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'warning': return 'warning';
      case 'info': return 'default';
      default: return 'default';
    }
  }

  showSecurityAlert(notification: Omit<SecurityNotification, 'id' | 'timestamp'>) {
    const fullNotification: SecurityNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };

    this.notifications.unshift(fullNotification);
    
    // Keep only last 50 notifications
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }

    const icon = this.getNotificationIcon(notification.type);
    const ipInfo = notification.ip ? ` from ${notification.ip}` : '';
    
    // Show toast notification with appropriate styling
    switch (notification.severity) {
      case 'critical':
        toast.error(`${icon} ${notification.title}`, {
          description: `${notification.message}${ipInfo}`,
          duration: 8000,
          action: notification.action ? {
            label: notification.action,
            onClick: () => {}
          } : undefined
        });
        break;
      case 'warning':
        toast.warning(`${icon} ${notification.title}`, {
          description: `${notification.message}${ipInfo}`,
          duration: 6000,
          action: notification.action ? {
            label: notification.action,
            onClick: () => {}
          } : undefined
        });
        break;
      case 'info':
        toast.info(`${icon} ${notification.title}`, {
          description: `${notification.message}${ipInfo}`,
          duration: 4000
        });
        break;
    }

    return fullNotification;
  }

  // Predefined security alert types
  showSQLInjectionAlert(ip: string) {
    return this.showSecurityAlert({
      type: 'attack',
      severity: 'critical',
      title: 'SQL Injection Detected',
      message: 'Malicious SQL injection attempt blocked',
      ip,
      action: 'Block IP'
    });
  }

  showBruteForceAlert(ip: string, attempts: number) {
    return this.showSecurityAlert({
      type: 'attack',
      severity: 'critical',
      title: 'Brute Force Attack',
      message: `${attempts} failed login attempts detected`,
      ip,
      action: 'Block IP'
    });
  }

  showPortScanAlert(ip: string, ports: number) {
    return this.showSecurityAlert({
      type: 'scan',
      severity: 'warning',
      title: 'Port Scan Detected',
      message: `Scanning ${ports} ports detected`,
      ip,
      action: 'Investigate'
    });
  }

  showMalwareAlert(ip: string, malwareType: string) {
    return this.showSecurityAlert({
      type: 'threat',
      severity: 'critical',
      title: 'Malware Detected',
      message: `${malwareType} malware signature found`,
      ip,
      action: 'Quarantine'
    });
  }

  showDDoSAlert(ip: string, requestCount: number) {
    return this.showSecurityAlert({
      type: 'attack',
      severity: 'critical',
      title: 'DDoS Attack Detected',
      message: `${requestCount} requests/sec from single source`,
      ip,
      action: 'Block Traffic'
    });
  }

  showSuspiciousActivityAlert(ip: string, activity: string) {
    return this.showSecurityAlert({
      type: 'threat',
      severity: 'warning',
      title: 'Suspicious Activity',
      message: activity,
      ip,
      action: 'Monitor'
    });
  }

  showSystemAlert(message: string, severity: SecurityNotification['severity'] = 'info') {
    return this.showSecurityAlert({
      type: 'system',
      severity,
      title: 'System Alert',
      message
    });
  }

  showBlockedConnectionAlert(ip: string, reason: string) {
    return this.showSecurityAlert({
      type: 'blocked',
      severity: 'info',
      title: 'Connection Blocked',
      message: reason,
      ip
    });
  }

  getRecentNotifications(limit: number = 10): SecurityNotification[] {
    return this.notifications.slice(0, limit);
  }

  clearNotifications() {
    this.notifications = [];
  }

  getNotificationCount(): number {
    return this.notifications.length;
  }

  getCriticalNotificationCount(): number {
    return this.notifications.filter(n => n.severity === 'critical').length;
  }
}

export const notificationService = NotificationService.getInstance();
export default notificationService;