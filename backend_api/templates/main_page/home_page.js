{% verbatim %}
function HomePage() {
    const [activeFilter, setActiveFilter] = React.useState('all');
    const [internships, setInternships] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/internships/', {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setInternships(data);
                setLoading(false);
            });
    }, []);

    const toggleFavorite = (id) => {
        fetch(`/api/favorites/${id}/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            // Обновляем список стажировок
            setInternships(prev => 
                prev.map(item =>
                    item.id === id ? { ...item, is_favorite: data.status === 'added' } : item
                )
            );
        });
    };

    const filteredInternships = internships.filter(internship => {
        if (activeFilter === 'viewed') return internship.viewed;
        if (activeFilter === 'not-viewed') return !internship.viewed;
        if (activeFilter === 'favorites') return internship.is_favorite;
        return true;
    });

    return (
        <div className="main-container">
            <FilterPanel activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    Загрузка стажировок...
                </div>
            ) : (
                filteredInternships.map(internship => (
                    <InternshipCard 
                        key={internship.id} 
                        internship={internship} 
                        isFavorite={internship.is_favorite}
                        onToggleFavorite={() => toggleFavorite(internship.id)}
                    />
                ))
            )}
        </div>
    );
}
{% endverbatim %}