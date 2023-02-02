import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";


export const getStories = () => {
   return axios.get(`${BASE_URL}/story/story-groups/`)
};