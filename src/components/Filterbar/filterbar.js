import React from 'react'

//sample items
// items = [
//    {
//       id: 0,
//       children: <div> child </div>,
//       selected: true
//    }
// ]
export default function Filterbar({ items, onChange }) {

   return (
      <div className='overflow-auto'>
         <div className='flex items-center flex-nowrap lg:flex-wrap'>
            {
               items.map(item => {
                  return (
                     <div key={item.id}
                        onClick={() => onChange(item)}
                        className={` text-sm font-medium cursor-pointer border border-[#79747E] fle justify-center items-center mr-2 rounded-lg px-2 py-1 shrink-0 ${item.selected ? 'bg-primary text-white' : 'text-lightBlack'} `}>
                        {item.children}
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}
