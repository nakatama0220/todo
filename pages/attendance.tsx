import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import type { NextPage } from 'next';
import { Attendance as AttendancePage } from '../src/components/organisms/Attendance';
import { Layout } from '../src/components/template/Layout';

const Attendance: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <Layout>
          <AttendancePage />
        </Layout>
      )}
    </>
  );
};

export default Attendance;
