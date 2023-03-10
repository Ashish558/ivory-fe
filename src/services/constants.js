export const BASE_URL =  process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_URL : process.env.REACT_APP_BASE_URL


export const getAuthHeaders = () => {
   const token = localStorage.getItem("access")
   let header = {
     headers: { Authorization: `Bearer ${token}` },
   };
   return header;
 };

