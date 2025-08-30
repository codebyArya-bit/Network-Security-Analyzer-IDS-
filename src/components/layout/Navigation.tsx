import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  BarChart3, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { NotificationCenter } from '@/components/dashboard/NotificationCenter';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  // Public marketing navigation items
  const publicNavigationItems = [
    {
      path: '/',
      label: 'Home',
    },
    {
      path: '/about',
      label: 'About',
    },
    {
      path: '/pricing',
      label: 'Pricing',
    },
    {
      path: '/contact',
      label: 'Contact',
    },
  ];

  // Authenticated user navigation items
  const authenticatedNavigationItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
    },
    {
      path: '/admin',
      label: 'Admin',
      icon: Settings,
    },
  ];

  // Determine if user is on authenticated pages
  const isAuthenticatedRoute = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin');
  const navItems = isAuthenticatedRoute ? authenticatedNavigationItems : publicNavigationItems;

  // Don't show navigation on login page
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link to={isAuthenticatedRoute ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                <Shield className="h-6 w-6 text-cyber-blue" />
              </div>
              <span className="font-bold text-lg text-cyber-blue">
                SecureNet Analyzer
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/10 text-cyber-blue border border-primary/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
            
            {/* Show auth buttons for public pages, user menu for authenticated pages */}
            {isAuthenticatedRoute ? (
              <>
                <div className="h-6 w-px bg-border" />
                <NotificationCenter />
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <>
                <div className="h-6 w-px bg-border" />
                <ThemeToggle />
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-cyber-blue to-primary hover:from-cyber-blue/90 hover:to-primary/90 text-white" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-cyber-blue border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
                
              {/* Mobile auth section */}
              {isAuthenticatedRoute ? (
                <>
                  <div className="px-3 py-2 flex items-center gap-2">
                    <NotificationCenter />
                    <ThemeToggle />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full justify-start space-x-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </>
              ) : (
                <>
                  <div className="px-3 py-2">
                    <ThemeToggle />
                  </div>
                  <div className="px-3 py-2 space-y-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setIsMenuOpen(false)}
                      asChild
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button 
                      size="sm" 
                      className="w-full bg-gradient-to-r from-cyber-blue to-primary hover:from-cyber-blue/90 hover:to-primary/90 text-white"
                      onClick={() => setIsMenuOpen(false)}
                      asChild
                    >
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}