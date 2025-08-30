import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Target, 
  Award, 
  Globe, 
  Zap, 
  Heart, 
  Lightbulb, 
  ArrowRight,
  CheckCircle,
  Star,
  Building,
  Calendar,
  TrendingUp
} from 'lucide-react';

// Custom SecureNet Logo Component
const SecureNetLogo = ({ size = 'small' }: { size?: 'small' | 'large' }) => {
  const iconSize = size === 'large' ? 'h-12 w-12' : 'h-8 w-8';
  const textSize = size === 'large' ? 'text-4xl' : 'text-2xl';
  const subtextSize = size === 'large' ? 'text-lg' : 'text-sm';
  
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full blur-sm opacity-75"></div>
        <div className="relative bg-gradient-to-br from-cyber-blue via-primary to-cyber-green p-3 rounded-full">
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

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Every decision we make prioritizes the security and privacy of our users' data and networks.",
      color: "text-cyber-blue"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push the boundaries of cybersecurity technology with cutting-edge AI and machine learning.",
      color: "text-cyber-green"
    },
    {
      icon: Users,
      title: "Customer Success",
      description: "Our customers' success is our success. We're committed to providing exceptional support and solutions.",
      color: "text-primary"
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "We operate with transparency, honesty, and ethical practices in everything we do.",
      color: "text-red-500"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "CEO & Co-Founder",
      bio: "Former CISO at Fortune 500 companies with 15+ years in cybersecurity. PhD in Computer Science from MIT.",
      image: "👩‍💼"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      bio: "Ex-Google security engineer and AI researcher. Led development of threat detection systems at scale.",
      image: "👨‍💻"
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      bio: "Machine learning expert with publications in top-tier security conferences. Former researcher at Stanford.",
      image: "👩‍🔬"
    },
    {
      name: "James Park",
      role: "VP of Engineering",
      bio: "Full-stack architect with expertise in distributed systems and real-time analytics platforms.",
      image: "👨‍🔧"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "SecureNet Analyzer was born from a vision to democratize enterprise-grade cybersecurity."
    },
    {
      year: "2021",
      title: "First 1,000 Customers",
      description: "Reached our first major milestone with customers across 25 countries."
    },
    {
      year: "2022",
      title: "AI Integration",
      description: "Launched our proprietary AI threat detection engine with 99.7% accuracy."
    },
    {
      year: "2023",
      title: "Series A Funding",
      description: "Raised $15M to accelerate product development and global expansion."
    },
    {
      year: "2024",
      title: "Enterprise Scale",
      description: "Now protecting over 10,000 networks worldwide with 24/7 monitoring."
    }
  ];

  const stats = [
    { label: "Networks Protected", value: "10,000+", icon: Shield },
    { label: "Threats Blocked Daily", value: "50,000+", icon: Target },
    { label: "Countries Served", value: "45+", icon: Globe },
    { label: "Team Members", value: "150+", icon: Users }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-darker via-background to-surface-dark py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <SecureNetLogo size="large" />
            
            <div className="space-y-6">
              <Badge variant="outline" className="border-cyber-blue/20 text-cyber-blue">
                🏢 About Our Company
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Protecting the Digital World,
                <br />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                  One Network at a Time
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Founded by cybersecurity veterans, SecureNet Analyzer combines cutting-edge AI technology 
                with deep industry expertise to deliver unparalleled network security solutions.
              </p>
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

      {/* Mission Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-cyber-green/20 text-cyber-green">
                  🎯 Our Mission
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Making Enterprise Security
                  <br />
                  <span className="bg-gradient-to-r from-cyber-green to-primary bg-clip-text text-transparent">
                    Accessible to Everyone
                  </span>
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that robust cybersecurity shouldn't be a luxury reserved for large enterprises. 
                Our mission is to democratize advanced threat detection and network security, making it 
                accessible and affordable for organizations of all sizes.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyber-green mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">AI-Powered Protection</h3>
                    <p className="text-muted-foreground">Advanced machine learning algorithms that evolve with emerging threats.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyber-green mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Real-Time Monitoring</h3>
                    <p className="text-muted-foreground">24/7 network surveillance with instant threat detection and response.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-cyber-green mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Scalable Solutions</h3>
                    <p className="text-muted-foreground">From small businesses to enterprise networks, we scale with your needs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-blue/20 to-cyber-green/20 rounded-2xl blur-xl" />
              <Card className="relative border-primary/20 cyber-glow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Award className="h-8 w-8 text-cyber-blue" />
                    <div>
                      <CardTitle className="text-xl">Industry Recognition</CardTitle>
                      <CardDescription>Trusted by security professionals worldwide</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9/5 Customer Rating</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-cyber-green" />
                    <span>SOC 2 Type II Certified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-cyber-blue" />
                    <span>ISO 27001 Compliant</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <span>99.9% Uptime SLA</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-primary/20 text-primary">
              💎 Our Values
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              What Drives Us
              <br />
              <span className="bg-gradient-to-r from-primary to-cyber-blue bg-clip-text text-transparent">
                Every Single Day
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center border-primary/20 hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="mx-auto p-3 rounded-full bg-primary/10 border border-primary/20 w-fit">
                      <Icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-cyber-green/20 text-cyber-green">
              👥 Meet the Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Led by Security
              <br />
              <span className="bg-gradient-to-r from-cyber-green to-primary bg-clip-text text-transparent">
                Industry Veterans
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our leadership team combines decades of cybersecurity expertise with a passion for innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center border-primary/20">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-cyber-blue font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-cyber-blue/20 text-cyber-blue">
              📅 Our Journey
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Milestones That
              <br />
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                Define Our Growth
              </span>
            </h2>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-cyber-blue to-cyber-green" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="border-primary/20">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-cyber-blue" />
                          <CardTitle className="text-lg">{milestone.year}</CardTitle>
                        </div>
                        <CardDescription className="text-xl font-semibold text-foreground">
                          {milestone.title}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full border-4 border-background" />
                  </div>
                  
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-cyber-blue/10 to-cyber-green/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-muted-foreground">
            Experience the future of network security with SecureNet Analyzer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-cyber-blue to-primary hover:from-cyber-blue/90 hover:to-primary/90 text-white font-medium cyber-glow px-8 py-4 text-lg"
            >
              <Link to="/signup">
                Start Your Free Trial
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
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}