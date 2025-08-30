import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, AlertTriangle } from 'lucide-react';

// Mock alert data
const mockAlerts = [
  {
    id: 1,
    timestamp: '2024-08-29 14:32:15',
    ip: '192.168.1.45',
    protocol: 'TCP',
    severity: 'Critical',
    description: 'Multiple failed login attempts detected'
  },
  {
    id: 2,
    timestamp: '2024-08-29 14:28:42',
    ip: '10.0.1.23',
    protocol: 'HTTP',
    severity: 'High',
    description: 'SQL injection attempt blocked'
  },
  {
    id: 3,
    timestamp: '2024-08-29 14:25:18',
    ip: '172.16.0.88',
    protocol: 'HTTPS',
    severity: 'Medium',
    description: 'Suspicious user agent detected'
  },
  {
    id: 4,
    timestamp: '2024-08-29 14:22:09',
    ip: '192.168.1.12',
    protocol: 'UDP',
    severity: 'Low',
    description: 'Unusual traffic pattern observed'
  },
  {
    id: 5,
    timestamp: '2024-08-29 14:19:33',
    ip: '203.0.113.5',
    protocol: 'ICMP',
    severity: 'Info',
    description: 'Port scan detected from external IP'
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'status-critical';
    case 'high':
      return 'status-high';
    case 'medium':
      return 'status-medium';
    case 'low':
      return 'status-low';
    default:
      return 'status-info';
  }
};

export function AlertTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [protocolFilter, setProtocolFilter] = useState('all');

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = 
      alert.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSeverity = severityFilter === 'all' || 
      alert.severity.toLowerCase() === severityFilter.toLowerCase();
    
    const matchesProtocol = protocolFilter === 'all' || 
      alert.protocol.toLowerCase() === protocolFilter.toLowerCase();

    return matchesSearch && matchesSeverity && matchesProtocol;
  });

  return (
    <Card className="col-span-3">
      <CardHeader className="pb-6">
        <div className="space-y-4">
          {/* Title and Description - Centered */}
          <div className="text-center space-y-2">
            <CardTitle className="flex items-center justify-center gap-3 text-cyber-blue text-xl">
              <AlertTriangle className="h-6 w-6" />
              Security Alerts
            </CardTitle>
            <CardDescription className="text-base">
              Real-time security event monitoring and threat detection
            </CardDescription>
          </div>
          
          {/* Search and Filter Controls - Below Title */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-72 h-11"
              />
            </div>
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-36 h-11">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={protocolFilter} onValueChange={setProtocolFilter}>
              <SelectTrigger className="w-36 h-11">
                <SelectValue placeholder="Protocol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="tcp">TCP</SelectItem>
                <SelectItem value="udp">UDP</SelectItem>
                <SelectItem value="http">HTTP</SelectItem>
                <SelectItem value="https">HTTPS</SelectItem>
                <SelectItem value="icmp">ICMP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="rounded-lg border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="border-b">
                <TableHead className="py-4 px-6 font-semibold">Timestamp</TableHead>
                <TableHead className="py-4 px-6 font-semibold">IP Address</TableHead>
                <TableHead className="py-4 px-6 font-semibold">Protocol</TableHead>
                <TableHead className="py-4 px-6 font-semibold">Severity</TableHead>
                <TableHead className="py-4 px-6 font-semibold">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => (
                <TableRow key={alert.id} className="hover:bg-muted/50 border-b last:border-b-0">
                  <TableCell className="font-mono text-sm py-4 px-6">
                    {alert.timestamp}
                  </TableCell>
                  <TableCell className="font-mono py-4 px-6">
                    {alert.ip}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge variant="outline" className="font-mono px-3 py-1">
                      {alert.protocol}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <Badge 
                      variant="outline" 
                      className={`${getSeverityColor(alert.severity)} border-current px-3 py-1`}
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate py-4 px-6">
                    {alert.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 px-6 text-muted-foreground">
            <p className="text-lg">No alerts match the current filters</p>
            <p className="text-sm mt-2">Try adjusting your search criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}