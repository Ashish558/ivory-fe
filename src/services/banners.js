import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";

export const getBanners = (body) => {
   return axios.get(`${BASE_URL}/activity/banners/`)
};
