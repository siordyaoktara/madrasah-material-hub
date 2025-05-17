
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";

export default function PrayerTimes() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  useEffect(() => {
    document.title = 'Prayer Times | Islamic School Academic System';
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return "";
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Mock prayer times for display
  const dayPrayerTimes = {
    fajr: '5:42 AM',
    sunrise: '7:03 AM',
    dhuhr: '12:15 PM',
    asr: '3:45 PM',
    maghrib: '6:22 PM',
    isha: '7:45 PM',
  };

  const weeklyTimes = [
    { day: 'Monday', fajr: '5:40 AM', dhuhr: '12:15 PM', asr: '3:45 PM', maghrib: '6:22 PM', isha: '7:45 PM' },
    { day: 'Tuesday', fajr: '5:41 AM', dhuhr: '12:15 PM', asr: '3:45 PM', maghrib: '6:23 PM', isha: '7:46 PM' },
    { day: 'Wednesday', fajr: '5:42 AM', dhuhr: '12:15 PM', asr: '3:46 PM', maghrib: '6:24 PM', isha: '7:47 PM' },
    { day: 'Thursday', fajr: '5:43 AM', dhuhr: '12:16 PM', asr: '3:46 PM', maghrib: '6:25 PM', isha: '7:48 PM' },
    { day: 'Friday', fajr: '5:44 AM', dhuhr: '12:16 PM', asr: '3:47 PM', maghrib: '6:26 PM', isha: '7:49 PM' },
    { day: 'Saturday', fajr: '5:45 AM', dhuhr: '12:16 PM', asr: '3:47 PM', maghrib: '6:27 PM', isha: '7:50 PM' },
    { day: 'Sunday', fajr: '5:46 AM', dhuhr: '12:17 PM', asr: '3:48 PM', maghrib: '6:28 PM', isha: '7:51 PM' },
  ];

  return (
    <Layout title="Prayer Times">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
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
                  <CardTitle>Prayer Times for {formatDate(date)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(dayPrayerTimes).map(([prayer, time]) => (
                      <div key={prayer} className="p-4 bg-primary-50 rounded-lg text-center">
                        <h3 className="text-lg font-medium capitalize">{prayer}</h3>
                        <p className="text-xl font-bold mt-2">{time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="weekly" className="mt-6">
              <Card className="material-card">
                <CardHeader>
                  <CardTitle>Weekly Prayer Times</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-2 text-left">Day</th>
                          <th className="py-3 px-2 text-center">Fajr</th>
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
                            <td className="py-3 px-2 text-center">{day.dhuhr}</td>
                            <td className="py-3 px-2 text-center">{day.asr}</td>
                            <td className="py-3 px-2 text-center">{day.maghrib}</td>
                            <td className="py-3 px-2 text-center">{day.isha}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
