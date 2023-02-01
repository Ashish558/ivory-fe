import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";

export const getInterests = (fromAdmin) => {
   let config = {}
   if (fromAdmin) {
      config = {
         params: {
            created_by: 1,
         },
         ...getAuthHeaders()

      }
   }else{
      config = { ...getAuthHeaders()}
   }

   return axios.get(`${BASE_URL}/activity/intrests/`, config)
};

export const addInterest = (body) => {
   return axios.post(`${BASE_URL}/activity/intrests/`, body, getAuthHeaders())
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

