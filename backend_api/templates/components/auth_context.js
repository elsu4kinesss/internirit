{% verbatim %}
const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [showAuthModal, setShowAuthModal] = React.useState(false);
    const [authMode, setAuthMode] = React.useState('login');

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('/api/auth/users/me/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            .then(res => res.json())
            .then(profile => {
                setUser({
                    email: profile.email,
                    name: profile.name,
                    token: token
                });
            })
            .catch(err => {
                console.error("Ошибка при загрузке профиля:", err);
            });
        }
    }, []);

    const register = async (email, password, name) => {
        try {
            const res = await fetch('/api/auth/users/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            });
    
            if (res.ok) {
                await login(email, password);
            } else {
                const errorData = await res.json();
                alert("Ошибка регистрации: " + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error("Ошибка регистрации:", error);
        }
    };
    
    
    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/token/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
    
            const data = await res.json();
    
            if (res.ok && data.auth_token) {
                localStorage.setItem('token', data.auth_token);
                localStorage.setItem('email', email);
    
                const profileRes = await fetch('/api/auth/users/me/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${data.auth_token}`
                    }
                });
    
                const profile = await profileRes.json();
    
                setUser({ 
                    email: profile.email,
                    name: profile.name,
                    token: data.auth_token 
                });
    
                setShowAuthModal(false);
                window.location.reload();
                localStorage.removeItem('favorites');
            } else {
                alert("Ошибка входа: " + JSON.stringify(data));
            }
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };
       
    const logout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                await fetch('/api/auth/token/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                });
            } catch (error) {
                console.error("Ошибка выхода:", error);
            }
        }

        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('favorites');
        window.location.reload();
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