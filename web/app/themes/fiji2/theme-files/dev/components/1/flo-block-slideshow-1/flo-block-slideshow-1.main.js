window.flo_block_slideshow_1 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-slideshow-1";
  var dotb = "." + b;

  $el.find(dotb + "__slides")

    /* START: ARROWS */
      .on("init", function(){
        if ($el.find(dotb + "__slides .slick-slide:not(.slick-cloned)").length <= 1) {
          $el.find(dotb + "__arrow").remove();
        } else {
          $el.find(dotb + "__arrow--prev").click(function(){
            $el.find(dotb + "__slides").slick("slickPrev");
          });
          $el.find(dotb + "__arrow--next").click(function(){
            $el.find(dotb + "__slides").slick("slickNext");
          });
        }
      })
    /* END: ARROWS */

    /* START: HEADER AREA */
      .on("elementsColorLight", function(){
        $el.find(".flo-header__logo")
          .addClass("flo-header__logo--is-light")
        ;
        if($(window).width() < 768){
          setTimeout(function(){
            $el.find(".flo-header-mobile__logo")
              .addClass("flo-header-mobile__logo--light")
            ;
          })
        }
      })
      .on("elementsColorDark", function(){
        $el.find(".flo-header__logo")
          .removeClass("flo-header__logo--is-light")
        ;
        if($(window).width() < 768){
          // setTimeout(function(){
            $el.find(".flo-header-mobile__logo")
              .removeClass("flo-header-mobile__logo--light")
            ;
          // })
        }
      })
    /* END: HEADER AREA */

    /* START: COUNT - SET COUNT */
      .on("init", function(){
        var $this = $(this);
        var count = $this.find(".slick-slide:not(.slick-cloned)").length;
        $el.find(dotb + "__counter-count").html(
          pad(count, 2)
        );
      })
    /* END: COUNT - SET COUNT */

    /* START: COUNT - SET INDEX */
      .on("init afterChange", function(){
        var $this = $(this);
        var index = parseInt($this.find(".slick-current").attr("data-slick-index"))+1;

        $el.find(dotb + "__counter-index").changeTextUI(
          pad(index, 2),
          "counter"
        );
      })
    /* END: COUNT - SET INDEX */

    /* START: TEXT AREA  */
      .on("init beforeChange", function(e, slick, currentSlide, nextSlide){
        var $slick = $(this);

        var current_slide;
        if (e.type == "beforeChange") {
          current_slide = $slick.find(".slick-slide[data-slick-index='"+nextSlide+"']");
        } else if (e.type == "init") {
          current_slide = $slick.find(".slick-current");
        }

        var new_title = current_slide.attr("data-title");
        var new_text = current_slide.attr("data-text");
        var new_button = current_slide.attr("data-url");
        var new_bottom_label = current_slide.attr("data-bottom-label");

        var title_area__title = $el.find(dotb + "__title");
        var title_area__text = $el.find(dotb + "__text");
        var title_area__button = $el.find(dotb + "__button");
        var title_area__bottom_label = $el.find(dotb + "__bottom-label");

        var overlay_color = current_slide.attr("data-overlay-color");
        var overlay_opacity = current_slide.attr("data-overlay-opacity");

        if (new_title.trim() !== "") {
          title_area__title.fadeIn().changeText(new_title);
        } else {
          title_area__title.fadeOut();
        }

        if (new_text.trim() !== "") {
          title_area__text.fadeIn().changeText(new_text);
        } else {
          title_area__text.fadeOut();
        }
        
        if (title_area__button.length) {
          if (new_button.trim() !== "") { 
            title_area__button.fadeIn().attr("href", new_button);
          } else {
            title_area__button.fadeOut();
          }
        }

        if (new_bottom_label.trim() !== "") {
          title_area__bottom_label.fadeIn().html(new_bottom_label);
        } else {
          title_area__bottom_label.fadeOut();
        }

        // If no text is added to this slide, don't add the overlay color and opacity
        if ((new_title.trim() !== "" || new_text.trim() !== "" || new_bottom_label.trim() !== "") &&
        (overlay_color.trim() !== "" && overlay_opacity.trim() !== "")) {

          $el.find(dotb + "__content-wrap").css("background-color", "rgba("+ b_hex2rgba(overlay_color, overlay_opacity) +")");

        }else {
          $el.find(dotb + "__content-wrap").css("background-color", "");
        }

      })
    /* END: TEXT AREA  */

    .trigger("floInit")
  ;

}
