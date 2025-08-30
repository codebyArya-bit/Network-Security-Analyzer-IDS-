import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Activity, BarChart3 } from 'lucide-react';
import { websocketService, PacketData, ProtocolData } from '@/services/websocketService';

export function PacketGraph() {
  const [packetData, setPacketData] = useState<Array<{time: string, packets: number, bytes: number, connections: number}>>([]);
  const [protocolData, setProtocolData] = useState<Array<{protocol: string, count: number, fill: string}>>([]);

  useEffect(() => {
    // Initialize with empty data
    const initializeData = () => {
      const data = [];
      const now = new Date();
      
      for (let i = 9; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 60000);
        data.push({
          time: time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          packets: 0,
          bytes: 0,
          connections: 0
        });
      }
      
      setPacketData(data);
    };

    initializeData();

    // Listen for packet data from WebSocket
    websocketService.on('packet_data', (data: PacketData) => {
      const timeString = data.timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      
      setPacketData(prev => {
        const newData = [...prev.slice(1), {
          time: timeString,
          packets: data.packets,
          bytes: Math.floor(data.bytes / 1000), // Convert to KB for better visualization
          connections: data.connections
        }];
        return newData;
      });
    });

    // Listen for protocol data from WebSocket
    websocketService.on('protocol_data', (data: ProtocolData[]) => {
      const protocolColors = {
        'HTTP': 'hsl(210, 70%, 50%)',
        'HTTPS': 'hsl(120, 70%, 50%)',
        'TCP': 'hsl(30, 70%, 50%)',
        'UDP': 'hsl(270, 70%, 50%)',
        'ICMP': 'hsl(0, 70%, 50%)',
        'SSH': 'hsl(180, 70%, 50%)',
        'FTP': 'hsl(300, 70%, 50%)'
      };
      
      const formattedData = data.map(item => ({
        protocol: item.protocol,
        count: item.count,
        fill: protocolColors[item.protocol as keyof typeof protocolColors] || `hsl(${Math.random() * 360}, 70%, 50%)`
      }));
      
      setProtocolData(formattedData);
    });

    // Cleanup listeners on unmount
    return () => {
      websocketService.off('packet_data', () => {});
      websocketService.off('protocol_data', () => {});
    };
  }, []);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="text-cyber-blue">Network Traffic Analysis</CardTitle>
        <CardDescription>Real-time packet statistics and protocol distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="traffic" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="traffic">Traffic Flow</TabsTrigger>
            <TabsTrigger value="protocols">Protocol Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="traffic" className="space-y-4">
            <div className="h-[300px] chart-container p-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={packetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="packets" 
                    stroke="hsl(var(--cyber-blue))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--cyber-blue))', r: 5, strokeWidth: 2, stroke: 'hsl(var(--background))' }}
                    activeDot={{ r: 7, stroke: 'hsl(var(--cyber-blue))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
                    name="Packets/sec"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bytes" 
                    stroke="hsl(var(--electric-blue))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--electric-blue))', r: 5, strokeWidth: 2, stroke: 'hsl(var(--background))' }}
                    activeDot={{ r: 7, stroke: 'hsl(var(--electric-blue))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
                    name="Bytes (KB)"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="connections" 
                    stroke="hsl(var(--accent))"
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--accent))', r: 5, strokeWidth: 2, stroke: 'hsl(var(--background))' }}
                    activeDot={{ r: 7, stroke: 'hsl(var(--accent))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
                    name="Connections"
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="protocols" className="space-y-4">
            <div className="h-[300px] chart-container p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={protocolData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="protocol" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--cyber-blue))"
                    radius={[6, 6, 0, 0]}
                    name="Packet Count"
                    animationDuration={1200}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}