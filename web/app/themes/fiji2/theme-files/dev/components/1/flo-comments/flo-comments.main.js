window.flo_comments = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-comments";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  if (window.innerWidth >= 767) {
    $el.find(dotb + "__form-wrap").stick_in_parent({
      offset_top: 150
    });
  }
}
