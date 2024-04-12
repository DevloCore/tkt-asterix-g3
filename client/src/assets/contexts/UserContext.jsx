import React, { createContext, useState } from 'react';

// Create a new context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Provide the user state to the children components
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };