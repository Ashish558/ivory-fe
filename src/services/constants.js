export const BASE_URL = 'https://console.liveivory.com/api'

export const getAuthHeaders = () => {
   const token = localStorage.getItem("access")
   let header = {
     headers: { Authorization: `Bearer ${token}` },
   };
   return header;
 };

