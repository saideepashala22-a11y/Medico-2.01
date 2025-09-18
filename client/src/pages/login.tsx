import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth-simple';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Hospital, Loader2, Shield, FlaskConical, Pill, UserPlus, ArrowLeft } from 'lucide-react';
import { ForgotPasswordModal } from '@/components/ForgotPasswordModal';
import { ThemeToggle } from '@/components/ThemeToggle';

type UserRole = 'ADMINISTRATOR' | 'LAB_TECHNICIAN' | 'PHARMACY_STAFF' | 'RECEPTIONIST';

interface RoleOption {
  key: UserRole;
  label: string;
  description: string;
  icon: React.ElementType;
  color: string;
  loginTitle: string;
}

const roleOptions: RoleOption[] = [
  {
    key: 'ADMINISTRATOR',
    label: 'Administration',
    description: 'Full system access and management',
    icon: Shield,
    color: 'from-red-500 to-red-600',
    loginTitle: 'Hospital Management Admin Login'
  },
  {
    key: 'LAB_TECHNICIAN',
    label: 'Laboratory',
    description: 'Laboratory tests and results management',
    icon: FlaskConical,
    color: 'from-green-500 to-green-600',
    loginTitle: 'Laboratory Staff Login'
  },
  {
    key: 'PHARMACY_STAFF',
    label: 'Pharmacy',
    description: 'Medicine inventory and prescriptions',
    icon: Pill,
    color: 'from-blue-500 to-blue-600',
    loginTitle: 'Pharmacy Staff Login'
  },
  {
    key: 'RECEPTIONIST',
    label: 'Receptionist',
    description: 'Patient registration and records',
    icon: UserPlus,
    color: 'from-purple-500 to-purple-600',
    loginTitle: 'Receptionist Login'
  }
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !selectedRole) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.username, formData.password);
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Login failed',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setFormData({ username: '', password: '' }); // Reset form when switching roles
  };

  const handleBackToRoleSelection = () => {
    setSelectedRole(null);
    setFormData({ username: '', password: '' });
  };

  const selectedRoleOption = selectedRole ? roleOptions.find(r => r.key === selectedRole) : null;

  // Role Selection View
  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-primary to-medical-info relative p-4">
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <Card className="w-full max-w-4xl shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto h-16 w-16 bg-medical-primary rounded-full flex items-center justify-center mb-6">
              <Hospital className="text-white text-2xl" />
            </div>
            <CardTitle className="text-3xl font-bold text-medical-text">Hospital Management System</CardTitle>
            <p className="text-medical-text-muted mt-3 text-lg">Select your department to continue</p>
          </CardHeader>
          
          <CardContent className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {roleOptions.map((role) => {
                const IconComponent = role.icon;
                return (
                  <Button
                    key={role.key}
                    variant="outline"
                    className="h-auto p-6 text-left hover:shadow-lg transition-all duration-200 border-2 hover:border-medical-primary"
                    onClick={() => handleRoleSelect(role.key)}
                    data-testid={`button-role-${role.key.toLowerCase()}`}
                  >
                    <div className="flex items-center space-x-4 w-full">
                      <div className={`h-14 w-14 bg-gradient-to-br ${role.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="text-white text-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-medical-text">{role.label}</h3>
                        <p className="text-sm text-medical-text-muted mt-1">{role.description}</p>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Role-Specific Login View
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-medical-primary to-medical-info relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          {selectedRoleOption && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-4 p-2"
                onClick={handleBackToRoleSelection}
                data-testid="button-back-role-selection"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div className={`mx-auto h-12 w-12 bg-gradient-to-br ${selectedRoleOption.color} rounded-full flex items-center justify-center mb-4`}>
                <selectedRoleOption.icon className="text-white text-xl" />
              </div>
              <CardTitle className="text-2xl font-bold text-medical-text">{selectedRoleOption.loginTitle}</CardTitle>
              <p className="text-medical-text-muted mt-2">Enter your credentials to continue</p>
            </>
          )}
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value.replace(/\s/g, '') })}
                placeholder="Enter username"
                autoComplete="username"
                required
                data-testid="input-username"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Enter password"
                autoComplete="new-password"
                required
                data-testid="input-password"
              />
            </div>
            
            <Button 
              type="submit" 
              className={`w-full bg-gradient-to-r ${selectedRoleOption?.color} hover:opacity-90 text-white shadow-lg`}
              disabled={isLoading}
              data-testid="button-login"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              type="button"
              className="text-sm text-medical-primary hover:text-medical-primary-dark underline"
              onClick={() => setShowForgotPassword(true)}
              data-testid="link-forgot-password"
            >
              Forgot Password?
            </button>
          </div>
        </CardContent>
      </Card>
      
      <ForgotPasswordModal 
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
}
