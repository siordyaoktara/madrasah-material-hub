
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import PrayerTimesCard from '@/components/dashboard/PrayerTimesCard';
import { Users, Book, Calendar, User } from 'lucide-react';

const recentActivities = [
  {
    id: 1,
    title: 'New Student Enrolled',
    description: 'Ahmad Ibrahim was enrolled in Grade 7',
    time: 'Today, 10:30 AM',
    category: 'admission' as const,
  },
  {
    id: 2,
    title: 'Exam Results Published',
    description: 'Quranic Studies - Term 1 results are available',
    time: 'Today, 9:15 AM',
    category: 'exam' as const,
  },
  {
    id: 3,
    title: 'Teacher Meeting',
    description: 'Weekly staff meeting in the conference room',
    time: 'Yesterday, 2:00 PM',
    category: 'academic' as const,
  },
  {
    id: 4,
    title: 'Attendance Report',
    description: 'Grade 5 attendance below average this week',
    time: 'Yesterday, 9:30 AM',
    category: 'attendance' as const,
  },
];

const prayerTimes = [
  {
    name: 'Fajr',
    time: '5:42 AM',
    arabicName: 'الفجر',
  },
  {
    name: 'Dhuhr',
    time: '12:15 PM',
    arabicName: 'الظهر',
  },
  {
    name: 'Asr',
    time: '3:45 PM',
    arabicName: 'العصر',
  },
  {
    name: 'Maghrib',
    time: '6:22 PM',
    arabicName: 'المغرب',
  },
  {
    name: 'Isha',
    time: '7:45 PM',
    arabicName: 'العشاء',
  },
];

export default function Index() {
  useEffect(() => {
    document.title = 'Dashboard | Islamic School Academic System';
  }, []);

  return (
    <Layout title="Dashboard">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Students"
            value="345"
            icon={<Users className="h-4 w-4 text-primary-800" />}
            trend={{ value: 12, isPositive: true }}
          />
          
          <StatCard
            title="Total Teachers"
            value="24"
            icon={<User className="h-4 w-4 text-primary-800" />}
            trend={{ value: 5, isPositive: true }}
          />
          
          <StatCard
            title="Courses"
            value="18"
            icon={<Book className="h-4 w-4 text-primary-800" />}
          />
          
          <StatCard
            title="Attendance Rate"
            value="94%"
            icon={<Calendar className="h-4 w-4 text-primary-800" />}
            trend={{ value: 2, isPositive: false }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ActivityTimeline items={recentActivities} />
          </div>
          <div>
            <PrayerTimesCard 
              date="May 17, 2025"
              prayerTimes={prayerTimes}
              nextPrayer="Asr"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
