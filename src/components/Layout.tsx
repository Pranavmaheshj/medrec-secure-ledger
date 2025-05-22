
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings, Files, Activity, Database, Shield } from 'lucide-react';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, children, active }) => (
  <Link 
    to={to}
    className={`flex items-center space-x-2 p-3 rounded-md transition-colors ${
      active 
        ? 'bg-primary text-primary-foreground' 
        : 'hover:bg-secondary/10'
    }`}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get current pathname
  const pathname = window.location.pathname;
  
  // Determine navigation links based on user role
  const getNavLinks = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <>
            <NavLink to="/admin" icon={<Activity className="w-5 h-5" />} active={pathname === '/admin'}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/users" icon={<User className="w-5 h-5" />} active={pathname === '/admin/users'}>
              User Management
            </NavLink>
            <NavLink to="/admin/metrics" icon={<Activity className="w-5 h-5" />} active={pathname === '/admin/metrics'}>
              Performance Metrics
            </NavLink>
            <NavLink to="/admin/blockchain" icon={<Database className="w-5 h-5" />} active={pathname === '/admin/blockchain'}>
              Blockchain Explorer
            </NavLink>
            <NavLink to="/admin/ml-security" icon={<Shield className="w-5 h-5" />} active={pathname === '/admin/ml-security'}>
              ML Security
            </NavLink>
          </>
        );
      case 'patient':
        return (
          <>
            <NavLink to="/patient" icon={<Activity className="w-5 h-5" />} active={pathname === '/patient'}>
              Dashboard
            </NavLink>
            <NavLink to="/patient/records" icon={<Files className="w-5 h-5" />} active={pathname === '/patient/records'}>
              My Records
            </NavLink>
          </>
        );
      case 'doctor':
        return (
          <>
            <NavLink to="/doctor" icon={<Activity className="w-5 h-5" />} active={pathname === '/doctor'}>
              Dashboard
            </NavLink>
            <NavLink to="/doctor/records" icon={<Files className="w-5 h-5" />} active={pathname === '/doctor/records'}>
              Patient Records
            </NavLink>
          </>
        );
      case 'lab':
        return (
          <>
            <NavLink to="/lab" icon={<Activity className="w-5 h-5" />} active={pathname === '/lab'}>
              Dashboard
            </NavLink>
            <NavLink to="/lab/records" icon={<Files className="w-5 h-5" />} active={pathname === '/lab/records'}>
              Test Records
            </NavLink>
          </>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r shadow-sm p-4 flex flex-col">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h1 className="text-xl font-bold">MedRec</h1>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {getNavLinks()}
        </nav>
        
        {/* User info */}
        <div className="border-t pt-4 mt-4">
          <div className="mb-4">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 p-6 bg-background overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
