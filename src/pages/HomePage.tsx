import { fetchMarkdownContent } from "@/shared/lib/fetchMarkdownContent";
import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

export const HomePage = () => {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const markdown = await fetchMarkdownContent("/md/homePage.md");
        setContent(markdown);
      } catch (error) {
        console.error("Error fetching markdown: ", error);
      }
    }
    loadContent();
  }, []);

  return (
    <>
      <ReactMarkdown>{content}</ReactMarkdown>
    </>
  )
}