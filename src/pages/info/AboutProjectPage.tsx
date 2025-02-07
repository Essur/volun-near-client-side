import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {FeatureItem, FeaturesList } from "../../styles/GlobalStyledComponents";
import { MdContainer } from "../../styles/GlobalStyledContainers";
import { fetchMarkdownContent } from "../../services/utils/FetchMdService";

const AboutProjectPage: React.FC = () => {
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        const loadContent = async () => {
            try {
                const markdown = await fetchMarkdownContent("/md/aboutProject.md");
                setContent(markdown);
            } catch (error) {
                console.error("Error fetching markdown:", error);
            }
        };

        loadContent();
    }, []);

    return (
        <MdContainer>
            <ReactMarkdown components={{ ul: FeaturesList, li: FeatureItem }}>{content}</ReactMarkdown>
        </MdContainer>
    );
};

export default AboutProjectPage;
