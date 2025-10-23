import { useParams } from "react-router-dom";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
    const { id } = useParams();
    const article = articles.find(article => article.name === id);

    if (!article) {
        return <NotFoundPage />;
    }

    return (
        <>
        <h1>{article.title}</h1>
        {article.content.map((paragraph, i) => (
            <p key={i}> {paragraph}</p>
        ))}
        </>
    )
}

export default ArticlePage;