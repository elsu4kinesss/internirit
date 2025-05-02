{% verbatim %}
function InternshipCard({ internship, isFavorite, onToggleFavorite }) {
    const [viewed, setViewed] = React.useState(false);

    return (
        <div className="internship-card">
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
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite();
                        }}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: isFavorite ? 'gold' : 'gray'
                        }}
                    >
                        {isFavorite ? '★' : '☆'}
                    </button>
                </div>
            </div>
            
            <p className="card-date">{formatDate(internship.date)}</p>
            <p className="card-description">{internship.description}</p>
            
            <div className="card-footer">
                <a href="/main" className="card-link" onClick={() => setViewed(true)}>
                    Подробнее
                </a>
            </div>
        </div>
    );
}
{% endverbatim %}
