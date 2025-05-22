
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isVerifying, setIsVerifying] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const token = searchParams.get('token');
  
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsVerifying(false);
        setError('Invalid verification link. No token provided.');
        return;
      }
      
      try {
        const success = await verifyEmail(token);
        setIsSuccess(success);
        
        if (success) {
          toast({
            title: 'Email Verified',
            description: 'Your email has been successfully verified. You can now log in.',
          });
        } else {
          setError('Invalid or expired verification token.');
        }
      } catch (error) {
        setError('An error occurred during email verification.');
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyToken();
  }, [token, verifyEmail, toast]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Email Verification</CardTitle>
            <CardDescription>
              Verify your email address to activate your account
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-8 space-y-4">
            {isVerifying ? (
              <>
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
                <p className="text-center text-muted-foreground">
                  Verifying your email address...
                </p>
              </>
            ) : isSuccess ? (
              <>
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
                  <p className="text-muted-foreground">
                    Your email has been verified successfully. Your account is now pending approval by an administrator. You'll be notified when your account is approved.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-full bg-destructive/10 p-3">
                  <AlertCircle className="h-16 w-16 text-destructive" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
                  <p className="text-muted-foreground">
                    {error || 'We could not verify your email address. The link may be invalid or expired.'}
                  </p>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => navigate('/login')}>
              Return to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
