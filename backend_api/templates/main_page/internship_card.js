{% verbatim %}
function InternshipCard({ internship, token }) {
    const [viewed, setViewed] = React.useState(internship.viewed);

    const handleView = async () => {
        try {
            await fetch('/api/internships/mark_viewed/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({ internship: internship.id })
            });
            setViewed(true);
        } catch (err) {
            console.error("Ошибка при отметке как просмотрено", err);
        }
    };

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
                <a
                    href={internship.external_url}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleView}
                >
                    Подробнее
                </a>
            </div>
        </div>
    );
}
{% endverbatim %}