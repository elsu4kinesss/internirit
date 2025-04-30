{% verbatim %}
function ArticleCard({ article }) {
    return (
        <div className="article-card">
            <h3 className="article-title">{article.title}</h3>
            <div className="article-meta">
                <span>{article.category}</span>
                <span>{article.date}</span>
            </div>
            <p className="article-excerpt">{article.excerpt}</p>
            <a href={`/main/articles/${article.id}`} className="read-more">Читать далее</a>
        </div>
    );
}
{% endverbatim %}