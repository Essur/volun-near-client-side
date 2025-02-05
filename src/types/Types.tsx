export interface Activity {
    id: number;
    city: string;
    country: string;
    dateOfPlace: string;
    description: string;
    title: string;
    kindOfActivity: string;
}

export interface OrganizationResponseDTO {
    id: number;
    nameOfOrganization: string;
    country: string;
    city: string;
    address: string;
    email: string;
}

export interface OrganizationProfileData {
    organizationResponseDTO: OrganizationResponseDTO;
    activities: Activity[];
}

export interface ActivityInfo extends Activity{
    organizationId: number;
}