export const getFormattedDate = argDate => {
   let date = new Date(argDate)
   const month = date.toLocaleString('default', { month: 'long' });

   return `${date.getDate()} ${month}, ${date.getFullYear()}`
}

export const genNumbers = (start, end) => {
   const diff = end - start
   let numArray = []
   let arr = [...Array(diff)].map((x, i) => {
      numArray.push(start + i)
   })
   return numArray
}


export const getColors = (totalLength, idx) => {
   let index = idx
   if (idx > totalLength - 1) {
      index = index % totalLength
   }
   const backgrounds = [
      '#7B34FB',
      '#22B8CF',
      '#F28400',
   ]
   return backgrounds[index]
}

export const getFormattedDuration = (arg) => {
   if (!arg) return ''
   let durationArr = arg.split(':')
   let hours = durationArr[0]
   let mins = durationArr[1]

   return `${parseInt(hours)} hrs ${parseInt(mins)} min`

}
export const getFormattedDateWeek = (argDate) => {
   let date = new Date(argDate)
   const month = date.toLocaleString('default', { month: 'short' });
   const week = date.toLocaleDateString('default', { weekday: 'long' });
   return `${date.getDate()} ${month}, ${week}`

}
export const getPricingMainText = (isFree, price, discounted_price, discount) => {
   if (isFree) {
      return "Free"
   } else if (discount === 0) {
      return <> &#8377; {price} </>
   } else if (discount > 0) {
      return <> &#8377; {discounted_price} </>
   }
}
export const getPricingDiscountedText = (isFree, price, discounted_price, discount) => {
   if (isFree === false && discount > 0) {
      return price
   } else {
      return <></>
   }
}

export const getStoryUrl = type => {
   if(type === 'mcq'){
      return 'mcq-stories'
   }else if(type === 'image'){
      return 'image-stories'
   }else if(type === 'sudoku'){
      return 'puzzle-stories'
   }else if(type === 'qna'){
      return 'qna-stories'
   }else if(type === 'video'){
      return 'video-stories'
   }
}

export function isValidYoutubeLink(val) {
   let regex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
   if (!regex.test(val)) {
      return false
   }else{
      return true
   }
}