window.flo_block_contact_block_1 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-contact-block-1";
  var dotb = "." + b;
  var $b = $el.find(dotb);
  var $form_wrap = $el.find(dotb + "__form-wrap");
  // 
  // /* START: DETERMINE IF THE SCROLL EFFECT DOES NOT NEED TO BE USED */
  //   var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  //   var no_scroll_effect_class = b + "--no-scroll-effect";
  //   var scroll_effect_active = $b.hasClass(no_scroll_effect_class) ? false : true;
  // 
  //   if (
  //     $(window).width() <= 1024
  //     || is_safari
  //   ) {
  //     scroll_effect_active = false;
  //     $b.addClass(no_scroll_effect_class);
  //   }
  // /* END: DETERMINE IF THE SCROLL EFFECT DOES NOT NEED TO BE USED */
  // 
  // /* START: DESKTOP RULES */
  //   if ($(window).width() > 1024 && scroll_effect_active) {
  // 
  //     /* START: SCROLL EFFECT */
  //       // const ps = new PerfectScrollbar($el.find(dotb + "__form-wrap")[0], {
  //       //   // wheelSpeed: 2,
  //       //   wheelPropagation: true,
  //       //   maxScrollbarLength: 0
  //       // });
  // 
  //       var lock_scroll = false;
  //       var at_start = true;
  //       var at_end = false;
  // 
  //       /* START: ACTUAL SCROLL */
  //         document.addEventListener("wheel", function(e){
  //           // var e = e.originalEvent;
  //           var step = e.deltaY * -1;
  //           var form_wrap_top = $form_wrap.position().top;
  //           var form_wrap_new_top = form_wrap_top + step;
  //           var form_wrap_height = $form_wrap.outerHeight(true);
  //           var block_height = $el.outerHeight(true);
  //           var block_top = $el.offset().top - $(window).scrollTop();
  //           var difference_in_height = block_height - form_wrap_height;
  //           var direction;
  //           var is_in_viewport = block_top > -100 && block_top < 100;
  // 
  //           /* START: DETERMINE DIRECTION */
  //             if (step > 0) {
  //               direction = "up";
  //             } else {
  //               direction = "down";
  //             }
  //           /* END: DETERMINE DIRECTION */
  // 
  //           /* START: DETERMINE IF IS AT START OR AT END */
  //             at_end = form_wrap_top <= difference_in_height + 100;
  //           /* END: DETERMINE IF IS AT START OR AT END */
  // 
  //           /* START: DETERMINE IF IS AT START OR AT START */
  //             at_start = form_wrap_top >= block_height - 10;
  //           /* END: DETERMINE IF IS AT START OR AT START */
  // 
  //           /* START: CHANGE FORM WRAP POSITION */
  //             if (
  //               is_in_viewport
  //               && (
  //                 (direction == "down" && !at_end)
  //                 || (direction == "up" && !at_start)
  //               )
  //               && form_wrap_new_top >= difference_in_height
  //               && form_wrap_new_top <= block_height
  //             ) {
  //               $form_wrap.css("top", form_wrap_new_top);
  //             }
  //           /* END: CHANGE FORM WRAP POSITION */
  // 
  //           /* START: DETERMINE IF SCROLL NEEDS TO BE LOCKED */
  //             if (
  //               // is in viewport
  //               is_in_viewport
  // 
  //               // direction
  //               && (
  //                 // going down
  //                 (
  //                   direction == "down"
  //                   && at_start == false
  //                   && at_end == false
  //                 )
  // 
  //                 ||
  // 
  //                 // going up
  //                 (
  //                   direction == "up"
  //                   && at_start == false
  //                   && at_end == false
  //                 )
  //               )
  //             ) {
  //               lock_scroll = true;
  //             } else {
  //               lock_scroll = false;
  //             }
  //           /* END: DETERMINE IF SCROLL NEEDS TO BE LOCKED */
  // 
  //           /* START: LOG VARIABLES */
  //             var log = 0;
  //             if (log) {
  //               console.log({
  //                 // "at_start": at_start,
  //                 // "at_end": at_end,
  //                 // "block": block_height,
  //                 // "block_height": block_height,
  //                 // "block_top": block_top,
  //                 // "direction": direction,
  //                 // "difference_in_height": difference_in_height,
  //                 // "form_wrap_height": form_wrap_height,
  //                 // "form_wrap_top": form_wrap_top,
  //                 // "is_in_viewport": is_in_viewport,
  //                 // "lock_scroll": lock_scroll,
  //                 "step": step,
  //               });
  //             }
  //           /* END: LOG VARIABLES */
  //         });
  //       /* END: ACTUAL SCROLL */
  // 
  //       /* START: LOCK SCROLLING */
  //         document.addEventListener("wheel", function(e){
  //           if (lock_scroll) {
  //             e.preventDefault();
  //           }
  //         });
  //       /* END: LOCK SCROLLING */
  //     /* END: SCROLL EFFECT */
  // 
  //   }
  // /* END: DESKTOP RULES */
  // 
  /* START: SCROLL DOWN TO FORM */
    $el.find(dotb + "__scroll-down").click(function() {
      $("html, body").animate({
        scrollTop: $form_wrap.offset().top
      });
    });
    
    if(!$(dotb).hasClass(b + '--no-scroll-effect')) {
      $(window).on('scroll', function(){
        if($(window).scrollTop() > $(window).height()) {
          $(dotb + '__desktop-wrap').addClass('invisible');
        } else {
          $(dotb + '__desktop-wrap').removeClass('invisible');
        }
      })
    }
    
  /* END: SCROLL DOWN TO FORM */
}
