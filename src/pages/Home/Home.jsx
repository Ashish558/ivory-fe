import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import flashImg from '../../assets/flashImg.png';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Four from '../splash/Four';
import LogoLanding from '../splash/LogoLanding';
import Second from '../splash/Second';
import Third from '../splash/Third';
const Home = () => {
  const [slide,setSlide] = React.useState(0);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width > 990) {
      navigate("/home");
    } else {
      setTimeout(() => {
        setSlide(1);
      },2500);
      setTimeout(() => {
        setSlide(2);
      },5000);
      setTimeout(() => {
        setSlide(3);
      },7500);
    }
  }, []);
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
      {slide === 1 && <Second></Second>}
      {slide === 2 && <Third></Third>}
      {slide === 3 && <Four></Four>}
      
    </div>
  );
};

export default Home;