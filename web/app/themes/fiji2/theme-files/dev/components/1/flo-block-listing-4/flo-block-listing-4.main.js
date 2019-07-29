window.flo_block_listing_4 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-listing-4";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");
  var $b = $el.find(dotb);

  if ($(window).width() >= 768) {
    function do_sizing() {
      var items = $el.find(dotb + "__item");
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

}
