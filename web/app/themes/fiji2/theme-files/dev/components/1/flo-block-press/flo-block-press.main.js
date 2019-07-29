window.flo_block_numeric_details = el => {
  "use strict";
  let $el = $(el);
  let b = "flo-block-press";
  let dotb = "." + b;
  let elements = $(dotb + "__slides").attr("data-elements");
  elements = parseInt(elements);

  $el.find(dotb + "__slides").slick({
    dots: false,
    infinite: true,
    slidesToShow: elements,
    slidesToScroll: 1,
    adaptiveHeight: false,
    lazyLoad:'ondemand',
    centerMode: true,
    variableWidth: false,
    nextArrow: $el.find(dotb + "__arrow--next"),
    prevArrow: $el.find(dotb + "__arrow--prev"),
    responsive: [
      {
       breakpoint: 768,
       settings: {
         slidesToShow: 1,
         slidesToScroll: 1,
         infinite: true
       }
     }
    ]
  });
  
}