import React from 'react';
import Logo from '../../Images/形状.png'

const Navbar = () => {
    return (
        <div class="navbar background">
            <div class="flex-1">


                <div className=" display  normal-case text-lg  welcome-color">
                    {/* <p>
                        <img src={Logo} alt="" />
                        <span className=' fw-bold'>Welcome,
                        </span>
                        <span className='pl-2  name' >Sahil</span>
                    </p> */}

                    <p className='pr-1 pl-2'>   <img src={Logo} alt="" /></p>
                    <p className=' font-bold'>Welcome,</p>
                    <p className='pl-2  name'>Sahil</p>
                </div>

            </div>

            <div class="flex-none gap-2">
                <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img src="https://placeimg.com/80/80/people" alt='' />
                    </div>
                </label>
                {/* <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between" href=' '>
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a href=' '>Settings</a></li>
                    <li><a href=' '>Logout</a></li>
                </ul> */}

            </div>
        </div>
    );
};

export default Navbar;