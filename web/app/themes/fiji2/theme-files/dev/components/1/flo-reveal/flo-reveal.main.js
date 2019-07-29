$(".flo-reveal").each(function(){
  var reveal = this;
  var $reveal = $(reveal);
  var id = $reveal.attr("id");
  var validation =
    reveal.hasAttribute("id")
    && reveal.hasAttribute("data-flo-reveal")
  ;

  if (validation) {
    // console.log("Flo Reveal: Reveal #" + id + " has passed validation.");

    // Start: Overlay
      // Start: Overlay Styles
        var overlay__styles = [
          // Start: background-color
            reveal.hasAttribute("data-overlay-color") ?
              "background-color: " + $reveal.attr("data-overlay-color") + ";"
            : "",
          // End: background-color
          // Start: opacity
            reveal.hasAttribute("data-overlay-opacity") ?
                "opacity: " + $reveal.attr("data-overlay-opacity") + ";"
            : ""
          // End: opacity
        ].join("");
        overlay__styles = overlay__styles != "" ? " style='"+overlay__styles+"' " : "";
      // End: Overlay Styles

      // Start: Overlay Render
        $reveal.before(
          "<div class='flo-reveal-overlay'"+overlay__styles+" id='"+id+"'></div>"
        );
      // End: Overlay Render

      var overlay__return = function(){
        return $("#"+id+".flo-reveal-overlay");
      }
    // Start: Overlay

    // Start: Disappear Events
      $reveal.on("flo-reveal__close", function(){
        var $overlay = overlay__return();

        $reveal.removeClass("flo-reveal--visible");
        $overlay.removeClass("flo-reveal-overlay--visible");
        $("body").css("overflow", "");
      });
    // End: Disappear Events

    // Start: Appear
      $("[data-open='"+id+"']").on("click", function(){
        var $overlay = overlay__return();
        var trigger = $(this);
        var trigger__position_on_screen = trigger.offset().left <= window.innerWidth / 2 ? "left" : "right";

        $reveal.removeClass("flo-reveal--ready");
        $reveal.attr("data-initial-position", trigger__position_on_screen);
        $("body").css("overflow", "hidden");

        setTimeout(function(){
          $reveal.addClass("flo-reveal--ready");
        });
        setTimeout(function(){
          $reveal.addClass("flo-reveal--visible");
          $overlay.addClass("flo-reveal-overlay--visible");
        });
      })
    // End: Appear

    // Start: Disappear

      // By clicking the close button
      $reveal.find("[data-close]").on("click", function(){
        $reveal.trigger("flo-reveal__close");
      })

      // By pressing escape
      $(document).on("keyup", function(e){
        if (e.keyCode == 27) {
          $reveal.trigger("flo-reveal__close");
        }
      })
      // By clicking on the overlay
      overlay__return().on("click", function(e){
        $reveal.trigger("flo-reveal__close");
      })
    // End: Disappear
  }
});
