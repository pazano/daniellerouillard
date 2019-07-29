window.flo_slideshow__layout__type_b = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-slideshow";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  /* START: SET PROPER HEIGHTS FOR THE SPACER AND THE SLIDES */
    function setHeights() {
      var headerHeight = parent.find(".flo-block__header").height();
      if (!headerHeight) {
        headerHeight = 0;
      }

      $el.find(dotb + "__spacer").css(
        "height",
        headerHeight + "px"
      );

      $el.find(dotb + "__slides")
      .add(dotb + "__background")
      .add(dotb + "__slide-main-wrap")
      .add(dotb + "__slide-image")
        .css(
          "height",
          "calc(100vh - " + headerHeight+ "px)"
        )
      ;

      $el.find(dotb + "__background").css(
        "top",
        headerHeight + "px"
      );
    }

    setHeights();

    $(window).on("resize", function(){
      setHeights();
    });
  /* END: SET PROPER HEIGHTS FOR THE SPACER AND THE SLIDES */

  /* START: SLIDES */
    var slides = $el.find(dotb + "__slides");

    slides
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

      /* START: CHANGE BACKGROUND COLOR */
        .on("init afterChange", function(){
          $el.find(dotb + "__background")
            .css(
              "background-color",
              $el.find(".slick-current").attr("data-slide-bg")
            )
          ;
        })
      /* END: CHANGE BACKGROUND COLOR */

      /* START: COUNT - SET COUNT */
        .on("init", function(){
          var $this = $(this);
          var count = $this.find(".slick-slide:not(.slick-cloned)").length;
          count = pad(count, 2);
          $el.find(dotb + "__counter-count").html(
            count
          );
        })
      /* END: COUNT - SET COUNT */

      /* START: COUNT - SET INDEX */
        .on("init afterChange", function(){
          var $this = $(this);
          var index = parseInt($this.find(".slick-current").attr("data-slick-index"))+1;
          index = pad(index, 2);

          $el.find(dotb + "__counter-index").changeTextUI(
            index,
            "counter"
          );
        })
      /* END: COUNT - SET INDEX */

      /* START: VIDEO EMBED */
        .on("init", function(){
          var $slides = $(this);
          $el.find("."+b+"__slide--image_and_video_embed").each(function(){
            var active_slide__$ = $(this);
            var video_embed_host = active_slide__$;
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
          var video_embed_host = active_slide__$;

          /* START: VIDEO EMBED CLOSE ON SLIDE CHANGE */
            if (video_embed_host.hasClass("video-is-playing")) {
              active_slide__$.find(".flo-hero-video-embed__button").click();
            }
          /* END: VIDEO EMBED CLOSE ON SLIDE CHANGE */

        })
      /* END: VIDEO EMBED */

      .slick(
        {
          dots: false,
          // arrows: false,
          cssEase: "ease-in-out",
          speed: "400",
          variableWidth: true,
          nextArrow: $el.find(dotb + "__arrow--next"),
          prevArrow: $el.find(dotb + "__arrow--prev")
        }
      )
    ;
  /* END: SLIDES */
}
