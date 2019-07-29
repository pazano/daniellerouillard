window.flo_block_gallery_view_2 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-gallery-view-2";
  var dotb = "." + b;
  var $b = $el.find(dotb);

  /* START: defining all necessary functions */
    function do_masonry() {
      $b.masonry({
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
    }

    function preload_masonry(){
      // we need precise widths, so we use the var below to get the decimals too
      var predestined_width = $el.find(dotb + "__image-thumb")[0].getBoundingClientRect().width;

      $el.find(dotb + "__image-thumb").each(function(){
        var $orig_height = $(this).attr('data-height');
        var $orig_width = $(this).attr('data-width');
        var $coeff = predestined_width * 100 / $orig_width;
        var predestined_height = ( $orig_height * $coeff ) / 100;
        $(this).css('height', predestined_height);
      });
    }

    // removes the preload_masonry calculations and renders the dynamic masonry
    function unset_preload_masonry(){
      $el.find(dotb + "__image-thumb").each(function(){
        $(this).css('height', '');
      })
    }

  /* END: defining all necessary functions */

  /* START: MASONRY */
    if ( (window.innerWidth > 767) || ($b.attr('data-mobile-cols') == 2 && window.innerWidth < 768) ) {

      setTimeout(function(){
        // set image hardcoded sizes before doing masonry
        preload_masonry();
        do_masonry();
      }, 9);

      $el.find(dotb + "__image:last-child").find("img").load( function(){
        // when all images have loaded, unset the hardcoded sizes and recalculate
        setTimeout(function(){
          unset_preload_masonry();
          do_masonry();
        }, 10);
      });

      $(window).on('resize', function(){
        setTimeout(function () {
          do_masonry();
        }, 10);
      });

    }

    // TODO: mobile simplify and lazyload ondemand

    /* START: ondemand lazyloading */
      var img_el = $el.find(dotb + "__image");
      img_el.viewportChecker({
        classToAdd:'visible',
        offset: 40,
        classToRemove:'to-appear-disabled lazy',
        callbackFunction: function(elem, action) {
          if (action == "add" && !elem[0].hasAttribute("src")) {
            var elem_img = elem.find('img');
            elem_img.attr("src", elem_img.attr("data-src"));
            elem_img.imagesLoaded(function() {
              setTimeout(function(){
                  do_masonry();
              }, 10);
            })
          };
        }
      });
    /* END: ondemand lazyloading */

  /* END: MASONRY */

  /* START: FANCY BOX */
    $el.find(dotb + "__image").fancybox({
      loop: true
    });
  /* END: FANCY BOX */
};
