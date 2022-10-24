import type { NextPage } from 'next';
import { Top } from '../src/components/organisms/Top';
import { Layout } from '../src/components/template/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Top />
    </Layout>
  );
};

export default Home;
