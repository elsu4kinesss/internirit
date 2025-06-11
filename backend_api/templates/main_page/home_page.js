{% verbatim %}
function HomePage() {
    const [activeFilter, setActiveFilter] = React.useState('all');
    const [internships, setInternships] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [favorites, setFavorites] = React.useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });
    const authToken = localStorage.getItem('auth_token');

    React.useEffect(() => {
        const fetchInternships = async () => {
            try {
                const response = await fetch('/api/internships/', {
                    headers: authToken ? {
                        'Authorization': `Token ${authToken}`
                    } : {}
                });
                const data = await response.json();
                setInternships(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching internships:', error);
                setLoading(false);
            }
        };

        fetchInternships();
    }, [authToken]);

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

    const markAsViewed = async (id) => {
        if (!authToken) return;
        
        try {
            const response = await fetch(`/api/internships/${id}/mark_as_viewed/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                setInternships(prev => prev.map(item => 
                    item.id === id ? {...item, viewed: true} : item
                ));
            }
        } catch (error) {
            console.error('Error marking as viewed:', error);
        }
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
                        onViewDetails={() => markAsViewed(internship.id)}
                    />
                ))
            )}
        </div>
    );
}
{% endverbatim %}