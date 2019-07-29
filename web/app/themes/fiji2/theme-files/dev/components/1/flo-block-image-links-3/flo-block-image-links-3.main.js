window.flo_image_links_3 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-image-links-3";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  var slider = $el.find(dotb + "__image-links-slider");
  var arrow_left = $el.find(dotb + "__arrow--left");
  var arrow_right = $el.find(dotb + "__arrow--right");

  /* START: FEATURED SLIDESHOW SLIDER */
    slider.slick({
      arrows: false,
      slidesToShow: 1,
      fade: true,
      responsive:
        [{
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            variableWidth: false
          }
        }]
  });
  /* END: FEATURED SLIDERSHOW SLIDER */

  /* START: ARROWS */
  arrow_left.click(function(){
    slider.slick('slickPrev');
  });

  arrow_right.click(function(){
    slider.slick('slickNext');
  });
/* START: ARROWS */
}
