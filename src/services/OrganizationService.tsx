import { OrganizationProfileData, OrganizationResponseDTO } from "../components/Types";
import { DELETE_ORGANIZATION_PROFILE, GET_ALL_ORGANIZATIONS, GET_INFO_ABOUT_ORGANIZATION, UPDATE_ORGANIZATION_PROFILE } from "../config/ApiRoutes";

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
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getOrganizationInfo = async (id: number): Promise<OrganizationProfileData | null> => {
  try {
    const response = await fetch(GET_INFO_ABOUT_ORGANIZATION + `?id=${id}`, {
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
  } catch (error) {
    console.error(error);
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
