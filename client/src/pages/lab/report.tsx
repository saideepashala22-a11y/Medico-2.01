import { useAuth } from "@/hooks/use-auth-simple";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  Download,
  FileText,
  User,
  TestTube,
  Calendar,
  Stethoscope,
} from "lucide-react";
import jsPDF from "jspdf";
import JsBarcode from 'jsbarcode';
import { ThemeToggle } from "@/components/ThemeToggle";

// Helper function to generate barcode as base64 image
function generateBarcodeImage(text: string): string {
  const canvas = document.createElement('canvas');
  JsBarcode(canvas, text, {
    format: "CODE128",
    width: 1.5,
    height: 25, // Small height for lab report
    displayValue: false, // Remove text display
    margin: 0,
    background: "#ffffff",
    lineColor: "#000000"
  });
  return canvas.toDataURL('image/png');
}

const testNames = {
  cbc: "Complete Blood Count (CBC)",
  blood_sugar: "Blood Sugar Test",
  lipid_profile: "Lipid Profile",
  liver_function: "Liver Function Test",
  xray_chest: "X-Ray Chest",
  urine_test: "Urine Analysis",
};

export default function LabReport() {
  const { user } = useAuth();
  const { toast } = useToast();
  const params = useParams();
  const labTestId = params.labTestId;

  // Fetch current doctor for dynamic referral
  const { data: currentDoctor } = useQuery<{
    id: string;
    name: string;
    email?: string;
    specialization?: string;
  }>({
    queryKey: ["/api/current-doctor"],
    staleTime: 30 * 1000, // Cache for 30 seconds
  });

  // Fetch lab test details
  const { data: labTest, isLoading } = useQuery<{
    id: string;
    testTypes: Array<{
      id: string;
      testName: string;
      department: string;
      cost: number;
    }>;
    results: string;
    doctorNotes?: string;
    totalCost: string;
    createdAt: string;
    patient: {
      id: string;
      mruNumber: string;
      fullName: string;
      age: number;
      gender: string;
      contactPhone?: string;
      referringDoctor?: string;
    };
  }>({
    queryKey: ["/api/lab-tests", labTestId],
    enabled: !!labTestId,
  });

  // Fetch hospital settings for PDF generation
  const { data: hospitalSettings } = useQuery<{
    hospitalName: string;
    hospitalSubtitle?: string;
    address?: string;
    phone?: string;
    email?: string;
    accreditation?: string;
  }>({
    queryKey: ["/api/hospital-settings"],
    staleTime: 0, // Always fetch fresh data for PDFs
  });

  // Utility function to parse reference ranges and check if value is abnormal
  const parseReferenceRange = (normalRange: string, gender?: string): { min?: number; max?: number; isAbnormal: boolean } => {
    if (!normalRange || normalRange === 'Consult reference values' || normalRange === 'Morphological assessment' || 
        normalRange === 'Functional assessment' || normalRange === 'Adequacy assessment' || normalRange === 'Collection method') {
      return { isAbnormal: false };
    }

    let rangeToUse = normalRange;

    // Handle gender-specific ranges like "(M) 13.5-18 gms%|(F) 11.5-16 gms%"
    if (normalRange.includes('|') && gender) {
      const ranges = normalRange.split('|');
      const genderPrefix = gender.toLowerCase() === 'male' ? '(M)' : '(F)';
      const matchingRange = ranges.find(range => range.trim().startsWith(genderPrefix));
      if (matchingRange) {
        rangeToUse = matchingRange.replace(/^\(M\)\s*|\(F\)\s*/, '').trim();
      } else {
        // Default to first range if gender doesn't match
        rangeToUse = ranges[0].replace(/^\(M\)\s*|\(F\)\s*/, '').trim();
      }
    } else if (normalRange.includes('|')) {
      // If no gender specified, use first range
      rangeToUse = normalRange.split('|')[0].replace(/^\(M\)\s*|\(F\)\s*/, '').trim();
    }

    // Handle different range formats
    let min: number | undefined;
    let max: number | undefined;

    // Pattern: "80 - 100 fL" or "13.5 - 18 gms%"
    const dashRangeMatch = rangeToUse.match(/(\d+\.?\d*)\s*-\s*(\d+\.?\d*)/);
    if (dashRangeMatch) {
      min = parseFloat(dashRangeMatch[1]);
      max = parseFloat(dashRangeMatch[2]);
      return { min, max, isAbnormal: false };
    }

    // Pattern: "<140 mg/dL" or "<200"
    const lessThanMatch = rangeToUse.match(/<\s*(\d+\.?\d*)/);
    if (lessThanMatch) {
      max = parseFloat(lessThanMatch[1]);
      return { max, isAbnormal: false };
    }

    // Pattern: ">5.0" (rarely used but could exist)
    const greaterThanMatch = rangeToUse.match(/>\s*(\d+\.?\d*)/);
    if (greaterThanMatch) {
      min = parseFloat(greaterThanMatch[1]);
      return { min, isAbnormal: false };
    }

    // Pattern: "4000-11000/Cumm" (numbers with units)
    const numberRangeMatch = rangeToUse.match(/(\d+)-(\d+)/);
    if (numberRangeMatch) {
      min = parseFloat(numberRangeMatch[1]);
      max = parseFloat(numberRangeMatch[2]);
      return { min, max, isAbnormal: false };
    }

    return { isAbnormal: false };
  };

  // Check if a value exceeds reference interval
  const isValueAbnormal = (value: string, normalRange: string, gender?: string): boolean => {
    // For text-based parameters, never abnormal
    if (!value || isNaN(parseFloat(value))) return false;
    
    const numValue = parseFloat(value);
    const { min, max } = parseReferenceRange(normalRange, gender);

    if (min !== undefined && numValue < min) return true;
    if (max !== undefined && numValue > max) return true;
    
    return false;
  };

  const generatePDF = () => {
    if (!labTest) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    try {
      // Professional Medical Header with Hospital Branding
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      const hospitalName =
        hospitalSettings?.hospitalName || "NAKSHATRA HOSPITAL";
      // Convert hospital name to diagnostics name for lab reports
      const diagnosticsName = hospitalName.replace(
        /\bHOSPITAL\b/i,
        "DIAGNOSTICS",
      );
      doc.text(diagnosticsName, pageWidth / 2, 15, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      
      let currentY = 22;
      
      // Only show subtitle if it exists
      if (hospitalSettings?.hospitalSubtitle) {
        doc.text(hospitalSettings.hospitalSubtitle, pageWidth / 2, currentY, { align: "center" });
        currentY += 6;
      }

      // Only show address if it exists
      if (hospitalSettings?.address) {
        doc.text(hospitalSettings.address, pageWidth / 2, currentY, { align: "center" });
        currentY += 6;
      }

      // Show phone and email only if they exist
      const phone = hospitalSettings?.phone;
      const email = hospitalSettings?.email;
      
      if (phone && email) {
        doc.text(`Phone: ${phone} | Email: ${email}`, pageWidth / 2, currentY, { align: "center" });
        currentY += 6;
      } else if (phone) {
        doc.text(`Phone: ${phone}`, pageWidth / 2, currentY, { align: "center" });
        currentY += 6;
      } else if (email) {
        doc.text(`Email: ${email}`, pageWidth / 2, currentY, { align: "center" });
        currentY += 6;
      }

      // Only show accreditation if it exists
      if (hospitalSettings?.accreditation) {
        doc.text(hospitalSettings.accreditation, pageWidth / 2, currentY, { align: "center" });
        currentY += 6;
      }

      // Document Title
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      const titleY = 37;
      doc.text("LABORATORY INVESTIGATION REPORT", pageWidth / 2, titleY, {
        align: "center",
      });

      // Patient Information Box
      doc.setLineWidth(0.3);
      const boxY = 41;
      doc.rect(15, boxY, pageWidth - 30, 40);

      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("PATIENT DETAILS", 20, boxY + 7);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Patient ID: ${labTest.patient.mruNumber || "N/A"}`, 20, boxY + 15);
      doc.text(`Patient Name: ${labTest.patient.fullName || "N/A"}`, 20, boxY + 22);
      doc.text(
        `Age/Gender: ${labTest.patient.age || "N/A"} Years / ${labTest.patient.gender || "N/A"}`,
        20,
        boxY + 29,
      );
      if (labTest.patient.contactPhone) {
        doc.text(`Contact: ${labTest.patient.contactPhone}`, 20, boxY + 36);
      }

      // Test Information (Right side of patient box)
      doc.setFont("helvetica", "bold");
      doc.text("TEST DETAILS", 120, boxY + 7);

      doc.setFont("helvetica", "normal");
      const testDate = new Date(labTest.createdAt);
      doc.text(
        `Collection Date: ${testDate.toLocaleDateString("en-IN")}`,
        120,
        boxY + 15,
      );
      doc.text(
        `Report Date: ${new Date().toLocaleDateString("en-IN")}`,
        120,
        boxY + 22,
      );
      doc.text(
        `Lab No: LAB-${labTest.id.substring(0, 8).toUpperCase()}`,
        120,
        boxY + 29,
      );
      // Use patient's referring doctor, or fall back to current selected doctor, or default
      const getReferringDoctor = () => {
        if (labTest.patient.referringDoctor) {
          return labTest.patient.referringDoctor;
        }
        if (currentDoctor?.name) {
          // Check if name already starts with "Dr." to avoid duplication
          return currentDoctor.name.startsWith("Dr.")
            ? currentDoctor.name
            : `Dr. ${currentDoctor.name}`;
        }
        return "Dr. Consulting Physician";
      };
      const referringDoctor = getReferringDoctor();
      doc.text(`Referring Doctor: ${referringDoctor}`, 120, boxY + 36);

      // Test Results Table Header
      let yPos = boxY + 48;
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("COMPLETE BLOOD PICTURE", 20, yPos);

      yPos += 6;

      // Table Headers (simplified without borders)

      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("INVESTIGATION", 20, yPos + 6);
      doc.text("VALUE", 90, yPos + 8);
      doc.text("UNIT", 120, yPos + 8);
      doc.text("REFERENCE RANGE", 140, yPos + 8);

      yPos += 18; // More space after headers

      // Test Results Data
      doc.setFont("helvetica", "normal");

      try {
        // labTest.results is already an array of objects, no need to parse
        if (
          labTest.results &&
          Array.isArray(labTest.results) &&
          labTest.results.length > 0
        ) {
          const results = labTest.results;

          if (results.length > 0) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);

            results.forEach((testResult, index) => {
              if (testResult.value && testResult.value.trim() !== "") {
                // Test name
                doc.setFont("helvetica", "normal");
                doc.text(testResult.testName || "Unknown Test", 20, yPos + 2);

                // Result value (bold only if exceeds reference range)
                const referenceRange = testResult.normalRange || "Consult reference";
                const patientGender = labTest.patient?.gender;
                const valueIsAbnormal = isValueAbnormal(String(testResult.value), referenceRange, patientGender);
                
                if (valueIsAbnormal) {
                  doc.setFont("helvetica", "bold");
                } else {
                  doc.setFont("helvetica", "normal");
                }
                doc.text(String(testResult.value), 90, yPos + 2);
                doc.setFont("helvetica", "normal");

                // Unit - convert old formats to new formats, skip units for descriptive assessments
                const isDescriptiveTest =
                  testResult.testName === "a. RBC's" ||
                  testResult.testName === "b. WBC's" ||
                  testResult.testName === "c. PLATELETS";

                if (!isDescriptiveTest) {
                  let displayUnit = testResult.unit || "units";

                  // Convert old unit formats to new ones
                  if (testResult.testName === "Total R.B.C COUNT") {
                    if (
                      displayUnit.includes("million") ||
                      displayUnit.includes("μL")
                    ) {
                      displayUnit = "Mill/Cumm";
                    }
                  } else if (testResult.testName === "HAEMOGLOBIN") {
                    if (displayUnit === "g/dL") {
                      displayUnit = "gms%";
                    }
                  } else if (testResult.testName === "W.B.C (TOTAL)") {
                    if (displayUnit.includes("μL")) {
                      displayUnit = "/Cumm";
                    }
                  } else if (testResult.testName === "PLATELETS COUNT") {
                    if (
                      displayUnit.includes("μL") ||
                      displayUnit.includes("/μL")
                    ) {
                      displayUnit = "Lakhs/Cumm";
                    }
                  } else if (testResult.testName === "P.C.V") {
                    if (displayUnit === "%") {
                      displayUnit = "Vol%";
                    }
                  }

                  doc.text(displayUnit, 120, yPos + 2);
                }

                // Reference range - handle gender-specific ranges
                let normalRange = testResult.normalRange || "Consult reference";

                // Convert old format "(F), (M)" to new format "(M)|(F)"
                if (
                  normalRange.includes("(F)") &&
                  normalRange.includes("(M)")
                ) {
                  // Extract male and female ranges from old format
                  const femaleMatch = normalRange.match(/([^,]+\(F\)[^,]*)/);
                  const maleMatch = normalRange.match(/([^,]+\(M\)[^,]*)/);

                  if (femaleMatch && maleMatch) {
                    const femaleRange = femaleMatch[1].trim();
                    const maleRange = maleMatch[1].trim();
                    normalRange = `${maleRange}|${femaleRange}`;
                  }
                }

                if (normalRange.includes("|")) {
                  // Split gender-specific ranges (male first, female second)
                  const [maleRange, femaleRange] = normalRange.split("|");
                  doc.text(maleRange.trim(), 140, yPos + 2);
                  doc.text(femaleRange.trim(), 140, yPos + 6);
                  yPos += 6; // Extra space for two-line reference
                } else {
                  doc.text(normalRange, 140, yPos + 2);
                }

                yPos += 12; // Increased spacing between rows
              }
            });
          }
        }
      } catch (error) {
        console.error("Error parsing results:", error);
      }

      // Clinical Notes Section
      if (labTest.doctorNotes) {
        yPos += 15;
        doc.setLineWidth(0.3);
        doc.rect(15, yPos - 5, pageWidth - 30, 30);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("CLINICAL INTERPRETATION & REMARKS:", 20, yPos + 2);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const splitNotes = doc.splitTextToSize(labTest.doctorNotes, 170);
        doc.text(splitNotes, 20, yPos + 10);
        yPos += 30;
      }

      // Check if we need a new page for footer section
      yPos += 40;
      console.log(
        "🔍 Position before footer:",
        yPos,
        "Page height:",
        pageHeight,
      );

      if (yPos > pageHeight - 80) {
        doc.addPage();
        yPos = 30; // Start from top of new page
      }

      // NOTE text, barcode and Lab Incharge positioned at bottom
      const bottomMargin = 35; // Space from bottom for NOTE, barcode line and end text
      const noteY = pageHeight - bottomMargin;
      const barcodeLineY = pageHeight - 30; // Barcode just below NOTE
      
      // NOTE text (just above barcode)
      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text(
        "NOTE : Please Correlate Clinically if necessary kindly discuss",
        20,
        noteY,
      );
      
      // Generate barcode for lab test ID
      const barcodeData = labTest.id.slice(-8); // Use last 8 characters of test ID
      try {
        const barcodeImage = generateBarcodeImage(barcodeData);
        // Add small barcode on left side
        const barcodeWidth = 60;
        const barcodeHeight = 10; // Reduced by 50% from 20 to 10
        doc.addImage(barcodeImage, 'PNG', 20, barcodeLineY, barcodeWidth, barcodeHeight);
      } catch (error) {
        console.warn('Failed to add barcode:', error);
        // Fallback: Add simple text
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(`ID: ${barcodeData}`, 20, barcodeLineY + 5);
      }

      // Lab Incharge on right side (same horizontal line as barcode)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Lab Incharge", pageWidth - 40, barcodeLineY + 6, { align: "right" });

      // Report Footer (at the very bottom of the page)
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.text("*** End of Report ***", pageWidth / 2, pageHeight - 10, {
        align: "center",
      });

      // Save
      doc.save(
        `Lab-Report-${labTest.patient.mruNumber || "Unknown"}-${new Date().toISOString().split("T")[0]}.pdf`,
      );

      toast({
        title: "Success",
        description: "Professional lab report downloaded successfully",
        duration: 500, // 0.5 seconds
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Error",
        description: "Failed to generate PDF report",
        variant: "destructive",
      });
    }
  };

  if (!labTestId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Lab test ID is required</p>
          <Link href="/lab/patient-registration">
            <Button>Start New Test</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">Loading lab test report...</div>
      </div>
    );
  }

  if (!labTest) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">Lab test not found</p>
          <Link href="/lab/patient-registration">
            <Button>Start New Test</Button>
          </Link>
        </div>
      </div>
    );
  }

  let parsedResults: any = {};
  try {
    parsedResults = labTest.results ? JSON.parse(labTest.results) : {};
  } catch (e) {
    console.error("Failed to parse results:", e);
    parsedResults = {};
  }

  const testTypes = Array.isArray(labTest.testTypes) ? labTest.testTypes : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Header Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="mr-4">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <FileText className="text-medical-blue text-xl mr-3" />
              <span className="text-xl font-bold text-gray-900">
                Lab Test Report
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={generatePDF}
                className="bg-medical-blue hover:bg-blue-700"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <span className="text-sm text-gray-600">
                {currentDoctor?.name
                  ? currentDoctor.name.startsWith("Dr.")
                    ? currentDoctor.name
                    : `Dr. ${currentDoctor.name}`
                  : user?.name || "Loading..."}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center text-green-600">
                <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold">
                  ✓
                </div>
                <span className="ml-2 text-sm font-medium">
                  Patient Registration
                </span>
              </div>
              <div className="flex items-center ml-4 text-green-600">
                <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold">
                  ✓
                </div>
                <span className="ml-2 text-sm font-medium">Test Selection</span>
              </div>
              <div className="flex items-center ml-4 text-green-600">
                <div className="flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-full text-sm font-bold">
                  ✓
                </div>
                <span className="ml-2 text-sm font-medium">Enter Results</span>
              </div>
              <div className="flex items-center ml-4 text-medical-blue">
                <div className="flex items-center justify-center w-8 h-8 bg-medical-blue text-white rounded-full text-sm font-bold">
                  4
                </div>
                <span className="ml-2 text-sm font-medium">Report</span>
              </div>
            </div>
          </div>
        </div>

        {/* Report Header */}
        <Card className="mb-6">
          <CardHeader className="text-center bg-medical-blue text-white">
            <CardTitle className="text-2xl">LABORATORY TEST REPORT</CardTitle>
            <p className="text-blue-100">Hospital Management System</p>
          </CardHeader>
        </Card>

        {/* Patient Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              Patient Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Patient ID</p>
                <p className="text-lg font-semibold">
                  {labTest.patient.mruNumber}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg font-semibold">
                  {labTest.patient.fullName}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Age & Gender
                </p>
                <p className="text-lg font-semibold">
                  {labTest.patient.age} years, {labTest.patient.gender}
                </p>
              </div>
              {labTest.patient.contactPhone && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Contact</p>
                  <p className="text-lg font-semibold">
                    {labTest.patient.contactPhone}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Test Information */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Test Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Test Date</p>
                <p className="text-lg font-semibold">
                  {new Date(labTest.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Tests Performed
                </p>
                <p className="text-lg font-semibold">
                  {labTest.testTypes?.map((t) => t.testName).join(", ") ||
                    "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Cost</p>
                <p className="text-lg font-semibold text-medical-blue">
                  ₹{labTest.totalCost}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Test Results */}
        {Object.keys(parsedResults).length > 0 && (
          <div className="space-y-4">
            {testTypes.map((testType) => {
              const testName = testType.testName;
              const testResults = parsedResults[testName];

              if (!testResults) return null;

              return (
                <Card key={testType.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TestTube className="mr-2 h-5 w-5" />
                      {testName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(testResults).map(([key, value]) => {
                        if (!value) return null;
                        
                        // Check if this value is abnormal for conditional bold formatting
                        const testResultItem = Array.isArray(labTest.results) 
                          ? labTest.results.find((result: any) => result.testName === key)
                          : null;
                        const referenceRange = testResultItem?.normalRange || "Consult reference";
                        const patientGender = labTest.patient?.gender;
                        const valueIsAbnormal = isValueAbnormal(String(value), referenceRange, patientGender);
                        
                        return (
                          <div key={key}>
                            <p className="text-sm font-medium text-gray-500 capitalize">
                              {key.replace(/([A-Z])/g, " $1")}
                            </p>
                            <p className={`text-lg ${valueIsAbnormal ? 'font-bold text-red-600' : 'font-semibold'}`}>
                              {String(value)}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Doctor's Notes */}
        {labTest.doctorNotes && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="mr-2 h-5 w-5" />
                Doctor's Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {labTest.doctorNotes}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Button
            onClick={generatePDF}
            size="lg"
            className="bg-medical-blue hover:bg-blue-700"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF Report
          </Button>
          <Link href="/lab/patient-registration">
            <Button variant="outline" size="lg">
              Start New Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
