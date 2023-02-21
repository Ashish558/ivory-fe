import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";


export const getStories = (loggedIn) => {
   if (loggedIn === true) {
      return axios.get(`${BASE_URL}/story/story-groups/`, getAuthHeaders())
   } else {
      return axios.get(`${BASE_URL}/story/story-groups/`)
   }
};

export const getSingleStory = (url, id, loggedIn) => {
   if (loggedIn === true) {
      return axios.get(`${BASE_URL}/story/${url}/${id}/`, getAuthHeaders())
   } else {
      return axios.get(`${BASE_URL}/story/${url}/${id}/`)
   }
};