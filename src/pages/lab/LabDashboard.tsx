
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Files, Calendar, Clock, Search, BarChart, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';

const LabDashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">Laboratory dashboard</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Files className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending Tests</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <BarChart className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Reports Uploaded</p>
              <p className="text-2xl font-bold">18</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Search Patient */}
      <Card>
        <CardHeader>
          <CardTitle>Search Patient Records</CardTitle>
          <CardDescription>Find a patient to add test results</CardDescription>
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
            Only patients with test orders will appear in search results
          </p>
        </CardContent>
      </Card>
      
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Tests</CardTitle>
            <CardDescription>Tests awaiting processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  patient: "John Smith",
                  test: "Complete Blood Count (CBC)",
                  doctor: "Dr. Evans",
                  priority: "High",
                  due: "Today, 2:00 PM"
                },
                {
                  patient: "Sarah Johnson",
                  test: "Lipid Panel",
                  doctor: "Dr. Williams",
                  priority: "Normal",
                  due: "Today, 4:30 PM"
                },
                {
                  patient: "Michael Brown",
                  test: "Comprehensive Metabolic Panel",
                  doctor: "Dr. Taylor",
                  priority: "High",
                  due: "Today, 5:00 PM"
                },
                {
                  patient: "Emily Davis",
                  test: "Urinalysis",
                  doctor: "Dr. Martinez",
                  priority: "Normal",
                  due: "Tomorrow, 10:00 AM"
                }
              ].map((test, index) => (
                <div 
                  key={index} 
                  className={`flex items-center space-x-4 p-3 rounded-md border 
                    ${test.priority === 'High' 
                      ? 'bg-destructive/5 border-l-4 border-l-destructive' 
                      : 'hover:bg-muted/50'
                    } transition-colors`}
                >
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Files className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">{test.patient}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        test.priority === 'High' 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-secondary/10 text-secondary'
                      }`}>
                        {test.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm font-medium">{test.test}</p>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-muted-foreground">Ordered by: {test.doctor}</p>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {test.due}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">View All Pending Tests</Button>
          </CardFooter>
        </Card>
        
        {/* Recent Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
            <CardDescription>Recently processed and uploaded tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  patient: "Emily Davis",
                  test: "Complete Blood Count (CBC)",
                  time: "Today, 11:20 AM",
                  status: "Uploaded"
                },
                {
                  patient: "David Wilson",
                  test: "Thyroid Panel",
                  time: "Today, 10:45 AM",
                  status: "Uploaded"
                },
                {
                  patient: "Jennifer Martinez",
                  test: "Lipid Panel",
                  time: "Today, 9:30 AM",
                  status: "Uploaded"
                },
                {
                  patient: "Robert Thompson",
                  test: "Liver Function Test",
                  time: "Yesterday, 4:15 PM",
                  status: "Uploaded"
                }
              ].map((result, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-md border hover:bg-muted/50 transition-colors">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <BarChart className="h-4 w-4 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{result.patient}</h4>
                    <p className="text-sm text-muted-foreground">{result.test}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{result.time}</p>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {result.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/lab/records" className="w-full">
              <Button variant="outline" className="w-full">View All Results</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      {/* Laboratory Workload */}
      <Card>
        <CardHeader>
          <CardTitle>Laboratory Workload</CardTitle>
          <CardDescription>Current testing capacity and utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">Hematology</h4>
                  <p className="text-sm text-muted-foreground">8 tests pending</p>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">Biochemistry</h4>
                  <p className="text-sm text-muted-foreground">12 tests pending</p>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">Microbiology</h4>
                  <p className="text-sm text-muted-foreground">3 tests pending</p>
                </div>
                <span className="text-sm font-medium">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <h4 className="font-medium">Immunology</h4>
                  <p className="text-sm text-muted-foreground">5 tests pending</p>
                </div>
                <span className="text-sm font-medium">55%</span>
              </div>
              <Progress value={55} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Access Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Access Requests</CardTitle>
          <CardDescription>Doctors requesting test results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                requester: "Dr. Michael Smith",
                patient: "John Smith",
                test: "Complete Blood Count",
                requested: "Today, 1:15 PM"
              },
              {
                requester: "Dr. Emily Johnson",
                patient: "Sarah Johnson",
                test: "Lipid Panel Results",
                requested: "Today, 12:30 PM"
              }
            ].map((request, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-md border">
                <div className="p-2 bg-accent/20 rounded-full">
                  <User className="h-4 w-4 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{request.requester}</h4>
                  <p className="text-sm">
                    Requesting: <span className="font-medium">{request.test}</span> for {request.patient}
                  </p>
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

export default LabDashboard;
