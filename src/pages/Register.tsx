
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Registration Restricted</CardTitle>
          <CardDescription>
            New user registration is restricted to administrator approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4">
            For this secured EHR system, new users can only be added by an administrator.
            Please contact your healthcare provider or system administrator to create your account.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Link to="/login">
            <Button variant="outline">Return to Login</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
