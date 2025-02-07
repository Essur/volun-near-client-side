import { CREATE_ACTIVITY, DELETE_ACTIVITY, GET_ACTIVITY_INFO, GET_ALL_ACTIVITIES, UPDATE_ACTIVITY } from "../config/ApiRoutes";
import { Activity, ActivityInfo, ActivityRequest } from "../types/Types";

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
        if (response.ok){
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