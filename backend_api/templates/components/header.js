{% verbatim %}
function Header() {
    const { theme, toggleTheme } = React.useContext(ThemeContext);
    const { user, setShowAuthModal, logout } = React.useContext(AuthContext);

    return (
        <header className="app-header">
            <img src="/static/logo2.png" alt="Стажирит" style={{ height: '50px', width: 'auto' }} />
            <nav className="nav-links">
                <a href="/main" className="nav-link">Стажировки</a>
                <a href="/main/articles" className="nav-link">Статьи</a>
                {user ? (
                    <>
                        <span className="nav-link">{user.name}</span>
                        <button 
                            className="nav-link" 
                            onClick={logout}
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            Выйти
                        </button>
                    </>
                ) : (
                    <button 
                        className="nav-link" 
                        onClick={() => setShowAuthModal(true)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        Войти
                    </button>
                )}
                <button 
                    className="nav-link" 
                    onClick={toggleTheme}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </nav>
        </header>
    );
}
{% endverbatim %}