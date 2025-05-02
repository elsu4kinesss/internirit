{% verbatim %}
function InternshipCard({ internship }) {
    const [viewed, setViewed] = React.useState(false);

    return (
        <div className="internship-card">
            <div className="card-header">
                <div>
                    <h2 className="card-title">{internship.title}</h2>
                    <p className="card-company">{internship.company}</p>
                </div>
                <span className={`card-status ${viewed ? 'status-viewed' : 'status-not-viewed'}`}>
                    {viewed ? 'Просмотрено' : 'Не просмотрено'}
                </span>
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