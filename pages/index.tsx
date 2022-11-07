import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { Top } from '../src/components/organisms/Top';
import { Layout } from '../src/components/template/Layout';

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  console.log(supabase);
  console.log(session);

  return (
    <>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <Layout>
          <Top />
        </Layout>
      )}
    </>
  );
};

export default Home;
