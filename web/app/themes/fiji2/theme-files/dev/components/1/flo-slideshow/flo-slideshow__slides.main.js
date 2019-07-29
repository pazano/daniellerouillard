window.flo_slideshow__slides = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-slideshow";
  var dotb = "." + b;

  var block = $el.parents(dotb);
  var block_id = block.attr("data-block-id");

  var block_class_with_id = "flo-slideshow--" + block_id;
  var block_selector_with_id = "." + block_class_with_id;

  var dotblock_parent = block.parents(".flo-block");
  var block_parent_with_id = ".flo-block--" + dotblock_parent.attr("data-id");

  $el
    /* START: VIDEO BACKGROUND */
      .on("init reInit afterChange", function(){
          // Start: Pause all videos
            $el.find("." + b + "__slide--video_slide:not(.slick-current)").find("video").each(function(){
              this.pause();
            });
          // End: Pause all videos
          var active_slide__$ = $el.find(".slick-current");
          if (active_slide__$.hasClass(b + "__slide--video_slide")) {
            var video_container = active_slide__$.find("." + b + "__slide-background-video");
            var video = video_container.find("video")[0];

            video.play();
          }
      })
    /* END: VIDEO BACKGROUND */

    /* START: CHANGE LOGO BASED ON SLIDE ELEMENTS COLOR */
      .on("init afterChange", function(){
        var $this = $(this);
        var $currentSlide = $this.find(".slick-current");
        var elements_color = $currentSlide.attr("data-elements-color");
        var color_brightness = is_color_bright(elements_color);

        if (color_brightness) {
          dotblock_parent.find(dotb + "__logo").addClass(b + "__logo--light");

          dotblock_parent.find(".flo-header__logo").addClass("flo-header__logo--light");

          setTimeout(function(){
            dotblock_parent.find(".is-main .flo-header-mobile__logo").addClass("flo-header-mobile__logo--light");
          });
        } else {
          dotblock_parent.find(dotb + "__logo").removeClass(b + "__logo--light");

          dotblock_parent.find(".flo-header__logo").removeClass("flo-header__logo--light");

          setTimeout(function(){
            dotblock_parent.find(".is-main .flo-header-mobile__logo").removeClass("flo-header-mobile__logo--light");
          });
        }
      })
    /* END: CHANGE LOGO BASED ON SLIDE ELEMENTS COLOR */

    /* START: CHANGE COLOR BASED ON SLIDE COLOR */
      .on("init afterChange", function(){
        var elements_color = $(this).find(".slick-current").attr("data-elements-color");

        var css = [];

        css.push([

          /* START: HEADER - A */
            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__menu > div > ul > .menu-item, ",
            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__menu > div > ul > .menu-item a:after, ",

            block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__logo, ",
            block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__menu > div > ul > .menu-item > a, ",

            block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__menu-trigger, ",

            block_parent_with_id + ".flo-slideshow-block--type-a .is-main.not-sticky.flo-header-mobile .flo-header__search-trigger, ",
            block_parent_with_id + ".flo-slideshow-block--type-a .is-main.not-sticky.flo-header-mobile .flo-header-mobile__logo, ",
            block_parent_with_id + ".flo-slideshow-block--type-a .is-main.not-sticky.flo-header-mobile .flo-header-mobile__menu-trigger, ",
            block_parent_with_id + ".flo-slideshow-block--type-a .is-main.not-sticky.flo-header-mobile .flo-header-mobile__search-trigger ",
            "{",
              "color: " + elements_color + "!important;",
              "border-color: " + elements_color + ";",
            "}",

            block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__menu-item-search:before, ",
            block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__menu-trigger-item ",
            "{ ",
              "background: " + elements_color + "; ",
            "} ",

            /* START: HEADER FEATURED ITEM */
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__featured-link ",
              "{",
                "color: " + elements_color + "!important;",
              "}",
            /* END: HEADER FEATURED ITEM */

            /* START: HEADER COLUMNS */
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__column-top-wrap ",
              "{",
                "border-color: " + elements_color + "!important;",
              "}",
            /* END: HEADER COLUMNS */

            /* START: HEADER SEARCH */
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-trigger, ",
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-form-input, ",
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-form-submit ",
              "{",
                "color: " + elements_color + "!important;",
              "}",

              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-form:before, ",
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-form:after ",
              "{",
                "background-color: " + elements_color + "!important;",
              "}",
            /* END: HEADER SEARCH */

            /* START: SOCIAL LINKS */
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__social-links a:before, ",
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__social-links-trigger,",
              block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__lang-switch",
              "{",
                "color: " + elements_color + "!important;",
              "}",
            /* END: SOCIAL LINKS */

          /* END: HEADER - A */

          /* START: PLAY BUTTON */
            block_selector_with_id + " .flo-hero-video-embed__button",
            "{",
              "color: " + elements_color + ";",
              "border-color: " + elements_color + ";",
            "}",
          /* END: PLAY BUTTON */

          /* START: COUNTER - A*/
            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__counter-count, ",
            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__counter-index",
            "{ ",
              "color: " + elements_color + "!important; ",
            "} ",

            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__counter-separator",
            "{ ",
              "background-color: " + elements_color + "; ",
            "} ",
          /* END: COUNTER - A */

          /* START: TITLE AREA - A */
            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__title-area-pretitle, ",
            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__title-area-title",
            "{ ",
              "color: " + elements_color + "!important; ",
            "} ",

            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__title-area-pretitle:before ",
            "{ ",
              "background-color: " + elements_color + "; ",
            "} ",
          /* END: TITLE AREA - A */

          /* START: ARROW NEXT - A */
            block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__arrow-next ",
            "{ ",
              "color: " + elements_color + "!important; ",
            "} ",
          /* END: ARROW NEXT - A */

          /* START: FEATURED LINK - A, C */
            block_parent_with_id + " " + dotb + "__featured-link-pretitle, ",
            block_parent_with_id + " " + dotb + "__featured-link-title",
            "{ ",
              "color: " + elements_color + "!important; ",
            "} ",

            block_parent_with_id + " " + dotb + "__featured-link-divider",
            "{ ",
              "background-color: " + elements_color + "; ",
            "} ",
          /* END: FEATURED LINK - A, C */

          /* START: TOP AREA - C */
            block_parent_with_id + ".flo-slideshow-block--type-c " + dotb + "__top-area-logo .flo-header__logo, ",
            block_parent_with_id + ".flo-slideshow-block--type-c " + dotb + "__top-area-social-links a:before",
            "{ ",
              "color: " + elements_color + "!important;",
            "} ",
          /* END: TOP AREA - C */

          /* START: SLIDE SELECTOR - C */
            block_parent_with_id + ".flo-slideshow-block--type-c " + dotb + "__slide-selector-pretitle:before",
            "{ ",
              "background-color: " + elements_color + "; ",
            "} ",

            block_parent_with_id + ".flo-slideshow-block--type-c " + dotb + "__slide-selector-pretitle",
            "{ ",
              "color: " + elements_color + "; ",
            "} "
          /* END: SLIDE SELECTOR - C */

        ].join("\n"));

        css = css.join("\n");

        if ($("style.flo-slideshow__slides--" + block_id).length) {
          $("style.flo-slideshow__slides--" + block_id).html(css);
        } else {
          $("head").append(
            $(" <style class='flo-slideshow__slides--" + block_id + " '> ").html(css)
          );
        }

      })
    /* END: CHANGE COLOR BASED ON SLIDE COLOR */

    /* START: VIDEO EMBED */
      .on("init", function(){
        var $slides = $(this);
        $el.find("."+b+"__slide--image_and_video_embed").each(function(){
          var active_slide__$ = $(this);
          var video_embed_host = dotblock_parent;
          var video_button = active_slide__$.find(".flo-hero-video-embed__button");
          var video_container = active_slide__$.find(".flo-hero-video-embed__container");
          var embed_code = active_slide__$.attr("data-embed-code");

          video_button.on("click", function(){
            if (!video_embed_host.hasClass("video-is-playing")) {
              video_container.html(unescape(embed_code));
              video_embed_host.addClass("video-is-playing");

              $slides.slick("slickSetOption", "autoplay", false, true);
            } else if (video_embed_host.hasClass("video-is-playing")) {
              video_container.html("");
              video_embed_host.removeClass("video-is-playing");

              var autoplay = $slides.attr("data-autoplay") == "true" ? true : false;
              $slides.slick("slickSetOption", "autoplay", autoplay , true);
            }
          });
        });
      })
      .on("beforeChange", function(){
        var active_slide__$ = $(this).find(".slick-current");
        var video_embed_host = dotblock_parent;

        /* START: VIDEO EMBED CLOSE ON SLIDE CHANGE */
          if (video_embed_host.hasClass("video-is-playing")) {
            active_slide__$.find(".flo-hero-video-embed__button").click();
          }
        /* END: VIDEO EMBED CLOSE ON SLIDE CHANGE */

      })
    /* END: VIDEO EMBED */

    /* START: COUNT - SET COUNT */
      .on("init", function(){
        var $this = $(this);
        var count = $this.find(".slick-slide:not(.slick-cloned)").length;
        count = pad(count, 2);
        dotblock_parent.find(dotb + "__counter-count").html(
          count
        );
      })
    /* END: COUNT - SET COUNT */

    /* START: COUNT - SET INDEX */
      .on("init afterChange", function(){
        var $this = $(this);
        var index = parseInt($this.find(".slick-current").attr("data-slick-index"))+1;
        index = pad(index, 2);

        dotblock_parent.find(dotb + "__counter-index").changeTextUI(
          index,
          "counter"
        );
      })
    /* END: COUNT - SET INDEX */

    /* START: INITIALIZATION */
      .slick()
    /* END: INITIALIZATION */
  ;

  /* START: NEXT ARROW ACTION */
    block.find(dotb + "__arrow-next").click(function(){
      $el.slick("slickNext");
    });
  /* END: NEXT ARROW ACTION */
}
