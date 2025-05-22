
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PatientDashboard from "./pages/patient/PatientDashboard";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import LabDashboard from "./pages/lab/LabDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PatientRecords from "./pages/patient/PatientRecords";
import DoctorRecords from "./pages/doctor/DoctorRecords";
import LabRecords from "./pages/lab/LabRecords";
import UserManagement from "./pages/admin/UserManagement";
import PerformanceMetrics from "./pages/admin/PerformanceMetrics";
import BlockchainExplorer from "./pages/admin/BlockchainExplorer";
import MlSecurityDashboard from "./pages/admin/MlSecurityDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin" />}>
              <Route path="" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="metrics" element={<PerformanceMetrics />} />
              <Route path="blockchain" element={<BlockchainExplorer />} />
              <Route path="ml-security" element={<MlSecurityDashboard />} />
            </Route>
            
            {/* Patient Routes */}
            <Route path="/patient" element={<ProtectedRoute role="patient" />}>
              <Route path="" element={<PatientDashboard />} />
              <Route path="records" element={<PatientRecords />} />
            </Route>
            
            {/* Doctor Routes */}
            <Route path="/doctor" element={<ProtectedRoute role="doctor" />}>
              <Route path="" element={<DoctorDashboard />} />
              <Route path="records" element={<DoctorRecords />} />
            </Route>
            
            {/* Lab Routes */}
            <Route path="/lab" element={<ProtectedRoute role="lab" />}>
              <Route path="" element={<LabDashboard />} />
              <Route path="records" element={<LabRecords />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
