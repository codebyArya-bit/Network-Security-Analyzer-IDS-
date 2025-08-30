import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface ThreatSource {
  ip: string;
  country: string;
  countryCode: string;
  attacks: number;
  severity: 'high' | 'medium' | 'low';
  lat: number;
  lng: number;
}

const TopThreatSources: React.FC = () => {
  const [threatSources, setThreatSources] = useState<ThreatSource[]>([]);

  // Generate mock threat data
  useEffect(() => {
    const mockThreatSources: ThreatSource[] = [
      {
        ip: '185.220.101.42',
        country: 'Russia',
        countryCode: 'RU',
        attacks: 1247,
        severity: 'high',
        lat: 55.7558,
        lng: 37.6176
      },
      {
        ip: '103.224.182.251',
        country: 'China',
        countryCode: 'CN',
        attacks: 892,
        severity: 'high',
        lat: 39.9042,
        lng: 116.4074
      },
      {
        ip: '45.142.214.123',
        country: 'Netherlands',
        countryCode: 'NL',
        attacks: 634,
        severity: 'medium',
        lat: 52.3676,
        lng: 4.9041
      },
      {
        ip: '198.98.51.189',
        country: 'United States',
        countryCode: 'US',
        attacks: 421,
        severity: 'medium',
        lat: 39.0458,
        lng: -76.6413
      },
      {
        ip: '91.240.118.172',
        country: 'Germany',
        countryCode: 'DE',
        attacks: 287,
        severity: 'low',
        lat: 51.1657,
        lng: 10.4515
      }
    ];

    const updateData = () => {
      const updatedSources = mockThreatSources.map(source => ({
        ...source,
        attacks: source.attacks + Math.floor(Math.random() * 10) - 5
      }));
      setThreatSources(updatedSources.sort((a, b) => b.attacks - a.attacks));
    };

    updateData();
    const interval = setInterval(updateData, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const renderMiniMap = () => {
    const width = 200;
    const height = 100;
    
    return (
      <div className="relative bg-slate-900/50 rounded-lg p-2 border border-border/30">
        <svg width={width} height={height} className="w-full">
          {/* World map outline (simplified) */}
          <defs>
            <pattern id="worldGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgb(59 130 246 / 0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#worldGrid)" />
          
          {/* Continents (simplified shapes) */}
          <path d="M20,30 Q40,25 60,35 L80,40 Q90,45 85,55 L70,60 Q50,65 30,55 Z" fill="rgb(59 130 246 / 0.2)" stroke="rgb(59 130 246 / 0.4)" strokeWidth="1" />
          <path d="M100,25 Q130,20 150,30 L170,35 Q180,40 175,50 L160,55 Q140,60 120,50 Z" fill="rgb(59 130 246 / 0.2)" stroke="rgb(59 130 246 / 0.4)" strokeWidth="1" />
          <path d="M30,70 Q50,65 70,75 L90,80 Q100,85 95,90 L80,85 Q60,80 40,85 Z" fill="rgb(59 130 246 / 0.2)" stroke="rgb(59 130 246 / 0.4)" strokeWidth="1" />
          
          {/* Threat source markers */}
          {threatSources.slice(0, 5).map((source, index) => {
            // Convert lat/lng to SVG coordinates (simplified projection)
            const x = ((source.lng + 180) / 360) * width;
            const y = ((90 - source.lat) / 180) * height;
            const intensity = source.attacks / Math.max(...threatSources.map(s => s.attacks));
            
            return (
              <g key={source.ip}>
                {/* Pulsing circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={3 + intensity * 5}
                  fill={source.severity === 'high' ? '#ef4444' : source.severity === 'medium' ? '#f59e0b' : '#10b981'}
                  opacity={0.3}
                  className="animate-ping"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={2}
                  fill={source.severity === 'high' ? '#ef4444' : source.severity === 'medium' ? '#f59e0b' : '#10b981'}
                />
                {/* Attack count label */}
                <text
                  x={x}
                  y={y - 8}
                  fontSize="8"
                  fill="white"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {source.attacks}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="absolute top-1 right-1 text-xs text-muted-foreground">
          Live Threats
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyber-blue/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          Top Threat Sources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Mini World Map */}
        {renderMiniMap()}
        
        {/* Threat Sources Table */}
        <div className="space-y-2">
          {threatSources.slice(0, 5).map((source, index) => (
            <div key={source.ip} className="flex items-center justify-between p-2 rounded-lg bg-slate-900/30 border border-border/20 hover:border-border/40 transition-colors">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="text-xs font-mono text-muted-foreground truncate">
                  {source.ip}
                </div>
                <div className="text-xs text-muted-foreground">
                  {source.countryCode}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-white">
                  {source.attacks.toLocaleString()}
                </div>
                <Badge className={`text-xs px-1.5 py-0.5 ${getSeverityColor(source.severity)}`}>
                  {source.severity}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/20">
          Total: {threatSources.reduce((sum, source) => sum + source.attacks, 0).toLocaleString()} attacks from {threatSources.length} sources
        </div>
      </CardContent>
    </Card>
  );
};

export default TopThreatSources;