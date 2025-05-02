{% verbatim %}
function HomePage() {
    const [activeFilter, setActiveFilter] = React.useState('all');
    const [internships, setInternships] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [favorites, setFavorites] = React.useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });

    React.useEffect(() => {
        fetch('/api/internships/')
            .then(response => response.json())
            .then(data => {
                setInternships(data);
                setLoading(false);
            });
    }, []);

    React.useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (id) => {
        setFavorites(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id) 
                : [...prev, id]
        );
    };

    const filteredInternships = internships.filter(internship => {
        if (activeFilter === 'viewed') return internship.viewed;
        if (activeFilter === 'not-viewed') return !internship.viewed;
        if (activeFilter === 'favorites') return favorites.includes(internship.id);
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
                        isFavorite={favorites.includes(internship.id)}
                        onToggleFavorite={() => toggleFavorite(internship.id)}
                    />
                ))
            )}
        </div>
    );
}
{% endverbatim %}
