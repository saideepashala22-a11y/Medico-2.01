import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, DollarSign, Calendar, TrendingUp, FileText, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Interface for revenue data
interface LabRevenueData {
  totalRevenue: number;
  totalTests: number;
  dateRange: {
    from: string;
    to: string;
  };
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
}

export default function LabRevenue() {
  const [, setLocation] = useLocation();
  const [dateFilter, setDateFilter] = useState({
    from: format(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'yyyy-MM-dd'), // First day of current month
    to: format(new Date(), 'yyyy-MM-dd') // Today
  });

  // Fetch revenue data with date filtering
  const { data: revenueData, isLoading } = useQuery<LabRevenueData>({
    queryKey: ['/api/lab-revenue', dateFilter.from, dateFilter.to],
    queryFn: async () => {
      const params = new URLSearchParams({
        from: dateFilter.from,
        to: dateFilter.to
      });
      const response = await fetch(`/api/lab-revenue?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch revenue data');
      }
      return response.json();
    },
    staleTime: 30 * 1000, // Cache for 30 seconds
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  const handleExportData = () => {
    if (!revenueData) return;
    
    // Create CSV content
    const csvContent = [
      ['Lab Revenue Report'],
      [`Period: ${formatDate(dateFilter.from)} to ${formatDate(dateFilter.to)}`],
      [`Total Revenue: ${formatCurrency(revenueData.totalRevenue)}`],
      [`Total Tests: ${revenueData.totalTests}`],
      [''],
      ['Test Breakdown'],
      ['Test Name', 'Department', 'Count', 'Total Revenue', 'Average Revenue'],
      ...revenueData.testBreakdown.map(test => [
        test.testName,
        test.department,
        test.count.toString(),
        test.totalRevenue.toString(),
        test.averageRevenue.toString()
      ]),
      [''],
      ['Daily Revenue'],
      ['Date', 'Revenue', 'Tests Count'],
      ...revenueData.dailyRevenue.map(day => [
        formatDate(day.date),
        day.revenue.toString(),
        day.testsCount.toString()
      ])
    ].map(row => row.join(',')).join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lab-revenue-${dateFilter.from}-to-${dateFilter.to}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
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
                onClick={() => setLocation('/lab')}
                className="mr-4"
                data-testid="button-back-to-lab"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Laboratory
              </Button>
              <div className="flex items-center">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Lab Revenue Report
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleExportData}
                disabled={!revenueData}
                variant="outline"
                data-testid="button-export-revenue"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Date Range Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    const today = new Date();
                    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                    setDateFilter({
                      from: format(firstDay, 'yyyy-MM-dd'),
                      to: format(today, 'yyyy-MM-dd')
                    });
                  }}
                  className="w-full"
                  data-testid="button-reset-to-current-month"
                >
                  Current Month
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Loading revenue data...</p>
          </div>
        ) : revenueData ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(revenueData.totalRevenue)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tests</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {revenueData.totalTests}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average per Test</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {revenueData.totalTests > 0 
                          ? formatCurrency(revenueData.totalRevenue / revenueData.totalTests)
                          : formatCurrency(0)
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Daily Revenue Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                {revenueData.dailyRevenue.length === 0 ? (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No daily data available
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No revenue data found for the selected date range to display the trend.
                    </p>
                  </div>
                ) : (
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData.dailyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => formatDate(value)}
                          className="text-gray-600 dark:text-gray-400"
                          stroke="currentColor"
                        />
                        <YAxis 
                          tickFormatter={(value) => `₹${value.toLocaleString()}`}
                          className="text-gray-600 dark:text-gray-400"
                          stroke="currentColor"
                        />
                        <Tooltip 
                          formatter={(value: number, name: string) => {
                            if (name === 'revenue') {
                              return [formatCurrency(value), 'Revenue'];
                            }
                            return [value, name];
                          }}
                          labelFormatter={(value) => `Date: ${formatDate(value)}`}
                          contentStyle={{
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border)',
                            borderRadius: '6px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#22c55e" 
                          strokeWidth={3}
                          dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                          activeDot={{ r: 8, stroke: '#22c55e', strokeWidth: 2, fill: '#fff' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Count Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Daily Test Count
                </CardTitle>
              </CardHeader>
              <CardContent>
                {revenueData.dailyRevenue.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No daily data available
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No test count data found for the selected date range.
                    </p>
                  </div>
                ) : (
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData.dailyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                        <XAxis 
                          dataKey="date" 
                          tickFormatter={(value) => formatDate(value)}
                          className="text-gray-600 dark:text-gray-400"
                          stroke="currentColor"
                        />
                        <YAxis 
                          className="text-gray-600 dark:text-gray-400"
                          stroke="currentColor"
                        />
                        <Tooltip 
                          formatter={(value: number) => [value, 'Tests']}
                          labelFormatter={(value) => `Date: ${formatDate(value)}`}
                          contentStyle={{
                            backgroundColor: 'var(--background)',
                            border: '1px solid var(--border)',
                            borderRadius: '6px'
                          }}
                        />
                        <Bar 
                          dataKey="testsCount" 
                          fill="#3b82f6" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Test Breakdown Table */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Test Type</CardTitle>
              </CardHeader>
              <CardContent>
                {revenueData.testBreakdown.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No test data found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No lab tests were performed in the selected date range.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Test Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-right">Count</TableHead>
                        <TableHead className="text-right">Total Revenue</TableHead>
                        <TableHead className="text-right">Average Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {revenueData.testBreakdown.map((test, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{test.testName}</TableCell>
                          <TableCell>{test.department}</TableCell>
                          <TableCell className="text-right">{test.count}</TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            {formatCurrency(test.totalRevenue)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatCurrency(test.averageRevenue)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Daily Revenue Table */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                {revenueData.dailyRevenue.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No daily data found
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      No revenue data available for the selected period.
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Tests Count</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {revenueData.dailyRevenue.map((day, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{formatDate(day.date)}</TableCell>
                          <TableCell className="text-right">{day.testsCount}</TableCell>
                          <TableCell className="text-right font-medium text-green-600">
                            {formatCurrency(day.revenue)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Unable to load revenue data
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Please try refreshing the page or check your connection.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}