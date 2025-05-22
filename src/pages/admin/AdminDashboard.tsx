
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, User, Database, Shield, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage system operations and monitor performance</p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <p className="text-3xl font-bold">243</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <User className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Records Created</p>
              <p className="text-3xl font-bold">1,892</p>
            </div>
            <div className="bg-secondary/10 p-3 rounded-full">
              <Database className="h-6 w-6 text-secondary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Blockchain Events</p>
              <p className="text-3xl font-bold">7,428</p>
            </div>
            <div className="bg-accent/20 p-3 rounded-full">
              <Activity className="h-6 w-6 text-accent-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Security Alerts</p>
              <p className="text-3xl font-bold">2</p>
            </div>
            <div className="bg-destructive/10 p-3 rounded-full">
              <Shield className="h-6 w-6 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system events and transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  event: "User Registration",
                  user: "Dr. Emily Johnson",
                  time: "10 minutes ago",
                  type: "registration"
                },
                {
                  event: "Record Access",
                  user: "Lab Technician Mark",
                  time: "25 minutes ago",
                  type: "access"
                },
                {
                  event: "Smart Contract Event",
                  user: "Grant Access",
                  time: "40 minutes ago",
                  type: "blockchain"
                },
                {
                  event: "New Record Created",
                  user: "Patient Sarah Lee",
                  time: "1 hour ago",
                  type: "record"
                },
                {
                  event: "ML Security Alert",
                  user: "System",
                  time: "2 hours ago",
                  type: "security"
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 py-2 border-b last:border-0">
                  <div className={`p-2 rounded-full 
                    ${activity.type === "security" ? "bg-destructive/10" : 
                      activity.type === "blockchain" ? "bg-primary/10" :
                      activity.type === "access" ? "bg-secondary/10" :
                      activity.type === "registration" ? "bg-accent/20" : 
                      "bg-muted"
                    }`}>
                    {activity.type === "security" && <Shield className="h-4 w-4 text-destructive" />}
                    {activity.type === "blockchain" && <Database className="h-4 w-4 text-primary" />}
                    {activity.type === "access" && <User className="h-4 w-4 text-secondary" />}
                    {activity.type === "registration" && <User className="h-4 w-4 text-accent-foreground" />}
                    {activity.type === "record" && <Database className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.event}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>System metrics and blockchain performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Throughput ratio */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Throughput Ratio</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              {/* Packet Delivery */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Packet Delivery Ratio</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              {/* Energy Consumption */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Energy Consumption</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              {/* End-to-End Delay */}
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">End-to-End Delay</span>
                  <span className="text-sm font-medium">120ms</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <Link to="/admin/metrics" className="block w-full">
                <Button variant="outline" className="w-full mt-4">View Detailed Metrics</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/users" className="block">
          <Card className="h-full card-hover cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <User className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-medium">Manage Users</h3>
              <p className="text-sm text-muted-foreground mt-2">Add, edit, or revoke user access</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/blockchain" className="block">
          <Card className="h-full card-hover cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Database className="h-10 w-10 text-secondary mb-4" />
              <h3 className="font-medium">Blockchain Explorer</h3>
              <p className="text-sm text-muted-foreground mt-2">View transaction logs and smart contracts</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/ml-security" className="block">
          <Card className="h-full card-hover cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Shield className="h-10 w-10 text-destructive mb-4" />
              <h3 className="font-medium">ML Security</h3>
              <p className="text-sm text-muted-foreground mt-2">Monitor for poisoning attacks</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
