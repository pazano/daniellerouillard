window.flo_mobile_menu = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-mobile-menu";
  var dotb = "." + b;

  var opened_class = "body--flo-mobile-menu-popup-opened";
  var closed_class = "body--flo-mobile-menu-popup-closed";
  var type_b_layout = "body--flo-mobile-menu-popup-type-b";
  
  /* START: OPEN POPUP */
    $(".flo-header-mobile__menu-trigger")
      .on("click", function(){
        $("body")
          .addClass(opened_class)
          .removeClass(closed_class)
        ;
        //change page properties for popup B
        if($el.hasClass(b + "__popup-type-b")){  
          $("body").addClass(type_b_layout);
          $(".flo_page_wrap").css("height", "100vh");
          setTimeout(function(){
            $('.flo_page_wrap').css({
              'position': 'fixed',
              'width': '100vw'
            });
          }, 500);
        }
        
      })
      // TODO: Remove line when popup is finished
      // .trigger("click")
    ;
  /* END: OPEN POPUP */

  /* START: CLOSE BUTTON */
    $el.find(dotb + "__close").on("click", function(){
      $("body")
        .removeClass(opened_class)
        .addClass(closed_class)
      ;
      
      // revert page properties
      if($el.hasClass(b + "__popup-type-b")){  
        $("body").removeClass(type_b_layout);
        $(".flo_page_wrap").css("height", "100vh");
        setTimeout(function(){
          $('.flo_page_wrap').css({
            'position': '',
            'width': ''
          });
          $('.flo_page_wrap').css('max-height', '');
        }, 500);
        $('.flo_page_wrap').css('position', '');
      }
      
    });
  /* END: CLOSE BUTTON */
console.log($el);
  /* START: TYPE A -> ADD DROPDOWN TOGGLES TO EVERY ITEM WITH DROPDOWN */
    $el.find(dotb + "__menu > li.menu-item-has-children > a")
      .append("<span class='flo-mobile-menu__menu-dropdown-toggle'><i class='flo-icon-right-dir'></i></span>")
    ;

    $el.on("click", dotb + "__menu-dropdown-toggle", function(e){
      e.preventDefault();
      console.log(123);
      $(this).parents("li").toggleClass("children-visible");
      $(this).parent().siblings(".sub-menu").slideToggle("slow");
    });
  /* END: TYPE A -> ADD DROPDOWN TOGGLES TO EVERY ITEM WITH DROPDOWN */
}
