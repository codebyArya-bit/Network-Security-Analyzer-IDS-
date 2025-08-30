import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ProtocolData {
  protocol: string;
  percentage: number;
  color: string;
  packets: number;
}

const ProtocolDistribution: React.FC = () => {
  const [protocolData, setProtocolData] = useState<ProtocolData[]>([]);

  useEffect(() => {
    const generateData = () => {
      const baseData = [
        { protocol: 'TCP', percentage: 45, color: '#3b82f6', packets: 0 },
        { protocol: 'UDP', percentage: 25, color: '#10b981', packets: 0 },
        { protocol: 'HTTP', percentage: 15, color: '#f59e0b', packets: 0 },
        { protocol: 'HTTPS', percentage: 10, color: '#8b5cf6', packets: 0 },
        { protocol: 'ICMP', percentage: 5, color: '#ef4444', packets: 0 }
      ];

      const data = baseData.map(item => {
        const variation = (Math.random() - 0.5) * 10;
        const newPercentage = Math.max(1, Math.min(60, item.percentage + variation));
        return {
          ...item,
          percentage: Math.round(newPercentage * 10) / 10,
          packets: Math.floor(Math.random() * 10000) + 1000
        };
      });

      // Normalize percentages to sum to 100
      const total = data.reduce((sum, item) => sum + item.percentage, 0);
      const normalizedData = data.map(item => ({
        ...item,
        percentage: Math.round((item.percentage / total) * 100 * 10) / 10
      }));

      setProtocolData(normalizedData);
    };

    generateData();
    const interval = setInterval(generateData, 3000);
    return () => clearInterval(interval);
  }, []);

  const renderDonutChart = () => {
    if (protocolData.length === 0) return null;

    const size = 120;
    const strokeWidth = 20;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    
    let cumulativePercentage = 0;

    return (
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {protocolData.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativePercentage * circumference / 100;
            cumulativePercentage += item.percentage;

            return (
              <circle
                key={item.protocol}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-in-out"
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.3))'
                }}
              />
            );
          })}
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-xs text-muted-foreground">Total</div>
          <div className="text-lg font-bold text-white">
            {protocolData.reduce((sum, item) => sum + item.packets, 0).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">packets</div>
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyber-blue/50 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Protocol Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Donut Chart */}
        <div className="flex justify-center">
          {renderDonutChart()}
        </div>
        
        {/* Legend */}
        <div className="space-y-2">
          {protocolData.map((item, index) => (
            <div key={item.protocol} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="font-medium text-white">{item.protocol}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  {item.packets.toLocaleString()}
                </span>
                <span className="font-bold text-white min-w-[3rem] text-right">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/20">
          Live protocol analysis • Updates every 3s
        </div>
      </CardContent>
    </Card>
  );
};

export default ProtocolDistribution;