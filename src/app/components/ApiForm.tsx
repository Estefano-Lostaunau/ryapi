import React, { useState } from 'react';
import { ApiModal } from './ApiModal';

const ApiForm = () => {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create New API</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiName" className="block text-sm font-medium text-gray-700 mb-1">
            API Name:
          </label>
          <input
            type="text"
            id="apiName"
            value={apiName}
            onChange={(e) => setApiName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="apiDescription" className="block text-sm font-medium text-gray-700 mb-1">
            API Description:
          </label>
          <input
            type="text"
            id="apiDescription"
            value={apiDescription}
            onChange={(e) => setApiDescription(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200"
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