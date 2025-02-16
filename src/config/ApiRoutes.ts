const HOST = "http://localhost:8080"
const API_URL = HOST + "/api/v1";
const VOLUNTEER = API_URL + "/volunteer";
const ORGANIZATION = API_URL + "/organization";

/**
 * Users management
 */
export const LOGIN = API_URL + "/login";
export const REFRESH_TOKEN = API_URL + "/refresh-token"
export const REGISTER_ROUTE_SECURITY = API_URL + "/registration";
export const REGISTER_VOLUNTEER = API_URL + "/registration/volunteer";
export const REGISTER_ORGANIZATION = API_URL + "/registration/organization";
export const UPDATE_VOLUNTEER_PROFILE = API_URL + "/update/volunteer";
export const UPDATE_ORGANIZATION_PROFILE = API_URL + "/update/organization";
/**
 * Organization routes
 */
export const GET_ORGANIZATION_ID = ORGANIZATION + "/my-id";
export const GET_ALL_ORGANIZATIONS = ORGANIZATION + "/get-all";
export const GET_ORGANIZATION_PROFILE = ORGANIZATION + "/my-profile";
export const DELETE_ORGANIZATION_PROFILE = ORGANIZATION + "/delete-profile";
export const GET_ACTIVITY_OF_CURRENT_ORGANIZATION = ORGANIZATION + "/get-activities";
export const GET_REQUESTS_FOR_ORGANIZATION = ORGANIZATION + "/my-requests";
export const APPROVE_REQUEST = ORGANIZATION + "/approve-volunteer";
export const KICK_VOLUNTEER_FROM_ACTIVITY = ORGANIZATION + "/kick-volunteer";

/**
 * Volunteers routes
*/
export const GET_VOLUNTEER_PROFILE = VOLUNTEER + "/my-profile";
export const JOIN_TO_ACTIVITY_REQUEST = VOLUNTEER + "/join-to-activity";
export const DELETE_VOLUNTEER_PROFILE = VOLUNTEER + "/delete_profile";
export const DELETE_PREFERENCE_BY_ID = VOLUNTEER + "/delete-preference";
export const SET_VOLUNTEERS_PREFERENCES = VOLUNTEER + "/set-preferences";
export const LEAVE_FROM_ACTIVITY_BY_VOLUNTEER = VOLUNTEER + "/leave-activity";
export const GET_RECOMMENDATION_BY_PREFERENCES = VOLUNTEER + "/get-recommendations";
export const GET_REQUESTS_FOR_VOLUNTEER = VOLUNTEER + "/my-requests";

/**
 * Activity routes
*/

export const GET_VOLUNTEERS_FROM_CURRENT_ACTIVITY = API_URL + "/activity/volunteers-list";

export const GET_ACTIVITY_INFO = API_URL + "/activity-info";
export const CREATE_ACTIVITY = ORGANIZATION + "/add-activity";
export const DELETE_ACTIVITY = ORGANIZATION + "/delete-activity";
export const UPDATE_ACTIVITY = ORGANIZATION + "/update-activity";
export const GET_ALL_ACTIVITIES = API_URL + "/get-all-activities";
export const GET_ACTIVITY_INFO_WITH_VOLUNTEER_REQUEST_STATUS = API_URL + "/activity-request-status";
export const CANCEL_VOLUNTEER_ACTIVITY_REQUEST = VOLUNTEER + "/delete-my-activity-request"

/**
 * Feedbacks routes
 */

const FEEDBACK = API_URL + "/feedback";
export const GET_FEEDBACKS_FROM_CURRENT_ORGANIZATION = FEEDBACK + "/feedbacks-of-organization";