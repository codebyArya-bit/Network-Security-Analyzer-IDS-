// Mock API functions for network security analyzer
// These will be replaced with real FastAPI endpoints in Phase 2

export interface Alert {
  id: number;
  timestamp: string;
  ip: string;
  protocol: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
  description: string;
}

export interface NetworkStats {
  timestamp: string;
  packets: number;
  bandwidth: number;
}

export interface ScanResult {
  scanId: string;
  status: 'running' | 'completed' | 'failed';
  threatsFound: number;
  duration: number;
}

export interface SystemStatus {
  connections: number;
  alerts: number;
  scanStatus: string;
  systemHealth: string;
}

// API base URL - can be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Mock data generators
const generateMockAlerts = (): Alert[] => [
  {
    id: 1,
    timestamp: new Date().toISOString(),
    ip: '192.168.1.45',
    protocol: 'TCP',
    severity: 'Critical',
    description: 'Multiple failed login attempts detected'
  },
  {
    id: 2,
    timestamp: new Date(Date.now() - 300000).toISOString(),
    ip: '10.0.1.23',
    protocol: 'HTTP',
    severity: 'High',
    description: 'SQL injection attempt blocked'
  },
  // Add more mock alerts as needed
];

const generateMockStats = (): NetworkStats[] => {
  const now = Date.now();
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(now - (23 - i) * 3600000).toISOString(),
    packets: Math.floor(Math.random() * 500) + 100,
    bandwidth: Math.floor(Math.random() * 100) + 20,
  }));
};

// Mock API functions
export const api = {
  // Fetch security alerts
  getAlerts: async (): Promise<Alert[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return generateMockAlerts();
  },

  // Fetch network statistics
  getStats: async (): Promise<NetworkStats[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return generateMockStats();
  },

  // Trigger network scan
  triggerScan: async (): Promise<ScanResult> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      scanId: `scan_${Date.now()}`,
      status: 'running',
      threatsFound: Math.floor(Math.random() * 10),
      duration: 0,
    };
  },

  // Get system status
  getSystemStatus: async (): Promise<SystemStatus> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      connections: Math.floor(Math.random() * 2000) + 1000,
      alerts: Math.floor(Math.random() * 50) + 10,
      scanStatus: 'Active',
      systemHealth: '98.5%',
    };
  },

  // Analyze log file (for Phase 5 AI integration)
  analyzeLog: async (logFile: File): Promise<{ summary: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      summary: `Analyzed ${logFile.name}: 5 SQL injection attempts detected from IP 192.168.0.14`,
    };
  },

  // Authentication endpoints (mock for Phase 1)
  login: async (username: string, password: string): Promise<{ token: string; user: any }> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (username === 'admin' && password === 'admin') {
      return {
        token: 'mock_jwt_token_' + Date.now(),
        user: {
          id: 1,
          username: 'admin',
          role: 'administrator',
        },
      };
    }
    
    throw new Error('Invalid credentials');
  },

  // Get current user info
  getCurrentUser: async (): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      id: 1,
      username: 'admin',
      role: 'administrator',
    };
  },
};

// Real API functions for Phase 2 integration
export const realApi = {
  // These will be implemented when connecting to FastAPI backend
  alerts: {
    list: () => fetch(`${API_BASE_URL}/alerts`).then(r => r.json()),
    create: (alert: Omit<Alert, 'id'>) => 
      fetch(`${API_BASE_URL}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alert),
      }).then(r => r.json()),
  },
  
  stats: {
    get: () => fetch(`${API_BASE_URL}/stats`).then(r => r.json()),
  },
  
  scan: {
    trigger: () => 
      fetch(`${API_BASE_URL}/scan`, { method: 'POST' }).then(r => r.json()),
  },
  
  auth: {
    login: (credentials: { username: string; password: string }) =>
      fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      }).then(r => r.json()),
  },
};