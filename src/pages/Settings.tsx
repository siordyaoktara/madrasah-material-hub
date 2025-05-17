
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Settings() {
  useEffect(() => {
    document.title = 'Settings | Islamic School Academic System';
  }, []);

  return (
    <Layout title="Settings">
      <div className="space-y-6">
        <Card className="material-card">
          <CardHeader>
            <CardTitle>School Information</CardTitle>
            <CardDescription>
              Manage your school's basic information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input id="schoolName" defaultValue="Al-Noor Islamic School" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="principalName">Principal Name</Label>
                  <Input id="principalName" defaultValue="Dr. Abdullah Al-Faisal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="info@alnoorschool.edu" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input id="phoneNumber" defaultValue="+966 12 345 6789" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Islamic Education St., Riyadh, Saudi Arabia" />
              </div>
              <Button className="material-button material-button-primary">Save Changes</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="material-card">
          <CardHeader>
            <CardTitle>System Settings</CardTitle>
            <CardDescription>
              Configure system notifications and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive email notifications for important events</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Prayer Time Alerts</h4>
                  <p className="text-sm text-muted-foreground">Enable prayer time notifications within the system</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automatic Grade Calculation</h4>
                  <p className="text-sm text-muted-foreground">Enable automatic grade calculation based on exams and assignments</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
