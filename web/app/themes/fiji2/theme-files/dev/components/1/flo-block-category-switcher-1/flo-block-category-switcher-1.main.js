window.flo_mobile_category_switcher = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-category-switcher-1";
  var dotb = "." + b;
  $el.find(dotb + "__layout--dropdown").click(function(){
    if($(window).width() < 768){
      $el.find(dotb + "__layout--dropdown").toggleClass('expanded');
    }
  })
}