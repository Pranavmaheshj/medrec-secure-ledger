
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Files, Lock, Share, Download, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const PatientRecords = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Health Records</h1>
        <p className="text-muted-foreground">View and manage your health information</p>
      </div>
      
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your records..."
          className="pl-8"
        />
      </div>
      
      {/* Records tabs */}
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="lab">Laboratory</TabsTrigger>
          <TabsTrigger value="imaging">Imaging</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Health Records</CardTitle>
              <CardDescription>Complete history of your medical documentation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Annual Physical Examination",
                    date: "May 12, 2025",
                    provider: "Dr. Michael Smith",
                    type: "Medical",
                    shared: ["Dr. Emily Johnson"]
                  },
                  {
                    title: "Complete Blood Count (CBC)",
                    date: "May 10, 2025",
                    provider: "Metro Medical Lab",
                    type: "Laboratory",
                    shared: ["Dr. Michael Smith"]
                  },
                  {
                    title: "Vaccination Record - COVID-19 Booster",
                    date: "April 28, 2025",
                    provider: "City Health Center",
                    type: "Medical",
                    shared: []
                  },
                  {
                    title: "Chest X-Ray",
                    date: "April 15, 2025",
                    provider: "Radiology Department, Metro Hospital",
                    type: "Imaging",
                    shared: ["Dr. Michael Smith", "Dr. Emily Johnson"]
                  },
                  {
                    title: "Lisinopril Prescription",
                    date: "April 10, 2025",
                    provider: "Dr. Michael Smith",
                    type: "Prescription",
                    shared: []
                  },
                  {
                    title: "Blood Pressure Log",
                    date: "April 1 - May 1, 2025",
                    provider: "Self-monitored",
                    type: "Medical",
                    shared: ["Dr. Michael Smith"]
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
                          <p className="text-sm text-muted-foreground">
                            Provider: {record.provider}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Date: {record.date}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{record.type}</Badge>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        {record.shared.length > 0 ? (
                          <>
                            <Share className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Shared with {record.shared.length} provider{record.shared.length > 1 ? 's' : ''}
                            </span>
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Private</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </div>
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
              <CardTitle>Medical Records</CardTitle>
              <CardDescription>Documentation from doctor visits and consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Medical records content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lab">
          <Card>
            <CardHeader>
              <CardTitle>Laboratory Results</CardTitle>
              <CardDescription>Your lab test results and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Laboratory records content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="imaging">
          <Card>
            <CardHeader>
              <CardTitle>Imaging Records</CardTitle>
              <CardDescription>X-rays, MRIs, and other imaging studies</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Imaging records content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="prescriptions">
          <Card>
            <CardHeader>
              <CardTitle>Prescription History</CardTitle>
              <CardDescription>Your medication and prescription history</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Prescription records content will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientRecords;
