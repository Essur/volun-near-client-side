import { GET_ACTIVITY_INFO_WITH_VOLUNTEER_REQUEST_STATUS, GET_REQUESTS_FOR_VOLUNTEER, JOIN_TO_ACTIVITY_REQUEST, CANCEL_VOLUNTEER_ACTIVITY_REQUEST, LEAVE_FROM_ACTIVITY_BY_VOLUNTEER, GET_REQUESTS_FOR_ORGANIZATION, APPROVE_REQUEST } from "../config/ApiRoutes";
import { VolunteerActivityRequestStatus, VolunteerActivityRequestForVolunteer, VolunteerRequestForOrganization } from "../types/Types";

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
}

export const getVolunteerActivityRequestStatus = async (id: number): Promise<VolunteerActivityRequestStatus | null> => {
    try {
        const response = await fetch(GET_ACTIVITY_INFO_WITH_VOLUNTEER_REQUEST_STATUS + `?activityId=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            }
        })
        if (response.status == 200) {
            const data: VolunteerActivityRequestStatus = await response.json();
            return data;
        } else {
            return null;
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export const getVolunteerActivityRequestList = async (): Promise<VolunteerActivityRequestForVolunteer[] | null> => {
    try {
        const response = await fetch(GET_REQUESTS_FOR_VOLUNTEER, {
            method: "GET",
            headers: HEADERS
        })
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("There is no pending requests");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
};


export const joinVolunteerActivityRequest = async (activityId: number) => {
    try {
        const response = await fetch(JOIN_TO_ACTIVITY_REQUEST + `?activityId=${activityId}`, {
            method: "POST",
            headers: HEADERS
        })
        if (response.ok) {
            console.log("Request was sended, wait for answer from organization");
            return response.status;
        } else if (response.status == 400) {
            throw new Error("Invalid user credentials, try re-login");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}

export const cancelVolunteerActivityRequest = async (activityId: number) => {
    try {
        const response = await fetch(CANCEL_VOLUNTEER_ACTIVITY_REQUEST + `?activityId=${activityId}`, {
            method: "DELETE",
            headers: HEADERS
        })
        if (response.ok) {
            return response.status;
        } else {
            throw new Error("Failed to remove your request");
        }
    } catch (err: any) {
        console.error(err);
        return null;

    }
}

export const leaveActivityByVolunteer = async (activityId: number) => {
    try {
        const response = await fetch(LEAVE_FROM_ACTIVITY_BY_VOLUNTEER + `?activityId=${activityId}`, {
            method: "DELETE",
            headers: HEADERS
        })
        if (response.ok) {
            return response.status;
        } else {
            throw new Error(`${response.json()}`);
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}

export const getRequestListForOrganization = async (): Promise<VolunteerRequestForOrganization[] | null> => {
    try {
        const response = await fetch(GET_REQUESTS_FOR_ORGANIZATION, {
            method: "GET",
            headers: HEADERS
        })
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("There is no requests for your organization");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}

export const approveActivityRequest = async (requestId: number) => {
    try {
        const response = await fetch(APPROVE_REQUEST + `?requestId=${requestId}`, {
            method: "POST",
            headers: HEADERS
        })
        if (response.status == 200) {
            return response.status;
        } else {
            throw new Error("Request was not approved");
        }
    } catch (err: any) {
        console.error(err);
        return null;

    }
}