import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Search, Plus, Edit, Trash2, BookOpen, Users, Calendar } from 'lucide-react';
import { mockCourses, mockFaculty } from '../data/mockData';
import { Course } from '../types';
import { toast } from 'sonner';

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    department: '',
    credits: '',
    semester: '',
    facultyId: '',
    capacity: '',
    schedule: '',
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment = filterDepartment === 'all' || course.department === filterDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      description: '',
      department: '',
      credits: '',
      semester: '',
      facultyId: '',
      capacity: '',
      schedule: '',
    });
  };

  const handleAddCourse = () => {
    if (!formData.code || !formData.name || !formData.department) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newCourse: Course = {
      id: `C${String(courses.length + 1).padStart(3, '0')}`,
      code: formData.code,
      name: formData.name,
      description: formData.description,
      department: formData.department,
      credits: parseInt(formData.credits) || 3,
      semester: formData.semester,
      facultyId: formData.facultyId,
      capacity: parseInt(formData.capacity) || 30,
      enrolled: 0,
      schedule: formData.schedule,
    };

    setCourses([...courses, newCourse]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success('Course added successfully!');
  };

  const handleEditCourse = () => {
    if (!selectedCourse) return;

    const updatedCourses = courses.map(course =>
      course.id === selectedCourse.id
        ? {
            ...course,
            code: formData.code,
            name: formData.name,
            description: formData.description,
            department: formData.department,
            credits: parseInt(formData.credits) || course.credits,
            semester: formData.semester,
            facultyId: formData.facultyId,
            capacity: parseInt(formData.capacity) || course.capacity,
            schedule: formData.schedule,
          }
        : course
    );

    setCourses(updatedCourses);
    setIsEditDialogOpen(false);
    setSelectedCourse(null);
    resetForm();
    toast.success('Course updated successfully!');
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(c => c.id !== courseId));
      toast.success('Course deleted successfully!');
    }
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      code: course.code,
      name: course.name,
      description: course.description,
      department: course.department,
      credits: String(course.credits),
      semester: course.semester,
      facultyId: course.facultyId,
      capacity: String(course.capacity),
      schedule: course.schedule,
    });
    setIsEditDialogOpen(true);
  };

  const getEnrollmentPercentage = (course: Course) => {
    return (course.enrolled / course.capacity) * 100;
  };

  const getCapacityColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getFacultyName = (facultyId: string) => {
    const faculty = mockFaculty.find(f => f.id === facultyId);
    return faculty ? `${faculty.firstName} ${faculty.lastName}` : 'N/A';
  };

  const CourseForm = ({ onSubmit, onCancel, isEdit = false }: { onSubmit: () => void; onCancel: () => void; isEdit?: boolean }) => (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="courseCode">Course Code *</Label>
            <Input 
              id="courseCode" 
              placeholder="CS101" 
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="courseName">Course Name *</Label>
            <Input 
              id="courseName" 
              placeholder="Introduction to Programming" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea 
            id="description" 
            placeholder="Course description..." 
            rows={3} 
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="department">Department *</Label>
            <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Social Studies">Social Studies</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="credits">Credits</Label>
            <Input 
              id="credits" 
              type="number" 
              placeholder="4" 
              value={formData.credits}
              onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Select value={formData.semester} onValueChange={(value) => setFormData({ ...formData, semester: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                <SelectItem value="Spring 2025">Spring 2025</SelectItem>
                <SelectItem value="Summer 2025">Summer 2025</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacity</Label>
            <Input 
              id="capacity" 
              type="number" 
              placeholder="30" 
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="faculty">Faculty</Label>
          <Select value={formData.facultyId} onValueChange={(value) => setFormData({ ...formData, facultyId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select faculty" />
            </SelectTrigger>
            <SelectContent>
              {mockFaculty.map(f => (
                <SelectItem key={f.id} value={f.id}>
                  {f.firstName} {f.lastName} - {f.department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="schedule">Schedule</Label>
          <Input 
            id="schedule" 
            placeholder="Mon, Wed, Fri 10:00 AM - 11:00 AM" 
            value={formData.schedule}
            onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onSubmit}>{isEdit ? 'Update' : 'Add'} Course</Button>
      </DialogFooter>
    </>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Course Management</h2>
          <p className="text-muted-foreground">
            Manage courses and curriculum
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Enter course details to add it to the curriculum
              </DialogDescription>
            </DialogHeader>
            <CourseForm 
              onSubmit={handleAddCourse} 
              onCancel={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
          setIsEditDialogOpen(open);
          if (!open) {
            setSelectedCourse(null);
            resetForm();
          }
        }}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Course</DialogTitle>
              <DialogDescription>
                Update course information
              </DialogDescription>
            </DialogHeader>
            <CourseForm 
              onSubmit={handleEditCourse} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedCourse(null);
                resetForm();
              }}
              isEdit
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by course name, code, or department..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Social Studies">Social Studies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const enrollmentPercentage = getEnrollmentPercentage(course);
          return (
            <Card key={course.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{course.name}</CardTitle>
                    <CardDescription>{course.code}</CardDescription>
                  </div>
                  <Badge>{course.department}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Enrollment</span>
                    <span className={getCapacityColor(enrollmentPercentage)}>
                      {course.enrolled}/{course.capacity}
                    </span>
                  </div>
                  <Progress value={enrollmentPercentage} />
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{course.credits} Credits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{getFacultyName(course.facultyId)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">{course.schedule}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => openEditDialog(course)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
