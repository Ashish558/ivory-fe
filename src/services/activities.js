import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";

export const getInterests = () => {
   return axios.get(`${BASE_URL}/activity/intrests/`, getAuthHeaders())
};

export const getCategories = () => {
   return axios.get(`${BASE_URL}/activity/categories/`, getAuthHeaders())
};

export const getActivities = (categoryId) => {
   return axios.get(`${BASE_URL}/activity/activities/`, {
      params: {
         category: categoryId,
      },
      ...getAuthHeaders()

   })
};
export const getSingleActivity = (activityId) => {
   return axios.get(`${BASE_URL}/activity/activities/${activityId}/`, getAuthHeaders())
};

