
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Files, Calendar, User, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">Your personal health dashboard</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Files className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Medical Records</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <User className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Shared With</p>
              <p className="text-2xl font-bold">3 Providers</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Upcoming Appointments</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Records and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Records */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Health Records</CardTitle>
            <CardDescription>Your latest medical information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Annual Check-up",
                  doctor: "Dr. Smith",
                  date: "May 12, 2025",
                  type: "checkup"
                },
                {
                  title: "Blood Test Results",
                  doctor: "Metro Medical Lab",
                  date: "May 10, 2025",
                  type: "lab"
                },
                {
                  title: "Vaccination Record",
                  doctor: "Dr. Johnson",
                  date: "April 28, 2025",
                  type: "vaccination"
                }
              ].map((record, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-md border hover:bg-muted/50 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Files className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{record.title}</h4>
                    <p className="text-sm text-muted-foreground">{record.doctor}</p>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {record.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/patient/records" className="w-full">
              <Button variant="outline" className="w-full">View All Records</Button>
            </Link>
          </CardFooter>
        </Card>
        
        {/* Access Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Access Log</CardTitle>
            <CardDescription>Who has viewed your medical records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  who: "Dr. Emily Johnson",
                  record: "Annual Check-up",
                  time: "Today, 10:42 AM"
                },
                {
                  who: "Metro Medical Lab",
                  record: "Blood Test Results",
                  time: "Yesterday, 4:15 PM"
                },
                {
                  who: "Dr. Michael Smith",
                  record: "Medical History",
                  time: "May 14, 2025, 2:30 PM"
                },
                {
                  who: "Radiology Department",
                  record: "X-Ray Results",
                  time: "May 9, 2025, 11:20 AM"
                }
              ].map((access, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-md border hover:bg-muted/50 transition-colors">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <User className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{access.who}</h4>
                    <p className="text-sm text-muted-foreground">Accessed: {access.record}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{access.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Appointments and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointment */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointment</CardTitle>
            <CardDescription>Your next scheduled doctor visit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 p-4 rounded-md bg-primary/5 border-l-4 border-primary">
              <div className="bg-card p-3 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Follow-up Consultation</h3>
                <p className="text-sm text-muted-foreground">Dr. Michael Smith</p>
                <p className="text-sm font-medium mt-1">May 25, 2025 at 2:30 PM</p>
                <p className="text-sm text-muted-foreground">City General Hospital, Room 305</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button className="flex-1" variant="outline">Reschedule</Button>
            <Button className="flex-1" variant="destructive">Cancel</Button>
          </CardFooter>
        </Card>
        
        {/* Health Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>Health Alerts</CardTitle>
            <CardDescription>Important notifications about your health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-md bg-destructive/10 border-l-4 border-destructive flex items-start space-x-4">
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <h4 className="font-medium">Prescription Refill Needed</h4>
                  <p className="text-sm mt-1">Your Lisinopril prescription will expire in 5 days. Please contact Dr. Smith for a refill.</p>
                </div>
              </div>
              
              <div className="p-4 rounded-md bg-secondary/10 border-l-4 border-secondary flex items-start space-x-4">
                <div className="mt-0.5">
                  <AlertCircle className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-medium">Lab Results Available</h4>
                  <p className="text-sm mt-1">Your recent blood work results are now available. Please review them in your records.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
