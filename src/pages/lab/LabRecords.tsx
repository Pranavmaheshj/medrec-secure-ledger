
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, User, Files, Clock, Calendar, Upload, BarChart, Plus } from 'lucide-react';

const LabRecords = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Laboratory Records</h1>
        <p className="text-muted-foreground">Manage and view test records for patients</p>
      </div>
      
      {/* Search patients */}
      <Card>
        <CardHeader>
          <CardTitle>Find Patient</CardTitle>
          <CardDescription>Search for patients with test orders</CardDescription>
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
        </CardContent>
      </Card>
      
      {/* Test Records */}
      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Tests</TabsTrigger>
          <TabsTrigger value="completed">Completed Tests</TabsTrigger>
          <TabsTrigger value="uploaded">Uploaded Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
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
                    doctor: "Dr. Michael Smith",
                    ordered: "May 15, 2025",
                    due: "May 17, 2025",
                    priority: "High",
                    notes: "Fasting required. Patient to come in before 10:00 AM."
                  },
                  {
                    patient: "Sarah Johnson",
                    test: "Lipid Panel",
                    doctor: "Dr. Emily Johnson",
                    ordered: "May 15, 2025",
                    due: "May 18, 2025",
                    priority: "Normal",
                    notes: "Patient on statins. Comprehensive panel required."
                  },
                  {
                    patient: "Michael Brown",
                    test: "Comprehensive Metabolic Panel",
                    doctor: "Dr. Robert Williams",
                    ordered: "May 14, 2025",
                    due: "May 16, 2025",
                    priority: "High",
                    notes: "Follow-up to abnormal liver function results."
                  },
                  {
                    patient: "Emily Davis",
                    test: "Urinalysis",
                    doctor: "Dr. Jennifer Martinez",
                    ordered: "May 14, 2025",
                    due: "May 17, 2025",
                    priority: "Normal",
                    notes: "Check for UTI markers."
                  }
                ].map((test, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border rounded-md 
                      ${test.priority === 'High' 
                        ? 'bg-destructive/5 border-l-4 border-l-destructive' 
                        : 'hover:bg-muted/50'
                      } transition-colors`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Files className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{test.test}</h3>
                          <div className="flex items-center mt-1">
                            <User className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm">Patient: {test.patient}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <User className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Ordered by: {test.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={test.priority === 'High' ? 'destructive' : 'outline'}>
                        {test.priority} Priority
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Ordered</p>
                          <p className="text-sm">{test.ordered}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Due</p>
                          <p className="text-sm">{test.due}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium">Notes:</p>
                      <p className="text-sm text-muted-foreground">{test.notes}</p>
                    </div>
                    
                    <div className="mt-4 flex space-x-2 justify-end">
                      <Button variant="outline">View Details</Button>
                      <Button>Process Test</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tests</CardTitle>
              <CardDescription>Tests that have been processed but not uploaded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    patient: "David Wilson",
                    test: "Thyroid Panel",
                    doctor: "Dr. Michael Smith",
                    completed: "May 16, 2025",
                    status: "Ready for Upload"
                  },
                  {
                    patient: "Jennifer Martinez",
                    test: "Lipid Panel",
                    doctor: "Dr. Emily Johnson",
                    completed: "May 16, 2025",
                    status: "Ready for Upload"
                  },
                  {
                    patient: "Robert Thompson",
                    test: "Liver Function Test",
                    doctor: "Dr. Robert Williams",
                    completed: "May 15, 2025",
                    status: "Ready for Upload"
                  }
                ].map((test, index) => (
                  <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-secondary/10 rounded-full">
                          <BarChart className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{test.test}</h3>
                          <div className="flex items-center mt-1">
                            <User className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm">Patient: {test.patient}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <User className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Ordered by: {test.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                        {test.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Completed</p>
                        <p className="text-sm">{test.completed}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-2 justify-end">
                      <Button variant="outline">View Results</Button>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Results
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="uploaded">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Results</CardTitle>
              <CardDescription>Test results that have been uploaded to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    patient: "Emily Davis",
                    test: "Complete Blood Count (CBC)",
                    doctor: "Dr. Michael Smith",
                    completed: "May 16, 2025",
                    uploaded: "May 16, 2025",
                    accessedBy: ["Dr. Michael Smith"]
                  },
                  {
                    patient: "Sarah Johnson",
                    test: "Glucose Tolerance Test",
                    doctor: "Dr. Emily Johnson",
                    completed: "May 15, 2025",
                    uploaded: "May 15, 2025",
                    accessedBy: ["Dr. Emily Johnson", "Dr. Robert Williams"]
                  },
                  {
                    patient: "John Smith",
                    test: "Electrolyte Panel",
                    doctor: "Dr. Jennifer Martinez",
                    completed: "May 14, 2025",
                    uploaded: "May 14, 2025",
                    accessedBy: ["Dr. Jennifer Martinez"]
                  }
                ].map((test, index) => (
                  <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <Files className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{test.test}</h3>
                          <div className="flex items-center mt-1">
                            <User className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm">Patient: {test.patient}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <User className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">Ordered by: {test.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Uploaded
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Completed</p>
                          <p className="text-sm">{test.completed}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Uploaded</p>
                          <p className="text-sm">{test.uploaded}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-sm font-medium">Accessed By:</p>
                      <p className="text-sm text-muted-foreground">
                        {test.accessedBy.join(', ')}
                      </p>
                    </div>
                    
                    <div className="mt-4 flex space-x-2 justify-end">
                      <Button variant="outline">View Results</Button>
                      <Button variant="outline">Update Results</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Upload New Results */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Test Results</CardTitle>
          <CardDescription>Add new test results to the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-8 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-center">
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg">Drag and drop files here</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              Supported formats: PDF, JPEG, PNG, DICOM
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LabRecords;
