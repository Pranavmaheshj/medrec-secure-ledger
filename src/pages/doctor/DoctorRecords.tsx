
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, User, Files, Download, Edit, Plus, Lock, Calendar, Clock } from 'lucide-react';

const DoctorRecords = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>("John Smith");
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Patient Records</h1>
        <p className="text-muted-foreground">View and manage your patients' health records</p>
      </div>
      
      {/* Patient search */}
      <Card>
        <CardHeader>
          <CardTitle>Find Patient</CardTitle>
          <CardDescription>Search for patients who have granted you access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by patient name or ID"
                className="pl-8"
                defaultValue="John Smith"
              />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>
      
      {selectedPatient && (
        <>
          {/* Patient Info */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{selectedPatient}</h2>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <p className="text-sm">Patient ID: JS-12345</p>
                  <p className="text-sm">DOB: 05/15/1975</p>
                  <p className="text-sm">Insurance: Metro Health Plan</p>
                </div>
              </div>
            </div>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Add New Record
            </Button>
          </div>
          
          {/* Patient Records */}
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="medical">Medical Notes</TabsTrigger>
              <TabsTrigger value="lab">Lab Results</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Complete Medical History</CardTitle>
                  <CardDescription>All health records for {selectedPatient}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Initial Consultation",
                        date: "May 12, 2025",
                        doctor: "Dr. Michael Smith",
                        type: "Medical",
                        summary: "Patient presented with complaints of occasional chest pain and shortness of breath. Recommended complete cardiovascular workup."
                      },
                      {
                        title: "Comprehensive Metabolic Panel",
                        date: "May 10, 2025",
                        doctor: "Metro Medical Lab",
                        type: "Laboratory",
                        summary: "All values within normal range except for slightly elevated cholesterol (215 mg/dL)."
                      },
                      {
                        title: "Electrocardiogram (ECG)",
                        date: "May 10, 2025",
                        doctor: "Dr. Emily Johnson",
                        type: "Medical",
                        summary: "Normal sinus rhythm. No significant ST-T wave changes."
                      },
                      {
                        title: "Chest X-Ray",
                        date: "May 10, 2025",
                        doctor: "Radiology Department",
                        type: "Imaging",
                        summary: "No active disease. Heart size within normal limits."
                      },
                      {
                        title: "Lisinopril Prescription",
                        date: "May 12, 2025",
                        doctor: "Dr. Michael Smith",
                        type: "Prescription",
                        summary: "10mg daily for hypertension."
                      }
                    ].map((record, index) => (
                      <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full 
                              ${record.type === "Medical" ? "bg-primary/10" : 
                                record.type === "Laboratory" ? "bg-secondary/10" :
                                record.type === "Imaging" ? "bg-accent/20" :
                                "bg-muted"}
                            `}>
                              <Files className={`h-4 w-4 
                                ${record.type === "Medical" ? "text-primary" : 
                                  record.type === "Laboratory" ? "text-secondary" :
                                  record.type === "Imaging" ? "text-accent-foreground" :
                                  "text-muted-foreground"}
                              `} />
                            </div>
                            <div>
                              <h3 className="font-medium">{record.title}</h3>
                              <p className="text-sm">
                                Provider: {record.doctor}
                              </p>
                              <div className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{record.date}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="outline">{record.type}</Badge>
                        </div>
                        
                        <div className="mt-2 text-sm">
                          {record.summary}
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-2">
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button size="sm" variant="outline">
                            <Files className="h-4 w-4 mr-1" />
                            View Full Record
                          </Button>
                          <Button size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Update
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="medical">
              <Card>
                <CardHeader>
                  <CardTitle>Medical Notes</CardTitle>
                  <CardDescription>Clinical notes and medical observations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Medical notes will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="lab">
              <Card>
                <CardHeader>
                  <CardTitle>Laboratory Results</CardTitle>
                  <CardDescription>Blood work and other test results</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Laboratory results will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="imaging">
              <Card>
                <CardHeader>
                  <CardTitle>Imaging Studies</CardTitle>
                  <CardDescription>X-rays, MRIs, and other imaging results</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Imaging records will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="prescriptions">
              <Card>
                <CardHeader>
                  <CardTitle>Prescription History</CardTitle>
                  <CardDescription>Current and past medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Prescription records will be displayed here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Access Management */}
          <Card>
            <CardHeader>
              <CardTitle>Access Management</CardTitle>
              <CardDescription>Control who can access this patient's records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Dr. Emily Johnson</h4>
                      <p className="text-sm text-muted-foreground">Cardiologist</p>
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active Access</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Metro Medical Laboratory</h4>
                      <p className="text-sm text-muted-foreground">Testing Facility</p>
                    </div>
                  </div>
                  <div>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active Access</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">Dr. Robert Williams</h4>
                      <p className="text-sm text-muted-foreground">Primary Care</p>
                    </div>
                  </div>
                  <div>
                    <Badge variant="outline" className="text-muted-foreground">Access Expired</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Grant New Access
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
};

export default DoctorRecords;
