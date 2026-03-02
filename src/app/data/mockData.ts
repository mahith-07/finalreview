import { Student, Faculty, Course, Attendance, Grade, Fee, Timetable, Announcement } from '../types';

// Mock Students Data
export const mockStudents: Student[] = [
  {
    id: 'S001',
    firstName: 'Emma',
    lastName: 'Johnson',
    email: 'emma.johnson@school.edu',
    phone: '+1234567890',
    enrollmentDate: '2023-09-01',
    dateOfBirth: '2006-05-15',
    class: '10th Grade',
    section: 'A',
    rollNumber: '101',
    guardianName: 'Robert Johnson',
    guardianPhone: '+1234567891',
    address: '123 Main St, City, State',
    status: 'active',
  },
  {
    id: 'S002',
    firstName: 'Liam',
    lastName: 'Smith',
    email: 'liam.smith@school.edu',
    phone: '+1234567892',
    enrollmentDate: '2023-09-01',
    dateOfBirth: '2006-08-22',
    class: '10th Grade',
    section: 'A',
    rollNumber: '102',
    guardianName: 'Sarah Smith',
    guardianPhone: '+1234567893',
    address: '456 Oak Ave, City, State',
    status: 'active',
  },
  {
    id: 'S003',
    firstName: 'Olivia',
    lastName: 'Brown',
    email: 'olivia.brown@school.edu',
    phone: '+1234567894',
    enrollmentDate: '2023-09-01',
    dateOfBirth: '2006-03-10',
    class: '10th Grade',
    section: 'B',
    rollNumber: '201',
    guardianName: 'Michael Brown',
    guardianPhone: '+1234567895',
    address: '789 Pine Rd, City, State',
    status: 'active',
  },
  {
    id: 'S004',
    firstName: 'Noah',
    lastName: 'Davis',
    email: 'noah.davis@school.edu',
    phone: '+1234567896',
    enrollmentDate: '2022-09-01',
    dateOfBirth: '2005-11-28',
    class: '11th Grade',
    section: 'A',
    rollNumber: '101',
    guardianName: 'Jennifer Davis',
    guardianPhone: '+1234567897',
    address: '321 Elm St, City, State',
    status: 'active',
  },
  {
    id: 'S005',
    firstName: 'Ava',
    lastName: 'Wilson',
    email: 'ava.wilson@school.edu',
    phone: '+1234567898',
    enrollmentDate: '2022-09-01',
    dateOfBirth: '2005-07-14',
    class: '11th Grade',
    section: 'A',
    rollNumber: '102',
    guardianName: 'David Wilson',
    guardianPhone: '+1234567899',
    address: '654 Maple Dr, City, State',
    status: 'active',
  },
];

// Mock Faculty Data
export const mockFaculty: Faculty[] = [
  {
    id: 'F001',
    firstName: 'Dr. James',
    lastName: 'Anderson',
    email: 'james.anderson@school.edu',
    phone: '+1234560001',
    department: 'Mathematics',
    designation: 'Professor',
    dateOfJoining: '2015-08-15',
    qualification: 'Ph.D. in Mathematics',
    subjects: ['Calculus', 'Algebra', 'Geometry'],
    status: 'active',
  },
  {
    id: 'F002',
    firstName: 'Dr. Sarah',
    lastName: 'Martinez',
    email: 'sarah.martinez@school.edu',
    phone: '+1234560002',
    department: 'Science',
    designation: 'Associate Professor',
    dateOfJoining: '2017-01-20',
    qualification: 'Ph.D. in Physics',
    subjects: ['Physics', 'Chemistry'],
    status: 'active',
  },
  {
    id: 'F003',
    firstName: 'Ms. Emily',
    lastName: 'Taylor',
    email: 'emily.taylor@school.edu',
    phone: '+1234560003',
    department: 'English',
    designation: 'Senior Teacher',
    dateOfJoining: '2018-07-01',
    qualification: 'M.A. in English Literature',
    subjects: ['English Literature', 'Creative Writing'],
    status: 'active',
  },
  {
    id: 'F004',
    firstName: 'Mr. Michael',
    lastName: 'Lee',
    email: 'michael.lee@school.edu',
    phone: '+1234560004',
    department: 'Computer Science',
    designation: 'Assistant Professor',
    dateOfJoining: '2019-09-01',
    qualification: 'M.Tech in Computer Science',
    subjects: ['Programming', 'Database Systems', 'Web Development'],
    status: 'active',
  },
  {
    id: 'F005',
    firstName: 'Mrs. Lisa',
    lastName: 'Garcia',
    email: 'lisa.garcia@school.edu',
    phone: '+1234560005',
    department: 'Social Studies',
    designation: 'Senior Teacher',
    dateOfJoining: '2016-03-15',
    qualification: 'M.A. in History',
    subjects: ['History', 'Geography', 'Civics'],
    status: 'active',
  },
];

// Mock Courses Data
export const mockCourses: Course[] = [
  {
    id: 'C001',
    code: 'MATH301',
    name: 'Advanced Calculus',
    description: 'Advanced topics in calculus including differential equations and multivariable calculus',
    department: 'Mathematics',
    credits: 4,
    semester: 'Fall 2024',
    facultyId: 'F001',
    capacity: 30,
    enrolled: 25,
    schedule: 'Mon, Wed, Fri 10:00 AM - 11:00 AM',
  },
  {
    id: 'C002',
    code: 'PHY201',
    name: 'Physics II',
    description: 'Mechanics, thermodynamics, and wave motion',
    department: 'Science',
    credits: 4,
    semester: 'Fall 2024',
    facultyId: 'F002',
    capacity: 30,
    enrolled: 28,
    schedule: 'Tue, Thu 9:00 AM - 10:30 AM',
  },
  {
    id: 'C003',
    code: 'ENG101',
    name: 'English Literature',
    description: 'Study of classic and contemporary literature',
    department: 'English',
    credits: 3,
    semester: 'Fall 2024',
    facultyId: 'F003',
    capacity: 35,
    enrolled: 32,
    schedule: 'Mon, Wed 2:00 PM - 3:30 PM',
  },
  {
    id: 'C004',
    code: 'CS201',
    name: 'Data Structures',
    description: 'Fundamental data structures and algorithms',
    department: 'Computer Science',
    credits: 4,
    semester: 'Fall 2024',
    facultyId: 'F004',
    capacity: 25,
    enrolled: 24,
    schedule: 'Tue, Thu 11:00 AM - 12:30 PM',
  },
  {
    id: 'C005',
    code: 'HIST101',
    name: 'World History',
    description: 'Survey of world history from ancient to modern times',
    department: 'Social Studies',
    credits: 3,
    semester: 'Fall 2024',
    facultyId: 'F005',
    capacity: 30,
    enrolled: 27,
    schedule: 'Mon, Wed, Fri 1:00 PM - 2:00 PM',
  },
];

// Mock Attendance Data
export const mockAttendance: Attendance[] = [
  { id: 'A001', studentId: 'S001', courseId: 'C001', date: '2024-02-20', status: 'present' },
  { id: 'A002', studentId: 'S001', courseId: 'C002', date: '2024-02-20', status: 'present' },
  { id: 'A003', studentId: 'S002', courseId: 'C001', date: '2024-02-20', status: 'absent', remarks: 'Sick leave' },
  { id: 'A004', studentId: 'S002', courseId: 'C002', date: '2024-02-20', status: 'present' },
  { id: 'A005', studentId: 'S003', courseId: 'C003', date: '2024-02-20', status: 'late' },
];

// Mock Grades Data
export const mockGrades: Grade[] = [
  { id: 'G001', studentId: 'S001', courseId: 'C001', examType: 'Midterm', marks: 85, maxMarks: 100, grade: 'A', semester: 'Fall 2024', date: '2024-02-15' },
  { id: 'G002', studentId: 'S001', courseId: 'C002', examType: 'Midterm', marks: 78, maxMarks: 100, grade: 'B+', semester: 'Fall 2024', date: '2024-02-15' },
  { id: 'G003', studentId: 'S002', courseId: 'C001', examType: 'Midterm', marks: 92, maxMarks: 100, grade: 'A+', semester: 'Fall 2024', date: '2024-02-15' },
  { id: 'G004', studentId: 'S003', courseId: 'C003', examType: 'Midterm', marks: 88, maxMarks: 100, grade: 'A', semester: 'Fall 2024', date: '2024-02-15' },
  { id: 'G005', studentId: 'S004', courseId: 'C004', examType: 'Midterm', marks: 75, maxMarks: 100, grade: 'B', semester: 'Fall 2024', date: '2024-02-15' },
];

// Mock Fee Data
export const mockFees: Fee[] = [
  { id: 'FE001', studentId: 'S001', amount: 5000, dueDate: '2024-03-01', paidDate: '2024-02-25', status: 'paid', type: 'Tuition', semester: 'Spring 2024', paymentMethod: 'Credit Card' },
  { id: 'FE002', studentId: 'S002', amount: 5000, dueDate: '2024-03-01', status: 'pending', type: 'Tuition', semester: 'Spring 2024' },
  { id: 'FE003', studentId: 'S003', amount: 5000, dueDate: '2024-02-01', status: 'overdue', type: 'Tuition', semester: 'Spring 2024' },
  { id: 'FE004', studentId: 'S004', amount: 5000, dueDate: '2024-03-01', paidDate: '2024-02-20', status: 'paid', type: 'Tuition', semester: 'Spring 2024', paymentMethod: 'Bank Transfer' },
  { id: 'FE005', studentId: 'S005', amount: 2500, dueDate: '2024-03-01', paidDate: '2024-02-18', status: 'partial', type: 'Tuition', semester: 'Spring 2024', paymentMethod: 'Cash' },
];

// Mock Timetable Data
export const mockTimetable: Timetable[] = [
  { id: 'T001', courseId: 'C001', facultyId: 'F001', day: 'Monday', startTime: '10:00', endTime: '11:00', room: 'Room 201', class: '10th Grade', section: 'A' },
  { id: 'T002', courseId: 'C001', facultyId: 'F001', day: 'Wednesday', startTime: '10:00', endTime: '11:00', room: 'Room 201', class: '10th Grade', section: 'A' },
  { id: 'T003', courseId: 'C001', facultyId: 'F001', day: 'Friday', startTime: '10:00', endTime: '11:00', room: 'Room 201', class: '10th Grade', section: 'A' },
  { id: 'T004', courseId: 'C002', facultyId: 'F002', day: 'Tuesday', startTime: '09:00', endTime: '10:30', room: 'Lab 1', class: '10th Grade', section: 'A' },
  { id: 'T005', courseId: 'C002', facultyId: 'F002', day: 'Thursday', startTime: '09:00', endTime: '10:30', room: 'Lab 1', class: '10th Grade', section: 'A' },
];

// Mock Announcements Data
export const mockAnnouncements: Announcement[] = [
  {
    id: 'AN001',
    title: 'Mid-term Examination Schedule Released',
    content: 'The mid-term examination schedule for Spring 2024 has been published. Please check the student portal for details.',
    date: '2024-02-20',
    priority: 'high',
    audience: ['students', 'faculty'],
    createdBy: 'Admin',
  },
  {
    id: 'AN002',
    title: 'Sports Day Event - March 15th',
    content: 'Annual sports day will be held on March 15th, 2024. All students are encouraged to participate.',
    date: '2024-02-18',
    priority: 'medium',
    audience: ['students'],
    createdBy: 'Sports Department',
  },
  {
    id: 'AN003',
    title: 'Fee Payment Reminder',
    content: 'This is a reminder that tuition fees for Spring 2024 are due by March 1st, 2024.',
    date: '2024-02-15',
    priority: 'high',
    audience: ['students', 'parents'],
    createdBy: 'Accounts Department',
  },
];

// Dashboard Statistics
export const mockDashboardStats = {
  totalStudents: 1250,
  totalFaculty: 85,
  totalCourses: 120,
  activeClasses: 45,
  attendanceToday: 92.5,
  pendingFees: 350000,
  upcomingExams: 8,
  announcements: 3,
};

// Monthly Attendance Data for Charts
export const mockMonthlyAttendance = [
  { month: 'Sep', attendance: 94 },
  { month: 'Oct', attendance: 92 },
  { month: 'Nov', attendance: 91 },
  { month: 'Dec', attendance: 93 },
  { month: 'Jan', attendance: 90 },
  { month: 'Feb', attendance: 92.5 },
];

// Department-wise Student Distribution
export const mockDepartmentDistribution = [
  { name: 'Science', value: 320 },
  { name: 'Commerce', value: 280 },
  { name: 'Arts', value: 250 },
  { name: 'Technology', value: 400 },
];

// Fee Collection Data
export const mockFeeCollection = [
  { month: 'Sep', collected: 580000, pending: 120000 },
  { month: 'Oct', collected: 620000, pending: 80000 },
  { month: 'Nov', collected: 650000, pending: 50000 },
  { month: 'Dec', collected: 600000, pending: 100000 },
  { month: 'Jan', collected: 640000, pending: 60000 },
  { month: 'Feb', collected: 620000, pending: 80000 },
];
