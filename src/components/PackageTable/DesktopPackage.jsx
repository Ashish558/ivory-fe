import React from 'react';

const DesktopPackage = ({item ,className}) => {
    return (
      <tr className={`text-center border-b border-gray-300 ${className?className:''}`}>
        <td className="py-3  font-medium text-left md:pl-16 text-xl">
          {item.name}
        </td>

        {item?.free ? (
          <td className="text-xl font-medium text-[#26A925]">{item.free}</td>
        ) : (
          <td className="">
            <img src={item.freeIcon} className="mx-auto" alt="" />
          </td>
        )}
        {item?.premium ? (
          <td className="text-xl  text-[#26A925] md:text-xl md:font-semibold">
            {item.premium}
          </td>
        ) : (
          <td className=" ">
            <img src={item.premiumIcon} className="m-auto" alt="" />
          </td>
        )}
      </tr>
    );
};

export default DesktopPackage;