window.flo_slideshow = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-slideshow";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  /* START: HIDE COUNTER AND ARROWS IF THERE IS ONLY ONE SLIDE */
    if (
      $el.find(dotb + "__slides " + dotb + "__slide:not(.slick-cloned)").length == 1
    ) $(dotb).addClass(b + "--one-slide"); 
  /* END: HIDE COUNTER AND ARROWS IF THERE IS ONLY ONE SLIDE */

  /* START: TRIGGER GRADIENT ON HOVER ON SPECIFIC ELEMENTS */
    if (window.innerWidth > 1024) {
      $(dotb + "__title-area")
      .add(".flo-hero-video-embed__button")
      .add(".flo-slideshow__featured-link")
        .mouseenter(function(){
          $(el).find(dotb + "__slide.slick-current").addClass("gradient-visible");
        })
        .mouseleave(function(){
          $(el).find(dotb + "__slide.slick-current").removeClass("gradient-visible");
        })
      ;
    }
  /* END: TRIGGER GRADIENT ON HOVER ON SPECIFIC ELEMENTS */
}
