import React, { useState } from 'react';
import ApiService from '../domains/api/ApiService';

const ApiForm = () => {
  const [apiName, setApiName] = useState('');
  const [apiDescription, setApiDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await ApiService.createApi({ name: apiName, description: apiDescription });
    setApiName('');
    setApiDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="apiName">API Name:</label>
        <input
          type="text"
          id="apiName"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="apiDescription">API Description:</label>
        <input
          type="text"
          id="apiDescription"
          value={apiDescription}
          onChange={(e) => setApiDescription(e.target.value)}
          required
        />
      </div>
      <button type="submit">Create API</button>
    </form>
  );
};

export default ApiForm;