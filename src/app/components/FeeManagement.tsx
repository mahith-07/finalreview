import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DollarSign, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { mockStudents, mockFees } from '../data/mockData';
import { Fee } from '../types';
import { toast } from 'sonner';

export function FeeManagement() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterClass, setFilterClass] = useState('all');
  const [fees, setFees] = useState<Fee[]>(mockFees);

  const filteredFees = fees.filter(fee => {
    const student = mockStudents.find(s => s.id === fee.studentId);
    const matchesStatus = filterStatus === 'all' || fee.status === filterStatus;
    const matchesClass = filterClass === 'all' || student?.class === filterClass;
    
    return matchesStatus && matchesClass;
  });

  const markAsPaid = (feeId: string) => {
    const updatedFees = fees.map(fee => {
      if (fee.id === feeId) {
        return {
          ...fee,
          status: 'paid' as const,
          paidDate: new Date().toISOString().split('T')[0],
          paymentMethod: 'Cash', // Default payment method
        };
      }
      return fee;
    });
    
    setFees(updatedFees);
    const fee = fees.find(f => f.id === feeId);
    const student = mockStudents.find(s => s.id === fee?.studentId);
    toast.success(`Payment recorded for ${student?.firstName} ${student?.lastName}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Paid
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'overdue':
        return (
          <Badge className="bg-red-500">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </Badge>
        );
      case 'partial':
        return (
          <Badge className="bg-orange-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            Partial
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStudentInfo = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? {
      name: `${student.firstName} ${student.lastName}`,
      class: student.class,
      rollNumber: student.rollNumber
    } : { name: 'N/A', class: 'N/A', rollNumber: 'N/A' };
  };

  const totalCollected = fees
    .filter(f => f.status === 'paid')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const totalPending = fees
    .filter(f => f.status === 'pending' || f.status === 'overdue')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const totalOverdue = fees
    .filter(f => f.status === 'overdue')
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Fee Management</h2>
        <p className="text-muted-foreground">
          Track and manage student fee payments
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Fees</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              To be collected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalOverdue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Payment overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCollected + totalPending > 0
                ? Math.round((totalCollected / (totalCollected + totalPending)) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Payment success rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="9th Grade">9th Grade</SelectItem>
                <SelectItem value="10th Grade">10th Grade</SelectItem>
                <SelectItem value="11th Grade">11th Grade</SelectItem>
                <SelectItem value="12th Grade">12th Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Records</CardTitle>
          <CardDescription>
            {filteredFees.length} fee record(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Paid Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFees.map((fee) => {
                const studentInfo = getStudentInfo(fee.studentId);
                const isDueDate = new Date(fee.dueDate);
                const isOverdue = fee.status === 'overdue' || (new Date() > isDueDate && fee.status === 'pending');
                
                return (
                  <TableRow key={fee.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{studentInfo.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Roll No: {studentInfo.rollNumber}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{studentInfo.class}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{fee.type}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">₹{fee.amount.toLocaleString()}</TableCell>
                    <TableCell className={isOverdue && fee.status !== 'paid' ? 'text-red-500' : ''}>
                      {new Date(fee.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {fee.paidDate ? new Date(fee.paidDate).toLocaleDateString() : '-'}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(fee.status)}
                    </TableCell>
                    <TableCell className="text-sm">
                      {fee.paymentMethod || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      {fee.status !== 'paid' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => markAsPaid(fee.id)}
                        >
                          Mark as Paid
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
