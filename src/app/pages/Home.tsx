import ApiForm from '../components/ApiForm';
import ApiList from '../components/ApiList';
import { ApiProvider } from '../contexts/ApiContext';

const Home = () => {
  return (
    <ApiProvider>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">API Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ApiForm />
          <ApiList />
        </div>
      </div>
    </ApiProvider>
  );
};

export default Home;