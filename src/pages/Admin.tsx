import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  Users, 
  Shield, 
  Server, 
  Database, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  HardDrive
} from 'lucide-react';

export default function Admin() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-cyber-blue">
          System Administration
        </h2>
        <Badge variant="outline" className="status-info border-current">
          Admin Access
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="security">Security Settings</TabsTrigger>
          <TabsTrigger value="system">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Users className="h-4 w-4 text-cyber-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyber-blue">24</div>
                <p className="text-xs text-muted-foreground">Currently logged in</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Policies</CardTitle>
                <Shield className="h-4 w-4 text-status-low" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-status-low">12</div>
                <p className="text-xs text-muted-foreground">Active policies</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Server Load</CardTitle>
                <Server className="h-4 w-4 text-status-medium" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-status-medium">68%</div>
                <p className="text-xs text-muted-foreground">Average CPU usage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database Size</CardTitle>
                <Database className="h-4 w-4 text-cyber-blue" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyber-blue">2.4GB</div>
                <p className="text-xs text-muted-foreground">Total storage used</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-cyber-blue" />
                  Recent System Activities
                </CardTitle>
                <CardDescription>Latest administrative actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-4 w-4 text-status-low" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Security policy updated</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <AlertTriangle className="h-4 w-4 text-status-high" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Failed login attempt blocked</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="h-4 w-4 text-status-low" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Database backup completed</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="h-5 w-5 text-cyber-blue" />
                  System Resources
                </CardTitle>
                <CardDescription>Current resource utilization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CPU Usage</span>
                    <span>68%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-status-medium h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span>42%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-cyber-blue h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Disk Usage</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-status-high h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="cyber-glow">Add New User</Button>
                <div className="text-muted-foreground">
                  User management features will be implemented in Phase 2 with JWT authentication.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Configuration</CardTitle>
              <CardDescription>Configure security policies and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="cyber-glow">Update Security Policies</Button>
                <div className="text-muted-foreground">
                  Security configuration will be enhanced in Phase 2 with FastAPI backend integration.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Monitor and manage system performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Network Interface</h4>
                  <Badge variant="outline" className="status-low border-current">Online</Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Security Scanner</h4>
                  <Badge variant="outline" className="status-low border-current">Active</Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Log Analyzer</h4>
                  <Badge variant="outline" className="status-low border-current">Running</Badge>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Alert System</h4>
                  <Badge variant="outline" className="status-low border-current">Operational</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}