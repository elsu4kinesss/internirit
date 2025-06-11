{% verbatim %}
function InternshipCard({ internship, isFavorite, onToggleFavorite, onViewDetails }) {
    const [viewed, setViewed] = React.useState(internship.viewed || false);
    const [favorite, setFavorite] = React.useState(isFavorite);
    React.useEffect(() => {
        setFavorite(isFavorite);
    }, [isFavorite]);

    const handleViewDetails = (e) => {
        e.preventDefault();
        setViewed(true);
        onViewDetails();
        window.open(internship.external_url, '_blank');
    };

    const handleToggleFavorite = async (e) => {
        e.stopPropagation();
        try {
            const response = await fetch(`/api/internships/${internship.id}/toggle_favorite/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });

            const data = await response.json();
            setFavorite((prev) => !prev);
        } catch (error) {
            console.error('Ошибка при изменении избранного:', error);
        }
    };

    return (
        <div
            className={`internship-card ${viewed ? 'internship-card-viewed' : ''}`}
            style={{
                transition: 'background-color 0.3s ease'
            }}
        >
            <div className="card-header">
                <div>
                    <h2 className="card-title">{internship.title}</h2>
                    <p className="card-company">{internship.company}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`card-status ${viewed ? 'status-viewed' : 'status-not-viewed'}`}>
                        {viewed ? 'Просмотрено' : 'Не просмотрено'}
                    </span>
                    <button 
                        onClick={handleToggleFavorite}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: favorite ? 'gold' : 'gray'
                        }}
                    >
                        {favorite ? '★' : '☆'}
                    </button>
                </div>
            </div>

            <p className="card-date">{formatDate(internship.date)}</p>
            <p className="card-description">{internship.description}</p>

            <div className="card-footer">
                <a
                    href={internship.external_url}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleViewDetails}
                >
                    Подробнее
                </a>
            </div>
        </div>
    );
}
{% endverbatim %}