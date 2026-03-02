// Core Types for Educational ERP System

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  enrollmentDate: string;
  dateOfBirth: string;
  class: string;
  section: string;
  rollNumber: string;
  guardianName: string;
  guardianPhone: string;
  address: string;
  status: 'active' | 'inactive' | 'graduated';
  profileImage?: string;
}

export interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  dateOfJoining: string;
  qualification: string;
  subjects: string[];
  status: 'active' | 'inactive';
  profileImage?: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  department: string;
  credits: number;
  semester: string;
  facultyId: string;
  capacity: number;
  enrolled: number;
  schedule: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  examType: string;
  marks: number;
  maxMarks: number;
  grade: string;
  semester: string;
  date: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'partial';
  type: string;
  semester: string;
  paymentMethod?: string;
}

export interface Timetable {
  id: string;
  courseId: string;
  facultyId: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
  class: string;
  section: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: 'low' | 'medium' | 'high';
  audience: string[];
  createdBy: string;
}
