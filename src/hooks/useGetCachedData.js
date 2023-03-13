import { useEffect } from 'react';

export const useGetCachedData = (localStorageItemKey, setLoading, setData) => {
    useEffect(() => {
      Date.prototype.addHours = function (h) {
         this.setTime(this.getTime() + (h * 60 * 60 * 1000));
         return this;
      }
      let item = localStorage.getItem(localStorageItemKey)
      if (item) {
         item = JSON.parse(item)
         let timestamp = new Date(item.timestamp)
         let timestampValid = new Date(timestamp).addHours(2)
         if (timestampValid > new Date()) {
            // console.log(item);
            let data = item?.data
            setData(data)
            setLoading(false)
         }
      }else{
         return
      }
    }, [localStorageItemKey, setLoading, setData])
};
