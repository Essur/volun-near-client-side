import { GET_NOTIFICATION_SUBSCRIPTION_STATUS, SUBSCRIBE_TO_NOTIFICATIONS_BY_ID_OF_ORGANIZATION, UNSUBSCRIBE_FROM_NOTIFICATIONS_BY_ID_OF_ORGANIZATION } from "../config/ApiRoutes";

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
}

export const getNotificationSubscriptionStatus = async (organizationId: number) => {
    try {
        const response = await fetch(GET_NOTIFICATION_SUBSCRIPTION_STATUS + `?organizationId=${organizationId}`, {
            method: "GET",
            headers: HEADERS
        });
        if (response.ok || response.status === 404) {
            return response.status;
        } else {
            throw new Error("Failed to get your status");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}

export const subscribeToOrganizationNotification = async (organizationId: number) => {
    try {
        const response = await fetch(SUBSCRIBE_TO_NOTIFICATIONS_BY_ID_OF_ORGANIZATION + `?organizationId=${organizationId}`, {
            method: "POST",
            headers: HEADERS
        })
        if (response.ok) {
            return response.status;
        } else {
            throw new Error("Subscription failed");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}

export const unsubscribeFromOrganizationNotification = async (organizationId: number) => {
    try {
        const response = await fetch(UNSUBSCRIBE_FROM_NOTIFICATIONS_BY_ID_OF_ORGANIZATION + `?organizationId=${organizationId}`, {
            method: "DELETE",
            headers: HEADERS
        })
        if (response.ok) { 
            return response.status;
        } else {
            throw new Error("Unsubscription failed");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}