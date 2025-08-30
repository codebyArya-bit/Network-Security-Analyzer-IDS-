import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  Building, 
  MessageSquare, 
  Globe, 
  Headphones, 
  Users, 
  Zap,
  CheckCircle,
  ArrowRight,
  Loader2,
  Star,
  Quote
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

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inquiryTypes = [
    { value: 'sales', label: 'Sales Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'demo', label: 'Request Demo' },
    { value: 'billing', label: 'Billing Question' },
    { value: 'other', label: 'Other' }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'sales@securenet-analyzer.com',
      description: 'Send us an email anytime',
      color: 'text-cyber-blue'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 9AM-6PM EST',
      color: 'text-cyber-green'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Security Blvd, Suite 100',
      description: 'San Francisco, CA 94105',
      color: 'text-primary'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM EST',
      color: 'text-cyber-blue'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CISO, TechCorp",
      content: "The SecureNet team was incredibly responsive and helped us implement their solution seamlessly.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "IT Director, StartupXYZ",
      content: "Outstanding support and a product that delivers on its promises. Highly recommend!",
      rating: 5
    }
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would make an API call here
      console.log('Contact form data:', formData);
      
      setSubmitted(true);
      
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-cyber-green/10 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-cyber-green" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Message Sent!</h1>
            <p className="text-muted-foreground">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
          </div>
          <Button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                phone: '',
                inquiryType: '',
                subject: '',
                message: ''
              });
            }}
            className="bg-gradient-to-r from-cyber-blue to-primary hover:from-cyber-blue/90 hover:to-primary/90 text-white"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-darker via-background to-surface-dark py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        {/* Floating Security Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Globe className="absolute top-20 left-20 h-6 w-6 text-cyber-blue/20 animate-bounce" style={{animationDelay: '0s'}} />
          <Shield className="absolute top-40 right-32 h-4 w-4 text-cyber-green/20 animate-bounce" style={{animationDelay: '2s'}} />
          <Headphones className="absolute bottom-32 left-16 h-5 w-5 text-primary/20 animate-bounce" style={{animationDelay: '4s'}} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <SecureNetLogo size="large" />
            
            <div className="space-y-6">
              <Badge variant="outline" className="border-cyber-blue/20 text-cyber-blue">
                💬 Get in Touch
              </Badge>
              
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Let's Secure Your Network
                <br />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                  Together
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Have questions about SecureNet Analyzer? Want to see a demo? 
                Our security experts are here to help you find the perfect solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <Card className="border-primary/20 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className={`pl-10 ${errors.firstName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className={`pl-10 ${errors.lastName ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email and Company */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Your Company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className={`pl-10 ${errors.company ? 'border-red-500' : ''}`}
                        />
                      </div>
                      {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                    </div>
                  </div>

                  {/* Phone and Inquiry Type */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Inquiry Type</Label>
                      <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                        <SelectTrigger className={errors.inquiryType ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          {inquiryTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.inquiryType && <p className="text-sm text-red-500">{errors.inquiryType}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="subject"
                        type="text"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        className={`pl-10 ${errors.subject ? 'border-red-500' : ''}`}
                      />
                    </div>
                    {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your security needs, questions, or how we can help..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                    />
                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-cyber-blue to-primary hover:from-cyber-blue/90 hover:to-primary/90 text-white font-medium cyber-glow"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Get in Touch
                  <br />
                  <span className="bg-gradient-to-r from-cyber-green to-primary bg-clip-text text-transparent">
                    With Our Team
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  We're here to help you secure your network. Reach out through any of these channels.
                </p>
              </div>
              
              {/* Contact Methods */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <Card key={index} className="border-primary/20 hover:scale-105 transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <Icon className={`h-5 w-5 ${info.color}`} />
                          </div>
                          <CardTitle className="text-lg">{info.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">{info.details}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {/* Quick Actions */}
              <Card className="border-cyber-green/20 bg-cyber-green/5">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-cyber-green" />
                    <span>Need Immediate Help?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className="border-cyber-green/20 hover:bg-cyber-green/10"
                      asChild
                    >
                      <a href="tel:+15551234567">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-cyber-blue/20 hover:bg-cyber-blue/10"
                      asChild
                    >
                      <a href="mailto:sales@securenet-analyzer.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Us
                      </a>
                    </Button>
                  </div>
                  
                  <div className="text-center pt-2">
                    <Button 
                      className="bg-gradient-to-r from-cyber-green to-primary hover:from-cyber-green/90 hover:to-primary/90 text-white"
                      asChild
                    >
                      <a href="/signup">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Customer Testimonials */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">What Our Customers Say</h3>
                <div className="space-y-4">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="border-primary/20">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <div className="flex items-start space-x-2">
                            <Quote className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground italic text-sm">{testimonial.content}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-foreground text-sm">{testimonial.name}</div>
                            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-card/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-cyber-blue/20 text-cyber-blue">
              ❓ Quick Answers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Frequently Asked
              <br />
              <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">How quickly can I get started?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">You can start your free trial immediately after signing up. Our setup process takes less than 5 minutes.</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Do you offer custom solutions?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes! We work with enterprise clients to create tailored security solutions that meet their specific requirements.</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">What support do you provide?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We offer 24/7 support for all paid plans, with dedicated account managers for enterprise customers.</p>
              </CardContent>
            </Card>
            
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">Is my data secure?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Absolutely. We're SOC 2 Type II certified and use enterprise-grade encryption to protect all customer data.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}