import { DELETE_FEEDBACK_ABOUT_ORGANIZATION, GET_FEEDBACKS_FROM_CURRENT_ORGANIZATION, POST_FEEDBACK_ABOUT_ORGANIZATION, UPDATE_FEEDBACK_FOR_CURRENT_ORGANIZATION } from "../config/ApiRoutes";
import { FeedbackInfo } from "../types/Types";

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
}

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
};

export const postFeedback = async (idOfOrganization: number, rate: number, feedbackDescription: string) => {
    try {
        const response = await fetch(POST_FEEDBACK_ABOUT_ORGANIZATION, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify({ idOfOrganization, rate, feedbackDescription })
        })
        if (response.ok) {
            return response.status;
        } else {
            throw new Error("Failed to post us feedback")
        }
    } catch (err: any) {
        console.log(err);
        return null;
    }
};

export const updateFeedback = async (idOfFeedback: number, idOfOrganization: number, feedbackDescription: string, rate: number) => {
    try {
        const response = await fetch(UPDATE_FEEDBACK_FOR_CURRENT_ORGANIZATION + `?idOfFeedback=${idOfFeedback}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify({idOfOrganization, feedbackDescription, rate })
        })
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to update yours feedback");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export const deleteFeedback = async (idOfFeedback: number) => {
    try {
        const response = await fetch(DELETE_FEEDBACK_ABOUT_ORGANIZATION + `?idOfFeedback=${idOfFeedback}`, {
            method: "DELETE",
            headers: HEADERS,
        })
        if (response.ok) {
            return response.status;
        } else {
            throw new Error("Failed to remove your feedback!");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
};