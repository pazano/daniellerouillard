window.flo_numeric_details = el => {
  "use strict";
  let $el = $(el);
  let b = "flo-block-numeric-details";
  let dotb = "." + b;
  
  let willAnimate = $el.find(dotb).attr("data-animnum");
  if(willAnimate) {
    let animTargets = $el.find(`${dotb}__numeric-detail-number`);
    if(animTargets && animTargets.length) {
      let delayVal = 0;
      let animDuration = $el.find(dotb).attr("data-anim-ms");
      $(window).on("startViewportChecker", function(){
        animTargets.viewportChecker({
          classToAdd: 'counted',
          repeat: false,
          offset: 100,
          invertBottomOffset: false,
          callbackFunction: (number, action) => {
            // wrap whole function in settimeout to avoid stuttering
            setTimeout(function () {
              number.delay(delayVal).animateNumber(
                { number: parseInt(number.attr("data-num")) }, 
                parseInt(animDuration), 
                'linear', 
                () => { if(number.hasClass(`${b}__plus-will-show`)) number.addClass(`${b}__plus-shown`) },
                delayVal += 150
              );
            });
          }
        });
      }).trigger("startViewportChecker");
    }
  }
}