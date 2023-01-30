import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import back from "../../assets/Back.svg";
import { sendOtp } from '../../services/auth';
const Login = () => {
    const locaion = useLocation();
    const NewLocation = useLocation();
     const from = locaion.state?.from || "/";
  const navigate = useNavigate();
  const [phone,setPhone] = React.useState(null);
  const [error,setError] = React.useState("");
  const [countryCode,setCountryCode] = React.useState("+880");
    const goBack = () => {
        navigate(from,{replace:true})
  }
  
 
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(JSON.stringify(phone).length);
      if (JSON.stringify(phone).length < 11) {

        setError("Phone number must be 11 digits");
      } else if (phone.length > 11) {
        setError("Phone number cannot be more than 11 digits");
      } else if (typeof phone !== "number") {
        console.log(typeof phone);
        setError("Phone number must be a number");
      } else {
        setCountryCode(e.target.countryCode.value);
        const body = {
          country_code: countryCode,
          mobile_no: phone,
        };
        sendOtp(body).then((res) => {
          console.log(res);
          navigate("/otp", {
            state: {
              otp: res.data.data.otp,
              otp_token: res.data.data.otp_token,
              phone: phone,
              countryCode: countryCode,
            },
          });
        });
      }
    }
    return (
      <div className="h-screen" style={{ background: "rgb(211, 230, 254,.2)" }}>
        <div className="topAppBar mt-10 ml-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={back} alt="" onClick={goBack} />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="text-3xl font-bold ml-8">
            &#128075; Hi, <br /> Welcome to Ivory!
          </h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="w-full mx-auto mt-4 relative">
              <input
                class=" w-10/12 sm:w-auto  px-4 py-4 mt-2 text-gray-700 bg-white border-2  border-blue-500 placeholder-gray-400  focus:ring-opacity-40 focus:outline-none   justify-center flex mx-auto  rounded-xl pl-16 text-lg"
                // type="tel"
                
               type={JSON.stringify(phone)?.length < 11?'number':'text' }
               maxLength="11"
                // pattern='[0-9]{11}'
                onChange={(e) => setPhone(parseInt(e.target.value))}
                placeholder="Phone Number"
                required
              />
              <p>{ error
              }</p>
              <select
                name="countryCode"
                id=""
                style={{ appearance: "none" }}
                className=" border-r-2 border-blue-500 px-1 absolute top-5 left-10 pl-1 text-blue-600 text-lg"
              >
                <option value="+91">+91</option>
                <option value="+92">+92</option>
                <option value="+880" selected>
                  +880
                </option>
              </select>
            </div>

            <div class="flex items-center justify-between mt-4">
              <button
                type="submit"
                className="bg-[#1B72C0] text-xl py-2 px-20 rounded-full text-white w-10/12 sm:w-auto text-center justify-center flex mx-auto mt-5"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;