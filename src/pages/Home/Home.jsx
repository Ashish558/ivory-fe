import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import flashImg from '../../assets/flashImg.png';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Four from '../splash/Four';
import LogoLanding from '../splash/LogoLanding';
import Second from '../splash/Second';
import Third from '../splash/Third';

const Home = () => {
  const [slide, setSlide] = React.useState(0);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { loggedIn, profileData } = useSelector(state => state.user)

  let timeoutId1 = null
  let timeoutId2 = null
  let timeoutId3 = null

  useEffect(() => {
    if (width > 990 || loggedIn) {
      navigate("/home");
      if (width < 990) {
        window.location.reload()
      }
      return
    } else {
      timeoutId1 = setTimeout(() => {
        setSlide(1);
      }, 2500);
      timeoutId2 = setTimeout(() => {
        setSlide(2);
      }, 5000);
      timeoutId3 = setTimeout(() => {
        setSlide(3);
      }, 7500);
    }
    return () => {
      clearTimeouts()
    }
  }, []);

  const clearTimeouts = () => {
    clearTimeout(timeoutId1)
    clearTimeout(timeoutId2)
    clearTimeout(timeoutId3)
  }

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
      {slide === 0 && <LogoLanding></LogoLanding>}
      {slide === 1 && <Second clearTimeouts={clearTimeouts} ></Second>}
      {slide === 2 && <Third clearTimeouts={clearTimeouts} ></Third>}
      {slide === 3 && <Four clearTimeouts={clearTimeouts} ></Four>}

    </div>
  );
};

export default Home;