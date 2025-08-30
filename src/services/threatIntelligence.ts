interface AbuseIPDBResponse {
  data: {
    ipAddress: string;
    isPublic: boolean;
    ipVersion: number;
    isWhitelisted: boolean;
    abuseConfidencePercentage: number;
    countryCode: string;
    countryName: string;
    usageType: string;
    isp: string;
    domain: string;
    totalReports: number;
    numDistinctUsers: number;
    lastReportedAt: string;
  };
}

interface ThreatIntelligenceData {
  ipAddress: string;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  country: string;
  countryCode: string;
  isp: string;
  domain: string;
  totalReports: number;
  lastReported: string | null;
  isWhitelisted: boolean;
  usageType: string;
  confidence: number;
}

class ThreatIntelligenceService {
  private apiKey: string;
  private baseUrl = 'https://api.abuseipdb.com/api/v2';
  private cache = new Map<string, { data: ThreatIntelligenceData; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor(apiKey?: string) {
    // Get API key from environment variables or use provided key
    this.apiKey = apiKey || import.meta.env.VITE_ABUSEIPDB_API_KEY || 'demo-api-key';
  }

  private getRiskLevel(abuseConfidence: number): 'low' | 'medium' | 'high' | 'critical' {
    if (abuseConfidence >= 75) return 'critical';
    if (abuseConfidence >= 50) return 'high';
    if (abuseConfidence >= 25) return 'medium';
    return 'low';
  }

  private isValidIP(ip: string): boolean {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  }

  private getCachedData(ip: string): ThreatIntelligenceData | null {
    const cached = this.cache.get(ip);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(ip: string, data: ThreatIntelligenceData): void {
    this.cache.set(ip, { data, timestamp: Date.now() });
  }

  async checkIP(ipAddress: string): Promise<ThreatIntelligenceData> {
    if (!this.isValidIP(ipAddress)) {
      throw new Error('Invalid IP address format');
    }

    // Check cache first
    const cachedData = this.getCachedData(ipAddress);
    if (cachedData) {
      return cachedData;
    }

    try {
      // For demo purposes, we'll simulate API responses with realistic data
      // In production, uncomment the actual API call below
      const mockData = this.generateMockData(ipAddress);
      this.setCachedData(ipAddress, mockData);
      return mockData;

      /* Actual AbuseIPDB API call (uncomment for production use):
      const response = await fetch(`${this.baseUrl}/check`, {
        method: 'GET',
        headers: {
          'Key': this.apiKey,
          'Accept': 'application/json'
        },
        params: new URLSearchParams({
          ipAddress,
          maxAgeInDays: '90',
          verbose: 'true'
        })
      });

      if (!response.ok) {
        throw new Error(`AbuseIPDB API error: ${response.status}`);
      }

      const result: AbuseIPDBResponse = await response.json();
      const data = this.transformAbuseIPDBData(result.data);
      this.setCachedData(ipAddress, data);
      return data;
      */
    } catch (error) {
      console.error('Threat intelligence lookup failed:', error);
      // Return default safe data on error
      return this.getDefaultData(ipAddress);
    }
  }

  private generateMockData(ipAddress: string): ThreatIntelligenceData {
    // Generate realistic mock data for demo purposes
    const mockCountries = [
      { code: 'US', name: 'United States' },
      { code: 'CN', name: 'China' },
      { code: 'RU', name: 'Russia' },
      { code: 'DE', name: 'Germany' },
      { code: 'GB', name: 'United Kingdom' },
      { code: 'FR', name: 'France' },
      { code: 'JP', name: 'Japan' }
    ];

    const mockISPs = [
      'Amazon Technologies Inc.',
      'Google LLC',
      'Microsoft Corporation',
      'Cloudflare Inc.',
      'Digital Ocean LLC',
      'Hetzner Online GmbH',
      'OVH SAS'
    ];

    const country = mockCountries[Math.floor(Math.random() * mockCountries.length)];
    const isp = mockISPs[Math.floor(Math.random() * mockISPs.length)];
    const abuseConfidence = Math.floor(Math.random() * 100);
    const totalReports = Math.floor(Math.random() * 50);

    return {
      ipAddress,
      riskScore: abuseConfidence,
      riskLevel: this.getRiskLevel(abuseConfidence),
      country: country.name,
      countryCode: country.code,
      isp,
      domain: isp.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com',
      totalReports,
      lastReported: totalReports > 0 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null,
      isWhitelisted: Math.random() > 0.9,
      usageType: Math.random() > 0.7 ? 'hosting' : 'isp',
      confidence: abuseConfidence
    };
  }

  private transformAbuseIPDBData(data: AbuseIPDBResponse['data']): ThreatIntelligenceData {
    return {
      ipAddress: data.ipAddress,
      riskScore: data.abuseConfidencePercentage,
      riskLevel: this.getRiskLevel(data.abuseConfidencePercentage),
      country: data.countryName || 'Unknown',
      countryCode: data.countryCode || 'XX',
      isp: data.isp || 'Unknown ISP',
      domain: data.domain || 'Unknown',
      totalReports: data.totalReports,
      lastReported: data.lastReportedAt,
      isWhitelisted: data.isWhitelisted,
      usageType: data.usageType || 'unknown',
      confidence: data.abuseConfidencePercentage
    };
  }

  private getDefaultData(ipAddress: string): ThreatIntelligenceData {
    return {
      ipAddress,
      riskScore: 0,
      riskLevel: 'low',
      country: 'Unknown',
      countryCode: 'XX',
      isp: 'Unknown ISP',
      domain: 'Unknown',
      totalReports: 0,
      lastReported: null,
      isWhitelisted: false,
      usageType: 'unknown',
      confidence: 0
    };
  }

  async checkMultipleIPs(ipAddresses: string[]): Promise<Map<string, ThreatIntelligenceData>> {
    const results = new Map<string, ThreatIntelligenceData>();
    
    // Process IPs in batches to avoid overwhelming the API
    const batchSize = 5;
    for (let i = 0; i < ipAddresses.length; i += batchSize) {
      const batch = ipAddresses.slice(i, i + batchSize);
      const promises = batch.map(ip => this.checkIP(ip));
      
      try {
        const batchResults = await Promise.all(promises);
        batch.forEach((ip, index) => {
          results.set(ip, batchResults[index]);
        });
      } catch (error) {
        console.error('Batch threat intelligence lookup failed:', error);
        // Add default data for failed IPs
        batch.forEach(ip => {
          results.set(ip, this.getDefaultData(ip));
        });
      }
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < ipAddresses.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

// Export singleton instance
export const threatIntelligenceService = new ThreatIntelligenceService();
export type { ThreatIntelligenceData };