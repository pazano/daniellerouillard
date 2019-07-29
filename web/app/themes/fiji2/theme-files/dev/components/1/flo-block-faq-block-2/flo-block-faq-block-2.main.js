window.flo_faq_2 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-faq-block-2";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  var slider = $el.find(dotb + "__faq-slider");
  var arrow_left = $el.find(dotb + "__arrow--left");
  var arrow_right = $el.find(dotb + "__arrow--right");

    /* START: COUNT - SET ITEMS NUMBERS */
      slider.on("init beforeChange", function(e, slick, currentSlide, nextSlide){
        var $this = $(this);
        var index;
        if (e.type == "init") {
          index = parseInt($this.find(".slick-current").attr("data-slick-index"))+1;
        } else {
          index = parseInt($this.find(".slick-slide[data-slick-index=" + nextSlide + "]").attr("data-slick-index"))+1;
        }

        $el.find(dotb + "__current-item-number").changeTextUI(
          pad(index, 2),
          "counter"
        );
      })
    /* END: COUNT - SET ITEMS NUMBERS */

    /* START: COUNTER - COUNT */
      .on("init", function(){
        $el.find(dotb + "__total-item-number").text(
          pad($el.find(".slick-slide:not(.slick-cloned)").length, 2)
        );
      })
    /* END: COUNTER - COUNT */

    /* START: FAQ SLIDER */
      .slick({
        arrows: false,
        slidesToShow: 1,
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
  /* END: FAQ SLIDER */

  /* START: ARROWS */
  arrow_left.click(function(){
    slider.slick('slickPrev');
  });

  arrow_right.click(function(){
    slider.slick('slickNext');
  });
/* START: ARROWS */
}
