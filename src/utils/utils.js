export const getFormattedDate = argDate => {
   let date = new Date(argDate)
   const month = date.toLocaleString('default', { month: 'long' });

   return `${date.getDate()} ${month}, ${date.getFullYear()}`

}