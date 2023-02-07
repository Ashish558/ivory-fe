import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";


export const getStories = (loggedIn) => {
   if (loggedIn === true) {
      return axios.get(`${BASE_URL}/story/story-groups/`, getAuthHeaders())
   } else {
      return axios.get(`${BASE_URL}/story/story-groups/`)
   }
};