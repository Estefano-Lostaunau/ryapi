import { useEffect, useState } from 'react';
import ApiService from '../domains/api/ApiService';
import { Api } from '../domains/api/Api';
import { useApiContext } from '../contexts/ApiContext';

const ApiList = () => {
  const [apis, setApis] = useState<Api[]>([]);
  const { shouldRefresh } = useApiContext();

  useEffect(() => {
    const fetchApis = async () => {
      const apiList = await ApiService.getApis();
      setApis(apiList);
    };
    fetchApis();
  }, [shouldRefresh]);

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
              className="py-4 hover:bg-gray-50 transition duration-150 px-4 rounded-md"
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