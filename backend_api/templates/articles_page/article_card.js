{% verbatim %}
function ArticleCard({ article }) {
    return (
        <div className="article-card">
            <h3 className="article-title">{article.title}</h3>
            <div className="article-meta">
                <span>{formatDate(article.date)}</span>
            </div>
            <p className="article-excerpt">{article.excerpt}</p>
            <a href={`#/` + article.id} className="read-more">Читать далее</a>
        </div>
    );
}
{% endverbatim %}