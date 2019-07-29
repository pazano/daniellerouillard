window.flo_slideshow__layout__type_a = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-slideshow";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  /* START: HIDE ARROW ON SPECIFIC HOVER */
    $el.find([
      ".flo-hero-video-embed__button",
      dotb + "__title-area"
    ].join(","))
      .mouseenter(function(){
        $el.find(dotb + "__arrow-next")
          .addClass("vertical")
          // .hide()
        ;
      })
      .mouseleave(function(){
        $el.find(dotb + "__arrow-next")
          .removeClass("vertical")
          // .show()
        ;
      })
    ;
  /* END: HIDE ARROW ON SPECIFIC HOVER */

  $el.find(dotb + "__slides")
    /* START: ARROW */
      .on("mousemove", function(e){
        if (window.innerWidth >= 768) {
          var x = e.pageX - $(this).offset().left;
          var y = e.pageY - $(this).offset().top;

          var arrow = $el.find(dotb + "__arrow-next");

          arrow.css({
            "left" : x,
            "top" : y
          });

          var width = $(this).width();

          if (x <= width / 2) {
            arrow.addClass("inverted");
          } else {
            arrow.removeClass("inverted");
          }
        }
      })
      .on("click", function(e){

        if (
          window.innerWidth >= 768
          && !$(e.target).is("[class*=flo-hero-video-embed__button]")
          && !$(e.target).is("[class*=flo-slideshow__title-area]")
        ) {
          var x = e.pageX - $(this).offset().left;
          var y = e.pageY - $(this).offset().top;
          var width = $(this).width();

          if (x <= width / 2) {
            $(this).slick("slickPrev");
          } else {
            $(this).slick("slickNext");
          }
        }

      })
    /* END: ARROW */
  ;

}
