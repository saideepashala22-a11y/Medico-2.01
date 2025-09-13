import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth-simple";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Suspense, lazy } from "react";
import { Loader2 } from "lucide-react";

// Lazy load all page components for better performance
const NotFound = lazy(() => import("@/pages/not-found"));
const Login = lazy(() => import("@/pages/login"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Lab = lazy(() => import("@/pages/lab"));
const LabTests = lazy(() => import("@/pages/lab/lab-tests"));
const LabPatientRegistration = lazy(() => import("@/pages/lab/patient-registration"));
const CentralPatientRegistration = lazy(() => import("@/pages/patient-registration"));
const TestSelection = lazy(() => import("@/pages/lab/test-selection"));
const EnterResults = lazy(() => import("@/pages/lab/enter-results"));
const LabReport = lazy(() => import("@/pages/lab/report"));
const Pharmacy = lazy(() => import("@/pages/pharmacy"));
const Discharge = lazy(() => import("@/pages/discharge"));
const MedicalHistory = lazy(() => import("@/pages/medical-history"));
const Consultation = lazy(() => import("@/pages/consultation"));
const SurgicalCaseSheets = lazy(() => import("@/pages/surgical-case-sheets"));
const Settings = lazy(() => import("@/pages/settings"));
const DoctorsManagement = lazy(() => import("@/pages/doctors"));
const MedicineForm = lazy(() => import("@/pages/medicine-form"));
const PatientsListPage = lazy(() => import("@/pages/patients-list"));
const LabRevenuePage = lazy(() => import("@/pages/lab-revenue"));

// Mobile-optimized loading component
function LazyLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-4">
        <div className="relative">
          <Loader2 className="h-12 w-12 animate-spin text-medical-blue mx-auto" />
          <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-medical-blue/20 mx-auto animate-pulse"></div>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">Loading...</p>
          <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-medical-blue to-indigo-500 rounded-full animate-pulse w-3/4 transition-all duration-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-medical-blue" />
      </div>
    );
  }

  if (!user) {
    return (
      <Suspense fallback={<LazyLoadingSpinner />}>
        <Login />
      </Suspense>
    );
  }

  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-medical-blue" />
      </div>
    );
  }

  if (user) {
    return (
      <Suspense fallback={<LazyLoadingSpinner />}>
        <Dashboard />
      </Suspense>
    );
  }

  return <>{children}</>;
}

function TitleManager() {
  useDocumentTitle();
  return null;
}

function Router() {
  return (
    <>
      <TitleManager />
      <Switch>
        <Route path="/login">
          <PublicRoute>
            <Suspense fallback={<LazyLoadingSpinner />}>
              <Login />
            </Suspense>
          </PublicRoute>
        </Route>
      
      <Route path="/dashboard">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <Dashboard />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/patient-registration">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <CentralPatientRegistration />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/lab">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <Lab />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/lab/lab-tests">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <LabTests />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/lab/patient-registration">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <LabPatientRegistration />
          </Suspense>
        </ProtectedRoute>
      </Route>
      <Route path="/lab/test-selection/:patientId">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <TestSelection />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/lab/enter-results/:testId">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <EnterResults />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/lab/report/:labTestId">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <LabReport />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/lab/revenue">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <LabRevenuePage />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/pharmacy">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <Pharmacy />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/pharmacy/medicine/new">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <MedicineForm />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/pharmacy/medicine/edit/:id">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <MedicineForm />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/discharge">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <Discharge />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/medical-history">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <MedicalHistory />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/consultation">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <Consultation />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/surgical-case-sheets">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <SurgicalCaseSheets />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/settings">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <Settings />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/doctors">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <DoctorsManagement />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/patients-list">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <PatientsListPage />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      <Route path="/">
        <ProtectedRoute>
          <Suspense fallback={<LazyLoadingSpinner />}>
            <Dashboard />
          </Suspense>
        </ProtectedRoute>
      </Route>
      
      {/* Fallback to 404 */}
      <Route>
        <Suspense fallback={<LazyLoadingSpinner />}>
          <NotFound />
        </Suspense>
      </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
