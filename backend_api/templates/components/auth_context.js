{% verbatim %}
const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [showAuthModal, setShowAuthModal] = React.useState(false);
    const [authMode, setAuthMode] = React.useState('login');

    const login = (email, password) => {
        setUser({ email, name: "Пользователь" });
        setShowAuthModal(false);
    };

    const register = (email, password, name) => {
        setUser({ email, name });
        setShowAuthModal(false);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            register, 
            logout, 
            showAuthModal, 
            setShowAuthModal,
            authMode,
            setAuthMode
        }}>
            {children}
        </AuthContext.Provider>
    );
}
{% endverbatim %}