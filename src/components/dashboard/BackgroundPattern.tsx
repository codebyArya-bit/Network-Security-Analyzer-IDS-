import { useEffect, useState } from 'react';

interface DataPoint {
  x: number;
  y: number;
  opacity: number;
  size: number;
}

export function BackgroundPattern() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [networkLines, setNetworkLines] = useState<Array<{x1: number, y1: number, x2: number, y2: number, opacity: number}>>([]);

  useEffect(() => {
    // Generate random data points for background visualization
    const points: DataPoint[] = [];
    for (let i = 0; i < 50; i++) {
      points.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() * 3 + 1
      });
    }
    setDataPoints(points);

    // Generate network connection lines
    const lines = [];
    for (let i = 0; i < 20; i++) {
      lines.push({
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100,
        opacity: Math.random() * 0.2 + 0.05
      });
    }
    setNetworkLines(lines);

    // Animate data points
    const interval = setInterval(() => {
      setDataPoints(prev => prev.map(point => ({
        ...point,
        opacity: Math.random() * 0.3 + 0.1
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--cyber-blue))" strokeWidth="0.5"/>
            </pattern>
            <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--cyber-blue))" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="hsl(var(--electric-blue))" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="hsl(var(--cyber-blue))" stopOpacity="0.2"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Network Connection Lines */}
      <svg width="100%" height="100%" className="absolute inset-0">
        {networkLines.map((line, index) => (
          <line
            key={index}
            x1={`${line.x1}%`}
            y1={`${line.y1}%`}
            x2={`${line.x2}%`}
            y2={`${line.y2}%`}
            stroke="hsl(var(--cyber-blue))"
            strokeWidth="1"
            opacity={line.opacity}
            className="animate-pulse"
          />
        ))}
      </svg>

      {/* Animated Data Points */}
      <div className="absolute inset-0">
        {dataPoints.map((point, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-cyber-blue rounded-full animate-pulse"
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              opacity: point.opacity,
              width: `${point.size}px`,
              height: `${point.size}px`,
              boxShadow: `0 0 ${point.size * 2}px hsl(var(--cyber-blue) / 0.5)`
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-10 right-20 w-32 h-32 bg-cyber-blue/5 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-electric-blue/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-neon-green/5 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent animate-scan" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-cyber-blue/20" />
      <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-cyber-blue/20" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-cyber-blue/20" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-cyber-blue/20" />
    </div>
  );
}