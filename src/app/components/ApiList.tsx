import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import ApiService from '../services/ApiService';
import { Api } from '../models/Api';

const ApiList = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [apis, setApis] = useState<Api[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApis = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      setLoading(true); 
      const apiList = await ApiService.getApis(user.id);
      setApis(apiList);
      setError(null);
    } catch (err) {
      setError('Failed to fetch APIs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApis();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-500 text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">API List</h2>
      {apis.length === 0 ? (
        <p className="text-gray-500 text-center">No APIs available</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {apis.map((api) => (
            <li
              key={api.id}
              onClick={() => navigate(`/api-details/${api.id}`)}
              className="py-4 hover:bg-gray-50 transition duration-150 px-4 rounded-md cursor-pointer"
            >
              <span className="text-lg font-medium text-gray-800">{api.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApiList;