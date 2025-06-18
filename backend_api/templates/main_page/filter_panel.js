{% verbatim %}
function FilterPanel({ activeFilter, setActiveFilter, onCompanyChange }) {
    const filters = [
        { id: 'all', label: 'Все' },
        { id: 'viewed', label: 'Просмотренные' },
        { id: 'not-viewed', label: 'Непросмотренные' },
        { id: 'favorites', label: 'Избранное' }
    ];

    return (
        <div className="filter-panel" style={{ marginBottom: '1.5rem' }}>
            {/* Кнопки фильтров */}
            <div style={{
                display: 'flex',
                gap: '0.8rem',
                flexWrap: 'wrap'
            }}>
                {filters.map(filter => (
                    <button
                        key={filter.id}
                        className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                        onClick={() => setActiveFilter(filter.id)}
                    >
                        {filter.label}
                    </button>
                ))}

                <div className="filter-btn" style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.3rem',
                    background: 'var(--bg-color)',
                    color: 'var(--text-color)',
                    width: 'auto',
                    maxWidth: '110px',
                    boxSizing: 'border-box',
                    margin: 0,
                    display: 'inline-block'
                }}>
                    <input
                        type="text"
                        placeholder="Компания"
                        onChange={(e) => onCompanyChange(e.target.value)}
                        style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            color: 'inherit',
                            fontSize: '0.85rem',
                            fontWeight: 'inherit',
                            padding: '6px 0',
                            lineHeight: '1', 
                            margin: 0
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
{% endverbatim %}