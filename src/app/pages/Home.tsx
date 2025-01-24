import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import ApiForm from '../components/ApiForm';
import ApiList from '../components/ApiList';

const Home = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">API Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ApiForm />
        <ApiList />
      </div>
    </div>
  );
};

export default Home;