import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface TrafficData {
  timestamp: string;
  packetsPerSecond: number;
  bandwidthMbps: number;
}

const TrafficOverviewGraph: React.FC = () => {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [maxPackets, setMaxPackets] = useState(0);
  const [maxBandwidth, setMaxBandwidth] = useState(0);

  // Generate mock real-time data
  useEffect(() => {
    const generateData = () => {
      const now = new Date();
      const data: TrafficData[] = [];
      
      for (let i = 29; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - i * 2000);
        const basePackets = 1000 + Math.sin(i * 0.1) * 200;
        const packets = Math.max(0, basePackets + (Math.random() - 0.5) * 400);
        const bandwidth = packets * 0.008 + Math.random() * 2;
        
        data.push({
          timestamp: timestamp.toLocaleTimeString(),
          packetsPerSecond: Math.round(packets),
          bandwidthMbps: Math.round(bandwidth * 100) / 100
        });
      }
      
      setTrafficData(data);
      setMaxPackets(Math.max(...data.map(d => d.packetsPerSecond)));
      setMaxBandwidth(Math.max(...data.map(d => d.bandwidthMbps)));
    };

    generateData();
    const interval = setInterval(generateData, 2000);
    return () => clearInterval(interval);
  }, []);

  const renderChart = () => {
    if (trafficData.length === 0) return null;

    const width = 300;
    const height = 120;
    const padding = 20;
    
    // Create SVG path for packets
    const packetsPath = trafficData.map((point, index) => {
      const x = padding + (index / (trafficData.length - 1)) * (width - 2 * padding);
      const y = height - padding - (point.packetsPerSecond / maxPackets) * (height - 2 * padding);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    // Create SVG path for bandwidth
    const bandwidthPath = trafficData.map((point, index) => {
      const x = padding + (index / (trafficData.length - 1)) * (width - 2 * padding);
      const y = height - padding - (point.bandwidthMbps / maxBandwidth) * (height - 2 * padding);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return (
      <svg width={width} height={height} className="w-full">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgb(59 130 246 / 0.1)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Packets line */}
        <path
          d={packetsPath}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        {/* Bandwidth line */}
        <path
          d={bandwidthPath}
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          className="animate-pulse"
        />
        
        {/* Data points */}
        {trafficData.map((point, index) => {
          const x = padding + (index / (trafficData.length - 1)) * (width - 2 * padding);
          const packetsY = height - padding - (point.packetsPerSecond / maxPackets) * (height - 2 * padding);
          const bandwidthY = height - padding - (point.bandwidthMbps / maxBandwidth) * (height - 2 * padding);
          
          return (
            <g key={index}>
              <circle cx={x} cy={packetsY} r="2" fill="#3b82f6" className="animate-pulse" />
              <circle cx={x} cy={bandwidthY} r="2" fill="#10b981" className="animate-pulse" />
            </g>
          );
        })}
      </svg>
    );
  };

  const currentPackets = trafficData[trafficData.length - 1]?.packetsPerSecond || 0;
  const currentBandwidth = trafficData[trafficData.length - 1]?.bandwidthMbps || 0;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyber-blue/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
          Traffic Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Current Stats */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">Packets/sec</span>
            </div>
            <div className="text-lg font-bold text-blue-400">{currentPackets.toLocaleString()}</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Bandwidth</span>
            </div>
            <div className="text-lg font-bold text-green-400">{currentBandwidth} Mbps</div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="relative">
          {renderChart()}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-blue-500"></div>
            <span>Packets</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-0.5 bg-green-500"></div>
            <span>Bandwidth</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficOverviewGraph;