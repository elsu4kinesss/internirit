{% verbatim %}
function ArticlesPage() {
    const [articles, setArticles] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/articles/')
            .then(res => res.json())
            .then(data => setArticles(data));
    }, []);


    return (
        <div className="articles-page">
            <h1 style={{ fontSize: '2rem', color: 'white', marginBottom: '1.5rem' }}>
                Полезные статьи
            </h1>
            <div className="articles-grid">
                {articles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
}
{% endverbatim %}