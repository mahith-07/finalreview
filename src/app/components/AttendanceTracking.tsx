import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CheckCircle, XCircle, Clock, FileCheck, CalendarIcon } from 'lucide-react';
import { mockStudents, mockCourses, mockAttendance } from '../data/mockData';
import { Attendance } from '../types';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function AttendanceTracking() {
  const [selectedClass, setSelectedClass] = useState('10th Grade');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>(mockAttendance);

  const filteredStudents = mockStudents.filter(
    student => student.class === selectedClass && student.section === selectedSection
  );

  const getAttendanceStatus = (studentId: string) => {
    const attendance = attendanceRecords.find(
      a => a.studentId === studentId && a.date === format(selectedDate, 'yyyy-MM-dd')
    );
    return attendance?.status || 'not-marked';
  };

  const markAttendance = (studentId: string, status: 'present' | 'absent' | 'late' | 'excused') => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const existingIndex = attendanceRecords.findIndex(
      a => a.studentId === studentId && a.date === dateStr
    );

    if (existingIndex >= 0) {
      // Update existing record
      const updated = [...attendanceRecords];
      updated[existingIndex] = { ...updated[existingIndex], status };
      setAttendanceRecords(updated);
    } else {
      // Create new record
      const newRecord: Attendance = {
        id: `A${attendanceRecords.length + 1}`,
        studentId,
        courseId: selectedCourse === 'all' ? 'C001' : selectedCourse,
        date: dateStr,
        status,
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }
    
    const student = mockStudents.find(s => s.id === studentId);
    toast.success(`Marked ${student?.firstName} ${student?.lastName} as ${status}`);
  };

  const saveAttendance = () => {
    toast.success('Attendance saved successfully!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Present
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            Absent
          </Badge>
        );
      case 'late':
        return (
          <Badge className="bg-yellow-500">
            <Clock className="h-3 w-3 mr-1" />
            Late
          </Badge>
        );
      case 'excused':
        return (
          <Badge className="bg-blue-500">
            <FileCheck className="h-3 w-3 mr-1" />
            Excused
          </Badge>
        );
      default:
        return <Badge variant="outline">Not Marked</Badge>;
    }
  };

  const calculateAttendancePercentage = (studentId: string) => {
    const studentAttendance = attendanceRecords.filter(a => a.studentId === studentId);
    if (studentAttendance.length === 0) return 0;
    const present = studentAttendance.filter(a => a.status === 'present').length;
    return Math.round((present / studentAttendance.length) * 100);
  };

  const calculateTodayStats = () => {
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const todayRecords = attendanceRecords.filter(a => a.date === dateStr);
    const present = todayRecords.filter(a => a.status === 'present').length;
    const absent = todayRecords.filter(a => a.status === 'absent').length;
    return { present, absent };
  };

  const stats = calculateTodayStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Attendance Tracking</h2>
        <p className="text-muted-foreground">
          Mark and track student attendance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredStudents.length}</div>
            <p className="text-xs text-muted-foreground">
              In selected class
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.present}</div>
            <p className="text-xs text-muted-foreground">
              Students marked present
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.absent}</div>
            <p className="text-xs text-muted-foreground">
              Students marked absent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.present + stats.absent > 0 
                ? Math.round((stats.present / (stats.present + stats.absent)) * 100) 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              For selected date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9th Grade">9th Grade</SelectItem>
                <SelectItem value="10th Grade">10th Grade</SelectItem>
                <SelectItem value="11th Grade">11th Grade</SelectItem>
                <SelectItem value="12th Grade">12th Grade</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSection} onValueChange={setSelectedSection}>
              <SelectTrigger>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Section A</SelectItem>
                <SelectItem value="B">Section B</SelectItem>
                <SelectItem value="C">Section C</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {mockCourses.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Attendance Sheet</CardTitle>
              <CardDescription>
                {selectedClass} - Section {selectedSection} | {format(selectedDate, 'MMMM dd, yyyy')}
              </CardDescription>
            </div>
            <Button onClick={saveAttendance}>
              <FileCheck className="mr-2 h-4 w-4" />
              Save Attendance
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll No.</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Overall %</TableHead>
                <TableHead className="text-right">Mark Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.rollNumber}</TableCell>
                  <TableCell>
                    {student.firstName} {student.lastName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {student.email}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(getAttendanceStatus(student.id))}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">
                        {calculateAttendancePercentage(student.id)}%
                      </div>
                      <div className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500"
                          style={{ width: `${calculateAttendancePercentage(student.id)}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-green-500 hover:text-green-600 hover:bg-green-50"
                        onClick={() => markAttendance(student.id, 'present')}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => markAttendance(student.id, 'absent')}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                        onClick={() => markAttendance(student.id, 'late')}
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="h-8 w-8 p-0 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                        onClick={() => markAttendance(student.id, 'excused')}
                      >
                        <FileCheck className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
