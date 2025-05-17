
import { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import StudentTable from '@/components/students/StudentTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const studentsData = [
  {
    id: '1',
    name: 'Ahmad Ibrahim',
    grade: '7-A',
    guardian: 'Khalid Ibrahim',
    contactNumber: '+966 50 123 4567',
    status: 'active' as const,
  },
  {
    id: '2',
    name: 'Fatima Al-Zahrani',
    grade: '9-B',
    guardian: 'Mohammed Al-Zahrani',
    contactNumber: '+966 55 987 6543',
    status: 'active' as const,
  },
  {
    id: '3',
    name: 'Omar Qasim',
    grade: '8-C',
    guardian: 'Abdul Qasim',
    contactNumber: '+966 54 456 7890',
    status: 'inactive' as const,
  },
  {
    id: '4',
    name: 'Aisha Abdullah',
    grade: '10-A',
    guardian: 'Tariq Abdullah',
    contactNumber: '+966 50 222 3333',
    status: 'active' as const,
  },
  {
    id: '5',
    name: 'Yusuf Al-Harbi',
    grade: '7-B',
    guardian: 'Faisal Al-Harbi',
    contactNumber: '+966 55 444 5555',
    status: 'suspended' as const,
  },
];

export default function Students() {
  useEffect(() => {
    document.title = 'Students | Islamic School Academic System';
  }, []);

  return (
    <Layout title="Students Management">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-sm">
            <Input placeholder="Search students..." className="h-10" />
          </div>
          <Button className="material-button material-button-primary">
            <Plus className="h-4 w-4 mr-2" /> Add Student
          </Button>
        </div>

        <div>
          <StudentTable students={studentsData} />
        </div>
      </div>
    </Layout>
  );
}
