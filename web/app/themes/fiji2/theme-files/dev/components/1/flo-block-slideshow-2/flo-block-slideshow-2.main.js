window.flo_block_slideshow_2 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-slideshow-2";
  var dotb = "." + b;
  var $variableWidth = true;
  var $adaptiveHeight = false;
  var $centerMode = true;

  if($el.find(dotb).hasClass(b + '__height-auto')){
    $variableWidth = false;
    $adaptiveHeight = true;
    $centerMode = false;
  }
  
  $el.find(dotb + "__slides")

    /* START: ARROWS */
      .on("init", function(){
        if ($el.find(dotb + "__slides .slick-slide:not(.slick-cloned)").length <= 1) {
          $el.find(dotb + "__arrows").remove();
        } else {
          $el.find(dotb + "__arrow--prev").on("click", function(){
            $el.find(dotb + "__slides").slick("slickPrev");
          });
          $el.find(dotb + "__arrow--next").on("click", function(){
            $el.find(dotb + "__slides").slick("slickNext");
          });
        }
      })
    /* END: ARROWS */

    /* START: TRANSFORM DOTS */
      .on("init", function(){
        setTimeout(function () {
          $el.find(dotb + "__dots button").each(function(){
            $(this).text(
              pad($(this).text(), 2)
            );
          });
        }, 10);
      })
    /* END: TRANSFORM DOTS */

    .trigger("floInit", {
      dots: true,
      appendDots: $el.find(dotb + "__dots"),
      centerMode: true,
      variableWidth: true,
      responsive: [
        {
          breakpoint: "767",
          settings: {
            variableWidth: $variableWidth,
            centerMode: $centerMode,
            adaptiveHeight: $adaptiveHeight
          }
        }
      ]
    })
  ;
}
