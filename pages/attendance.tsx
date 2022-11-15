import type { NextPage } from 'next';
import { Attendance as AttendancePage } from '../src/components/organisms/Attendance';
import { Layout } from '../src/components/template/Layout';

const Attendance: NextPage = () => {
  return (
    <Layout>
      <AttendancePage />
    </Layout>
  );
};

export default Attendance;
