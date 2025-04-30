{% verbatim %}
function HomePage() {
    const [activeFilter, setActiveFilter] = React.useState('all');
    const [internships, setInternships] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/internships/')
            .then(response => response.json())
            .then(data => {
                setInternships(data);
                setLoading(false);
            });
    }, []);
    

    const filteredInternships = internships.filter(internship => {
        if (activeFilter === 'viewed') return internship.viewed;
        if (activeFilter === 'not-viewed') return !internship.viewed;
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
                    <InternshipCard key={internship.id} internship={internship} />
                ))
            )}
        </div>
    );
}
{% endverbatim %}