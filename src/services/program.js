import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";


export const getPrograms = (body) => {
   return axios.get(`${BASE_URL}/program/programs/`)
};
export const getAllUserPrograms = (body) => {
   return axios.get(`${BASE_URL}/program/user-programs/`, getAuthHeaders())
};

export const getSingleProgram = (id, loggedIn) => {
   return loggedIn ? axios.get(`${BASE_URL}/program/programs/${id}/`, getAuthHeaders())
      :
      axios.get(`${BASE_URL}/program/programs/${id}/`)
};

export const createUserProgram = (body) => {
   return axios.post(`${BASE_URL}/program/user-programs/`, body, getAuthHeaders())
};

export const getUserPrograms = (body) => {
   return axios.get(`${BASE_URL}/program/user-programs/`, getAuthHeaders())
};
export const enrollProgram = (id) => {
   return axios.get(`${BASE_URL}/program/user-programs/${id}/enroll/`, getAuthHeaders())
};


// MODULE
export const getUserProgram = (id) => {
   return axios.get(`${BASE_URL}/program/user-programs/${id}/`, getAuthHeaders())
};

export const createUserModule = (body) => {
   return axios.post(`${BASE_URL}/program/user-modules/`, body, getAuthHeaders())
};

export const getUserModules = () => {
   return axios.get(`${BASE_URL}/program/user-modules/`, getAuthHeaders())
};

export const updateUserModule = (id, body) => {
   return axios.patch(`${BASE_URL}/program/user-modules/${id}/`, body, getAuthHeaders())
};


//assignments
export const getUserAssignments = (id) => {
   return axios.get(`${BASE_URL}/program/user-assignments/`, getAuthHeaders())
};
export const getUserAssignmentSubmissions = () => {
   return axios.get(`${BASE_URL}/program/user-assignment-submissions/`, getAuthHeaders())
};

export const createUserAssignment = (body) => {
   return axios.post(`${BASE_URL}/program/user-assignments/`, body, getAuthHeaders())
};

export const updateUserAssignment = (id, body) => {
   return axios.patch(`${BASE_URL}/program/user-assignments/${id}/`, body, getAuthHeaders())
};

export const deleteUserSubmission = (id) => {
   return axios.delete(`${BASE_URL}/program/user-assignment-submissions/${id}/`, getAuthHeaders())
};
