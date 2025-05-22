
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, RefreshCcw } from 'lucide-react';

// Mock component for charts - in a real app this would use Recharts
const MetricChart = ({ title, description, height = 300 }: { title: string; description: string; height?: number }) => {
  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {/* This would be replaced with an actual chart component */}
      <div 
        className="w-full bg-muted/30 rounded-md flex items-center justify-center overflow-hidden"
        style={{ height: `${height}px` }}
      >
        <div className="w-full h-full px-4 py-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Chart visualization will appear here</p>
          </div>
          
          {/* Sample chart lines */}
          <svg className="w-full h-full">
            <path 
              d={`M0,${height * 0.7} C${height * 0.3},${height * 0.3} ${height * 0.6},${height * 0.8} ${height},${height * 0.2}`} 
              fill="none" 
              stroke="hsl(var(--primary))" 
              strokeWidth="3"
              className="opacity-70"
            />
            <path 
              d={`M0,${height * 0.5} C${height * 0.4},${height * 0.6} ${height * 0.7},${height * 0.4} ${height},${height * 0.6}`} 
              fill="none" 
              stroke="hsl(var(--secondary))" 
              strokeWidth="3"
              className="opacity-70"
            />
            {/* Generate random points for the chart background */}
            {Array.from({ length: 30 }).map((_, i) => (
              <circle 
                key={i}
                cx={Math.random() * height}
                cy={Math.random() * height}
                r={Math.random() * 3 + 1}
                fill="hsl(var(--muted-foreground))"
                className="opacity-10"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

const PerformanceMetrics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Metrics</h1>
          <p className="text-muted-foreground">System and network performance evaluation</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh Metrics
          </Button>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Throughput Ratio</h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold">85%</p>
              <p className="text-sm text-green-600">+2.5%</p>
            </div>
            <div className="mt-4 w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '85%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Packet Delivery Ratio</h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold">92%</p>
              <p className="text-sm text-green-600">+1.2%</p>
            </div>
            <div className="mt-4 w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-secondary" style={{ width: '92%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Energy Consumption</h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold">42%</p>
              <p className="text-sm text-green-600">-5.3%</p>
            </div>
            <div className="mt-4 w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-accent" style={{ width: '42%' }}></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">End-to-End Delay</h3>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold">120ms</p>
              <p className="text-sm text-destructive">+15ms</p>
            </div>
            <div className="mt-4 w-full h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: '30%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Metrics */}
      <Tabs defaultValue="network">
        <TabsList className="mb-4">
          <TabsTrigger value="network">Network Performance</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain Metrics</TabsTrigger>
          <TabsTrigger value="system">System Resources</TabsTrigger>
          <TabsTrigger value="historical">Historical Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Network Performance Metrics</CardTitle>
              <CardDescription>Detailed analysis of network performance captured by Wireshark and Caliper</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MetricChart 
                  title="Throughput Ratio Over Time" 
                  description="Packets successfully delivered per unit time"
                />
                <MetricChart 
                  title="Packet Delivery Ratio" 
                  description="Percentage of packets successfully delivered"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MetricChart 
                  title="End-to-End Delay" 
                  description="Time taken for packets to traverse the network"
                />
                <MetricChart 
                  title="Network Traffic Analysis" 
                  description="Volume and patterns of network traffic"
                />
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Last updated: May 16, 2025, 11:30 AM
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle>Blockchain Performance Metrics</CardTitle>
              <CardDescription>Smart contract execution and IPFS storage performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MetricChart 
                  title="Smart Contract Execution Time" 
                  description="Time taken to execute blockchain operations"
                />
                <MetricChart 
                  title="Transaction Throughput" 
                  description="Number of transactions per second"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <MetricChart 
                  title="Gas Usage" 
                  description="Computational resources used by transactions"
                />
                <MetricChart 
                  title="IPFS Storage Metrics" 
                  description="File storage and retrieval performance"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Resource Utilization</CardTitle>
              <CardDescription>CPU, memory, and energy consumption metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MetricChart 
                  title="CPU Utilization" 
                  description="Processor usage across system components"
                />
                <MetricChart 
                  title="Memory Usage" 
                  description="RAM allocation and consumption"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <MetricChart 
                  title="Energy Consumption" 
                  description="Power usage across system components"
                />
                <MetricChart 
                  title="Disk I/O" 
                  description="Storage read/write operations"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="historical">
          <Card>
            <CardHeader>
              <CardTitle>Historical Performance Data</CardTitle>
              <CardDescription>Long-term performance trends and analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <MetricChart 
                  title="Monthly Performance Trends" 
                  description="Key metrics over the past 12 months"
                  height={400}
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <MetricChart 
                    title="Peak Usage Periods" 
                    description="System performance during high-load periods"
                  />
                  <MetricChart 
                    title="Performance Optimization Impact" 
                    description="Effects of system optimizations over time"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetrics;
