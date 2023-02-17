export const settings = {
   infinite: false,
   centerPadding: "10px",
   slidesToShow: 4,
   initialSlide: 0,
   arrows: false,
   swipeToSlide: true,
   initialSlide: 0,
   responsive: [
      {
         breakpoint: 1300,
         settings: {
            slidesToShow: 4,
         }
      },
      {
         breakpoint: 1204,
         settings: {
            slidesToShow: 2.9,
         },

      },
      {
         breakpoint: 768,
         settings: {
            slidesToShow: 2,
         },
      },
      {
         breakpoint: 600,
         settings: {
            slidesToShow: 1.8,
         },
      },
      {
         breakpoint: 500,
         settings: {
            slidesToShow: 1.7,
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