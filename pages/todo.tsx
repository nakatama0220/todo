import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import type { NextPage } from 'next';
import { TodoList } from '../src/components/organisms/TodoList';
import { Layout } from '../src/components/template/Layout';

const Todo: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

  return (
    <>
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <Layout>
          <TodoList />
        </Layout>
      )}
    </>
  );
};

export default Todo;
