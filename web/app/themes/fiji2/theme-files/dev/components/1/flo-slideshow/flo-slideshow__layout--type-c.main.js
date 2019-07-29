window.flo_slideshow__layout__type_c = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-slideshow";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  /* START: START SET HEIGHTS FOR MOBILE */
    if (window.innerWidth < 768) {

      function setHeights() {
        var headerHeight = parent.find(".flo-block__header").height() / 16 + "rem";
        if (!headerHeight) {
          headerHeight = 0;
        }
        var slideSelectorHeight = 80 / 16;
        var slideSelectorBottomMargin = 20 / 16;

        parent.find(dotb)
          .css({
            "padding-top": headerHeight,
            "padding-bottom": slideSelectorHeight + slideSelectorBottomMargin + "rem"
          })
        ;
      }

      setHeights();

      $(window).on("resize", function(){
        setHeights();
      });
    }
  /* END: START SET HEIGHTS FOR MOBILE */

  /* START: SLIDE SELECTOR */
    $el.find(dotb + "__slide-selectors")
      .on("init", function(){
        var $this = $(this);
        setTimeout(function () {
          parent.find(dotb + "__slides").slick("slickSetOption", "asNavFor", $this);
        }, 10);
      })
      .slick({
        variableWidth: true,
        arrows: false,
        dots: false,
        focusOnSelect: true,
        slidesToShow: 1,
        slidesToScroll: 3,
        asNavFor: parent.find(dotb + "__slides")
      })
    ;
  /* END: SLIDE SELECTOR */

  /* START: RIGHT BAR */

    /* START: ADD CLASS TO BODY TO HELP MODIIFY THE HEADER POPUP */
      $("body").addClass("body--flo-header__popup--for-slideshow-type-c");
    /* END: ADD CLASS TO BODY TO HELP MODIIFY THE HEADER POPUP */

    /* START: SEARCH TOGGLE -> CLICK -> FOCUS ON SEARCH INPUT WHEN POPUP OPENS */
      $el.find(dotb + "__right-bar-search-trigger").click(function(){
        $(".flo-header-popup__search-input").focus();
      });
    /* END: SEARCH TOGGLE -> CLICK -> FOCUS ON SEARCH INPUT WHEN POPUP OPENS */

  /* END: RIGHT BAR */
}
