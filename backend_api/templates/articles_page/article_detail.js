{% verbatim %}
function ArticleDetail({ id }) {
    const [article, setArticle] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        // Handle our static proforientation article
        if (id === 'proforientation') {
            setArticle({
                id: 'proforientation',
                title: 'Тесты по профориентации в IT',
                date: new Date().toISOString(),
                content: `
                    <p>Мы предлагаем вам пройти тесты по профориентации по ИТ специальностям. Они помогут точнее понять какая стажировка вам подойдет исходя из ваших качеств, желаний и предрасположенностей.</p>
                    <p>Выбирайте тест:</p>
                    <ul>
                        <li><a href="https://practicum.yandex.ru/promo/test/" target="_blank">Яндекс Практикум</a></li>
                        <li><a href="https://campus.epam.kz/ru/career-test/guidance" target="_blank">EPAM Campus</a></li>
                        <li><a href="https://www.profguide.io/test/who-are-you-it-professions.html" target="_blank">ProfGuide</a></li>
                        <li><a href="https://netology-code.github.io/who2be/" target="_blank">Netology</a></li>
                    </ul>
                `
            });
            setLoading(false);
            return;
        }

        fetch(`/api/articles/${id}/`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Статья не найдена');
                }
                return res.json();
            })
            .then((data) => {
                setArticle(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (error || !article) return <div>{error || 'Статья не найдена'}</div>;

    return (
        <div className="articles-page">
            <div className="article-detaile-card">
                <a href="/main/articles" className="back-link" style={{
                    marginBottom: '1rem',
                    display: 'inline-block',
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                    fontWeight: 500
                }}>
                    ← Назад к статьям
                </a>
        
                <h1 className="article-title" style={{ marginBottom: '1rem' }}>
                    {article.title}
                </h1>
        
                <div className="article-meta" style={{ marginBottom: '1.5rem' }}>
                    <span>{formatDate(article.date)}</span>
                </div>

                <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
        </div>
    );    
}
{% endverbatim %}
