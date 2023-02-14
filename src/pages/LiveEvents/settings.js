export const settings = {
   infinite: false,
   centerPadding: "10px",
   slidesToShow: 1.3,
   initialSlide: 0,
   arrows: false,
   swipeToSlide: true,
   initialSlide: 0,
   responsive: [
      {
         breakpoint: 1300,
         settings: {
            slidesToShow: 3,
         }
      },
      {
         breakpoint: 1204,
         settings: {
            slidesToShow: 3,
         },

      },
      {
         breakpoint: 768,
         settings: {
            slidesToShow: 1.3,
         },
      },
      {
         breakpoint: 600,
         settings: {
            slidesToShow: 1.3,
         },
      },
      {
         breakpoint: 480,
         settings: {
            slidesToShow: 1.1,
         },
      }
   ],

   afterChange: function (index) {
  
   }
};