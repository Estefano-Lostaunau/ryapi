import { useState } from 'react';
import ApiService from '../domains/api/ApiService';
import { useApiContext } from '../contexts/ApiContext';
import { Table, Attribute } from '../domains/api/Api';

interface ApiModalProps {
    isOpen: boolean;
    onClose: () => void;
    apiName: string;
    apiDescription: string;
}

export const ApiModal = ({ isOpen, onClose, apiName, apiDescription }: ApiModalProps) => {
    const [tables, setTables] = useState<Table[]>([]);
    const [newTable, setNewTable] = useState('');
    const [selectedTable, setSelectedTable] = useState<number | null>(null);
    const [editingTableIndex, setEditingTableIndex] = useState<number | null>(null);
    const [editingAttributeIndex, setEditingAttributeIndex] = useState<number | null>(null);
    const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(null);

    const [newAttribute, setNewAttribute] = useState<Attribute>({
        name: '',
        type: 'string',
        isPrimaryKey: false,
        isRequired: true
    });
    const { refreshApis } = useApiContext();

    const dataTypes = ['string', 'number', 'boolean', 'date', 'uuid'];

    const handleAddTable = () => {
        if (newTable.trim()) {
            setTables([...tables, { name: newTable.trim(), attributes: [] }]);
            setNewTable('');
        }
    };

    const handleAddAttribute = (tableIndex: number) => {
        if (newAttribute.name.trim()) {
            const updatedTables = [...tables];
            updatedTables[tableIndex].attributes.push({ ...newAttribute });
            setTables(updatedTables);
            setNewAttribute({
                name: '',
                type: 'string',
                isPrimaryKey: false,
                isRequired: true
            });
        }
    };
    const handleEditTableName = (tableIndex: number, newName: string) => {
        const updatedTables = [...tables];
        updatedTables[tableIndex].name = newName;
        setTables(updatedTables);
    };

    const handleEditAttribute = (tableIndex: number, attrIndex: number) => {
        setEditingAttributeIndex(attrIndex);
        setEditingAttribute({ ...tables[tableIndex].attributes[attrIndex] });
    };

    const handleUpdateAttribute = (tableIndex: number, attrIndex: number) => {
        if (editingAttribute) {
            const updatedTables = [...tables];
            updatedTables[tableIndex].attributes[attrIndex] = editingAttribute;
            setTables(updatedTables);
            setEditingAttributeIndex(null);
            setEditingAttribute(null);
        }
    };

    const handleDeleteAttribute = (tableIndex: number, attrIndex: number) => {
        const updatedTables = [...tables];
        updatedTables[tableIndex].attributes.splice(attrIndex, 1);
        setTables(updatedTables);
    };


    const handleSaveApi = async () => {
        await ApiService.createApi({
            name: apiName,
            description: apiDescription,
            tables: tables
        });
        refreshApis();
        // Reset modal state
        setTables([]);
        setNewTable('');
        setSelectedTable(null);
        setNewAttribute({
            name: '',
            type: 'string',
            isPrimaryKey: false,
            isRequired: true,
            length: undefined
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[800px] max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-4">Add Tables and Attributes</h2>
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
                            Add Table
                        </button>
                    </div>

                    <div className="space-y-4">
                        {tables.map((table, tableIndex) => (
                            <div key={tableIndex} className="border rounded-lg p-4">
                                <div className="flex justify-between items-center mb-2">
                                    {editingTableIndex === tableIndex ? (
                                        <input
                                            type="text"
                                            value={table.name}
                                            onChange={(e) => handleEditTableName(tableIndex, e.target.value)}
                                            onBlur={() => setEditingTableIndex(null)}
                                            className="text-lg font-semibold px-2 py-1 border rounded"
                                            autoFocus
                                        />
                                    ) : (
                                        <h3 className="text-lg font-semibold cursor-pointer" onClick={() => setEditingTableIndex(tableIndex)}>
                                            {table.name}
                                        </h3>
                                    )}
                                    <button
                                        onClick={() => setSelectedTable(selectedTable === tableIndex ? null : tableIndex)}
                                        className="text-gray-600 hover:text-gray-800"
                                    >
                                        {selectedTable === tableIndex ? 'Close' : 'Add Attributes'}
                                    </button>
                                </div>

                                {selectedTable === tableIndex && (
                                    <div className="mt-4 space-y-4">
                                        <div className="grid grid-cols-6 gap-2">
                                            <input
                                                type="text"
                                                value={newAttribute.name}
                                                onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                                                placeholder="Attribute name"
                                                className="px-3 py-2 border border-gray-300 rounded-md"
                                            />
                                            <select
                                                value={newAttribute.type}
                                                onChange={(e) => setNewAttribute({ ...newAttribute, type: e.target.value })}
                                                className="px-3 py-2 border border-gray-300 rounded-md"
                                            >
                                                {dataTypes.map(type => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                            {newAttribute.type === 'string' && (
                                                <input
                                                    type="number"
                                                    value={newAttribute.length || ''}
                                                    onChange={(e) => setNewAttribute({
                                                        ...newAttribute,
                                                        length: e.target.value ? parseInt(e.target.value) : undefined
                                                    })}
                                                    placeholder="Length"
                                                    className="px-3 py-2 border border-gray-300 rounded-md"
                                                />
                                            )}
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={newAttribute.isPrimaryKey}
                                                    onChange={(e) => setNewAttribute({ ...newAttribute, isPrimaryKey: e.target.checked })}
                                                    id={`pk-${tableIndex}`}
                                                />
                                                <label htmlFor={`pk-${tableIndex}`}>PK</label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={newAttribute.isRequired}
                                                    onChange={(e) => setNewAttribute({ ...newAttribute, isRequired: e.target.checked })}
                                                    id={`required-${tableIndex}`}
                                                />
                                                <label htmlFor={`required-${tableIndex}`}>Required</label>
                                            </div>
                                            <button
                                                onClick={() => handleAddAttribute(tableIndex)}
                                                className="bg-neutral-800 text-white px-4 py-2 rounded-md hover:bg-neutral-600"
                                            >
                                                Add
                                            </button>
                                        </div>

                                        <div className="mt-2">
                                            {table.attributes.map((attr, attrIndex) => (
                                                <div key={attrIndex} className="bg-gray-50 p-2 rounded mb-1 flex justify-between items-center">
                                                    {editingAttributeIndex === attrIndex ? (
                                                        <div className="grid grid-cols-6 gap-2 w-full">
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
                                                            {editingAttribute?.type === 'string' && (
                                                                <input
                                                                    type="number"
                                                                    value={editingAttribute.length || ''}
                                                                    onChange={(e) => setEditingAttribute({
                                                                        ...editingAttribute,
                                                                        length: e.target.value ? parseInt(e.target.value) : undefined
                                                                    })}
                                                                    className="px-2 py-1 border rounded"
                                                                />
                                                            )}
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={editingAttribute?.isPrimaryKey}
                                                                    onChange={(e) => setEditingAttribute({
                                                                        ...editingAttribute!,
                                                                        isPrimaryKey: e.target.checked
                                                                    })}
                                                                />
                                                                <label>PK</label>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={editingAttribute?.isRequired}
                                                                    onChange={(e) => setEditingAttribute({
                                                                        ...editingAttribute!,
                                                                        isRequired: e.target.checked
                                                                    })}
                                                                />
                                                                <label>Required</label>
                                                            </div>
                                                            <button
                                                                onClick={() => handleUpdateAttribute(tableIndex, attrIndex)}
                                                                className="bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700"
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span>{attr.name}</span>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-gray-500">
                                                                    {attr.type}
                                                                    {attr.type === 'string' && attr.length ? ` (${attr.length})` : ''}
                                                                    {attr.isPrimaryKey ? ' (PK)' : ''}
                                                                    {attr.isRequired ? ' *' : ''}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleEditAttribute(tableIndex, attrIndex)}
                                                                    className="text-gray-600 hover:text-gray-800"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteAttribute(tableIndex, attrIndex)}
                                                                    className="text-gray-600 hover:text-gray-800"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
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