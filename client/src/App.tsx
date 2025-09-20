import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth-simple";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Suspense, lazy, useState, useEffect } from "react";
import { Loader2, Stethoscope, Pill, TestTube, UserCheck, Heart, Activity, Syringe, Microscope } from "lucide-react";

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

// Professional medical loading component with cycling icons
function LazyLoadingSpinner() {
  const medicalIcons = [
    { icon: Stethoscope, label: "Doctor", color: "text-blue-500" },
    { icon: Pill, label: "Pharmacy", color: "text-green-500" },
    { icon: TestTube, label: "Laboratory", color: "text-purple-500" },
    { icon: UserCheck, label: "Patient", color: "text-orange-500" },
    { icon: Heart, label: "Cardiology", color: "text-red-500" },
    { icon: Activity, label: "Monitoring", color: "text-cyan-500" },
    { icon: Syringe, label: "Treatment", color: "text-pink-500" },
    { icon: Microscope, label: "Pathology", color: "text-indigo-500" }
  ];

  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const iconInterval = setInterval(() => {
      setCurrentIconIndex((prev) => (prev + 1) % medicalIcons.length);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev + 2) % 100);
    }, 50);

    return () => {
      clearInterval(iconInterval);
      clearInterval(progressInterval);
    };
  }, [medicalIcons.length]);

  const CurrentIcon = medicalIcons[currentIconIndex].icon;
  const currentLabel = medicalIcons[currentIconIndex].label;
  const currentColor = medicalIcons[currentIconIndex].color;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <div className="text-center space-y-6 max-w-sm mx-auto px-6">
        {/* Main Icon Animation */}
        <div className="relative">
          <div className="absolute inset-0 h-16 w-16 mx-auto">
            <div className="h-full w-full rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
            <div 
              className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-medical-blue border-t-transparent animate-spin"
              style={{ animationDuration: '1.5s' }}
            ></div>
          </div>
          <div className={`relative z-10 transition-all duration-500 transform ${currentColor}`}>
            <CurrentIcon className="h-16 w-16 mx-auto animate-pulse" />
          </div>
        </div>

        {/* Department Label */}
        <div className="space-y-2">
          <p className="text-xl font-bold text-gray-800 dark:text-gray-200 transition-all duration-500">
            {currentLabel}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            NAKSHATRA HOSPITAL
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-medical-blue via-cyan-500 to-blue-600 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
          Loading Hospital Management System...
        </p>

        {/* Medical Icons Preview */}
        <div className="flex justify-center space-x-2 mt-4">
          {medicalIcons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`transition-all duration-300 ${
                  index === currentIconIndex 
                    ? 'scale-125 opacity-100' 
                    : 'scale-75 opacity-40'
                }`}
              >
                <Icon className={`h-4 w-4 ${item.color}`} />
              </div>
            );
          })}
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
