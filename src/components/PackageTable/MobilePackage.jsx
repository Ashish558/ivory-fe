import React from 'react';

const MobilePackage = ({item}) => {
    return (
      <tr className="text-center border-b border-gray-300 md:hidden">
        <td className="py-3 text-sm font-medium text-left md:pl-16">
          {item.name}
        </td>
        {item?.premium ? (
          <td className="text-sm font-medium text-[#26A925] md:text-xl md:font-semibold">
            {item.premium}
          </td>
        ) : (
          <td className=" ">
            <img src={item.premiumIcon} className="m-auto" alt="" />
          </td>
        )}

        {item?.free ? (
          <td className="text-sm font-medium text-[#26A925]">{item.free}</td>
        ) : (
          <td className="">
            <img src={item.freeIcon} className="mx-auto" alt="" />
          </td>
        )}
      </tr>
    );
};

export default MobilePackage;