import React, { createContext, useState, useContext } from 'react';

interface ApiContextType {
    refreshApis: () => void;
    shouldRefresh: boolean;
}

const ApiContext = createContext<ApiContextType>({
    refreshApis: () => { },
    shouldRefresh: false,
});

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
    const [shouldRefresh, setShouldRefresh] = useState(false);

    const refreshApis = () => {
        setShouldRefresh(prev => !prev);
    };

    return (
        <ApiContext.Provider value={{ refreshApis, shouldRefresh }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApiContext = () => useContext(ApiContext);