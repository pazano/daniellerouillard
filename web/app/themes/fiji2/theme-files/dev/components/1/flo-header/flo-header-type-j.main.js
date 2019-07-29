window.flo_header_type_j = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-header";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");
  var $b = $el.find(dotb);

  /* START: POPUP MENU TRIGGER */
    $el.find(dotb + "__popup-menu-trigger").click(function(){
      $el.find(dotb + "__popup-menu-wrap").toggleClass(
        b + "__popup-menu-wrap--open"
      );
    });
  /* END: POPUP MENU TRIGGER */

}
