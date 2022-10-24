import type { NextPage } from 'next';
import { TodoList } from '../src/components/organisms/TodoList';
import { Layout } from '../src/components/template/Layout';

const Todo: NextPage = () => {
  return (
    <Layout>
      <TodoList />
    </Layout>
  );
};

export default Todo;
