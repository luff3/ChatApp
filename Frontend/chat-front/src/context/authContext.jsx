import React, { createContext, useState, useContext } from 'react';

// Create a context with default value as null for the user
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the UserContext
export const useAuthContext = () => {
    return useContext(AuthContext);
};
