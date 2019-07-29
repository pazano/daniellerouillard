window.flo_block_gallery_view_1 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-gallery-view-1";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");
  var $b = $el.find(dotb);

  /* START: FOCUSED CLASS */
    $el.find(dotb + "__images").on("beforeChange click", function(){
      $b.addClass(b + "--is-focused");
    });

    $(window).on("scroll", function(){
      $b.removeClass(b + "--is-focused");
    })
  /* END: FOCUSED CLASS */
  if($(window).width() < 768){
    $el.find(dotb + "__image").first().on('load', function(){
      $(window).trigger('resize');
      $el.find(dotb).css('opacity', '1');
    })
  }
  $el.find(dotb + "__images")
    /* START: COUNT - SET COUNT */
      .on("init", function(){
        var $this = $(this);
        var count = $this.find(".slick-slide:not(.slick-cloned)").length;
        $el.find(dotb + "__counter-count").html(
          pad(count, 2)
        );
      })
    /* END: COUNT - SET COUNT */

    /* START: COUNT - SET INDEX */
      .on("init afterChange", function(){
        var $this = $(this);
        var index = parseInt($this.find(".slick-current").attr("data-slick-index"))+1;

        $el.find(dotb + "__counter-index").changeTextUI(
          pad(index, 2),
          "counter"
        );
      })
    /* END: COUNT - SET INDEX */
  ;

  /* START: GALLERY VIEW LAYOUT A */
    if ($b.hasClass(b + "--gallery-view-layout-a")) {
      $el.find(dotb + "__images")
        .slick({
          variableWidth: false,
          arrows: false,
          centerMode: true,
          slidesToShow: 1,
          lazyLoad: 'progressive',
          responsive: [
            {
              breakpoint: "767",
              settings: {
                variableWidth: false,
                centerMode: false,
                lazyLoad: 'progressive',
                adaptiveHeight: true
              }
            }
          ]
        })
      ;
    }
  /* END: GALLERY VIEW LAYOUT A */

  /* START: GALLERY VIEW LAYOUT B */
    if ($b.hasClass(b + "--gallery-view-layout-b")) {
      $el.find(dotb + "__images")
        .slick({
          variableWidth: true,
          arrows: false,
          centerMode: true,
          lazyLoad: 'progressive',
          responsive: [
            {
              breakpoint: "767",
              settings: {
                variableWidth: false,
                lazyLoad: 'progressive',
                centerMode: false,
                adaptiveHeight: true
              }
            }
          ]
        })
      ;
    }
  /* END: GALLERY VIEW LAYOUT B */


  /* START: ARROWS */
    $el.find(dotb + "__arrow--prev").on("click", function(){
      $el.find(dotb + "__images").slick("slickPrev");
    });
    $el.find(dotb + "__arrow--next").on("click", function(){
      $el.find(dotb + "__images").slick("slickNext");
    });
  /* END: ARROWS */

  /* START: STICK TO TOP */
    if ($b.hasClass(b + "--stuck-to-top") && $(window).width() > 767) {
      // function set_placeholder_size() {
      //   setTimeout(function () {
      //     $el.find(dotb + "__placeholder").css("height", $el.find(dotb + "__content").height());
      //   }, 10);
      // }
      //
      // set_placeholder_size();
      //
      // $el.find(dotb + "__images").on("afterChange", function(){
      //   set_placeholder_size();
      // });
      $el.find(dotb + "__content").sticky();
    }
  /* END: STICK TO TOP */

}
