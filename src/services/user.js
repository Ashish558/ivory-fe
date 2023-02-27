import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";


export const startActivity = (activityId) => {
   let body = {
      is_completed: false,
      activity: activityId
   }
   return axios.post(`${BASE_URL}/activity/user-activities/`, body, getAuthHeaders())
};

export const completeActivity = (activityId) => {
   let body = {
      is_completed: true,
      // activity: activityId
   }
   return axios.patch(`${BASE_URL}/activity/user-activities/${activityId}/`, body, getAuthHeaders())
};
export const inCompleteActivity = (activityId) => {
   let body = {
      is_completed: false,
      // activity: activityId
   }
   return axios.patch(`${BASE_URL}/activity/user-activities/${activityId}/`, body, getAuthHeaders())
};

export const getMyActivitiesProgress = () => {
   return axios.get(`${BASE_URL}/activity/user-activities/progress/`, getAuthHeaders())
};

export const getMyActivities = () => {
   return axios.get(`${BASE_URL}/activity/user-activities/`, getAuthHeaders())
};

export const getUserSubmissions = (activityId) => {
   return axios.get(`${BASE_URL}/activity/user-activity-submissions/`,
      {
         params: {
            activity: activityId,
         },
         ...getAuthHeaders()

      })
};

export const uploadActivity = (body) => {
   return axios.post(`${BASE_URL}/activity/user-activity-submissions/`, body, getAuthHeaders())
};

export const deleteSubmission = (id) => {
   return axios.delete(`${BASE_URL}/activity/user-activity-submissions/${id}/`, getAuthHeaders())
};

export const getUserDetail = (phone) => {
   return axios.get(`${BASE_URL}/accounts/users/`, 
   {
      // params: {
      //    phone: phone,
      // },
      ...getAuthHeaders()

   })
};

export const editProfile = (body, mobile) => {
   return axios.patch(`${BASE_URL}/accounts/users/${mobile}/`, body, getAuthHeaders())
};

export const uploadProfile = (body, mobile) => {
   return axios.patch(`${BASE_URL}/accounts/users/${mobile}/`, body, getAuthHeaders())
};


