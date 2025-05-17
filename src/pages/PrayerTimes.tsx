
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { fetchPrayerTimes, fetchWeeklyPrayerTimes, PrayerTime } from '@/services/prayerTimeService';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export default function PrayerTimes() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const [weeklyTimes, setWeeklyTimes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [weeklyLoading, setWeeklyLoading] = useState<boolean>(false);
  const { toast } = useToast();
  
  // Latitude and longitude (default to Mecca)
  const latitude = 21.3891;
  const longitude = 39.8579;
  
  useEffect(() => {
    document.title = 'Prayer Times | Islamic School Academic System';
    loadPrayerTimes();
    loadWeeklyTimes();
  }, []);
  
  useEffect(() => {
    if (date) {
      loadPrayerTimes(date);
    }
  }, [date]);
  
  const loadPrayerTimes = async (selectedDate?: Date) => {
    setLoading(true);
    try {
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
  
  const loadWeeklyTimes = async () => {
    setWeeklyLoading(true);
    try {
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
                  <CardTitle>Prayer Times for {formattedDate}</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="flex justify-center items-center h-40">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {prayerTimes.map((prayer) => (
                        <div 
                          key={prayer.name} 
                          className={`p-4 ${
                            nextPrayer === prayer.name 
                              ? 'bg-primary-100 border border-primary-300' 
                              : 'bg-primary-50'
                          } rounded-lg text-center`}
                        >
                          <div className="flex flex-col items-center">
                            <h3 className="text-lg font-medium capitalize">{prayer.name}</h3>
                            {prayer.arabicName && (
                              <p className="text-sm text-muted-foreground font-arabic">{prayer.arabicName}</p>
                            )}
                            <p className="text-xl font-bold mt-2">{prayer.time}</p>
                            {nextPrayer === prayer.name && (
                              <span className="mt-2 text-xs px-2 py-1 bg-primary-200 rounded-full">
                                Next Prayer
                              </span>
                            )}
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
