import { notificationService } from './notificationService';

export interface LiveSecurityEvent {
  id: string;
  timestamp: Date;
  type: 'sql_injection' | 'brute_force' | 'port_scan' | 'malware' | 'ddos' | 'xss';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source_ip: string;
  target: string;
  description: string;
  blocked: boolean;
  country?: string;
  port?: number;
  user_agent?: string;
}

export interface PacketData {
  timestamp: Date;
  packets: number;
  bytes: number;
  connections: number;
}

export interface ProtocolData {
  protocol: string;
  count: number;
  percentage: number;
}

type EventCallback<T> = (data: T) => void;

class WebSocketService {
  private eventListeners: Map<string, EventCallback<any>[]> = new Map();
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 3000;
  private simulationIntervals: NodeJS.Timeout[] = [];

  constructor() {
    this.connect();
  }

  // Simulate WebSocket connection
  private connect() {
    // Simulate connection delay
    setTimeout(() => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      
      this.emit('connection', { status: 'connected', timestamp: new Date() });
      this.startSimulation();
    }, 1000);
  }

  private disconnect() {
    this.isConnected = false;
    this.stopSimulation();
    
    this.emit('connection', { status: 'disconnected', timestamp: new Date() });
    
    // Attempt to reconnect
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), this.reconnectInterval);
    }
  }

  private startSimulation() {
    // Simulate security events every 2-8 seconds
    const securityEventInterval = setInterval(() => {
      if (this.isConnected) {
        const event = this.generateSecurityEvent();
        this.emit('security_event', event);
        
        // Trigger notification for high/critical events
        if (event.severity === 'high' || event.severity === 'critical') {
          this.triggerNotification(event);
        }
      }
    }, Math.random() * 6000 + 2000);

    // Simulate packet data every 1-3 seconds
    const packetDataInterval = setInterval(() => {
      if (this.isConnected) {
        const packetData = this.generatePacketData();
        this.emit('packet_data', packetData);
      }
    }, Math.random() * 2000 + 1000);

    // Simulate protocol data every 5-10 seconds
    const protocolDataInterval = setInterval(() => {
      if (this.isConnected) {
        const protocolData = this.generateProtocolData();
        this.emit('protocol_data', protocolData);
      }
    }, Math.random() * 5000 + 5000);

    this.simulationIntervals = [securityEventInterval, packetDataInterval, protocolDataInterval];
  }

  private stopSimulation() {
    this.simulationIntervals.forEach(interval => clearInterval(interval));
    this.simulationIntervals = [];
  }

  private generateSecurityEvent(): LiveSecurityEvent {
    const eventTypes: Array<LiveSecurityEvent['type']> = [
      'sql_injection', 'brute_force', 'port_scan', 'malware', 'ddos', 'xss'
    ];
    const severities: Array<LiveSecurityEvent['severity']> = ['low', 'medium', 'high', 'critical'];
    const countries = ['US', 'CN', 'RU', 'BR', 'IN', 'DE', 'FR', 'UK', 'JP', 'KR'];
    
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    const sourceIp = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    
    return {
      id: `ws-event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      type,
      severity,
      source_ip: sourceIp,
      target: this.getTargetForType(type),
      description: this.getDescriptionForEvent(type, severity),
      blocked: Math.random() > 0.3,
      country: countries[Math.floor(Math.random() * countries.length)],
      port: type === 'port_scan' ? Math.floor(Math.random() * 65535) + 1 : undefined,
      user_agent: type === 'sql_injection' || type === 'xss' ? this.generateUserAgent() : undefined
    };
  }

  private generatePacketData(): PacketData {
    return {
      timestamp: new Date(),
      packets: Math.floor(Math.random() * 1000) + 500,
      bytes: Math.floor(Math.random() * 1000000) + 100000,
      connections: Math.floor(Math.random() * 100) + 50
    };
  }

  private generateProtocolData(): ProtocolData[] {
    const protocols = ['HTTP', 'HTTPS', 'TCP', 'UDP', 'ICMP', 'SSH', 'FTP'];
    const data: ProtocolData[] = [];
    let totalCount = 0;
    
    protocols.forEach(protocol => {
      const count = Math.floor(Math.random() * 500) + 50;
      totalCount += count;
      data.push({ protocol, count, percentage: 0 });
    });
    
    // Calculate percentages
    data.forEach(item => {
      item.percentage = Math.round((item.count / totalCount) * 100);
    });
    
    return data.sort((a, b) => b.count - a.count);
  }

  private getTargetForType(type: LiveSecurityEvent['type']): string {
    const targets = {
      sql_injection: ['/api/login', '/api/users', '/admin/dashboard', '/search'],
      brute_force: ['SSH:22', 'RDP:3389', '/admin/login', 'FTP:21'],
      port_scan: ['Multiple Ports', 'Port Range 1-1024', 'Common Services'],
      malware: ['Web Server', 'File Upload', 'Email Attachment'],
      ddos: ['Web Server', 'DNS Server', 'Load Balancer'],
      xss: ['/contact', '/comments', '/profile', '/search']
    };
    
    const typeTargets = targets[type];
    return typeTargets[Math.floor(Math.random() * typeTargets.length)];
  }

  private getDescriptionForEvent(type: LiveSecurityEvent['type'], severity: LiveSecurityEvent['severity']): string {
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
    
    return descriptions[type][severity];
  }

  private generateUserAgent(): string {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      'curl/7.68.0',
      'python-requests/2.25.1',
      'Wget/1.20.3'
    ];
    
    return userAgents[Math.floor(Math.random() * userAgents.length)];
  }

  private triggerNotification(event: LiveSecurityEvent) {
    switch (event.type) {
      case 'sql_injection':
        notificationService.showSQLInjectionAlert(event.source_ip);
        break;
      case 'brute_force':
        notificationService.showBruteForceAlert(event.source_ip, parseInt(event.target));
        break;
      case 'port_scan':
        notificationService.showPortScanAlert(event.source_ip, event.port || 0);
        break;
      case 'malware':
        notificationService.showMalwareAlert(event.source_ip, event.target);
        break;
      case 'ddos':
        notificationService.showDDoSAlert(event.source_ip, parseInt(event.target));
        break;
      case 'xss':
        notificationService.showSecurityAlert({
          type: 'attack',
          severity: 'critical',
          title: 'XSS Attack Detected',
          message: `Cross-site scripting attack detected from ${event.source_ip}`,
          ip: event.source_ip
        });
        break;
    }
  }

  // Public methods
  public on<T>(event: string, callback: EventCallback<T>) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)!.push(callback);
  }

  public off<T>(event: string, callback: EventCallback<T>) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  private emit<T>(event: string, data: T) {
    const listeners = this.eventListeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public forceDisconnect() {
    this.disconnect();
  }

  public forceReconnect() {
    this.disconnect();
    setTimeout(() => this.connect(), 1000);
  }

  public destroy() {
    this.stopSimulation();
    this.eventListeners.clear();
    this.isConnected = false;
  }
}

// Export singleton instance
export const websocketService = new WebSocketService();