import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";


export const startActivity = (activityId) => {
   let body = {
      is_completed: false,
      activity: activityId
   }
   return axios.post(`${BASE_URL}/accounts/user-activities/`, body, getAuthHeaders())
};

export const getMyActivitiesProgress = () => {
   return axios.get(`${BASE_URL}/accounts/user-activities/progress/`, getAuthHeaders())
};

export const getMyActivities = () => {
   return axios.get(`${BASE_URL}/accounts/user-activities/`, getAuthHeaders())
};

export const getUserSubmissions = (activityId) => {
   return axios.get(`${BASE_URL}/accounts/user-activity-submissions/`,
      {
         params: {
            activity: activityId,
         },
         ...getAuthHeaders()

      })
};

export const uploadActivity = (body) => {
   return axios.post(`${BASE_URL}/accounts/user-activity-submissions/`, body, getAuthHeaders())
};

