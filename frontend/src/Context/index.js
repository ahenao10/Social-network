import { createContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: () => { },
    logout: () => { },
});

function AuthProvider({ children }) {

    const URLAPI = 'http://127.0.0.1:5000/';

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    
    const [openAuthLoginModal, setOpenAuthLoginModal] = useState(false);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            URLAPI,
            isAuthenticated,
            user,
            openAuthLoginModal,
            setOpenAuthLoginModal,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };