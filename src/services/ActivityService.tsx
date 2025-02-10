import { CANCEL_VOLUNTEER_ACTIVITY_REQUEST, CREATE_ACTIVITY, DELETE_ACTIVITY, GET_ACTIVITY_INFO, GET_ACTIVITY_INFO_WITH_VOLUNTEER_REQUEST_STATUS, GET_ALL_ACTIVITIES, JOIN_TO_ACTIVITY_REQUEST, UPDATE_ACTIVITY } from "../config/ApiRoutes";
import { Activity, ActivityInfo, ActivityRequest, VolunteerActivityRequestStatus } from "../types/Types";

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
        } else if (response.status == 404) {
            throw new Error("there is no request status for that activity");
        } else {
            return null;
        }
    } catch (err: any) {
        console.error(err);
        return null;
    }
};

export const createActivity = async (request: ActivityRequest) => {
    try {
        const response = await fetch(CREATE_ACTIVITY, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
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
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
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
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            }
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
            return response.status
        } else {
            throw new Error("Failed to remove your request");
        }
    } catch (err: any) {
        console.error(err);
        return null;
        
    }
}