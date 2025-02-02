import { DELETE_PREFERENCE_BY_ID, DELETE_VOLUNTEER_PROFILE, SET_VOLUNTEERS_PREFERENCES, UPDATE_VOLUNTEER_PROFILE } from "../config/ApiRoutes";

export const updateVolunteerProfile = async (formData: { firstName: string, lastName: string, email: string}) => {
    try {
        const response = await fetch(UPDATE_VOLUNTEER_PROFILE, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            console.log("Profile was successfully updated!")
        } else {
            alert("Failed to update profile.");
        }
    } catch (err) {
        console.error("Error updating volunteer profile:", err);
    }
};

export const removeVolunteerProfile = async () => {
    try {
        const response = await fetch(
            DELETE_VOLUNTEER_PROFILE,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                }
            }
        );

        if (response.ok) {
            console.log("Profile was successfully deleted!")
        }
    } catch (err) {
        console.error("Error removing preference:", err);
    }
};

export const addNewPreference = async (newPreference: string) => {
    try {
        const response = await fetch(
            SET_VOLUNTEERS_PREFERENCES,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify({ preferences: [newPreference] }),
            }
        );

        if (response.ok) {
            console.log("Preference added successfully.");
        } else {
            console.error("Failed to add preference.");
        }
    } catch (err) {
        console.error("Error adding preference:", err);
    }
};

export const removePreference = async (preferenceId: number ) => {
    try {
        const response = await fetch(
            DELETE_PREFERENCE_BY_ID,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify({ preferenceId }),
            }
        );

        if (response.ok) {
            console.log("Preference was successfully removed!")
        } else {
            console.error("Failed to remove preference.");
        }
    } catch (err) {
        console.error("Error removing preference:", err);
    }
};