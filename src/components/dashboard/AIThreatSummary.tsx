import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

interface ThreatInsight {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: Date;
  category: 'geographic' | 'protocol' | 'behavioral' | 'temporal';
  confidence: number;
}

const AIThreatSummary: React.FC = () => {
  const [currentInsight, setCurrentInsight] = useState<ThreatInsight | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const threatInsights: ThreatInsight[] = [
    {
      id: '1',
      message: '🚨 In the last hour, 75% of suspicious traffic originated from Asia. SQLi attempts increased by 30%.',
      severity: 'critical',
      timestamp: new Date(),
      category: 'geographic',
      confidence: 94
    },
    {
      id: '2',
      message: '⚠️ Unusual spike in SSH brute-force attempts detected. 15 unique IPs targeting port 22.',
      severity: 'warning',
      timestamp: new Date(),
      category: 'behavioral',
      confidence: 87
    },
    {
      id: '3',
      message: '📊 HTTP traffic patterns suggest potential DDoS preparation. Monitor bandwidth closely.',
      severity: 'warning',
      timestamp: new Date(),
      category: 'protocol',
      confidence: 82
    },
    {
      id: '4',
      message: '🔍 Anomalous DNS queries detected from internal network. Possible data exfiltration attempt.',
      severity: 'critical',
      timestamp: new Date(),
      category: 'behavioral',
      confidence: 91
    },
    {
      id: '5',
      message: '📈 Peak attack hours identified: 2-4 AM UTC. Consider enhanced monitoring during this window.',
      severity: 'info',
      timestamp: new Date(),
      category: 'temporal',
      confidence: 78
    },
    {
      id: '6',
      message: '🛡️ Firewall rules successfully blocked 1,247 malicious requests in the past 30 minutes.',
      severity: 'info',
      timestamp: new Date(),
      category: 'behavioral',
      confidence: 96
    },
    {
      id: '7',
      message: '⚡ Rapid succession of failed login attempts from Russia and China. Coordinated attack likely.',
      severity: 'critical',
      timestamp: new Date(),
      category: 'geographic',
      confidence: 89
    },
    {
      id: '8',
      message: '🔐 TLS handshake anomalies suggest potential man-in-the-middle attack vectors.',
      severity: 'warning',
      timestamp: new Date(),
      category: 'protocol',
      confidence: 85
    }
  ];

  useEffect(() => {
    const generateInsight = () => {
      setIsGenerating(true);
      
      setTimeout(() => {
        const randomInsight = threatInsights[Math.floor(Math.random() * threatInsights.length)];
        const updatedInsight = {
          ...randomInsight,
          timestamp: new Date(),
          confidence: Math.max(70, Math.min(99, randomInsight.confidence + (Math.random() - 0.5) * 10))
        };
        
        setCurrentInsight(updatedInsight);
        setIsGenerating(false);
      }, 1500);
    };

    generateInsight();
    const interval = setInterval(generateInsight, 8000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400', dot: 'bg-red-500' };
      case 'warning': return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400', dot: 'bg-yellow-500' };
      case 'info': return { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500' };
      default: return { bg: 'bg-gray-500/20', border: 'border-gray-500/30', text: 'text-gray-400', dot: 'bg-gray-500' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'geographic': return '🌍';
      case 'protocol': return '📡';
      case 'behavioral': return '🧠';
      case 'temporal': return '⏰';
      default: return '🤖';
    }
  };

  if (!currentInsight) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="flex items-center justify-center h-32">
          <div className="text-muted-foreground text-sm">Generating AI insights...</div>
        </CardContent>
      </Card>
    );
  }

  const colors = getSeverityColor(currentInsight.severity);

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border-border/50 hover:border-cyber-blue/50 transition-all duration-300 ${colors.border}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <div className={`w-2 h-2 ${colors.dot} rounded-full animate-pulse`}></div>
          AI Threat Analysis
          {isGenerating && (
            <div className="ml-auto">
              <div className="w-4 h-4 border-2 border-cyber-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* AI Insight */}
        <div className={`p-3 rounded-lg ${colors.bg} ${colors.border} border transition-all duration-500`}>
          <div className="flex items-start gap-2">
            <div className="text-lg mt-0.5">
              {getCategoryIcon(currentInsight.category)}
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm text-white leading-relaxed">
                {currentInsight.message}
              </p>
              
              {/* Metadata */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Badge className={`px-2 py-0.5 ${colors.bg} ${colors.text} ${colors.border}`}>
                    {currentInsight.severity.toUpperCase()}
                  </Badge>
                  <span className="text-muted-foreground capitalize">
                    {currentInsight.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">
                      {Math.round(currentInsight.confidence)}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Confidence Meter */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>AI Confidence</span>
            <span>{Math.round(currentInsight.confidence)}%</span>
          </div>
          <div className="w-full bg-slate-800/50 rounded-full h-1.5">
            <div 
              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${currentInsight.confidence}%` }}
            ></div>
          </div>
        </div>
        
        {/* Timestamp */}
        <div className="text-xs text-muted-foreground text-center pt-1 border-t border-border/20">
          Generated: {currentInsight.timestamp.toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIThreatSummary;