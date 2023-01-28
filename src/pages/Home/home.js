import React, { useState } from 'react'
import Story from '../Frames/Story/Story'

export default function Home() {

   const [storiesOpen, setStoriesOpen] = useState(true)

   return (
      <>
         <div>
            home
         </div>
         {
            storiesOpen &&
            <Story />
         }
      </>
   )
}
