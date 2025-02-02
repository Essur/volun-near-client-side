const HOST = "http://localhost:8080"
const API_URL = HOST + "/api/v1";
const ORGANIZATION = API_URL + "/organization";
const VOLUNTEER = API_URL + "/volunteer";

/**
 * Users management
 */
export const LOGIN = API_URL + "/login";
export const REGISTER_ROUTE_SECURITY = API_URL + "/registration";
export const REGISTER_VOLUNTEER = API_URL + "/registration/volunteer";
export const REGISTER_ORGANIZATION = API_URL + "/registration/organization";
export const UPDATE_VOLUNTEER_PROFILE = API_URL + "/update/volunteer";
export const UPDATE_ORGANIZATION_PROFILE = API_URL + "/update/organization";
/**
 * Organization routes
 */
export const GET_ALL_ORGANIZATIONS = ORGANIZATION + "/get_all";
export const GET_ORGANIZATION_PROFILE = ORGANIZATION + "/my_profile";
export const DELETE_ORGANIZATION_PROFILE = ORGANIZATION + "/delete_profile";
export const GET_INFO_ABOUT_ORGANIZATION = ORGANIZATION + "/get_activities";

/**
 * Volunteers routes
 */
export const GET_VOLUNTEER_PROFILE = VOLUNTEER + "/my_profile";
export const JOIN_TO_ACTIVITY = VOLUNTEER + "/enter_to_activity";
export const DELETE_VOLUNTEER_PROFILE = VOLUNTEER + "/delete_profile";
export const DELETE_PREFERENCE_BY_ID = VOLUNTEER + "/delete_preference";
export const SET_VOLUNTEERS_PREFERENCES = VOLUNTEER + "/set_preferences";
export const LEAVE_FROM_ACTIVITY_BY_VOLUNTEER = VOLUNTEER + "/leave_activity";
export const GET_RECOMMENDATION_BY_PREFERENCES = VOLUNTEER + "/get_recommendations";