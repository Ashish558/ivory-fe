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