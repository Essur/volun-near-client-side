import { Activity, ActivityInfo } from "../types/Types";
import { GET_ACTIVITY_INFO, GET_ALL_ACTIVITIES } from "../config/ApiRoutes";

export const getAllActivities = async (): Promise<Activity[]> => {
    try {
        const response = await fetch(GET_ALL_ACTIVITIES);
        if (response.status == 404) {
            throw new Error("There is no activities on our database!")
        }

        const data: Activity[] = await response.json();
        return data;         
    } catch (err: any){
        console.error(err);
        return [];
    }
};

export const getActivityInfo = async (id: number): Promise<ActivityInfo | null> => {
    try{
        const response = await fetch (GET_ACTIVITY_INFO + `?activityId=${id}`)
        if (response.status == 404){
            throw new Error("There is no activity with id " + id);
        }

        const data: ActivityInfo = await response.json();
        return data;
    } catch (err: any){
        console.error(err);
        return null;
    }
};