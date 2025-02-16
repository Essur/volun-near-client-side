import { DELETE_ORGANIZATION_PROFILE, GET_ACTIVITY_OF_CURRENT_ORGANIZATION, GET_ALL_ORGANIZATIONS, UPDATE_ORGANIZATION_PROFILE } from "../config/ApiRoutes";
import { OrganizationProfileData, OrganizationResponseDTO } from "../types/Types";

export const updateOrganizationProfile = async (formData: { nameOfOrganization: string, country: string, city: string, address: string, email: string }) => {
  try {
    const response = await fetch(UPDATE_ORGANIZATION_PROFILE,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log("Profile was successfully updated!")
    } else {
      alert("Failed to update organization profile.");
    }
  } catch (err) {
    console.error("Error updating organization profile:", err);
  }
};

export const getAllOrganizations = async (): Promise<OrganizationResponseDTO[]> => {
  try {
    const response = await fetch(GET_ALL_ORGANIZATIONS);
    if (!response.ok) {
      throw new Error('Failed to fetch organizations');
    }
    const data: OrganizationResponseDTO[] = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getOrganizationInfo = async (id: number): Promise<OrganizationProfileData | null> => {
  try {
    const response = await fetch(GET_ACTIVITY_OF_CURRENT_ORGANIZATION + `?organizationId=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch organization data');
    }
    const data: OrganizationProfileData = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const removeOrganizationProfile = async () => {
  try {
    const response = await fetch(
      DELETE_ORGANIZATION_PROFILE,
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
