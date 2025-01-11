import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../domains/api/ApiService';
import { Api } from '../domains/api/Api';

export const ApiDetails = () => {
    const [api, setApi] = useState<Api | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async () => {
            if (id) {
                const apiData = await ApiService.getApiById(id);
                setApi(apiData);
            }
        };
        fetchApi();
    }, [id]);

    if (!api) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                    <h1 className="text-3xl font-bold text-gray-800 ml-4">{api.name}</h1>
                </div>

                <p className="text-gray-600 mb-8">{api.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {api.tables.map((table, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-gray-800 text-white px-4 py-3">
                                <h3 className="text-lg font-semibold">{table.name}</h3>
                            </div>
                            <div className="p-4">
                                {table.attributes.map((attr, attrIndex) => (
                                    <div
                                        key={attrIndex}
                                        className="mb-2 p-2 bg-gray-50 rounded-md border border-gray-200"
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium text-gray-700">
                                                {attr.name}
                                                {attr.isRequired && <span className="text-red-500 ml-1">*</span>}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm text-gray-500">
                                                    {attr.type}
                                                    {attr.type === 'string' && attr.length ? ` (${attr.length})` : ''}
                                                </span>
                                                {attr.isPrimaryKey && (
                                                    <span className="px-2 py-1 text-xs bg-gray-800 text-white rounded-full">
                                                        PK
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};