{% verbatim %}
function FilterPanel({ activeFilter, setActiveFilter }) {
    const filters = [
        { id: 'all', label: 'Все' },
        { id: 'viewed', label: 'Просмотренные' },
        { id: 'not-viewed', label: 'Непросмотренные' },
        { id: 'favorites', label: 'Избранное' }
    ];

    return (
        <div className="filter-panel">
            {filters.map(filter => (
                <button
                    key={filter.id}
                    className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setActiveFilter(filter.id)}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}
{% endverbatim %}