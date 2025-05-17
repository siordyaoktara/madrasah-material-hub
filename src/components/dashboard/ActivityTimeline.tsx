
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  time: string;
  category: 'academic' | 'admission' | 'attendance' | 'exam';
}

interface ActivityTimelineProps {
  items: TimelineItem[];
}

export default function ActivityTimeline({ items }: ActivityTimelineProps) {
  const getCategoryColor = (category: TimelineItem['category']) => {
    switch (category) {
      case 'academic':
        return 'bg-primary-200';
      case 'admission':
        return 'bg-secondary-200';
      case 'attendance':
        return 'bg-accent-200';
      case 'exam':
        return 'bg-red-200';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <Card className="material-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className={`h-3 w-3 rounded-full ${getCategoryColor(item.category)}`} />
                <div className="h-full w-px bg-border" />
              </div>
              <div className="flex flex-col gap-0.5 pb-6">
                <span className="text-sm font-medium">{item.title}</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
