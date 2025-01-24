import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { ApiModal } from './ApiModal';

const ApiForm = () => {
  const { user } = useUser();
  const [apiName, setApiName] = useState('');
  const [apiDescription, setApiDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setApiName('');
    setApiDescription('');
  };

  if (!user) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New API</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiName" className="block text-sm font-medium text-gray-700">
            API Name
          </label>
          <input
            type="text"
            id="apiName"
            value={apiName}
            onChange={(e) => setApiName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="apiDescription" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="apiDescription"
            value={apiDescription}
            onChange={(e) => setApiDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create API
        </button>
      </form>

      <ApiModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        apiName={apiName}
        apiDescription={apiDescription}
      />
    </div>
  );
};

export default ApiForm;