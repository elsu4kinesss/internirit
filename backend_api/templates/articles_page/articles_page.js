{% verbatim %}
function ArticlesPage() {
    const [articles, setArticles] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/articles/')
            .then(res => res.json())
            .then(data => {
                // Add our static proforientation article as the second item
                const proforientationArticle = {
                    id: 'proforientation',
                    title: 'Тесты по профориентации в IT',
                    date: new Date().toISOString(),
                    excerpt: 'Пройдите тесты, чтобы понять какая стажировка вам подходит',
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
                };
                
                // Insert as second article
                const updatedArticles = [...data];
                updatedArticles.splice(1, 0, proforientationArticle);
                setArticles(updatedArticles);
            });
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
