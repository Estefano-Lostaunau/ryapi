import { useEffect, useState } from 'react';
import ApiService from '../domains/api/ApiService';
import { Api } from '../domains/api/Api';

const ApiList = () => {
  const [apis, setApis] = useState<Api[]>([]);

  useEffect(() => {
    const fetchApis = async () => {
      const apiList: Api[] = await ApiService.getApis();
      setApis(apiList);
    };
    fetchApis();
  }, []);

  return (
    <div>
      <h2>API List</h2>
      <ul>
        {apis.map((api) => (
          <li key={api.id}>{api.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ApiList;