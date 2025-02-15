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

export interface ActivityInfo extends Activity {
    organizationId: number;
}

export interface VolunteerActivityRequestStatus {
    requestStatus: string;
}

export interface VolunteerInfo {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface VolunteerInActivityInfo extends VolunteerInfo{
    acceptedDate: string;
}

// Activity request info for volunteer
export interface VolunteerActivityRequestForVolunteer {
    requestId: number;
    activityId: number;
    activityName: string;
}

// Activity request info for organization
export interface VolunteerRequestForOrganization extends VolunteerActivityRequestForVolunteer {
    volunteerInfo: VolunteerInfo;
}

export interface VolunteerInputs {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

export interface OrganizationInputs {
    nameOfOrganization: string;
    country: string;
    city: string;
    address: string;
    email: string;
    username: string;
    password: string;
}


export interface ActivityRequest {
    city: string;
    country: string;
    dateOfPlace: string;
    description: string;
    title: string;
    kindOfActivity: string;
}