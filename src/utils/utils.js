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


export const getColors= (totalLength, idx) => {
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