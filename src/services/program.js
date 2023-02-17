import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";


export const getPrograms = (body) => {
   return axios.get(`${BASE_URL}/program/programs/`)
};
