/* START: MISC */
  function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }
  // A function that animates text change
  jQuery.fn.extend({
    changeText: function(text){
      return this.each(function(){
        var $el = $(this);
        if ($el.text() !== text ) {
          $el
            .animate({"opacity": 0}, 200)
          ;
          setTimeout(function(){
            $el.text(text);
            $el
              .animate({"opacity": 1}, 200)
            ;
          }, 200);
        }
      });
    },
    changeTextUI: function(text, animation, speed){
      if (typeof animation === "undefined") {
        var animation = "fade";
      }
      if (typeof speed === "undefined") {
        var speed = 400;
      }
      return this.each(function(){
        var $el = $(this);

        var animation_map = {
          fade: {
            name: "fade",
            show_attr: {
            },
            hide_attr: {
            }
          },
          counter: {
            name: "slide",
            show_attr: {
              direction: "down"
            },
            hide_attr: {
              direction: "up"
            }
          },
          slide_left: {
            name: "drop",
            show_attr: {
              direction: "left"
            },
            hide_attr: {
              direction: "right"
            }
          },
          drop_up: {
            name: "drop",
            show_attr: {
              direction: "up"
            },
            hide_attr: {
              direction: "down"
            }
          },

        }

        if ($el.text() !== text ) {
          // $el
          //   .animate({"opacity": 0}, 200)
          // ;
          $el.hide(animation_map[animation].name, animation_map[animation].show_attr, speed / 2);
          setTimeout(function(){
            $el.text(text);
            // $el
            //   .animate({"opacity": 1}, 200)
            // ;
            $el.show(animation_map[animation].name, animation_map[animation].hide_attr, speed / 2);
          }, speed / 2);
        }
      });
    },
    changeCSS: function(property, value){
      return this.each(function(){
        var $el = $(this);
        if ($el.css(property) !== value ) {
          $el
            .animate({"opacity": 0}, 200)
            // .css("transform", "translateY(-0.3rem)")
            // .css("transition", "transform 0.8s, color 0.4s")
          ;
          setTimeout(function(){
            $el.css(property, value);
            $el
              .animate({"opacity": 1}, 200)
              // .css("transform", "translateY(-0rem)")
              // .css("transition", "")
            ;
          }, 200);
        }
      });
    }
  });

  // A function that tells if a color is light(true) or dark (false)
  function is_color_bright(color) {
    if (color && color.length == 7 && color[0] == "#") {
      var c = color;
      var c = c.substring(1);      // strip #
      var rgb = parseInt(c, 16);   // convert rrggbb to decimal
      var r = (rgb >> 16) & 0xff;  // extract red
      var g = (rgb >>  8) & 0xff;  // extract green
      var b = (rgb >>  0) & 0xff;  // extract blue

      var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

      return luma > 40;
    } else {
      console.log("Color Brightness: Invalid Color String");
      return 0;
    }
  }

  // HEX2RGBA
  function hex2rgba(hex, alpha) {
    if (!HEX_REGEX.test(hex)) {
        throw Error('hex2rgba: first argument has invalid hexadecimal characters');
    }

    // trim unnecessary characters
    if (hex[0] === '#') {
        hex = hex.slice(1);
    }

    // expand shorthand
    if (hex.length === HEX_SHORTHAND_LENGTH) {
        hex = hex.split('');
        hex.splice(2, 0, hex[2]);
        hex.splice(1, 0, hex[1]);
        hex.splice(0, 0, hex[0]);
        hex = hex.join('');
    }

    if (hex.length !== HEX_LENGTH) {
        throw Error('hex2rgba: first argument has invalid hexadecimal length');
    }

    // convert hex to rgb
    var values = [
        parseInt(hex.slice(0, 2), BASE),
        parseInt(hex.slice(2, 4), BASE),
        parseInt(hex.slice(4, 6), BASE)
    ];

    alpha = typeof alpha === 'number' ? alpha : parseFloat(alpha);
    if (alpha >= 0 && alpha <= 1) {
        values.push(alpha);
    } else {
        values.push(1);
    }

    return 'rgba(' + values.join(',') + ')';
  };
  // better hex2rgba function ;)
  function b_hex2rgba(hex,opacity){
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    let result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return result;
  }
/* END: MISC */

$(function(){

  $(document).foundation();

  $(document).flo_lqip();

  // START: BLOCK SCRIPTS
    $("[data-onready]").each(function(){
      window[$(this).attr("data-onready")](this);
    });
  // END: BLOCK SCRIPTS

  /* START: ANIMATE SECTION APPEARANCE - VIEWPORT CHECKER */
    $(window).on("startViewportChecker", function(){
      $([
        ".layout-sections--scroll-normal .flo-block",
        ".flo_page > .flo-block:not(:first-of-type):not(.disable-appear)",
        ".flo-footer",
        ".to-appear",
        ".to-appear--custom",
        ".flo-post.with-appear > *",
        ".widget"
      ].join(",")).viewportChecker({
        classToAdd: 'visible',
        repeat: true,
        offset: 40,
        invertBottomOffset: false

      });
    }).trigger("startViewportChecker");
  /* END: ANIMATE SECTION APPEARANCE - VIEWPORT CHECKER */

  // START: ANIMATE ON PAGE LOAD AND UNLOAD

    // START: BODY FADEIN
      // $(document).ready(function () {
      //   $("body").fadeIn();
      // });
    // END: BODY FADEIN

    // START: BODY FADEOUT
      // window.onbeforeunload = function () {
      //   $("body").fadeOut();
      // };
    // END: BODY FADEOUT

  //END: LOAD/UNLOAD ANIMATION

  /* START: WATCH INPUT FIELDS */
    $("input, textarea").on("verifyValue", function(){
      if ($(this).val() == "") {
        $(this).addClass("empty");
      } else {
        $(this).removeClass("empty");
      }
    });

    $("input, textarea").trigger("verifyValue");

    $("input, textarea").on("keyup change", function(){
      $(this).trigger("verifyValue");
    });
  /* END: WATCH INPUT FIELDS */

  /* START: MOBILE COOKIE */

    // add the cookie that is used to detect mobile and retina screens
    (function(){

        var is_mobile_screen,
            is_tablet_screen,
            mobile_cookie_name = "flo_small_screen",
            tablet_cookie_name = "flo_tablet_screen",
            mobile_cookie = floGetCookie(mobile_cookie_name), // Can return "1", "0", null;
            tablet_cookie = floGetCookie(tablet_cookie_name), // Can return "1", "0", null;
            set_mobile = function(value) {
                createCookie(mobile_cookie_name, value, 1);
            },
            set_tablet = function(value) {
                createCookie(tablet_cookie_name, value, 1);
            },

        //  we consider screens larger than 760 not beeing mobile
        is_mobile_screen = document.documentElement.clientWidth <= 760;

        is_tablet_screen = (document.documentElement.clientWidth >= 761 && document.documentElement.clientWidth <= 1024);

        if (is_mobile_screen) {
            if (mobile_cookie === '' || mobile_cookie == "0") {
                set_mobile(1);
                set_tablet(0);
            }
        }else if(is_tablet_screen){
            if (tablet_cookie === '' || tablet_cookie == "0") {
                set_mobile(0);
                set_tablet(1);
            }
        } else {
            if (tablet_cookie == '1' || mobile_cookie == "1") {
                set_mobile(0);
                set_tablet(0);
            }
        }

    // Set the cookie for the retina devices
    // the cookie is used later to serve appropriate image size
      if( document.cookie.indexOf('flo_device_pixel_ratio') == -1 && 'devicePixelRatio' in window && window.devicePixelRatio == 2 && !is_mobile_screen ){

        var date = new Date();

        date.setTime( date.getTime() + 3600000 );

        document.cookie = 'flo_device_pixel_ratio=' + window.devicePixelRatio + ';' + ' expires=' + date.toUTCString() +'; path=/';


      } else if(document.cookie.indexOf('flo_device_pixel_ratio') != -1 && floGetCookie('flo_device_pixel_ratio') != window.devicePixelRatio){
            // delete the coockie if the saved cookie does not match the current device pixel reatio

            var dateO = new Date();
            dateO.setTime( dateO.getTime() - 3600000 ); // set a past date that will be used to make the cookie expired

            document.cookie = 'flo_device_pixel_ratio=' + window.devicePixelRatio + ';' + ' expires=' + dateO.toUTCString() +'; path=/';

        }

      })();
    });

    function createCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }

    function floGetCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
        }
        return "";
    }

  /* END: MOBILE COOKIE */

  /* START: WIDGETS JS */
  window.widget_newsletter_signup = function(){

    var $form = $(".widget__flo-form--newsletter");

    if ($form.length) {
      // Start: Validation
      $form.parsley();
      // End: Validation

      // Start: Mailchimp Subscription
      var
        embed_code =
          unescape(
            $form.parent().find(".embed_code").text()
          ),
        $embed_code = $("<div>").html(embed_code);

      if(typeof $embed_code.find("form").attr("action") !== 'undefined'){
        var embed_form_action = $embed_code.find("form").attr("action").replace(/\\"/g, '');
        $form.attr("action", embed_form_action);
      }else{
        console.log('The mailchimp code is incorect');
        $form.find('.widget__flo-form--newsletter__form-submit').css('pointer-events', 'none');
      }

      // End: Mailchimp Subscription

    }

  }
  /* END: WIDGETS JS */
