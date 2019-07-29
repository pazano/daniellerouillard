window.flo_share_rollover = function(el){
  "use strict";
  var $el = $(el);
  var $b = ".flo-share-rollover";

  $el.find($b+"__trigger").click(function(){

    $el.toggleClass("visible");
  });
}
