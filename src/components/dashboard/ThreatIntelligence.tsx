import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, 
  Search, 
  Globe, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Server,
  MapPin,
  Loader2
} from 'lucide-react';
import { threatIntelligenceService, ThreatIntelligenceData } from '@/services/threatIntelligence';
import { useToast } from '@/hooks/use-toast';

interface ThreatIntelligenceProps {
  className?: string;
}

const RiskBadge = ({ riskLevel, score }: { riskLevel: string; score: number }) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Badge className={`${getRiskColor(riskLevel)} font-medium`}>
      {riskLevel.toUpperCase()} ({score}%)
    </Badge>
  );
};

const ThreatCard = ({ data }: { data: ThreatIntelligenceData }) => {
  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case 'medium': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'low': return <CheckCircle className="h-5 w-5 text-green-400" />;
      default: return <Shield className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <Card className="cyber-glow border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-mono text-cyber-blue">
            {data.ipAddress}
          </CardTitle>
          {getRiskIcon(data.riskLevel)}
        </div>
        <RiskBadge riskLevel={data.riskLevel} score={data.riskScore} />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Location:</span>
            </div>
            <div className="pl-6">
              <div className="font-medium">{data.country}</div>
              <div className="text-xs text-muted-foreground">{data.countryCode}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">ISP:</span>
            </div>
            <div className="pl-6">
              <div className="font-medium text-xs">{data.isp}</div>
              <div className="text-xs text-muted-foreground">{data.domain}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/50">
          <div className="text-center">
            <div className="text-lg font-bold text-cyber-blue">{data.totalReports}</div>
            <div className="text-xs text-muted-foreground">Total Reports</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-cyber-green">{data.confidence}%</div>
            <div className="text-xs text-muted-foreground">Confidence</div>
          </div>
        </div>
        
        {data.lastReported && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
            <Clock className="h-3 w-3" />
            <span>Last reported: {new Date(data.lastReported).toLocaleDateString()}</span>
          </div>
        )}
        
        {data.isWhitelisted && (
          <Alert className="border-green-500/20 bg-green-500/5">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-400 text-xs">
              This IP is whitelisted and considered safe
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export function ThreatIntelligence({ className }: ThreatIntelligenceProps) {
  const [ipAddress, setIpAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [threatData, setThreatData] = useState<ThreatIntelligenceData | null>(null);
  const [recentLookups, setRecentLookups] = useState<ThreatIntelligenceData[]>([]);
  const { toast } = useToast();

  const handleLookup = async () => {
    if (!ipAddress.trim()) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid IP address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await threatIntelligenceService.checkIP(ipAddress.trim());
      setThreatData(data);
      
      // Add to recent lookups (keep last 5)
      setRecentLookups(prev => {
        const updated = [data, ...prev.filter(item => item.ipAddress !== data.ipAddress)];
        return updated.slice(0, 5);
      });
      
      toast({
        title: "Threat Intelligence Retrieved",
        description: `Risk level: ${data.riskLevel.toUpperCase()} (${data.riskScore}%)`
      });
    } catch (error) {
      toast({
        title: "Lookup Failed",
        description: error instanceof Error ? error.message : "Failed to retrieve threat intelligence",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLookup();
    }
  };

  // Demo IPs for quick testing
  const demoIPs = [
    '8.8.8.8',
    '1.1.1.1',
    '192.168.1.1',
    '10.0.0.1'
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <Card className="cyber-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-cyber-blue" />
            <span>Threat Intelligence Lookup</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ip-input">IP Address</Label>
            <div className="flex space-x-2">
              <Input
                id="ip-input"
                type="text"
                placeholder="Enter IP address (e.g., 8.8.8.8)"
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                className="font-mono"
              />
              <Button 
                onClick={handleLookup} 
                disabled={isLoading}
                className="cyber-glow"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Quick test:</span>
            {demoIPs.map(ip => (
              <Button
                key={ip}
                variant="outline"
                size="sm"
                onClick={() => setIpAddress(ip)}
                className="text-xs font-mono"
              >
                {ip}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {threatData && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyber-blue">Threat Analysis Result</h3>
          <ThreatCard data={threatData} />
        </div>
      )}
      
      {recentLookups.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyber-blue">Recent Lookups</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentLookups.map((data, index) => (
              <ThreatCard key={`${data.ipAddress}-${index}`} data={data} />
            ))}
          </div>
        </div>
      )}
      
      <Alert className="border-cyber-blue/20 bg-cyber-blue/5">
        <Globe className="h-4 w-4 text-cyber-blue" />
        <AlertDescription className="text-cyber-blue">
          <strong>Demo Mode:</strong> This component uses simulated threat intelligence data. 
          In production, configure with a real AbuseIPDB API key for live threat data.
        </AlertDescription>
      </Alert>
    </div>
  );
}