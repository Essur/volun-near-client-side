import { GET_FEEDBACKS_FROM_CURRENT_ORGANIZATION } from "../config/ApiRoutes";
import { FeedbackInfo } from "../types/Types";

export const getFeedbackList = async (organizationId: number): Promise<FeedbackInfo[] | null> => {
    try {
        const response = await fetch(GET_FEEDBACKS_FROM_CURRENT_ORGANIZATION + `?organizationId=${organizationId}`);
        if (response.ok) {
            return response.json();
        } else if (response.status === 404) {
            throw new Error("No feedbacks for that organization!");
        } else {
            throw new Error("Failed to fetch feedbacks for organization with id " + organizationId);
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}