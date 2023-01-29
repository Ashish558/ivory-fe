import React from 'react';
import smile from '../../assets/smile.png';
import back from '../../assets/Back.svg';
import { useLocation, useNavigate } from 'react-router-dom';
const Congrates = () => {
    const locaion = useLocation();
    const from = locaion.state?.from || '/signup';
    const navigate = useNavigate();
    const goBack = () => {
      navigate(from, { replace: true });
    };
    return (
      <div className="h-screen">
        <div className="topAppBar mt-10 ml-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={back} alt="" onClick={goBack} />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center text-center mt-[30%] ">
          <h1 className="text-2xl font-bold  text-green-600">
            Congratulations! Your account is created.
          </h1>
          <img src={smile} alt="" />
        </div>
      </div>
    );
};

export default Congrates;