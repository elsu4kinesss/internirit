{% verbatim %}
function AuthModal() {
    const { 
        showAuthModal, 
        setShowAuthModal, 
        login, 
        register, 
        authMode, 
        setAuthMode 
    } = React.useContext(AuthContext);
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (authMode === 'login') {
            login(email, password);
        } else {
            register(email, password, name);
        }
    };
    
    if (!showAuthModal) return null;
    
    return (
        <div className="auth-modal" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="auth-container">
                <button 
                    className="close-btn"
                    onClick={() => setShowAuthModal(false)}
                >
                    ×
                </button>
                <h2 className="auth-title">
                    {authMode === 'login' ? 'Вход' : 'Регистрация'}
                </h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Пароль</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {authMode === 'register' && (
                        <div className="form-group">
                            <label className="form-label">Имя</label>
                            <input
                                type="text"
                                className="form-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="auth-button">
                        {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                    </button>
                </form>
                <div className="auth-switch">
                    {authMode === 'login' ? (
                        <>
                            Нет аккаунта?{' '}
                            <button 
                                className="auth-switch-btn"
                                onClick={() => setAuthMode('register')}
                            >
                                Зарегистрироваться
                            </button>
                        </>
                    ) : (
                        <>
                            Уже есть аккаунт?{' '}
                            <button 
                                className="auth-switch-btn"
                                onClick={() => setAuthMode('login')}
                            >
                                Войти
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
{% endverbatim %}