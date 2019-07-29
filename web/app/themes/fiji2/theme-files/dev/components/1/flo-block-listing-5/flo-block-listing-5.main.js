window.flo_block_listing_5 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-listing-5";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");
  var $b = $el.find(dotb);

  if ($(window).width() >= 768 && !$b.hasClass(b + "--masonry")) {
    function do_sizing() {
      var items = $el.find(dotb + "__featured-image");
      items.each(function(){
        var width = $(this).width();
        $(this).css("height", width);
      });
    }
    setTimeout(function () {
      do_sizing();
    }, 10);

    $(window).on("resize", function(){
      do_sizing();
    });
  }

  if ($(window).width() >= 768 && $b.hasClass(b + "--masonry")) {
    function do_masonry() {
      $b.masonry({
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
    }
    setTimeout(function () {
      do_masonry();
    }, 10);

    $el.find(dotb + "__featured-image").load(function(){
      do_masonry();
    });
    $(window).on("resize", function(){
      do_masonry();
    });
  }



}
