
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Calendar, Files, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DoctorDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">Doctor's dashboard</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Today's Patients</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <Files className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Records Updated</p>
              <p className="text-2xl font-bold">14</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Approvals</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search Patient */}
      <Card>
        <CardHeader>
          <CardTitle>Search Patient Records</CardTitle>
          <CardDescription>Find a patient to view their medical history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name or ID"
                className="pl-8"
              />
            </div>
            <Button>Search</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Only patients who have granted you access will appear in search results
          </p>
        </CardContent>
      </Card>
      
      {/* Schedule and Records */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Your appointments for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  patient: "John Smith",
                  time: "9:00 AM - 9:30 AM",
                  purpose: "Annual Check-up",
                  status: "Completed"
                },
                {
                  patient: "Sarah Johnson",
                  time: "10:00 AM - 10:30 AM",
                  purpose: "Follow-up Consultation",
                  status: "Completed"
                },
                {
                  patient: "Michael Brown",
                  time: "11:15 AM - 11:45 AM",
                  purpose: "New Patient Consultation",
                  status: "In Progress"
                },
                {
                  patient: "Emily Davis",
                  time: "1:30 PM - 2:00 PM",
                  purpose: "Prescription Review",
                  status: "Scheduled"
                },
                {
                  patient: "Robert Wilson",
                  time: "2:30 PM - 3:00 PM",
                  purpose: "Test Results Review",
                  status: "Scheduled"
                }
              ].map((appointment, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-4 p-3 rounded-md border 
                    ${appointment.status === 'In Progress' 
                      ? 'bg-primary/5 border-primary' 
                      : appointment.status === 'Completed'
                      ? 'bg-muted/50'
                      : 'hover:bg-muted/50'
                    } transition-colors`}
                >
                  <div className={`p-2 rounded-full 
                    ${appointment.status === 'Completed' 
                      ? 'bg-muted' 
                      : appointment.status === 'In Progress'
                      ? 'bg-primary/10'
                      : 'bg-secondary/10'
                    }`}>
                    <User className={`h-4 w-4 
                      ${appointment.status === 'Completed' 
                        ? 'text-muted-foreground' 
                        : appointment.status === 'In Progress'
                        ? 'text-primary'
                        : 'text-secondary'
                      }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{appointment.patient}</h4>
                    <p className="text-sm text-muted-foreground">{appointment.purpose}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <p className={`text-xs 
                      ${appointment.status === 'Completed' 
                        ? 'text-muted-foreground' 
                        : appointment.status === 'In Progress'
                        ? 'text-primary font-medium'
                        : 'text-secondary'
                      }`}>
                      {appointment.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Patient Records */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Patient Records</CardTitle>
            <CardDescription>Records you've recently accessed</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="accessed">
              <TabsList className="mb-4">
                <TabsTrigger value="accessed">Recently Accessed</TabsTrigger>
                <TabsTrigger value="updated">Recently Updated</TabsTrigger>
              </TabsList>
              
              <TabsContent value="accessed">
                <div className="space-y-4">
                  {[
                    {
                      patient: "Sarah Johnson",
                      record: "Prescription History",
                      time: "Today, 10:15 AM"
                    },
                    {
                      patient: "John Smith",
                      record: "Annual Check-up Notes",
                      time: "Today, 9:20 AM"
                    },
                    {
                      patient: "Emily Davis",
                      record: "Lab Test Results",
                      time: "Yesterday, 4:30 PM"
                    },
                    {
                      patient: "David Wilson",
                      record: "Treatment Plan",
                      time: "Yesterday, 2:45 PM"
                    }
                  ].map((record, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-md border hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Files className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{record.patient}</h4>
                        <p className="text-sm text-muted-foreground">{record.record}</p>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {record.time}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="updated">
                <div className="space-y-4">
                  {[
                    {
                      patient: "Michael Brown",
                      record: "Initial Consultation Notes",
                      time: "Today, 11:30 AM"
                    },
                    {
                      patient: "Sarah Johnson",
                      record: "Updated Prescription",
                      time: "Today, 10:25 AM"
                    },
                    {
                      patient: "John Smith",
                      record: "New Treatment Plan",
                      time: "Today, 9:35 AM"
                    },
                    {
                      patient: "Lisa Rodriguez",
                      record: "Follow-up Assessment",
                      time: "Yesterday, 3:15 PM"
                    }
                  ].map((record, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-md border hover:bg-muted/50 transition-colors">
                      <div className="p-2 bg-secondary/10 rounded-full">
                        <Files className="h-4 w-4 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{record.patient}</h4>
                        <p className="text-sm text-muted-foreground">{record.record}</p>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {record.time}
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Link to="/doctor/records" className="w-full">
              <Button variant="outline" className="w-full">View All Records</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Pending Access Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Access Requests</CardTitle>
          <CardDescription>Patient records awaiting your approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                patient: "Thomas Lee",
                record: "Complete Medical History",
                requested: "Today, 11:45 AM"
              },
              {
                patient: "Jennifer Martinez",
                record: "Previous Treatment Records",
                requested: "Yesterday, 5:20 PM"
              },
              {
                patient: "Robert Thompson",
                record: "Surgical History",
                requested: "May 15, 2025, 9:10 AM"
              }
            ].map((request, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-md border">
                <div className="p-2 bg-accent/20 rounded-full">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{request.patient}</h4>
                  <p className="text-sm text-muted-foreground">Requesting: {request.record}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Requested: {request.requested}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Deny</Button>
                  <Button size="sm">Approve</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
