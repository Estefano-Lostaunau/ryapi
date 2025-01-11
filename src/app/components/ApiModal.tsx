import { useState } from 'react';
import ApiService from '../domains/api/ApiService';
import { useApiContext } from '../contexts/ApiContext';

interface ApiModalProps {
    isOpen: boolean;
    onClose: () => void;
    apiName: string;
    apiDescription: string;
}

export const ApiModal = ({ isOpen, onClose, apiName, apiDescription }: ApiModalProps) => {
    const [tables, setTables] = useState<string[]>([]);
    const [newTable, setNewTable] = useState('');
    const { refreshApis } = useApiContext();

    const handleAddTable = () => {
        if (newTable.trim()) {
            setTables([...tables, newTable.trim()]);
            setNewTable('');
        }
    };

    const handleSaveApi = async () => {
        await ApiService.createApi({
            name: apiName,
            description: apiDescription,
            tables: tables
        });
        refreshApis();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-2xl font-semibold mb-4">Add Tables</h2>
                <div className="mb-4">
                    <p className="text-gray-600 mb-2">API Name: {apiName}</p>
                    <p className="text-gray-600 mb-4">Description: {apiDescription}</p>

                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            value={newTable}
                            onChange={(e) => setNewTable(e.target.value)}
                            placeholder="Table name"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                            onClick={handleAddTable}
                            className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        >
                            +
                        </button>
                    </div>

                    <div className="space-y-2">
                        {tables.map((table, index) => (
                            <div key={index} className="bg-gray-100 p-2 rounded">
                                {table}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveApi}
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                        Save API
                    </button>
                </div>
            </div>
        </div>
    );
};