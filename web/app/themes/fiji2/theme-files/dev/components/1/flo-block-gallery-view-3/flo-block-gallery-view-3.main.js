window.flo_block_gallery_view_3 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-gallery-view-3";
  var dotb = "." + b;
  var $b = $el.find(dotb);


  /* START: STICKY TEXT AREA */
    if (window.innerWidth >= 768) {
      $el.find(dotb + "__text-area").stick_in_parent({
        offset_top: $(".flo-header--sticky").length ? 100 : 0
      })
    }
  /* END: STICKY TEXT AREA */


  /* START: LAZYLOADING */

    /* Start: Is On Screen Function */
      function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        var html = document.documentElement;
        var offset = 800;
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight + offset  || html.clientHeight + offset)  &&
          rect.right <= (window.innerWidth || html.clientWidth)
        );
      }
    /* End: Is On Screen Function */

    $(document).imagesLoaded(function(){

      $el.find(dotb + "__image:not([src])").each(function(){
        var image = $(this);

        $(window).on("scroll", function(){
          if (isInViewport(image[0])) {
            image.attr("src", image.attr("data-src") );
          }
        });

      });

    });

  /* END: LAZYLOADING */

}
