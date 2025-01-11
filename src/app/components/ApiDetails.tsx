import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../domains/api/ApiService';
import { dataTypes } from '../domains/api/Api';
import { Api, Attribute, Table } from '../domains/api/Api';
import { useApiContext } from '../contexts/ApiContext';

export const ApiDetails = () => {
    const [api, setApi] = useState<Api | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedApi, setEditedApi] = useState<Api | null>(null);
    const [editingAttributeIndex, setEditingAttributeIndex] = useState<number | null>(null);
    const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);

    const [newTableName, setNewTableName] = useState('');
    const [selectedTableIndex, setSelectedTableIndex] = useState<number | null>(null);
    const [newAttribute, setNewAttribute] = useState<Attribute>({
        name: '',
        type: 'string',
        isPrimaryKey: false,
        isRequired: true
    });

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { refreshApis } = useApiContext();

    useEffect(() => {
        const fetchApi = async () => {
            if (id) {
                const apiData = await ApiService.getApiById(id);
                setApi(apiData);
                setEditedApi(apiData);
            }
        };
        fetchApi();
    }, [id]);

    const handleSave = async () => {
        if (id && editedApi) {
            await ApiService.updateApi(id, {
                name: editedApi.name,
                description: editedApi.description,
                tables: editedApi.tables
            });
            setApi(editedApi);
            setIsEditing(false);
            refreshApis();
        }
    };

    const handleAddTable = () => {
        if (!editedApi || !newTableName.trim()) return;

        const newTable: Table = {
            name: newTableName,
            attributes: []
        };

        setEditedApi({
            ...editedApi,
            tables: [...editedApi.tables, newTable]
        });
        setNewTableName('');
    };

    const handleDeleteTable = (index: number) => {
        if (!editedApi) return;
        const newTables = [...editedApi.tables];
        newTables.splice(index, 1);
        setEditedApi({ ...editedApi, tables: newTables });
    };

    const handleAddAttribute = (tableIndex: number) => {
        if (!editedApi || !newAttribute.name.trim()) return;
        const updatedTables = [...editedApi.tables];
        updatedTables[tableIndex].attributes.push({ ...newAttribute });
        setEditedApi({ ...editedApi, tables: updatedTables });
        setNewAttribute({
            name: '',
            type: 'string',
            isPrimaryKey: false,
            isRequired: true
        });
        setSelectedTableIndex(null);
    };

    const handleDeleteAttribute = (tableIndex: number, attrIndex: number) => {
        if (!editedApi) return;
        const updatedTables = [...editedApi.tables];
        updatedTables[tableIndex].attributes.splice(attrIndex, 1);
        setEditedApi({ ...editedApi, tables: updatedTables });
    };

    const updateTableName = (index: number, newName: string) => {
        if (!editedApi) return;
        const newTables = [...editedApi.tables];
        newTables[index] = { ...newTables[index], name: newName };
        setEditedApi({ ...editedApi, tables: newTables });
    };

    const updateAttribute = (tableIndex: number, attrIndex: number, updatedAttr: Attribute) => {
        if (!editedApi) return;
        const newTables = [...editedApi.tables];
        newTables[tableIndex].attributes[attrIndex] = updatedAttr;
        setEditedApi({ ...editedApi, tables: newTables });
    };
    const handleEditAttribute = (tableIndex: number, attrIndex: number) => {
        setEditingAttributeIndex(attrIndex);
        setEditingAttribute({ ...editedApi!.tables[tableIndex].attributes[attrIndex] });
    };

    if (!api || !editedApi) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="min-h-screen py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        {isEditing ? (
                            <input
                                type="text"
                                value={editedApi.name}
                                onChange={(e) => setEditedApi({ ...editedApi, name: e.target.value })}
                                className="text-3xl font-bold text-gray-800 ml-4 px-2 border rounded"
                            />
                        ) : (
                            <h1 className="text-3xl font-bold text-gray-800 ml-4">{api.name}</h1>
                        )}
                    </div>
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                                    Save
                                </button>
                                <button onClick={() => {
                                    setIsEditing(false);
                                    setEditedApi(api);
                                    setNewTableName('');
                                    setSelectedTableIndex(null);
                                    setEditingAttributeIndex(null);
                                    setEditingAttribute(null);
                                    setNewAttribute({
                                        name: '',
                                        type: 'string',
                                        isPrimaryKey: false,
                                        isRequired: true
                                    });
                                }} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <input
                        type="text"
                        value={editedApi.description}
                        onChange={(e) => setEditedApi({ ...editedApi, description: e.target.value })}
                        className="w-full px-3 py-2 mb-8 border rounded text-gray-600"
                    />
                ) : (
                    <p className="text-gray-600 mb-8">{api.description}</p>
                )}

                {isEditing && (
                    <div className="mb-6">
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newTableName}
                                onChange={(e) => setNewTableName(e.target.value)}
                                placeholder="New table name"
                                className="flex-1 px-3 py-2 border rounded"
                            />
                            <button
                                onClick={handleAddTable}
                                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                            >
                                Add Table
                            </button>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {editedApi.tables.map((table, tableIndex) => (
                        <div key={tableIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
                                {isEditing ? (
                                    <div className="flex items-center gap-2 w-full">
                                        <input
                                            type="text"
                                            value={table.name}
                                            onChange={(e) => updateTableName(tableIndex, e.target.value)}
                                            className="flex-1 bg-gray-700 text-white px-2 py-1 rounded"
                                        />
                                        <button
                                            onClick={() => handleDeleteTable(tableIndex)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ) : (
                                    <h3 className="text-lg font-semibold">{table.name}</h3>
                                )}
                            </div>

                            <div className="p-4">
                                {table.attributes.map((attr, attrIndex) => (
                                    <div key={attrIndex} className="mb-2 p-2 bg-gray-50 rounded-md border border-gray-200">
                                        {editingAttributeIndex === attrIndex ? (
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    value={editingAttribute?.name}
                                                    onChange={(e) => setEditingAttribute({
                                                        ...editingAttribute!,
                                                        name: e.target.value
                                                    })}
                                                    className="px-2 py-1 border rounded"
                                                />
                                                <select
                                                    value={editingAttribute?.type}
                                                    onChange={(e) => setEditingAttribute({
                                                        ...editingAttribute!,
                                                        type: e.target.value
                                                    })}
                                                    className="px-2 py-1 border rounded"
                                                >
                                                    {dataTypes.map(type => (
                                                        <option key={type} value={type}>{type}</option>
                                                    ))}
                                                </select>
                                                <div className="col-span-2 flex gap-4">
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={editingAttribute?.isPrimaryKey}
                                                            onChange={(e) => setEditingAttribute({
                                                                ...editingAttribute!,
                                                                isPrimaryKey: e.target.checked
                                                            })}
                                                        />
                                                        Primary Key
                                                    </label>
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={editingAttribute?.isRequired}
                                                            onChange={(e) => setEditingAttribute({
                                                                ...editingAttribute!,
                                                                isRequired: e.target.checked
                                                            })}
                                                        />
                                                        Required
                                                    </label>
                                                </div>
                                                <div className="col-span-2 flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            if (editingAttribute) {
                                                                updateAttribute(tableIndex, attrIndex, editingAttribute);
                                                                setEditingAttributeIndex(null);
                                                                setEditingAttribute(null);
                                                            }
                                                        }}
                                                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingAttributeIndex(null);
                                                            setEditingAttribute(null);
                                                        }}
                                                        className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
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
                                                    {isEditing && (
                                                        <>
                                                            <button
                                                                onClick={() => handleEditAttribute(tableIndex, attrIndex)}
                                                                className="text-gray-600 hover:text-gray-800"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteAttribute(tableIndex, attrIndex)}
                                                                className="text-red-500 hover:text-red-700"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {isEditing && (
                                    <div>
                                        {selectedTableIndex === tableIndex ? (
                                            <div className="mt-4">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input
                                                        type="text"
                                                        value={newAttribute.name}
                                                        onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                                                        placeholder="Attribute name"
                                                        className="px-2 py-1 border rounded"
                                                    />
                                                    <select
                                                        value={newAttribute.type}
                                                        onChange={(e) => setNewAttribute({ ...newAttribute, type: e.target.value })}
                                                        className="px-2 py-1 border rounded"
                                                    >
                                                        {dataTypes.map(type => (
                                                            <option key={type} value={type}>{type}</option>
                                                        ))}
                                                    </select>
                                                    <div className="col-span-2 flex gap-4">
                                                        <label className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={newAttribute.isPrimaryKey}
                                                                onChange={(e) => setNewAttribute({
                                                                    ...newAttribute,
                                                                    isPrimaryKey: e.target.checked
                                                                })}
                                                            />
                                                            Primary Key
                                                        </label>
                                                        <label className="flex items-center gap-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={newAttribute.isRequired}
                                                                onChange={(e) => setNewAttribute({
                                                                    ...newAttribute,
                                                                    isRequired: e.target.checked
                                                                })}
                                                            />
                                                            Required
                                                        </label>
                                                    </div>
                                                    <button
                                                        onClick={() => handleAddAttribute(tableIndex)}
                                                        className="col-span-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                                                    >
                                                        Add Attribute
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setSelectedTableIndex(tableIndex)}
                                                className="w-full mt-2 px-4 py-2 text-gray-600 border border-dashed rounded hover:bg-gray-50"
                                            >
                                                + Add Attribute
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};