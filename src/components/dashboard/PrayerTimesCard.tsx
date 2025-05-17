
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface PrayerTime {
  name: string;
  time: string;
  arabicName: string;
}

interface PrayerTimesCardProps {
  date: string;
  prayerTimes: PrayerTime[];
  nextPrayer: string;
}

export default function PrayerTimesCard({ date, prayerTimes, nextPrayer }: PrayerTimesCardProps) {
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
                <span className="font-medium">{prayer.time}</span>
              </div>
              {index < prayerTimes.length - 1 && <Separator className="my-3" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
