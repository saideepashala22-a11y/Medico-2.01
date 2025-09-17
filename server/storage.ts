import { 
  users, patients, labTests, prescriptions, dischargeSummaries, medicalHistory, patientProfiles, consultations, labTestDefinitions, surgicalCaseSheets, patientsRegistration, medicineInventory, hospitalSettings, activities,
  type User, type InsertUser, type Patient, type InsertPatient,
  type LabTest, type InsertLabTest, type Prescription, type InsertPrescription,
  type DischargeSummary, type InsertDischargeSummary, type MedicalHistory, type InsertMedicalHistory,
  type PatientProfile, type InsertPatientProfile, type Consultation, type InsertConsultation,
  type SurgicalCaseSheet, type InsertSurgicalCaseSheet, type PatientsRegistration, type InsertPatientsRegistration,
  type MedicineInventory, type InsertMedicineInventory, type HospitalSettings, type InsertHospitalSettings,
  type Activity, type InsertActivity,
  insertLabTestDefinitionSchema
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, ilike, or, sql, and, gte, lt } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserOTP(username: string, otp: string, expiresAt: Date): Promise<boolean>;
  resetUserPassword(username: string, newPassword: string): Promise<boolean>;
  updateUser(id: string, updates: Partial<Pick<User, 'name' | 'username' | 'phoneNumber'>>): Promise<User>;
  
  // Doctor Management
  getAllDoctors(): Promise<User[]>;
  setCurrentDoctor(doctorId: string): Promise<User>;
  getCurrentDoctor(): Promise<User | undefined>;
  updateDoctorOwnerStatus(doctorId: string, isOwner: boolean): Promise<User>;
  deleteDoctor(doctorId: string): Promise<void>;
  
  // Patients
  getPatient(id: string): Promise<Patient | undefined>;
  getPatientByPatientId(patientId: string): Promise<Patient | undefined>;
  createPatient(patient: InsertPatient): Promise<Patient>;
  getAllPatients(): Promise<Patient[]>;
  searchPatients(query: string): Promise<Patient[]>;
  
  // Lab Tests
  getLabTest(id: string): Promise<LabTest | undefined>;
  getLabTestsByPatient(patientId: string): Promise<LabTest[]>;
  createLabTest(labTest: InsertLabTest): Promise<LabTest>;
  updateLabTest(id: string, updates: Partial<LabTest>): Promise<LabTest>;
  getRecentLabTests(): Promise<(LabTest & { patient: Patient })[]>;
  
  // Lab Test Definitions
  getAllLabTestDefinitions(): Promise<any[]>;
  getActiveLabTestDefinitions(): Promise<any[]>;
  createLabTestDefinition(definition: any): Promise<any>;
  updateLabTestDefinition(id: string, updates: Partial<any>): Promise<any>;
  deleteLabTestDefinition(id: string): Promise<void>;
  
  // Lab Revenue
  getLabRevenue(fromDate: string, toDate: string): Promise<{
    totalRevenue: number;
    totalTests: number;
    dateRange: { from: string; to: string; };
    testBreakdown: Array<{
      testName: string;
      department: string;
      count: number;
      totalRevenue: number;
      averageRevenue: number;
    }>;
    dailyRevenue: Array<{
      date: string;
      revenue: number;
      testsCount: number;
    }>;
  }>;
  
  // Prescriptions
  getPrescription(id: string): Promise<Prescription | undefined>;
  getPrescriptionsByPatient(patientId: string): Promise<Prescription[]>;
  createPrescription(prescription: InsertPrescription): Promise<Prescription>;
  getRecentPrescriptions(): Promise<(Prescription & { patient: Patient })[]>;
  getAllPrescriptionsForYear(year: number): Promise<Prescription[]>;
  searchPrescriptionsByBillNumber(billNumber: string): Promise<(Prescription & { patient: any })[]>;
  
  // Discharge Summaries
  getDischargeSummary(id: string): Promise<DischargeSummary | undefined>;
  getDischargeSummariesByPatient(patientId: string): Promise<DischargeSummary[]>;
  createDischargeSummary(summary: InsertDischargeSummary): Promise<DischargeSummary>;
  getRecentDischargeSummaries(): Promise<(DischargeSummary & { patient: Patient })[]>;
  
  // Medical History
  getMedicalHistoryEntry(id: string): Promise<MedicalHistory | undefined>;
  getMedicalHistoryByPatient(patientId: string): Promise<MedicalHistory[]>;
  createMedicalHistoryEntry(entry: InsertMedicalHistory): Promise<MedicalHistory>;
  updateMedicalHistoryEntry(id: string, updates: Partial<MedicalHistory>): Promise<MedicalHistory>;
  deleteMedicalHistoryEntry(id: string): Promise<void>;
  
  // Patient Profiles  
  getPatientProfile(patientId: string): Promise<PatientProfile | undefined>;
  createOrUpdatePatientProfile(profile: InsertPatientProfile): Promise<PatientProfile>;
  
  // Consultations
  getConsultation(id: string): Promise<Consultation | undefined>;
  getConsultationsByPatient(patientId: string): Promise<Consultation[]>;
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  updateConsultation(id: string, updates: Partial<Consultation>): Promise<Consultation>;
  deleteConsultation(id: string): Promise<void>;
  getRecentConsultations(): Promise<(Consultation & { patient: Patient })[]>;
  
  // Surgical Case Sheets
  getSurgicalCaseSheet(id: string): Promise<(SurgicalCaseSheet & { patient: Patient }) | undefined>;
  getSurgicalCaseSheetsByPatient(patientId: string): Promise<SurgicalCaseSheet[]>;
  createSurgicalCaseSheet(caseSheet: InsertSurgicalCaseSheet): Promise<SurgicalCaseSheet>;
  updateSurgicalCaseSheet(id: string, updates: Partial<SurgicalCaseSheet>): Promise<SurgicalCaseSheet>;
  getRecentSurgicalCaseSheets(): Promise<(SurgicalCaseSheet & { patient: Patient })[]>;
  
  // Patients Registration
  getPatientsRegistration(id: string): Promise<PatientsRegistration | undefined>;
  getAllPatientsRegistrations(): Promise<PatientsRegistration[]>;
  createPatientsRegistration(registration: InsertPatientsRegistration & { createdBy: string }): Promise<PatientsRegistration>;
  updatePatientsRegistration(id: string, updates: Partial<InsertPatientsRegistration>): Promise<PatientsRegistration | undefined>;
  searchPatientsRegistrations(query: string): Promise<PatientsRegistration[]>;
  getRecentPatientsRegistrations(limit?: number): Promise<PatientsRegistration[]>;
  getNextMRUNumber(): Promise<string>;
  
  // Medicine Inventory
  getAllMedicines(): Promise<MedicineInventory[]>;
  getActiveMedicines(): Promise<MedicineInventory[]>;
  getMedicine(id: string): Promise<MedicineInventory | undefined>;
  createMedicine(medicine: InsertMedicineInventory & { createdBy: string }): Promise<MedicineInventory>;
  updateMedicine(id: string, updates: Partial<MedicineInventory>): Promise<MedicineInventory>;
  deleteMedicine(id: string): Promise<void>;
  searchMedicines(query: string): Promise<MedicineInventory[]>;
  bulkCreateMedicines(medicines: Array<InsertMedicineInventory & { createdBy: string }>): Promise<{ imported: number; duplicates: number }>;
  checkMedicineStock(medicineId: string, requiredQuantity: number): Promise<boolean>;
  updateMedicineQuantity(id: string, quantityChange: number): Promise<MedicineInventory>;
  
  // Stats
  getStats(): Promise<{
    totalPatients: number;
    labTestsToday: number;
    prescriptionsToday: number;
    dischargesToday: number;
    consultationsToday: number;
    surgicalCasesToday: number;
  }>;
  
  // Historical Stats
  getHistoricalStats(): Promise<{
    yesterday: {
      patientsRegistered: number;
      labTests: number;
      prescriptions: number;
      discharges: number;
      surgicalCases: number;
    };
    lastWeek: {
      patientsRegistered: number;
      labTests: number;
      prescriptions: number;
      discharges: number;
      surgicalCases: number;
    };
    lastMonth: {
      patientsRegistered: number;
      labTests: number;
      prescriptions: number;
      discharges: number;
      surgicalCases: number;
    };
  }>;
  
  // Hospital Settings
  getHospitalSettings(): Promise<HospitalSettings>;
  updateHospitalSettings(updates: Partial<InsertHospitalSettings>): Promise<HospitalSettings>;
  createHospitalSettings(settings: InsertHospitalSettings & { createdBy: string }): Promise<HospitalSettings>;
  
  // Activities/Notifications
  createActivity(activity: InsertActivity): Promise<Activity>;
  getRecentActivities(limit?: number): Promise<Activity[]>;
  
  // Lab Test Definitions
  getAllLabTestDefinitions(): Promise<any[]>;
  getActiveLabTestDefinitions(): Promise<any[]>;
  createLabTestDefinition(definition: any): Promise<any>;
  updateLabTestDefinition(id: string, updates: Partial<any>): Promise<any>;
  deleteLabTestDefinition(id: string): Promise<void>;
  bulkCreateLabTestDefinitions(testDefinitions: Array<any>): Promise<{ imported: number; duplicates: number }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUserOTP(username: string, otp: string, expiresAt: Date): Promise<boolean> {
    try {
      const result = await db
        .update(users)
        .set({ 
          resetOtp: otp, 
          otpExpires: expiresAt 
        })
        .where(eq(users.username, username));
      return true;
    } catch (error) {
      console.error('Error updating user OTP:', error);
      return false;
    }
  }

  async resetUserPassword(username: string, newPassword: string): Promise<boolean> {
    try {
      const result = await db
        .update(users)
        .set({ 
          password: newPassword,
          resetOtp: null,
          otpExpires: null
        })
        .where(eq(users.username, username));
      return true;
    } catch (error) {
      console.error('Error resetting user password:', error);
      return false;
    }
  }

  async updateUser(id: string, updates: Partial<Pick<User, 'name' | 'username' | 'phoneNumber'>>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return updatedUser;
  }

  // Doctor Management Methods
  async getAllDoctors(): Promise<User[]> {
    const doctors = await db
      .select()
      .from(users)
      .where(eq(users.role, 'doctor'))
      .orderBy(desc(users.createdAt));
    return doctors;
  }

  async setCurrentDoctor(doctorId: string): Promise<User> {
    // First, remove current status from all doctors
    await db
      .update(users)
      .set({ isCurrent: false })
      .where(eq(users.role, 'doctor'));
    
    // Then set the selected doctor as current
    const [updatedDoctor] = await db
      .update(users)
      .set({ isCurrent: true })
      .where(eq(users.id, doctorId))
      .returning();
    return updatedDoctor;
  }

  async getCurrentDoctor(): Promise<User | undefined> {
    const [currentDoctor] = await db
      .select()
      .from(users)
      .where(and(eq(users.role, 'doctor'), eq(users.isCurrent, true)));
    return currentDoctor || undefined;
  }

  async updateDoctorOwnerStatus(doctorId: string, isOwner: boolean): Promise<User> {
    // If setting this doctor as owner, first remove owner status from all other doctors
    if (isOwner) {
      await db
        .update(users)
        .set({ isOwner: false })
        .where(eq(users.role, 'doctor'));
    }
    
    const [updatedDoctor] = await db
      .update(users)
      .set({ isOwner })
      .where(eq(users.id, doctorId))
      .returning();
    return updatedDoctor;
  }

  async deleteDoctor(doctorId: string): Promise<void> {
    await db
      .delete(users)
      .where(eq(users.id, doctorId));
  }

  async getPatient(id: string): Promise<Patient | undefined> {
    const [patient] = await db.select().from(patients).where(eq(patients.id, id));
    return patient || undefined;
  }

  async getPatientByPatientId(patientId: string): Promise<Patient | undefined> {
    const [patient] = await db.select().from(patients).where(eq(patients.patientId, patientId));
    return patient || undefined;
  }

  async createPatient(patient: InsertPatient): Promise<Patient> {
    // Generate patient ID
    const today = new Date();
    const year = today.getFullYear();
    const count = await db.select().from(patients).where(ilike(patients.patientId, `HMS-${year}-%`));
    const patientId = `HMS-${year}-${String(count.length + 1).padStart(3, '0')}`;
    
    const [newPatient] = await db.insert(patients).values({
      ...patient,
      patientId,
    }).returning();
    return newPatient;
  }

  async getAllPatients(): Promise<Patient[]> {
    return await db.select().from(patients).orderBy(desc(patients.createdAt));
  }

  async searchPatients(query: string): Promise<Patient[]> {
    return await db.select().from(patients)
      .where(or(
        ilike(patients.name, `%${query}%`),
        ilike(patients.patientId, `%${query}%`)
      ))
      .limit(10);
  }

  async getLabTest(id: string): Promise<(LabTest & { patient: any }) | undefined> {
    const [labTest] = await db.select({
      id: labTests.id,
      patientId: labTests.patientId,
      testTypes: labTests.testTypes,
      results: labTests.results,
      doctorNotes: labTests.doctorNotes,
      totalCost: labTests.totalCost,
      status: labTests.status,
      createdBy: labTests.createdBy,
      createdAt: labTests.createdAt,
      patient: patientsRegistration,
    })
    .from(labTests)
    .innerJoin(patientsRegistration, eq(labTests.patientId, patientsRegistration.id))
    .where(eq(labTests.id, id));
    return labTest || undefined;
  }

  async getLabTestsByPatient(patientId: string): Promise<LabTest[]> {
    return await db.select().from(labTests)
      .where(eq(labTests.patientId, patientId))
      .orderBy(desc(labTests.createdAt));
  }

  async createLabTest(labTest: InsertLabTest): Promise<LabTest> {
    const [newLabTest] = await db.insert(labTests).values(labTest).returning();
    return newLabTest;
  }

  async updateLabTest(id: string, updates: Partial<LabTest>): Promise<LabTest> {
    const [updatedLabTest] = await db.update(labTests)
      .set(updates)
      .where(eq(labTests.id, id))
      .returning();
    return updatedLabTest;
  }

  async getRecentLabTests(): Promise<(LabTest & { patient: any })[]> {
    return await db.select({
      id: labTests.id,
      patientId: labTests.patientId,
      testTypes: labTests.testTypes,
      results: labTests.results,
      doctorNotes: labTests.doctorNotes,
      totalCost: labTests.totalCost,
      status: labTests.status,
      createdBy: labTests.createdBy,
      createdAt: labTests.createdAt,
      patient: patientsRegistration,
    })
    .from(labTests)
    .innerJoin(patientsRegistration, eq(labTests.patientId, patientsRegistration.id))
    .where(eq(labTests.status, 'completed'))
    .orderBy(desc(labTests.createdAt))
    .limit(10);
  }

  async getPrescription(id: string): Promise<Prescription | undefined> {
    const [prescription] = await db.select().from(prescriptions).where(eq(prescriptions.id, id));
    return prescription || undefined;
  }

  async getPrescriptionsByPatient(patientId: string): Promise<Prescription[]> {
    return await db.select().from(prescriptions)
      .where(eq(prescriptions.patientId, patientId))
      .orderBy(desc(prescriptions.createdAt));
  }

  async createPrescription(prescription: InsertPrescription): Promise<Prescription> {
    const [newPrescription] = await db.insert(prescriptions).values(prescription).returning();
    return newPrescription;
  }

  async getRecentPrescriptions(): Promise<(Prescription & { patient: any })[]> {
    return await db.select({
      id: prescriptions.id,
      billNumber: prescriptions.billNumber,
      patientId: prescriptions.patientId,
      medicines: prescriptions.medicines,
      subtotal: prescriptions.subtotal,
      tax: prescriptions.tax,
      total: prescriptions.total,
      createdBy: prescriptions.createdBy,
      createdAt: prescriptions.createdAt,
      patient: patientsRegistration,
    })
    .from(prescriptions)
    .innerJoin(patientsRegistration, eq(prescriptions.patientId, patientsRegistration.id))
    .orderBy(desc(prescriptions.createdAt))
    .limit(3);
  }

  async getAllPrescriptionsForYear(year: number): Promise<Prescription[]> {
    const startDate = new Date(year, 0, 1); // January 1st
    const endDate = new Date(year + 1, 0, 1); // January 1st of next year
    
    return await db.select()
      .from(prescriptions)
      .where(
        and(
          gte(prescriptions.createdAt, startDate),
          lt(prescriptions.createdAt, endDate)
        )
      )
      .orderBy(prescriptions.createdAt);
  }

  async searchPrescriptionsByBillNumber(billNumber: string): Promise<(Prescription & { patient: any })[]> {
    return await db.select({
      id: prescriptions.id,
      billNumber: prescriptions.billNumber,
      patientId: prescriptions.patientId,
      medicines: prescriptions.medicines,
      subtotal: prescriptions.subtotal,
      tax: prescriptions.tax,
      total: prescriptions.total,
      createdBy: prescriptions.createdBy,
      createdAt: prescriptions.createdAt,
      patient: patientsRegistration,
    })
    .from(prescriptions)
    .innerJoin(patientsRegistration, eq(prescriptions.patientId, patientsRegistration.id))
    .where(ilike(prescriptions.billNumber, `%${billNumber}%`))
    .orderBy(desc(prescriptions.createdAt))
    .limit(10);
  }

  async getDischargeSummary(id: string): Promise<DischargeSummary | undefined> {
    const [summary] = await db.select().from(dischargeSummaries).where(eq(dischargeSummaries.id, id));
    return summary || undefined;
  }

  async getDischargeSummariesByPatient(patientId: string): Promise<DischargeSummary[]> {
    return await db.select().from(dischargeSummaries)
      .where(eq(dischargeSummaries.patientId, patientId))
      .orderBy(desc(dischargeSummaries.createdAt));
  }

  async createDischargeSummary(summary: InsertDischargeSummary): Promise<DischargeSummary> {
    const [newSummary] = await db.insert(dischargeSummaries).values(summary).returning();
    return newSummary;
  }

  async getRecentDischargeSummaries(): Promise<(DischargeSummary & { patient: Patient })[]> {
    return await db.select({
      id: dischargeSummaries.id,
      patientId: dischargeSummaries.patientId,
      primaryDiagnosis: dischargeSummaries.primaryDiagnosis,
      secondaryDiagnosis: dischargeSummaries.secondaryDiagnosis,
      treatmentSummary: dischargeSummaries.treatmentSummary,
      medications: dischargeSummaries.medications,
      followupInstructions: dischargeSummaries.followupInstructions,
      dischargeDate: dischargeSummaries.dischargeDate,
      attendingPhysician: dischargeSummaries.attendingPhysician,
      admissionDate: dischargeSummaries.admissionDate,
      createdBy: dischargeSummaries.createdBy,
      createdAt: dischargeSummaries.createdAt,
      patient: patients,
    })
    .from(dischargeSummaries)
    .innerJoin(patients, eq(dischargeSummaries.patientId, patients.id))
    .orderBy(desc(dischargeSummaries.createdAt))
    .limit(10);
  }

  async getStats(): Promise<{
    totalPatients: number;
    labTestsToday: number;
    prescriptionsToday: number;
    dischargesToday: number;
    consultationsToday: number;
    surgicalCasesToday: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [totalPatients] = await db.select({ count: sql`count(*)` }).from(patientsRegistration);
    const [labTestsToday] = await db.select({ count: sql`count(*)` }).from(labTests)
      .where(sql`${labTests.createdAt} >= ${today} AND ${labTests.createdAt} < ${tomorrow} AND ${labTests.status} = 'completed'`);
    const [prescriptionsToday] = await db.select({ count: sql`count(*)` }).from(prescriptions)
      .where(sql`${prescriptions.createdAt} >= ${today} AND ${prescriptions.createdAt} < ${tomorrow}`);
    const [dischargesToday] = await db.select({ count: sql`count(*)` }).from(dischargeSummaries)
      .where(sql`${dischargeSummaries.createdAt} >= ${today} AND ${dischargeSummaries.createdAt} < ${tomorrow}`);
    const [consultationsToday] = await db.select({ count: sql`count(*)` }).from(consultations)
      .where(sql`${consultations.createdAt} >= ${today} AND ${consultations.createdAt} < ${tomorrow}`);
    const [surgicalCasesToday] = await db.select({ count: sql`count(*)` }).from(surgicalCaseSheets)
      .where(sql`${surgicalCaseSheets.createdAt} >= ${today} AND ${surgicalCaseSheets.createdAt} < ${tomorrow}`);

    return {
      totalPatients: Number(totalPatients.count),
      labTestsToday: Number(labTestsToday.count),
      prescriptionsToday: Number(prescriptionsToday.count),
      dischargesToday: Number(dischargesToday.count),
      consultationsToday: Number(consultationsToday.count),
      surgicalCasesToday: Number(surgicalCasesToday.count),
    };
  }

  async getHistoricalStats(): Promise<{
    yesterday: {
      patientsRegistered: number;
      labTests: number;
      prescriptions: number;
      discharges: number;
      surgicalCases: number;
    };
    lastWeek: {
      patientsRegistered: number;
      labTests: number;
      prescriptions: number;
      discharges: number;
      surgicalCases: number;
    };
    lastMonth: {
      patientsRegistered: number;
      labTests: number;
      prescriptions: number;
      discharges: number;
      surgicalCases: number;
    };
  }> {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date(yesterday);
    yesterdayEnd.setHours(23, 59, 59, 999);

    const lastWeekStart = new Date(now);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    lastWeekStart.setHours(0, 0, 0, 0);

    const lastMonthStart = new Date(now);
    lastMonthStart.setDate(lastMonthStart.getDate() - 30);
    lastMonthStart.setHours(0, 0, 0, 0);

    // Yesterday's counts
    const [yesterdayPatients] = await db.select({ count: sql`count(*)` }).from(patientsRegistration)
      .where(sql`${patientsRegistration.createdAt} >= ${yesterday} AND ${patientsRegistration.createdAt} <= ${yesterdayEnd}`);
    
    const [yesterdayLabTests] = await db.select({ count: sql`count(*)` }).from(labTests)
      .where(sql`${labTests.createdAt} >= ${yesterday} AND ${labTests.createdAt} <= ${yesterdayEnd}`);
    
    const [yesterdayPrescriptions] = await db.select({ count: sql`count(*)` }).from(prescriptions)
      .where(sql`${prescriptions.createdAt} >= ${yesterday} AND ${prescriptions.createdAt} <= ${yesterdayEnd}`);
    
    const [yesterdayDischarges] = await db.select({ count: sql`count(*)` }).from(dischargeSummaries)
      .where(sql`${dischargeSummaries.createdAt} >= ${yesterday} AND ${dischargeSummaries.createdAt} <= ${yesterdayEnd}`);
    
    const [yesterdaySurgical] = await db.select({ count: sql`count(*)` }).from(surgicalCaseSheets)
      .where(sql`${surgicalCaseSheets.createdAt} >= ${yesterday} AND ${surgicalCaseSheets.createdAt} <= ${yesterdayEnd}`);

    // Last week's counts
    const [weekPatients] = await db.select({ count: sql`count(*)` }).from(patientsRegistration)
      .where(sql`${patientsRegistration.createdAt} >= ${lastWeekStart}`);
    
    const [weekLabTests] = await db.select({ count: sql`count(*)` }).from(labTests)
      .where(sql`${labTests.createdAt} >= ${lastWeekStart}`);
    
    const [weekPrescriptions] = await db.select({ count: sql`count(*)` }).from(prescriptions)
      .where(sql`${prescriptions.createdAt} >= ${lastWeekStart}`);
    
    const [weekDischarges] = await db.select({ count: sql`count(*)` }).from(dischargeSummaries)
      .where(sql`${dischargeSummaries.createdAt} >= ${lastWeekStart}`);
    
    const [weekSurgical] = await db.select({ count: sql`count(*)` }).from(surgicalCaseSheets)
      .where(sql`${surgicalCaseSheets.createdAt} >= ${lastWeekStart}`);

    // Last month's counts
    const [monthPatients] = await db.select({ count: sql`count(*)` }).from(patientsRegistration)
      .where(sql`${patientsRegistration.createdAt} >= ${lastMonthStart}`);
    
    const [monthLabTests] = await db.select({ count: sql`count(*)` }).from(labTests)
      .where(sql`${labTests.createdAt} >= ${lastMonthStart}`);
    
    const [monthPrescriptions] = await db.select({ count: sql`count(*)` }).from(prescriptions)
      .where(sql`${prescriptions.createdAt} >= ${lastMonthStart}`);
    
    const [monthDischarges] = await db.select({ count: sql`count(*)` }).from(dischargeSummaries)
      .where(sql`${dischargeSummaries.createdAt} >= ${lastMonthStart}`);
    
    const [monthSurgical] = await db.select({ count: sql`count(*)` }).from(surgicalCaseSheets)
      .where(sql`${surgicalCaseSheets.createdAt} >= ${lastMonthStart}`);

    return {
      yesterday: {
        patientsRegistered: Number(yesterdayPatients?.count || 0),
        labTests: Number(yesterdayLabTests?.count || 0),
        prescriptions: Number(yesterdayPrescriptions?.count || 0),
        discharges: Number(yesterdayDischarges?.count || 0),
        surgicalCases: Number(yesterdaySurgical?.count || 0),
      },
      lastWeek: {
        patientsRegistered: Number(weekPatients?.count || 0),
        labTests: Number(weekLabTests?.count || 0),
        prescriptions: Number(weekPrescriptions?.count || 0),
        discharges: Number(weekDischarges?.count || 0),
        surgicalCases: Number(weekSurgical?.count || 0),
      },
      lastMonth: {
        patientsRegistered: Number(monthPatients?.count || 0),
        labTests: Number(monthLabTests?.count || 0),
        prescriptions: Number(monthPrescriptions?.count || 0),
        discharges: Number(monthDischarges?.count || 0),
        surgicalCases: Number(monthSurgical?.count || 0),
      },
    };
  }

  // Medical History Methods
  async getMedicalHistoryEntry(id: string): Promise<MedicalHistory | undefined> {
    const [entry] = await db.select().from(medicalHistory).where(eq(medicalHistory.id, id));
    return entry || undefined;
  }

  async getMedicalHistoryByPatient(patientId: string): Promise<MedicalHistory[]> {
    return await db.select().from(medicalHistory)
      .where(eq(medicalHistory.patientId, patientId))
      .orderBy(desc(medicalHistory.createdAt));
  }

  async createMedicalHistoryEntry(entry: InsertMedicalHistory): Promise<MedicalHistory> {
    const [newEntry] = await db.insert(medicalHistory).values(entry).returning();
    return newEntry;
  }

  async updateMedicalHistoryEntry(id: string, updates: Partial<MedicalHistory>): Promise<MedicalHistory> {
    const [updatedEntry] = await db.update(medicalHistory)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(medicalHistory.id, id))
      .returning();
    return updatedEntry;
  }

  async deleteMedicalHistoryEntry(id: string): Promise<void> {
    await db.delete(medicalHistory).where(eq(medicalHistory.id, id));
  }

  // Patient Profile Methods
  async getPatientProfile(patientId: string): Promise<PatientProfile | undefined> {
    const [profile] = await db.select().from(patientProfiles)
      .where(eq(patientProfiles.patientId, patientId));
    return profile || undefined;
  }

  async createOrUpdatePatientProfile(profile: InsertPatientProfile): Promise<PatientProfile> {
    const existingProfile = await this.getPatientProfile(profile.patientId);
    
    if (existingProfile) {
      const [updatedProfile] = await db.update(patientProfiles)
        .set({ ...profile, updatedAt: new Date() })
        .where(eq(patientProfiles.patientId, profile.patientId))
        .returning();
      return updatedProfile;
    } else {
      const [newProfile] = await db.insert(patientProfiles).values(profile).returning();
      return newProfile;
    }
  }

  // Consultation Methods
  async getConsultation(id: string): Promise<Consultation | undefined> {
    const [consultation] = await db.select().from(consultations).where(eq(consultations.id, id));
    return consultation || undefined;
  }

  async getConsultationsByPatient(patientId: string): Promise<Consultation[]> {
    return await db.select().from(consultations)
      .where(eq(consultations.patientId, patientId))
      .orderBy(desc(consultations.consultationDate));
  }

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    // Convert dates properly for database insertion
    const consultationToInsert: any = {
      ...consultation,
      consultationDate: new Date(consultation.consultationDate),
      followUpDate: consultation.followUpDate ? new Date(consultation.followUpDate) : null,
    };
    
    const [newConsultation] = await db.insert(consultations).values(consultationToInsert).returning();
    return newConsultation;
  }

  async updateConsultation(id: string, updates: Partial<Consultation>): Promise<Consultation> {
    const [updatedConsultation] = await db.update(consultations)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(consultations.id, id))
      .returning();
    return updatedConsultation;
  }

  async deleteConsultation(id: string): Promise<void> {
    await db.delete(consultations).where(eq(consultations.id, id));
  }

  async getRecentConsultations(): Promise<(Consultation & { patient: Patient })[]> {
    return await db.select({
      id: consultations.id,
      patientId: consultations.patientId,
      doctorName: consultations.doctorName,
      consultationDate: consultations.consultationDate,
      chiefComplaint: consultations.chiefComplaint,
      presentIllnessHistory: consultations.presentIllnessHistory,
      pastMedicalHistory: consultations.pastMedicalHistory,
      examination: consultations.examination,
      diagnosis: consultations.diagnosis,
      treatment: consultations.treatment,
      prescription: consultations.prescription,
      followUpDate: consultations.followUpDate,
      notes: consultations.notes,
      consultationType: consultations.consultationType,
      status: consultations.status,
      createdBy: consultations.createdBy,
      createdAt: consultations.createdAt,
      updatedAt: consultations.updatedAt,
      patient: patients,
    })
    .from(consultations)
    .innerJoin(patients, eq(consultations.patientId, patients.id))
    .orderBy(desc(consultations.consultationDate))
    .limit(10);
  }

  // Lab Test Definitions methods
  async getAllLabTestDefinitions(): Promise<any[]> {
    const testDefinitions = await db.select().from(labTestDefinitions).orderBy(desc(labTestDefinitions.createdAt));
    return testDefinitions;
  }

  async getActiveLabTestDefinitions(): Promise<any[]> {
    const testDefinitions = await db.select().from(labTestDefinitions)
      .where(eq(labTestDefinitions.isActive, true))
      .orderBy(labTestDefinitions.testName);
    return testDefinitions;
  }

  async createLabTestDefinition(definition: any): Promise<any> {
    const [testDefinition] = await db.insert(labTestDefinitions).values(definition).returning();
    return testDefinition;
  }

  async updateLabTestDefinition(id: string, updates: Partial<any>): Promise<any> {
    const [testDefinition] = await db.update(labTestDefinitions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(labTestDefinitions.id, id))
      .returning();
    return testDefinition;
  }

  async deleteLabTestDefinition(id: string): Promise<void> {
    await db.update(labTestDefinitions)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(labTestDefinitions.id, id));
  }

  async bulkCreateLabTestDefinitions(testDefinitions: Array<any>): Promise<{ imported: number; duplicates: number }> {
    let imported = 0;
    let duplicates = 0;

    for (const testDef of testDefinitions) {
      try {
        // Check for duplicates based on test name and department
        const [existing] = await db.select()
          .from(labTestDefinitions)
          .where(
            and(
              eq(labTestDefinitions.testName, testDef.testName),
              eq(labTestDefinitions.department, testDef.department)
            )
          )
          .limit(1);

        if (existing) {
          duplicates++;
          console.log(`Duplicate found: ${testDef.testName} - ${testDef.department}`);
          continue;
        }

        // Create the test definition if no duplicate found
        await db.insert(labTestDefinitions)
          .values(testDef);
        
        imported++;
      } catch (error) {
        console.error(`Error creating test definition ${testDef.testName}:`, error);
        // Continue processing other tests even if one fails
      }
    }

    return { imported, duplicates };
  }

  // Surgical Case Sheet Methods
  async getSurgicalCaseSheet(id: string): Promise<(SurgicalCaseSheet & { patient: Patient }) | undefined> {
    const [caseSheet] = await db.select({
      id: surgicalCaseSheets.id,
      caseNumber: surgicalCaseSheets.caseNumber,
      patientId: surgicalCaseSheets.patientId,
      patientName: surgicalCaseSheets.patientName,
      husbandFatherName: surgicalCaseSheets.husbandFatherName,
      religion: surgicalCaseSheets.religion,
      nationality: surgicalCaseSheets.nationality,
      age: surgicalCaseSheets.age,
      sex: surgicalCaseSheets.sex,
      address: surgicalCaseSheets.address,
      village: surgicalCaseSheets.village,
      district: surgicalCaseSheets.district,
      diagnosis: surgicalCaseSheets.diagnosis,
      natureOfOperation: surgicalCaseSheets.natureOfOperation,
      edd: surgicalCaseSheets.edd,
      dateOfAdmission: surgicalCaseSheets.dateOfAdmission,
      dateOfOperation: surgicalCaseSheets.dateOfOperation,
      dateOfDischarge: surgicalCaseSheets.dateOfDischarge,
      lpNo: surgicalCaseSheets.lpNo,
      complaintsAndDuration: surgicalCaseSheets.complaintsAndDuration,
      historyOfPresentIllness: surgicalCaseSheets.historyOfPresentIllness,
      hb: surgicalCaseSheets.hb,
      bsa: surgicalCaseSheets.bsa,
      ct: surgicalCaseSheets.ct,
      bt: surgicalCaseSheets.bt,
      bloodGrouping: surgicalCaseSheets.bloodGrouping,
      rhFactor: surgicalCaseSheets.rhFactor,
      prl: surgicalCaseSheets.prl,
      rbs: surgicalCaseSheets.rbs,
      urineSugar: surgicalCaseSheets.urineSugar,
      xray: surgicalCaseSheets.xray,
      ecg: surgicalCaseSheets.ecg,
      bloodUrea: surgicalCaseSheets.bloodUrea,
      serumCreatinine: surgicalCaseSheets.serumCreatinine,
      serumBilirubin: surgicalCaseSheets.serumBilirubin,
      hbsag: surgicalCaseSheets.hbsag,
      generalCondition: surgicalCaseSheets.generalCondition,
      temperature: surgicalCaseSheets.temperature,
      pulse: surgicalCaseSheets.pulse,
      bloodPressure: surgicalCaseSheets.bloodPressure,
      respiratoryRate: surgicalCaseSheets.respiratoryRate,
      heart: surgicalCaseSheets.heart,
      lungs: surgicalCaseSheets.lungs,
      abdomen: surgicalCaseSheets.abdomen,
      cns: surgicalCaseSheets.cns,
      createdBy: surgicalCaseSheets.createdBy,
      createdAt: surgicalCaseSheets.createdAt,
      updatedAt: surgicalCaseSheets.updatedAt,
      patient: patients,
    })
    .from(surgicalCaseSheets)
    .innerJoin(patients, eq(surgicalCaseSheets.patientId, patients.id))
    .where(eq(surgicalCaseSheets.id, id));
    return caseSheet || undefined;
  }

  async getSurgicalCaseSheetsByPatient(patientId: string): Promise<SurgicalCaseSheet[]> {
    return await db.select().from(surgicalCaseSheets)
      .where(eq(surgicalCaseSheets.patientId, patientId))
      .orderBy(desc(surgicalCaseSheets.createdAt));
  }

  async createSurgicalCaseSheet(caseSheet: InsertSurgicalCaseSheet & { createdBy?: string }): Promise<SurgicalCaseSheet> {
    // Generate unique case number based on patient ID
    const patientIdShort = caseSheet.patientId.slice(-4);
    const existingSheets = await this.getSurgicalCaseSheetsByPatient(caseSheet.patientId);
    const patientCaseCounter = existingSheets.length + 1;
    const caseNumber = `SCS${patientIdShort}-${String(patientCaseCounter).padStart(2, '0')}`;

    const caseSheetData = {
      ...caseSheet,
      caseNumber,
      createdBy: caseSheet.createdBy || 'system',
    };

    const [newCaseSheet] = await db.insert(surgicalCaseSheets).values([caseSheetData]).returning();
    return newCaseSheet;
  }

  async updateSurgicalCaseSheet(id: string, updates: Partial<SurgicalCaseSheet>): Promise<SurgicalCaseSheet> {
    const [updatedCaseSheet] = await db.update(surgicalCaseSheets)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(surgicalCaseSheets.id, id))
      .returning();
    return updatedCaseSheet;
  }

  async getRecentSurgicalCaseSheets(): Promise<(SurgicalCaseSheet & { patient: Patient })[]> {
    return await db.select({
      id: surgicalCaseSheets.id,
      caseNumber: surgicalCaseSheets.caseNumber,
      patientId: surgicalCaseSheets.patientId,
      patientName: surgicalCaseSheets.patientName,
      husbandFatherName: surgicalCaseSheets.husbandFatherName,
      religion: surgicalCaseSheets.religion,
      nationality: surgicalCaseSheets.nationality,
      age: surgicalCaseSheets.age,
      sex: surgicalCaseSheets.sex,
      address: surgicalCaseSheets.address,
      village: surgicalCaseSheets.village,
      district: surgicalCaseSheets.district,
      diagnosis: surgicalCaseSheets.diagnosis,
      natureOfOperation: surgicalCaseSheets.natureOfOperation,
      edd: surgicalCaseSheets.edd,
      dateOfAdmission: surgicalCaseSheets.dateOfAdmission,
      dateOfOperation: surgicalCaseSheets.dateOfOperation,
      dateOfDischarge: surgicalCaseSheets.dateOfDischarge,
      lpNo: surgicalCaseSheets.lpNo,
      complaintsAndDuration: surgicalCaseSheets.complaintsAndDuration,
      historyOfPresentIllness: surgicalCaseSheets.historyOfPresentIllness,
      hb: surgicalCaseSheets.hb,
      bsa: surgicalCaseSheets.bsa,
      ct: surgicalCaseSheets.ct,
      bt: surgicalCaseSheets.bt,
      bloodGrouping: surgicalCaseSheets.bloodGrouping,
      rhFactor: surgicalCaseSheets.rhFactor,
      prl: surgicalCaseSheets.prl,
      rbs: surgicalCaseSheets.rbs,
      urineSugar: surgicalCaseSheets.urineSugar,
      xray: surgicalCaseSheets.xray,
      ecg: surgicalCaseSheets.ecg,
      bloodUrea: surgicalCaseSheets.bloodUrea,
      serumCreatinine: surgicalCaseSheets.serumCreatinine,
      serumBilirubin: surgicalCaseSheets.serumBilirubin,
      hbsag: surgicalCaseSheets.hbsag,
      generalCondition: surgicalCaseSheets.generalCondition,
      temperature: surgicalCaseSheets.temperature,
      pulse: surgicalCaseSheets.pulse,
      bloodPressure: surgicalCaseSheets.bloodPressure,
      respiratoryRate: surgicalCaseSheets.respiratoryRate,
      heart: surgicalCaseSheets.heart,
      lungs: surgicalCaseSheets.lungs,
      abdomen: surgicalCaseSheets.abdomen,
      cns: surgicalCaseSheets.cns,
      createdBy: surgicalCaseSheets.createdBy,
      createdAt: surgicalCaseSheets.createdAt,
      updatedAt: surgicalCaseSheets.updatedAt,
      patient: patients,
    })
    .from(surgicalCaseSheets)
    .innerJoin(patients, eq(surgicalCaseSheets.patientId, patients.id))
    .orderBy(desc(surgicalCaseSheets.createdAt))
    .limit(10);
  }

  // Patients Registration methods
  async getPatientsRegistration(id: string): Promise<PatientsRegistration | undefined> {
    const [registration] = await db.select().from(patientsRegistration).where(eq(patientsRegistration.id, id));
    return registration;
  }

  async getAllPatientsRegistrations(): Promise<PatientsRegistration[]> {
    return await db.select().from(patientsRegistration).orderBy(desc(patientsRegistration.createdAt));
  }

  async createPatientsRegistration(registration: InsertPatientsRegistration & { createdBy: string }): Promise<PatientsRegistration> {
    const [newRegistration] = await db.insert(patientsRegistration)
      .values([registration])
      .returning();
    return newRegistration;
  }

  async searchPatientsRegistrations(query: string): Promise<PatientsRegistration[]> {
    return await db.select().from(patientsRegistration)
      .where(
        or(
          ilike(patientsRegistration.mruNumber, `%${query}%`),
          ilike(patientsRegistration.fullName, `%${query}%`),
          ilike(patientsRegistration.contactPhone, `%${query}%`)
        )
      )
      .orderBy(desc(patientsRegistration.createdAt))
      .limit(10);
  }

  async updatePatientsRegistration(id: string, updates: Partial<InsertPatientsRegistration>): Promise<PatientsRegistration | undefined> {
    const [updated] = await db.update(patientsRegistration)
      .set({ ...updates, updatedAt: new Date() } as any)
      .where(eq(patientsRegistration.id, id))
      .returning();
    return updated || undefined;
  }

  async getRecentPatientsRegistrations(limit: number = 5): Promise<PatientsRegistration[]> {
    return await db.select().from(patientsRegistration)
      .orderBy(desc(patientsRegistration.createdAt))
      .limit(limit);
  }

  async getNextMRUNumber(): Promise<string> {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const yearPrefix = `MRU${currentYear}-`;
    
    // Get the highest MRU number for the current year
    const lastMRU = await db.select()
      .from(patientsRegistration)
      .where(sql`${patientsRegistration.mruNumber} LIKE ${yearPrefix + '%'}`)
      .orderBy(desc(patientsRegistration.mruNumber))
      .limit(1);
    
    if (lastMRU.length === 0) {
      // First patient of the year
      return `${yearPrefix}0001`;
    }
    
    // Extract the number part and increment
    const lastNumber = parseInt(lastMRU[0].mruNumber.split('-')[1]) || 0;
    const nextNumber = lastNumber + 1;
    
    return `${yearPrefix}${String(nextNumber).padStart(4, '0')}`;
  }
  
  // Medicine Inventory Implementation
  async getAllMedicines(): Promise<MedicineInventory[]> {
    return await db.select()
      .from(medicineInventory)
      .orderBy(desc(medicineInventory.createdAt));
  }

  async getActiveMedicines(): Promise<MedicineInventory[]> {
    return await db.select()
      .from(medicineInventory)
      .where(eq(medicineInventory.isActive, true))
      .orderBy(medicineInventory.medicineName);
  }

  async getMedicine(id: string): Promise<MedicineInventory | undefined> {
    const [medicine] = await db.select()
      .from(medicineInventory)
      .where(eq(medicineInventory.id, id));
    return medicine || undefined;
  }

  async createMedicine(medicine: InsertMedicineInventory & { createdBy: string }): Promise<MedicineInventory> {
    const [created] = await db.insert(medicineInventory)
      .values([medicine])
      .returning();
    return created;
  }

  async updateMedicine(id: string, updates: Partial<MedicineInventory>): Promise<MedicineInventory> {
    const [updated] = await db.update(medicineInventory)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(medicineInventory.id, id))
      .returning();
    return updated;
  }

  async updateMedicineQuantity(id: string, quantityChange: number): Promise<MedicineInventory> {
    console.log(`[DEBUG] updateMedicineQuantity called with id: ${id}, quantityChange: ${quantityChange}`);
    
    const [updated] = await db.update(medicineInventory)
      .set({ 
        quantity: sql`quantity + ${quantityChange}`,
        updatedAt: new Date() 
      })
      .where(eq(medicineInventory.id, id))
      .returning();
    
    console.log(`[DEBUG] Updated medicine:`, updated);
    return updated;
  }

  async checkMedicineStock(medicineId: string, requiredQuantity: number): Promise<boolean> {
    const [medicine] = await db.select({ quantity: medicineInventory.quantity })
      .from(medicineInventory)
      .where(eq(medicineInventory.id, medicineId));
    
    return medicine ? medicine.quantity >= requiredQuantity : false;
  }

  async deleteMedicine(id: string): Promise<void> {
    await db.update(medicineInventory)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(medicineInventory.id, id));
  }

  async searchMedicines(query: string): Promise<MedicineInventory[]> {
    return await db.select()
      .from(medicineInventory)
      .where(
        or(
          ilike(medicineInventory.medicineName, `%${query}%`),
          ilike(medicineInventory.batchNumber, `%${query}%`),
          ilike(medicineInventory.category, `%${query}%`)
        )
      )
      .orderBy(medicineInventory.medicineName);
  }

  async bulkCreateMedicines(medicines: Array<InsertMedicineInventory & { createdBy: string }>): Promise<{ imported: number; duplicates: number }> {
    let imported = 0;
    let duplicates = 0;

    for (const medicine of medicines) {
      try {
        // Check for duplicates based on medicine name and batch number
        const [existing] = await db.select()
          .from(medicineInventory)
          .where(
            and(
              eq(medicineInventory.medicineName, medicine.medicineName),
              eq(medicineInventory.batchNumber, medicine.batchNumber)
            )
          )
          .limit(1);

        if (existing) {
          duplicates++;
          console.log(`Duplicate found: ${medicine.medicineName} - ${medicine.batchNumber}`);
          continue;
        }

        // Create the medicine if no duplicate found
        await db.insert(medicineInventory)
          .values([medicine]);
        
        imported++;
      } catch (error) {
        console.error(`Error creating medicine ${medicine.medicineName}:`, error);
        // Continue processing other medicines even if one fails
      }
    }

    return { imported, duplicates };
  }

  // Hospital Settings Implementation
  async getHospitalSettings(): Promise<HospitalSettings> {
    // Try to get existing settings
    const [settings] = await db.select()
      .from(hospitalSettings)
      .limit(1);
    
    // If no settings exist, create default ones
    if (!settings) {
      // Get the first admin/doctor user to create settings
      const [firstUser] = await db.select()
        .from(users)
        .where(or(eq(users.role, 'doctor'), eq(users.role, 'staff')))
        .limit(1);
      
      if (!firstUser) {
        throw new Error('No user found to initialize hospital settings');
      }
      
      const defaultSettings = {
        hospitalName: 'NAKSHATRA HOSPITAL',
        hospitalSubtitle: 'Multi Specialty Hospital & Research Centre',
        address: '123 Medical District, Healthcare City, State - 123456',
        phone: '+91-1234567890',
        email: 'info@nakshatrahospital.com',
        accreditation: 'NABL Accredited Laboratory | ISO 15189:2012 Certified',
        createdBy: firstUser.id,
      };
      
      const [created] = await db.insert(hospitalSettings)
        .values(defaultSettings)
        .returning();
      
      return created;
    }
    
    return settings;
  }

  async updateHospitalSettings(updates: Partial<InsertHospitalSettings>): Promise<HospitalSettings> {
    // Get existing settings first
    const existing = await this.getHospitalSettings();
    
    const [updated] = await db.update(hospitalSettings)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(hospitalSettings.id, existing.id))
      .returning();
    
    return updated;
  }

  async createHospitalSettings(settings: InsertHospitalSettings & { createdBy: string }): Promise<HospitalSettings> {
    const [created] = await db.insert(hospitalSettings)
      .values(settings)
      .returning();
    
    return created;
  }

  // Activities/Notifications Methods
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const [created] = await db.insert(activities)
      .values(activity)
      .returning();
    
    return created;
  }

  async getRecentActivities(limit: number = 10): Promise<Activity[]> {
    const recentActivities = await db.select()
      .from(activities)
      .orderBy(desc(activities.createdAt))
      .limit(limit);
    
    return recentActivities;
  }

  // Lab Revenue Implementation
  async getLabRevenue(fromDate: string, toDate: string): Promise<{
    totalRevenue: number;
    totalTests: number;
    dateRange: { from: string; to: string; };
    testBreakdown: Array<{
      testName: string;
      department: string;
      count: number;
      totalRevenue: number;
      averageRevenue: number;
    }>;
    dailyRevenue: Array<{
      date: string;
      revenue: number;
      testsCount: number;
    }>;
  }> {
    const startDate = new Date(fromDate);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(toDate);
    endDate.setHours(23, 59, 59, 999);

    // Get all lab tests in the date range
    const labTestsInRange = await db.select({
      id: labTests.id,
      testTypes: labTests.testTypes,
      totalCost: labTests.totalCost,
      createdAt: labTests.createdAt,
    })
    .from(labTests)
    .where(sql`${labTests.createdAt} >= ${startDate} AND ${labTests.createdAt} <= ${endDate}`)
    .orderBy(desc(labTests.createdAt));

    // Calculate total revenue and tests
    const totalRevenue = labTestsInRange.reduce((sum, test) => sum + Number(test.totalCost), 0);
    const totalTests = labTestsInRange.length;

    // Get test definitions for mapping names to departments
    const testDefinitions = await db.select()
      .from(labTestDefinitions)
      .where(eq(labTestDefinitions.isActive, true));

    const testDefMap = new Map(testDefinitions.map(def => [def.testName, def]));

    // Calculate test breakdown
    const testBreakdownMap = new Map<string, {
      testName: string;
      department: string;
      count: number;
      totalRevenue: number;
    }>();

    for (const test of labTestsInRange) {
      const testTypes = Array.isArray(test.testTypes) ? test.testTypes : [];
      const costPerTest = Number(test.totalCost) / Math.max(testTypes.length, 1);

      for (const testType of testTypes) {
        const testName = typeof testType === 'string' ? testType : testType.testName || 'Unknown Test';
        const testDef = testDefMap.get(testName);
        const department = testDef?.department || 'Unknown Department';

        const key = `${testName}-${department}`;
        if (testBreakdownMap.has(key)) {
          const existing = testBreakdownMap.get(key)!;
          existing.count += 1;
          existing.totalRevenue += costPerTest;
        } else {
          testBreakdownMap.set(key, {
            testName,
            department,
            count: 1,
            totalRevenue: costPerTest,
          });
        }
      }
    }

    const testBreakdown = Array.from(testBreakdownMap.values()).map(test => ({
      ...test,
      averageRevenue: test.totalRevenue / test.count,
    })).sort((a, b) => b.totalRevenue - a.totalRevenue);

    // Calculate daily revenue
    const dailyRevenueMap = new Map<string, { revenue: number; testsCount: number; }>();

    for (const test of labTestsInRange) {
      const dateKey = test.createdAt.toISOString().split('T')[0];
      if (dailyRevenueMap.has(dateKey)) {
        const existing = dailyRevenueMap.get(dateKey)!;
        existing.revenue += Number(test.totalCost);
        existing.testsCount += 1;
      } else {
        dailyRevenueMap.set(dateKey, {
          revenue: Number(test.totalCost),
          testsCount: 1,
        });
      }
    }

    const dailyRevenue = Array.from(dailyRevenueMap.entries())
      .map(([date, data]) => ({
        date,
        revenue: data.revenue,
        testsCount: data.testsCount,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalRevenue,
      totalTests,
      dateRange: { from: fromDate, to: toDate },
      testBreakdown,
      dailyRevenue,
    };
  }
}

export const storage = new DatabaseStorage();
