import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { Chat } from '../src/components/organisms/Chat';
import { Layout } from '../src/components/template/Layout';

const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <Layout>
          <Chat />
        </Layout>
      )}
    </>
  );
};

export default Home;
