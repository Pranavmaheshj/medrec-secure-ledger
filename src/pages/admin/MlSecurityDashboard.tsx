
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertCircle, Check, FileBarChart, Activity, RefreshCcw, Download, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

// Mock component for ML visualization - in a real app this would use Recharts
const MLVisualization = ({ title, height = 300 }: { title: string; height?: number }) => {
  return (
    <div 
      className="w-full bg-muted/30 rounded-md flex items-center justify-center overflow-hidden"
      style={{ height: `${height}px` }}
    >
      <div className="w-full h-full px-4 py-4 relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-2">{title}</div>
          <p className="text-sm text-muted-foreground">ML visualization will appear here</p>
        </div>
        
        {/* Sample visualization elements */}
        <svg className="w-full h-full">
          {/* Generate random points to simulate data clusters */}
          <g className="opacity-80">
            {Array.from({ length: 50 }).map((_, i) => (
              <circle 
                key={`cluster1-${i}`}
                cx={Math.random() * 100 + 50}
                cy={Math.random() * 100 + 50}
                r={Math.random() * 3 + 1}
                fill="hsl(var(--primary))"
                className="opacity-60"
              />
            ))}
          </g>
          
          <g className="opacity-80">
            {Array.from({ length: 50 }).map((_, i) => (
              <circle 
                key={`cluster2-${i}`}
                cx={Math.random() * 100 + 200}
                cy={Math.random() * 100 + 150}
                r={Math.random() * 3 + 1}
                fill="hsl(var(--secondary))"
                className="opacity-60"
              />
            ))}
          </g>
          
          {/* Anomaly points */}
          <g>
            {Array.from({ length: 5 }).map((_, i) => (
              <circle 
                key={`anomaly-${i}`}
                cx={Math.random() * 300 + 50}
                cy={Math.random() * 200 + 50}
                r={4}
                fill="hsl(var(--destructive))"
                className="opacity-80"
              />
            ))}
          </g>
          
          {/* Decision boundary simulation */}
          <path 
            d={`M30,${height/2} Q${height/2},${height*0.2} ${height},${height/2}`}
            fill="none"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="1"
            strokeDasharray="5,5"
            className="opacity-40"
          />
        </svg>
      </div>
    </div>
  );
};

const MlSecurityDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ML Security Dashboard</h1>
          <p className="text-muted-foreground">Monitor and mitigate poisoning attacks in ML models</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
        </div>
      </div>
      
      {/* Security Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Security Status</CardTitle>
            <CardDescription>Current threat level and detection status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-6 flex items-center space-x-6 bg-green-50 rounded-md border border-green-100">
              <div className="p-3 bg-green-100 rounded-full">
                <Shield className="h-8 w-8 text-green-700" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-green-800">System Secure</h2>
                <p className="text-green-700">
                  No active threats detected. Normal operation mode.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground mb-1">Models Protected</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground mb-1">Attacks Detected</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground mb-1">Attacks Mitigated</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <div className="p-4 border rounded-md text-center">
                <p className="text-sm text-muted-foreground mb-1">Last Scan</p>
                <p className="text-2xl font-bold">2h ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Model Health</CardTitle>
            <CardDescription>ML model confidence scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">Diagnosis Model</p>
                    <p className="text-xs text-muted-foreground">Confidence score</p>
                  </div>
                  <span className="text-sm font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">Medication Response</p>
                    <p className="text-xs text-muted-foreground">Confidence score</p>
                  </div>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">Treatment Outcome</p>
                    <p className="text-xs text-muted-foreground">Confidence score</p>
                  </div>
                  <span className="text-sm font-medium">88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">Anomaly Detection</p>
                    <p className="text-xs text-muted-foreground">Confidence score</p>
                  </div>
                  <span className="text-sm font-medium">97%</span>
                </div>
                <Progress value={97} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* ML Security Tabs */}
      <Tabs defaultValue="anomalies">
        <TabsList className="mb-4">
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="attacks">Attack Simulations</TabsTrigger>
          <TabsTrigger value="models">Model Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">Security Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="anomalies">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>Identification of unusual patterns in model inputs or outputs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MLVisualization title="Input Data Anomalies" />
                <MLVisualization title="Model Output Anomalies" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Anomalies</h3>
                
                <div className="space-y-4">
                  {[
                    {
                      id: "ANM-7821",
                      description: "Unusual request pattern detected",
                      model: "Diagnostic Classification",
                      severity: "low",
                      timestamp: "Today, 10:15 AM",
                      status: "resolved"
                    },
                    {
                      id: "ANM-7820",
                      description: "Input data distribution shift",
                      model: "Treatment Recommendation",
                      severity: "medium",
                      timestamp: "Yesterday, 3:45 PM",
                      status: "resolved"
                    },
                    {
                      id: "ANM-7819",
                      description: "Potential poisoning attempt detected",
                      model: "Medication Response",
                      severity: "high",
                      timestamp: "May 15, 2025, 2:30 PM",
                      status: "resolved"
                    }
                  ].map((anomaly, index) => (
                    <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full 
                            ${anomaly.severity === "high" 
                              ? "bg-destructive/10" 
                              : anomaly.severity === "medium" 
                              ? "bg-orange-100" 
                              : "bg-yellow-100"}
                          `}>
                            <AlertCircle className={`h-4 w-4 
                              ${anomaly.severity === "high" 
                                ? "text-destructive" 
                                : anomaly.severity === "medium" 
                                ? "text-orange-600" 
                                : "text-yellow-600"}
                            `} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-medium">{anomaly.description}</h4>
                              <Badge variant="outline" className="text-xs">{anomaly.id}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Model: {anomaly.model}
                            </p>
                            <div className="flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{anomaly.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={
                            anomaly.severity === "high" 
                              ? "bg-destructive/10 text-destructive hover:bg-destructive/20" 
                              : anomaly.severity === "medium" 
                              ? "bg-orange-100 text-orange-800 hover:bg-orange-200" 
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          }>
                            {anomaly.severity} severity
                          </Badge>
                          <Badge variant="outline" className="bg-green-50 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            {anomaly.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attacks">
          <Card>
            <CardHeader>
              <CardTitle>Attack Simulations</CardTitle>
              <CardDescription>Simulated poisoning attacks and their impact</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Poisoning Impact</CardTitle>
                    <CardDescription>Model accuracy before and after attack</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MLVisualization title="Model Performance Impact" height={250} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Detection Success Rate</CardTitle>
                    <CardDescription>Effectiveness of poisoning detection</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MLVisualization title="Detection Rates by Attack Type" height={250} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Recent Attack Simulations</h3>
                
                <div className="space-y-4">
                  {[
                    {
                      type: "Data Poisoning",
                      target: "Diagnostic Classification",
                      success: "Detected and Mitigated",
                      accuracy: "-2.3% (Recovered)",
                      timestamp: "May 16, 2025"
                    },
                    {
                      type: "Model Poisoning",
                      target: "Treatment Recommendation",
                      success: "Detected and Mitigated",
                      accuracy: "-1.5% (Recovered)",
                      timestamp: "May 15, 2025"
                    },
                    {
                      type: "Evasion Attack",
                      target: "Medication Response",
                      success: "Detected and Mitigated",
                      accuracy: "-3.7% (Recovered)",
                      timestamp: "May 14, 2025"
                    }
                  ].map((attack, index) => (
                    <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-destructive/10 rounded-full">
                            <Shield className="h-5 w-5 text-destructive" />
                          </div>
                          <div>
                            <h4 className="font-medium">{attack.type}</h4>
                            <p className="text-sm text-muted-foreground">
                              Target: {attack.target}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mb-1">
                            {attack.success}
                          </Badge>
                          <p className="text-sm">
                            Accuracy Impact: {attack.accuracy}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {attack.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="models">
          <Card>
            <CardHeader>
              <CardTitle>Model Monitoring</CardTitle>
              <CardDescription>Continuous evaluation of machine learning models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Diagnostic Classification",
                    type: "Random Forest",
                    accuracy: "95.2%",
                    lastUpdated: "May 15, 2025",
                    status: "healthy",
                    threatLevel: "low"
                  },
                  {
                    name: "Treatment Recommendation",
                    type: "Neural Network",
                    accuracy: "92.8%",
                    lastUpdated: "May 14, 2025",
                    status: "healthy",
                    threatLevel: "low"
                  },
                  {
                    name: "Medication Response",
                    type: "Gradient Boosting",
                    accuracy: "88.5%",
                    lastUpdated: "May 16, 2025",
                    status: "healthy",
                    threatLevel: "low"
                  },
                  {
                    name: "Risk Assessment",
                    type: "XGBoost",
                    accuracy: "91.3%",
                    lastUpdated: "May 15, 2025",
                    status: "healthy",
                    threatLevel: "low"
                  },
                  {
                    name: "Anomaly Detection",
                    type: "Isolation Forest",
                    accuracy: "97.1%",
                    lastUpdated: "May 16, 2025",
                    status: "healthy",
                    threatLevel: "low"
                  }
                ].map((model, index) => (
                  <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-primary/10 rounded-full">
                          <FileBarChart className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Type: {model.type}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <Badge variant="outline">
                              Accuracy: {model.accuracy}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              Last Updated: {model.lastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          {model.status}
                        </Badge>
                        <div className="flex items-center justify-end space-x-1">
                          <Activity className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Threat Level: {model.threatLevel}
                          </span>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Security Analytics</CardTitle>
              <CardDescription>In-depth analysis of security metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <MLVisualization title="Threat Detection Rate Over Time" />
                  <MLVisualization title="Model Performance vs. Attack Frequency" />
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Attack Types Distribution</CardTitle>
                      <CardDescription>Categories of detected attacks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Data Poisoning</p>
                            <span className="text-sm font-medium">65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Model Poisoning</p>
                            <span className="text-sm font-medium">20%</span>
                          </div>
                          <Progress value={20} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Evasion Attacks</p>
                            <span className="text-sm font-medium">10%</span>
                          </div>
                          <Progress value={10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Other</p>
                            <span className="text-sm font-medium">5%</span>
                          </div>
                          <Progress value={5} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Defense Effectiveness</CardTitle>
                      <CardDescription>Success rate of security measures</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Detection Rate</p>
                            <span className="text-sm font-medium">98.2%</span>
                          </div>
                          <Progress value={98.2} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">False Positives</p>
                            <span className="text-sm font-medium">1.5%</span>
                          </div>
                          <Progress value={1.5} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Mitigation Success</p>
                            <span className="text-sm font-medium">99.1%</span>
                          </div>
                          <Progress value={99.1} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-1">
                            <p className="text-sm font-medium">Recovery Speed</p>
                            <span className="text-sm font-medium">95.5%</span>
                          </div>
                          <Progress value={95.5} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Last analyzed: May 16, 2025, 11:30 AM
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MlSecurityDashboard;
