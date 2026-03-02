import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Plus, Award, TrendingUp, TrendingDown, Trash2 } from 'lucide-react';
import { mockStudents, mockCourses, mockGrades } from '../data/mockData';
import { Grade } from '../types';
import { toast } from 'sonner';

export function GradeManagement() {
  const [selectedClass, setSelectedClass] = useState('10th Grade');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedExamType, setSelectedExamType] = useState('all');
  const [isAddGradeDialogOpen, setIsAddGradeDialogOpen] = useState(false);
  const [grades, setGrades] = useState<Grade[]>(mockGrades);
  
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    examType: '',
    marks: '',
    maxMarks: '100',
  });

  const filteredGrades = grades.filter(grade => {
    const student = mockStudents.find(s => s.id === grade.studentId);
    const matchesClass = !selectedClass || student?.class === selectedClass;
    const matchesCourse = selectedCourse === 'all' || grade.courseId === selectedCourse;
    const matchesExamType = selectedExamType === 'all' || grade.examType === selectedExamType;
    
    return matchesClass && matchesCourse && matchesExamType;
  });

  const resetForm = () => {
    setFormData({
      studentId: '',
      courseId: '',
      examType: '',
      marks: '',
      maxMarks: '100',
    });
  };

  const calculateGrade = (marks: number, maxMarks: number): string => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
  };

  const handleAddGrade = () => {
    if (!formData.studentId || !formData.courseId || !formData.examType || !formData.marks) {
      toast.error('Please fill in all required fields');
      return;
    }

    const marks = parseFloat(formData.marks);
    const maxMarks = parseFloat(formData.maxMarks);
    
    if (marks > maxMarks) {
      toast.error('Marks cannot exceed maximum marks');
      return;
    }

    const newGrade: Grade = {
      id: `G${String(grades.length + 1).padStart(3, '0')}`,
      studentId: formData.studentId,
      courseId: formData.courseId,
      examType: formData.examType,
      marks: marks,
      maxMarks: maxMarks,
      grade: calculateGrade(marks, maxMarks),
      semester: 'Fall 2024',
      date: new Date().toISOString().split('T')[0],
    };

    setGrades([...grades, newGrade]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success('Grade added successfully!');
  };

  const handleDeleteGrade = (gradeId: string) => {
    if (confirm('Are you sure you want to delete this grade?')) {
      setGrades(grades.filter(g => g.id !== gradeId));
      toast.success('Grade deleted successfully!');
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-500';
    if (grade.startsWith('B')) return 'bg-blue-500';
    if (grade.startsWith('C')) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStudentName = (studentId: string) => {
    const student = mockStudents.find(s => s.id === studentId);
    return student ? `${student.firstName} ${student.lastName}` : 'N/A';
  };

  const getCourseName = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    return course ? course.name : 'N/A';
  };

  const calculateAverage = () => {
    if (filteredGrades.length === 0) return 0;
    const total = filteredGrades.reduce((sum, grade) => sum + (grade.marks / grade.maxMarks) * 100, 0);
    return Math.round(total / filteredGrades.length);
  };

  const getTopPerformer = () => {
    if (filteredGrades.length === 0) return 'N/A';
    const topGrade = filteredGrades.reduce((max, grade) => 
      (grade.marks / grade.maxMarks) > (max.marks / max.maxMarks) ? grade : max
    );
    return getStudentName(topGrade.studentId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Grade Management</h2>
          <p className="text-muted-foreground">
            Manage student grades and assessments
          </p>
        </div>
        <Dialog open={isAddGradeDialogOpen} onOpenChange={(open) => {
          setIsAddGradeDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Grade
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Grade</DialogTitle>
              <DialogDescription>
                Enter grade details for a student assessment
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="student">Student *</Label>
                <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockStudents.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.firstName} {student.lastName} - {student.rollNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course *</Label>
                <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code} - {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="examType">Exam Type *</Label>
                <Select value={formData.examType} onValueChange={(value) => setFormData({ ...formData, examType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Midterm">Midterm</SelectItem>
                    <SelectItem value="Final">Final</SelectItem>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Assignment">Assignment</SelectItem>
                    <SelectItem value="Project">Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marks">Marks Obtained *</Label>
                  <Input 
                    id="marks" 
                    type="number" 
                    placeholder="85" 
                    value={formData.marks}
                    onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxMarks">Maximum Marks *</Label>
                  <Input 
                    id="maxMarks" 
                    type="number" 
                    placeholder="100" 
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddGradeDialogOpen(false);
                resetForm();
              }}>Cancel</Button>
              <Button onClick={handleAddGrade}>Add Grade</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredGrades.length}</div>
            <p className="text-xs text-muted-foreground">
              Graded assessments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Class Average</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculateAverage()}%</div>
            <p className="text-xs text-muted-foreground">
              Overall performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate">{getTopPerformer()}</div>
            <p className="text-xs text-muted-foreground">
              Highest scorer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredGrades.length > 0 
                ? Math.round((filteredGrades.filter(g => (g.marks / g.maxMarks) * 100 >= 40).length / filteredGrades.length) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Students passing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
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

            <Select value={selectedExamType} onValueChange={setSelectedExamType}>
              <SelectTrigger>
                <SelectValue placeholder="Exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Midterm">Midterm</SelectItem>
                <SelectItem value="Final">Final</SelectItem>
                <SelectItem value="Quiz">Quiz</SelectItem>
                <SelectItem value="Assignment">Assignment</SelectItem>
                <SelectItem value="Project">Project</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Grade Records</CardTitle>
          <CardDescription>
            {filteredGrades.length} grade record(s) found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Exam Type</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGrades.map((grade) => {
                const percentage = Math.round((grade.marks / grade.maxMarks) * 100);
                return (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">
                      {getStudentName(grade.studentId)}
                    </TableCell>
                    <TableCell>{getCourseName(grade.courseId)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{grade.examType}</Badge>
                    </TableCell>
                    <TableCell>
                      {grade.marks}/{grade.maxMarks}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{percentage}%</span>
                        {percentage >= 80 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : percentage < 60 ? (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getGradeColor(grade.grade)}>
                        {grade.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(grade.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteGrade(grade.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
