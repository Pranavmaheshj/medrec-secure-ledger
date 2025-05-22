
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, User, Shield, DatabaseIcon, Lock, Unlock, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage system users and their permissions</p>
      </div>
      
      {/* Search and Add User */}
      <div className="flex items-center justify-between">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
          />
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>
      
      {/* User Tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Users (243)</TabsTrigger>
          <TabsTrigger value="doctors">Doctors (68)</TabsTrigger>
          <TabsTrigger value="patients">Patients (142)</TabsTrigger>
          <TabsTrigger value="labs">Labs (25)</TabsTrigger>
          <TabsTrigger value="admins">Admins (8)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: "Dr. Michael Smith",
                      email: "dr.smith@medrec.com",
                      role: "doctor",
                      status: "active",
                      lastActivity: "Today, 11:30 AM"
                    },
                    {
                      name: "John Patient",
                      email: "john@example.com",
                      role: "patient",
                      status: "active",
                      lastActivity: "Today, 10:15 AM"
                    },
                    {
                      name: "Metro Medical Lab",
                      email: "lab@metromedical.com",
                      role: "lab",
                      status: "active",
                      lastActivity: "Today, 9:45 AM"
                    },
                    {
                      name: "Sarah Johnson",
                      email: "sarah@example.com",
                      role: "patient",
                      status: "active",
                      lastActivity: "Yesterday, 3:20 PM"
                    },
                    {
                      name: "Dr. Emily Johnson",
                      email: "dr.johnson@medrec.com",
                      role: "doctor",
                      status: "active",
                      lastActivity: "Yesterday, 2:10 PM"
                    },
                    {
                      name: "Admin User",
                      email: "admin@medrec.com",
                      role: "admin",
                      status: "active",
                      lastActivity: "Today, 9:00 AM"
                    },
                    {
                      name: "Robert Wilson",
                      email: "robert@example.com",
                      role: "patient",
                      status: "inactive",
                      lastActivity: "May 10, 2025"
                    },
                    {
                      name: "City General Lab",
                      email: "lab@citygeneral.com",
                      role: "lab",
                      status: "active",
                      lastActivity: "Yesterday, 11:05 AM"
                    },
                    {
                      name: "Dr. Robert Williams",
                      email: "dr.williams@medrec.com",
                      role: "doctor",
                      status: "pending",
                      lastActivity: "N/A"
                    }
                  ].map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-full 
                            ${user.role === "doctor" ? "bg-primary/10" : 
                              user.role === "patient" ? "bg-secondary/10" :
                              user.role === "lab" ? "bg-accent/20" :
                              "bg-muted"}
                          `}>
                            {user.role === "doctor" && <User className="h-4 w-4 text-primary" />}
                            {user.role === "patient" && <User className="h-4 w-4 text-secondary" />}
                            {user.role === "lab" && <DatabaseIcon className="h-4 w-4 text-accent-foreground" />}
                            {user.role === "admin" && <Shield className="h-4 w-4 text-destructive" />}
                          </div>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            user.status === "active" ? "default" :
                            user.status === "inactive" ? "secondary" :
                            "outline"
                          }
                          className={
                            user.status === "active" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                            user.status === "inactive" ? "bg-gray-100 text-gray-800 hover:bg-gray-100" :
                            "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastActivity}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <User className="h-4 w-4" />
                          </Button>
                          {user.status === "active" ? (
                            <Button variant="ghost" size="icon">
                              <Lock className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon">
                              <Unlock className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="doctors">
          <Card>
            <CardHeader>
              <CardTitle>Doctor Accounts</CardTitle>
              <CardDescription>Manage medical provider accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Doctor accounts will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Patient Accounts</CardTitle>
              <CardDescription>Manage patient accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Patient accounts will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="labs">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Accounts</CardTitle>
              <CardDescription>Manage laboratory and testing facility accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Laboratory accounts will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <CardTitle>Administrator Accounts</CardTitle>
              <CardDescription>Manage system administrator accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Administrator accounts will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Registration Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Registration Requests</CardTitle>
          <CardDescription>New user accounts awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                name: "Dr. Robert Williams",
                email: "dr.williams@medrec.com",
                role: "doctor",
                requested: "Today, 8:15 AM",
                specialty: "Neurology"
              },
              {
                name: "Pacific Medical Laboratory",
                email: "contact@pacificlab.com",
                role: "lab",
                requested: "Yesterday, 2:30 PM",
                specialty: "Full Service Medical Laboratory"
              },
              {
                name: "Jennifer Martinez",
                email: "jennifer@example.com",
                role: "patient",
                requested: "Yesterday, 11:45 AM",
                specialty: "N/A"
              }
            ].map((request, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full 
                    ${request.role === "doctor" ? "bg-primary/10" : 
                      request.role === "patient" ? "bg-secondary/10" :
                      request.role === "lab" ? "bg-accent/20" :
                      "bg-muted"}
                  `}>
                    {request.role === "doctor" && <User className="h-4 w-4 text-primary" />}
                    {request.role === "patient" && <User className="h-4 w-4 text-secondary" />}
                    {request.role === "lab" && <DatabaseIcon className="h-4 w-4 text-accent-foreground" />}
                  </div>
                  <div>
                    <h3 className="font-medium">{request.name}</h3>
                    <p className="text-sm text-muted-foreground">{request.email}</p>
                    <div className="flex space-x-4 mt-1">
                      <Badge variant="outline" className="capitalize">{request.role}</Badge>
                      <span className="text-xs text-muted-foreground">
                        Requested: {request.requested}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Reject</Button>
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

export default UserManagement;
