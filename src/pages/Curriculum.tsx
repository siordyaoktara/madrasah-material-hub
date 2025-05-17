
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import CurriculumCard from '@/components/curriculum/CurriculumCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const islamicSubjects = [
  {
    id: '1',
    name: 'Quranic Studies',
    arabicName: 'دراسات قرآنية',
    description: 'Memorization and understanding of the Holy Quran',
    teacher: 'Sheikh Ahmed Al-Makki',
    level: 'All Grades',
  },
  {
    id: '2',
    name: 'Islamic Jurisprudence',
    arabicName: 'الفقه الإسلامي',
    description: 'Study of Islamic law and legal framework',
    teacher: 'Sheikh Mohammed Al-Faisal',
    level: 'Grades 8-12',
  },
  {
    id: '3',
    name: 'Hadith Sciences',
    arabicName: 'علوم الحديث',
    description: 'Study of prophetic traditions and narrations',
    teacher: 'Sheikh Abdullah Al-Noor',
    level: 'Grades 10-12',
  },
];

const academicSubjects = [
  {
    id: '4',
    name: 'Mathematics',
    description: 'Algebra, geometry, and calculus',
    teacher: 'Mrs. Fatima Al-Zahrani',
    level: 'All Grades',
  },
  {
    id: '5',
    name: 'Science',
    description: 'Physics, chemistry, and biology',
    teacher: 'Mr. Khalid Rahman',
    level: 'All Grades',
  },
  {
    id: '6',
    name: 'Arabic Language',
    arabicName: 'اللغة العربية',
    description: 'Grammar, literature, and composition',
    teacher: 'Mrs. Layla Al-Qahtani',
    level: 'All Grades',
  },
  {
    id: '7',
    name: 'English Language',
    description: 'Grammar, literature, and composition',
    teacher: 'Mr. John Smith',
    level: 'All Grades',
  },
];

export default function Curriculum() {
  useEffect(() => {
    document.title = 'Curriculum | Islamic School Academic System';
  }, []);

  return (
    <Layout title="Curriculum">
      <div className="space-y-6">
        <Tabs defaultValue="islamic" className="w-full">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="islamic">Islamic Studies</TabsTrigger>
            <TabsTrigger value="academic">Academic Subjects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="islamic" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {islamicSubjects.map((subject) => (
                <CurriculumCard key={subject.id} subject={subject} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {academicSubjects.map((subject) => (
                <CurriculumCard key={subject.id} subject={subject} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
