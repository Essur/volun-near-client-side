import { CREATE_ACTIVITY, DELETE_ACTIVITY, GET_ACTIVITY_INFO, GET_ALL_ACTIVITIES, GET_MY_ACTIVITIES_FOR_ORGANIZATION, GET_VOLUNTEERS_FROM_CURRENT_ACTIVITY, KICK_VOLUNTEER_FROM_ACTIVITY, UPDATE_ACTIVITY } from "../config/ApiRoutes";
import { Activity, ActivityInfo, ActivityRequest, VolunteerInActivityInfo } from "../types/Types";

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
}

export const getAllActivities = async (): Promise<Activity[]> => {
    try {
        const response = await fetch(GET_ALL_ACTIVITIES);
        if (response.status == 404) {
            throw new Error("There is no activities on our database!")
        }

        const data: Activity[] = await response.json();
        return data;
    } catch (err: any) {
        console.error(err);
        return [];
    }
};

export const getActivityInfo = async (id: number): Promise<ActivityInfo | null> => {
    try {
        const response = await fetch(GET_ACTIVITY_INFO + `?activityId=${id}`)
        if (response.status == 404) {
            throw new Error("There is no activity with id " + id);
        }

        const data: ActivityInfo = await response.json();
        return data;
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export const createActivity = async (request: ActivityRequest) => {
    try {
        const response = await fetch(CREATE_ACTIVITY, {
            method: "POST",
            headers: HEADERS,
            body: JSON.stringify(request)
        })
        if (response.ok) {
            console.log("Activity was created with id " + response.body);
            return response.status;
        } else {
            throw new Error(`${response}`);
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export const updateActivityInfo = async (request: ActivityRequest, id: number) => {
    try {
        const response = await fetch(UPDATE_ACTIVITY + `?idOfActivity=${id}`, {
            method: "PUT",
            headers: HEADERS,
            body: JSON.stringify(request)
        })
        if (response.ok) {
            console.log("Activity was successfully updated!");
            return response.status;
        } else {
            throw new Error("Failed to update info about actviity!");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}

export const deleteActivity = async (id: number) => {
    try {
        const response = await fetch(DELETE_ACTIVITY + `?id=${id}`, {
            method: "DELETE",
            headers: HEADERS
        })
        if (response.ok) {
            console.log("Activity with id " + id + " was removed");
            return response.status;
        } else if (response.status == 404) {
            throw new Error("Fail, acitvity with id " + id + " not found");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export const getVolunteersForActivty = async (id: number): Promise<VolunteerInActivityInfo[] | null> => {
    try {
        const response = await fetch(GET_VOLUNTEERS_FROM_CURRENT_ACTIVITY + `?activityId=${id}`, {
            method: "GET",
            headers: HEADERS
        })
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("No volunteers in activity with id: " + id);
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export const kickVolunteerFromActivity = async (username: string, activityId: number): Promise<Number | null> => {
    try {
        const response = await fetch(KICK_VOLUNTEER_FROM_ACTIVITY + `?volunteerUsername=${username}&` + `activityId=${activityId}`, {
            method: "DELETE",
            headers: HEADERS
        })
        if (response.ok) {
            return response.status;
        } else {
            throw new Error("Fail! Volunteer was not kicked from activity!");
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
}

export const fetchMyActivitiesForOrganization = async (): Promise<Activity[]> => {
    try {
        const response = await fetch(GET_MY_ACTIVITIES_FOR_ORGANIZATION, {
            method: "GET",
            headers: HEADERS
        })
        if (response.ok) {
            return response.json();
        } else if (response.status === 404) {
            throw new Error("There is no activities in your profile")
        } else {
            throw new Error("Failed to fetch your activities, try re-login");
        }
    } catch (err: any) {
        console.error(err);
        return [];
    }
}