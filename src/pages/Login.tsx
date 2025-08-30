import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Lock, User, Zap, Globe, Activity, Brain, MapPin, Users, Building, Home } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Custom SecureNet Logo Component
const SecureNetLogo = () => (
  <div className="flex items-center justify-center space-x-3 mb-6">
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full blur-sm opacity-75"></div>
      <div className="relative bg-gradient-to-br from-cyber-blue via-primary to-cyber-green p-4 rounded-full">
        <Shield className="h-8 w-8 text-white" />
      </div>
    </div>
    <div className="text-left">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
        SecureNet
      </h1>
      <p className="text-sm text-muted-foreground font-medium">Analyzer</p>
    </div>
  </div>
);

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication - replace with real API call
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        toast({
          title: "Login Successful",
          description: "Welcome to the Network Security Analyzer",
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials. Try admin/admin for demo.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-darker via-background to-surface-dark" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Floating Security Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <Globe className="absolute top-20 left-20 h-6 w-6 text-cyber-blue/20 animate-bounce" style={{animationDelay: '0s'}} />
        <Zap className="absolute top-40 right-32 h-4 w-4 text-cyber-green/20 animate-bounce" style={{animationDelay: '2s'}} />
        <Shield className="absolute bottom-32 left-16 h-5 w-5 text-primary/20 animate-bounce" style={{animationDelay: '4s'}} />
      </div>
      
      <div className="flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md relative z-10 cyber-glow backdrop-blur-sm bg-card/95 border-primary/20">
            <CardHeader className="space-y-4 text-center pb-6">
              <SecureNetLogo />
              <div className="space-y-3">
                <CardTitle className="text-2xl font-bold text-foreground">
                  Welcome to SecureNet Analyzer
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Your trusted platform for real-time network security monitoring.
                  <br />
                  Protect your digital world from evolving cyber threats with AI-driven insights, intuitive dashboards, and enterprise-grade monitoring.
                </CardDescription>
                <div className="flex items-center justify-center space-x-6 pt-2">
                  <div className="flex items-center space-x-1 text-xs text-cyber-blue">
                    <Activity className="h-3 w-3" />
                    <span>Real-Time</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-cyber-green">
                    <Brain className="h-3 w-3" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-primary">
                    <Shield className="h-3 w-3" />
                    <span>Enterprise-Grade</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6 px-8 pb-8">
              <Alert className="border-cyber-blue/20 bg-cyber-blue/5">
                <Lock className="h-4 w-4 text-cyber-blue" />
                <AlertDescription className="text-cyber-blue">
                  <strong>Demo Access:</strong> admin / admin
                </AlertDescription>
              </Alert>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    Username
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-cyber-blue transition-colors" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-9 h-11 border-border/50 focus:border-cyber-blue focus:ring-cyber-blue/20 transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-cyber-blue transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-12 h-11 border-border/50 focus:border-cyber-blue focus:ring-cyber-blue/20 transition-all duration-200"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-9 w-9 hover:bg-transparent hover:text-cyber-blue transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-gradient-to-r from-cyber-blue to-primary hover:from-cyber-blue/90 hover:to-primary/90 text-white font-medium cyber-glow transition-all duration-200 mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>Secure Sign In</span>
                    </div>
                  )}
                </Button>
              </form>
              
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Enterprise-grade security</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Protected by 256-bit encryption
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Side - Information Panel */}
        <div className="w-96 bg-card/50 backdrop-blur-sm border-l border-primary/20 relative z-10 overflow-y-auto">
          <div className="p-6 space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-cyber-blue" />
                <h2 className="text-lg font-bold text-foreground">About SecureNet</h2>
              </div>
              <p className="text-xs text-muted-foreground">
                "One Dashboard. Total Security. From Homes to Enterprises."
              </p>
            </div>
            
            {/* What is SecureNet Analyzer */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground">What is SecureNet Analyzer?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                AI-powered network security monitoring tool for real-time threat detection, analysis, and response with intuitive dashboards.
              </p>
            </div>
            
            {/* Key Features */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Key Features</h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2">
                  <Shield className="h-3 w-3 text-cyber-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-foreground">Real-Time Threat Detection</span>
                    <p className="text-xs text-muted-foreground">SQLi, brute-force, DDoS, port scans</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Activity className="h-3 w-3 text-cyber-green mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-foreground">Interactive Dashboards</span>
                    <p className="text-xs text-muted-foreground">Live stats, traffic graphs, alert logs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-foreground">Global Threat Intelligence</span>
                    <p className="text-xs text-muted-foreground">Attack origins and malicious IPs</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Brain className="h-3 w-3 text-cyber-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-foreground">AI-Powered Insights</span>
                    <p className="text-xs text-muted-foreground">Incident summaries in simple English</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Users className="h-3 w-3 text-cyber-green mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-foreground">Role-Based Access</span>
                    <p className="text-xs text-muted-foreground">Admin, Analyst, and User dashboards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Zap className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-xs font-medium text-foreground">Scalable & Lightweight</span>
                    <p className="text-xs text-muted-foreground">Small networks to enterprises</p>
                  </div>
                </div>
              </div>
            </div>
              
            {/* Why It's Useful */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Who Benefits</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Home className="h-3 w-3 text-cyber-blue" />
                    <span className="text-xs font-medium text-foreground">Individuals</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-5">Home Wi-Fi protection, unauthorized access detection</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3 text-cyber-green" />
                    <span className="text-xs font-medium text-foreground">Small Businesses</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-5">Employee monitoring, customer data protection</p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Building className="h-3 w-3 text-primary" />
                    <span className="text-xs font-medium text-foreground">Enterprises</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-5">SOC dashboards, compliance, multi-office scaling</p>
                </div>
              </div>
            </div>
            
            {/* Mission & Vision */}
            <div className="space-y-3 border-t border-border/50 pt-3">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-cyber-blue">Mission</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Make network security accessible to everyone - from personal Wi-Fi to enterprise protection.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-cyber-green">Vision</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Cyber resilience as a standard - ensuring safety and trust across all digital spaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}