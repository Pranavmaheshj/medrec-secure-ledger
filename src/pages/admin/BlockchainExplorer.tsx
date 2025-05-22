
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Database, Clock, FileText, User, Lock, Key, CheckCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BlockchainExplorer = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blockchain Explorer</h1>
          <p className="text-muted-foreground">Monitor blockchain transactions and smart contracts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Connect Wallet</Button>
          <Button>Refresh</Button>
        </div>
      </div>
      
      {/* Search Blockchain */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by transaction hash, block number, or address"
                className="pl-8"
              />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Blockchain Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Block</p>
              <p className="text-2xl font-bold">10,247</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-secondary/10 p-3 rounded-full">
              <FileText className="h-6 w-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Smart Contracts</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Lock className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">IPFS Files</p>
              <p className="text-2xl font-bold">1,892</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center space-x-4">
            <div className="bg-muted p-3 rounded-full">
              <Clock className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Block Time</p>
              <p className="text-2xl font-bold">3.2s</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Blockchain Explorer Tabs */}
      <Tabs defaultValue="transactions">
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="blocks">Blocks</TabsTrigger>
          <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
          <TabsTrigger value="ipfs">IPFS Storage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest blockchain transaction records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction Hash</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      hash: "0x71c...a3ef8",
                      type: "grant_access",
                      from: "0x93b...7e21",
                      to: "0x42d...f18c",
                      timestamp: "2 mins ago",
                      status: "confirmed"
                    },
                    {
                      hash: "0x82a...f2d4",
                      type: "create_record",
                      from: "0x71e...9c32",
                      to: "0x00a...1234",
                      timestamp: "10 mins ago",
                      status: "confirmed"
                    },
                    {
                      hash: "0x57e...8c42",
                      type: "revoke_access",
                      from: "0x93b...7e21",
                      to: "0x67f...a2d1",
                      timestamp: "25 mins ago",
                      status: "confirmed"
                    },
                    {
                      hash: "0x39f...2b71",
                      type: "update_record",
                      from: "0x42d...f18c",
                      to: "0x00a...1234",
                      timestamp: "1 hour ago",
                      status: "confirmed"
                    },
                    {
                      hash: "0x28d...c4e7",
                      type: "create_user",
                      from: "0x00a...1234",
                      to: "0x91c...7d32",
                      timestamp: "2 hours ago",
                      status: "confirmed"
                    }
                  ].map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-1">
                          <Key className="h-3 w-3 text-muted-foreground" />
                          <span>{tx.hash}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {tx.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{tx.from}</TableCell>
                      <TableCell className="font-mono text-xs">{tx.to}</TableCell>
                      <TableCell>{tx.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          <span className="text-sm capitalize">{tx.status}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blocks">
          <Card>
            <CardHeader>
              <CardTitle>Recent Blocks</CardTitle>
              <CardDescription>Latest blockchain blocks containing transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    number: "10,247",
                    hash: "0xb1c...7d9e8",
                    timestamp: "2 mins ago",
                    transactions: 12,
                    miner: "0x71e...9c32"
                  },
                  {
                    number: "10,246",
                    hash: "0xa7f...9c31",
                    timestamp: "5 mins ago",
                    transactions: 8,
                    miner: "0x93b...7e21"
                  },
                  {
                    number: "10,245",
                    hash: "0xd3e...f21a",
                    timestamp: "10 mins ago",
                    transactions: 15,
                    miner: "0x71e...9c32"
                  },
                  {
                    number: "10,244",
                    hash: "0x72c...a19d",
                    timestamp: "14 mins ago",
                    transactions: 6,
                    miner: "0x42d...f18c"
                  }
                ].map((block, index) => (
                  <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                          <Database className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">Block #{block.number}</h3>
                            <Badge variant="outline" className="text-xs">
                              {block.transactions} txs
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            <span className="font-mono">{block.hash}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{block.timestamp}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Mined by: {block.miner}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contracts</CardTitle>
              <CardDescription>Active smart contracts in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "UserRegistry",
                    address: "0x00a...1234",
                    deployedOn: "January 15, 2025",
                    transactions: 1245,
                    status: "active"
                  },
                  {
                    name: "RecordAccess",
                    address: "0x12b...9876",
                    deployedOn: "January 15, 2025",
                    transactions: 7892,
                    status: "active"
                  },
                  {
                    name: "EHRStorage",
                    address: "0x34c...5432",
                    deployedOn: "January 15, 2025",
                    transactions: 3215,
                    status: "active"
                  },
                  {
                    name: "AccessLog",
                    address: "0x56d...7654",
                    deployedOn: "January 15, 2025",
                    transactions: 9874,
                    status: "active"
                  }
                ].map((contract, index) => (
                  <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-secondary/10 rounded-full">
                          <FileText className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{contract.name}</h3>
                          <p className="text-sm font-mono mt-1">{contract.address}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Deployed on {contract.deployedOn}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={contract.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}>
                          {contract.status}
                        </Badge>
                        <p className="text-sm mt-2">
                          {contract.transactions} transactions
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ipfs">
          <Card>
            <CardHeader>
              <CardTitle>IPFS Storage</CardTitle>
              <CardDescription>Decentralized storage for encrypted patient records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    cid: "QmZ9...7a2b",
                    type: "Medical Record",
                    size: "2.3 MB",
                    uploaded: "Today, 10:15 AM",
                    owner: "0x93b...7e21"
                  },
                  {
                    cid: "QmX8...1c3d",
                    type: "Lab Result",
                    size: "1.5 MB",
                    uploaded: "Today, 9:30 AM",
                    owner: "0x71e...9c32"
                  },
                  {
                    cid: "QmR7...2d4e",
                    type: "X-Ray Image",
                    size: "8.2 MB",
                    uploaded: "Yesterday, 4:45 PM",
                    owner: "0x42d...f18c"
                  },
                  {
                    cid: "QmT6...3e5f",
                    type: "Medical Record",
                    size: "1.8 MB",
                    uploaded: "Yesterday, 2:20 PM",
                    owner: "0x67f...a2d1"
                  }
                ].map((file, index) => (
                  <div key={index} className="p-4 border rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-accent/20 rounded-full">
                          <Lock className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div>
                          <h3 className="font-medium font-mono">{file.cid}</h3>
                          <div className="flex items-center space-x-3 mt-1">
                            <Badge variant="outline">{file.type}</Badge>
                            <span className="text-sm text-muted-foreground">{file.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">{file.uploaded}</p>
                        <div className="flex items-center justify-end mt-1 text-xs text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          Owner: {file.owner}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlockchainExplorer;
