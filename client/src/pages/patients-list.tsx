import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Calendar, Users, Filter, Download } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

// Interface for patient data
interface Patient {
  id: string;
  mruNumber: string;
  fullName: string;
  age: number;
  ageUnit: string;
  gender: string;
  phone: string;
  email?: string;
  address?: string;
  bloodGroup?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  referredBy?: string;
  createdAt: string;
}

export default function PatientsList() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState({
    from: '',
    to: ''
  });

  // Fetch all patients with date filtering
  const { data: patients, isLoading } = useQuery<Patient[]>({
    queryKey: ['/api/patients-registration'],
    staleTime: 30 * 1000, // Cache for 30 seconds
  });

  // Filter patients based on search query and date range
  const filteredPatients = patients?.filter(patient => {
    const matchesSearch = !searchQuery || 
      patient.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.mruNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);

    const matchesDateRange = (() => {
      if (!dateFilter.from && !dateFilter.to) return true;
      
      const patientDate = new Date(patient.createdAt);
      const fromDate = dateFilter.from ? new Date(dateFilter.from) : null;
      const toDate = dateFilter.to ? new Date(dateFilter.to + 'T23:59:59') : null;
      
      if (fromDate && patientDate < fromDate) return false;
      if (toDate && patientDate > toDate) return false;
      
      return true;
    })();

    return matchesSearch && matchesDateRange;
  }) || [];

  const handleClearFilters = () => {
    setSearchQuery('');
    setDateFilter({ from: '', to: '' });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy hh:mm a');
  };

  const formatPatientAge = (age: number, unit: string) => {
    return `${age} ${unit}${age > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => setLocation('/')}
                className="mr-4"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  All Patients
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Total: {filteredPatients.length} patient{filteredPatients.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, MRU, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              
              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  From Date
                </label>
                <Input
                  type="date"
                  value={dateFilter.from}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, from: e.target.value }))}
                  data-testid="input-date-from"
                />
              </div>
              
              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  To Date
                </label>
                <Input
                  type="date"
                  value={dateFilter.to}
                  onChange={(e) => setDateFilter(prev => ({ ...prev, to: e.target.value }))}
                  data-testid="input-date-to"
                />
              </div>
              
              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="w-full"
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patients List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Loading patients...</p>
          </div>
        ) : filteredPatients.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No patients found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery || dateFilter.from || dateFilter.to 
                  ? "Try adjusting your filters to see more results."
                  : "No patients have been registered yet."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Patient Basic Info */}
                    <div className="space-y-1">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                        {patient.fullName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        MRU: {patient.mruNumber}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {formatPatientAge(patient.age, patient.ageUnit)} • {patient.gender}
                      </p>
                      {patient.bloodGroup && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Blood Group: {patient.bloodGroup}
                        </p>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Phone:</strong> {patient.phone}
                      </p>
                      {patient.email && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Email:</strong> {patient.email}
                        </p>
                      )}
                      {patient.address && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Address:</strong> {patient.address}
                        </p>
                      )}
                      {patient.referredBy && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Referred by:</strong> {patient.referredBy}
                        </p>
                      )}
                    </div>

                    {/* Emergency Contact & Registration Date */}
                    <div className="space-y-1">
                      {patient.emergencyContactName && (
                        <>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <strong>Emergency Contact:</strong> {patient.emergencyContactName}
                          </p>
                          {patient.emergencyContactPhone && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>Emergency Phone:</strong> {patient.emergencyContactPhone}
                            </p>
                          )}
                        </>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <strong>Registered:</strong> {formatDate(patient.createdAt)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}