import React from "react";
import { Link } from "react-router-dom";
import notFound from "../../assets/404.jpg";
const NotFound = () => {
  //seting title
  // UseTitle('Not Found');
  return (
    <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
      <div className="w-full lg:w-1/2">
        <img  src={notFound} alt="" />
        
          </div>
          </div>
      
  );
};

export default NotFound;
