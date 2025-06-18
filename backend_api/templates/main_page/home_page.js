{% verbatim %}
function HomePage() {
    const [activeFilter, setActiveFilter] = React.useState('all');
    const [internships, setInternships] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [favorites, setFavorites] = React.useState(() => {
        return JSON.parse(localStorage.getItem('favorites')) || [];
    });
    const [companyFilter, setCompanyFilter] = React.useState('');
    const authToken = localStorage.getItem('token');

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
            } catch (error) {
                console.error('Error fetching internships:', error);
            } finally {
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
        const matchesCompany = companyFilter
            ? internship.company.toLowerCase().includes(companyFilter.toLowerCase())
            : true;

        if (activeFilter === 'viewed') return internship.viewed && matchesCompany;
        if (activeFilter === 'not-viewed') return !internship.viewed && matchesCompany;
        if (activeFilter === 'favorites') return favorites.includes(internship.id) && matchesCompany;
        return matchesCompany;
    });

    return (
        <div className="main-container">
            <FilterPanel
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                onCompanyChange={setCompanyFilter}
            />

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    Загрузка стажировок...
                </div>
            ) : (
                filteredInternships.length > 0 ? (
                    filteredInternships.map(internship => (
                        <InternshipCard 
                            key={internship.id} 
                            internship={internship} 
                            isFavorite={favorites.includes(internship.id)}
                            onToggleFavorite={() => toggleFavorite(internship.id)}
                            onViewDetails={() => markAsViewed(internship.id)}
                        />
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                        Нет стажировок по вашему запросу
                    </div>
                )
            )}
        </div>
    );
}
{% endverbatim %}