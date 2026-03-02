import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { School, Bell, Palette, Database, Globe, Shield } from 'lucide-react';
import { toast } from 'sonner';

export function Settings() {
  const [institutionName, setInstitutionName] = useState('Springfield Academy');
  const [contactEmail, setContactEmail] = useState('info@springfield.edu');
  const [contactPhone, setContactPhone] = useState('+1234567890');
  const [address, setAddress] = useState('123 Education St, City, State');
  const [website, setWebsite] = useState('www.springfield.edu');
  const [timezone, setTimezone] = useState('est');
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [attendanceAlerts, setAttendanceAlerts] = useState(true);
  const [feeReminders, setFeeReminders] = useState(true);
  const [examNotifications, setExamNotifications] = useState(true);
  
  const [theme, setTheme] = useState('light');
  const [primaryColor, setPrimaryColor] = useState('blue');
  const [fontSize, setFontSize] = useState('medium');
  
  const [academicYear, setAcademicYear] = useState('2024-2025');
  const [currentSemester, setCurrentSemester] = useState('fall');
  const [gradingSystem, setGradingSystem] = useState('letter');
  const [passingGrade, setPassingGrade] = useState('60');
  const [weightedGPA, setWeightedGPA] = useState(false);
  
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordRequirements, setPasswordRequirements] = useState(true);
  const [activityLogRetention, setActivityLogRetention] = useState('90');

  const saveGeneralSettings = () => {
    toast.success('General settings saved successfully!');
  };

  const saveNotificationPreferences = () => {
    toast.success('Notification preferences saved!');
  };

  const applyAppearanceChanges = () => {
    toast.success('Appearance changes applied!');
  };

  const saveAcademicConfiguration = () => {
    toast.success('Academic configuration saved!');
  };

  const updateSecuritySettings = () => {
    toast.success('Security settings updated!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Customize your ERP system preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <School className="h-5 w-5" />
                <CardTitle>Institution Information</CardTitle>
              </div>
              <CardDescription>
                Manage your institution's basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institutionName">Institution Name</Label>
                <Input 
                  id="institutionName" 
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input 
                    id="phone" 
                    value={contactPhone} 
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input 
                    id="website" 
                    value={website} 
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={timezone} onValueChange={setTimezone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={saveGeneralSettings}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch 
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Attendance Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get alerts for low attendance
                  </p>
                </div>
                <Switch 
                  checked={attendanceAlerts}
                  onCheckedChange={setAttendanceAlerts}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Fee Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Send reminders for pending fees
                  </p>
                </div>
                <Switch 
                  checked={feeReminders}
                  onCheckedChange={setFeeReminders}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Exam Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Notifications for upcoming exams
                  </p>
                </div>
                <Switch 
                  checked={examNotifications}
                  onCheckedChange={setExamNotifications}
                />
              </div>
              <Button onClick={saveNotificationPreferences}>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                <CardTitle>Appearance Settings</CardTitle>
              </div>
              <CardDescription>
                Customize the look and feel of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <div 
                    className={`h-10 w-10 rounded-md bg-blue-500 cursor-pointer ${primaryColor === 'blue' ? 'ring-2 ring-black' : 'border'}`}
                    onClick={() => setPrimaryColor('blue')}
                  />
                  <div 
                    className={`h-10 w-10 rounded-md bg-green-500 cursor-pointer ${primaryColor === 'green' ? 'ring-2 ring-black' : 'border'}`}
                    onClick={() => setPrimaryColor('green')}
                  />
                  <div 
                    className={`h-10 w-10 rounded-md bg-purple-500 cursor-pointer ${primaryColor === 'purple' ? 'ring-2 ring-black' : 'border'}`}
                    onClick={() => setPrimaryColor('purple')}
                  />
                  <div 
                    className={`h-10 w-10 rounded-md bg-orange-500 cursor-pointer ${primaryColor === 'orange' ? 'ring-2 ring-black' : 'border'}`}
                    onClick={() => setPrimaryColor('orange')}
                  />
                  <div 
                    className={`h-10 w-10 rounded-md bg-red-500 cursor-pointer ${primaryColor === 'red' ? 'ring-2 ring-black' : 'border'}`}
                    onClick={() => setPrimaryColor('red')}
                  />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Font Size</Label>
                <Select value={fontSize} onValueChange={setFontSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={applyAppearanceChanges}>Apply Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Settings */}
        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <CardTitle>Academic Configuration</CardTitle>
              </div>
              <CardDescription>
                Configure academic year and grading system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Current Academic Year</Label>
                  <Select value={academicYear} onValueChange={setAcademicYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentSemester">Current Semester</Label>
                  <Select value={currentSemester} onValueChange={setCurrentSemester}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fall">Fall 2024</SelectItem>
                      <SelectItem value="spring">Spring 2025</SelectItem>
                      <SelectItem value="summer">Summer 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gradingSystem">Grading System</Label>
                <Select value={gradingSystem} onValueChange={setGradingSystem}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="letter">Letter Grades (A, B, C, D, F)</SelectItem>
                    <SelectItem value="percentage">Percentage (0-100)</SelectItem>
                    <SelectItem value="gpa">GPA (0.0-4.0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="passingGrade">Minimum Passing Grade</Label>
                <Input 
                  id="passingGrade" 
                  value={passingGrade} 
                  type="number" 
                  onChange={(e) => setPassingGrade(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Weighted GPA</Label>
                  <p className="text-sm text-muted-foreground">
                    Calculate GPA with course weights
                  </p>
                </div>
                <Switch 
                  checked={weightedGPA}
                  onCheckedChange={setWeightedGPA}
                />
              </div>
              <Button onClick={saveAcademicConfiguration}>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Manage security and access control
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all users
                  </p>
                </div>
                <Switch 
                  checked={twoFactorAuth}
                  onCheckedChange={setTwoFactorAuth}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Auto logout after inactivity
                  </p>
                </div>
                <Select value={sessionTimeout} onValueChange={setSessionTimeout}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Password Requirements</Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce strong password policy
                  </p>
                </div>
                <Switch 
                  checked={passwordRequirements}
                  onCheckedChange={setPasswordRequirements}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Activity Log Retention</Label>
                <Select value={activityLogRetention} onValueChange={setActivityLogRetention}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={updateSecuritySettings}>Update Security Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <CardTitle>Third-Party Integrations</CardTitle>
              </div>
              <CardDescription>
                Connect with external services and tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Google Classroom</p>
                  <p className="text-sm text-muted-foreground">Sync courses and assignments</p>
                </div>
                <Button variant="outline" onClick={() => toast.info('Google Classroom integration coming soon!')}>Connect</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Zoom</p>
                  <p className="text-sm text-muted-foreground">Virtual classroom integration</p>
                </div>
                <Button variant="outline" onClick={() => toast.info('Zoom integration coming soon!')}>Connect</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Payment Gateway</p>
                  <p className="text-sm text-muted-foreground">Online fee payment processing</p>
                </div>
                <Button variant="outline" onClick={() => toast.info('Payment gateway configuration coming soon!')}>Configure</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">SMS Provider</p>
                  <p className="text-sm text-muted-foreground">Send SMS notifications</p>
                </div>
                <Button variant="outline" onClick={() => toast.info('SMS provider setup coming soon!')}>Setup</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}