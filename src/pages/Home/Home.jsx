import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import flashImg from '../../assets/flashImg.png';
const Home = () => {
  const location = useLocation();
    return (
      <div
        className="h-screen"
        style={{
          background:
            "linear-gradient(195.35deg, #D3E6FE 0%, #FCEBFF 34.17%, #D3E6FE 67.5%, #E7DEFE 100%), #FFFFFF",
        }}
      >
        <div className="flashImg">
          <img
            className=""
            src={flashImg}
            alt=""
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          />
        </div>
        <div>
          <Link
            to="/login" state={{ from: location }} replace
            className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            Let's Go
          </Link>
        </div>
      </div>
    );
};

export default Home;