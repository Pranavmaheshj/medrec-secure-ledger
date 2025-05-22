
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(name, email, password, role);
      
      if (role === 'admin') {
        // Admin accounts are auto-approved and can log in immediately
        toast({
          title: 'Registration Successful',
          description: 'Your admin account has been created',
        });
        navigate(`/${role}`);
      } else {
        // Non-admin accounts need email verification first
        setSuccess(true);
        setVerificationSent(true);
        toast({
          title: 'Registration Successful',
          description: 'Your account has been created. Please verify your email to continue.',
        });
      }
    } catch (error: any) {
      setErrorMessage(error.message || 'An error occurred during registration');
      
      toast({
        title: 'Registration Failed',
        description: error.message || 'An error occurred during registration',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{verificationSent ? 'Verify Your Email' : 'Registration Pending'}</CardTitle>
            <CardDescription>
              {verificationSent 
                ? 'Please verify your email address to continue'
                : 'Your account is awaiting administrator approval'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`${verificationSent ? 'bg-primary/10 text-primary' : 'bg-yellow-100 text-yellow-800'} p-4 rounded-md text-center`}>
              <p className="text-lg font-medium mb-2">Thank you for registering!</p>
              {verificationSent ? (
                <>
                  <p className="mb-4">
                    We've sent a verification email to <strong>{email}</strong>. 
                    Please check your inbox and click on the verification link to activate your account.
                  </p>
                  <p className="text-sm mb-4">
                    Once verified, your account will need administrator approval before you can log in.
                  </p>
                </>
              ) : (
                <p className="mb-4">
                  Your account has been created and is pending approval from an administrator. 
                  You will be able to log in once your account has been approved.
                </p>
              )}
              <Button 
                onClick={() => navigate('/login')}
                className="mt-2"
              >
                Return to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h1 className="text-3xl font-bold">MedRec</h1>
          <p className="text-muted-foreground mt-2">
            Blockchain-Secured EHR System
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create Account</CardTitle>
            <CardDescription>
              Register to access secure health records
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-center space-x-2 mb-4">
                <AlertCircle className="h-4 w-4" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Must be at least 6 characters
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>Register As</Label>
                <RadioGroup 
                  defaultValue="patient"
                  value={role}
                  onValueChange={(value) => setRole(value as UserRole)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patient" id="patient" />
                    <Label htmlFor="patient" className="cursor-pointer">Patient</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="doctor" id="doctor" />
                    <Label htmlFor="doctor" className="cursor-pointer">Doctor</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lab" id="lab" />
                    <Label htmlFor="lab" className="cursor-pointer">Laboratory</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="cursor-pointer">Administrator</Label>
                  </div>
                </RadioGroup>
                {role !== 'admin' && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Note: Non-admin accounts require email verification and administrator approval before they can log in
                  </p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-r-transparent" />
                    Creating account...
                  </>
                ) : (
                  'Register'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
