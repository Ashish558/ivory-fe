export const settings = {

   infinite: false,
   centerPadding: "60px",
   slidesToShow: 3,
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
            slidesToShow: 2.5,
         },

      },
      {
         breakpoint: 768,
         settings: {
            slidesToShow: 1.5,
         },
      },
      {
         breakpoint: 600,
         settings: {
            slidesToShow: 1.5,
         },
      },
      {
         breakpoint: 480,
         settings: {
            slidesToShow: 1.3,
         },
         // state: {
         //    display: true,
         //    height: 600
         // }
      }
   ],

   afterChange: function (index) {
      console.log(
         `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
   }
};