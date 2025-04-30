{% verbatim %}
function Router({ HomePage, ArticlesPage, ArticleDetail }) {
    const [route, setRoute] = React.useState(window.location.hash || '//main/');

    React.useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    switch (route) {
        case '//main/':
            return <HomePage />;
        case '//main/articles':
            return <ArticlesPage />;
        default:
            if (route.startsWith('//main/articles/')) {
                const id = route.split('/')[2];
                return <ArticleDetail id={id} />;
            }
            return <HomePage />;
    }
}
{% endverbatim %}