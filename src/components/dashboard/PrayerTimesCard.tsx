
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { PrayerTime } from "@/services/prayerTimeService";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PrayerTimesCardProps {
  date: string;
  prayerTimes: PrayerTime[];
  nextPrayer: string;
}

export default function PrayerTimesCard({ date, prayerTimes, nextPrayer }: PrayerTimesCardProps) {
  const [alarms, setAlarms] = useState<{prayer: string, enabled: boolean}[]>(
    prayerTimes.map(prayer => ({ prayer: prayer.name, enabled: false }))
  );
  const { toast } = useToast();

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

  return (
    <Card className="material-card">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Prayer Times</span>
          <span className="text-sm font-normal text-muted-foreground">{date}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prayerTimes.map((prayer, index) => (
            <div key={prayer.name}>
              <div className={`flex justify-between items-center ${nextPrayer === prayer.name ? 'bg-primary-50 p-2 rounded' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-xs font-arabic text-primary-900">{prayer.arabicName}</span>
                  </div>
                  <span className="text-sm font-medium">{prayer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{prayer.time}</span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-7 w-7 p-0" 
                    onClick={() => toggleAlarm(prayer.name)}
                  >
                    <Bell className={`h-4 w-4 ${alarms.find(a => a.prayer === prayer.name)?.enabled ? 'text-primary' : 'text-muted-foreground'}`} />
                  </Button>
                </div>
              </div>
              {index < prayerTimes.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
