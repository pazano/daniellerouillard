window.flo_block_intro_block = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-intro-block";
  var dotb = "." + b;

  $(window).scroll(function(){
    $el.find(dotb + "__text-area").addClass(b + "__text-area--visible");
  });

  $el.find(dotb + "__scroll-down").click(function() {
    $('html, body').animate({
        scrollTop: eval($(dotb + "__image-area").offset().top - 200)
    }, 600);
});
}
