import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import flashImg from '../../assets/flashImg.png';
import LogoLanding from '../splash/LogoLanding';
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
        
        <div className="flashImg hidden sm:block">
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

        <LogoLanding></LogoLanding>
      </div>
    );
};

export default Home;