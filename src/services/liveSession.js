
import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";


export const getLiveSessions = () => {
   return axios.get(`${BASE_URL}/livesession/livesessions/`)
};

export const getUserLiveSessions = () => {
   return axios.get(`${BASE_URL}/livesession/user-livesessions/`, getAuthHeaders())
};

export const getSingleLiveSessions = (id, loggedIn) => {
   return loggedIn === true ? axios.get(`${BASE_URL}/livesession/livesessions/${id}/`, getAuthHeaders())
      :
      axios.get(`${BASE_URL}/livesession/livesessions/${id}/`)
};

export const registerLiveSession = (body) => {
   return axios.post(`${BASE_URL}/livesession/user-livesessions/`, body,  getAuthHeaders())
};