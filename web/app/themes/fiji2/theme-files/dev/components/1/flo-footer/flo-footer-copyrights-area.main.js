window.flo_footer_copyrights_area = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-footer-copyrights-area";
  var dotb = "." + b;

  $el.find(dotb + "__back-to-top").click(function(){
    $("html, body").animate({ scrollTop: "0" });
  });
}
