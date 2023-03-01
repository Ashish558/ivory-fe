import React from 'react'
import styles from './filterbar.module.css'

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
      <div className='overflow-auto mt-4 '>
         <div className='flex items-center gap-y-1 lg:gap-y-1 flex-nowrap lg:flex-wrap'>
            {
               items.map(item => {
                  return (
                     <div key={item.id}
                        onClick={() => onChange(item)}
                        className={` h-[36px] font-medium cursor-pointer border border-[#79747E] flex justify-center items-center mr-2 rounded-lg px-2.5 lg:px-3 py-1 shrink-0 lg:text-[18px] text-sm ${item.selected ? 'bg-primary text-white' : 'text-lightBlack'} ${!item.selected ? styles.ite : ''} `}>
                        {item.children}
                     </div>
                  )
               })
            }
         </div>
      </div>
   )
}
