
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";

interface CurriculumSubject {
  id: string;
  name: string;
  arabicName?: string;
  description: string;
  teacher: string;
  level: string;
}

interface CurriculumCardProps {
  subject: CurriculumSubject;
}

export default function CurriculumCard({ subject }: CurriculumCardProps) {
  return (
    <Card className="material-card h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span>{subject.name}</span>
            </CardTitle>
            {subject.arabicName && (
              <p className="text-sm text-muted-foreground font-arabic mt-1">
                {subject.arabicName}
              </p>
            )}
          </div>
          <div className="rounded-full px-3 py-1 bg-primary-50 text-primary-900 text-xs font-medium">
            {subject.level}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{subject.description}</p>
        <p className="mt-4 text-xs flex justify-between">
          <span className="text-muted-foreground">Teacher:</span>
          <span className="font-medium">{subject.teacher}</span>
        </p>
      </CardContent>
    </Card>
  );
}
