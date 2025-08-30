import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { 
  Check, 
  X, 
  Shield, 
  Zap, 
  Crown, 
  ArrowRight, 
  Star,
  Users,
  Activity,
  Globe,
  Brain,
  Lock,
  Headphones,
  Clock,
  Database,
  BarChart3,
  AlertTriangle,
  Smartphone,
  Building
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

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses and home offices",
      icon: Shield,
      color: "text-cyber-blue",
      borderColor: "border-cyber-blue/20",
      bgColor: "bg-cyber-blue/5",
      monthlyPrice: 29,
      annualPrice: 290,
      popular: false,
      features: [
        { name: "Up to 10 devices", included: true },
        { name: "Real-time threat detection", included: true },
        { name: "Basic dashboard", included: true },
        { name: "Email alerts", included: true },
        { name: "7-day data retention", included: true },
        { name: "Community support", included: true },
        { name: "AI-powered insights", included: false },
        { name: "Advanced analytics", included: false },
        { name: "Custom integrations", included: false },
        { name: "Priority support", included: false },
        { name: "Compliance reporting", included: false },
        { name: "Multi-location support", included: false }
      ]
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and IT teams",
      icon: Zap,
      color: "text-cyber-green",
      borderColor: "border-cyber-green/20",
      bgColor: "bg-cyber-green/5",
      monthlyPrice: 99,
      annualPrice: 990,
      popular: true,
      features: [
        { name: "Up to 100 devices", included: true },
        { name: "Real-time threat detection", included: true },
        { name: "Advanced dashboard", included: true },
        { name: "Email & SMS alerts", included: true },
        { name: "30-day data retention", included: true },
        { name: "Priority support", included: true },
        { name: "AI-powered insights", included: true },
        { name: "Advanced analytics", included: true },
        { name: "API access", included: true },
        { name: "Custom integrations", included: false },
        { name: "Compliance reporting", included: false },
        { name: "Multi-location support", included: false }
      ]
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      icon: Crown,
      color: "text-primary",
      borderColor: "border-primary/20",
      bgColor: "bg-primary/5",
      monthlyPrice: 299,
      annualPrice: 2990,
      popular: false,
      features: [
        { name: "Unlimited devices", included: true },
        { name: "Real-time threat detection", included: true },
        { name: "Enterprise dashboard", included: true },
        { name: "Multi-channel alerts", included: true },
        { name: "1-year data retention", included: true },
        { name: "24/7 dedicated support", included: true },
        { name: "AI-powered insights", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Full API access", included: true },
        { name: "Custom integrations", included: true },
        { name: "Compliance reporting", included: true },
        { name: "Multi-location support", included: true }
      ]
    }
  ];

  const addOns = [
    {
      name: "Extended Data Retention",
      description: "Keep your security data for up to 2 years",
      price: "$19/month",
      icon: Database
    },
    {
      name: "Mobile App Access",
      description: "Monitor your network security on the go",
      price: "$9/month",
      icon: Smartphone
    },
    {
      name: "White-label Solution",
      description: "Brand the platform with your company logo",
      price: "$99/month",
      icon: Building
    },
    {
      name: "Advanced Compliance Pack",
      description: "GDPR, HIPAA, SOX compliance reporting",
      price: "$49/month",
      icon: Lock
    }
  ];

  const faqs = [
    {
      question: "Can I change my plan at any time?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial for all plans. No credit card required to get started."
    },
    {
      question: "What happens if I exceed my device limit?",
      answer: "We'll notify you when you approach your limit. You can either upgrade your plan or remove devices to stay within your current limit."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Absolutely! For organizations with unique requirements, we offer custom solutions. Contact our sales team to discuss your specific needs."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and can arrange invoicing for annual enterprise plans."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade encryption and are SOC 2 Type II certified. Your data is stored in secure, geographically distributed data centers."
    }
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
                💰 Transparent Pricing
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Choose the Perfect Plan
                <br />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                  For Your Security Needs
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Start with our free trial, then choose a plan that scales with your business. 
                All plans include our core security features with no hidden fees.
              </p>
            </div>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 pt-8">
              <span className={`text-lg font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-cyber-green"
              />
              <span className={`text-lg font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge variant="secondary" className="bg-cyber-green/10 text-cyber-green border-cyber-green/20">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
              const period = isAnnual ? 'year' : 'month';
              
              return (
                <Card 
                  key={index} 
                  className={`relative ${plan.borderColor} ${plan.popular ? 'scale-105 cyber-glow' : ''} hover:scale-105 transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-cyber-green to-primary text-white px-4 py-1">
                        <Star className="h-4 w-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className={`text-center pb-8 ${plan.bgColor}`}>
                    <div className="mx-auto p-3 rounded-full bg-primary/10 border border-primary/20 w-fit mb-4">
                      <Icon className={`h-8 w-8 ${plan.color}`} />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    
                    <div className="pt-4">
                      <div className="text-4xl font-bold text-foreground">
                        ${price}
                        <span className="text-lg font-normal text-muted-foreground">/{period}</span>
                      </div>
                      {isAnnual && (
                        <div className="text-sm text-muted-foreground">
                          ${Math.round(price / 12)}/month billed annually
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <Button 
                      asChild
                      className={`w-full ${plan.popular 
                        ? 'bg-gradient-to-r from-cyber-green to-primary hover:from-cyber-green/90 hover:to-primary/90 text-white cyber-glow' 
                        : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      }`}
                      size="lg"
                    >
                      <Link to="/signup">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-cyber-green" />
                          ) : (
                            <X className="h-5 w-5 text-muted-foreground" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-primary/20 text-primary">
              🔧 Add-ons
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Enhance Your
              <br />
              <span className="bg-gradient-to-r from-primary to-cyber-blue bg-clip-text text-transparent">
                Security Experience
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Extend your plan with additional features and capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <Card key={index} className="border-primary/20 hover:scale-105 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto p-2 rounded-lg bg-primary/10 border border-primary/20 w-fit mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{addon.name}</CardTitle>
                    <CardDescription className="text-sm">{addon.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-cyber-green">{addon.price}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-cyber-green/20 text-cyber-green">
              📊 Feature Comparison
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Everything You Need
              <br />
              <span className="bg-gradient-to-r from-cyber-green to-primary bg-clip-text text-transparent">
                At Every Level
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-cyber-blue/20">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-cyber-blue mx-auto mb-2" />
                <CardTitle>For Small Teams</CardTitle>
                <CardDescription>Essential security monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-cyber-blue" />
                  <span className="text-sm">Real-time monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-cyber-blue" />
                  <span className="text-sm">Threat detection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4 text-cyber-blue" />
                  <span className="text-sm">Basic analytics</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-cyber-green/20 scale-105">
              <CardHeader className="text-center">
                <Building className="h-8 w-8 text-cyber-green mx-auto mb-2" />
                <CardTitle>For Growing Business</CardTitle>
                <CardDescription>Advanced security features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 text-cyber-green" />
                  <span className="text-sm">AI-powered insights</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-cyber-green" />
                  <span className="text-sm">API integrations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Headphones className="h-4 w-4 text-cyber-green" />
                  <span className="text-sm">Priority support</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <Crown className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle>For Enterprise</CardTitle>
                <CardDescription>Complete security solution</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Lock className="h-4 w-4 text-primary" />
                  <span className="text-sm">Compliance reporting</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">24/7 dedicated support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Database className="h-4 w-4 text-primary" />
                  <span className="text-sm">Extended data retention</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-cyber-blue/20 text-cyber-blue">
              ❓ FAQ
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Frequently Asked
              <br />
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg text-left">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
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
            Start your free trial today. No credit card required.
          </p>
          
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
              <Link to="/contact">
                Contact Sales
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-cyber-green" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-cyber-green" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-cyber-green" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}