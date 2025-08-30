import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Activity, 
  Brain, 
  MapPin, 
  Users, 
  Zap, 
  Globe, 
  Lock, 
  BarChart3, 
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Eye,
  Layers
} from 'lucide-react';

// Custom SecureNet Logo Component
const SecureNetLogo = ({ size = 'large' }: { size?: 'small' | 'large' }) => {
  const iconSize = size === 'large' ? 'h-12 w-12' : 'h-8 w-8';
  const textSize = size === 'large' ? 'text-4xl' : 'text-2xl';
  const subtextSize = size === 'large' ? 'text-lg' : 'text-sm';
  
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-br from-cyber-blue via-primary to-cyber-green p-6 rounded-full">
          <Shield className={`${iconSize} text-white`} />
        </div>
      </div>
      <div className="text-left">
        <h1 className={`${textSize} font-bold bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent`}>
          SecureNet
        </h1>
        <p className={`${subtextSize} text-muted-foreground font-medium`}>Analyzer</p>
      </div>
    </div>
  );
};

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Real-Time Threat Detection",
      description: "Advanced AI algorithms detect SQL injection, brute-force attacks, DDoS attempts, and port scans in real-time.",
      color: "text-cyber-blue"
    },
    {
      icon: Activity,
      title: "Interactive Dashboards",
      description: "Beautiful, responsive dashboards with live statistics, traffic graphs, and comprehensive alert logs.",
      color: "text-cyber-green"
    },
    {
      icon: MapPin,
      title: "Global Threat Intelligence",
      description: "Track attack origins worldwide with geolocation mapping and malicious IP identification.",
      color: "text-primary"
    },
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get incident summaries and threat analysis in plain English, powered by advanced machine learning.",
      color: "text-cyber-blue"
    },
    {
      icon: Users,
      title: "Role-Based Access Control",
      description: "Separate dashboards for administrators, security analysts, and regular users with appropriate permissions.",
      color: "text-cyber-green"
    },
    {
      icon: Zap,
      title: "Scalable Architecture",
      description: "From home networks to enterprise infrastructure - scales seamlessly with your security needs.",
      color: "text-primary"
    }
  ];

  const stats = [
    { label: "Threats Detected Daily", value: "10,000+", icon: AlertTriangle },
    { label: "Networks Protected", value: "5,000+", icon: Shield },
    { label: "Uptime Guarantee", value: "99.9%", icon: CheckCircle },
    { label: "Response Time", value: "<1ms", icon: Zap }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CISO, TechCorp",
      content: "SecureNet Analyzer transformed our security posture. The AI insights are incredibly accurate and actionable.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "IT Director, StartupXYZ",
      content: "Easy to deploy, powerful analytics, and excellent support. Perfect for our growing business needs.",
      rating: 5
    },
    {
      name: "Dr. Emily Watson",
      role: "Security Researcher",
      content: "The real-time threat detection capabilities are unmatched. A must-have for any serious security team.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-darker via-background to-surface-dark">
        {/* Animated Background */}
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
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <SecureNetLogo size="large" />
            
            <div className="space-y-6">
              <Badge variant="outline" className="border-cyber-blue/20 text-cyber-blue">
                🚀 Now with AI-Powered Threat Analysis
              </Badge>
              
              <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
                Protect Your Network
                <br />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                  From Every Threat
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Real-time network security monitoring with AI-driven insights. 
                Detect, analyze, and respond to cyber threats before they impact your business.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg" 
                className="bg-gradient-to-r from-cyber-blue to-primary hover:from-cyber-blue/90 hover:to-primary/90 text-white font-medium cyber-glow px-8 py-4 text-lg"
              >
                <Link to="/signup">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-primary/20 hover:bg-primary/10 px-8 py-4 text-lg"
              >
                <Link to="/login">
                  <Eye className="mr-2 h-5 w-5" />
                  View Demo
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 pt-8">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-cyber-green" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-cyber-green" />
                <span>14-Day Free Trial</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-cyber-green" />
                <span>Setup in 5 Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50 backdrop-blur-sm border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center space-y-2">
                  <Icon className="h-8 w-8 text-cyber-blue mx-auto" />
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-cyber-green/20 text-cyber-green">
              ⚡ Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Everything You Need for
              <br />
              <span className="bg-gradient-to-r from-cyber-green to-primary bg-clip-text text-transparent">
                Complete Security
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced threat detection meets intuitive design. Protect your network with enterprise-grade security tools.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="cyber-glow hover:scale-105 transition-all duration-300 border-primary/20">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-primary/20 text-primary">
              💬 Customer Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Trusted by Security
              <br />
              <span className="bg-gradient-to-r from-primary to-cyber-blue bg-clip-text text-transparent">
                Professionals Worldwide
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyber-blue/10 to-cyber-green/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Secure Your Network?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of organizations protecting their digital assets with SecureNet Analyzer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-cyber-blue to-primary hover:from-cyber-blue/90 hover:to-primary/90 text-white font-medium cyber-glow px-8 py-4 text-lg"
            >
              <Link to="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-primary/20 hover:bg-primary/10 px-8 py-4 text-lg"
            >
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-cyber-green" />
              <span>99.9% Uptime SLA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-4 w-4 text-cyber-blue" />
              <span>Enterprise Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}