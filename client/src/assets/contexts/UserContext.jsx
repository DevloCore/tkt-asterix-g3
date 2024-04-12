import React, { createContext, useState } from 'react';

// Create a new context
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
    var defaultUserValue = null;
    try {
        defaultUserValue = JSON.parse(localStorage.getItem('user'));
    }
    catch (e) { }
    
    const [user, setUser] = useState(defaultUserValue);

    // Provide the user state to the children components
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };