export const fetchMarkdownContent = async (url: string): Promise<string> => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Failed to fetch markdown");
        }
        const markdown = await response.text();
        return markdown;
    } catch (error) {
        console.error("Error loading markdown file:", error);
        throw error;
    }
};