import React from 'react'

//sample items
// items = [
//    {
//       id: 0,
//       children: <div> child </div>,
//       selected: true
//    }
// ]
export default function Filterbar({ items }) {

   return (
      <div className='overflow-auto'>
         <div className='flex items-center flex-nowrap lg:flex-wrap'>
            {
               items.map(item => {
                  return (
                     <div key={item.id}
                      className='text-lightBlack text-sm font-medium border border-[#79747E] fle justify-center items-center mr-2 rounded-lg px-2 py-1 shrink-0'>
                        {item.children}
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}
