
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, User as UserIcon, Shield, DatabaseIcon, Lock, Unlock, X, Check, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth, User } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const UserManagement = () => {
  const { getAllUsers, approveUser, deactivateUser, activateUser, deleteUser, user: currentUser } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Load users on component mount
  useEffect(() => {
    const allUsers = getAllUsers();
    setUsers(allUsers);
    setFilteredUsers(allUsers);
  }, [getAllUsers]);

  // Filter users based on search query and active tab
  useEffect(() => {
    let result = users;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) || 
        user.email.toLowerCase().includes(query)
      );
    }
    
    // Filter by tab
    if (activeTab !== 'all') {
      result = result.filter(user => user.role === activeTab.slice(0, -1)); // Remove 's' from the end
    }
    
    setFilteredUsers(result);
  }, [searchQuery, activeTab, users]);

  // Handle user actions
  const handleApproveUser = (userId: string) => {
    approveUser(userId);
    toast({ title: "Success", description: "User has been approved" });
    
    // Update local state
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'active' } : user
    ));
  };

  const handleActivateUser = (userId: string) => {
    activateUser(userId);
    toast({ title: "Success", description: "User has been activated" });
    
    // Update local state
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'active' } : user
    ));
  };

  const handleDeactivateUser = (userId: string) => {
    deactivateUser(userId);
    toast({ title: "Success", description: "User has been deactivated" });
    
    // Update local state
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'inactive' } : user
    ));
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    
    // Don't allow deleting yourself
    if (userToDelete?.id === currentUser?.id) {
      toast({ 
        title: "Error", 
        description: "You cannot delete your own account",
        variant: "destructive"
      });
      return;
    }
    
    deleteUser(userId);
    toast({ title: "Success", description: "User has been deleted" });
    
    // Update local state
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  // Generate counts for tabs
  const counts = {
    all: users.length,
    doctors: users.filter(u => u.role === 'doctor').length,
    patients: users.filter(u => u.role === 'patient').length,
    labs: users.filter(u => u.role === 'lab').length,
    admins: users.filter(u => u.role === 'admin').length,
  };

  // Get pending users
  const pendingUsers = users.filter(u => u.status === 'pending');

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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>
      
      {/* User Tabs */}
      <Tabs 
        defaultValue="all" 
        value={activeTab} 
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Users ({counts.all})</TabsTrigger>
          <TabsTrigger value="doctors">Doctors ({counts.doctors})</TabsTrigger>
          <TabsTrigger value="patients">Patients ({counts.patients})</TabsTrigger>
          <TabsTrigger value="labs">Labs ({counts.labs})</TabsTrigger>
          <TabsTrigger value="admins">Admins ({counts.admins})</TabsTrigger>
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
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <div className={`p-2 rounded-full 
                              ${user.role === "doctor" ? "bg-primary/10" : 
                                user.role === "patient" ? "bg-secondary/10" :
                                user.role === "lab" ? "bg-accent/20" :
                                "bg-muted"}
                            `}>
                              {user.role === "doctor" && <UserIcon className="h-4 w-4 text-primary" />}
                              {user.role === "patient" && <UserIcon className="h-4 w-4 text-secondary" />}
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
                            {user.status || 'active'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.lastActivity ? new Date(user.lastActivity).toLocaleString() : 'Never'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            {user.status === "active" ? (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleDeactivateUser(user.id)}
                                title="Deactivate User"
                              >
                                <Lock className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleActivateUser(user.id)}
                                title="Activate User"
                              >
                                <Unlock className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Delete User"
                              disabled={user.id === currentUser?.id}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {['doctors', 'patients', 'labs', 'admins'].map((roleTab) => (
          <TabsContent key={roleTab} value={roleTab}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{roleTab} Accounts</CardTitle>
                <CardDescription>Manage {roleTab} accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No {roleTab} found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
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
                              {user.status || 'active'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.lastActivity ? new Date(user.lastActivity).toLocaleString() : 'Never'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              {user.status === "active" ? (
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => handleDeactivateUser(user.id)}
                                  title="Deactivate User"
                                >
                                  <Lock className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  onClick={() => handleActivateUser(user.id)}
                                  title="Activate User"
                                >
                                  <Unlock className="h-4 w-4" />
                                </Button>
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDeleteUser(user.id)}
                                title="Delete User"
                                disabled={user.id === currentUser?.id}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
      
      {/* Registration Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Registration Requests</CardTitle>
          <CardDescription>New user accounts awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending requests
            </div>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-md hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full 
                      ${request.role === "doctor" ? "bg-primary/10" : 
                        request.role === "patient" ? "bg-secondary/10" :
                        request.role === "lab" ? "bg-accent/20" :
                        "bg-muted"}
                    `}>
                      {request.role === "doctor" && <UserIcon className="h-4 w-4 text-primary" />}
                      {request.role === "patient" && <UserIcon className="h-4 w-4 text-secondary" />}
                      {request.role === "lab" && <DatabaseIcon className="h-4 w-4 text-accent-foreground" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">{request.email}</p>
                      <div className="flex space-x-4 mt-1">
                        <Badge variant="outline" className="capitalize">{request.role}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Requested: {request.lastActivity ? new Date(request.lastActivity).toLocaleString() : 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteUser(request.id)}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleApproveUser(request.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
