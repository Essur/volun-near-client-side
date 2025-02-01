import { OrganizationProfileData, OrganizationResponseDTO } from "../components/types";

export const getAllOrganizations = async (): Promise<OrganizationResponseDTO[]> => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/organization/get_all');
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
      const response = await fetch(`http://localhost:8080/api/v1/organization/get_activities?id=${id}`, {
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