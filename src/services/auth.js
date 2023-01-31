// for register - 
import axios from "axios";
import { BASE_URL, getAuthHeaders } from "./constants";

// REGISTER
//1. send otp body. You will get otp and otp_token in response. save it in a state
// {
//    "country_code": "",
//    "mobile_no": ""
// }
export const sendOtp = (body) => {
   return axios.post(`${BASE_URL}/accounts/users/send-otp/`, body)
};


//2. verify otp body
// {
//    "country_code": "",
//    "mobile_no": "",
//    "otp": "",
//    "otp_token": ""
// }
export const verifyOtp = (body) => {
   return axios.post(`${BASE_URL}/accounts/users/verify-otp/`, body)
};

//3. Pass the necessary fields
// {
//    "country_code": "",
//    "mobile_no": "",
//    "otp": "",
//    "otp_token": "",
//    "email": "",
//    "name": "",
//    "dob": null,
//    "gender": null,
//    "profile_picture": null,
//    "intrests": []
// }
export const registerUser = (body) => {
   return axios.post(`${BASE_URL}/accounts/users/`, body)
};

// {
//    "mobile_no" : "",
//    "password" : ""
// }
export const loginUser = (body) => {
   return axios.post(`${BASE_URL}/accounts/login/`, body)
};

export const refreshToken = (body) => {
   return axios.post(`${BASE_URL}/accounts/users/refresh-token/`, body,  getAuthHeaders())
};