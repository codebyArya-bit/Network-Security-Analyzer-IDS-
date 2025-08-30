import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Shield, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Phone, 
  Globe, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowRight, 
  Zap,
  Users,
  Crown,
  Loader2
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

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    plan: 'professional',
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$29/month',
      icon: Shield,
      color: 'text-cyber-blue',
      description: 'Perfect for small businesses'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$99/month',
      icon: Zap,
      color: 'text-cyber-green',
      description: 'Ideal for growing businesses',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299/month',
      icon: Crown,
      color: 'text-primary',
      description: 'For large organizations'
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

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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
      console.log('Registration data:', formData);
      
      // Redirect to success page or login
      alert('Registration successful! Please check your email to verify your account.');
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-surface-darker via-background to-surface-dark py-16">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-green/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        {/* Floating Security Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <Globe className="absolute top-20 left-20 h-6 w-6 text-cyber-blue/20 animate-bounce" style={{animationDelay: '0s'}} />
          <Shield className="absolute top-40 right-32 h-4 w-4 text-cyber-green/20 animate-bounce" style={{animationDelay: '2s'}} />
          <Lock className="absolute bottom-32 left-16 h-5 w-5 text-primary/20 animate-bounce" style={{animationDelay: '4s'}} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <SecureNetLogo size="large" />
            
            <div className="space-y-4">
              <Badge variant="outline" className="border-cyber-green/20 text-cyber-green">
                🚀 Start Your Free Trial
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Join Thousands of
                <br />
                <span className="bg-gradient-to-r from-cyber-blue to-cyber-green bg-clip-text text-transparent">
                  Security Professionals
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Get started with SecureNet Analyzer today. 14-day free trial, no credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <Card className="border-primary/20 cyber-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Create Your Account</CardTitle>
                <CardDescription className="text-center">
                  Fill in your details to get started with your free trial
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

                  {/* Email */}
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

                  {/* Password Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  {/* Company and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  {/* Plan Selection */}
                  <div className="space-y-2">
                    <Label>Choose Your Plan</Label>
                    <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                      <SelectContent>
                        {plans.map((plan) => {
                          const Icon = plan.icon;
                          return (
                            <SelectItem key={plan.id} value={plan.id}>
                              <div className="flex items-center space-x-2">
                                <Icon className={`h-4 w-4 ${plan.color}`} />
                                <span>{plan.name} - {plan.price}</span>
                                {plan.popular && <Badge variant="secondary" className="text-xs">Popular</Badge>}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                        className={errors.agreeToTerms ? 'border-red-500' : ''}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="agreeToTerms"
                          className="text-sm font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{' '}
                          <Link to="/terms" className="text-cyber-blue hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-cyber-blue hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                        {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="subscribeNewsletter"
                        checked={formData.subscribeNewsletter}
                        onCheckedChange={(checked) => handleInputChange('subscribeNewsletter', checked as boolean)}
                      />
                      <Label
                        htmlFor="subscribeNewsletter"
                        className="text-sm font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Subscribe to our newsletter for security updates and product news
                      </Label>
                    </div>
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
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyber-blue hover:underline font-medium">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">
                  Why Choose
                  <br />
                  <span className="bg-gradient-to-r from-cyber-green to-primary bg-clip-text text-transparent">
                    SecureNet Analyzer?
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of organizations protecting their networks with our advanced security platform.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20">
                    <CheckCircle className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">14-Day Free Trial</h3>
                    <p className="text-muted-foreground">No credit card required. Full access to all features.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-cyber-green/10 border border-cyber-green/20">
                    <Shield className="h-6 w-6 text-cyber-green" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Enterprise-Grade Security</h3>
                    <p className="text-muted-foreground">SOC 2 certified with bank-level encryption.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">24/7 Expert Support</h3>
                    <p className="text-muted-foreground">Get help from our security experts anytime.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20">
                    <Zap className="h-6 w-6 text-cyber-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Quick Setup</h3>
                    <p className="text-muted-foreground">Get up and running in under 5 minutes.</p>
                  </div>
                </div>
              </div>
              
              {/* Plan Comparison */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Selected Plan: Professional</CardTitle>
                  <CardDescription>Perfect for growing businesses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm">Up to 100 devices</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm">AI-powered threat detection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm">Advanced analytics dashboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-cyber-green" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  
                  <div className="pt-2 border-t border-border">
                    <div className="text-2xl font-bold text-cyber-green">$99/month</div>
                    <div className="text-sm text-muted-foreground">Billed monthly, cancel anytime</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}