import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { fetchPrayerTimes, fetchWeeklyPrayerTimes, PrayerTime } from '@/services/prayerTimeService';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, MapPin, Clock, Bell } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import PrayerTimesCard from "@/components/dashboard/PrayerTimesCard";
import { useForm } from "react-hook-form";

// Predefined locations
const predefinedLocations = [
  { name: "Mecca", latitude: 21.3891, longitude: 39.8579 },
  { name: "Medina", latitude: 24.5247, longitude: 39.5692 },
  { name: "Jakarta", latitude: -6.1751, longitude: 106.8650 },
  { name: "Cairo", latitude: 30.0444, longitude: 31.2357 },
  { name: "Istanbul", latitude: 41.0082, longitude: 28.9784 },
  { name: "Kuala Lumpur", latitude: 3.1390, longitude: 101.6869 },
  { name: "Dubai", latitude: 25.2048, longitude: 55.2708 },
];

export default function PrayerTimes() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [weeklyTimes, setWeeklyTimes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [weeklyLoading, setWeeklyLoading] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("Mecca");
  const [alarms, setAlarms] = useState<{prayer: string, enabled: boolean}[]>([]);
  const [reminderMinutes, setReminderMinutes] = useState<number>(15);
  const [selectedPrayer, setSelectedPrayer] = useState<string>("");
  const { toast } = useToast();
  
  // Add form for the reminder dialog
  const reminderForm = useForm({
    defaultValues: {
      reminderTime: 15
    }
  });
  
  // Get current location coordinates
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          loadPrayerTimes(date, latitude, longitude);
          loadWeeklyTimes(latitude, longitude);
          setSelectedLocation("Current Location");
          toast({
            title: "Location Updated",
            description: "Prayer times updated based on your current location.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not get your current location. Using default location instead.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser. Using default location.",
        variant: "destructive",
      });
    }
  };
  
  const getLocationCoords = () => {
    const location = predefinedLocations.find((loc) => loc.name === selectedLocation);
    return {
      latitude: location ? location.latitude : 21.3891,
      longitude: location ? location.longitude : 39.8579,
    };
  };
  
  useEffect(() => {
    document.title = 'Prayer Times | Islamic School Academic System';
    // Initialize alarm states based on prayer times
    const initialAlarms = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map(prayer => ({
      prayer,
      enabled: false
    }));
    setAlarms(initialAlarms);
    
    loadPrayerTimes();
    loadWeeklyTimes();
  }, []);
  
  useEffect(() => {
    if (date) {
      const { latitude, longitude } = getLocationCoords();
      loadPrayerTimes(date, latitude, longitude);
    }
  }, [date, selectedLocation]);
  
  const loadPrayerTimes = async (selectedDate?: Date, lat?: number, lng?: number) => {
    setLoading(true);
    try {
      const { latitude, longitude } = lat && lng ? { latitude: lat, longitude: lng } : getLocationCoords();
      const data = await fetchPrayerTimes(selectedDate, latitude, longitude);
      setPrayerTimes(data.prayerTimes);
      setFormattedDate(data.date);
      setNextPrayer(data.nextPrayer);
    } catch (error) {
      console.error("Failed to load prayer times:", error);
      toast({
        title: "Error",
        description: "Failed to load prayer times. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const loadWeeklyTimes = async (lat?: number, lng?: number) => {
    setWeeklyLoading(true);
    try {
      const { latitude, longitude } = lat && lng ? { latitude: lat, longitude: lng } : getLocationCoords();
      const data = await fetchWeeklyPrayerTimes(latitude, longitude);
      setWeeklyTimes(data);
    } catch (error) {
      console.error("Failed to load weekly prayer times:", error);
      toast({
        title: "Error",
        description: "Failed to load weekly prayer times. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setWeeklyLoading(false);
    }
  };
  
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };
  
  const toggleAlarm = (prayer: string) => {
    setAlarms(prev => 
      prev.map(alarm => 
        alarm.prayer === prayer 
          ? { ...alarm, enabled: !alarm.enabled } 
          : alarm
      )
    );
    
    const isEnabled = !alarms.find(a => a.prayer === prayer)?.enabled;
    
    if (isEnabled) {
      toast({
        title: `${prayer} Alarm Enabled`,
        description: `You will be notified at ${prayer} prayer time.`,
      });
      
      // Register notifications if we're in a browser that supports it
      if ("Notification" in window) {
        Notification.requestPermission();
      }
    } else {
      toast({
        title: `${prayer} Alarm Disabled`,
        description: `You will no longer be notified at ${prayer} prayer time.`,
      });
    }
  };
  
  const setReminder = (prayer: string) => {
    setSelectedPrayer(prayer);
  };
  
  const handleReminderConfirm = () => {
    toast({
      title: "Reminder Set",
      description: `You will be reminded ${reminderMinutes} minutes before ${selectedPrayer}.`,
    });
    
    // In a real app, we would store this in localStorage or a database
    // For now, we'll just show a toast message
  };

  return (
    <Layout title="Prayer Times">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="material-card mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>Location</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={getCurrentLocation}
                  className="flex items-center gap-1"
                >
                  <MapPin className="h-4 w-4" />
                  <span className="hidden sm:inline">Use Current</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedLocation} onValueChange={handleLocationChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedLocations.map((location) => (
                    <SelectItem key={location.name} value={location.name}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Prayer times are calculated based on the selected location.</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="material-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid grid-cols-2 w-[300px]">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
            </TabsList>
            
            <TabsContent value="daily" className="mt-6">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Prayer Times for {formattedDate}</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center items-center h-40">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {prayerTimes.map((prayer) => (
                        <div 
                          key={prayer.name} 
                          className={`p-4 ${
                            nextPrayer === prayer.name 
                              ? 'bg-primary-100 border border-primary-300' 
                              : 'bg-primary-50'
                          } rounded-lg`}
                        >
                          <div className="flex flex-col">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                                  <span className="text-xs font-arabic text-primary-900">{prayer.arabicName}</span>
                                </div>
                                <h3 className="text-lg font-medium capitalize">{prayer.name}</h3>
                              </div>
                              <p className="text-xl font-bold">{prayer.time}</p>
                            </div>
                            
                            {nextPrayer === prayer.name && (
                              <span className="mb-2 text-xs px-2 py-1 bg-primary-200 rounded-full self-start">
                                Next Prayer
                              </span>
                            )}
                            
                            <div className="flex justify-between items-center mt-2">
                              <Button 
                                size="sm" 
                                variant={alarms.find(a => a.prayer === prayer.name)?.enabled ? "default" : "outline"}
                                className="flex items-center gap-1"
                                onClick={() => toggleAlarm(prayer.name)}
                              >
                                <Bell className="h-4 w-4" />
                                {alarms.find(a => a.prayer === prayer.name)?.enabled ? "Alarm On" : "Set Alarm"}
                              </Button>
                              
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="flex items-center gap-1"
                                    onClick={() => setReminder(prayer.name)}
                                  >
                                    <Clock className="h-4 w-4" />
                                    Reminder
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Set Reminder for {selectedPrayer}</DialogTitle>
                                    <DialogDescription>
                                      Set how many minutes before prayer time you want to be reminded.
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="py-4">
                                    <Form {...reminderForm}>
                                      <FormItem>
                                        <FormLabel>Minutes before prayer:</FormLabel>
                                        <FormControl>
                                          <div className="flex items-center gap-4">
                                            <Slider 
                                              value={[reminderMinutes]} 
                                              min={5}
                                              max={60}
                                              step={5}
                                              onValueChange={(values) => setReminderMinutes(values[0])}
                                              className="flex-1"
                                            />
                                            <span className="w-10 text-right">{reminderMinutes}</span>
                                          </div>
                                        </FormControl>
                                        <FormDescription>
                                          You will be reminded {reminderMinutes} minutes before prayer time.
                                        </FormDescription>
                                      </FormItem>
                                    </Form>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button type="submit" onClick={handleReminderConfirm}>
                                      Set Reminder
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-6">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Weekly Prayer Times</CardTitle>
                </CardHeader>
                <CardContent>
                  {weeklyLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 px-2 text-left">Day</th>
                            <th className="py-3 px-2 text-center">Fajr</th>
                            <th className="py-3 px-2 text-center">Sunrise</th>
                            <th className="py-3 px-2 text-center">Dhuhr</th>
                            <th className="py-3 px-2 text-center">Asr</th>
                            <th className="py-3 px-2 text-center">Maghrib</th>
                            <th className="py-3 px-2 text-center">Isha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {weeklyTimes.map((day) => (
                            <tr key={day.day} className="border-b">
                              <td className="py-3 px-2 font-medium">{day.day}</td>
                              <td className="py-3 px-2 text-center">{day.fajr}</td>
                              <td className="py-3 px-2 text-center">{day.sunrise}</td>
                              <td className="py-3 px-2 text-center">{day.dhuhr}</td>
                              <td className="py-3 px-2 text-center">{day.asr}</td>
                              <td className="py-3 px-2 text-center">{day.maghrib}</td>
                              <td className="py-3 px-2 text-center">{day.isha}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
