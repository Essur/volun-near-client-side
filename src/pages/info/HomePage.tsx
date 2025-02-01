import { useEffect, useState } from "react";
import { fetchMarkdownContent } from "../../services/utils/FetchMdService";
import { MdContainer } from "../../styles/StyledContainers";
import ReactMarkdown from "react-markdown";

const Home: React.FC = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const loadContent = async () => {
            try {
                const markdown = await fetchMarkdownContent("/md/homePage.md");
                setContent(markdown);
            } catch (error) {
                console.error("Error fetching markdown:", error);
            }
        };

        loadContent();
    }, []);

    return (
        <MdContainer>
            <ReactMarkdown>{content}</ReactMarkdown>
        </MdContainer>
    );
};

export default Home;