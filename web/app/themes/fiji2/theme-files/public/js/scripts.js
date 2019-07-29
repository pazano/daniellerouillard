(function($){"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* START: MISC */
function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
// A function that animates text change
jQuery.fn.extend({
  changeText: function changeText(text) {
    return this.each(function () {
      var $el = $(this);
      if ($el.text() !== text) {
        $el.animate({ "opacity": 0 }, 200);
        setTimeout(function () {
          $el.text(text);
          $el.animate({ "opacity": 1 }, 200);
        }, 200);
      }
    });
  },
  changeTextUI: function changeTextUI(text, animation, speed) {
    if (typeof animation === "undefined") {
      var animation = "fade";
    }
    if (typeof speed === "undefined") {
      var speed = 400;
    }
    return this.each(function () {
      var $el = $(this);

      var animation_map = {
        fade: {
          name: "fade",
          show_attr: {},
          hide_attr: {}
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
        }

      };

      if ($el.text() !== text) {
        // $el
        //   .animate({"opacity": 0}, 200)
        // ;
        $el.hide(animation_map[animation].name, animation_map[animation].show_attr, speed / 2);
        setTimeout(function () {
          $el.text(text);
          // $el
          //   .animate({"opacity": 1}, 200)
          // ;
          $el.show(animation_map[animation].name, animation_map[animation].hide_attr, speed / 2);
        }, speed / 2);
      }
    });
  },
  changeCSS: function changeCSS(property, value) {
    return this.each(function () {
      var $el = $(this);
      if ($el.css(property) !== value) {
        $el.animate({ "opacity": 0 }, 200)
        // .css("transform", "translateY(-0.3rem)")
        // .css("transition", "transform 0.8s, color 0.4s")
        ;
        setTimeout(function () {
          $el.css(property, value);
          $el.animate({ "opacity": 1 }, 200)
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
    var c = c.substring(1); // strip #
    var rgb = parseInt(c, 16); // convert rrggbb to decimal
    var r = rgb >> 16 & 0xff; // extract red
    var g = rgb >> 8 & 0xff; // extract green
    var b = rgb >> 0 & 0xff; // extract blue

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
  var values = [parseInt(hex.slice(0, 2), BASE), parseInt(hex.slice(2, 4), BASE), parseInt(hex.slice(4, 6), BASE)];

  alpha = typeof alpha === 'number' ? alpha : parseFloat(alpha);
  if (alpha >= 0 && alpha <= 1) {
    values.push(alpha);
  } else {
    values.push(1);
  }

  return 'rgba(' + values.join(',') + ')';
};
// better hex2rgba function ;)
function b_hex2rgba(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);

  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
  return result;
}
/* END: MISC */

$(function () {

  $(document).foundation();

  $(document).flo_lqip();

  // START: BLOCK SCRIPTS
  $("[data-onready]").each(function () {
    window[$(this).attr("data-onready")](this);
  });
  // END: BLOCK SCRIPTS

  /* START: ANIMATE SECTION APPEARANCE - VIEWPORT CHECKER */
  $(window).on("startViewportChecker", function () {
    $([".layout-sections--scroll-normal .flo-block", ".flo_page > .flo-block:not(:first-of-type):not(.disable-appear)", ".flo-footer", ".to-appear", ".to-appear--custom", ".flo-post.with-appear > *", ".widget"].join(",")).viewportChecker({
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
  $("input, textarea").on("verifyValue", function () {
    if ($(this).val() == "") {
      $(this).addClass("empty");
    } else {
      $(this).removeClass("empty");
    }
  });

  $("input, textarea").trigger("verifyValue");

  $("input, textarea").on("keyup change", function () {
    $(this).trigger("verifyValue");
  });
  /* END: WATCH INPUT FIELDS */

  /* START: MOBILE COOKIE */

  // add the cookie that is used to detect mobile and retina screens
  (function () {

    var is_mobile_screen,
        is_tablet_screen,
        mobile_cookie_name = "flo_small_screen",
        tablet_cookie_name = "flo_tablet_screen",
        mobile_cookie = floGetCookie(mobile_cookie_name),
        // Can return "1", "0", null;
    tablet_cookie = floGetCookie(tablet_cookie_name),
        // Can return "1", "0", null;
    set_mobile = function set_mobile(value) {
      createCookie(mobile_cookie_name, value, 1);
    },
        set_tablet = function set_tablet(value) {
      createCookie(tablet_cookie_name, value, 1);
    },


    //  we consider screens larger than 760 not beeing mobile
    is_mobile_screen = document.documentElement.clientWidth <= 760;

    is_tablet_screen = document.documentElement.clientWidth >= 761 && document.documentElement.clientWidth <= 1024;

    if (is_mobile_screen) {
      if (mobile_cookie === '' || mobile_cookie == "0") {
        set_mobile(1);
        set_tablet(0);
      }
    } else if (is_tablet_screen) {
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
    if (document.cookie.indexOf('flo_device_pixel_ratio') == -1 && 'devicePixelRatio' in window && window.devicePixelRatio == 2 && !is_mobile_screen) {

      var date = new Date();

      date.setTime(date.getTime() + 3600000);

      document.cookie = 'flo_device_pixel_ratio=' + window.devicePixelRatio + ';' + ' expires=' + date.toUTCString() + '; path=/';
    } else if (document.cookie.indexOf('flo_device_pixel_ratio') != -1 && floGetCookie('flo_device_pixel_ratio') != window.devicePixelRatio) {
      // delete the coockie if the saved cookie does not match the current device pixel reatio

      var dateO = new Date();
      dateO.setTime(dateO.getTime() - 3600000); // set a past date that will be used to make the cookie expired

      document.cookie = 'flo_device_pixel_ratio=' + window.devicePixelRatio + ';' + ' expires=' + dateO.toUTCString() + '; path=/';
    }
  })();
});

function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function floGetCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

/* END: MOBILE COOKIE */

/* START: WIDGETS JS */
window.widget_newsletter_signup = function () {

  var $form = $(".widget__flo-form--newsletter");

  if ($form.length) {
    // Start: Validation
    $form.parsley();
    // End: Validation

    // Start: Mailchimp Subscription
    var embed_code = unescape($form.parent().find(".embed_code").text()),
        $embed_code = $("<div>").html(embed_code);

    if (typeof $embed_code.find("form").attr("action") !== 'undefined') {
      var embed_form_action = $embed_code.find("form").attr("action").replace(/\\"/g, '');
      $form.attr("action", embed_form_action);
    } else {
      console.log('The mailchimp code is incorect');
      $form.find('.widget__flo-form--newsletter__form-submit').css('pointer-events', 'none');
    }

    // End: Mailchimp Subscription
  }
};
/* END: WIDGETS JS */

$(function () {

  $([".comments-block__top-bar-hide-button", ".comments-block__top-bar-show-button", ".comments-block__top-bar-toggle-button"].join(", ")).click(function () {
    $('.comments-block').toggleClass("comments-block--expanded").toggleClass("comments-block--collapsed");
    $(".comments-block__posts").slideToggle();
  });
});

if ($(".flo-block--merged-with-header").length) {
  $("body header").first().remove();
}

$(function () {

  $('.page').on('submit', '.flo-form__built-in', function (e) {
    e.preventDefault();

    var form = $(this),
        container = '.contact-response'; // the div for the error response messages

    jQuery('.flo-name').removeClass('invalid');
    jQuery('.flo-email').removeClass('invalid');

    jQuery(container).html('');

    jQuery.ajax({
      url: ajaxurl,
      data: '&action=floSendContact&' + jQuery(form).serialize(),
      type: 'POST',
      dataType: "json",
      //      cache: false,
      success: function success(json) {

        //jQuery('#flo-loading').fadeOut('slow'); // loading effect

        if (json.contact_name) {
          jQuery('.flo-name').addClass('invalid');
          jQuery(container).append(json.contact_name);
        }

        if (json.contact_email) {
          jQuery('.flo-email').addClass('invalid');
          jQuery(container).append(json.contact_email);
        }

        if (json.error_message) {

          jQuery(container).append(json.error_message);
        }

        if (json.message) {
          jQuery('.flo-modal').fadeIn('slow');

          jQuery(form).find('input[type="text"], textarea').val('');

          setTimeout(function () {
            jQuery('.flo-modal').fadeOut('slow');
          }, 3000);
        }
      }

    });
  });
});

window.flo_share_rollover = function (el) {
  "use strict";

  var $el = $(el);
  var $b = ".flo-share-rollover";

  $el.find($b + "__trigger").click(function () {

    $el.toggleClass("visible");
  });
};

$(function () {
  $(".flo-video-embed").each(function () {
    var video_embed = $(this);
    var video_embed__loaded_class = "flo-video-embed--loaded";
    var video_screen = video_embed.find(".flo-video-embed__screen");
    var video_screen__embed_code = video_screen.attr("data-flo-video-embed-embed-code");
    var video_button = video_embed.find(".flo-video-embed__video-button");
    var video_start = function video_start() {
      video_screen.html(video_screen__embed_code);
      video_embed.addClass(video_embed__loaded_class);
    };
    var video_stop = function video_stop() {
      video_embed.removeClass(video_embed__loaded_class);
      video_screen.html("");
    };
    video_button.on("click", function (e) {
      e.preventDefault();
      switch (video_embed.hasClass(video_embed__loaded_class)) {
        case false:
          video_start();
          break;
        case true:
          video_stop();
          break;
      }
    });

    video_embed.on("floVideoEmbedStop", function () {
      video_stop();
    });
  });
});

window.flo_mobile_category_switcher = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-category-switcher-1";
  var dotb = "." + b;
  $el.find(dotb + "__layout--dropdown").click(function () {
    if ($(window).width() < 768) {
      $el.find(dotb + "__layout--dropdown").toggleClass('expanded');
    }
  });
};
window.flo_block_contact_block_1 = function (el) {
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
  $el.find(dotb + "__scroll-down").click(function () {
    $("html, body").animate({
      scrollTop: $form_wrap.offset().top
    });
  });

  if (!$(dotb).hasClass(b + '--no-scroll-effect')) {
    $(window).on('scroll', function () {
      if ($(window).scrollTop() > $(window).height()) {
        $(dotb + '__desktop-wrap').addClass('invisible');
      } else {
        $(dotb + '__desktop-wrap').removeClass('invisible');
      }
    });
  }

  /* END: SCROLL DOWN TO FORM */
};

window.flo_faq_2 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-faq-block-2";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  var slider = $el.find(dotb + "__faq-slider");
  var arrow_left = $el.find(dotb + "__arrow--left");
  var arrow_right = $el.find(dotb + "__arrow--right");

  /* START: COUNT - SET ITEMS NUMBERS */
  slider.on("init beforeChange", function (e, slick, currentSlide, nextSlide) {
    var $this = $(this);
    var index;
    if (e.type == "init") {
      index = parseInt($this.find(".slick-current").attr("data-slick-index")) + 1;
    } else {
      index = parseInt($this.find(".slick-slide[data-slick-index=" + nextSlide + "]").attr("data-slick-index")) + 1;
    }

    $el.find(dotb + "__current-item-number").changeTextUI(pad(index, 2), "counter");
  })
  /* END: COUNT - SET ITEMS NUMBERS */

  /* START: COUNTER - COUNT */
  .on("init", function () {
    $el.find(dotb + "__total-item-number").text(pad($el.find(".slick-slide:not(.slick-cloned)").length, 2));
  })
  /* END: COUNTER - COUNT */

  /* START: FAQ SLIDER */
  .slick({
    arrows: false,
    slidesToShow: 1,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        variableWidth: false
      }
    }]
  });
  /* END: FAQ SLIDER */

  /* START: ARROWS */
  arrow_left.click(function () {
    slider.slick('slickPrev');
  });

  arrow_right.click(function () {
    slider.slick('slickNext');
  });
  /* START: ARROWS */
};

window.flo_block_gallery_view_2 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-gallery-view-2";
  var dotb = "." + b;
  var $b = $el.find(dotb);

  /* START: defining all necessary functions */
  function do_masonry() {
    $b.masonry({
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  }

  function preload_masonry() {
    // we need precise widths, so we use the var below to get the decimals too
    var predestined_width = $el.find(dotb + "__image-thumb")[0].getBoundingClientRect().width;

    $el.find(dotb + "__image-thumb").each(function () {
      var $orig_height = $(this).attr('data-height');
      var $orig_width = $(this).attr('data-width');
      var $coeff = predestined_width * 100 / $orig_width;
      var predestined_height = $orig_height * $coeff / 100;
      $(this).css('height', predestined_height);
    });
  }

  // removes the preload_masonry calculations and renders the dynamic masonry
  function unset_preload_masonry() {
    $el.find(dotb + "__image-thumb").each(function () {
      $(this).css('height', '');
    });
  }

  /* END: defining all necessary functions */

  /* START: MASONRY */
  if (window.innerWidth > 767 || $b.attr('data-mobile-cols') == 2 && window.innerWidth < 768) {

    setTimeout(function () {
      // set image hardcoded sizes before doing masonry
      preload_masonry();
      do_masonry();
    }, 9);

    $el.find(dotb + "__image:last-child").find("img").load(function () {
      // when all images have loaded, unset the hardcoded sizes and recalculate
      setTimeout(function () {
        unset_preload_masonry();
        do_masonry();
      }, 10);
    });

    $(window).on('resize', function () {
      setTimeout(function () {
        do_masonry();
      }, 10);
    });
  }

  // TODO: mobile simplify and lazyload ondemand

  /* START: ondemand lazyloading */
  var img_el = $el.find(dotb + "__image");
  img_el.viewportChecker({
    classToAdd: 'visible',
    offset: 40,
    classToRemove: 'to-appear-disabled lazy',
    callbackFunction: function callbackFunction(elem, action) {
      if (action == "add" && !elem[0].hasAttribute("src")) {
        var elem_img = elem.find('img');
        elem_img.attr("src", elem_img.attr("data-src"));
        elem_img.imagesLoaded(function () {
          setTimeout(function () {
            do_masonry();
          }, 10);
        });
      };
    }
  });
  /* END: ondemand lazyloading */

  /* END: MASONRY */

  /* START: FANCY BOX */
  $el.find(dotb + "__image").fancybox({
    loop: true
  });
  /* END: FANCY BOX */
};

window.flo_block_gallery_view_1 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-gallery-view-1";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");
  var $b = $el.find(dotb);

  /* START: FOCUSED CLASS */
  $el.find(dotb + "__images").on("beforeChange click", function () {
    $b.addClass(b + "--is-focused");
  });

  $(window).on("scroll", function () {
    $b.removeClass(b + "--is-focused");
  });
  /* END: FOCUSED CLASS */
  if ($(window).width() < 768) {
    $el.find(dotb + "__image").first().on('load', function () {
      $(window).trigger('resize');
      $el.find(dotb).css('opacity', '1');
    });
  }
  $el.find(dotb + "__images")
  /* START: COUNT - SET COUNT */
  .on("init", function () {
    var $this = $(this);
    var count = $this.find(".slick-slide:not(.slick-cloned)").length;
    $el.find(dotb + "__counter-count").html(pad(count, 2));
  })
  /* END: COUNT - SET COUNT */

  /* START: COUNT - SET INDEX */
  .on("init afterChange", function () {
    var $this = $(this);
    var index = parseInt($this.find(".slick-current").attr("data-slick-index")) + 1;

    $el.find(dotb + "__counter-index").changeTextUI(pad(index, 2), "counter");
  })
  /* END: COUNT - SET INDEX */
  ;

  /* START: GALLERY VIEW LAYOUT A */
  if ($b.hasClass(b + "--gallery-view-layout-a")) {
    $el.find(dotb + "__images").slick({
      variableWidth: false,
      arrows: false,
      centerMode: true,
      slidesToShow: 1,
      lazyLoad: 'progressive',
      responsive: [{
        breakpoint: "767",
        settings: {
          variableWidth: false,
          centerMode: false,
          lazyLoad: 'progressive',
          adaptiveHeight: true
        }
      }]
    });
  }
  /* END: GALLERY VIEW LAYOUT A */

  /* START: GALLERY VIEW LAYOUT B */
  if ($b.hasClass(b + "--gallery-view-layout-b")) {
    $el.find(dotb + "__images").slick({
      variableWidth: true,
      arrows: false,
      centerMode: true,
      lazyLoad: 'progressive',
      responsive: [{
        breakpoint: "767",
        settings: {
          variableWidth: false,
          lazyLoad: 'progressive',
          centerMode: false,
          adaptiveHeight: true
        }
      }]
    });
  }
  /* END: GALLERY VIEW LAYOUT B */

  /* START: ARROWS */
  $el.find(dotb + "__arrow--prev").on("click", function () {
    $el.find(dotb + "__images").slick("slickPrev");
  });
  $el.find(dotb + "__arrow--next").on("click", function () {
    $el.find(dotb + "__images").slick("slickNext");
  });
  /* END: ARROWS */

  /* START: STICK TO TOP */
  if ($b.hasClass(b + "--stuck-to-top") && $(window).width() > 767) {
    // function set_placeholder_size() {
    //   setTimeout(function () {
    //     $el.find(dotb + "__placeholder").css("height", $el.find(dotb + "__content").height());
    //   }, 10);
    // }
    //
    // set_placeholder_size();
    //
    // $el.find(dotb + "__images").on("afterChange", function(){
    //   set_placeholder_size();
    // });
    $el.find(dotb + "__content").sticky();
  }
  /* END: STICK TO TOP */
};

window.flo_block_gallery_view_3 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-gallery-view-3";
  var dotb = "." + b;
  var $b = $el.find(dotb);

  /* START: STICKY TEXT AREA */
  if (window.innerWidth >= 768) {
    $el.find(dotb + "__text-area").stick_in_parent({
      offset_top: $(".flo-header--sticky").length ? 100 : 0
    });
  }
  /* END: STICKY TEXT AREA */

  /* START: LAZYLOADING */

  /* Start: Is On Screen Function */
  function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    var html = document.documentElement;
    var offset = 800;
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight + offset || html.clientHeight + offset) && rect.right <= (window.innerWidth || html.clientWidth);
  }
  /* End: Is On Screen Function */

  $(document).imagesLoaded(function () {

    $el.find(dotb + "__image:not([src])").each(function () {
      var image = $(this);

      $(window).on("scroll", function () {
        if (isInViewport(image[0])) {
          image.attr("src", image.attr("data-src"));
        }
      });
    });
  });

  /* END: LAZYLOADING */
};

window.flo_image_links_3 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-image-links-3";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  var slider = $el.find(dotb + "__image-links-slider");
  var arrow_left = $el.find(dotb + "__arrow--left");
  var arrow_right = $el.find(dotb + "__arrow--right");

  /* START: FEATURED SLIDESHOW SLIDER */
  slider.slick({
    arrows: false,
    slidesToShow: 1,
    fade: true,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        variableWidth: false
      }
    }]
  });
  /* END: FEATURED SLIDERSHOW SLIDER */

  /* START: ARROWS */
  arrow_left.click(function () {
    slider.slick('slickPrev');
  });

  arrow_right.click(function () {
    slider.slick('slickNext');
  });
  /* START: ARROWS */
};

window.flo_block_intro_block = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-intro-block";
  var dotb = "." + b;

  $(window).scroll(function () {
    $el.find(dotb + "__text-area").addClass(b + "__text-area--visible");
  });

  $el.find(dotb + "__scroll-down").click(function () {
    $('html, body').animate({
      scrollTop: eval($(dotb + "__image-area").offset().top - 200)
    }, 600);
  });
};

window.flo_block_listing_4 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-listing-4";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");
  var $b = $el.find(dotb);

  if ($(window).width() >= 768) {
    var do_sizing = function do_sizing() {
      var items = $el.find(dotb + "__item");
      items.each(function () {
        var width = $(this).width();
        $(this).css("height", width);
      });
    };

    setTimeout(function () {
      do_sizing();
    }, 10);

    $(window).on("resize", function () {
      do_sizing();
    });
  }
};

window.flo_block_listing_5 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-listing-5";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");
  var $b = $el.find(dotb);

  if ($(window).width() >= 768 && !$b.hasClass(b + "--masonry")) {
    var do_sizing = function do_sizing() {
      var items = $el.find(dotb + "__featured-image");
      items.each(function () {
        var width = $(this).width();
        $(this).css("height", width);
      });
    };

    setTimeout(function () {
      do_sizing();
    }, 10);

    $(window).on("resize", function () {
      do_sizing();
    });
  }

  if ($(window).width() >= 768 && $b.hasClass(b + "--masonry")) {
    var do_masonry = function do_masonry() {
      $b.masonry({
        columnWidth: '.grid-sizer',
        percentPosition: true
      });
    };

    setTimeout(function () {
      do_masonry();
    }, 10);

    $el.find(dotb + "__featured-image").load(function () {
      do_masonry();
    });
    $(window).on("resize", function () {
      do_masonry();
    });
  }
};

window.flo_block_listing_pagination_2 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-listing-pagination-2";
  var dotb = "." + b;
  var $button = $el.find(dotb + '__button');
  var listing_selector, $listing, grid_sizer, $grid_sizer;

  if ((typeof ajax_listing_selector === "undefined" ? "undefined" : _typeof(ajax_listing_selector)) && ajax_listing_selector.length) {
    listing_selector = '.' + ajax_listing_selector;
    $listing = $(listing_selector);
    if (ajax_listing_selector == "flo-block-listing-5") {
      $grid_sizer = $listing;
    } else {
      $grid_sizer = $listing.find(listing_selector + '__grid-sizer');
    }
  }

  $button.on('click', function () {
    $button.text($button.data('loading-text'));
    var scrollTop = $(window).scrollTop();
    var nextPageUrl = $(this).attr("data-next-href");

    fetch(nextPageUrl).then(function (response) {
      response.text().then(function (data) {
        var $new_page = $(data);
        var $new_listing = $new_page.find(listing_selector);
        var $new_data_next_href = $new_page.find(dotb + "__button").attr("data-next-href");
        var next_page_items = void 0;

        next_page_items = $($new_listing.find(listing_selector + '__item'));
        next_page_items.css('opacity', 0);

        function reinit_masonry() {
          if ($grid_sizer.length && $(window).width() > 767) {
            var tempHeight = $listing.height();
            $listing.css('min-height', tempHeight);
            $listing.masonry("destroy");
            $listing.masonry();
            $listing.css('min-height', '');
          }
          $listing.find(next_page_items).animate({
            opacity: 1
          }, 350);
        }

        $listing.append(next_page_items);

        // setTimeout(function () {
        //   $(window).trigger("resize");
        //   reinit_masonry();
        // }, 50);

        $listing.imagesLoaded(function () {
          $(window).trigger("resize");
          reinit_masonry();
        });

        if ($new_data_next_href) {
          $button.attr("data-next-href", $new_data_next_href);
          setTimeout(function () {
            $button.text($button.data('default-text'));
          }, 50);
        } else {
          $button.parents('.flo-block').fadeOut();
        }
      });
    });
    // .catch(err => {
    //   console.error("Error:", err.message);
    //   $button.parents('.flo-block').remove();
    // });
  });
};
window.newsletter_block_1 = function () {

  var $form = $(".flo-form--newsletter");

  if ($form.length) {
    // Start: Validation
    $form.parsley();
    // End: Validation

    // Start: Mailchimp Subscription
    var embed_code = unescape($form.parent().find(".embed_code").text()),
        $embed_code = $("<div>").html(embed_code);

    if (typeof $embed_code.find("form").attr("action") !== 'undefined') {
      var embed_form_action = $embed_code.find("form").attr("action").replace(/\\"/g, '');

      $form.attr("action", embed_form_action);
    } else {
      console.log('The mailchimp code is incorect');
    }

    // End: Mailchimp Subscription`
  }
};

window.newsletter_block_2 = function () {

  // use this in blocks like footer/header -  apears on all pages
  // var $el = $(el);
  // var $form = $el.parent().find(".flo-form--newsletter");

  // use this in blocks other than footer/header
  var $form = $(".flo-form--newsletter");

  if ($form.length) {
    // Start: Validation
    $form.parsley();
    // End: Validation

    // Start: Mailchimp Subscription
    var embed_code = unescape($form.parent().find(".embed_code").text()),
        $embed_code = $("<div>").html(embed_code);

    if (typeof $embed_code.find("form").attr("action") !== 'undefined') {
      var embed_form_action = $embed_code.find("form").attr("action").replace(/\\"/g, '');

      $form.attr("action", embed_form_action);
    } else {
      console.log('The mailchimp code is incorect');
    }

    // End: Mailchimp Subscription`
  }
};

window.flo_numeric_details = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-numeric-details";
  var dotb = "." + b;

  var willAnimate = $el.find(dotb).attr("data-animnum");
  if (willAnimate) {
    var animTargets = $el.find(dotb + "__numeric-detail-number");
    if (animTargets && animTargets.length) {
      var delayVal = 0;
      var animDuration = $el.find(dotb).attr("data-anim-ms");
      $(window).on("startViewportChecker", function () {
        animTargets.viewportChecker({
          classToAdd: 'counted',
          repeat: false,
          offset: 100,
          invertBottomOffset: false,
          callbackFunction: function callbackFunction(number, action) {
            // wrap whole function in settimeout to avoid stuttering
            setTimeout(function () {
              number.delay(delayVal).animateNumber({ number: parseInt(number.attr("data-num")) }, parseInt(animDuration), 'linear', function () {
                if (number.hasClass(b + "__plus-will-show")) number.addClass(b + "__plus-shown");
              }, delayVal += 150);
            });
          }
        });
      }).trigger("startViewportChecker");
    }
  }
};
window.flo_block_numeric_details = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-press";
  var dotb = "." + b;
  var elements = $(dotb + "__slides").attr("data-elements");
  elements = parseInt(elements);

  $el.find(dotb + "__slides").slick({
    dots: false,
    infinite: true,
    slidesToShow: elements,
    slidesToScroll: 1,
    adaptiveHeight: false,
    lazyLoad: 'ondemand',
    centerMode: true,
    variableWidth: false,
    nextArrow: $el.find(dotb + "__arrow--next"),
    prevArrow: $el.find(dotb + "__arrow--prev"),
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }]
  });
};
window.flo_block_slideshow_2 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-slideshow-2";
  var dotb = "." + b;
  var $variableWidth = true;
  var $adaptiveHeight = false;
  var $centerMode = true;

  if ($el.find(dotb).hasClass(b + '__height-auto')) {
    $variableWidth = false;
    $adaptiveHeight = true;
    $centerMode = false;
  }

  $el.find(dotb + "__slides")

  /* START: ARROWS */
  .on("init", function () {
    if ($el.find(dotb + "__slides .slick-slide:not(.slick-cloned)").length <= 1) {
      $el.find(dotb + "__arrows").remove();
    } else {
      $el.find(dotb + "__arrow--prev").on("click", function () {
        $el.find(dotb + "__slides").slick("slickPrev");
      });
      $el.find(dotb + "__arrow--next").on("click", function () {
        $el.find(dotb + "__slides").slick("slickNext");
      });
    }
  })
  /* END: ARROWS */

  /* START: TRANSFORM DOTS */
  .on("init", function () {
    setTimeout(function () {
      $el.find(dotb + "__dots button").each(function () {
        $(this).text(pad($(this).text(), 2));
      });
    }, 10);
  })
  /* END: TRANSFORM DOTS */

  .trigger("floInit", {
    dots: true,
    appendDots: $el.find(dotb + "__dots"),
    centerMode: true,
    variableWidth: true,
    responsive: [{
      breakpoint: "767",
      settings: {
        variableWidth: $variableWidth,
        centerMode: $centerMode,
        adaptiveHeight: $adaptiveHeight
      }
    }]
  });
};

window.flo_block_slideshow_1 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-slideshow-1";
  var dotb = "." + b;

  $el.find(dotb + "__slides")

  /* START: ARROWS */
  .on("init", function () {
    if ($el.find(dotb + "__slides .slick-slide:not(.slick-cloned)").length <= 1) {
      $el.find(dotb + "__arrow").remove();
    } else {
      $el.find(dotb + "__arrow--prev").click(function () {
        $el.find(dotb + "__slides").slick("slickPrev");
      });
      $el.find(dotb + "__arrow--next").click(function () {
        $el.find(dotb + "__slides").slick("slickNext");
      });
    }
  })
  /* END: ARROWS */

  /* START: HEADER AREA */
  .on("elementsColorLight", function () {
    $el.find(".flo-header__logo").addClass("flo-header__logo--is-light");
    if ($(window).width() < 768) {
      setTimeout(function () {
        $el.find(".flo-header-mobile__logo").addClass("flo-header-mobile__logo--light");
      });
    }
  }).on("elementsColorDark", function () {
    $el.find(".flo-header__logo").removeClass("flo-header__logo--is-light");
    if ($(window).width() < 768) {
      // setTimeout(function(){
      $el.find(".flo-header-mobile__logo").removeClass("flo-header-mobile__logo--light");
      // })
    }
  })
  /* END: HEADER AREA */

  /* START: COUNT - SET COUNT */
  .on("init", function () {
    var $this = $(this);
    var count = $this.find(".slick-slide:not(.slick-cloned)").length;
    $el.find(dotb + "__counter-count").html(pad(count, 2));
  })
  /* END: COUNT - SET COUNT */

  /* START: COUNT - SET INDEX */
  .on("init afterChange", function () {
    var $this = $(this);
    var index = parseInt($this.find(".slick-current").attr("data-slick-index")) + 1;

    $el.find(dotb + "__counter-index").changeTextUI(pad(index, 2), "counter");
  })
  /* END: COUNT - SET INDEX */

  /* START: TEXT AREA  */
  .on("init beforeChange", function (e, slick, currentSlide, nextSlide) {
    var $slick = $(this);

    var current_slide;
    if (e.type == "beforeChange") {
      current_slide = $slick.find(".slick-slide[data-slick-index='" + nextSlide + "']");
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
    if ((new_title.trim() !== "" || new_text.trim() !== "" || new_bottom_label.trim() !== "") && overlay_color.trim() !== "" && overlay_opacity.trim() !== "") {

      $el.find(dotb + "__content-wrap").css("background-color", "rgba(" + b_hex2rgba(overlay_color, overlay_opacity) + ")");
    } else {
      $el.find(dotb + "__content-wrap").css("background-color", "");
    }
  })
  /* END: TEXT AREA  */

  .trigger("floInit");
};

window.flo_testimonials_1 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-testimonials-1";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  var slider = $el.find(dotb + "__testimonials-slider");
  var arrow_left = $el.find(dotb + "__arrow--left");
  var arrow_right = $el.find(dotb + "__arrow--right");

  /* START: FEATURED SLIDESHOW SLIDER */
  slider.slick({
    arrows: false,
    slidesToShow: 1,
    fade: true,
    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
        variableWidth: false
      }
    }]
  });
  /* END: FEATURED SLIDERSHOW SLIDER */

  /* START: ARROWS */
  arrow_left.click(function () {
    slider.slick('slickPrev');
  });

  arrow_right.click(function () {
    slider.slick('slickNext');
  });
  /* START: ARROWS */
};

window.flo_comments = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-comments";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  if (window.innerWidth >= 767) {
    $el.find(dotb + "__form-wrap").stick_in_parent({
      offset_top: 150
    });
  }
};

$(function () {
  $(".flo-generic-fancybox-video").fancybox({
    iframe: {
      preload: false
    }
  });
});

window.flo_footer_copyrights_area = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-footer-copyrights-area";
  var dotb = "." + b;

  $el.find(dotb + "__back-to-top").click(function () {
    $("html, body").animate({ scrollTop: "0" });
  });
};

window.footer_miniblock_signup = function () {

  var $form = $(".flo-form--newsletter");

  if ($form.length) {
    // Start: Validation
    $form.parsley();
    // End: Validation

    // Start: Mailchimp Subscription
    var embed_code = unescape($form.parent().find(".embed_code").text()),
        $embed_code = $("<div>").html(embed_code);

    if (typeof $embed_code.find("form").attr("action") !== 'undefined') {
      var embed_form_action = $embed_code.find("form").attr("action").replace(/\\"/g, '');

      $form.attr("action", embed_form_action);
    } else {
      console.log('The mailchimp code is incorect');
    }

    // End: Mailchimp Subscription`
  }
};

$(document).on("floInit", ".flo-generic-slides", function (e, slickAdditionalOptions) {
  "use strict";

  var $el = $(this);
  var b = "flo-generic-slides";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  /* START: MERGE DEFAULT SLICK OPTIONS WITH ADDITIONAL ONES */
  var slickOptions = {
    "dots": "false",
    "arrows": "false",
    "cssEase": "ease-in-out"
  };
  for (var attrname in slickAdditionalOptions) {
    slickOptions[attrname] = slickAdditionalOptions[attrname];
  }
  /* END: MERGE DEFAULT SLICK OPTIONS WITH ADDITIONAL ONES */

  $el
  /* START: VIDEO BACKGROUND */
  .on("init reInit afterChange", function () {
    // Start: Pause all videos
    $el.find(dotb + "__slide--video_slide:not(.slick-current)").find("video").each(function () {
      this.pause();
    });
    // End: Pause all videos
    var active_slide__$ = $el.find(".slick-current");
    if (active_slide__$.hasClass(b + "__slide--video_slide")) {
      var video_container = active_slide__$.find(dotb + "__slide-background-video");
      var video = video_container.find("video")[0];

      video.play();
    }
  })
  /* END: VIDEO BACKGROUND */

  /* START: VIDEO EMBED */
  .on("init", function () {
    var $slides = $(this);
    $el.find("." + b + "__slide--image_and_video_embed").each(function () {
      var active_slide__$ = $(this);
      var video_embed_host = parent;
      var video_button = active_slide__$.find(".flo-hero-video-embed__button");
      var video_container = active_slide__$.find(".flo-hero-video-embed__container");
      var embed_code = active_slide__$.attr("data-embed-code");

      video_button.on("click", function () {
        if (!video_embed_host.hasClass("video-is-playing")) {
          video_container.html(unescape(embed_code));
          video_embed_host.addClass("video-is-playing");

          $slides.slick("slickSetOption", "autoplay", false, true);
        } else if (video_embed_host.hasClass("video-is-playing")) {
          video_container.html("");
          video_embed_host.removeClass("video-is-playing");

          var autoplay = $slides.attr("data-autoplay") == "true" ? true : false;
          $slides.slick("slickSetOption", "autoplay", autoplay, true);
        }
      });
    });
  }).on("beforeChange", function () {
    var active_slide__$ = $(this).find(".slick-current");
    var video_embed_host = parent;

    /* START: VIDEO EMBED CLOSE ON SLIDE CHANGE */
    if (video_embed_host.hasClass("video-is-playing")) {
      active_slide__$.find(".flo-hero-video-embed__button").click();
    }
    /* END: VIDEO EMBED CLOSE ON SLIDE CHANGE */
  })
  /* END: VIDEO EMBED */

  /* START: CHANGE LOGO BASED ON SLIDE ELEMENTS COLOR */
  .on("init afterChange", function () {
    var $this = $(this);
    var $currentSlide = $this.find(".slick-current");
    var elements_color = $currentSlide.attr("data-elements-color");
    var color_brightness = is_color_bright(elements_color);

    if (color_brightness) {
      parent.find(dotb + "__logo").addClass(b + "__logo--light");

      parent.find(".flo-header__logo").addClass("flo-header__logo--light");

      setTimeout(function () {
        parent.find(".is-main .flo-header-mobile__logo").addClass("flo-header-mobile__logo--light");
      });
    } else {
      parent.find(dotb + "__logo").removeClass(b + "__logo--light");

      parent.find(".flo-header__logo").removeClass("flo-header__logo--light");

      setTimeout(function () {
        parent.find(".is-main .flo-header-mobile__logo").removeClass("flo-header-mobile__logo--light");
      });
    }
  })
  /* END: CHANGE LOGO BASED ON SLIDE ELEMENTS COLOR */

  /* START: FIRE EVENTS ON LIGHT OR DARK ELEMENTS COLOR */
  .on("init afterChange", function () {
    var $this = $(this);
    var $currentSlide = $this.find(".slick-current");
    var elements_color = $currentSlide.attr("data-elements-color");
    var color_brightness = is_color_bright(elements_color);

    if (color_brightness) {
      $this.trigger("elementsColorLight", elements_color);
    } else {
      $this.trigger("elementsColorDark", elements_color);
    }
  })
  /* END: FIRE EVENTS ON LIGHT OR DARK ELEMENTS COLOR */

  /* START: INITIALIZATION */
  .slick(slickOptions)
  /* END: INITIALIZATION */
  ;
});

$(function () {
  var header_mobile = $(".flo-header-mobile");

  $(".flo-header-mobile").appendTo(".flo-block:first header");
  $(".flo-header-mobile").css("visibility", "visible");

  /* START: REMOVE ALL BUT FIRST */
  // $(".flo-header-mobile:not(:first)").remove();
  /* END: REMOVE ALL BUT FIRST */

  /* START: STICKY */
  $(".flo-header-mobile").first().addClass("not-sticky");
  $(".flo-header-mobile.sticky").first().on("sticky-end", function () {
    $(this).addClass("not-sticky");
    setTimeout(function () {
      $(this).sticky("update");
    }, 400);
  }).on("sticky-start", function () {
    $(this).removeClass("not-sticky");
  }).sticky({
    zIndex: 1000,
    className: "is-sticky",
    wrapperClassName: "flo-header-mobile-sticky-wrapper"
  });
  /* END: STICKY */
});

window.flo_mobile_menu = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-mobile-menu";
  var dotb = "." + b;

  var opened_class = "body--flo-mobile-menu-popup-opened";
  var closed_class = "body--flo-mobile-menu-popup-closed";
  var type_b_layout = "body--flo-mobile-menu-popup-type-b";

  /* START: OPEN POPUP */
  $(".flo-header-mobile__menu-trigger").on("click", function () {
    $("body").addClass(opened_class).removeClass(closed_class);
    //change page properties for popup B
    if ($el.hasClass(b + "__popup-type-b")) {
      $("body").addClass(type_b_layout);
      $(".flo_page_wrap").css("height", "100vh");
      setTimeout(function () {
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
  $el.find(dotb + "__close").on("click", function () {
    $("body").removeClass(opened_class).addClass(closed_class);

    // revert page properties
    if ($el.hasClass(b + "__popup-type-b")) {
      $("body").removeClass(type_b_layout);
      $(".flo_page_wrap").css("height", "100vh");
      setTimeout(function () {
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
  $el.find(dotb + "__menu > li.menu-item-has-children > a").append("<span class='flo-mobile-menu__menu-dropdown-toggle'><i class='flo-icon-right-dir'></i></span>");

  $el.on("click", dotb + "__menu-dropdown-toggle", function (e) {
    e.preventDefault();
    console.log(123);
    $(this).parents("li").toggleClass("children-visible");
    $(this).parent().siblings(".sub-menu").slideToggle("slow");
  });
  /* END: TYPE A -> ADD DROPDOWN TOGGLES TO EVERY ITEM WITH DROPDOWN */
};

window.flo_block_topbar = function (el) {
  'use strict';

  var $el = $(el);
  var b = el.children[0].querySelector('div').classList[0];
  var dotb = '.' + b;
  var closeTrigger = $el.find(dotb + '__close');
  var leCookie = floGetCookie('topbar_dismissed');

  if (!leCookie && $el.find(dotb).css('display') == 'none') {
    $el.find(dotb).slideDown('fast');
    closeTrigger.on('click', function (event) {
      createCookie('topbar_dismissed', true, 5);
      $el.find(dotb).slideUp('500', function () {
        return $el.remove();
      });
    });
  } else {
    $el.remove();
  }
};
window.flo_header_type_j = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-header";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");
  var $b = $el.find(dotb);

  /* START: POPUP MENU TRIGGER */
  $el.find(dotb + "__popup-menu-trigger").click(function () {
    $el.find(dotb + "__popup-menu-wrap").toggleClass(b + "__popup-menu-wrap--open");
  });
  /* END: POPUP MENU TRIGGER */
};

window.flo_header_block = function (el) {
  var header = $(el);
  var flo_header__class = "flo-header";
  var $flo_header = $("." + flo_header__class);
  var $header = $(header).find($flo_header);

  /* START: STICKY HEADER */
  var is_not_sticky_class = "is-not-sticky";
  var header_sticky_class = "is-sticky";

  $($header).addClass(is_not_sticky_class);
  if ($(header).hasClass('flo-header--sticky') && window.innerWidth > 768) {
    $($header).first().on("sticky-start", function () {
      $(this).removeClass(is_not_sticky_class);
      header.addClass(header_sticky_class);
    }).on("sticky-end", function () {
      $(this).addClass(is_not_sticky_class);
      header.removeClass(header_sticky_class);
      setTimeout(function () {
        $(this).sticky("update");
      }, 600);
    }).sticky({
      zIndex: 9999,
      className: "is-sticky"
    });
  }
  /* END: STICKY HEADER*/

  /* START: DROPDOWN */
  if (window.outerWidth >= 768) {
    var dropdown_elements = new Foundation.DropdownMenu($(".menu-item-has-children ul"));
  }
  /* END: DROPDOWN */

  /* START: LOGO CENTER - SPLIT MENU IN HALF */
  if ($(".flo-header__menu-donor").length) {

    /* WPML split elements*/
    if ($(".menu-item").hasClass("wpml-ls-item") && $(".flo-header").hasClass('flo-header--type-c') && $(window).width() >= 768) {
      var wpml_menu_items = $(".flo-header__menu-items .wpml-ls-item");
      var wpml_container = document.createElement("ul");
      wpml_container.className = "flo-header--wpml-elements";
      $.each(wpml_menu_items, function (index, el) {
        wpml_menu_items = this;
        $(wpml_menu_items).appendTo(wpml_container);
      });
      $(wpml_container).appendTo(".flo-header--type-c");
    }

    var $menu_donor = $(header).find(".flo-header__menu-donor"),
        $menu_donor_ul = $menu_donor.find("> div > ul"),
        $menu_donor_first_level = $menu_donor_ul.children("li"),
        $menu_left = $(header).find(".flo-header__menu--left > div > ul"),
        $menu_right = $(header).find(".flo-header__menu--right > div > ul"),
        $search_form = $menu_donor.find("div[class*='__search-wrap']");

    $menu_donor_first_level.each(function (index) {
      var $item = $(this),
          length = $menu_donor_first_level.length;
      if (index < length / 2) {
        $menu_left.append($item);
      }
      if (index >= length / 2) {
        $menu_right.append($item);
      }
      if ($search_form.length) {
        $menu_right.append($search_form);
      }
      if (index == length - 1) {
        $menu_donor.remove();
      }
    });
  }
  /* END: LOGO CENTER - SPLIT MENU IN HALF */

  /* START: SEARCH TRIGGER */
  $(".flo-header__search-trigger").click(function () {
    $(this).parents(".flo-header__search-wrap").toggleClass("flo-header__search-wrap--open");
  });
  /* END: SEARCH TRIGGER */

  /* START: ADD ZINDEX TO THE BLOCK WITH HEADER INSIDE */
  $(".flo-block > .flo-block__container > header").parents(".flo-block").css("z-index", "3");
  /* END: ADD ZINDEX TO THE BLOCK WITH HEADER INSIDE */
};
$(".flo-reveal").each(function () {
  var reveal = this;
  var $reveal = $(reveal);
  var id = $reveal.attr("id");
  var validation = reveal.hasAttribute("id") && reveal.hasAttribute("data-flo-reveal");

  if (validation) {
    // console.log("Flo Reveal: Reveal #" + id + " has passed validation.");

    // Start: Overlay
    // Start: Overlay Styles
    var overlay__styles = [
    // Start: background-color
    reveal.hasAttribute("data-overlay-color") ? "background-color: " + $reveal.attr("data-overlay-color") + ";" : "",
    // End: background-color
    // Start: opacity
    reveal.hasAttribute("data-overlay-opacity") ? "opacity: " + $reveal.attr("data-overlay-opacity") + ";" : ""
    // End: opacity
    ].join("");
    overlay__styles = overlay__styles != "" ? " style='" + overlay__styles + "' " : "";
    // End: Overlay Styles

    // Start: Overlay Render
    $reveal.before("<div class='flo-reveal-overlay'" + overlay__styles + " id='" + id + "'></div>");
    // End: Overlay Render

    var overlay__return = function overlay__return() {
      return $("#" + id + ".flo-reveal-overlay");
    };
    // Start: Overlay

    // Start: Disappear Events
    $reveal.on("flo-reveal__close", function () {
      var $overlay = overlay__return();

      $reveal.removeClass("flo-reveal--visible");
      $overlay.removeClass("flo-reveal-overlay--visible");
      $("body").css("overflow", "");
    });
    // End: Disappear Events

    // Start: Appear
    $("[data-open='" + id + "']").on("click", function () {
      var $overlay = overlay__return();
      var trigger = $(this);
      var trigger__position_on_screen = trigger.offset().left <= window.innerWidth / 2 ? "left" : "right";

      $reveal.removeClass("flo-reveal--ready");
      $reveal.attr("data-initial-position", trigger__position_on_screen);
      $("body").css("overflow", "hidden");

      setTimeout(function () {
        $reveal.addClass("flo-reveal--ready");
      });
      setTimeout(function () {
        $reveal.addClass("flo-reveal--visible");
        $overlay.addClass("flo-reveal-overlay--visible");
      });
    });
    // End: Appear

    // Start: Disappear

    // By clicking the close button
    $reveal.find("[data-close]").on("click", function () {
      $reveal.trigger("flo-reveal__close");
    });

    // By pressing escape
    $(document).on("keyup", function (e) {
      if (e.keyCode == 27) {
        $reveal.trigger("flo-reveal__close");
      }
    });
    // By clicking on the overlay
    overlay__return().on("click", function (e) {
      $reveal.trigger("flo-reveal__close");
    });
    // End: Disappear
  }
});

window.flo_slideshow = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-slideshow";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  /* START: HIDE COUNTER AND ARROWS IF THERE IS ONLY ONE SLIDE */
  if ($el.find(dotb + "__slides " + dotb + "__slide:not(.slick-cloned)").length == 1) $(dotb).addClass(b + "--one-slide");
  /* END: HIDE COUNTER AND ARROWS IF THERE IS ONLY ONE SLIDE */

  /* START: TRIGGER GRADIENT ON HOVER ON SPECIFIC ELEMENTS */
  if (window.innerWidth > 1024) {
    $(dotb + "__title-area").add(".flo-hero-video-embed__button").add(".flo-slideshow__featured-link").mouseenter(function () {
      $(el).find(dotb + "__slide.slick-current").addClass("gradient-visible");
    }).mouseleave(function () {
      $(el).find(dotb + "__slide.slick-current").removeClass("gradient-visible");
    });
  }
  /* END: TRIGGER GRADIENT ON HOVER ON SPECIFIC ELEMENTS */
};

window.flo_slideshow__layout__type_a = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-slideshow";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  /* START: HIDE ARROW ON SPECIFIC HOVER */
  $el.find([".flo-hero-video-embed__button", dotb + "__title-area"].join(",")).mouseenter(function () {
    $el.find(dotb + "__arrow-next").addClass("vertical")
    // .hide()
    ;
  }).mouseleave(function () {
    $el.find(dotb + "__arrow-next").removeClass("vertical")
    // .show()
    ;
  });
  /* END: HIDE ARROW ON SPECIFIC HOVER */

  $el.find(dotb + "__slides")
  /* START: ARROW */
  .on("mousemove", function (e) {
    if (window.innerWidth >= 768) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;

      var arrow = $el.find(dotb + "__arrow-next");

      arrow.css({
        "left": x,
        "top": y
      });

      var width = $(this).width();

      if (x <= width / 2) {
        arrow.addClass("inverted");
      } else {
        arrow.removeClass("inverted");
      }
    }
  }).on("click", function (e) {

    if (window.innerWidth >= 768 && !$(e.target).is("[class*=flo-hero-video-embed__button]") && !$(e.target).is("[class*=flo-slideshow__title-area]")) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      var width = $(this).width();

      if (x <= width / 2) {
        $(this).slick("slickPrev");
      } else {
        $(this).slick("slickNext");
      }
    }
  })
  /* END: ARROW */
  ;
};

window.flo_slideshow__layout__type_b = function (el) {
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

    $el.find(dotb + "__spacer").css("height", headerHeight + "px");

    $el.find(dotb + "__slides").add(dotb + "__background").add(dotb + "__slide-main-wrap").add(dotb + "__slide-image").css("height", "calc(100vh - " + headerHeight + "px)");

    $el.find(dotb + "__background").css("top", headerHeight + "px");
  }

  setHeights();

  $(window).on("resize", function () {
    setHeights();
  });
  /* END: SET PROPER HEIGHTS FOR THE SPACER AND THE SLIDES */

  /* START: SLIDES */
  var slides = $el.find(dotb + "__slides");

  slides
  /* START: VIDEO BACKGROUND */
  .on("init reInit afterChange", function () {
    // Start: Pause all videos
    $el.find("." + b + "__slide--video_slide:not(.slick-current)").find("video").each(function () {
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
  .on("init afterChange", function () {
    $el.find(dotb + "__background").css("background-color", $el.find(".slick-current").attr("data-slide-bg"));
  })
  /* END: CHANGE BACKGROUND COLOR */

  /* START: COUNT - SET COUNT */
  .on("init", function () {
    var $this = $(this);
    var count = $this.find(".slick-slide:not(.slick-cloned)").length;
    count = pad(count, 2);
    $el.find(dotb + "__counter-count").html(count);
  })
  /* END: COUNT - SET COUNT */

  /* START: COUNT - SET INDEX */
  .on("init afterChange", function () {
    var $this = $(this);
    var index = parseInt($this.find(".slick-current").attr("data-slick-index")) + 1;
    index = pad(index, 2);

    $el.find(dotb + "__counter-index").changeTextUI(index, "counter");
  })
  /* END: COUNT - SET INDEX */

  /* START: VIDEO EMBED */
  .on("init", function () {
    var $slides = $(this);
    $el.find("." + b + "__slide--image_and_video_embed").each(function () {
      var active_slide__$ = $(this);
      var video_embed_host = active_slide__$;
      var video_button = active_slide__$.find(".flo-hero-video-embed__button");
      var video_container = active_slide__$.find(".flo-hero-video-embed__container");
      var embed_code = active_slide__$.attr("data-embed-code");

      video_button.on("click", function () {
        if (!video_embed_host.hasClass("video-is-playing")) {
          video_container.html(unescape(embed_code));
          video_embed_host.addClass("video-is-playing");

          $slides.slick("slickSetOption", "autoplay", false, true);
        } else if (video_embed_host.hasClass("video-is-playing")) {
          video_container.html("");
          video_embed_host.removeClass("video-is-playing");

          var autoplay = $slides.attr("data-autoplay") == "true" ? true : false;
          $slides.slick("slickSetOption", "autoplay", autoplay, true);
        }
      });
    });
  }).on("beforeChange", function () {
    var active_slide__$ = $(this).find(".slick-current");
    var video_embed_host = active_slide__$;

    /* START: VIDEO EMBED CLOSE ON SLIDE CHANGE */
    if (video_embed_host.hasClass("video-is-playing")) {
      active_slide__$.find(".flo-hero-video-embed__button").click();
    }
    /* END: VIDEO EMBED CLOSE ON SLIDE CHANGE */
  })
  /* END: VIDEO EMBED */

  .slick({
    dots: false,
    // arrows: false,
    cssEase: "ease-in-out",
    speed: "400",
    variableWidth: true,
    nextArrow: $el.find(dotb + "__arrow--next"),
    prevArrow: $el.find(dotb + "__arrow--prev")
  });
  /* END: SLIDES */
};

window.flo_slideshow__layout__type_c = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-slideshow";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  /* START: START SET HEIGHTS FOR MOBILE */
  if (window.innerWidth < 768) {
    var setHeights = function setHeights() {
      var headerHeight = parent.find(".flo-block__header").height() / 16 + "rem";
      if (!headerHeight) {
        headerHeight = 0;
      }
      var slideSelectorHeight = 80 / 16;
      var slideSelectorBottomMargin = 20 / 16;

      parent.find(dotb).css({
        "padding-top": headerHeight,
        "padding-bottom": slideSelectorHeight + slideSelectorBottomMargin + "rem"
      });
    };

    setHeights();

    $(window).on("resize", function () {
      setHeights();
    });
  }
  /* END: START SET HEIGHTS FOR MOBILE */

  /* START: SLIDE SELECTOR */
  $el.find(dotb + "__slide-selectors").on("init", function () {
    var $this = $(this);
    setTimeout(function () {
      parent.find(dotb + "__slides").slick("slickSetOption", "asNavFor", $this);
    }, 10);
  }).slick({
    variableWidth: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    slidesToShow: 1,
    slidesToScroll: 3,
    asNavFor: parent.find(dotb + "__slides")
  });
  /* END: SLIDE SELECTOR */

  /* START: RIGHT BAR */

  /* START: ADD CLASS TO BODY TO HELP MODIIFY THE HEADER POPUP */
  $("body").addClass("body--flo-header__popup--for-slideshow-type-c");
  /* END: ADD CLASS TO BODY TO HELP MODIIFY THE HEADER POPUP */

  /* START: SEARCH TOGGLE -> CLICK -> FOCUS ON SEARCH INPUT WHEN POPUP OPENS */
  $el.find(dotb + "__right-bar-search-trigger").click(function () {
    $(".flo-header-popup__search-input").focus();
  });
  /* END: SEARCH TOGGLE -> CLICK -> FOCUS ON SEARCH INPUT WHEN POPUP OPENS */

  /* END: RIGHT BAR */
};

window.flo_slideshow__slides = function (el) {
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
  .on("init reInit afterChange", function () {
    // Start: Pause all videos
    $el.find("." + b + "__slide--video_slide:not(.slick-current)").find("video").each(function () {
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
  .on("init afterChange", function () {
    var $this = $(this);
    var $currentSlide = $this.find(".slick-current");
    var elements_color = $currentSlide.attr("data-elements-color");
    var color_brightness = is_color_bright(elements_color);

    if (color_brightness) {
      dotblock_parent.find(dotb + "__logo").addClass(b + "__logo--light");

      dotblock_parent.find(".flo-header__logo").addClass("flo-header__logo--light");

      setTimeout(function () {
        dotblock_parent.find(".is-main .flo-header-mobile__logo").addClass("flo-header-mobile__logo--light");
      });
    } else {
      dotblock_parent.find(dotb + "__logo").removeClass(b + "__logo--light");

      dotblock_parent.find(".flo-header__logo").removeClass("flo-header__logo--light");

      setTimeout(function () {
        dotblock_parent.find(".is-main .flo-header-mobile__logo").removeClass("flo-header-mobile__logo--light");
      });
    }
  })
  /* END: CHANGE LOGO BASED ON SLIDE ELEMENTS COLOR */

  /* START: CHANGE COLOR BASED ON SLIDE COLOR */
  .on("init afterChange", function () {
    var elements_color = $(this).find(".slick-current").attr("data-elements-color");

    var css = [];

    css.push([

    /* START: HEADER - A */
    block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__menu > div > ul > .menu-item, ", block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__menu > div > ul > .menu-item a:after, ", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__logo, ", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__menu > div > ul > .menu-item > a, ", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__menu-trigger, ", block_parent_with_id + ".flo-slideshow-block--type-a .is-main.not-sticky.flo-header-mobile .flo-header__search-trigger, ", block_parent_with_id + ".flo-slideshow-block--type-a .is-main.not-sticky.flo-header-mobile .flo-header-mobile__logo, ", block_parent_with_id + ".flo-slideshow-block--type-a .is-main.not-sticky.flo-header-mobile .flo-header-mobile__menu-trigger, ", block_parent_with_id + ".flo-slideshow-block--type-a .is-main.not-sticky.flo-header-mobile .flo-header-mobile__search-trigger ", "{", "color: " + elements_color + "!important;", "border-color: " + elements_color + ";", "}", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__menu-item-search:before, ", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__menu-trigger-item ", "{ ", "background: " + elements_color + "; ", "} ",

    /* START: HEADER FEATURED ITEM */
    block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__featured-link ", "{", "color: " + elements_color + "!important;", "}",
    /* END: HEADER FEATURED ITEM */

    /* START: HEADER COLUMNS */
    block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__column-top-wrap ", "{", "border-color: " + elements_color + "!important;", "}",
    /* END: HEADER COLUMNS */

    /* START: HEADER SEARCH */
    block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-trigger, ", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-form-input, ", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-form-submit ", "{", "color: " + elements_color + "!important;", "}", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-form:before, ", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__search-form:after ", "{", "background-color: " + elements_color + "!important;", "}",
    /* END: HEADER SEARCH */

    /* START: SOCIAL LINKS */
    block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__social-links a:before, ", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__social-links-trigger,", block_parent_with_id + ".flo-slideshow-block--type-a header .is-not-sticky .flo-header__lang-switch", "{", "color: " + elements_color + "!important;", "}",
    /* END: SOCIAL LINKS */

    /* END: HEADER - A */

    /* START: PLAY BUTTON */
    block_selector_with_id + " .flo-hero-video-embed__button", "{", "color: " + elements_color + ";", "border-color: " + elements_color + ";", "}",
    /* END: PLAY BUTTON */

    /* START: COUNTER - A*/
    block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__counter-count, ", block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__counter-index", "{ ", "color: " + elements_color + "!important; ", "} ", block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__counter-separator", "{ ", "background-color: " + elements_color + "; ", "} ",
    /* END: COUNTER - A */

    /* START: TITLE AREA - A */
    block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__title-area-pretitle, ", block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__title-area-title", "{ ", "color: " + elements_color + "!important; ", "} ", block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__title-area-pretitle:before ", "{ ", "background-color: " + elements_color + "; ", "} ",
    /* END: TITLE AREA - A */

    /* START: ARROW NEXT - A */
    block_parent_with_id + ".flo-slideshow-block--type-a " + dotb + "__arrow-next ", "{ ", "color: " + elements_color + "!important; ", "} ",
    /* END: ARROW NEXT - A */

    /* START: FEATURED LINK - A, C */
    block_parent_with_id + " " + dotb + "__featured-link-pretitle, ", block_parent_with_id + " " + dotb + "__featured-link-title", "{ ", "color: " + elements_color + "!important; ", "} ", block_parent_with_id + " " + dotb + "__featured-link-divider", "{ ", "background-color: " + elements_color + "; ", "} ",
    /* END: FEATURED LINK - A, C */

    /* START: TOP AREA - C */
    block_parent_with_id + ".flo-slideshow-block--type-c " + dotb + "__top-area-logo .flo-header__logo, ", block_parent_with_id + ".flo-slideshow-block--type-c " + dotb + "__top-area-social-links a:before", "{ ", "color: " + elements_color + "!important;", "} ",
    /* END: TOP AREA - C */

    /* START: SLIDE SELECTOR - C */
    block_parent_with_id + ".flo-slideshow-block--type-c " + dotb + "__slide-selector-pretitle:before", "{ ", "background-color: " + elements_color + "; ", "} ", block_parent_with_id + ".flo-slideshow-block--type-c " + dotb + "__slide-selector-pretitle", "{ ", "color: " + elements_color + "; ", "} "
    /* END: SLIDE SELECTOR - C */

    ].join("\n"));

    css = css.join("\n");

    if ($("style.flo-slideshow__slides--" + block_id).length) {
      $("style.flo-slideshow__slides--" + block_id).html(css);
    } else {
      $("head").append($(" <style class='flo-slideshow__slides--" + block_id + " '> ").html(css));
    }
  })
  /* END: CHANGE COLOR BASED ON SLIDE COLOR */

  /* START: VIDEO EMBED */
  .on("init", function () {
    var $slides = $(this);
    $el.find("." + b + "__slide--image_and_video_embed").each(function () {
      var active_slide__$ = $(this);
      var video_embed_host = dotblock_parent;
      var video_button = active_slide__$.find(".flo-hero-video-embed__button");
      var video_container = active_slide__$.find(".flo-hero-video-embed__container");
      var embed_code = active_slide__$.attr("data-embed-code");

      video_button.on("click", function () {
        if (!video_embed_host.hasClass("video-is-playing")) {
          video_container.html(unescape(embed_code));
          video_embed_host.addClass("video-is-playing");

          $slides.slick("slickSetOption", "autoplay", false, true);
        } else if (video_embed_host.hasClass("video-is-playing")) {
          video_container.html("");
          video_embed_host.removeClass("video-is-playing");

          var autoplay = $slides.attr("data-autoplay") == "true" ? true : false;
          $slides.slick("slickSetOption", "autoplay", autoplay, true);
        }
      });
    });
  }).on("beforeChange", function () {
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
  .on("init", function () {
    var $this = $(this);
    var count = $this.find(".slick-slide:not(.slick-cloned)").length;
    count = pad(count, 2);
    dotblock_parent.find(dotb + "__counter-count").html(count);
  })
  /* END: COUNT - SET COUNT */

  /* START: COUNT - SET INDEX */
  .on("init afterChange", function () {
    var $this = $(this);
    var index = parseInt($this.find(".slick-current").attr("data-slick-index")) + 1;
    index = pad(index, 2);

    dotblock_parent.find(dotb + "__counter-index").changeTextUI(index, "counter");
  })
  /* END: COUNT - SET INDEX */

  /* START: INITIALIZATION */
  .slick()
  /* END: INITIALIZATION */
  ;

  /* START: NEXT ARROW ACTION */
  block.find(dotb + "__arrow-next").click(function () {
    $el.slick("slickNext");
  });
  /* END: NEXT ARROW ACTION */
};

var splash__show = function splash__show() {
  var splashScreen = $(".flo-splash");
  Foundation.Motion.animateIn(splashScreen, "fade-in");
};
var splash__hide = function splash__hide() {
  var splashScreen = $(".flo-splash");
  Foundation.Motion.animateOut(splashScreen, "fade-out");
};

window.onload = function () {
  var splashScreen = $(".flo-splash");
  splashScreen.css("opacity", "0");
  setTimeout(function () {
    splash__hide;
    splashScreen.hide();
  }, 400);
};

$(window).load(function () {

  // TODO: skip_list for any block that contains flo-header--*


  /* START: SIDEBAR WORKS */
  if (window.innerWidth > 767 && $(".flo_sidebar").length) {
    var approx = function approx(num) {
      return +(Math.round(num + "e+2") + "e-2");
    };

    var getNodesThatContain = function getNodesThatContain($this, text) {
      var textNodes = $this.find(":not(iframe, script, style)").contents().filter(function () {
        return this.nodeType == 3 && this.textContent.indexOf(text) > -1 && $(this).children().length == 0;
      });
      return textNodes.parent();
    };

    // specify the blocks on top that do not need to be affected by the sidebar (headers and slideshows in most cases)


    var adaptive_sidebar = $("body").hasClass("body_has_sidebar");
    var sidebar_works_css = [];
    var page_wrap = $(".flo_page_wrap");
    var sidebar = $(".flo_sidebar");
    var sidebar_height = 0;
    var blocks = $(".flo-block:not(.flo-no-resize)");
    var any_footer = "div[class^='flo-footer'],div[class*=' flo-footer']";
    var skip_list = '.flo-block-slideshow-1, .flo-block-category-switcher-1';

    /* START: SIDEBAR */
    // var top = 0;
    if (blocks.first().find('.flo-header').length && blocks.first().next().find(skip_list).length) {
      // first two blocks = header + skip_list
      blocks.first().addClass('skipped');
      blocks.first().next().addClass('skipped');
    } else if (blocks.first().find('.flo-header').length && blocks.first().find(skip_list).length || blocks.first().find(skip_list).length || blocks.first().find('.flo-header').length) {
      // first block = skip_list with header OR first block = skip_list with no header OR first block = header only
      blocks.first().addClass('skipped');
    }

    /* END: SIDEBAR */

    /* START: BLOCKS */
    var skipped_block_height = 0;

    // append sidebar to first transformed block
    blocks.not('.skipped').first().addClass('contains_sidebar');
    var block_contains_sidebar = $('.contains_sidebar');
    block_contains_sidebar.append(sidebar);
    var blocks_on_the_side_height = 0;
    var sidebarWidthInPercent = sidebar.width() * 100 / block_contains_sidebar.width();

    sidebar.children().each(function () {
      sidebar_height += $(this).outerHeight(true);
    });
    sidebar_height += parseInt(block_contains_sidebar.css("padding-top"), 10) * 2;

    var sidebarMarginInPercent = 0;
    if (!sidebar.hasClass('flo_sidebar--on-left')) {
      sidebarMarginInPercent = parseInt(sidebar.css("margin-left")) * 100 / block_contains_sidebar.width();
      var righti = parseInt(block_contains_sidebar.css('padding-right'));
    } else {
      sidebarMarginInPercent = parseInt(sidebar.css("margin-right")) * 100 / block_contains_sidebar.width();
      var lefti = parseInt(block_contains_sidebar.css('padding-left'));
    }
    var toppi = parseInt(block_contains_sidebar.css('padding-top'));

    sidebar_works_css.push([".flo_sidebar {", "top: " + toppi + "px!important;", sidebar.hasClass("flo_sidebar--on-left") ? "left: " + lefti + "px;" : "right: " + righti + "px;", "}"].join("\n"));

    var howMuchTransform = (100 - sidebarWidthInPercent - sidebarMarginInPercent) / 100;
    var zoomFactor = block_contains_sidebar.find('.flo-block__container').width() / (block_contains_sidebar.find('.flo-block__container').width() * howMuchTransform);

    blocks.each(function () {
      var block = $(this);

      if (!block.hasClass('skipped')) {

        var shrink = true;
        if (adaptive_sidebar && blocks_on_the_side_height > sidebar_height) {
          shrink = false;
        }

        if (shrink) {
          block.addClass('shrinked');
          if (!$('body').hasClass('single-post')) {
            var vertical_correction = block.find('.flo-block__container').outerHeight() - block.find('.flo-block__container').outerHeight() * howMuchTransform;
            var $this = $(this).find('.flo-block__container');
            var id = $this.parent('.flo-block').attr('data-id');
            var x = document.getElementsByClassName('flo-block--' + id);
            x = x[0].firstElementChild.innerText;
            var array = x.split('\n');
            $.each(array, function () {
              var match = getNodesThatContain($this, this);
              $.each(match, function () {
                if ($(this).children().length == 0 && $(this).text() != '' || $(this).children().length == 1 && $(this).text() != '' && $(this).find('.flo-icon-arrow-left, .flo-icon-arrow-right').length == 1) {
                  $(this).not('.font-resized').css('font-size', parseInt($(this).css('font-size')) * zoomFactor / parseInt($('html').css('font-size')) + 'rem').addClass('font-resized');
                }
              });
            });

            // use transform instead of width to preserve contents width/height ratio
            // compare initial height and transformed height and assign the number of pixels the block has lost in height as negative margin-bottom
            sidebar_works_css.push([".flo-block--" + block.data("id") + " .flo-block__container {", "transition: none!important;", "transform: scale(" + approx(howMuchTransform) + ")!important;", "margin-bottom: -" + approx(vertical_correction) + "px!important;", sidebar.hasClass("flo_sidebar--on-left") ? "transform-origin: top right !important;" : "transform-origin: top left !important;", sidebar.hasClass("flo_sidebar--on-left") ? "margin-left: auto;" : "", "}"].join("\n"));

            var block_height_to_add_up = approx(block.find('.flo-block__container').outerHeight() * howMuchTransform + parseFloat(block.css('padding-top')) + parseFloat(block.css('padding-bottom')));
            blocks_on_the_side_height += block_height_to_add_up;
          } else {

            sidebar_works_css.push([".flo-block--" + block.data("id") + " .flo-block__container {", "transition: none!important;", "width: " + approx(100 - sidebarWidthInPercent - sidebarMarginInPercent) + "%;", sidebar.hasClass("flo_sidebar--on-left") ? "margin-right: 0;" : "margin-left: 0;", "}"].join("\n"));
            blocks_on_the_side_height += approx(block.outerHeight());
          }
        }
      } else {
        skipped_block_height += block.outerHeight();
      }
    });
    /* END: BLOCKS */

    /* START: PAGE WRAP */
    var footer_height = 0;
    if ($(any_footer).first().length) {
      footer_height = $(any_footer).first().outerHeight();
    }

    if (sidebar_height > blocks_on_the_side_height) {
      var page_wrap_height = skipped_block_height + sidebar_height + footer_height;
      page_wrap.css({
        "height": page_wrap_height
      });

      $(any_footer).first().css({
        "position": "absolute",
        "bottom": 0,
        "left": 0,
        "width": "100%"
      });
    }
    /* END: PAGE WRAP */
    /* START: APPEND CSS */
    $("head").append(["<style class='sidebar-works-css'>", "@media (min-width: 768px) {", sidebar_works_css.join("\n"), "}", "</style>"].join("\n"));

    setTimeout(function () {
      sidebar.css('opacity', 1);
    });

    // attempt to reinit masonry and all that shit
    $(window).trigger('resize');

    $('.body_has_sidebar').addClass('sidebar-ready');

    /* END: APPEND CSS */
  }
  /* END: SIDEBAR WORKS */
});

$(function () {
  $(".flo-core-style").each(function () {
    var template = $(this);
    var style = template.html();
    $("head").append(style);
    template.remove();
  });
  var fadeInStyleTag = document.createElement("style");
  fadeInStyleTag.classList = "flo-core-fade-in";
  fadeInStyleTag.innerHTML = "\n    body * {\n      outline: solid transparent;\n    } \n    body {\n      opacity: 1!important;\n    }";
  $(fadeInStyleTag).appendTo("head");
});})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyIsIjAvY29tbWVudHMtYmxvY2svY29tbWVudHMtYmxvY2subWFpbi5qcyIsIjAvZmxvLWJsb2NrL2Zsby1ibG9jay5tYWluLmpzIiwiMC9mbG8tZm9ybS9mbG8tZm9ybS5tYWluLmpzIiwiMC9mbG8tc2hhcmUtcm9sbG92ZXIvZmxvLXNoYXJlLXJvbGxvdmVyLm1haW4uanMiLCIwL2Zsby12aWRlby1lbWJlZC9mbG8tdmlkZW8tZW1iZWQubWFpbi5qcyIsIjEvZmxvLWJsb2NrLWNhdGVnb3J5LXN3aXRjaGVyLTEvZmxvLWJsb2NrLWNhdGVnb3J5LXN3aXRjaGVyLTEubWFpbi5qcyIsIjEvZmxvLWJsb2NrLWNvbnRhY3QtYmxvY2stMS9mbG8tYmxvY2stY29udGFjdC1ibG9jay0xLm1haW4uanMiLCIxL2Zsby1ibG9jay1mYXEtYmxvY2stMi9mbG8tYmxvY2stZmFxLWJsb2NrLTIubWFpbi5qcyIsIjEvZmxvLWJsb2NrLWdhbGxlcnktdmlldy0yL2Zsby1ibG9jay1nYWxsZXJ5LXZpZXctMi5tYWluLmpzIiwiMS9mbG8tYmxvY2stZ2FsbGVyeS12aWV3LTEvZmxvLWJsb2NrLWdhbGxlcnktdmlldy0xLm1haW4uanMiLCIxL2Zsby1ibG9jay1nYWxsZXJ5LXZpZXctMy9mbG8tYmxvY2stZ2FsbGVyeS12aWV3LTMubWFpbi5qcyIsIjEvZmxvLWJsb2NrLWltYWdlLWxpbmtzLTMvZmxvLWJsb2NrLWltYWdlLWxpbmtzLTMubWFpbi5qcyIsIjEvZmxvLWJsb2NrLWludHJvLWJsb2NrL2Zsby1ibG9jay1pbnRyby1ibG9jay5tYWluLmpzIiwiMS9mbG8tYmxvY2stbGlzdGluZy00L2Zsby1ibG9jay1saXN0aW5nLTQubWFpbi5qcyIsIjEvZmxvLWJsb2NrLWxpc3RpbmctNS9mbG8tYmxvY2stbGlzdGluZy01Lm1haW4uanMiLCIxL2Zsby1ibG9jay1saXN0aW5nLXBhZ2luYXRpb24tMi9mbG8tYmxvY2stbGlzdGluZy1wYWdpbmF0aW9uLTIubWFpbi5qcyIsIjEvZmxvLWJsb2NrLW5ld3NsZXR0ZXItYmxvY2stMS9mbG8tYmxvY2stbmV3c2xldHRlci1ibG9jay0xLm1haW4uanMiLCIxL2Zsby1ibG9jay1uZXdzbGV0dGVyLWJsb2NrLTIvZmxvLWJsb2NrLW5ld3NsZXR0ZXItYmxvY2stMi5tYWluLmpzIiwiMS9mbG8tYmxvY2stbnVtZXJpYy1kZXRhaWxzL2Zsby1ibG9jay1udW1lcmljLWRldGFpbHMubWFpbi5qcyIsIjEvZmxvLWJsb2NrLXByZXNzL2Zsby1ibG9jay1wcmVzcy5tYWluLmpzIiwiMS9mbG8tYmxvY2stc2xpZGVzaG93LTIvZmxvLWJsb2NrLXNsaWRlc2hvdy0yLm1haW4uanMiLCIxL2Zsby1ibG9jay1zbGlkZXNob3ctMS9mbG8tYmxvY2stc2xpZGVzaG93LTEubWFpbi5qcyIsIjEvZmxvLWJsb2NrLXRlc3RpbW9uaWFscy0xL2Zsby1ibG9jay10ZXN0aW1vbmlhbHMtMS5tYWluLmpzIiwiMS9mbG8tY29tbWVudHMvZmxvLWNvbW1lbnRzLm1haW4uanMiLCIxL2Zsby1nZW5lcmljLWZhbmN5Ym94LXZpZGVvL2Zsby1nZW5lcmljLWZhbmN5Ym94LXZpZGVvLm1haW4uanMiLCIxL2Zsby1mb290ZXIvZmxvLWZvb3Rlci1jb3B5cmlnaHRzLWFyZWEubWFpbi5qcyIsIjEvZmxvLWZvb3Rlci9mbG8tZm9vdGVyX19zaWdudXAubWFpbi5qcyIsIjEvZmxvLWdlbmVyaWMtc2xpZGVzL2Zsby1nZW5lcmljLXNsaWRlcy10ZW1wbGF0ZS5tYWluLmpzIiwiMS9mbG8taGVhZGVyLW1vYmlsZS9mbG8taGVhZGVyLW1vYmlsZS5tYWluLmpzIiwiMS9mbG8taGVhZGVyLW1vYmlsZS1tZW51L2Zsby1oZWFkZXItbW9iaWxlLW1lbnUubWFpbi5qcyIsIjEvZmxvLWhlYWRlci9mbG8tYmxvY2stdG9wYmFyLm1haW4uanMiLCIxL2Zsby1oZWFkZXIvZmxvLWhlYWRlci10eXBlLWoubWFpbi5qcyIsIjEvZmxvLWhlYWRlci9mbG8taGVhZGVyLm1haW4uanMiLCIxL2Zsby1yZXZlYWwvZmxvLXJldmVhbC5tYWluLmpzIiwiMS9mbG8tc2xpZGVzaG93L2Zsby1zbGlkZXNob3cubWFpbi5qcyIsIjEvZmxvLXNsaWRlc2hvdy9mbG8tc2xpZGVzaG93X19sYXlvdXQtLXR5cGUtYS5tYWluLmpzIiwiMS9mbG8tc2xpZGVzaG93L2Zsby1zbGlkZXNob3dfX2xheW91dC0tdHlwZS1iLm1haW4uanMiLCIxL2Zsby1zbGlkZXNob3cvZmxvLXNsaWRlc2hvd19fbGF5b3V0LS10eXBlLWMubWFpbi5qcyIsIjEvZmxvLXNsaWRlc2hvdy9mbG8tc2xpZGVzaG93X19zbGlkZXMubWFpbi5qcyIsIjEvZmxvLXNwbGFzaC9mbG8tc3BsYXNoLm1haW4uanMiLCIxL3NpZGViYXIvc2lkZWJhci5tYWluLmpzIiwic3R5bGUvc3R5bGUubWFpbi5qcyJdLCJuYW1lcyI6WyJwYWQiLCJzdHIiLCJtYXgiLCJ0b1N0cmluZyIsImxlbmd0aCIsImpRdWVyeSIsImZuIiwiZXh0ZW5kIiwiY2hhbmdlVGV4dCIsInRleHQiLCJlYWNoIiwiJGVsIiwiJCIsImFuaW1hdGUiLCJzZXRUaW1lb3V0IiwiY2hhbmdlVGV4dFVJIiwiYW5pbWF0aW9uIiwic3BlZWQiLCJhbmltYXRpb25fbWFwIiwiZmFkZSIsIm5hbWUiLCJzaG93X2F0dHIiLCJoaWRlX2F0dHIiLCJjb3VudGVyIiwiZGlyZWN0aW9uIiwic2xpZGVfbGVmdCIsImRyb3BfdXAiLCJoaWRlIiwic2hvdyIsImNoYW5nZUNTUyIsInByb3BlcnR5IiwidmFsdWUiLCJjc3MiLCJpc19jb2xvcl9icmlnaHQiLCJjb2xvciIsImMiLCJzdWJzdHJpbmciLCJyZ2IiLCJwYXJzZUludCIsInIiLCJnIiwiYiIsImx1bWEiLCJjb25zb2xlIiwibG9nIiwiaGV4MnJnYmEiLCJoZXgiLCJhbHBoYSIsIkhFWF9SRUdFWCIsInRlc3QiLCJFcnJvciIsInNsaWNlIiwiSEVYX1NIT1JUSEFORF9MRU5HVEgiLCJzcGxpdCIsInNwbGljZSIsImpvaW4iLCJIRVhfTEVOR1RIIiwidmFsdWVzIiwiQkFTRSIsInBhcnNlRmxvYXQiLCJwdXNoIiwiYl9oZXgycmdiYSIsIm9wYWNpdHkiLCJyZXBsYWNlIiwicmVzdWx0IiwiZG9jdW1lbnQiLCJmb3VuZGF0aW9uIiwiZmxvX2xxaXAiLCJ3aW5kb3ciLCJhdHRyIiwib24iLCJ2aWV3cG9ydENoZWNrZXIiLCJjbGFzc1RvQWRkIiwicmVwZWF0Iiwib2Zmc2V0IiwiaW52ZXJ0Qm90dG9tT2Zmc2V0IiwidHJpZ2dlciIsInZhbCIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJpc19tb2JpbGVfc2NyZWVuIiwiaXNfdGFibGV0X3NjcmVlbiIsIm1vYmlsZV9jb29raWVfbmFtZSIsInRhYmxldF9jb29raWVfbmFtZSIsIm1vYmlsZV9jb29raWUiLCJmbG9HZXRDb29raWUiLCJ0YWJsZXRfY29va2llIiwic2V0X21vYmlsZSIsImNyZWF0ZUNvb2tpZSIsInNldF90YWJsZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImNvb2tpZSIsImluZGV4T2YiLCJkZXZpY2VQaXhlbFJhdGlvIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiZGF0ZU8iLCJkYXlzIiwiZXhwaXJlcyIsInRvR01UU3RyaW5nIiwiY25hbWUiLCJjYSIsImkiLCJjaGFyQXQiLCJ3aWRnZXRfbmV3c2xldHRlcl9zaWdudXAiLCIkZm9ybSIsInBhcnNsZXkiLCJlbWJlZF9jb2RlIiwidW5lc2NhcGUiLCJwYXJlbnQiLCJmaW5kIiwiJGVtYmVkX2NvZGUiLCJodG1sIiwiZW1iZWRfZm9ybV9hY3Rpb24iLCJjbGljayIsInRvZ2dsZUNsYXNzIiwic2xpZGVUb2dnbGUiLCJmaXJzdCIsInJlbW92ZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImZvcm0iLCJjb250YWluZXIiLCJhamF4IiwidXJsIiwiYWpheHVybCIsImRhdGEiLCJzZXJpYWxpemUiLCJ0eXBlIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwianNvbiIsImNvbnRhY3RfbmFtZSIsImFwcGVuZCIsImNvbnRhY3RfZW1haWwiLCJlcnJvcl9tZXNzYWdlIiwibWVzc2FnZSIsImZhZGVJbiIsImZhZGVPdXQiLCJmbG9fc2hhcmVfcm9sbG92ZXIiLCJlbCIsIiRiIiwidmlkZW9fZW1iZWQiLCJ2aWRlb19lbWJlZF9fbG9hZGVkX2NsYXNzIiwidmlkZW9fc2NyZWVuIiwidmlkZW9fc2NyZWVuX19lbWJlZF9jb2RlIiwidmlkZW9fYnV0dG9uIiwidmlkZW9fc3RhcnQiLCJ2aWRlb19zdG9wIiwiaGFzQ2xhc3MiLCJmbG9fbW9iaWxlX2NhdGVnb3J5X3N3aXRjaGVyIiwiZG90YiIsIndpZHRoIiwiZmxvX2Jsb2NrX2NvbnRhY3RfYmxvY2tfMSIsIiRmb3JtX3dyYXAiLCJzY3JvbGxUb3AiLCJ0b3AiLCJoZWlnaHQiLCJmbG9fZmFxXzIiLCJwYXJlbnRzIiwic2xpZGVyIiwiYXJyb3dfbGVmdCIsImFycm93X3JpZ2h0Iiwic2xpY2siLCJjdXJyZW50U2xpZGUiLCJuZXh0U2xpZGUiLCIkdGhpcyIsImluZGV4IiwiYXJyb3dzIiwic2xpZGVzVG9TaG93IiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInNsaWRlc1RvU2Nyb2xsIiwiaW5maW5pdGUiLCJkb3RzIiwidmFyaWFibGVXaWR0aCIsImZsb19ibG9ja19nYWxsZXJ5X3ZpZXdfMiIsImRvX21hc29ucnkiLCJtYXNvbnJ5IiwiY29sdW1uV2lkdGgiLCJwZXJjZW50UG9zaXRpb24iLCJwcmVsb2FkX21hc29ucnkiLCJwcmVkZXN0aW5lZF93aWR0aCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIiRvcmlnX2hlaWdodCIsIiRvcmlnX3dpZHRoIiwiJGNvZWZmIiwicHJlZGVzdGluZWRfaGVpZ2h0IiwidW5zZXRfcHJlbG9hZF9tYXNvbnJ5IiwiaW5uZXJXaWR0aCIsImxvYWQiLCJpbWdfZWwiLCJjbGFzc1RvUmVtb3ZlIiwiY2FsbGJhY2tGdW5jdGlvbiIsImVsZW0iLCJhY3Rpb24iLCJoYXNBdHRyaWJ1dGUiLCJlbGVtX2ltZyIsImltYWdlc0xvYWRlZCIsImZhbmN5Ym94IiwibG9vcCIsImZsb19ibG9ja19nYWxsZXJ5X3ZpZXdfMSIsImNvdW50IiwiY2VudGVyTW9kZSIsImxhenlMb2FkIiwiYWRhcHRpdmVIZWlnaHQiLCJzdGlja3kiLCJmbG9fYmxvY2tfZ2FsbGVyeV92aWV3XzMiLCJzdGlja19pbl9wYXJlbnQiLCJvZmZzZXRfdG9wIiwiaXNJblZpZXdwb3J0IiwiZWxlbWVudCIsInJlY3QiLCJsZWZ0IiwiYm90dG9tIiwiaW5uZXJIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJyaWdodCIsImltYWdlIiwiZmxvX2ltYWdlX2xpbmtzXzMiLCJmbG9fYmxvY2tfaW50cm9fYmxvY2siLCJzY3JvbGwiLCJldmFsIiwiZmxvX2Jsb2NrX2xpc3RpbmdfNCIsImRvX3NpemluZyIsIml0ZW1zIiwiZmxvX2Jsb2NrX2xpc3RpbmdfNSIsImZsb19ibG9ja19saXN0aW5nX3BhZ2luYXRpb25fMiIsIiRidXR0b24iLCJsaXN0aW5nX3NlbGVjdG9yIiwiJGxpc3RpbmciLCJncmlkX3NpemVyIiwiJGdyaWRfc2l6ZXIiLCJhamF4X2xpc3Rpbmdfc2VsZWN0b3IiLCJuZXh0UGFnZVVybCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwiJG5ld19wYWdlIiwiJG5ld19saXN0aW5nIiwiJG5ld19kYXRhX25leHRfaHJlZiIsIm5leHRfcGFnZV9pdGVtcyIsInJlaW5pdF9tYXNvbnJ5IiwidGVtcEhlaWdodCIsIm5ld3NsZXR0ZXJfYmxvY2tfMSIsIm5ld3NsZXR0ZXJfYmxvY2tfMiIsImZsb19udW1lcmljX2RldGFpbHMiLCJ3aWxsQW5pbWF0ZSIsImFuaW1UYXJnZXRzIiwiZGVsYXlWYWwiLCJhbmltRHVyYXRpb24iLCJudW1iZXIiLCJkZWxheSIsImFuaW1hdGVOdW1iZXIiLCJmbG9fYmxvY2tfbnVtZXJpY19kZXRhaWxzIiwiZWxlbWVudHMiLCJuZXh0QXJyb3ciLCJwcmV2QXJyb3ciLCJmbG9fYmxvY2tfc2xpZGVzaG93XzIiLCIkdmFyaWFibGVXaWR0aCIsIiRhZGFwdGl2ZUhlaWdodCIsIiRjZW50ZXJNb2RlIiwiYXBwZW5kRG90cyIsImZsb19ibG9ja19zbGlkZXNob3dfMSIsIiRzbGljayIsImN1cnJlbnRfc2xpZGUiLCJuZXdfdGl0bGUiLCJuZXdfdGV4dCIsIm5ld19idXR0b24iLCJuZXdfYm90dG9tX2xhYmVsIiwidGl0bGVfYXJlYV9fdGl0bGUiLCJ0aXRsZV9hcmVhX190ZXh0IiwidGl0bGVfYXJlYV9fYnV0dG9uIiwidGl0bGVfYXJlYV9fYm90dG9tX2xhYmVsIiwib3ZlcmxheV9jb2xvciIsIm92ZXJsYXlfb3BhY2l0eSIsInRyaW0iLCJmbG9fdGVzdGltb25pYWxzXzEiLCJmbG9fY29tbWVudHMiLCJpZnJhbWUiLCJwcmVsb2FkIiwiZmxvX2Zvb3Rlcl9jb3B5cmlnaHRzX2FyZWEiLCJmb290ZXJfbWluaWJsb2NrX3NpZ251cCIsInNsaWNrQWRkaXRpb25hbE9wdGlvbnMiLCJzbGlja09wdGlvbnMiLCJhdHRybmFtZSIsInBhdXNlIiwiYWN0aXZlX3NsaWRlX18kIiwidmlkZW9fY29udGFpbmVyIiwidmlkZW8iLCJwbGF5IiwiJHNsaWRlcyIsInZpZGVvX2VtYmVkX2hvc3QiLCJhdXRvcGxheSIsIiRjdXJyZW50U2xpZGUiLCJlbGVtZW50c19jb2xvciIsImNvbG9yX2JyaWdodG5lc3MiLCJoZWFkZXJfbW9iaWxlIiwiYXBwZW5kVG8iLCJ6SW5kZXgiLCJjbGFzc05hbWUiLCJ3cmFwcGVyQ2xhc3NOYW1lIiwiZmxvX21vYmlsZV9tZW51Iiwib3BlbmVkX2NsYXNzIiwiY2xvc2VkX2NsYXNzIiwidHlwZV9iX2xheW91dCIsInNpYmxpbmdzIiwiZmxvX2Jsb2NrX3RvcGJhciIsImNoaWxkcmVuIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImNsb3NlVHJpZ2dlciIsImxlQ29va2llIiwic2xpZGVEb3duIiwic2xpZGVVcCIsImZsb19oZWFkZXJfdHlwZV9qIiwiZmxvX2hlYWRlcl9ibG9jayIsImhlYWRlciIsImZsb19oZWFkZXJfX2NsYXNzIiwiJGZsb19oZWFkZXIiLCIkaGVhZGVyIiwiaXNfbm90X3N0aWNreV9jbGFzcyIsImhlYWRlcl9zdGlja3lfY2xhc3MiLCJvdXRlcldpZHRoIiwiZHJvcGRvd25fZWxlbWVudHMiLCJGb3VuZGF0aW9uIiwiRHJvcGRvd25NZW51Iiwid3BtbF9tZW51X2l0ZW1zIiwid3BtbF9jb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiJG1lbnVfZG9ub3IiLCIkbWVudV9kb25vcl91bCIsIiRtZW51X2Rvbm9yX2ZpcnN0X2xldmVsIiwiJG1lbnVfbGVmdCIsIiRtZW51X3JpZ2h0IiwiJHNlYXJjaF9mb3JtIiwiJGl0ZW0iLCJyZXZlYWwiLCIkcmV2ZWFsIiwiaWQiLCJ2YWxpZGF0aW9uIiwib3ZlcmxheV9fc3R5bGVzIiwiYmVmb3JlIiwib3ZlcmxheV9fcmV0dXJuIiwiJG92ZXJsYXkiLCJ0cmlnZ2VyX19wb3NpdGlvbl9vbl9zY3JlZW4iLCJrZXlDb2RlIiwiZmxvX3NsaWRlc2hvdyIsImFkZCIsIm1vdXNlZW50ZXIiLCJtb3VzZWxlYXZlIiwiZmxvX3NsaWRlc2hvd19fbGF5b3V0X190eXBlX2EiLCJ4IiwicGFnZVgiLCJ5IiwicGFnZVkiLCJhcnJvdyIsInRhcmdldCIsImlzIiwiZmxvX3NsaWRlc2hvd19fbGF5b3V0X190eXBlX2IiLCJzZXRIZWlnaHRzIiwiaGVhZGVySGVpZ2h0Iiwic2xpZGVzIiwiY3NzRWFzZSIsImZsb19zbGlkZXNob3dfX2xheW91dF9fdHlwZV9jIiwic2xpZGVTZWxlY3RvckhlaWdodCIsInNsaWRlU2VsZWN0b3JCb3R0b21NYXJnaW4iLCJmb2N1c09uU2VsZWN0IiwiYXNOYXZGb3IiLCJmb2N1cyIsImZsb19zbGlkZXNob3dfX3NsaWRlcyIsImJsb2NrIiwiYmxvY2tfaWQiLCJibG9ja19jbGFzc193aXRoX2lkIiwiYmxvY2tfc2VsZWN0b3Jfd2l0aF9pZCIsImRvdGJsb2NrX3BhcmVudCIsImJsb2NrX3BhcmVudF93aXRoX2lkIiwic3BsYXNoX19zaG93Iiwic3BsYXNoU2NyZWVuIiwiTW90aW9uIiwiYW5pbWF0ZUluIiwic3BsYXNoX19oaWRlIiwiYW5pbWF0ZU91dCIsIm9ubG9hZCIsImFwcHJveCIsIm51bSIsIk1hdGgiLCJyb3VuZCIsImdldE5vZGVzVGhhdENvbnRhaW4iLCJ0ZXh0Tm9kZXMiLCJjb250ZW50cyIsImZpbHRlciIsIm5vZGVUeXBlIiwidGV4dENvbnRlbnQiLCJhZGFwdGl2ZV9zaWRlYmFyIiwic2lkZWJhcl93b3Jrc19jc3MiLCJwYWdlX3dyYXAiLCJzaWRlYmFyIiwic2lkZWJhcl9oZWlnaHQiLCJibG9ja3MiLCJhbnlfZm9vdGVyIiwic2tpcF9saXN0IiwibmV4dCIsInNraXBwZWRfYmxvY2tfaGVpZ2h0Iiwibm90IiwiYmxvY2tfY29udGFpbnNfc2lkZWJhciIsImJsb2Nrc19vbl90aGVfc2lkZV9oZWlnaHQiLCJzaWRlYmFyV2lkdGhJblBlcmNlbnQiLCJvdXRlckhlaWdodCIsInNpZGViYXJNYXJnaW5JblBlcmNlbnQiLCJyaWdodGkiLCJsZWZ0aSIsInRvcHBpIiwiaG93TXVjaFRyYW5zZm9ybSIsInpvb21GYWN0b3IiLCJzaHJpbmsiLCJ2ZXJ0aWNhbF9jb3JyZWN0aW9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImZpcnN0RWxlbWVudENoaWxkIiwiaW5uZXJUZXh0IiwiYXJyYXkiLCJtYXRjaCIsImJsb2NrX2hlaWdodF90b19hZGRfdXAiLCJmb290ZXJfaGVpZ2h0IiwicGFnZV93cmFwX2hlaWdodCIsInRlbXBsYXRlIiwic3R5bGUiLCJmYWRlSW5TdHlsZVRhZyIsImlubmVySFRNTCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsU0FBQUEsR0FBQSxDQUFBQyxHQUFBLEVBQUFDLEdBQUEsRUFBQTtBQUNBRCxRQUFBQSxJQUFBRSxRQUFBLEVBQUE7QUFDQSxTQUFBRixJQUFBRyxNQUFBLEdBQUFGLEdBQUEsR0FBQUYsSUFBQSxNQUFBQyxHQUFBLEVBQUFDLEdBQUEsQ0FB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QkFBQSxVQURBO0FBRUEsa0JBQUEsQ0FGQTtBQUdBLGdCQUFBLENBSEE7QUFJQSxpQkFBQTtBQUpBLE9BQUE7QUFNQTtBQUNBO0FBQ0E7QUFDQXBCLE1BQUEsTUFBQSxFQUFBNkgsTUFBQSxDQUFBLENBQ0EsbUNBREEsRUFFQSw2QkFGQSxFQUdBdVEsa0JBQUF6VixJQUFBLENBQUEsSUFBQSxDQUhBLEVBSUEsR0FKQSxFQUtBLFVBTEEsRUFNQUEsSUFOQSxDQU1BLElBTkEsQ0FBQTs7QUFRQXpDLGVBQUEsWUFBQTtBQUNBb1ksY0FBQWxYLEdBQUEsQ0FBQSxTQUFBLEVBQUEsQ0FBQTtBQUNBLEtBRkE7O0FBSUE7QUFDQXBCLE1BQUF3RCxNQUFBLEVBQUFRLE9BQUEsQ0FBQSxRQUFBOztBQUVBaEUsTUFBQSxtQkFBQSxFQUFBa0UsUUFBQSxDQUFBLGVBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0E3TEE7O0FDQUFsRSxFQUFBLFlBQUE7QUFDQUEsSUFBQSxpQkFBQSxFQUFBRixJQUFBLENBQUEsWUFBQTtBQUNBLFFBQUFvYSxXQUFBbGEsRUFBQSxJQUFBLENBQUE7QUFDQSxRQUFBbWEsUUFBQUQsU0FBQTFULElBQUEsRUFBQTtBQUNBeEcsTUFBQSxNQUFBLEVBQUE2SCxNQUFBLENBQUFzUyxLQUFBO0FBQ0FELGFBQUFwVCxNQUFBO0FBQ0EsR0FMQTtBQU1BLE1BQUFzVCxpQkFBQS9XLFNBQUE2USxhQUFBLENBQUEsT0FBQSxDQUFBO0FBQ0FrRyxpQkFBQXJILFNBQUEsR0FBQSxrQkFBQTtBQUNBcUgsaUJBQUFDLFNBQUE7QUFPQXJhLElBQUFvYSxjQUFBLEVBQUFqSSxRQUFBLENBQUEsTUFBQTtBQUNBLENBakJBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBTVEFSVDogTUlTQyAqL1xyXG4gIGZ1bmN0aW9uIHBhZCAoc3RyLCBtYXgpIHtcclxuICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xyXG4gICAgcmV0dXJuIHN0ci5sZW5ndGggPCBtYXggPyBwYWQoXCIwXCIgKyBzdHIsIG1heCkgOiBzdHI7XHJcbiAgfVxyXG4gIC8vIEEgZnVuY3Rpb24gdGhhdCBhbmltYXRlcyB0ZXh0IGNoYW5nZVxyXG4gIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgY2hhbmdlVGV4dDogZnVuY3Rpb24odGV4dCl7XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKTtcclxuICAgICAgICBpZiAoJGVsLnRleHQoKSAhPT0gdGV4dCApIHtcclxuICAgICAgICAgICRlbFxyXG4gICAgICAgICAgICAuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDB9LCAyMDApXHJcbiAgICAgICAgICA7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRlbC50ZXh0KHRleHQpO1xyXG4gICAgICAgICAgICAkZWxcclxuICAgICAgICAgICAgICAuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LCAyMDApXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBjaGFuZ2VUZXh0VUk6IGZ1bmN0aW9uKHRleHQsIGFuaW1hdGlvbiwgc3BlZWQpe1xyXG4gICAgICBpZiAodHlwZW9mIGFuaW1hdGlvbiA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHZhciBhbmltYXRpb24gPSBcImZhZGVcIjtcclxuICAgICAgfVxyXG4gICAgICBpZiAodHlwZW9mIHNwZWVkID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgdmFyIHNwZWVkID0gNDAwO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgJGVsID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIGFuaW1hdGlvbl9tYXAgPSB7XHJcbiAgICAgICAgICBmYWRlOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiLFxyXG4gICAgICAgICAgICBzaG93X2F0dHI6IHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlkZV9hdHRyOiB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjb3VudGVyOiB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgc2hvd19hdHRyOiB7XHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcImRvd25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaWRlX2F0dHI6IHtcclxuICAgICAgICAgICAgICBkaXJlY3Rpb246IFwidXBcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgc2xpZGVfbGVmdDoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImRyb3BcIixcclxuICAgICAgICAgICAgc2hvd19hdHRyOiB7XHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcImxlZnRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBoaWRlX2F0dHI6IHtcclxuICAgICAgICAgICAgICBkaXJlY3Rpb246IFwicmlnaHRcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgZHJvcF91cDoge1xyXG4gICAgICAgICAgICBuYW1lOiBcImRyb3BcIixcclxuICAgICAgICAgICAgc2hvd19hdHRyOiB7XHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcInVwXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaGlkZV9hdHRyOiB7XHJcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBcImRvd25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9LFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICgkZWwudGV4dCgpICE9PSB0ZXh0ICkge1xyXG4gICAgICAgICAgLy8gJGVsXHJcbiAgICAgICAgICAvLyAgIC5hbmltYXRlKHtcIm9wYWNpdHlcIjogMH0sIDIwMClcclxuICAgICAgICAgIC8vIDtcclxuICAgICAgICAgICRlbC5oaWRlKGFuaW1hdGlvbl9tYXBbYW5pbWF0aW9uXS5uYW1lLCBhbmltYXRpb25fbWFwW2FuaW1hdGlvbl0uc2hvd19hdHRyLCBzcGVlZCAvIDIpO1xyXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkZWwudGV4dCh0ZXh0KTtcclxuICAgICAgICAgICAgLy8gJGVsXHJcbiAgICAgICAgICAgIC8vICAgLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAxfSwgMjAwKVxyXG4gICAgICAgICAgICAvLyA7XHJcbiAgICAgICAgICAgICRlbC5zaG93KGFuaW1hdGlvbl9tYXBbYW5pbWF0aW9uXS5uYW1lLCBhbmltYXRpb25fbWFwW2FuaW1hdGlvbl0uaGlkZV9hdHRyLCBzcGVlZCAvIDIpO1xyXG4gICAgICAgICAgfSwgc3BlZWQgLyAyKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGNoYW5nZUNTUzogZnVuY3Rpb24ocHJvcGVydHksIHZhbHVlKXtcclxuICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciAkZWwgPSAkKHRoaXMpO1xyXG4gICAgICAgIGlmICgkZWwuY3NzKHByb3BlcnR5KSAhPT0gdmFsdWUgKSB7XHJcbiAgICAgICAgICAkZWxcclxuICAgICAgICAgICAgLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAwfSwgMjAwKVxyXG4gICAgICAgICAgICAvLyAuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWSgtMC4zcmVtKVwiKVxyXG4gICAgICAgICAgICAvLyAuY3NzKFwidHJhbnNpdGlvblwiLCBcInRyYW5zZm9ybSAwLjhzLCBjb2xvciAwLjRzXCIpXHJcbiAgICAgICAgICA7XHJcbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRlbC5jc3MocHJvcGVydHksIHZhbHVlKTtcclxuICAgICAgICAgICAgJGVsXHJcbiAgICAgICAgICAgICAgLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAxfSwgMjAwKVxyXG4gICAgICAgICAgICAgIC8vIC5jc3MoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVZKC0wcmVtKVwiKVxyXG4gICAgICAgICAgICAgIC8vIC5jc3MoXCJ0cmFuc2l0aW9uXCIsIFwiXCIpXHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgIH0sIDIwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gQSBmdW5jdGlvbiB0aGF0IHRlbGxzIGlmIGEgY29sb3IgaXMgbGlnaHQodHJ1ZSkgb3IgZGFyayAoZmFsc2UpXHJcbiAgZnVuY3Rpb24gaXNfY29sb3JfYnJpZ2h0KGNvbG9yKSB7XHJcbiAgICBpZiAoY29sb3IgJiYgY29sb3IubGVuZ3RoID09IDcgJiYgY29sb3JbMF0gPT0gXCIjXCIpIHtcclxuICAgICAgdmFyIGMgPSBjb2xvcjtcclxuICAgICAgdmFyIGMgPSBjLnN1YnN0cmluZygxKTsgICAgICAvLyBzdHJpcCAjXHJcbiAgICAgIHZhciByZ2IgPSBwYXJzZUludChjLCAxNik7ICAgLy8gY29udmVydCBycmdnYmIgdG8gZGVjaW1hbFxyXG4gICAgICB2YXIgciA9IChyZ2IgPj4gMTYpICYgMHhmZjsgIC8vIGV4dHJhY3QgcmVkXHJcbiAgICAgIHZhciBnID0gKHJnYiA+PiAgOCkgJiAweGZmOyAgLy8gZXh0cmFjdCBncmVlblxyXG4gICAgICB2YXIgYiA9IChyZ2IgPj4gIDApICYgMHhmZjsgIC8vIGV4dHJhY3QgYmx1ZVxyXG5cclxuICAgICAgdmFyIGx1bWEgPSAwLjIxMjYgKiByICsgMC43MTUyICogZyArIDAuMDcyMiAqIGI7IC8vIHBlciBJVFUtUiBCVC43MDlcclxuXHJcbiAgICAgIHJldHVybiBsdW1hID4gNDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkNvbG9yIEJyaWdodG5lc3M6IEludmFsaWQgQ29sb3IgU3RyaW5nXCIpO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEhFWDJSR0JBXHJcbiAgZnVuY3Rpb24gaGV4MnJnYmEoaGV4LCBhbHBoYSkge1xyXG4gICAgaWYgKCFIRVhfUkVHRVgudGVzdChoZXgpKSB7XHJcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2hleDJyZ2JhOiBmaXJzdCBhcmd1bWVudCBoYXMgaW52YWxpZCBoZXhhZGVjaW1hbCBjaGFyYWN0ZXJzJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHJpbSB1bm5lY2Vzc2FyeSBjaGFyYWN0ZXJzXHJcbiAgICBpZiAoaGV4WzBdID09PSAnIycpIHtcclxuICAgICAgICBoZXggPSBoZXguc2xpY2UoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXhwYW5kIHNob3J0aGFuZFxyXG4gICAgaWYgKGhleC5sZW5ndGggPT09IEhFWF9TSE9SVEhBTkRfTEVOR1RIKSB7XHJcbiAgICAgICAgaGV4ID0gaGV4LnNwbGl0KCcnKTtcclxuICAgICAgICBoZXguc3BsaWNlKDIsIDAsIGhleFsyXSk7XHJcbiAgICAgICAgaGV4LnNwbGljZSgxLCAwLCBoZXhbMV0pO1xyXG4gICAgICAgIGhleC5zcGxpY2UoMCwgMCwgaGV4WzBdKTtcclxuICAgICAgICBoZXggPSBoZXguam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhleC5sZW5ndGggIT09IEhFWF9MRU5HVEgpIHtcclxuICAgICAgICB0aHJvdyBFcnJvcignaGV4MnJnYmE6IGZpcnN0IGFyZ3VtZW50IGhhcyBpbnZhbGlkIGhleGFkZWNpbWFsIGxlbmd0aCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvbnZlcnQgaGV4IHRvIHJnYlxyXG4gICAgdmFyIHZhbHVlcyA9IFtcclxuICAgICAgICBwYXJzZUludChoZXguc2xpY2UoMCwgMiksIEJBU0UpLFxyXG4gICAgICAgIHBhcnNlSW50KGhleC5zbGljZSgyLCA0KSwgQkFTRSksXHJcbiAgICAgICAgcGFyc2VJbnQoaGV4LnNsaWNlKDQsIDYpLCBCQVNFKVxyXG4gICAgXTtcclxuXHJcbiAgICBhbHBoYSA9IHR5cGVvZiBhbHBoYSA9PT0gJ251bWJlcicgPyBhbHBoYSA6IHBhcnNlRmxvYXQoYWxwaGEpO1xyXG4gICAgaWYgKGFscGhhID49IDAgJiYgYWxwaGEgPD0gMSkge1xyXG4gICAgICAgIHZhbHVlcy5wdXNoKGFscGhhKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFsdWVzLnB1c2goMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICdyZ2JhKCcgKyB2YWx1ZXMuam9pbignLCcpICsgJyknO1xyXG4gIH07XHJcbiAgLy8gYmV0dGVyIGhleDJyZ2JhIGZ1bmN0aW9uIDspXHJcbiAgZnVuY3Rpb24gYl9oZXgycmdiYShoZXgsb3BhY2l0eSl7XHJcbiAgICBoZXggPSBoZXgucmVwbGFjZSgnIycsJycpO1xyXG4gICAgbGV0IHIgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDAsMiksIDE2KTtcclxuICAgIGxldCBnID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygyLDQpLCAxNik7XHJcbiAgICBsZXQgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCw2KSwgMTYpO1xyXG5cclxuICAgIGxldCByZXN1bHQgPSAncmdiYSgnK3IrJywnK2crJywnK2IrJywnK29wYWNpdHkvMTAwKycpJztcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG4vKiBFTkQ6IE1JU0MgKi9cclxuXHJcbiQoZnVuY3Rpb24oKXtcclxuXHJcbiAgJChkb2N1bWVudCkuZm91bmRhdGlvbigpO1xyXG5cclxuICAkKGRvY3VtZW50KS5mbG9fbHFpcCgpO1xyXG5cclxuICAvLyBTVEFSVDogQkxPQ0sgU0NSSVBUU1xyXG4gICAgJChcIltkYXRhLW9ucmVhZHldXCIpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgd2luZG93WyQodGhpcykuYXR0cihcImRhdGEtb25yZWFkeVwiKV0odGhpcyk7XHJcbiAgICB9KTtcclxuICAvLyBFTkQ6IEJMT0NLIFNDUklQVFNcclxuXHJcbiAgLyogU1RBUlQ6IEFOSU1BVEUgU0VDVElPTiBBUFBFQVJBTkNFIC0gVklFV1BPUlQgQ0hFQ0tFUiAqL1xyXG4gICAgJCh3aW5kb3cpLm9uKFwic3RhcnRWaWV3cG9ydENoZWNrZXJcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgJChbXHJcbiAgICAgICAgXCIubGF5b3V0LXNlY3Rpb25zLS1zY3JvbGwtbm9ybWFsIC5mbG8tYmxvY2tcIixcclxuICAgICAgICBcIi5mbG9fcGFnZSA+IC5mbG8tYmxvY2s6bm90KDpmaXJzdC1vZi10eXBlKTpub3QoLmRpc2FibGUtYXBwZWFyKVwiLFxyXG4gICAgICAgIFwiLmZsby1mb290ZXJcIixcclxuICAgICAgICBcIi50by1hcHBlYXJcIixcclxuICAgICAgICBcIi50by1hcHBlYXItLWN1c3RvbVwiLFxyXG4gICAgICAgIFwiLmZsby1wb3N0LndpdGgtYXBwZWFyID4gKlwiLFxyXG4gICAgICAgIFwiLndpZGdldFwiXHJcbiAgICAgIF0uam9pbihcIixcIikpLnZpZXdwb3J0Q2hlY2tlcih7XHJcbiAgICAgICAgY2xhc3NUb0FkZDogJ3Zpc2libGUnLFxyXG4gICAgICAgIHJlcGVhdDogdHJ1ZSxcclxuICAgICAgICBvZmZzZXQ6IDQwLFxyXG4gICAgICAgIGludmVydEJvdHRvbU9mZnNldDogZmFsc2VcclxuXHJcbiAgICAgIH0pO1xyXG4gICAgfSkudHJpZ2dlcihcInN0YXJ0Vmlld3BvcnRDaGVja2VyXCIpO1xyXG4gIC8qIEVORDogQU5JTUFURSBTRUNUSU9OIEFQUEVBUkFOQ0UgLSBWSUVXUE9SVCBDSEVDS0VSICovXHJcblxyXG4gIC8vIFNUQVJUOiBBTklNQVRFIE9OIFBBR0UgTE9BRCBBTkQgVU5MT0FEXHJcblxyXG4gICAgLy8gU1RBUlQ6IEJPRFkgRkFERUlOXHJcbiAgICAgIC8vICQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gICAkKFwiYm9keVwiKS5mYWRlSW4oKTtcclxuICAgICAgLy8gfSk7XHJcbiAgICAvLyBFTkQ6IEJPRFkgRkFERUlOXHJcblxyXG4gICAgLy8gU1RBUlQ6IEJPRFkgRkFERU9VVFxyXG4gICAgICAvLyB3aW5kb3cub25iZWZvcmV1bmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vICAgJChcImJvZHlcIikuZmFkZU91dCgpO1xyXG4gICAgICAvLyB9O1xyXG4gICAgLy8gRU5EOiBCT0RZIEZBREVPVVRcclxuXHJcbiAgLy9FTkQ6IExPQUQvVU5MT0FEIEFOSU1BVElPTlxyXG5cclxuICAvKiBTVEFSVDogV0FUQ0ggSU5QVVQgRklFTERTICovXHJcbiAgICAkKFwiaW5wdXQsIHRleHRhcmVhXCIpLm9uKFwidmVyaWZ5VmFsdWVcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKCQodGhpcykudmFsKCkgPT0gXCJcIikge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJlbXB0eVwiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiZW1wdHlcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgICQoXCJpbnB1dCwgdGV4dGFyZWFcIikudHJpZ2dlcihcInZlcmlmeVZhbHVlXCIpO1xyXG5cclxuICAgICQoXCJpbnB1dCwgdGV4dGFyZWFcIikub24oXCJrZXl1cCBjaGFuZ2VcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgJCh0aGlzKS50cmlnZ2VyKFwidmVyaWZ5VmFsdWVcIik7XHJcbiAgICB9KTtcclxuICAvKiBFTkQ6IFdBVENIIElOUFVUIEZJRUxEUyAqL1xyXG5cclxuICAvKiBTVEFSVDogTU9CSUxFIENPT0tJRSAqL1xyXG5cclxuICAgIC8vIGFkZCB0aGUgY29va2llIHRoYXQgaXMgdXNlZCB0byBkZXRlY3QgbW9iaWxlIGFuZCByZXRpbmEgc2NyZWVuc1xyXG4gICAgKGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBpc19tb2JpbGVfc2NyZWVuLFxyXG4gICAgICAgICAgICBpc190YWJsZXRfc2NyZWVuLFxyXG4gICAgICAgICAgICBtb2JpbGVfY29va2llX25hbWUgPSBcImZsb19zbWFsbF9zY3JlZW5cIixcclxuICAgICAgICAgICAgdGFibGV0X2Nvb2tpZV9uYW1lID0gXCJmbG9fdGFibGV0X3NjcmVlblwiLFxyXG4gICAgICAgICAgICBtb2JpbGVfY29va2llID0gZmxvR2V0Q29va2llKG1vYmlsZV9jb29raWVfbmFtZSksIC8vIENhbiByZXR1cm4gXCIxXCIsIFwiMFwiLCBudWxsO1xyXG4gICAgICAgICAgICB0YWJsZXRfY29va2llID0gZmxvR2V0Q29va2llKHRhYmxldF9jb29raWVfbmFtZSksIC8vIENhbiByZXR1cm4gXCIxXCIsIFwiMFwiLCBudWxsO1xyXG4gICAgICAgICAgICBzZXRfbW9iaWxlID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvb2tpZShtb2JpbGVfY29va2llX25hbWUsIHZhbHVlLCAxKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2V0X3RhYmxldCA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVDb29raWUodGFibGV0X2Nvb2tpZV9uYW1lLCB2YWx1ZSwgMSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgIC8vICB3ZSBjb25zaWRlciBzY3JlZW5zIGxhcmdlciB0aGFuIDc2MCBub3QgYmVlaW5nIG1vYmlsZVxyXG4gICAgICAgIGlzX21vYmlsZV9zY3JlZW4gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPD0gNzYwO1xyXG5cclxuICAgICAgICBpc190YWJsZXRfc2NyZWVuID0gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA+PSA3NjEgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIDw9IDEwMjQpO1xyXG5cclxuICAgICAgICBpZiAoaXNfbW9iaWxlX3NjcmVlbikge1xyXG4gICAgICAgICAgICBpZiAobW9iaWxlX2Nvb2tpZSA9PT0gJycgfHwgbW9iaWxlX2Nvb2tpZSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgc2V0X21vYmlsZSgxKTtcclxuICAgICAgICAgICAgICAgIHNldF90YWJsZXQoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZSBpZihpc190YWJsZXRfc2NyZWVuKXtcclxuICAgICAgICAgICAgaWYgKHRhYmxldF9jb29raWUgPT09ICcnIHx8IHRhYmxldF9jb29raWUgPT0gXCIwXCIpIHtcclxuICAgICAgICAgICAgICAgIHNldF9tb2JpbGUoMCk7XHJcbiAgICAgICAgICAgICAgICBzZXRfdGFibGV0KDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRhYmxldF9jb29raWUgPT0gJzEnIHx8IG1vYmlsZV9jb29raWUgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgIHNldF9tb2JpbGUoMCk7XHJcbiAgICAgICAgICAgICAgICBzZXRfdGFibGV0KDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIC8vIFNldCB0aGUgY29va2llIGZvciB0aGUgcmV0aW5hIGRldmljZXNcclxuICAgIC8vIHRoZSBjb29raWUgaXMgdXNlZCBsYXRlciB0byBzZXJ2ZSBhcHByb3ByaWF0ZSBpbWFnZSBzaXplXHJcbiAgICAgIGlmKCBkb2N1bWVudC5jb29raWUuaW5kZXhPZignZmxvX2RldmljZV9waXhlbF9yYXRpbycpID09IC0xICYmICdkZXZpY2VQaXhlbFJhdGlvJyBpbiB3aW5kb3cgJiYgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPT0gMiAmJiAhaXNfbW9iaWxlX3NjcmVlbiApe1xyXG5cclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgICAgIGRhdGUuc2V0VGltZSggZGF0ZS5nZXRUaW1lKCkgKyAzNjAwMDAwICk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdmbG9fZGV2aWNlX3BpeGVsX3JhdGlvPScgKyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyArICc7JyArICcgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpICsnOyBwYXRoPS8nO1xyXG5cclxuXHJcbiAgICAgIH0gZWxzZSBpZihkb2N1bWVudC5jb29raWUuaW5kZXhPZignZmxvX2RldmljZV9waXhlbF9yYXRpbycpICE9IC0xICYmIGZsb0dldENvb2tpZSgnZmxvX2RldmljZV9waXhlbF9yYXRpbycpICE9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvKXtcclxuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSBjb29ja2llIGlmIHRoZSBzYXZlZCBjb29raWUgZG9lcyBub3QgbWF0Y2ggdGhlIGN1cnJlbnQgZGV2aWNlIHBpeGVsIHJlYXRpb1xyXG5cclxuICAgICAgICAgICAgdmFyIGRhdGVPID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgZGF0ZU8uc2V0VGltZSggZGF0ZU8uZ2V0VGltZSgpIC0gMzYwMDAwMCApOyAvLyBzZXQgYSBwYXN0IGRhdGUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gbWFrZSB0aGUgY29va2llIGV4cGlyZWRcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmNvb2tpZSA9ICdmbG9fZGV2aWNlX3BpeGVsX3JhdGlvPScgKyB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyArICc7JyArICcgZXhwaXJlcz0nICsgZGF0ZU8udG9VVENTdHJpbmcoKSArJzsgcGF0aD0vJztcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSkoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvb2tpZShuYW1lLHZhbHVlLGRheXMpIHtcclxuICAgICAgICB2YXIgZXhwaXJlcyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGRheXMpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkrKGRheXMqMjQqNjAqNjAqMTAwMCkpO1xyXG4gICAgICAgICAgICBleHBpcmVzID0gXCI7IGV4cGlyZXM9XCIrZGF0ZS50b0dNVFN0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lK1wiPVwiK3ZhbHVlK2V4cGlyZXMrXCI7IHBhdGg9L1wiO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZsb0dldENvb2tpZShjbmFtZSkge1xyXG4gICAgICAgIHZhciBuYW1lID0gY25hbWUgKyBcIj1cIjtcclxuICAgICAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTxjYS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgYyA9IGNhW2ldO1xyXG4gICAgICAgICAgICB3aGlsZSAoYy5jaGFyQXQoMCk9PScgJykgYyA9IGMuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICBpZiAoYy5pbmRleE9mKG5hbWUpID09PSAwKSByZXR1cm4gYy5zdWJzdHJpbmcobmFtZS5sZW5ndGgsYy5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgLyogRU5EOiBNT0JJTEUgQ09PS0lFICovXHJcblxyXG4gIC8qIFNUQVJUOiBXSURHRVRTIEpTICovXHJcbiAgd2luZG93LndpZGdldF9uZXdzbGV0dGVyX3NpZ251cCA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgdmFyICRmb3JtID0gJChcIi53aWRnZXRfX2Zsby1mb3JtLS1uZXdzbGV0dGVyXCIpO1xyXG5cclxuICAgIGlmICgkZm9ybS5sZW5ndGgpIHtcclxuICAgICAgLy8gU3RhcnQ6IFZhbGlkYXRpb25cclxuICAgICAgJGZvcm0ucGFyc2xleSgpO1xyXG4gICAgICAvLyBFbmQ6IFZhbGlkYXRpb25cclxuXHJcbiAgICAgIC8vIFN0YXJ0OiBNYWlsY2hpbXAgU3Vic2NyaXB0aW9uXHJcbiAgICAgIHZhclxyXG4gICAgICAgIGVtYmVkX2NvZGUgPVxyXG4gICAgICAgICAgdW5lc2NhcGUoXHJcbiAgICAgICAgICAgICRmb3JtLnBhcmVudCgpLmZpbmQoXCIuZW1iZWRfY29kZVwiKS50ZXh0KClcclxuICAgICAgICAgICksXHJcbiAgICAgICAgJGVtYmVkX2NvZGUgPSAkKFwiPGRpdj5cIikuaHRtbChlbWJlZF9jb2RlKTtcclxuXHJcbiAgICAgIGlmKHR5cGVvZiAkZW1iZWRfY29kZS5maW5kKFwiZm9ybVwiKS5hdHRyKFwiYWN0aW9uXCIpICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgdmFyIGVtYmVkX2Zvcm1fYWN0aW9uID0gJGVtYmVkX2NvZGUuZmluZChcImZvcm1cIikuYXR0cihcImFjdGlvblwiKS5yZXBsYWNlKC9cXFxcXCIvZywgJycpO1xyXG4gICAgICAgICRmb3JtLmF0dHIoXCJhY3Rpb25cIiwgZW1iZWRfZm9ybV9hY3Rpb24pO1xyXG4gICAgICB9ZWxzZXtcclxuICAgICAgICBjb25zb2xlLmxvZygnVGhlIG1haWxjaGltcCBjb2RlIGlzIGluY29yZWN0Jyk7XHJcbiAgICAgICAgJGZvcm0uZmluZCgnLndpZGdldF9fZmxvLWZvcm0tLW5ld3NsZXR0ZXJfX2Zvcm0tc3VibWl0JykuY3NzKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEVuZDogTWFpbGNoaW1wIFN1YnNjcmlwdGlvblxyXG5cclxuICAgIH1cclxuXHJcbiAgfVxyXG4gIC8qIEVORDogV0lER0VUUyBKUyAqL1xyXG4iLCIkKGZ1bmN0aW9uKCl7XG5cbiAgICAkKFxuICAgICAgW1xuICAgICAgICBcIi5jb21tZW50cy1ibG9ja19fdG9wLWJhci1oaWRlLWJ1dHRvblwiLFxuICAgICAgICBcIi5jb21tZW50cy1ibG9ja19fdG9wLWJhci1zaG93LWJ1dHRvblwiLFxuICAgICAgICBcIi5jb21tZW50cy1ibG9ja19fdG9wLWJhci10b2dnbGUtYnV0dG9uXCJcbiAgICAgIF0uam9pbihcIiwgXCIpXG4gICAgKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5jb21tZW50cy1ibG9jaycpLnRvZ2dsZUNsYXNzKFwiY29tbWVudHMtYmxvY2stLWV4cGFuZGVkXCIpLnRvZ2dsZUNsYXNzKFwiY29tbWVudHMtYmxvY2stLWNvbGxhcHNlZFwiKTtcbiAgICAgICAgJChcIi5jb21tZW50cy1ibG9ja19fcG9zdHNcIikuc2xpZGVUb2dnbGUoKTtcbiAgICB9KTtcblxufSk7XG4iLCJpZigkKFwiLmZsby1ibG9jay0tbWVyZ2VkLXdpdGgtaGVhZGVyXCIpLmxlbmd0aCkge1xuICAkKFwiYm9keSBoZWFkZXJcIikuZmlyc3QoKS5yZW1vdmUoKTtcbn1cbiIsIiQoZnVuY3Rpb24oKXtcblxuXHQkKCcucGFnZScpLm9uKCdzdWJtaXQnLCcuZmxvLWZvcm1fX2J1aWx0LWluJyxmdW5jdGlvbihlKXtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHR2YXIgZm9ybSA9ICQodGhpcyksXG5cdFx0XHRjb250YWluZXIgPSAnLmNvbnRhY3QtcmVzcG9uc2UnOyAgLy8gdGhlIGRpdiBmb3IgdGhlIGVycm9yIHJlc3BvbnNlIG1lc3NhZ2VzXG5cblx0XHRqUXVlcnkoJy5mbG8tbmFtZScpLnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XG5cdFx0alF1ZXJ5KCcuZmxvLWVtYWlsJykucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcblxuXHRcdGpRdWVyeShjb250YWluZXIpLmh0bWwoJycpO1xuXG5cdFx0alF1ZXJ5LmFqYXgoe1xuXHRcdFx0dXJsOiBhamF4dXJsLFxuXHRcdFx0ZGF0YTogJyZhY3Rpb249ZmxvU2VuZENvbnRhY3QmJytqUXVlcnkoIGZvcm0gKS5zZXJpYWxpemUoKSxcblx0XHRcdHR5cGU6ICdQT1NUJyxcblx0XHRcdGRhdGFUeXBlOiBcImpzb25cIixcblx0Ly8gICAgICBjYWNoZTogZmFsc2UsXG5cdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoanNvbikge1xuXG5cdFx0XHRcdC8valF1ZXJ5KCcjZmxvLWxvYWRpbmcnKS5mYWRlT3V0KCdzbG93Jyk7IC8vIGxvYWRpbmcgZWZmZWN0XG5cblx0XHRcdFx0aWYoanNvbi5jb250YWN0X25hbWUgKXtcblx0XHRcdFx0XHRqUXVlcnkoJy5mbG8tbmFtZScpLmFkZENsYXNzKCdpbnZhbGlkJyk7XG5cdFx0XHRcdFx0alF1ZXJ5KGNvbnRhaW5lcikuYXBwZW5kKGpzb24uY29udGFjdF9uYW1lKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGpzb24uY29udGFjdF9lbWFpbCApe1xuXHRcdFx0XHRcdGpRdWVyeSgnLmZsby1lbWFpbCcpLmFkZENsYXNzKCdpbnZhbGlkJyk7XG5cdFx0XHRcdFx0alF1ZXJ5KGNvbnRhaW5lcikuYXBwZW5kKGpzb24uY29udGFjdF9lbWFpbCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihqc29uLmVycm9yX21lc3NhZ2UgKXtcblx0XHRcdFx0XG5cdFx0XHRcdFx0alF1ZXJ5KGNvbnRhaW5lcikuYXBwZW5kKGpzb24uZXJyb3JfbWVzc2FnZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRcblxuXHRcdFx0XHRpZihqc29uLm1lc3NhZ2UgKXtcblx0XHRcdFx0XHRqUXVlcnkoJy5mbG8tbW9kYWwnKS5mYWRlSW4oJ3Nsb3cnKTtcblxuXHRcdFx0XHRcdGpRdWVyeSggZm9ybSkuZmluZCgnaW5wdXRbdHlwZT1cInRleHRcIl0sIHRleHRhcmVhJykudmFsKCcnKTtcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGpRdWVyeSgnLmZsby1tb2RhbCcpLmZhZGVPdXQoJ3Nsb3cnKTtcblx0XHRcdFx0XHR9LDMwMDApO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH0pO1xuXHR9KTtcblxufSk7XG4iLCJ3aW5kb3cuZmxvX3NoYXJlX3JvbGxvdmVyID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgJGIgPSBcIi5mbG8tc2hhcmUtcm9sbG92ZXJcIjtcblxuICAkZWwuZmluZCgkYitcIl9fdHJpZ2dlclwiKS5jbGljayhmdW5jdGlvbigpe1xuXG4gICAgJGVsLnRvZ2dsZUNsYXNzKFwidmlzaWJsZVwiKTtcbiAgfSk7XG59XG4iLCIkKGZ1bmN0aW9uKCl7XG4gICQoXCIuZmxvLXZpZGVvLWVtYmVkXCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICB2YXIgdmlkZW9fZW1iZWQgPSAkKHRoaXMpO1xuICAgIHZhciB2aWRlb19lbWJlZF9fbG9hZGVkX2NsYXNzID0gXCJmbG8tdmlkZW8tZW1iZWQtLWxvYWRlZFwiO1xuICAgIHZhciB2aWRlb19zY3JlZW4gPSB2aWRlb19lbWJlZC5maW5kKFwiLmZsby12aWRlby1lbWJlZF9fc2NyZWVuXCIpO1xuICAgIHZhciB2aWRlb19zY3JlZW5fX2VtYmVkX2NvZGUgPSB2aWRlb19zY3JlZW4uYXR0cihcImRhdGEtZmxvLXZpZGVvLWVtYmVkLWVtYmVkLWNvZGVcIik7XG4gICAgdmFyIHZpZGVvX2J1dHRvbiA9IHZpZGVvX2VtYmVkLmZpbmQoXCIuZmxvLXZpZGVvLWVtYmVkX192aWRlby1idXR0b25cIik7XG4gICAgdmFyIHZpZGVvX3N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2aWRlb19zY3JlZW4uaHRtbCh2aWRlb19zY3JlZW5fX2VtYmVkX2NvZGUpO1xuICAgICAgdmlkZW9fZW1iZWQuYWRkQ2xhc3ModmlkZW9fZW1iZWRfX2xvYWRlZF9jbGFzcyk7XG4gICAgfVxuICAgIHZhciB2aWRlb19zdG9wID0gZnVuY3Rpb24oKSB7XG4gICAgICB2aWRlb19lbWJlZC5yZW1vdmVDbGFzcyh2aWRlb19lbWJlZF9fbG9hZGVkX2NsYXNzKTtcbiAgICAgIHZpZGVvX3NjcmVlbi5odG1sKFwiXCIpO1xuICAgIH1cbiAgICB2aWRlb19idXR0b24ub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHN3aXRjaCAodmlkZW9fZW1iZWQuaGFzQ2xhc3ModmlkZW9fZW1iZWRfX2xvYWRlZF9jbGFzcykpIHtcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICB2aWRlb19zdGFydCgpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgIHZpZGVvX3N0b3AoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2aWRlb19lbWJlZC5vbihcImZsb1ZpZGVvRW1iZWRTdG9wXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgdmlkZW9fc3RvcCgpO1xuICAgIH0pXG5cblxuXG4gIH0pO1xufSk7XG4iLCJ3aW5kb3cuZmxvX21vYmlsZV9jYXRlZ29yeV9zd2l0Y2hlciA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1ibG9jay1jYXRlZ29yeS1zd2l0Y2hlci0xXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICAkZWwuZmluZChkb3RiICsgXCJfX2xheW91dC0tZHJvcGRvd25cIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8IDc2OCl7XG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2xheW91dC0tZHJvcGRvd25cIikudG9nZ2xlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gICAgfVxuICB9KVxufSIsIndpbmRvdy5mbG9fYmxvY2tfY29udGFjdF9ibG9ja18xID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLWJsb2NrLWNvbnRhY3QtYmxvY2stMVwiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyICRiID0gJGVsLmZpbmQoZG90Yik7XG4gIHZhciAkZm9ybV93cmFwID0gJGVsLmZpbmQoZG90YiArIFwiX19mb3JtLXdyYXBcIik7XG4gIC8vIFxuICAvLyAvKiBTVEFSVDogREVURVJNSU5FIElGIFRIRSBTQ1JPTEwgRUZGRUNUIERPRVMgTk9UIE5FRUQgVE8gQkUgVVNFRCAqL1xuICAvLyAgIHZhciBpc19zYWZhcmkgPSAvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAvLyAgIHZhciBub19zY3JvbGxfZWZmZWN0X2NsYXNzID0gYiArIFwiLS1uby1zY3JvbGwtZWZmZWN0XCI7XG4gIC8vICAgdmFyIHNjcm9sbF9lZmZlY3RfYWN0aXZlID0gJGIuaGFzQ2xhc3Mobm9fc2Nyb2xsX2VmZmVjdF9jbGFzcykgPyBmYWxzZSA6IHRydWU7XG4gIC8vIFxuICAvLyAgIGlmIChcbiAgLy8gICAgICQod2luZG93KS53aWR0aCgpIDw9IDEwMjRcbiAgLy8gICAgIHx8IGlzX3NhZmFyaVxuICAvLyAgICkge1xuICAvLyAgICAgc2Nyb2xsX2VmZmVjdF9hY3RpdmUgPSBmYWxzZTtcbiAgLy8gICAgICRiLmFkZENsYXNzKG5vX3Njcm9sbF9lZmZlY3RfY2xhc3MpO1xuICAvLyAgIH1cbiAgLy8gLyogRU5EOiBERVRFUk1JTkUgSUYgVEhFIFNDUk9MTCBFRkZFQ1QgRE9FUyBOT1QgTkVFRCBUTyBCRSBVU0VEICovXG4gIC8vIFxuICAvLyAvKiBTVEFSVDogREVTS1RPUCBSVUxFUyAqL1xuICAvLyAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDEwMjQgJiYgc2Nyb2xsX2VmZmVjdF9hY3RpdmUpIHtcbiAgLy8gXG4gIC8vICAgICAvKiBTVEFSVDogU0NST0xMIEVGRkVDVCAqL1xuICAvLyAgICAgICAvLyBjb25zdCBwcyA9IG5ldyBQZXJmZWN0U2Nyb2xsYmFyKCRlbC5maW5kKGRvdGIgKyBcIl9fZm9ybS13cmFwXCIpWzBdLCB7XG4gIC8vICAgICAgIC8vICAgLy8gd2hlZWxTcGVlZDogMixcbiAgLy8gICAgICAgLy8gICB3aGVlbFByb3BhZ2F0aW9uOiB0cnVlLFxuICAvLyAgICAgICAvLyAgIG1heFNjcm9sbGJhckxlbmd0aDogMFxuICAvLyAgICAgICAvLyB9KTtcbiAgLy8gXG4gIC8vICAgICAgIHZhciBsb2NrX3Njcm9sbCA9IGZhbHNlO1xuICAvLyAgICAgICB2YXIgYXRfc3RhcnQgPSB0cnVlO1xuICAvLyAgICAgICB2YXIgYXRfZW5kID0gZmFsc2U7XG4gIC8vIFxuICAvLyAgICAgICAvKiBTVEFSVDogQUNUVUFMIFNDUk9MTCAqL1xuICAvLyAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBmdW5jdGlvbihlKXtcbiAgLy8gICAgICAgICAgIC8vIHZhciBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICAvLyAgICAgICAgICAgdmFyIHN0ZXAgPSBlLmRlbHRhWSAqIC0xO1xuICAvLyAgICAgICAgICAgdmFyIGZvcm1fd3JhcF90b3AgPSAkZm9ybV93cmFwLnBvc2l0aW9uKCkudG9wO1xuICAvLyAgICAgICAgICAgdmFyIGZvcm1fd3JhcF9uZXdfdG9wID0gZm9ybV93cmFwX3RvcCArIHN0ZXA7XG4gIC8vICAgICAgICAgICB2YXIgZm9ybV93cmFwX2hlaWdodCA9ICRmb3JtX3dyYXAub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gIC8vICAgICAgICAgICB2YXIgYmxvY2tfaGVpZ2h0ID0gJGVsLm91dGVySGVpZ2h0KHRydWUpO1xuICAvLyAgICAgICAgICAgdmFyIGJsb2NrX3RvcCA9ICRlbC5vZmZzZXQoKS50b3AgLSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG4gIC8vICAgICAgICAgICB2YXIgZGlmZmVyZW5jZV9pbl9oZWlnaHQgPSBibG9ja19oZWlnaHQgLSBmb3JtX3dyYXBfaGVpZ2h0O1xuICAvLyAgICAgICAgICAgdmFyIGRpcmVjdGlvbjtcbiAgLy8gICAgICAgICAgIHZhciBpc19pbl92aWV3cG9ydCA9IGJsb2NrX3RvcCA+IC0xMDAgJiYgYmxvY2tfdG9wIDwgMTAwO1xuICAvLyBcbiAgLy8gICAgICAgICAgIC8qIFNUQVJUOiBERVRFUk1JTkUgRElSRUNUSU9OICovXG4gIC8vICAgICAgICAgICAgIGlmIChzdGVwID4gMCkge1xuICAvLyAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IFwidXBcIjtcbiAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICAgICAgICBkaXJlY3Rpb24gPSBcImRvd25cIjtcbiAgLy8gICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgLyogRU5EOiBERVRFUk1JTkUgRElSRUNUSU9OICovXG4gIC8vIFxuICAvLyAgICAgICAgICAgLyogU1RBUlQ6IERFVEVSTUlORSBJRiBJUyBBVCBTVEFSVCBPUiBBVCBFTkQgKi9cbiAgLy8gICAgICAgICAgICAgYXRfZW5kID0gZm9ybV93cmFwX3RvcCA8PSBkaWZmZXJlbmNlX2luX2hlaWdodCArIDEwMDtcbiAgLy8gICAgICAgICAgIC8qIEVORDogREVURVJNSU5FIElGIElTIEFUIFNUQVJUIE9SIEFUIEVORCAqL1xuICAvLyBcbiAgLy8gICAgICAgICAgIC8qIFNUQVJUOiBERVRFUk1JTkUgSUYgSVMgQVQgU1RBUlQgT1IgQVQgU1RBUlQgKi9cbiAgLy8gICAgICAgICAgICAgYXRfc3RhcnQgPSBmb3JtX3dyYXBfdG9wID49IGJsb2NrX2hlaWdodCAtIDEwO1xuICAvLyAgICAgICAgICAgLyogRU5EOiBERVRFUk1JTkUgSUYgSVMgQVQgU1RBUlQgT1IgQVQgU1RBUlQgKi9cbiAgLy8gXG4gIC8vICAgICAgICAgICAvKiBTVEFSVDogQ0hBTkdFIEZPUk0gV1JBUCBQT1NJVElPTiAqL1xuICAvLyAgICAgICAgICAgICBpZiAoXG4gIC8vICAgICAgICAgICAgICAgaXNfaW5fdmlld3BvcnRcbiAgLy8gICAgICAgICAgICAgICAmJiAoXG4gIC8vICAgICAgICAgICAgICAgICAoZGlyZWN0aW9uID09IFwiZG93blwiICYmICFhdF9lbmQpXG4gIC8vICAgICAgICAgICAgICAgICB8fCAoZGlyZWN0aW9uID09IFwidXBcIiAmJiAhYXRfc3RhcnQpXG4gIC8vICAgICAgICAgICAgICAgKVxuICAvLyAgICAgICAgICAgICAgICYmIGZvcm1fd3JhcF9uZXdfdG9wID49IGRpZmZlcmVuY2VfaW5faGVpZ2h0XG4gIC8vICAgICAgICAgICAgICAgJiYgZm9ybV93cmFwX25ld190b3AgPD0gYmxvY2tfaGVpZ2h0XG4gIC8vICAgICAgICAgICAgICkge1xuICAvLyAgICAgICAgICAgICAgICRmb3JtX3dyYXAuY3NzKFwidG9wXCIsIGZvcm1fd3JhcF9uZXdfdG9wKTtcbiAgLy8gICAgICAgICAgICAgfVxuICAvLyAgICAgICAgICAgLyogRU5EOiBDSEFOR0UgRk9STSBXUkFQIFBPU0lUSU9OICovXG4gIC8vIFxuICAvLyAgICAgICAgICAgLyogU1RBUlQ6IERFVEVSTUlORSBJRiBTQ1JPTEwgTkVFRFMgVE8gQkUgTE9DS0VEICovXG4gIC8vICAgICAgICAgICAgIGlmIChcbiAgLy8gICAgICAgICAgICAgICAvLyBpcyBpbiB2aWV3cG9ydFxuICAvLyAgICAgICAgICAgICAgIGlzX2luX3ZpZXdwb3J0XG4gIC8vIFxuICAvLyAgICAgICAgICAgICAgIC8vIGRpcmVjdGlvblxuICAvLyAgICAgICAgICAgICAgICYmIChcbiAgLy8gICAgICAgICAgICAgICAgIC8vIGdvaW5nIGRvd25cbiAgLy8gICAgICAgICAgICAgICAgIChcbiAgLy8gICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID09IFwiZG93blwiXG4gIC8vICAgICAgICAgICAgICAgICAgICYmIGF0X3N0YXJ0ID09IGZhbHNlXG4gIC8vICAgICAgICAgICAgICAgICAgICYmIGF0X2VuZCA9PSBmYWxzZVxuICAvLyAgICAgICAgICAgICAgICAgKVxuICAvLyBcbiAgLy8gICAgICAgICAgICAgICAgIHx8XG4gIC8vIFxuICAvLyAgICAgICAgICAgICAgICAgLy8gZ29pbmcgdXBcbiAgLy8gICAgICAgICAgICAgICAgIChcbiAgLy8gICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID09IFwidXBcIlxuICAvLyAgICAgICAgICAgICAgICAgICAmJiBhdF9zdGFydCA9PSBmYWxzZVxuICAvLyAgICAgICAgICAgICAgICAgICAmJiBhdF9lbmQgPT0gZmFsc2VcbiAgLy8gICAgICAgICAgICAgICAgIClcbiAgLy8gICAgICAgICAgICAgICApXG4gIC8vICAgICAgICAgICAgICkge1xuICAvLyAgICAgICAgICAgICAgIGxvY2tfc2Nyb2xsID0gdHJ1ZTtcbiAgLy8gICAgICAgICAgICAgfSBlbHNlIHtcbiAgLy8gICAgICAgICAgICAgICBsb2NrX3Njcm9sbCA9IGZhbHNlO1xuICAvLyAgICAgICAgICAgICB9XG4gIC8vICAgICAgICAgICAvKiBFTkQ6IERFVEVSTUlORSBJRiBTQ1JPTEwgTkVFRFMgVE8gQkUgTE9DS0VEICovXG4gIC8vIFxuICAvLyAgICAgICAgICAgLyogU1RBUlQ6IExPRyBWQVJJQUJMRVMgKi9cbiAgLy8gICAgICAgICAgICAgdmFyIGxvZyA9IDA7XG4gIC8vICAgICAgICAgICAgIGlmIChsb2cpIHtcbiAgLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7XG4gIC8vICAgICAgICAgICAgICAgICAvLyBcImF0X3N0YXJ0XCI6IGF0X3N0YXJ0LFxuICAvLyAgICAgICAgICAgICAgICAgLy8gXCJhdF9lbmRcIjogYXRfZW5kLFxuICAvLyAgICAgICAgICAgICAgICAgLy8gXCJibG9ja1wiOiBibG9ja19oZWlnaHQsXG4gIC8vICAgICAgICAgICAgICAgICAvLyBcImJsb2NrX2hlaWdodFwiOiBibG9ja19oZWlnaHQsXG4gIC8vICAgICAgICAgICAgICAgICAvLyBcImJsb2NrX3RvcFwiOiBibG9ja190b3AsXG4gIC8vICAgICAgICAgICAgICAgICAvLyBcImRpcmVjdGlvblwiOiBkaXJlY3Rpb24sXG4gIC8vICAgICAgICAgICAgICAgICAvLyBcImRpZmZlcmVuY2VfaW5faGVpZ2h0XCI6IGRpZmZlcmVuY2VfaW5faGVpZ2h0LFxuICAvLyAgICAgICAgICAgICAgICAgLy8gXCJmb3JtX3dyYXBfaGVpZ2h0XCI6IGZvcm1fd3JhcF9oZWlnaHQsXG4gIC8vICAgICAgICAgICAgICAgICAvLyBcImZvcm1fd3JhcF90b3BcIjogZm9ybV93cmFwX3RvcCxcbiAgLy8gICAgICAgICAgICAgICAgIC8vIFwiaXNfaW5fdmlld3BvcnRcIjogaXNfaW5fdmlld3BvcnQsXG4gIC8vICAgICAgICAgICAgICAgICAvLyBcImxvY2tfc2Nyb2xsXCI6IGxvY2tfc2Nyb2xsLFxuICAvLyAgICAgICAgICAgICAgICAgXCJzdGVwXCI6IHN0ZXAsXG4gIC8vICAgICAgICAgICAgICAgfSk7XG4gIC8vICAgICAgICAgICAgIH1cbiAgLy8gICAgICAgICAgIC8qIEVORDogTE9HIFZBUklBQkxFUyAqL1xuICAvLyAgICAgICAgIH0pO1xuICAvLyAgICAgICAvKiBFTkQ6IEFDVFVBTCBTQ1JPTEwgKi9cbiAgLy8gXG4gIC8vICAgICAgIC8qIFNUQVJUOiBMT0NLIFNDUk9MTElORyAqL1xuICAvLyAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBmdW5jdGlvbihlKXtcbiAgLy8gICAgICAgICAgIGlmIChsb2NrX3Njcm9sbCkge1xuICAvLyAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgICAgICAgICB9XG4gIC8vICAgICAgICAgfSk7XG4gIC8vICAgICAgIC8qIEVORDogTE9DSyBTQ1JPTExJTkcgKi9cbiAgLy8gICAgIC8qIEVORDogU0NST0xMIEVGRkVDVCAqL1xuICAvLyBcbiAgLy8gICB9XG4gIC8vIC8qIEVORDogREVTS1RPUCBSVUxFUyAqL1xuICAvLyBcbiAgLyogU1RBUlQ6IFNDUk9MTCBET1dOIFRPIEZPUk0gKi9cbiAgICAkZWwuZmluZChkb3RiICsgXCJfX3Njcm9sbC1kb3duXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogJGZvcm1fd3JhcC5vZmZzZXQoKS50b3BcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIFxuICAgIGlmKCEkKGRvdGIpLmhhc0NsYXNzKGIgKyAnLS1uby1zY3JvbGwtZWZmZWN0JykpIHtcbiAgICAgICQod2luZG93KS5vbignc2Nyb2xsJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gJCh3aW5kb3cpLmhlaWdodCgpKSB7XG4gICAgICAgICAgJChkb3RiICsgJ19fZGVza3RvcC13cmFwJykuYWRkQ2xhc3MoJ2ludmlzaWJsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoZG90YiArICdfX2Rlc2t0b3Atd3JhcCcpLnJlbW92ZUNsYXNzKCdpbnZpc2libGUnKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgXG4gIC8qIEVORDogU0NST0xMIERPV04gVE8gRk9STSAqL1xufVxuIiwid2luZG93LmZsb19mYXFfMiA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1ibG9jay1mYXEtYmxvY2stMlwiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyIHBhcmVudCA9ICRlbC5wYXJlbnRzKFwiLmZsby1ibG9ja1wiKTtcblxuICB2YXIgc2xpZGVyID0gJGVsLmZpbmQoZG90YiArIFwiX19mYXEtc2xpZGVyXCIpO1xuICB2YXIgYXJyb3dfbGVmdCA9ICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLWxlZnRcIik7XG4gIHZhciBhcnJvd19yaWdodCA9ICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLXJpZ2h0XCIpO1xuXG4gICAgLyogU1RBUlQ6IENPVU5UIC0gU0VUIElURU1TIE5VTUJFUlMgKi9cbiAgICAgIHNsaWRlci5vbihcImluaXQgYmVmb3JlQ2hhbmdlXCIsIGZ1bmN0aW9uKGUsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBpbmRleDtcbiAgICAgICAgaWYgKGUudHlwZSA9PSBcImluaXRcIikge1xuICAgICAgICAgIGluZGV4ID0gcGFyc2VJbnQoJHRoaXMuZmluZChcIi5zbGljay1jdXJyZW50XCIpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIpKSsxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluZGV4ID0gcGFyc2VJbnQoJHRoaXMuZmluZChcIi5zbGljay1zbGlkZVtkYXRhLXNsaWNrLWluZGV4PVwiICsgbmV4dFNsaWRlICsgXCJdXCIpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIpKSsxO1xuICAgICAgICB9XG5cbiAgICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19jdXJyZW50LWl0ZW0tbnVtYmVyXCIpLmNoYW5nZVRleHRVSShcbiAgICAgICAgICBwYWQoaW5kZXgsIDIpLFxuICAgICAgICAgIFwiY291bnRlclwiXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgIC8qIEVORDogQ09VTlQgLSBTRVQgSVRFTVMgTlVNQkVSUyAqL1xuXG4gICAgLyogU1RBUlQ6IENPVU5URVIgLSBDT1VOVCAqL1xuICAgICAgLm9uKFwiaW5pdFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAkZWwuZmluZChkb3RiICsgXCJfX3RvdGFsLWl0ZW0tbnVtYmVyXCIpLnRleHQoXG4gICAgICAgICAgcGFkKCRlbC5maW5kKFwiLnNsaWNrLXNsaWRlOm5vdCguc2xpY2stY2xvbmVkKVwiKS5sZW5ndGgsIDIpXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgIC8qIEVORDogQ09VTlRFUiAtIENPVU5UICovXG5cbiAgICAvKiBTVEFSVDogRkFRIFNMSURFUiAqL1xuICAgICAgLnNsaWNrKHtcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICByZXNwb25zaXZlOlxuICAgICAgICAgIFt7XG4gICAgICAgICAgICBicmVha3BvaW50OiA3NjcsXG4gICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfV1cbiAgICAgIH0pO1xuICAvKiBFTkQ6IEZBUSBTTElERVIgKi9cblxuICAvKiBTVEFSVDogQVJST1dTICovXG4gIGFycm93X2xlZnQuY2xpY2soZnVuY3Rpb24oKXtcbiAgICBzbGlkZXIuc2xpY2soJ3NsaWNrUHJldicpO1xuICB9KTtcblxuICBhcnJvd19yaWdodC5jbGljayhmdW5jdGlvbigpe1xuICAgIHNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XG4gIH0pO1xuLyogU1RBUlQ6IEFSUk9XUyAqL1xufVxuIiwid2luZG93LmZsb19ibG9ja19nYWxsZXJ5X3ZpZXdfMiA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1ibG9jay1nYWxsZXJ5LXZpZXctMlwiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyICRiID0gJGVsLmZpbmQoZG90Yik7XG5cbiAgLyogU1RBUlQ6IGRlZmluaW5nIGFsbCBuZWNlc3NhcnkgZnVuY3Rpb25zICovXG4gICAgZnVuY3Rpb24gZG9fbWFzb25yeSgpIHtcbiAgICAgICRiLm1hc29ucnkoe1xuICAgICAgICBjb2x1bW5XaWR0aDogJy5ncmlkLXNpemVyJyxcbiAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcmVsb2FkX21hc29ucnkoKXtcbiAgICAgIC8vIHdlIG5lZWQgcHJlY2lzZSB3aWR0aHMsIHNvIHdlIHVzZSB0aGUgdmFyIGJlbG93IHRvIGdldCB0aGUgZGVjaW1hbHMgdG9vXG4gICAgICB2YXIgcHJlZGVzdGluZWRfd2lkdGggPSAkZWwuZmluZChkb3RiICsgXCJfX2ltYWdlLXRodW1iXCIpWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuXG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2ltYWdlLXRodW1iXCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICRvcmlnX2hlaWdodCA9ICQodGhpcykuYXR0cignZGF0YS1oZWlnaHQnKTtcbiAgICAgICAgdmFyICRvcmlnX3dpZHRoID0gJCh0aGlzKS5hdHRyKCdkYXRhLXdpZHRoJyk7XG4gICAgICAgIHZhciAkY29lZmYgPSBwcmVkZXN0aW5lZF93aWR0aCAqIDEwMCAvICRvcmlnX3dpZHRoO1xuICAgICAgICB2YXIgcHJlZGVzdGluZWRfaGVpZ2h0ID0gKCAkb3JpZ19oZWlnaHQgKiAkY29lZmYgKSAvIDEwMDtcbiAgICAgICAgJCh0aGlzKS5jc3MoJ2hlaWdodCcsIHByZWRlc3RpbmVkX2hlaWdodCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmVzIHRoZSBwcmVsb2FkX21hc29ucnkgY2FsY3VsYXRpb25zIGFuZCByZW5kZXJzIHRoZSBkeW5hbWljIG1hc29ucnlcbiAgICBmdW5jdGlvbiB1bnNldF9wcmVsb2FkX21hc29ucnkoKXtcbiAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9faW1hZ2UtdGh1bWJcIikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmNzcygnaGVpZ2h0JywgJycpO1xuICAgICAgfSlcbiAgICB9XG5cbiAgLyogRU5EOiBkZWZpbmluZyBhbGwgbmVjZXNzYXJ5IGZ1bmN0aW9ucyAqL1xuXG4gIC8qIFNUQVJUOiBNQVNPTlJZICovXG4gICAgaWYgKCAod2luZG93LmlubmVyV2lkdGggPiA3NjcpIHx8ICgkYi5hdHRyKCdkYXRhLW1vYmlsZS1jb2xzJykgPT0gMiAmJiB3aW5kb3cuaW5uZXJXaWR0aCA8IDc2OCkgKSB7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gc2V0IGltYWdlIGhhcmRjb2RlZCBzaXplcyBiZWZvcmUgZG9pbmcgbWFzb25yeVxuICAgICAgICBwcmVsb2FkX21hc29ucnkoKTtcbiAgICAgICAgZG9fbWFzb25yeSgpO1xuICAgICAgfSwgOSk7XG5cbiAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9faW1hZ2U6bGFzdC1jaGlsZFwiKS5maW5kKFwiaW1nXCIpLmxvYWQoIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIHdoZW4gYWxsIGltYWdlcyBoYXZlIGxvYWRlZCwgdW5zZXQgdGhlIGhhcmRjb2RlZCBzaXplcyBhbmQgcmVjYWxjdWxhdGVcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgIHVuc2V0X3ByZWxvYWRfbWFzb25yeSgpO1xuICAgICAgICAgIGRvX21hc29ucnkoKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfSk7XG5cbiAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZG9fbWFzb25yeSgpO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9KTtcblxuICAgIH1cblxuICAgIC8vIFRPRE86IG1vYmlsZSBzaW1wbGlmeSBhbmQgbGF6eWxvYWQgb25kZW1hbmRcblxuICAgIC8qIFNUQVJUOiBvbmRlbWFuZCBsYXp5bG9hZGluZyAqL1xuICAgICAgdmFyIGltZ19lbCA9ICRlbC5maW5kKGRvdGIgKyBcIl9faW1hZ2VcIik7XG4gICAgICBpbWdfZWwudmlld3BvcnRDaGVja2VyKHtcbiAgICAgICAgY2xhc3NUb0FkZDondmlzaWJsZScsXG4gICAgICAgIG9mZnNldDogNDAsXG4gICAgICAgIGNsYXNzVG9SZW1vdmU6J3RvLWFwcGVhci1kaXNhYmxlZCBsYXp5JyxcbiAgICAgICAgY2FsbGJhY2tGdW5jdGlvbjogZnVuY3Rpb24oZWxlbSwgYWN0aW9uKSB7XG4gICAgICAgICAgaWYgKGFjdGlvbiA9PSBcImFkZFwiICYmICFlbGVtWzBdLmhhc0F0dHJpYnV0ZShcInNyY1wiKSkge1xuICAgICAgICAgICAgdmFyIGVsZW1faW1nID0gZWxlbS5maW5kKCdpbWcnKTtcbiAgICAgICAgICAgIGVsZW1faW1nLmF0dHIoXCJzcmNcIiwgZWxlbV9pbWcuYXR0cihcImRhdGEtc3JjXCIpKTtcbiAgICAgICAgICAgIGVsZW1faW1nLmltYWdlc0xvYWRlZChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgZG9fbWFzb25yeSgpO1xuICAgICAgICAgICAgICB9LCAxMCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIC8qIEVORDogb25kZW1hbmQgbGF6eWxvYWRpbmcgKi9cblxuICAvKiBFTkQ6IE1BU09OUlkgKi9cblxuICAvKiBTVEFSVDogRkFOQ1kgQk9YICovXG4gICAgJGVsLmZpbmQoZG90YiArIFwiX19pbWFnZVwiKS5mYW5jeWJveCh7XG4gICAgICBsb29wOiB0cnVlXG4gICAgfSk7XG4gIC8qIEVORDogRkFOQ1kgQk9YICovXG59O1xuIiwid2luZG93LmZsb19ibG9ja19nYWxsZXJ5X3ZpZXdfMSA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1ibG9jay1nYWxsZXJ5LXZpZXctMVwiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyIHBhcmVudCA9ICRlbC5wYXJlbnRzKFwiLmZsby1ibG9ja1wiKTtcbiAgdmFyICRiID0gJGVsLmZpbmQoZG90Yik7XG5cbiAgLyogU1RBUlQ6IEZPQ1VTRUQgQ0xBU1MgKi9cbiAgICAkZWwuZmluZChkb3RiICsgXCJfX2ltYWdlc1wiKS5vbihcImJlZm9yZUNoYW5nZSBjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgJGIuYWRkQ2xhc3MoYiArIFwiLS1pcy1mb2N1c2VkXCIpO1xuICAgIH0pO1xuXG4gICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAkYi5yZW1vdmVDbGFzcyhiICsgXCItLWlzLWZvY3VzZWRcIik7XG4gICAgfSlcbiAgLyogRU5EOiBGT0NVU0VEIENMQVNTICovXG4gIGlmKCQod2luZG93KS53aWR0aCgpIDwgNzY4KXtcbiAgICAkZWwuZmluZChkb3RiICsgXCJfX2ltYWdlXCIpLmZpcnN0KCkub24oJ2xvYWQnLCBmdW5jdGlvbigpe1xuICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoJ3Jlc2l6ZScpO1xuICAgICAgJGVsLmZpbmQoZG90YikuY3NzKCdvcGFjaXR5JywgJzEnKTtcbiAgICB9KVxuICB9XG4gICRlbC5maW5kKGRvdGIgKyBcIl9faW1hZ2VzXCIpXG4gICAgLyogU1RBUlQ6IENPVU5UIC0gU0VUIENPVU5UICovXG4gICAgICAub24oXCJpbml0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBjb3VudCA9ICR0aGlzLmZpbmQoXCIuc2xpY2stc2xpZGU6bm90KC5zbGljay1jbG9uZWQpXCIpLmxlbmd0aDtcbiAgICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19jb3VudGVyLWNvdW50XCIpLmh0bWwoXG4gICAgICAgICAgcGFkKGNvdW50LCAyKVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAvKiBFTkQ6IENPVU5UIC0gU0VUIENPVU5UICovXG5cbiAgICAvKiBTVEFSVDogQ09VTlQgLSBTRVQgSU5ERVggKi9cbiAgICAgIC5vbihcImluaXQgYWZ0ZXJDaGFuZ2VcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoJHRoaXMuZmluZChcIi5zbGljay1jdXJyZW50XCIpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIpKSsxO1xuXG4gICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fY291bnRlci1pbmRleFwiKS5jaGFuZ2VUZXh0VUkoXG4gICAgICAgICAgcGFkKGluZGV4LCAyKSxcbiAgICAgICAgICBcImNvdW50ZXJcIlxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAvKiBFTkQ6IENPVU5UIC0gU0VUIElOREVYICovXG4gIDtcblxuICAvKiBTVEFSVDogR0FMTEVSWSBWSUVXIExBWU9VVCBBICovXG4gICAgaWYgKCRiLmhhc0NsYXNzKGIgKyBcIi0tZ2FsbGVyeS12aWV3LWxheW91dC1hXCIpKSB7XG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2ltYWdlc1wiKVxuICAgICAgICAuc2xpY2soe1xuICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgbGF6eUxvYWQ6ICdwcm9ncmVzc2l2ZScsXG4gICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBicmVha3BvaW50OiBcIjc2N1wiLFxuICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhenlMb2FkOiAncHJvZ3Jlc3NpdmUnLFxuICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgICA7XG4gICAgfVxuICAvKiBFTkQ6IEdBTExFUlkgVklFVyBMQVlPVVQgQSAqL1xuXG4gIC8qIFNUQVJUOiBHQUxMRVJZIFZJRVcgTEFZT1VUIEIgKi9cbiAgICBpZiAoJGIuaGFzQ2xhc3MoYiArIFwiLS1nYWxsZXJ5LXZpZXctbGF5b3V0LWJcIikpIHtcbiAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9faW1hZ2VzXCIpXG4gICAgICAgIC5zbGljayh7XG4gICAgICAgICAgdmFyaWFibGVXaWR0aDogdHJ1ZSxcbiAgICAgICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgIGNlbnRlck1vZGU6IHRydWUsXG4gICAgICAgICAgbGF6eUxvYWQ6ICdwcm9ncmVzc2l2ZScsXG4gICAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBicmVha3BvaW50OiBcIjc2N1wiLFxuICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGxhenlMb2FkOiAncHJvZ3Jlc3NpdmUnLFxuICAgICAgICAgICAgICAgIGNlbnRlck1vZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgICA7XG4gICAgfVxuICAvKiBFTkQ6IEdBTExFUlkgVklFVyBMQVlPVVQgQiAqL1xuXG5cbiAgLyogU1RBUlQ6IEFSUk9XUyAqL1xuICAgICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLXByZXZcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19pbWFnZXNcIikuc2xpY2soXCJzbGlja1ByZXZcIik7XG4gICAgfSk7XG4gICAgJGVsLmZpbmQoZG90YiArIFwiX19hcnJvdy0tbmV4dFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2ltYWdlc1wiKS5zbGljayhcInNsaWNrTmV4dFwiKTtcbiAgICB9KTtcbiAgLyogRU5EOiBBUlJPV1MgKi9cblxuICAvKiBTVEFSVDogU1RJQ0sgVE8gVE9QICovXG4gICAgaWYgKCRiLmhhc0NsYXNzKGIgKyBcIi0tc3R1Y2stdG8tdG9wXCIpICYmICQod2luZG93KS53aWR0aCgpID4gNzY3KSB7XG4gICAgICAvLyBmdW5jdGlvbiBzZXRfcGxhY2Vob2xkZXJfc2l6ZSgpIHtcbiAgICAgIC8vICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICAgJGVsLmZpbmQoZG90YiArIFwiX19wbGFjZWhvbGRlclwiKS5jc3MoXCJoZWlnaHRcIiwgJGVsLmZpbmQoZG90YiArIFwiX19jb250ZW50XCIpLmhlaWdodCgpKTtcbiAgICAgIC8vICAgfSwgMTApO1xuICAgICAgLy8gfVxuICAgICAgLy9cbiAgICAgIC8vIHNldF9wbGFjZWhvbGRlcl9zaXplKCk7XG4gICAgICAvL1xuICAgICAgLy8gJGVsLmZpbmQoZG90YiArIFwiX19pbWFnZXNcIikub24oXCJhZnRlckNoYW5nZVwiLCBmdW5jdGlvbigpe1xuICAgICAgLy8gICBzZXRfcGxhY2Vob2xkZXJfc2l6ZSgpO1xuICAgICAgLy8gfSk7XG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2NvbnRlbnRcIikuc3RpY2t5KCk7XG4gICAgfVxuICAvKiBFTkQ6IFNUSUNLIFRPIFRPUCAqL1xuXG59XG4iLCJ3aW5kb3cuZmxvX2Jsb2NrX2dhbGxlcnlfdmlld18zID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLWJsb2NrLWdhbGxlcnktdmlldy0zXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICB2YXIgJGIgPSAkZWwuZmluZChkb3RiKTtcblxuXG4gIC8qIFNUQVJUOiBTVElDS1kgVEVYVCBBUkVBICovXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX190ZXh0LWFyZWFcIikuc3RpY2tfaW5fcGFyZW50KHtcbiAgICAgICAgb2Zmc2V0X3RvcDogJChcIi5mbG8taGVhZGVyLS1zdGlja3lcIikubGVuZ3RoID8gMTAwIDogMFxuICAgICAgfSlcbiAgICB9XG4gIC8qIEVORDogU1RJQ0tZIFRFWFQgQVJFQSAqL1xuXG5cbiAgLyogU1RBUlQ6IExBWllMT0FESU5HICovXG5cbiAgICAvKiBTdGFydDogSXMgT24gU2NyZWVuIEZ1bmN0aW9uICovXG4gICAgICBmdW5jdGlvbiBpc0luVmlld3BvcnQoZWxlbWVudCkge1xuICAgICAgICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICB2YXIgb2Zmc2V0ID0gODAwO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHJlY3QudG9wID49IDAgJiZcbiAgICAgICAgICByZWN0LmxlZnQgPj0gMCAmJlxuICAgICAgICAgIHJlY3QuYm90dG9tIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgKyBvZmZzZXQgIHx8IGh0bWwuY2xpZW50SGVpZ2h0ICsgb2Zmc2V0KSAgJiZcbiAgICAgICAgICByZWN0LnJpZ2h0IDw9ICh3aW5kb3cuaW5uZXJXaWR0aCB8fCBodG1sLmNsaWVudFdpZHRoKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIC8qIEVuZDogSXMgT24gU2NyZWVuIEZ1bmN0aW9uICovXG5cbiAgICAkKGRvY3VtZW50KS5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKXtcblxuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19pbWFnZTpub3QoW3NyY10pXCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGltYWdlID0gJCh0aGlzKTtcblxuICAgICAgICAkKHdpbmRvdykub24oXCJzY3JvbGxcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICBpZiAoaXNJblZpZXdwb3J0KGltYWdlWzBdKSkge1xuICAgICAgICAgICAgaW1hZ2UuYXR0cihcInNyY1wiLCBpbWFnZS5hdHRyKFwiZGF0YS1zcmNcIikgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9KTtcblxuICAgIH0pO1xuXG4gIC8qIEVORDogTEFaWUxPQURJTkcgKi9cblxufVxuIiwid2luZG93LmZsb19pbWFnZV9saW5rc18zID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLWJsb2NrLWltYWdlLWxpbmtzLTNcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG4gIHZhciBwYXJlbnQgPSAkZWwucGFyZW50cyhcIi5mbG8tYmxvY2tcIik7XG5cbiAgdmFyIHNsaWRlciA9ICRlbC5maW5kKGRvdGIgKyBcIl9faW1hZ2UtbGlua3Mtc2xpZGVyXCIpO1xuICB2YXIgYXJyb3dfbGVmdCA9ICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLWxlZnRcIik7XG4gIHZhciBhcnJvd19yaWdodCA9ICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLXJpZ2h0XCIpO1xuXG4gIC8qIFNUQVJUOiBGRUFUVVJFRCBTTElERVNIT1cgU0xJREVSICovXG4gICAgc2xpZGVyLnNsaWNrKHtcbiAgICAgIGFycm93czogZmFsc2UsXG4gICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICBmYWRlOiB0cnVlLFxuICAgICAgcmVzcG9uc2l2ZTpcbiAgICAgICAgW3tcbiAgICAgICAgICBicmVha3BvaW50OiA3NjcsXG4gICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICB9XVxuICB9KTtcbiAgLyogRU5EOiBGRUFUVVJFRCBTTElERVJTSE9XIFNMSURFUiAqL1xuXG4gIC8qIFNUQVJUOiBBUlJPV1MgKi9cbiAgYXJyb3dfbGVmdC5jbGljayhmdW5jdGlvbigpe1xuICAgIHNsaWRlci5zbGljaygnc2xpY2tQcmV2Jyk7XG4gIH0pO1xuXG4gIGFycm93X3JpZ2h0LmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgc2xpZGVyLnNsaWNrKCdzbGlja05leHQnKTtcbiAgfSk7XG4vKiBTVEFSVDogQVJST1dTICovXG59XG4iLCJ3aW5kb3cuZmxvX2Jsb2NrX2ludHJvX2Jsb2NrID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLWJsb2NrLWludHJvLWJsb2NrXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuXG4gICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcbiAgICAkZWwuZmluZChkb3RiICsgXCJfX3RleHQtYXJlYVwiKS5hZGRDbGFzcyhiICsgXCJfX3RleHQtYXJlYS0tdmlzaWJsZVwiKTtcbiAgfSk7XG5cbiAgJGVsLmZpbmQoZG90YiArIFwiX19zY3JvbGwtZG93blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogZXZhbCgkKGRvdGIgKyBcIl9faW1hZ2UtYXJlYVwiKS5vZmZzZXQoKS50b3AgLSAyMDApXG4gICAgfSwgNjAwKTtcbn0pO1xufVxuIiwid2luZG93LmZsb19ibG9ja19saXN0aW5nXzQgPSBmdW5jdGlvbihlbCl7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJGVsID0gJChlbCk7XG4gIHZhciBiID0gXCJmbG8tYmxvY2stbGlzdGluZy00XCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICB2YXIgcGFyZW50ID0gJGVsLnBhcmVudHMoXCIuZmxvLWJsb2NrXCIpO1xuICB2YXIgJGIgPSAkZWwuZmluZChkb3RiKTtcblxuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4KSB7XG4gICAgZnVuY3Rpb24gZG9fc2l6aW5nKCkge1xuICAgICAgdmFyIGl0ZW1zID0gJGVsLmZpbmQoZG90YiArIFwiX19pdGVtXCIpO1xuICAgICAgaXRlbXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XG4gICAgICAgICQodGhpcykuY3NzKFwiaGVpZ2h0XCIsIHdpZHRoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvX3NpemluZygpO1xuICAgIH0sIDEwKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbigpe1xuICAgICAgZG9fc2l6aW5nKCk7XG4gICAgfSk7XG4gIH1cblxufVxuIiwid2luZG93LmZsb19ibG9ja19saXN0aW5nXzUgPSBmdW5jdGlvbihlbCl7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJGVsID0gJChlbCk7XG4gIHZhciBiID0gXCJmbG8tYmxvY2stbGlzdGluZy01XCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICB2YXIgcGFyZW50ID0gJGVsLnBhcmVudHMoXCIuZmxvLWJsb2NrXCIpO1xuICB2YXIgJGIgPSAkZWwuZmluZChkb3RiKTtcblxuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4ICYmICEkYi5oYXNDbGFzcyhiICsgXCItLW1hc29ucnlcIikpIHtcbiAgICBmdW5jdGlvbiBkb19zaXppbmcoKSB7XG4gICAgICB2YXIgaXRlbXMgPSAkZWwuZmluZChkb3RiICsgXCJfX2ZlYXR1cmVkLWltYWdlXCIpO1xuICAgICAgaXRlbXMuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgd2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XG4gICAgICAgICQodGhpcykuY3NzKFwiaGVpZ2h0XCIsIHdpZHRoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGRvX3NpemluZygpO1xuICAgIH0sIDEwKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbigpe1xuICAgICAgZG9fc2l6aW5nKCk7XG4gICAgfSk7XG4gIH1cblxuICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4ICYmICRiLmhhc0NsYXNzKGIgKyBcIi0tbWFzb25yeVwiKSkge1xuICAgIGZ1bmN0aW9uIGRvX21hc29ucnkoKSB7XG4gICAgICAkYi5tYXNvbnJ5KHtcbiAgICAgICAgY29sdW1uV2lkdGg6ICcuZ3JpZC1zaXplcicsXG4gICAgICAgIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgZG9fbWFzb25yeSgpO1xuICAgIH0sIDEwKTtcblxuICAgICRlbC5maW5kKGRvdGIgKyBcIl9fZmVhdHVyZWQtaW1hZ2VcIikubG9hZChmdW5jdGlvbigpe1xuICAgICAgZG9fbWFzb25yeSgpO1xuICAgIH0pO1xuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbigpe1xuICAgICAgZG9fbWFzb25yeSgpO1xuICAgIH0pO1xuICB9XG5cblxuXG59XG4iLCJ3aW5kb3cuZmxvX2Jsb2NrX2xpc3RpbmdfcGFnaW5hdGlvbl8yID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLWJsb2NrLWxpc3RpbmctcGFnaW5hdGlvbi0yXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICB2YXIgJGJ1dHRvbiA9ICRlbC5maW5kKGRvdGIgKyAnX19idXR0b24nKTtcbiAgdmFyIGxpc3Rpbmdfc2VsZWN0b3IsICRsaXN0aW5nLCBncmlkX3NpemVyLCAkZ3JpZF9zaXplcjtcbiAgXG4gIGlmKHR5cGVvZihhamF4X2xpc3Rpbmdfc2VsZWN0b3IpICYmIGFqYXhfbGlzdGluZ19zZWxlY3Rvci5sZW5ndGgpIHtcbiAgICBsaXN0aW5nX3NlbGVjdG9yID0gJy4nICsgYWpheF9saXN0aW5nX3NlbGVjdG9yO1xuICAgICRsaXN0aW5nID0gJChsaXN0aW5nX3NlbGVjdG9yKTtcbiAgICBpZihhamF4X2xpc3Rpbmdfc2VsZWN0b3IgPT0gXCJmbG8tYmxvY2stbGlzdGluZy01XCIpIHtcbiAgICAgICRncmlkX3NpemVyID0gJGxpc3Rpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgICRncmlkX3NpemVyID0gJGxpc3RpbmcuZmluZChsaXN0aW5nX3NlbGVjdG9yICsgJ19fZ3JpZC1zaXplcicpO1xuICAgIH0gICAgXG4gIH1cbiAgXG4gICRidXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAkYnV0dG9uLnRleHQoJGJ1dHRvbi5kYXRhKCdsb2FkaW5nLXRleHQnKSk7XG4gICAgbGV0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcbiAgICBsZXQgbmV4dFBhZ2VVcmwgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLW5leHQtaHJlZlwiKTtcbiAgICBcbiAgICBmZXRjaChuZXh0UGFnZVVybCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgIHJlc3BvbnNlLnRleHQoKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgIGxldCAkbmV3X3BhZ2UgPSAkKGRhdGEpO1xuICAgICAgICBsZXQgJG5ld19saXN0aW5nID0gJG5ld19wYWdlLmZpbmQobGlzdGluZ19zZWxlY3Rvcik7XG4gICAgICAgIGxldCAkbmV3X2RhdGFfbmV4dF9ocmVmID0gJG5ld19wYWdlLmZpbmQoZG90YiArIFwiX19idXR0b25cIikuYXR0cihcImRhdGEtbmV4dC1ocmVmXCIpO1xuICAgICAgICBsZXQgbmV4dF9wYWdlX2l0ZW1zO1xuICAgICAgICBcbiAgICAgICAgbmV4dF9wYWdlX2l0ZW1zID0gJCgkbmV3X2xpc3RpbmcuZmluZChsaXN0aW5nX3NlbGVjdG9yICsgJ19faXRlbScpKTtcbiAgICAgICAgbmV4dF9wYWdlX2l0ZW1zLmNzcygnb3BhY2l0eScsIDApO1xuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gcmVpbml0X21hc29ucnkoKSB7XG4gICAgICAgICAgaWYoJGdyaWRfc2l6ZXIubGVuZ3RoICYmICQod2luZG93KS53aWR0aCgpID4gNzY3KSB7XG4gICAgICAgICAgICBsZXQgdGVtcEhlaWdodCA9ICRsaXN0aW5nLmhlaWdodCgpO1xuICAgICAgICAgICAgJGxpc3RpbmcuY3NzKCdtaW4taGVpZ2h0JywgdGVtcEhlaWdodCk7XG4gICAgICAgICAgICAkbGlzdGluZy5tYXNvbnJ5KFwiZGVzdHJveVwiKTtcbiAgICAgICAgICAgICRsaXN0aW5nLm1hc29ucnkoKTtcbiAgICAgICAgICAgICRsaXN0aW5nLmNzcygnbWluLWhlaWdodCcsICcnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJGxpc3RpbmcuZmluZChuZXh0X3BhZ2VfaXRlbXMpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgfSwgMzUwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgJGxpc3RpbmcuYXBwZW5kKG5leHRfcGFnZV9pdGVtcyk7XG4gICAgICAgIFxuICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gICAkKHdpbmRvdykudHJpZ2dlcihcInJlc2l6ZVwiKTtcbiAgICAgICAgLy8gICByZWluaXRfbWFzb25yeSgpO1xuICAgICAgICAvLyB9LCA1MCk7XG4gICAgICAgIFxuICAgICAgICAkbGlzdGluZy5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh3aW5kb3cpLnRyaWdnZXIoXCJyZXNpemVcIik7XG4gICAgICAgICAgcmVpbml0X21hc29ucnkoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoJG5ld19kYXRhX25leHRfaHJlZikge1xuICAgICAgICAgICRidXR0b24uYXR0cihcImRhdGEtbmV4dC1ocmVmXCIsICRuZXdfZGF0YV9uZXh0X2hyZWYpO1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJGJ1dHRvbi50ZXh0KCRidXR0b24uZGF0YSgnZGVmYXVsdC10ZXh0JykpO1xuICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkYnV0dG9uLnBhcmVudHMoJy5mbG8tYmxvY2snKS5mYWRlT3V0KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICAvLyAuY2F0Y2goZXJyID0+IHtcbiAgICAvLyAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvcjpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgIC8vICAgJGJ1dHRvbi5wYXJlbnRzKCcuZmxvLWJsb2NrJykucmVtb3ZlKCk7XG4gICAgLy8gfSk7XG4gICAgXG4gIH0pO1xuICBcbn0iLCJ3aW5kb3cubmV3c2xldHRlcl9ibG9ja18xID0gZnVuY3Rpb24oKXtcblxuICB2YXIgJGZvcm0gPSAkKFwiLmZsby1mb3JtLS1uZXdzbGV0dGVyXCIpO1xuXG4gIGlmICgkZm9ybS5sZW5ndGgpIHtcbiAgICAvLyBTdGFydDogVmFsaWRhdGlvblxuICAgICAgJGZvcm0ucGFyc2xleSgpO1xuICAgIC8vIEVuZDogVmFsaWRhdGlvblxuXG4gICAgLy8gU3RhcnQ6IE1haWxjaGltcCBTdWJzY3JpcHRpb25cbiAgICAgIHZhclxuICAgICAgZW1iZWRfY29kZSA9XG4gICAgICAgIHVuZXNjYXBlKFxuICAgICAgICAgICRmb3JtLnBhcmVudCgpLmZpbmQoXCIuZW1iZWRfY29kZVwiKS50ZXh0KClcbiAgICAgICAgKSxcbiAgICAgICRlbWJlZF9jb2RlID0gJChcIjxkaXY+XCIpLmh0bWwoZW1iZWRfY29kZSk7XG5cbiAgICAgIGlmKHR5cGVvZiAkZW1iZWRfY29kZS5maW5kKFwiZm9ybVwiKS5hdHRyKFwiYWN0aW9uXCIpICE9PSAndW5kZWZpbmVkJyl7XG4gICAgICAgIHZhciBlbWJlZF9mb3JtX2FjdGlvbiA9ICRlbWJlZF9jb2RlLmZpbmQoXCJmb3JtXCIpLmF0dHIoXCJhY3Rpb25cIikucmVwbGFjZSgvXFxcXFwiL2csICcnKTtcblxuICAgICAgICAkZm9ybS5hdHRyKFwiYWN0aW9uXCIsIGVtYmVkX2Zvcm1fYWN0aW9uKTtcbiAgICAgIH1lbHNle1xuICAgICAgICBjb25zb2xlLmxvZygnVGhlIG1haWxjaGltcCBjb2RlIGlzIGluY29yZWN0Jyk7XG4gICAgICB9XG5cbiAgICAvLyBFbmQ6IE1haWxjaGltcCBTdWJzY3JpcHRpb25gXG5cbiAgfVxuXG59XG5cbiIsIndpbmRvdy5uZXdzbGV0dGVyX2Jsb2NrXzIgPSBmdW5jdGlvbigpe1xuXG4gIC8vIHVzZSB0aGlzIGluIGJsb2NrcyBsaWtlIGZvb3Rlci9oZWFkZXIgLSAgYXBlYXJzIG9uIGFsbCBwYWdlc1xuICAvLyB2YXIgJGVsID0gJChlbCk7XG4gIC8vIHZhciAkZm9ybSA9ICRlbC5wYXJlbnQoKS5maW5kKFwiLmZsby1mb3JtLS1uZXdzbGV0dGVyXCIpO1xuXG4gIC8vIHVzZSB0aGlzIGluIGJsb2NrcyBvdGhlciB0aGFuIGZvb3Rlci9oZWFkZXJcbiAgdmFyICRmb3JtID0gJChcIi5mbG8tZm9ybS0tbmV3c2xldHRlclwiKTtcblxuICBpZiAoJGZvcm0ubGVuZ3RoKSB7XG4gICAgLy8gU3RhcnQ6IFZhbGlkYXRpb25cbiAgICAgICRmb3JtLnBhcnNsZXkoKTtcbiAgICAvLyBFbmQ6IFZhbGlkYXRpb25cblxuICAgIC8vIFN0YXJ0OiBNYWlsY2hpbXAgU3Vic2NyaXB0aW9uXG4gICAgICB2YXJcbiAgICAgIGVtYmVkX2NvZGUgPVxuICAgICAgICB1bmVzY2FwZShcbiAgICAgICAgICAkZm9ybS5wYXJlbnQoKS5maW5kKFwiLmVtYmVkX2NvZGVcIikudGV4dCgpXG4gICAgICAgICksXG4gICAgICAkZW1iZWRfY29kZSA9ICQoXCI8ZGl2PlwiKS5odG1sKGVtYmVkX2NvZGUpO1xuXG4gICAgICBpZih0eXBlb2YgJGVtYmVkX2NvZGUuZmluZChcImZvcm1cIikuYXR0cihcImFjdGlvblwiKSAhPT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICB2YXIgZW1iZWRfZm9ybV9hY3Rpb24gPSAkZW1iZWRfY29kZS5maW5kKFwiZm9ybVwiKS5hdHRyKFwiYWN0aW9uXCIpLnJlcGxhY2UoL1xcXFxcIi9nLCAnJyk7XG5cbiAgICAgICAgJGZvcm0uYXR0cihcImFjdGlvblwiLCBlbWJlZF9mb3JtX2FjdGlvbik7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgY29uc29sZS5sb2coJ1RoZSBtYWlsY2hpbXAgY29kZSBpcyBpbmNvcmVjdCcpO1xuICAgICAgfVxuXG4gICAgLy8gRW5kOiBNYWlsY2hpbXAgU3Vic2NyaXB0aW9uYFxuXG4gIH1cblxufVxuIiwid2luZG93LmZsb19udW1lcmljX2RldGFpbHMgPSBlbCA9PiB7XG4gIFwidXNlIHN0cmljdFwiO1xuICBsZXQgJGVsID0gJChlbCk7XG4gIGxldCBiID0gXCJmbG8tYmxvY2stbnVtZXJpYy1kZXRhaWxzXCI7XG4gIGxldCBkb3RiID0gXCIuXCIgKyBiO1xuICBcbiAgbGV0IHdpbGxBbmltYXRlID0gJGVsLmZpbmQoZG90YikuYXR0cihcImRhdGEtYW5pbW51bVwiKTtcbiAgaWYod2lsbEFuaW1hdGUpIHtcbiAgICBsZXQgYW5pbVRhcmdldHMgPSAkZWwuZmluZChgJHtkb3RifV9fbnVtZXJpYy1kZXRhaWwtbnVtYmVyYCk7XG4gICAgaWYoYW5pbVRhcmdldHMgJiYgYW5pbVRhcmdldHMubGVuZ3RoKSB7XG4gICAgICBsZXQgZGVsYXlWYWwgPSAwO1xuICAgICAgbGV0IGFuaW1EdXJhdGlvbiA9ICRlbC5maW5kKGRvdGIpLmF0dHIoXCJkYXRhLWFuaW0tbXNcIik7XG4gICAgICAkKHdpbmRvdykub24oXCJzdGFydFZpZXdwb3J0Q2hlY2tlclwiLCBmdW5jdGlvbigpe1xuICAgICAgICBhbmltVGFyZ2V0cy52aWV3cG9ydENoZWNrZXIoe1xuICAgICAgICAgIGNsYXNzVG9BZGQ6ICdjb3VudGVkJyxcbiAgICAgICAgICByZXBlYXQ6IGZhbHNlLFxuICAgICAgICAgIG9mZnNldDogMTAwLFxuICAgICAgICAgIGludmVydEJvdHRvbU9mZnNldDogZmFsc2UsXG4gICAgICAgICAgY2FsbGJhY2tGdW5jdGlvbjogKG51bWJlciwgYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAvLyB3cmFwIHdob2xlIGZ1bmN0aW9uIGluIHNldHRpbWVvdXQgdG8gYXZvaWQgc3R1dHRlcmluZ1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIG51bWJlci5kZWxheShkZWxheVZhbCkuYW5pbWF0ZU51bWJlcihcbiAgICAgICAgICAgICAgICB7IG51bWJlcjogcGFyc2VJbnQobnVtYmVyLmF0dHIoXCJkYXRhLW51bVwiKSkgfSwgXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoYW5pbUR1cmF0aW9uKSwgXG4gICAgICAgICAgICAgICAgJ2xpbmVhcicsIFxuICAgICAgICAgICAgICAgICgpID0+IHsgaWYobnVtYmVyLmhhc0NsYXNzKGAke2J9X19wbHVzLXdpbGwtc2hvd2ApKSBudW1iZXIuYWRkQ2xhc3MoYCR7Yn1fX3BsdXMtc2hvd25gKSB9LFxuICAgICAgICAgICAgICAgIGRlbGF5VmFsICs9IDE1MFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pLnRyaWdnZXIoXCJzdGFydFZpZXdwb3J0Q2hlY2tlclwiKTtcbiAgICB9XG4gIH1cbn0iLCJ3aW5kb3cuZmxvX2Jsb2NrX251bWVyaWNfZGV0YWlscyA9IGVsID0+IHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIGxldCAkZWwgPSAkKGVsKTtcbiAgbGV0IGIgPSBcImZsby1ibG9jay1wcmVzc1wiO1xuICBsZXQgZG90YiA9IFwiLlwiICsgYjtcbiAgbGV0IGVsZW1lbnRzID0gJChkb3RiICsgXCJfX3NsaWRlc1wiKS5hdHRyKFwiZGF0YS1lbGVtZW50c1wiKTtcbiAgZWxlbWVudHMgPSBwYXJzZUludChlbGVtZW50cyk7XG5cbiAgJGVsLmZpbmQoZG90YiArIFwiX19zbGlkZXNcIikuc2xpY2soe1xuICAgIGRvdHM6IGZhbHNlLFxuICAgIGluZmluaXRlOiB0cnVlLFxuICAgIHNsaWRlc1RvU2hvdzogZWxlbWVudHMsXG4gICAgc2xpZGVzVG9TY3JvbGw6IDEsXG4gICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICAgIGxhenlMb2FkOidvbmRlbWFuZCcsXG4gICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICBuZXh0QXJyb3c6ICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLW5leHRcIiksXG4gICAgcHJldkFycm93OiAkZWwuZmluZChkb3RiICsgXCJfX2Fycm93LS1wcmV2XCIpLFxuICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgIHtcbiAgICAgICBicmVha3BvaW50OiA3NjgsXG4gICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgaW5maW5pdGU6IHRydWVcbiAgICAgICB9XG4gICAgIH1cbiAgICBdXG4gIH0pO1xuICBcbn0iLCJ3aW5kb3cuZmxvX2Jsb2NrX3NsaWRlc2hvd18yID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLWJsb2NrLXNsaWRlc2hvdy0yXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICB2YXIgJHZhcmlhYmxlV2lkdGggPSB0cnVlO1xuICB2YXIgJGFkYXB0aXZlSGVpZ2h0ID0gZmFsc2U7XG4gIHZhciAkY2VudGVyTW9kZSA9IHRydWU7XG5cbiAgaWYoJGVsLmZpbmQoZG90YikuaGFzQ2xhc3MoYiArICdfX2hlaWdodC1hdXRvJykpe1xuICAgICR2YXJpYWJsZVdpZHRoID0gZmFsc2U7XG4gICAgJGFkYXB0aXZlSGVpZ2h0ID0gdHJ1ZTtcbiAgICAkY2VudGVyTW9kZSA9IGZhbHNlO1xuICB9XG4gIFxuICAkZWwuZmluZChkb3RiICsgXCJfX3NsaWRlc1wiKVxuXG4gICAgLyogU1RBUlQ6IEFSUk9XUyAqL1xuICAgICAgLm9uKFwiaW5pdFwiLCBmdW5jdGlvbigpe1xuICAgICAgICBpZiAoJGVsLmZpbmQoZG90YiArIFwiX19zbGlkZXMgLnNsaWNrLXNsaWRlOm5vdCguc2xpY2stY2xvbmVkKVwiKS5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3dzXCIpLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLXByZXZcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19zbGlkZXNcIikuc2xpY2soXCJzbGlja1ByZXZcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19hcnJvdy0tbmV4dFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkZWwuZmluZChkb3RiICsgXCJfX3NsaWRlc1wiKS5zbGljayhcInNsaWNrTmV4dFwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAvKiBFTkQ6IEFSUk9XUyAqL1xuXG4gICAgLyogU1RBUlQ6IFRSQU5TRk9STSBET1RTICovXG4gICAgICAub24oXCJpbml0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fZG90cyBidXR0b25cIikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCh0aGlzKS50ZXh0KFxuICAgICAgICAgICAgICBwYWQoJCh0aGlzKS50ZXh0KCksIDIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCAxMCk7XG4gICAgICB9KVxuICAgIC8qIEVORDogVFJBTlNGT1JNIERPVFMgKi9cblxuICAgIC50cmlnZ2VyKFwiZmxvSW5pdFwiLCB7XG4gICAgICBkb3RzOiB0cnVlLFxuICAgICAgYXBwZW5kRG90czogJGVsLmZpbmQoZG90YiArIFwiX19kb3RzXCIpLFxuICAgICAgY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBicmVha3BvaW50OiBcIjc2N1wiLFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiAkdmFyaWFibGVXaWR0aCxcbiAgICAgICAgICAgIGNlbnRlck1vZGU6ICRjZW50ZXJNb2RlLFxuICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6ICRhZGFwdGl2ZUhlaWdodFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0pXG4gIDtcbn1cbiIsIndpbmRvdy5mbG9fYmxvY2tfc2xpZGVzaG93XzEgPSBmdW5jdGlvbihlbCl7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJGVsID0gJChlbCk7XG4gIHZhciBiID0gXCJmbG8tYmxvY2stc2xpZGVzaG93LTFcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG5cbiAgJGVsLmZpbmQoZG90YiArIFwiX19zbGlkZXNcIilcblxuICAgIC8qIFNUQVJUOiBBUlJPV1MgKi9cbiAgICAgIC5vbihcImluaXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKCRlbC5maW5kKGRvdGIgKyBcIl9fc2xpZGVzIC5zbGljay1zbGlkZTpub3QoLnNsaWNrLWNsb25lZClcIikubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAkZWwuZmluZChkb3RiICsgXCJfX2Fycm93XCIpLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLXByZXZcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fc2xpZGVzXCIpLnNsaWNrKFwic2xpY2tQcmV2XCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLW5leHRcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fc2xpZGVzXCIpLnNsaWNrKFwic2xpY2tOZXh0XCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIC8qIEVORDogQVJST1dTICovXG5cbiAgICAvKiBTVEFSVDogSEVBREVSIEFSRUEgKi9cbiAgICAgIC5vbihcImVsZW1lbnRzQ29sb3JMaWdodFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAkZWwuZmluZChcIi5mbG8taGVhZGVyX19sb2dvXCIpXG4gICAgICAgICAgLmFkZENsYXNzKFwiZmxvLWhlYWRlcl9fbG9nby0taXMtbGlnaHRcIilcbiAgICAgICAgO1xuICAgICAgICBpZigkKHdpbmRvdykud2lkdGgoKSA8IDc2OCl7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJGVsLmZpbmQoXCIuZmxvLWhlYWRlci1tb2JpbGVfX2xvZ29cIilcbiAgICAgICAgICAgICAgLmFkZENsYXNzKFwiZmxvLWhlYWRlci1tb2JpbGVfX2xvZ28tLWxpZ2h0XCIpXG4gICAgICAgICAgICA7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5vbihcImVsZW1lbnRzQ29sb3JEYXJrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICRlbC5maW5kKFwiLmZsby1oZWFkZXJfX2xvZ29cIilcbiAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJmbG8taGVhZGVyX19sb2dvLS1pcy1saWdodFwiKVxuICAgICAgICA7XG4gICAgICAgIGlmKCQod2luZG93KS53aWR0aCgpIDwgNzY4KXtcbiAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkZWwuZmluZChcIi5mbG8taGVhZGVyLW1vYmlsZV9fbG9nb1wiKVxuICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoXCJmbG8taGVhZGVyLW1vYmlsZV9fbG9nby0tbGlnaHRcIilcbiAgICAgICAgICAgIDtcbiAgICAgICAgICAvLyB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIC8qIEVORDogSEVBREVSIEFSRUEgKi9cblxuICAgIC8qIFNUQVJUOiBDT1VOVCAtIFNFVCBDT1VOVCAqL1xuICAgICAgLm9uKFwiaW5pdFwiLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgY291bnQgPSAkdGhpcy5maW5kKFwiLnNsaWNrLXNsaWRlOm5vdCguc2xpY2stY2xvbmVkKVwiKS5sZW5ndGg7XG4gICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fY291bnRlci1jb3VudFwiKS5odG1sKFxuICAgICAgICAgIHBhZChjb3VudCwgMilcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgLyogRU5EOiBDT1VOVCAtIFNFVCBDT1VOVCAqL1xuXG4gICAgLyogU1RBUlQ6IENPVU5UIC0gU0VUIElOREVYICovXG4gICAgICAub24oXCJpbml0IGFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KCR0aGlzLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKS5hdHRyKFwiZGF0YS1zbGljay1pbmRleFwiKSkrMTtcblxuICAgICAgICAkZWwuZmluZChkb3RiICsgXCJfX2NvdW50ZXItaW5kZXhcIikuY2hhbmdlVGV4dFVJKFxuICAgICAgICAgIHBhZChpbmRleCwgMiksXG4gICAgICAgICAgXCJjb3VudGVyXCJcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgLyogRU5EOiBDT1VOVCAtIFNFVCBJTkRFWCAqL1xuXG4gICAgLyogU1RBUlQ6IFRFWFQgQVJFQSAgKi9cbiAgICAgIC5vbihcImluaXQgYmVmb3JlQ2hhbmdlXCIsIGZ1bmN0aW9uKGUsIHNsaWNrLCBjdXJyZW50U2xpZGUsIG5leHRTbGlkZSl7XG4gICAgICAgIHZhciAkc2xpY2sgPSAkKHRoaXMpO1xuXG4gICAgICAgIHZhciBjdXJyZW50X3NsaWRlO1xuICAgICAgICBpZiAoZS50eXBlID09IFwiYmVmb3JlQ2hhbmdlXCIpIHtcbiAgICAgICAgICBjdXJyZW50X3NsaWRlID0gJHNsaWNrLmZpbmQoXCIuc2xpY2stc2xpZGVbZGF0YS1zbGljay1pbmRleD0nXCIrbmV4dFNsaWRlK1wiJ11cIik7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50eXBlID09IFwiaW5pdFwiKSB7XG4gICAgICAgICAgY3VycmVudF9zbGlkZSA9ICRzbGljay5maW5kKFwiLnNsaWNrLWN1cnJlbnRcIik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3X3RpdGxlID0gY3VycmVudF9zbGlkZS5hdHRyKFwiZGF0YS10aXRsZVwiKTtcbiAgICAgICAgdmFyIG5ld190ZXh0ID0gY3VycmVudF9zbGlkZS5hdHRyKFwiZGF0YS10ZXh0XCIpO1xuICAgICAgICB2YXIgbmV3X2J1dHRvbiA9IGN1cnJlbnRfc2xpZGUuYXR0cihcImRhdGEtdXJsXCIpO1xuICAgICAgICB2YXIgbmV3X2JvdHRvbV9sYWJlbCA9IGN1cnJlbnRfc2xpZGUuYXR0cihcImRhdGEtYm90dG9tLWxhYmVsXCIpO1xuXG4gICAgICAgIHZhciB0aXRsZV9hcmVhX190aXRsZSA9ICRlbC5maW5kKGRvdGIgKyBcIl9fdGl0bGVcIik7XG4gICAgICAgIHZhciB0aXRsZV9hcmVhX190ZXh0ID0gJGVsLmZpbmQoZG90YiArIFwiX190ZXh0XCIpO1xuICAgICAgICB2YXIgdGl0bGVfYXJlYV9fYnV0dG9uID0gJGVsLmZpbmQoZG90YiArIFwiX19idXR0b25cIik7XG4gICAgICAgIHZhciB0aXRsZV9hcmVhX19ib3R0b21fbGFiZWwgPSAkZWwuZmluZChkb3RiICsgXCJfX2JvdHRvbS1sYWJlbFwiKTtcblxuICAgICAgICB2YXIgb3ZlcmxheV9jb2xvciA9IGN1cnJlbnRfc2xpZGUuYXR0cihcImRhdGEtb3ZlcmxheS1jb2xvclwiKTtcbiAgICAgICAgdmFyIG92ZXJsYXlfb3BhY2l0eSA9IGN1cnJlbnRfc2xpZGUuYXR0cihcImRhdGEtb3ZlcmxheS1vcGFjaXR5XCIpO1xuXG4gICAgICAgIGlmIChuZXdfdGl0bGUudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgICAgdGl0bGVfYXJlYV9fdGl0bGUuZmFkZUluKCkuY2hhbmdlVGV4dChuZXdfdGl0bGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpdGxlX2FyZWFfX3RpdGxlLmZhZGVPdXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdfdGV4dC50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICB0aXRsZV9hcmVhX190ZXh0LmZhZGVJbigpLmNoYW5nZVRleHQobmV3X3RleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpdGxlX2FyZWFfX3RleHQuZmFkZU91dCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGl0bGVfYXJlYV9fYnV0dG9uLmxlbmd0aCkge1xuICAgICAgICAgIGlmIChuZXdfYnV0dG9uLnRyaW0oKSAhPT0gXCJcIikgeyBcbiAgICAgICAgICAgIHRpdGxlX2FyZWFfX2J1dHRvbi5mYWRlSW4oKS5hdHRyKFwiaHJlZlwiLCBuZXdfYnV0dG9uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGl0bGVfYXJlYV9fYnV0dG9uLmZhZGVPdXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3X2JvdHRvbV9sYWJlbC50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICB0aXRsZV9hcmVhX19ib3R0b21fbGFiZWwuZmFkZUluKCkuaHRtbChuZXdfYm90dG9tX2xhYmVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aXRsZV9hcmVhX19ib3R0b21fbGFiZWwuZmFkZU91dCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbm8gdGV4dCBpcyBhZGRlZCB0byB0aGlzIHNsaWRlLCBkb24ndCBhZGQgdGhlIG92ZXJsYXkgY29sb3IgYW5kIG9wYWNpdHlcbiAgICAgICAgaWYgKChuZXdfdGl0bGUudHJpbSgpICE9PSBcIlwiIHx8IG5ld190ZXh0LnRyaW0oKSAhPT0gXCJcIiB8fCBuZXdfYm90dG9tX2xhYmVsLnRyaW0oKSAhPT0gXCJcIikgJiZcbiAgICAgICAgKG92ZXJsYXlfY29sb3IudHJpbSgpICE9PSBcIlwiICYmIG92ZXJsYXlfb3BhY2l0eS50cmltKCkgIT09IFwiXCIpKSB7XG5cbiAgICAgICAgICAkZWwuZmluZChkb3RiICsgXCJfX2NvbnRlbnQtd3JhcFwiKS5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwicmdiYShcIisgYl9oZXgycmdiYShvdmVybGF5X2NvbG9yLCBvdmVybGF5X29wYWNpdHkpICtcIilcIik7XG5cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fY29udGVudC13cmFwXCIpLmNzcyhcImJhY2tncm91bmQtY29sb3JcIiwgXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgfSlcbiAgICAvKiBFTkQ6IFRFWFQgQVJFQSAgKi9cblxuICAgIC50cmlnZ2VyKFwiZmxvSW5pdFwiKVxuICA7XG5cbn1cbiIsIndpbmRvdy5mbG9fdGVzdGltb25pYWxzXzEgPSBmdW5jdGlvbihlbCl7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJGVsID0gJChlbCk7XG4gIHZhciBiID0gXCJmbG8tYmxvY2stdGVzdGltb25pYWxzLTFcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG4gIHZhciBwYXJlbnQgPSAkZWwucGFyZW50cyhcIi5mbG8tYmxvY2tcIik7XG5cbiAgdmFyIHNsaWRlciA9ICRlbC5maW5kKGRvdGIgKyBcIl9fdGVzdGltb25pYWxzLXNsaWRlclwiKTtcbiAgdmFyIGFycm93X2xlZnQgPSAkZWwuZmluZChkb3RiICsgXCJfX2Fycm93LS1sZWZ0XCIpO1xuICB2YXIgYXJyb3dfcmlnaHQgPSAkZWwuZmluZChkb3RiICsgXCJfX2Fycm93LS1yaWdodFwiKTtcblxuICAvKiBTVEFSVDogRkVBVFVSRUQgU0xJREVTSE9XIFNMSURFUiAqL1xuICAgIHNsaWRlci5zbGljayh7XG4gICAgICBhcnJvd3M6IGZhbHNlLFxuICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgIHJlc3BvbnNpdmU6XG4gICAgICAgIFt7XG4gICAgICAgICAgYnJlYWtwb2ludDogNzY3LFxuICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgfV1cbiAgfSk7XG4gIC8qIEVORDogRkVBVFVSRUQgU0xJREVSU0hPVyBTTElERVIgKi9cblxuICAvKiBTVEFSVDogQVJST1dTICovXG4gIGFycm93X2xlZnQuY2xpY2soZnVuY3Rpb24oKXtcbiAgICBzbGlkZXIuc2xpY2soJ3NsaWNrUHJldicpO1xuICB9KTtcblxuICBhcnJvd19yaWdodC5jbGljayhmdW5jdGlvbigpe1xuICAgIHNsaWRlci5zbGljaygnc2xpY2tOZXh0Jyk7XG4gIH0pO1xuLyogU1RBUlQ6IEFSUk9XUyAqL1xufVxuIiwid2luZG93LmZsb19jb21tZW50cyA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1jb21tZW50c1wiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyIHBhcmVudCA9ICRlbC5wYXJlbnRzKFwiLmZsby1ibG9ja1wiKTtcblxuICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzY3KSB7XG4gICAgJGVsLmZpbmQoZG90YiArIFwiX19mb3JtLXdyYXBcIikuc3RpY2tfaW5fcGFyZW50KHtcbiAgICAgIG9mZnNldF90b3A6IDE1MFxuICAgIH0pO1xuICB9XG59XG4iLCIkKGZ1bmN0aW9uKCl7XG4gICQoXCIuZmxvLWdlbmVyaWMtZmFuY3lib3gtdmlkZW9cIikuZmFuY3lib3goe1xuICAgIGlmcmFtZToge1xuICAgICAgcHJlbG9hZDogZmFsc2VcbiAgICB9XG4gIH0pXG59KTtcbiIsIndpbmRvdy5mbG9fZm9vdGVyX2NvcHlyaWdodHNfYXJlYSA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1mb290ZXItY29weXJpZ2h0cy1hcmVhXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuXG4gICRlbC5maW5kKGRvdGIgKyBcIl9fYmFjay10by10b3BcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHsgc2Nyb2xsVG9wOiBcIjBcIiB9KTtcbiAgfSk7XG59XG4iLCJ3aW5kb3cuZm9vdGVyX21pbmlibG9ja19zaWdudXAgPSBmdW5jdGlvbigpe1xuXG4gIHZhciAkZm9ybSA9ICQoXCIuZmxvLWZvcm0tLW5ld3NsZXR0ZXJcIik7XG5cbiAgaWYgKCRmb3JtLmxlbmd0aCkge1xuICAgIC8vIFN0YXJ0OiBWYWxpZGF0aW9uXG4gICAgICAkZm9ybS5wYXJzbGV5KCk7XG4gICAgLy8gRW5kOiBWYWxpZGF0aW9uXG5cbiAgICAvLyBTdGFydDogTWFpbGNoaW1wIFN1YnNjcmlwdGlvblxuICAgICAgdmFyXG4gICAgICBlbWJlZF9jb2RlID1cbiAgICAgICAgdW5lc2NhcGUoXG4gICAgICAgICAgJGZvcm0ucGFyZW50KCkuZmluZChcIi5lbWJlZF9jb2RlXCIpLnRleHQoKVxuICAgICAgICApLFxuICAgICAgJGVtYmVkX2NvZGUgPSAkKFwiPGRpdj5cIikuaHRtbChlbWJlZF9jb2RlKTtcblxuICAgICAgaWYodHlwZW9mICRlbWJlZF9jb2RlLmZpbmQoXCJmb3JtXCIpLmF0dHIoXCJhY3Rpb25cIikgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgdmFyIGVtYmVkX2Zvcm1fYWN0aW9uID0gJGVtYmVkX2NvZGUuZmluZChcImZvcm1cIikuYXR0cihcImFjdGlvblwiKS5yZXBsYWNlKC9cXFxcXCIvZywgJycpO1xuXG4gICAgICAgICRmb3JtLmF0dHIoXCJhY3Rpb25cIiwgZW1iZWRfZm9ybV9hY3Rpb24pO1xuICAgICAgfWVsc2V7XG4gICAgICAgIGNvbnNvbGUubG9nKCdUaGUgbWFpbGNoaW1wIGNvZGUgaXMgaW5jb3JlY3QnKTtcbiAgICAgIH1cblxuICAgIC8vIEVuZDogTWFpbGNoaW1wIFN1YnNjcmlwdGlvbmBcblxuICB9XG5cbn1cbiIsIiQoZG9jdW1lbnQpLm9uKFwiZmxvSW5pdFwiLCBcIi5mbG8tZ2VuZXJpYy1zbGlkZXNcIiwgZnVuY3Rpb24oZSwgc2xpY2tBZGRpdGlvbmFsT3B0aW9ucyl7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciAkZWwgPSAkKHRoaXMpO1xuICB2YXIgYiA9IFwiZmxvLWdlbmVyaWMtc2xpZGVzXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICB2YXIgcGFyZW50ID0gJGVsLnBhcmVudHMoXCIuZmxvLWJsb2NrXCIpO1xuXG4gIC8qIFNUQVJUOiBNRVJHRSBERUZBVUxUIFNMSUNLIE9QVElPTlMgV0lUSCBBRERJVElPTkFMIE9ORVMgKi9cbiAgICB2YXIgc2xpY2tPcHRpb25zID0ge1xuICAgICAgXCJkb3RzXCI6IFwiZmFsc2VcIixcbiAgICAgIFwiYXJyb3dzXCI6IFwiZmFsc2VcIixcbiAgICAgIFwiY3NzRWFzZVwiOiBcImVhc2UtaW4tb3V0XCJcbiAgICB9O1xuICAgIGZvciAodmFyIGF0dHJuYW1lIGluIHNsaWNrQWRkaXRpb25hbE9wdGlvbnMpIHtcbiAgICAgIHNsaWNrT3B0aW9uc1thdHRybmFtZV0gPSBzbGlja0FkZGl0aW9uYWxPcHRpb25zW2F0dHJuYW1lXTtcbiAgICB9XG4gIC8qIEVORDogTUVSR0UgREVGQVVMVCBTTElDSyBPUFRJT05TIFdJVEggQURESVRJT05BTCBPTkVTICovXG5cbiAgJGVsXG4gICAgLyogU1RBUlQ6IFZJREVPIEJBQ0tHUk9VTkQgKi9cbiAgICAgIC5vbihcImluaXQgcmVJbml0IGFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vIFN0YXJ0OiBQYXVzZSBhbGwgdmlkZW9zXG4gICAgICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19zbGlkZS0tdmlkZW9fc2xpZGU6bm90KC5zbGljay1jdXJyZW50KVwiKS5maW5kKFwidmlkZW9cIikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAvLyBFbmQ6IFBhdXNlIGFsbCB2aWRlb3NcbiAgICAgICAgdmFyIGFjdGl2ZV9zbGlkZV9fJCA9ICRlbC5maW5kKFwiLnNsaWNrLWN1cnJlbnRcIik7XG4gICAgICAgIGlmIChhY3RpdmVfc2xpZGVfXyQuaGFzQ2xhc3MoYiArIFwiX19zbGlkZS0tdmlkZW9fc2xpZGVcIikpIHtcbiAgICAgICAgICB2YXIgdmlkZW9fY29udGFpbmVyID0gYWN0aXZlX3NsaWRlX18kLmZpbmQoZG90YiArIFwiX19zbGlkZS1iYWNrZ3JvdW5kLXZpZGVvXCIpO1xuICAgICAgICAgIHZhciB2aWRlbyA9IHZpZGVvX2NvbnRhaW5lci5maW5kKFwidmlkZW9cIilbMF07XG5cbiAgICAgICAgICB2aWRlby5wbGF5KCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgLyogRU5EOiBWSURFTyBCQUNLR1JPVU5EICovXG5cbiAgICAvKiBTVEFSVDogVklERU8gRU1CRUQgKi9cbiAgICAgIC5vbihcImluaXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICRzbGlkZXMgPSAkKHRoaXMpO1xuICAgICAgICAkZWwuZmluZChcIi5cIitiK1wiX19zbGlkZS0taW1hZ2VfYW5kX3ZpZGVvX2VtYmVkXCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgYWN0aXZlX3NsaWRlX18kID0gJCh0aGlzKTtcbiAgICAgICAgICB2YXIgdmlkZW9fZW1iZWRfaG9zdCA9IHBhcmVudDtcbiAgICAgICAgICB2YXIgdmlkZW9fYnV0dG9uID0gYWN0aXZlX3NsaWRlX18kLmZpbmQoXCIuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2J1dHRvblwiKTtcbiAgICAgICAgICB2YXIgdmlkZW9fY29udGFpbmVyID0gYWN0aXZlX3NsaWRlX18kLmZpbmQoXCIuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2NvbnRhaW5lclwiKTtcbiAgICAgICAgICB2YXIgZW1iZWRfY29kZSA9IGFjdGl2ZV9zbGlkZV9fJC5hdHRyKFwiZGF0YS1lbWJlZC1jb2RlXCIpO1xuXG4gICAgICAgICAgdmlkZW9fYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghdmlkZW9fZW1iZWRfaG9zdC5oYXNDbGFzcyhcInZpZGVvLWlzLXBsYXlpbmdcIikpIHtcbiAgICAgICAgICAgICAgdmlkZW9fY29udGFpbmVyLmh0bWwodW5lc2NhcGUoZW1iZWRfY29kZSkpO1xuICAgICAgICAgICAgICB2aWRlb19lbWJlZF9ob3N0LmFkZENsYXNzKFwidmlkZW8taXMtcGxheWluZ1wiKTtcblxuICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKFwic2xpY2tTZXRPcHRpb25cIiwgXCJhdXRvcGxheVwiLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZpZGVvX2VtYmVkX2hvc3QuaGFzQ2xhc3MoXCJ2aWRlby1pcy1wbGF5aW5nXCIpKSB7XG4gICAgICAgICAgICAgIHZpZGVvX2NvbnRhaW5lci5odG1sKFwiXCIpO1xuICAgICAgICAgICAgICB2aWRlb19lbWJlZF9ob3N0LnJlbW92ZUNsYXNzKFwidmlkZW8taXMtcGxheWluZ1wiKTtcblxuICAgICAgICAgICAgICB2YXIgYXV0b3BsYXkgPSAkc2xpZGVzLmF0dHIoXCJkYXRhLWF1dG9wbGF5XCIpID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKFwic2xpY2tTZXRPcHRpb25cIiwgXCJhdXRvcGxheVwiLCBhdXRvcGxheSAsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAub24oXCJiZWZvcmVDaGFuZ2VcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGFjdGl2ZV9zbGlkZV9fJCA9ICQodGhpcykuZmluZChcIi5zbGljay1jdXJyZW50XCIpO1xuICAgICAgICB2YXIgdmlkZW9fZW1iZWRfaG9zdCA9IHBhcmVudDtcblxuICAgICAgICAvKiBTVEFSVDogVklERU8gRU1CRUQgQ0xPU0UgT04gU0xJREUgQ0hBTkdFICovXG4gICAgICAgICAgaWYgKHZpZGVvX2VtYmVkX2hvc3QuaGFzQ2xhc3MoXCJ2aWRlby1pcy1wbGF5aW5nXCIpKSB7XG4gICAgICAgICAgICBhY3RpdmVfc2xpZGVfXyQuZmluZChcIi5mbG8taGVyby12aWRlby1lbWJlZF9fYnV0dG9uXCIpLmNsaWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICAvKiBFTkQ6IFZJREVPIEVNQkVEIENMT1NFIE9OIFNMSURFIENIQU5HRSAqL1xuXG4gICAgICB9KVxuICAgIC8qIEVORDogVklERU8gRU1CRUQgKi9cblxuICAgIC8qIFNUQVJUOiBDSEFOR0UgTE9HTyBCQVNFRCBPTiBTTElERSBFTEVNRU5UUyBDT0xPUiAqL1xuICAgICAgLm9uKFwiaW5pdCBhZnRlckNoYW5nZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgJGN1cnJlbnRTbGlkZSA9ICR0aGlzLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzX2NvbG9yID0gJGN1cnJlbnRTbGlkZS5hdHRyKFwiZGF0YS1lbGVtZW50cy1jb2xvclwiKTtcbiAgICAgICAgdmFyIGNvbG9yX2JyaWdodG5lc3MgPSBpc19jb2xvcl9icmlnaHQoZWxlbWVudHNfY29sb3IpO1xuXG4gICAgICAgIGlmIChjb2xvcl9icmlnaHRuZXNzKSB7XG4gICAgICAgICAgcGFyZW50LmZpbmQoZG90YiArIFwiX19sb2dvXCIpLmFkZENsYXNzKGIgKyBcIl9fbG9nby0tbGlnaHRcIik7XG5cbiAgICAgICAgICBwYXJlbnQuZmluZChcIi5mbG8taGVhZGVyX19sb2dvXCIpLmFkZENsYXNzKFwiZmxvLWhlYWRlcl9fbG9nby0tbGlnaHRcIik7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwYXJlbnQuZmluZChcIi5pcy1tYWluIC5mbG8taGVhZGVyLW1vYmlsZV9fbG9nb1wiKS5hZGRDbGFzcyhcImZsby1oZWFkZXItbW9iaWxlX19sb2dvLS1saWdodFwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJlbnQuZmluZChkb3RiICsgXCJfX2xvZ29cIikucmVtb3ZlQ2xhc3MoYiArIFwiX19sb2dvLS1saWdodFwiKTtcblxuICAgICAgICAgIHBhcmVudC5maW5kKFwiLmZsby1oZWFkZXJfX2xvZ29cIikucmVtb3ZlQ2xhc3MoXCJmbG8taGVhZGVyX19sb2dvLS1saWdodFwiKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHBhcmVudC5maW5kKFwiLmlzLW1haW4gLmZsby1oZWFkZXItbW9iaWxlX19sb2dvXCIpLnJlbW92ZUNsYXNzKFwiZmxvLWhlYWRlci1tb2JpbGVfX2xvZ28tLWxpZ2h0XCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIC8qIEVORDogQ0hBTkdFIExPR08gQkFTRUQgT04gU0xJREUgRUxFTUVOVFMgQ09MT1IgKi9cblxuICAgIC8qIFNUQVJUOiBGSVJFIEVWRU5UUyBPTiBMSUdIVCBPUiBEQVJLIEVMRU1FTlRTIENPTE9SICovXG4gICAgICAub24oXCJpbml0IGFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciAkY3VycmVudFNsaWRlID0gJHRoaXMuZmluZChcIi5zbGljay1jdXJyZW50XCIpO1xuICAgICAgICB2YXIgZWxlbWVudHNfY29sb3IgPSAkY3VycmVudFNsaWRlLmF0dHIoXCJkYXRhLWVsZW1lbnRzLWNvbG9yXCIpO1xuICAgICAgICB2YXIgY29sb3JfYnJpZ2h0bmVzcyA9IGlzX2NvbG9yX2JyaWdodChlbGVtZW50c19jb2xvcik7XG5cbiAgICAgICAgaWYgKGNvbG9yX2JyaWdodG5lc3MpIHtcbiAgICAgICAgICAkdGhpcy50cmlnZ2VyKFwiZWxlbWVudHNDb2xvckxpZ2h0XCIsIGVsZW1lbnRzX2NvbG9yKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICR0aGlzLnRyaWdnZXIoXCJlbGVtZW50c0NvbG9yRGFya1wiLCBlbGVtZW50c19jb2xvcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAvKiBFTkQ6IEZJUkUgRVZFTlRTIE9OIExJR0hUIE9SIERBUksgRUxFTUVOVFMgQ09MT1IgKi9cblxuICAgIC8qIFNUQVJUOiBJTklUSUFMSVpBVElPTiAqL1xuICAgICAgLnNsaWNrKHNsaWNrT3B0aW9ucylcbiAgICAvKiBFTkQ6IElOSVRJQUxJWkFUSU9OICovXG4gIDtcbn0pO1xuIiwiJChmdW5jdGlvbigpe1xuICB2YXIgaGVhZGVyX21vYmlsZSA9ICQoXCIuZmxvLWhlYWRlci1tb2JpbGVcIik7XG5cbiAgJChcIi5mbG8taGVhZGVyLW1vYmlsZVwiKS5hcHBlbmRUbyhcIi5mbG8tYmxvY2s6Zmlyc3QgaGVhZGVyXCIpO1xuICAkKFwiLmZsby1oZWFkZXItbW9iaWxlXCIpLmNzcyhcInZpc2liaWxpdHlcIiwgXCJ2aXNpYmxlXCIpO1xuXG4gIC8qIFNUQVJUOiBSRU1PVkUgQUxMIEJVVCBGSVJTVCAqL1xuICAgIC8vICQoXCIuZmxvLWhlYWRlci1tb2JpbGU6bm90KDpmaXJzdClcIikucmVtb3ZlKCk7XG4gIC8qIEVORDogUkVNT1ZFIEFMTCBCVVQgRklSU1QgKi9cblxuICAvKiBTVEFSVDogU1RJQ0tZICovXG4gICAgJChcIi5mbG8taGVhZGVyLW1vYmlsZVwiKS5maXJzdCgpLmFkZENsYXNzKFwibm90LXN0aWNreVwiKTtcbiAgICAkKFwiLmZsby1oZWFkZXItbW9iaWxlLnN0aWNreVwiKS5maXJzdCgpXG4gICAgICAub24oXCJzdGlja3ktZW5kXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJub3Qtc3RpY2t5XCIpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKHRoaXMpLnN0aWNreShcInVwZGF0ZVwiKTtcbiAgICAgICAgfSwgNDAwKTtcbiAgICAgIH0pXG4gICAgICAub24oXCJzdGlja3ktc3RhcnRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIm5vdC1zdGlja3lcIik7XG4gICAgICB9KVxuICAgICAgLnN0aWNreSh7XG4gICAgICAgIHpJbmRleDogMTAwMCxcbiAgICAgICAgY2xhc3NOYW1lOiBcImlzLXN0aWNreVwiLFxuICAgICAgICB3cmFwcGVyQ2xhc3NOYW1lOiBcImZsby1oZWFkZXItbW9iaWxlLXN0aWNreS13cmFwcGVyXCJcbiAgICAgIH0pXG4gICAgO1xuICAvKiBFTkQ6IFNUSUNLWSAqL1xuXG59KTtcbiIsIndpbmRvdy5mbG9fbW9iaWxlX21lbnUgPSBmdW5jdGlvbihlbCl7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJGVsID0gJChlbCk7XG4gIHZhciBiID0gXCJmbG8tbW9iaWxlLW1lbnVcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG5cbiAgdmFyIG9wZW5lZF9jbGFzcyA9IFwiYm9keS0tZmxvLW1vYmlsZS1tZW51LXBvcHVwLW9wZW5lZFwiO1xuICB2YXIgY2xvc2VkX2NsYXNzID0gXCJib2R5LS1mbG8tbW9iaWxlLW1lbnUtcG9wdXAtY2xvc2VkXCI7XG4gIHZhciB0eXBlX2JfbGF5b3V0ID0gXCJib2R5LS1mbG8tbW9iaWxlLW1lbnUtcG9wdXAtdHlwZS1iXCI7XG4gIFxuICAvKiBTVEFSVDogT1BFTiBQT1BVUCAqL1xuICAgICQoXCIuZmxvLWhlYWRlci1tb2JpbGVfX21lbnUtdHJpZ2dlclwiKVxuICAgICAgLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgJChcImJvZHlcIilcbiAgICAgICAgICAuYWRkQ2xhc3Mob3BlbmVkX2NsYXNzKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcyhjbG9zZWRfY2xhc3MpXG4gICAgICAgIDtcbiAgICAgICAgLy9jaGFuZ2UgcGFnZSBwcm9wZXJ0aWVzIGZvciBwb3B1cCBCXG4gICAgICAgIGlmKCRlbC5oYXNDbGFzcyhiICsgXCJfX3BvcHVwLXR5cGUtYlwiKSl7ICBcbiAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyh0eXBlX2JfbGF5b3V0KTtcbiAgICAgICAgICAkKFwiLmZsb19wYWdlX3dyYXBcIikuY3NzKFwiaGVpZ2h0XCIsIFwiMTAwdmhcIik7XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnLmZsb19wYWdlX3dyYXAnKS5jc3Moe1xuICAgICAgICAgICAgICAncG9zaXRpb24nOiAnZml4ZWQnLFxuICAgICAgICAgICAgICAnd2lkdGgnOiAnMTAwdncnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCA1MDApO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgfSlcbiAgICAgIC8vIFRPRE86IFJlbW92ZSBsaW5lIHdoZW4gcG9wdXAgaXMgZmluaXNoZWRcbiAgICAgIC8vIC50cmlnZ2VyKFwiY2xpY2tcIilcbiAgICA7XG4gIC8qIEVORDogT1BFTiBQT1BVUCAqL1xuXG4gIC8qIFNUQVJUOiBDTE9TRSBCVVRUT04gKi9cbiAgICAkZWwuZmluZChkb3RiICsgXCJfX2Nsb3NlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICQoXCJib2R5XCIpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhvcGVuZWRfY2xhc3MpXG4gICAgICAgIC5hZGRDbGFzcyhjbG9zZWRfY2xhc3MpXG4gICAgICA7XG4gICAgICBcbiAgICAgIC8vIHJldmVydCBwYWdlIHByb3BlcnRpZXNcbiAgICAgIGlmKCRlbC5oYXNDbGFzcyhiICsgXCJfX3BvcHVwLXR5cGUtYlwiKSl7ICBcbiAgICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3ModHlwZV9iX2xheW91dCk7XG4gICAgICAgICQoXCIuZmxvX3BhZ2Vfd3JhcFwiKS5jc3MoXCJoZWlnaHRcIiwgXCIxMDB2aFwiKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICQoJy5mbG9fcGFnZV93cmFwJykuY3NzKHtcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICcnLFxuICAgICAgICAgICAgJ3dpZHRoJzogJydcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkKCcuZmxvX3BhZ2Vfd3JhcCcpLmNzcygnbWF4LWhlaWdodCcsICcnKTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgJCgnLmZsb19wYWdlX3dyYXAnKS5jc3MoJ3Bvc2l0aW9uJywgJycpO1xuICAgICAgfVxuICAgICAgXG4gICAgfSk7XG4gIC8qIEVORDogQ0xPU0UgQlVUVE9OICovXG5jb25zb2xlLmxvZygkZWwpO1xuICAvKiBTVEFSVDogVFlQRSBBIC0+IEFERCBEUk9QRE9XTiBUT0dHTEVTIFRPIEVWRVJZIElURU0gV0lUSCBEUk9QRE9XTiAqL1xuICAgICRlbC5maW5kKGRvdGIgKyBcIl9fbWVudSA+IGxpLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhXCIpXG4gICAgICAuYXBwZW5kKFwiPHNwYW4gY2xhc3M9J2Zsby1tb2JpbGUtbWVudV9fbWVudS1kcm9wZG93bi10b2dnbGUnPjxpIGNsYXNzPSdmbG8taWNvbi1yaWdodC1kaXInPjwvaT48L3NwYW4+XCIpXG4gICAgO1xuXG4gICAgJGVsLm9uKFwiY2xpY2tcIiwgZG90YiArIFwiX19tZW51LWRyb3Bkb3duLXRvZ2dsZVwiLCBmdW5jdGlvbihlKXtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNvbnNvbGUubG9nKDEyMyk7XG4gICAgICAkKHRoaXMpLnBhcmVudHMoXCJsaVwiKS50b2dnbGVDbGFzcyhcImNoaWxkcmVuLXZpc2libGVcIik7XG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnNpYmxpbmdzKFwiLnN1Yi1tZW51XCIpLnNsaWRlVG9nZ2xlKFwic2xvd1wiKTtcbiAgICB9KTtcbiAgLyogRU5EOiBUWVBFIEEgLT4gQUREIERST1BET1dOIFRPR0dMRVMgVE8gRVZFUlkgSVRFTSBXSVRIIERST1BET1dOICovXG59XG4iLCJ3aW5kb3cuZmxvX2Jsb2NrX3RvcGJhciA9IGZ1bmN0aW9uKGVsKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgbGV0ICRlbCA9ICQoZWwpO1xuICBsZXQgYiA9IGVsLmNoaWxkcmVuWzBdLnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLmNsYXNzTGlzdFswXTtcbiAgbGV0IGRvdGIgPSAnLicgKyBiO1xuICBsZXQgY2xvc2VUcmlnZ2VyID0gJGVsLmZpbmQoZG90YiArICdfX2Nsb3NlJyk7XG4gIGxldCBsZUNvb2tpZSA9IGZsb0dldENvb2tpZSgndG9wYmFyX2Rpc21pc3NlZCcpO1xuXG4gIGlmKCFsZUNvb2tpZSAmJiAkZWwuZmluZChkb3RiKS5jc3MoJ2Rpc3BsYXknKSA9PSAnbm9uZScpIHtcbiAgICAkZWwuZmluZChkb3RiKS5zbGlkZURvd24oJ2Zhc3QnKTtcbiAgICBjbG9zZVRyaWdnZXIub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgY3JlYXRlQ29va2llKCd0b3BiYXJfZGlzbWlzc2VkJywgdHJ1ZSwgNSk7XG4gICAgICAkZWwuZmluZChkb3RiKS5zbGlkZVVwKCc1MDAnLCAoKSA9PiAkZWwucmVtb3ZlKCkpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgICRlbC5yZW1vdmUoKTtcbiAgfVxufSIsIndpbmRvdy5mbG9faGVhZGVyX3R5cGVfaiA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1oZWFkZXJcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG4gIHZhciBwYXJlbnQgPSAkZWwucGFyZW50cyhcIi5mbG8tYmxvY2tcIik7XG4gIHZhciAkYiA9ICRlbC5maW5kKGRvdGIpO1xuXG4gIC8qIFNUQVJUOiBQT1BVUCBNRU5VIFRSSUdHRVIgKi9cbiAgICAkZWwuZmluZChkb3RiICsgXCJfX3BvcHVwLW1lbnUtdHJpZ2dlclwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19wb3B1cC1tZW51LXdyYXBcIikudG9nZ2xlQ2xhc3MoXG4gICAgICAgIGIgKyBcIl9fcG9wdXAtbWVudS13cmFwLS1vcGVuXCJcbiAgICAgICk7XG4gICAgfSk7XG4gIC8qIEVORDogUE9QVVAgTUVOVSBUUklHR0VSICovXG5cbn1cbiIsIndpbmRvdy5mbG9faGVhZGVyX2Jsb2NrID0gZnVuY3Rpb24gKGVsKSB7XG4gIHZhciBoZWFkZXIgPSAkKGVsKTtcbiAgdmFyIGZsb19oZWFkZXJfX2NsYXNzID0gXCJmbG8taGVhZGVyXCI7XG4gIHZhciAkZmxvX2hlYWRlciA9ICQoXCIuXCIgKyBmbG9faGVhZGVyX19jbGFzcyk7XG4gIHZhciAkaGVhZGVyID0gJChoZWFkZXIpLmZpbmQoJGZsb19oZWFkZXIpO1xuXG4gIC8qIFNUQVJUOiBTVElDS1kgSEVBREVSICovXG4gICAgdmFyIGlzX25vdF9zdGlja3lfY2xhc3MgPSBcImlzLW5vdC1zdGlja3lcIjtcbiAgICB2YXIgaGVhZGVyX3N0aWNreV9jbGFzcyA9IFwiaXMtc3RpY2t5XCI7XG4gIFxuICAgIFxuICAgICQoJGhlYWRlcikuYWRkQ2xhc3MoaXNfbm90X3N0aWNreV9jbGFzcyk7XG4gICAgaWYgKCQoaGVhZGVyKS5oYXNDbGFzcygnZmxvLWhlYWRlci0tc3RpY2t5JykgJiYgd2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICQoJGhlYWRlcikuZmlyc3QoKS5vbihcInN0aWNreS1zdGFydFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoaXNfbm90X3N0aWNreV9jbGFzcyk7XG4gICAgICAgIGhlYWRlci5hZGRDbGFzcyhoZWFkZXJfc3RpY2t5X2NsYXNzKTtcbiAgICAgIH0pLm9uKFwic3RpY2t5LWVuZFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoaXNfbm90X3N0aWNreV9jbGFzcyk7XG4gICAgICAgIGhlYWRlci5yZW1vdmVDbGFzcyhoZWFkZXJfc3RpY2t5X2NsYXNzKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCh0aGlzKS5zdGlja3koXCJ1cGRhdGVcIik7XG4gICAgICAgIH0sIDYwMCk7XG4gICAgICB9KS5zdGlja3koe1xuICAgICAgICB6SW5kZXg6IDk5OTksXG4gICAgICAgIGNsYXNzTmFtZTogXCJpcy1zdGlja3lcIlxuICAgICAgfSk7XG4gICAgfVxuICAvKiBFTkQ6IFNUSUNLWSBIRUFERVIqL1xuXG4gIC8qIFNUQVJUOiBEUk9QRE9XTiAqL1xuICBpZiAod2luZG93Lm91dGVyV2lkdGggPj0gNzY4KSB7XG4gICAgdmFyIGRyb3Bkb3duX2VsZW1lbnRzID0gbmV3IEZvdW5kYXRpb24uRHJvcGRvd25NZW51KCQoXCIubWVudS1pdGVtLWhhcy1jaGlsZHJlbiB1bFwiKSk7XG4gIH1cbiAgLyogRU5EOiBEUk9QRE9XTiAqL1xuXG4gIC8qIFNUQVJUOiBMT0dPIENFTlRFUiAtIFNQTElUIE1FTlUgSU4gSEFMRiAqL1xuICBpZiAoJChcIi5mbG8taGVhZGVyX19tZW51LWRvbm9yXCIpLmxlbmd0aCkge1xuXG4gICAgLyogV1BNTCBzcGxpdCBlbGVtZW50cyovXG4gICAgaWYgKCQoXCIubWVudS1pdGVtXCIpLmhhc0NsYXNzKFwid3BtbC1scy1pdGVtXCIpICYmICQoXCIuZmxvLWhlYWRlclwiKS5oYXNDbGFzcygnZmxvLWhlYWRlci0tdHlwZS1jJykgJiYgJCh3aW5kb3cpLndpZHRoKCkgPj0gNzY4KSB7XG4gICAgICB2YXIgd3BtbF9tZW51X2l0ZW1zID0gJChcIi5mbG8taGVhZGVyX19tZW51LWl0ZW1zIC53cG1sLWxzLWl0ZW1cIik7XG4gICAgICB2YXIgd3BtbF9jb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gICAgICB3cG1sX2NvbnRhaW5lci5jbGFzc05hbWUgPSBcImZsby1oZWFkZXItLXdwbWwtZWxlbWVudHNcIjtcbiAgICAgICQuZWFjaCh3cG1sX21lbnVfaXRlbXMsIGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAgICAgd3BtbF9tZW51X2l0ZW1zID0gdGhpcztcbiAgICAgICAgJCh3cG1sX21lbnVfaXRlbXMpLmFwcGVuZFRvKHdwbWxfY29udGFpbmVyKTtcbiAgICAgIH0pO1xuICAgICAgJCh3cG1sX2NvbnRhaW5lcikuYXBwZW5kVG8oXCIuZmxvLWhlYWRlci0tdHlwZS1jXCIpO1xuICAgIH1cblxuICAgIHZhciAkbWVudV9kb25vciA9ICQoaGVhZGVyKS5maW5kKFwiLmZsby1oZWFkZXJfX21lbnUtZG9ub3JcIiksXG4gICAgICAgICRtZW51X2Rvbm9yX3VsID0gJG1lbnVfZG9ub3IuZmluZChcIj4gZGl2ID4gdWxcIiksXG4gICAgICAgICRtZW51X2Rvbm9yX2ZpcnN0X2xldmVsID0gJG1lbnVfZG9ub3JfdWwuY2hpbGRyZW4oXCJsaVwiKSxcbiAgICAgICAgJG1lbnVfbGVmdCA9ICQoaGVhZGVyKS5maW5kKFwiLmZsby1oZWFkZXJfX21lbnUtLWxlZnQgPiBkaXYgPiB1bFwiKSxcbiAgICAgICAgJG1lbnVfcmlnaHQgPSAkKGhlYWRlcikuZmluZChcIi5mbG8taGVhZGVyX19tZW51LS1yaWdodCA+IGRpdiA+IHVsXCIpLFxuICAgICAgICAkc2VhcmNoX2Zvcm0gPSAkbWVudV9kb25vci5maW5kKFwiZGl2W2NsYXNzKj0nX19zZWFyY2gtd3JhcCddXCIpO1xuXG4gICAgJG1lbnVfZG9ub3JfZmlyc3RfbGV2ZWwuZWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgIHZhciAkaXRlbSA9ICQodGhpcyksXG4gICAgICAgICAgbGVuZ3RoID0gJG1lbnVfZG9ub3JfZmlyc3RfbGV2ZWwubGVuZ3RoO1xuICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC8gMikge1xuICAgICAgICAkbWVudV9sZWZ0LmFwcGVuZCgkaXRlbSk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPj0gbGVuZ3RoIC8gMikge1xuICAgICAgICAkbWVudV9yaWdodC5hcHBlbmQoJGl0ZW0pO1xuICAgICAgfVxuICAgICAgaWYgKCRzZWFyY2hfZm9ybS5sZW5ndGgpIHtcbiAgICAgICAgJG1lbnVfcmlnaHQuYXBwZW5kKCRzZWFyY2hfZm9ybSk7XG4gICAgICB9XG4gICAgICBpZiAoaW5kZXggPT0gbGVuZ3RoIC0gMSkge1xuICAgICAgICAkbWVudV9kb25vci5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICAvKiBFTkQ6IExPR08gQ0VOVEVSIC0gU1BMSVQgTUVOVSBJTiBIQUxGICovXG5cbiAgLyogU1RBUlQ6IFNFQVJDSCBUUklHR0VSICovXG4gICQoXCIuZmxvLWhlYWRlcl9fc2VhcmNoLXRyaWdnZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQodGhpcykucGFyZW50cyhcIi5mbG8taGVhZGVyX19zZWFyY2gtd3JhcFwiKS50b2dnbGVDbGFzcyhcImZsby1oZWFkZXJfX3NlYXJjaC13cmFwLS1vcGVuXCIpO1xuICB9KTtcbiAgLyogRU5EOiBTRUFSQ0ggVFJJR0dFUiAqL1xuXG4gIC8qIFNUQVJUOiBBREQgWklOREVYIFRPIFRIRSBCTE9DSyBXSVRIIEhFQURFUiBJTlNJREUgKi9cbiAgJChcIi5mbG8tYmxvY2sgPiAuZmxvLWJsb2NrX19jb250YWluZXIgPiBoZWFkZXJcIikucGFyZW50cyhcIi5mbG8tYmxvY2tcIikuY3NzKFwiei1pbmRleFwiLCBcIjNcIik7XG4gIC8qIEVORDogQUREIFpJTkRFWCBUTyBUSEUgQkxPQ0sgV0lUSCBIRUFERVIgSU5TSURFICovXG59OyIsIiQoXCIuZmxvLXJldmVhbFwiKS5lYWNoKGZ1bmN0aW9uKCl7XG4gIHZhciByZXZlYWwgPSB0aGlzO1xuICB2YXIgJHJldmVhbCA9ICQocmV2ZWFsKTtcbiAgdmFyIGlkID0gJHJldmVhbC5hdHRyKFwiaWRcIik7XG4gIHZhciB2YWxpZGF0aW9uID1cbiAgICByZXZlYWwuaGFzQXR0cmlidXRlKFwiaWRcIilcbiAgICAmJiByZXZlYWwuaGFzQXR0cmlidXRlKFwiZGF0YS1mbG8tcmV2ZWFsXCIpXG4gIDtcblxuICBpZiAodmFsaWRhdGlvbikge1xuICAgIC8vIGNvbnNvbGUubG9nKFwiRmxvIFJldmVhbDogUmV2ZWFsICNcIiArIGlkICsgXCIgaGFzIHBhc3NlZCB2YWxpZGF0aW9uLlwiKTtcblxuICAgIC8vIFN0YXJ0OiBPdmVybGF5XG4gICAgICAvLyBTdGFydDogT3ZlcmxheSBTdHlsZXNcbiAgICAgICAgdmFyIG92ZXJsYXlfX3N0eWxlcyA9IFtcbiAgICAgICAgICAvLyBTdGFydDogYmFja2dyb3VuZC1jb2xvclxuICAgICAgICAgICAgcmV2ZWFsLmhhc0F0dHJpYnV0ZShcImRhdGEtb3ZlcmxheS1jb2xvclwiKSA/XG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIgKyAkcmV2ZWFsLmF0dHIoXCJkYXRhLW92ZXJsYXktY29sb3JcIikgKyBcIjtcIlxuICAgICAgICAgICAgOiBcIlwiLFxuICAgICAgICAgIC8vIEVuZDogYmFja2dyb3VuZC1jb2xvclxuICAgICAgICAgIC8vIFN0YXJ0OiBvcGFjaXR5XG4gICAgICAgICAgICByZXZlYWwuaGFzQXR0cmlidXRlKFwiZGF0YS1vdmVybGF5LW9wYWNpdHlcIikgP1xuICAgICAgICAgICAgICAgIFwib3BhY2l0eTogXCIgKyAkcmV2ZWFsLmF0dHIoXCJkYXRhLW92ZXJsYXktb3BhY2l0eVwiKSArIFwiO1wiXG4gICAgICAgICAgICA6IFwiXCJcbiAgICAgICAgICAvLyBFbmQ6IG9wYWNpdHlcbiAgICAgICAgXS5qb2luKFwiXCIpO1xuICAgICAgICBvdmVybGF5X19zdHlsZXMgPSBvdmVybGF5X19zdHlsZXMgIT0gXCJcIiA/IFwiIHN0eWxlPSdcIitvdmVybGF5X19zdHlsZXMrXCInIFwiIDogXCJcIjtcbiAgICAgIC8vIEVuZDogT3ZlcmxheSBTdHlsZXNcblxuICAgICAgLy8gU3RhcnQ6IE92ZXJsYXkgUmVuZGVyXG4gICAgICAgICRyZXZlYWwuYmVmb3JlKFxuICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZmxvLXJldmVhbC1vdmVybGF5J1wiK292ZXJsYXlfX3N0eWxlcytcIiBpZD0nXCIraWQrXCInPjwvZGl2PlwiXG4gICAgICAgICk7XG4gICAgICAvLyBFbmQ6IE92ZXJsYXkgUmVuZGVyXG5cbiAgICAgIHZhciBvdmVybGF5X19yZXR1cm4gPSBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gJChcIiNcIitpZCtcIi5mbG8tcmV2ZWFsLW92ZXJsYXlcIik7XG4gICAgICB9XG4gICAgLy8gU3RhcnQ6IE92ZXJsYXlcblxuICAgIC8vIFN0YXJ0OiBEaXNhcHBlYXIgRXZlbnRzXG4gICAgICAkcmV2ZWFsLm9uKFwiZmxvLXJldmVhbF9fY2xvc2VcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICRvdmVybGF5ID0gb3ZlcmxheV9fcmV0dXJuKCk7XG5cbiAgICAgICAgJHJldmVhbC5yZW1vdmVDbGFzcyhcImZsby1yZXZlYWwtLXZpc2libGVcIik7XG4gICAgICAgICRvdmVybGF5LnJlbW92ZUNsYXNzKFwiZmxvLXJldmVhbC1vdmVybGF5LS12aXNpYmxlXCIpO1xuICAgICAgICAkKFwiYm9keVwiKS5jc3MoXCJvdmVyZmxvd1wiLCBcIlwiKTtcbiAgICAgIH0pO1xuICAgIC8vIEVuZDogRGlzYXBwZWFyIEV2ZW50c1xuXG4gICAgLy8gU3RhcnQ6IEFwcGVhclxuICAgICAgJChcIltkYXRhLW9wZW49J1wiK2lkK1wiJ11cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgJG92ZXJsYXkgPSBvdmVybGF5X19yZXR1cm4oKTtcbiAgICAgICAgdmFyIHRyaWdnZXIgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgdHJpZ2dlcl9fcG9zaXRpb25fb25fc2NyZWVuID0gdHJpZ2dlci5vZmZzZXQoKS5sZWZ0IDw9IHdpbmRvdy5pbm5lcldpZHRoIC8gMiA/IFwibGVmdFwiIDogXCJyaWdodFwiO1xuXG4gICAgICAgICRyZXZlYWwucmVtb3ZlQ2xhc3MoXCJmbG8tcmV2ZWFsLS1yZWFkeVwiKTtcbiAgICAgICAgJHJldmVhbC5hdHRyKFwiZGF0YS1pbml0aWFsLXBvc2l0aW9uXCIsIHRyaWdnZXJfX3Bvc2l0aW9uX29uX3NjcmVlbik7XG4gICAgICAgICQoXCJib2R5XCIpLmNzcyhcIm92ZXJmbG93XCIsIFwiaGlkZGVuXCIpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAkcmV2ZWFsLmFkZENsYXNzKFwiZmxvLXJldmVhbC0tcmVhZHlcIik7XG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJHJldmVhbC5hZGRDbGFzcyhcImZsby1yZXZlYWwtLXZpc2libGVcIik7XG4gICAgICAgICAgJG92ZXJsYXkuYWRkQ2xhc3MoXCJmbG8tcmV2ZWFsLW92ZXJsYXktLXZpc2libGVcIik7XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICAvLyBFbmQ6IEFwcGVhclxuXG4gICAgLy8gU3RhcnQ6IERpc2FwcGVhclxuXG4gICAgICAvLyBCeSBjbGlja2luZyB0aGUgY2xvc2UgYnV0dG9uXG4gICAgICAkcmV2ZWFsLmZpbmQoXCJbZGF0YS1jbG9zZV1cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICAkcmV2ZWFsLnRyaWdnZXIoXCJmbG8tcmV2ZWFsX19jbG9zZVwiKTtcbiAgICAgIH0pXG5cbiAgICAgIC8vIEJ5IHByZXNzaW5nIGVzY2FwZVxuICAgICAgJChkb2N1bWVudCkub24oXCJrZXl1cFwiLCBmdW5jdGlvbihlKXtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNykge1xuICAgICAgICAgICRyZXZlYWwudHJpZ2dlcihcImZsby1yZXZlYWxfX2Nsb3NlXCIpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLy8gQnkgY2xpY2tpbmcgb24gdGhlIG92ZXJsYXlcbiAgICAgIG92ZXJsYXlfX3JldHVybigpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgICRyZXZlYWwudHJpZ2dlcihcImZsby1yZXZlYWxfX2Nsb3NlXCIpO1xuICAgICAgfSlcbiAgICAvLyBFbmQ6IERpc2FwcGVhclxuICB9XG59KTtcbiIsIndpbmRvdy5mbG9fc2xpZGVzaG93ID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLXNsaWRlc2hvd1wiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyIHBhcmVudCA9ICRlbC5wYXJlbnRzKFwiLmZsby1ibG9ja1wiKTtcblxuICAvKiBTVEFSVDogSElERSBDT1VOVEVSIEFORCBBUlJPV1MgSUYgVEhFUkUgSVMgT05MWSBPTkUgU0xJREUgKi9cbiAgICBpZiAoXG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX3NsaWRlcyBcIiArIGRvdGIgKyBcIl9fc2xpZGU6bm90KC5zbGljay1jbG9uZWQpXCIpLmxlbmd0aCA9PSAxXG4gICAgKSAkKGRvdGIpLmFkZENsYXNzKGIgKyBcIi0tb25lLXNsaWRlXCIpOyBcbiAgLyogRU5EOiBISURFIENPVU5URVIgQU5EIEFSUk9XUyBJRiBUSEVSRSBJUyBPTkxZIE9ORSBTTElERSAqL1xuXG4gIC8qIFNUQVJUOiBUUklHR0VSIEdSQURJRU5UIE9OIEhPVkVSIE9OIFNQRUNJRklDIEVMRU1FTlRTICovXG4gICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID4gMTAyNCkge1xuICAgICAgJChkb3RiICsgXCJfX3RpdGxlLWFyZWFcIilcbiAgICAgIC5hZGQoXCIuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2J1dHRvblwiKVxuICAgICAgLmFkZChcIi5mbG8tc2xpZGVzaG93X19mZWF0dXJlZC1saW5rXCIpXG4gICAgICAgIC5tb3VzZWVudGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgJChlbCkuZmluZChkb3RiICsgXCJfX3NsaWRlLnNsaWNrLWN1cnJlbnRcIikuYWRkQ2xhc3MoXCJncmFkaWVudC12aXNpYmxlXCIpO1xuICAgICAgICB9KVxuICAgICAgICAubW91c2VsZWF2ZShmdW5jdGlvbigpe1xuICAgICAgICAgICQoZWwpLmZpbmQoZG90YiArIFwiX19zbGlkZS5zbGljay1jdXJyZW50XCIpLnJlbW92ZUNsYXNzKFwiZ3JhZGllbnQtdmlzaWJsZVwiKTtcbiAgICAgICAgfSlcbiAgICAgIDtcbiAgICB9XG4gIC8qIEVORDogVFJJR0dFUiBHUkFESUVOVCBPTiBIT1ZFUiBPTiBTUEVDSUZJQyBFTEVNRU5UUyAqL1xufVxuIiwid2luZG93LmZsb19zbGlkZXNob3dfX2xheW91dF9fdHlwZV9hID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLXNsaWRlc2hvd1wiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyIHBhcmVudCA9ICRlbC5wYXJlbnRzKFwiLmZsby1ibG9ja1wiKTtcblxuICAvKiBTVEFSVDogSElERSBBUlJPVyBPTiBTUEVDSUZJQyBIT1ZFUiAqL1xuICAgICRlbC5maW5kKFtcbiAgICAgIFwiLmZsby1oZXJvLXZpZGVvLWVtYmVkX19idXR0b25cIixcbiAgICAgIGRvdGIgKyBcIl9fdGl0bGUtYXJlYVwiXG4gICAgXS5qb2luKFwiLFwiKSlcbiAgICAgIC5tb3VzZWVudGVyKGZ1bmN0aW9uKCl7XG4gICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctbmV4dFwiKVxuICAgICAgICAgIC5hZGRDbGFzcyhcInZlcnRpY2FsXCIpXG4gICAgICAgICAgLy8gLmhpZGUoKVxuICAgICAgICA7XG4gICAgICB9KVxuICAgICAgLm1vdXNlbGVhdmUoZnVuY3Rpb24oKXtcbiAgICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19hcnJvdy1uZXh0XCIpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKFwidmVydGljYWxcIilcbiAgICAgICAgICAvLyAuc2hvdygpXG4gICAgICAgIDtcbiAgICAgIH0pXG4gICAgO1xuICAvKiBFTkQ6IEhJREUgQVJST1cgT04gU1BFQ0lGSUMgSE9WRVIgKi9cblxuICAkZWwuZmluZChkb3RiICsgXCJfX3NsaWRlc1wiKVxuICAgIC8qIFNUQVJUOiBBUlJPVyAqL1xuICAgICAgLm9uKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzY4KSB7XG4gICAgICAgICAgdmFyIHggPSBlLnBhZ2VYIC0gJCh0aGlzKS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICAgIHZhciB5ID0gZS5wYWdlWSAtICQodGhpcykub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgdmFyIGFycm93ID0gJGVsLmZpbmQoZG90YiArIFwiX19hcnJvdy1uZXh0XCIpO1xuXG4gICAgICAgICAgYXJyb3cuY3NzKHtcbiAgICAgICAgICAgIFwibGVmdFwiIDogeCxcbiAgICAgICAgICAgIFwidG9wXCIgOiB5XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB2YXIgd2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XG5cbiAgICAgICAgICBpZiAoeCA8PSB3aWR0aCAvIDIpIHtcbiAgICAgICAgICAgIGFycm93LmFkZENsYXNzKFwiaW52ZXJ0ZWRcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFycm93LnJlbW92ZUNsYXNzKFwiaW52ZXJ0ZWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHdpbmRvdy5pbm5lcldpZHRoID49IDc2OFxuICAgICAgICAgICYmICEkKGUudGFyZ2V0KS5pcyhcIltjbGFzcyo9ZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2J1dHRvbl1cIilcbiAgICAgICAgICAmJiAhJChlLnRhcmdldCkuaXMoXCJbY2xhc3MqPWZsby1zbGlkZXNob3dfX3RpdGxlLWFyZWFdXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIHZhciB4ID0gZS5wYWdlWCAtICQodGhpcykub2Zmc2V0KCkubGVmdDtcbiAgICAgICAgICB2YXIgeSA9IGUucGFnZVkgLSAkKHRoaXMpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICB2YXIgd2lkdGggPSAkKHRoaXMpLndpZHRoKCk7XG5cbiAgICAgICAgICBpZiAoeCA8PSB3aWR0aCAvIDIpIHtcbiAgICAgICAgICAgICQodGhpcykuc2xpY2soXCJzbGlja1ByZXZcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQodGhpcykuc2xpY2soXCJzbGlja05leHRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH0pXG4gICAgLyogRU5EOiBBUlJPVyAqL1xuICA7XG5cbn1cbiIsIndpbmRvdy5mbG9fc2xpZGVzaG93X19sYXlvdXRfX3R5cGVfYiA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1zbGlkZXNob3dcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG4gIHZhciBwYXJlbnQgPSAkZWwucGFyZW50cyhcIi5mbG8tYmxvY2tcIik7XG5cbiAgLyogU1RBUlQ6IFNFVCBQUk9QRVIgSEVJR0hUUyBGT1IgVEhFIFNQQUNFUiBBTkQgVEhFIFNMSURFUyAqL1xuICAgIGZ1bmN0aW9uIHNldEhlaWdodHMoKSB7XG4gICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gcGFyZW50LmZpbmQoXCIuZmxvLWJsb2NrX19oZWFkZXJcIikuaGVpZ2h0KCk7XG4gICAgICBpZiAoIWhlYWRlckhlaWdodCkge1xuICAgICAgICBoZWFkZXJIZWlnaHQgPSAwO1xuICAgICAgfVxuXG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX3NwYWNlclwiKS5jc3MoXG4gICAgICAgIFwiaGVpZ2h0XCIsXG4gICAgICAgIGhlYWRlckhlaWdodCArIFwicHhcIlxuICAgICAgKTtcblxuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19zbGlkZXNcIilcbiAgICAgIC5hZGQoZG90YiArIFwiX19iYWNrZ3JvdW5kXCIpXG4gICAgICAuYWRkKGRvdGIgKyBcIl9fc2xpZGUtbWFpbi13cmFwXCIpXG4gICAgICAuYWRkKGRvdGIgKyBcIl9fc2xpZGUtaW1hZ2VcIilcbiAgICAgICAgLmNzcyhcbiAgICAgICAgICBcImhlaWdodFwiLFxuICAgICAgICAgIFwiY2FsYygxMDB2aCAtIFwiICsgaGVhZGVySGVpZ2h0KyBcInB4KVwiXG4gICAgICAgIClcbiAgICAgIDtcblxuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19iYWNrZ3JvdW5kXCIpLmNzcyhcbiAgICAgICAgXCJ0b3BcIixcbiAgICAgICAgaGVhZGVySGVpZ2h0ICsgXCJweFwiXG4gICAgICApO1xuICAgIH1cblxuICAgIHNldEhlaWdodHMoKTtcblxuICAgICQod2luZG93KS5vbihcInJlc2l6ZVwiLCBmdW5jdGlvbigpe1xuICAgICAgc2V0SGVpZ2h0cygpO1xuICAgIH0pO1xuICAvKiBFTkQ6IFNFVCBQUk9QRVIgSEVJR0hUUyBGT1IgVEhFIFNQQUNFUiBBTkQgVEhFIFNMSURFUyAqL1xuXG4gIC8qIFNUQVJUOiBTTElERVMgKi9cbiAgICB2YXIgc2xpZGVzID0gJGVsLmZpbmQoZG90YiArIFwiX19zbGlkZXNcIik7XG5cbiAgICBzbGlkZXNcbiAgICAgIC8qIFNUQVJUOiBWSURFTyBCQUNLR1JPVU5EICovXG4gICAgICAgIC5vbihcImluaXQgcmVJbml0IGFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAvLyBTdGFydDogUGF1c2UgYWxsIHZpZGVvc1xuICAgICAgICAgICAgICAkZWwuZmluZChcIi5cIiArIGIgKyBcIl9fc2xpZGUtLXZpZGVvX3NsaWRlOm5vdCguc2xpY2stY3VycmVudClcIikuZmluZChcInZpZGVvXCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gRW5kOiBQYXVzZSBhbGwgdmlkZW9zXG4gICAgICAgICAgICB2YXIgYWN0aXZlX3NsaWRlX18kID0gJGVsLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVfc2xpZGVfXyQuaGFzQ2xhc3MoYiArIFwiX19zbGlkZS0tdmlkZW9fc2xpZGVcIikpIHtcbiAgICAgICAgICAgICAgdmFyIHZpZGVvX2NvbnRhaW5lciA9IGFjdGl2ZV9zbGlkZV9fJC5maW5kKFwiLlwiICsgYiArIFwiX19zbGlkZS1iYWNrZ3JvdW5kLXZpZGVvXCIpO1xuICAgICAgICAgICAgICB2YXIgdmlkZW8gPSB2aWRlb19jb250YWluZXIuZmluZChcInZpZGVvXCIpWzBdO1xuXG4gICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIC8qIEVORDogVklERU8gQkFDS0dST1VORCAqL1xuXG4gICAgICAvKiBTVEFSVDogQ0hBTkdFIEJBQ0tHUk9VTkQgQ09MT1IgKi9cbiAgICAgICAgLm9uKFwiaW5pdCBhZnRlckNoYW5nZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fYmFja2dyb3VuZFwiKVxuICAgICAgICAgICAgLmNzcyhcbiAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsXG4gICAgICAgICAgICAgICRlbC5maW5kKFwiLnNsaWNrLWN1cnJlbnRcIikuYXR0cihcImRhdGEtc2xpZGUtYmdcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICA7XG4gICAgICAgIH0pXG4gICAgICAvKiBFTkQ6IENIQU5HRSBCQUNLR1JPVU5EIENPTE9SICovXG5cbiAgICAgIC8qIFNUQVJUOiBDT1VOVCAtIFNFVCBDT1VOVCAqL1xuICAgICAgICAub24oXCJpbml0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgICB2YXIgY291bnQgPSAkdGhpcy5maW5kKFwiLnNsaWNrLXNsaWRlOm5vdCguc2xpY2stY2xvbmVkKVwiKS5sZW5ndGg7XG4gICAgICAgICAgY291bnQgPSBwYWQoY291bnQsIDIpO1xuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fY291bnRlci1jb3VudFwiKS5odG1sKFxuICAgICAgICAgICAgY291bnRcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgLyogRU5EOiBDT1VOVCAtIFNFVCBDT1VOVCAqL1xuXG4gICAgICAvKiBTVEFSVDogQ09VTlQgLSBTRVQgSU5ERVggKi9cbiAgICAgICAgLm9uKFwiaW5pdCBhZnRlckNoYW5nZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoJHRoaXMuZmluZChcIi5zbGljay1jdXJyZW50XCIpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIpKSsxO1xuICAgICAgICAgIGluZGV4ID0gcGFkKGluZGV4LCAyKTtcblxuICAgICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fY291bnRlci1pbmRleFwiKS5jaGFuZ2VUZXh0VUkoXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIFwiY291bnRlclwiXG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgIC8qIEVORDogQ09VTlQgLSBTRVQgSU5ERVggKi9cblxuICAgICAgLyogU1RBUlQ6IFZJREVPIEVNQkVEICovXG4gICAgICAgIC5vbihcImluaXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgJHNsaWRlcyA9ICQodGhpcyk7XG4gICAgICAgICAgJGVsLmZpbmQoXCIuXCIrYitcIl9fc2xpZGUtLWltYWdlX2FuZF92aWRlb19lbWJlZFwiKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgYWN0aXZlX3NsaWRlX18kID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciB2aWRlb19lbWJlZF9ob3N0ID0gYWN0aXZlX3NsaWRlX18kO1xuICAgICAgICAgICAgdmFyIHZpZGVvX2J1dHRvbiA9IGFjdGl2ZV9zbGlkZV9fJC5maW5kKFwiLmZsby1oZXJvLXZpZGVvLWVtYmVkX19idXR0b25cIik7XG4gICAgICAgICAgICB2YXIgdmlkZW9fY29udGFpbmVyID0gYWN0aXZlX3NsaWRlX18kLmZpbmQoXCIuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2NvbnRhaW5lclwiKTtcbiAgICAgICAgICAgIHZhciBlbWJlZF9jb2RlID0gYWN0aXZlX3NsaWRlX18kLmF0dHIoXCJkYXRhLWVtYmVkLWNvZGVcIik7XG5cbiAgICAgICAgICAgIHZpZGVvX2J1dHRvbi5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGlmICghdmlkZW9fZW1iZWRfaG9zdC5oYXNDbGFzcyhcInZpZGVvLWlzLXBsYXlpbmdcIikpIHtcbiAgICAgICAgICAgICAgICB2aWRlb19jb250YWluZXIuaHRtbCh1bmVzY2FwZShlbWJlZF9jb2RlKSk7XG4gICAgICAgICAgICAgICAgdmlkZW9fZW1iZWRfaG9zdC5hZGRDbGFzcyhcInZpZGVvLWlzLXBsYXlpbmdcIik7XG5cbiAgICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKFwic2xpY2tTZXRPcHRpb25cIiwgXCJhdXRvcGxheVwiLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlkZW9fZW1iZWRfaG9zdC5oYXNDbGFzcyhcInZpZGVvLWlzLXBsYXlpbmdcIikpIHtcbiAgICAgICAgICAgICAgICB2aWRlb19jb250YWluZXIuaHRtbChcIlwiKTtcbiAgICAgICAgICAgICAgICB2aWRlb19lbWJlZF9ob3N0LnJlbW92ZUNsYXNzKFwidmlkZW8taXMtcGxheWluZ1wiKTtcblxuICAgICAgICAgICAgICAgIHZhciBhdXRvcGxheSA9ICRzbGlkZXMuYXR0cihcImRhdGEtYXV0b3BsYXlcIikgPT0gXCJ0cnVlXCIgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICAgICAgJHNsaWRlcy5zbGljayhcInNsaWNrU2V0T3B0aW9uXCIsIFwiYXV0b3BsYXlcIiwgYXV0b3BsYXkgLCB0cnVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbihcImJlZm9yZUNoYW5nZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHZhciBhY3RpdmVfc2xpZGVfXyQgPSAkKHRoaXMpLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKTtcbiAgICAgICAgICB2YXIgdmlkZW9fZW1iZWRfaG9zdCA9IGFjdGl2ZV9zbGlkZV9fJDtcblxuICAgICAgICAgIC8qIFNUQVJUOiBWSURFTyBFTUJFRCBDTE9TRSBPTiBTTElERSBDSEFOR0UgKi9cbiAgICAgICAgICAgIGlmICh2aWRlb19lbWJlZF9ob3N0Lmhhc0NsYXNzKFwidmlkZW8taXMtcGxheWluZ1wiKSkge1xuICAgICAgICAgICAgICBhY3RpdmVfc2xpZGVfXyQuZmluZChcIi5mbG8taGVyby12aWRlby1lbWJlZF9fYnV0dG9uXCIpLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLyogRU5EOiBWSURFTyBFTUJFRCBDTE9TRSBPTiBTTElERSBDSEFOR0UgKi9cblxuICAgICAgICB9KVxuICAgICAgLyogRU5EOiBWSURFTyBFTUJFRCAqL1xuXG4gICAgICAuc2xpY2soXG4gICAgICAgIHtcbiAgICAgICAgICBkb3RzOiBmYWxzZSxcbiAgICAgICAgICAvLyBhcnJvd3M6IGZhbHNlLFxuICAgICAgICAgIGNzc0Vhc2U6IFwiZWFzZS1pbi1vdXRcIixcbiAgICAgICAgICBzcGVlZDogXCI0MDBcIixcbiAgICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgIG5leHRBcnJvdzogJGVsLmZpbmQoZG90YiArIFwiX19hcnJvdy0tbmV4dFwiKSxcbiAgICAgICAgICBwcmV2QXJyb3c6ICRlbC5maW5kKGRvdGIgKyBcIl9fYXJyb3ctLXByZXZcIilcbiAgICAgICAgfVxuICAgICAgKVxuICAgIDtcbiAgLyogRU5EOiBTTElERVMgKi9cbn1cbiIsIndpbmRvdy5mbG9fc2xpZGVzaG93X19sYXlvdXRfX3R5cGVfYyA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1zbGlkZXNob3dcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG4gIHZhciBwYXJlbnQgPSAkZWwucGFyZW50cyhcIi5mbG8tYmxvY2tcIik7XG5cbiAgLyogU1RBUlQ6IFNUQVJUIFNFVCBIRUlHSFRTIEZPUiBNT0JJTEUgKi9cbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcblxuICAgICAgZnVuY3Rpb24gc2V0SGVpZ2h0cygpIHtcbiAgICAgICAgdmFyIGhlYWRlckhlaWdodCA9IHBhcmVudC5maW5kKFwiLmZsby1ibG9ja19faGVhZGVyXCIpLmhlaWdodCgpIC8gMTYgKyBcInJlbVwiO1xuICAgICAgICBpZiAoIWhlYWRlckhlaWdodCkge1xuICAgICAgICAgIGhlYWRlckhlaWdodCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNsaWRlU2VsZWN0b3JIZWlnaHQgPSA4MCAvIDE2O1xuICAgICAgICB2YXIgc2xpZGVTZWxlY3RvckJvdHRvbU1hcmdpbiA9IDIwIC8gMTY7XG5cbiAgICAgICAgcGFyZW50LmZpbmQoZG90YilcbiAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgIFwicGFkZGluZy10b3BcIjogaGVhZGVySGVpZ2h0LFxuICAgICAgICAgICAgXCJwYWRkaW5nLWJvdHRvbVwiOiBzbGlkZVNlbGVjdG9ySGVpZ2h0ICsgc2xpZGVTZWxlY3RvckJvdHRvbU1hcmdpbiArIFwicmVtXCJcbiAgICAgICAgICB9KVxuICAgICAgICA7XG4gICAgICB9XG5cbiAgICAgIHNldEhlaWdodHMoKTtcblxuICAgICAgJCh3aW5kb3cpLm9uKFwicmVzaXplXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHNldEhlaWdodHMoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgLyogRU5EOiBTVEFSVCBTRVQgSEVJR0hUUyBGT1IgTU9CSUxFICovXG5cbiAgLyogU1RBUlQ6IFNMSURFIFNFTEVDVE9SICovXG4gICAgJGVsLmZpbmQoZG90YiArIFwiX19zbGlkZS1zZWxlY3RvcnNcIilcbiAgICAgIC5vbihcImluaXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcGFyZW50LmZpbmQoZG90YiArIFwiX19zbGlkZXNcIikuc2xpY2soXCJzbGlja1NldE9wdGlvblwiLCBcImFzTmF2Rm9yXCIsICR0aGlzKTtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfSlcbiAgICAgIC5zbGljayh7XG4gICAgICAgIHZhcmlhYmxlV2lkdGg6IHRydWUsXG4gICAgICAgIGFycm93czogZmFsc2UsXG4gICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICBmb2N1c09uU2VsZWN0OiB0cnVlLFxuICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgICBhc05hdkZvcjogcGFyZW50LmZpbmQoZG90YiArIFwiX19zbGlkZXNcIilcbiAgICAgIH0pXG4gICAgO1xuICAvKiBFTkQ6IFNMSURFIFNFTEVDVE9SICovXG5cbiAgLyogU1RBUlQ6IFJJR0hUIEJBUiAqL1xuXG4gICAgLyogU1RBUlQ6IEFERCBDTEFTUyBUTyBCT0RZIFRPIEhFTFAgTU9ESUlGWSBUSEUgSEVBREVSIFBPUFVQICovXG4gICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImJvZHktLWZsby1oZWFkZXJfX3BvcHVwLS1mb3Itc2xpZGVzaG93LXR5cGUtY1wiKTtcbiAgICAvKiBFTkQ6IEFERCBDTEFTUyBUTyBCT0RZIFRPIEhFTFAgTU9ESUlGWSBUSEUgSEVBREVSIFBPUFVQICovXG5cbiAgICAvKiBTVEFSVDogU0VBUkNIIFRPR0dMRSAtPiBDTElDSyAtPiBGT0NVUyBPTiBTRUFSQ0ggSU5QVVQgV0hFTiBQT1BVUCBPUEVOUyAqL1xuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19yaWdodC1iYXItc2VhcmNoLXRyaWdnZXJcIikuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgJChcIi5mbG8taGVhZGVyLXBvcHVwX19zZWFyY2gtaW5wdXRcIikuZm9jdXMoKTtcbiAgICAgIH0pO1xuICAgIC8qIEVORDogU0VBUkNIIFRPR0dMRSAtPiBDTElDSyAtPiBGT0NVUyBPTiBTRUFSQ0ggSU5QVVQgV0hFTiBQT1BVUCBPUEVOUyAqL1xuXG4gIC8qIEVORDogUklHSFQgQkFSICovXG59XG4iLCJ3aW5kb3cuZmxvX3NsaWRlc2hvd19fc2xpZGVzID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLXNsaWRlc2hvd1wiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcblxuICB2YXIgYmxvY2sgPSAkZWwucGFyZW50cyhkb3RiKTtcbiAgdmFyIGJsb2NrX2lkID0gYmxvY2suYXR0cihcImRhdGEtYmxvY2staWRcIik7XG5cbiAgdmFyIGJsb2NrX2NsYXNzX3dpdGhfaWQgPSBcImZsby1zbGlkZXNob3ctLVwiICsgYmxvY2tfaWQ7XG4gIHZhciBibG9ja19zZWxlY3Rvcl93aXRoX2lkID0gXCIuXCIgKyBibG9ja19jbGFzc193aXRoX2lkO1xuXG4gIHZhciBkb3RibG9ja19wYXJlbnQgPSBibG9jay5wYXJlbnRzKFwiLmZsby1ibG9ja1wiKTtcbiAgdmFyIGJsb2NrX3BhcmVudF93aXRoX2lkID0gXCIuZmxvLWJsb2NrLS1cIiArIGRvdGJsb2NrX3BhcmVudC5hdHRyKFwiZGF0YS1pZFwiKTtcblxuICAkZWxcbiAgICAvKiBTVEFSVDogVklERU8gQkFDS0dST1VORCAqL1xuICAgICAgLm9uKFwiaW5pdCByZUluaXQgYWZ0ZXJDaGFuZ2VcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAvLyBTdGFydDogUGF1c2UgYWxsIHZpZGVvc1xuICAgICAgICAgICAgJGVsLmZpbmQoXCIuXCIgKyBiICsgXCJfX3NsaWRlLS12aWRlb19zbGlkZTpub3QoLnNsaWNrLWN1cnJlbnQpXCIpLmZpbmQoXCJ2aWRlb1wiKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIC8vIEVuZDogUGF1c2UgYWxsIHZpZGVvc1xuICAgICAgICAgIHZhciBhY3RpdmVfc2xpZGVfXyQgPSAkZWwuZmluZChcIi5zbGljay1jdXJyZW50XCIpO1xuICAgICAgICAgIGlmIChhY3RpdmVfc2xpZGVfXyQuaGFzQ2xhc3MoYiArIFwiX19zbGlkZS0tdmlkZW9fc2xpZGVcIikpIHtcbiAgICAgICAgICAgIHZhciB2aWRlb19jb250YWluZXIgPSBhY3RpdmVfc2xpZGVfXyQuZmluZChcIi5cIiArIGIgKyBcIl9fc2xpZGUtYmFja2dyb3VuZC12aWRlb1wiKTtcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IHZpZGVvX2NvbnRhaW5lci5maW5kKFwidmlkZW9cIilbMF07XG5cbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICB9KVxuICAgIC8qIEVORDogVklERU8gQkFDS0dST1VORCAqL1xuXG4gICAgLyogU1RBUlQ6IENIQU5HRSBMT0dPIEJBU0VEIE9OIFNMSURFIEVMRU1FTlRTIENPTE9SICovXG4gICAgICAub24oXCJpbml0IGFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciAkY3VycmVudFNsaWRlID0gJHRoaXMuZmluZChcIi5zbGljay1jdXJyZW50XCIpO1xuICAgICAgICB2YXIgZWxlbWVudHNfY29sb3IgPSAkY3VycmVudFNsaWRlLmF0dHIoXCJkYXRhLWVsZW1lbnRzLWNvbG9yXCIpO1xuICAgICAgICB2YXIgY29sb3JfYnJpZ2h0bmVzcyA9IGlzX2NvbG9yX2JyaWdodChlbGVtZW50c19jb2xvcik7XG5cbiAgICAgICAgaWYgKGNvbG9yX2JyaWdodG5lc3MpIHtcbiAgICAgICAgICBkb3RibG9ja19wYXJlbnQuZmluZChkb3RiICsgXCJfX2xvZ29cIikuYWRkQ2xhc3MoYiArIFwiX19sb2dvLS1saWdodFwiKTtcblxuICAgICAgICAgIGRvdGJsb2NrX3BhcmVudC5maW5kKFwiLmZsby1oZWFkZXJfX2xvZ29cIikuYWRkQ2xhc3MoXCJmbG8taGVhZGVyX19sb2dvLS1saWdodFwiKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGRvdGJsb2NrX3BhcmVudC5maW5kKFwiLmlzLW1haW4gLmZsby1oZWFkZXItbW9iaWxlX19sb2dvXCIpLmFkZENsYXNzKFwiZmxvLWhlYWRlci1tb2JpbGVfX2xvZ28tLWxpZ2h0XCIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvdGJsb2NrX3BhcmVudC5maW5kKGRvdGIgKyBcIl9fbG9nb1wiKS5yZW1vdmVDbGFzcyhiICsgXCJfX2xvZ28tLWxpZ2h0XCIpO1xuXG4gICAgICAgICAgZG90YmxvY2tfcGFyZW50LmZpbmQoXCIuZmxvLWhlYWRlcl9fbG9nb1wiKS5yZW1vdmVDbGFzcyhcImZsby1oZWFkZXJfX2xvZ28tLWxpZ2h0XCIpO1xuXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgZG90YmxvY2tfcGFyZW50LmZpbmQoXCIuaXMtbWFpbiAuZmxvLWhlYWRlci1tb2JpbGVfX2xvZ29cIikucmVtb3ZlQ2xhc3MoXCJmbG8taGVhZGVyLW1vYmlsZV9fbG9nby0tbGlnaHRcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgLyogRU5EOiBDSEFOR0UgTE9HTyBCQVNFRCBPTiBTTElERSBFTEVNRU5UUyBDT0xPUiAqL1xuXG4gICAgLyogU1RBUlQ6IENIQU5HRSBDT0xPUiBCQVNFRCBPTiBTTElERSBDT0xPUiAqL1xuICAgICAgLm9uKFwiaW5pdCBhZnRlckNoYW5nZVwiLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgZWxlbWVudHNfY29sb3IgPSAkKHRoaXMpLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKS5hdHRyKFwiZGF0YS1lbGVtZW50cy1jb2xvclwiKTtcblxuICAgICAgICB2YXIgY3NzID0gW107XG5cbiAgICAgICAgY3NzLnB1c2goW1xuXG4gICAgICAgICAgLyogU1RBUlQ6IEhFQURFUiAtIEEgKi9cbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIFwiICsgZG90YiArIFwiX19tZW51ID4gZGl2ID4gdWwgPiAubWVudS1pdGVtLCBcIixcbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIFwiICsgZG90YiArIFwiX19tZW51ID4gZGl2ID4gdWwgPiAubWVudS1pdGVtIGE6YWZ0ZXIsIFwiLFxuXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBoZWFkZXIgLmlzLW5vdC1zdGlja3kgLmZsby1oZWFkZXJfX2xvZ28sIFwiLFxuICAgICAgICAgICAgYmxvY2tfcGFyZW50X3dpdGhfaWQgKyBcIi5mbG8tc2xpZGVzaG93LWJsb2NrLS10eXBlLWEgaGVhZGVyIC5pcy1ub3Qtc3RpY2t5IC5mbG8taGVhZGVyX19tZW51ID4gZGl2ID4gdWwgPiAubWVudS1pdGVtID4gYSwgXCIsXG5cbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIGhlYWRlciAuaXMtbm90LXN0aWNreSAuZmxvLWhlYWRlcl9fbWVudS10cmlnZ2VyLCBcIixcblxuICAgICAgICAgICAgYmxvY2tfcGFyZW50X3dpdGhfaWQgKyBcIi5mbG8tc2xpZGVzaG93LWJsb2NrLS10eXBlLWEgLmlzLW1haW4ubm90LXN0aWNreS5mbG8taGVhZGVyLW1vYmlsZSAuZmxvLWhlYWRlcl9fc2VhcmNoLXRyaWdnZXIsIFwiLFxuICAgICAgICAgICAgYmxvY2tfcGFyZW50X3dpdGhfaWQgKyBcIi5mbG8tc2xpZGVzaG93LWJsb2NrLS10eXBlLWEgLmlzLW1haW4ubm90LXN0aWNreS5mbG8taGVhZGVyLW1vYmlsZSAuZmxvLWhlYWRlci1tb2JpbGVfX2xvZ28sIFwiLFxuICAgICAgICAgICAgYmxvY2tfcGFyZW50X3dpdGhfaWQgKyBcIi5mbG8tc2xpZGVzaG93LWJsb2NrLS10eXBlLWEgLmlzLW1haW4ubm90LXN0aWNreS5mbG8taGVhZGVyLW1vYmlsZSAuZmxvLWhlYWRlci1tb2JpbGVfX21lbnUtdHJpZ2dlciwgXCIsXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSAuaXMtbWFpbi5ub3Qtc3RpY2t5LmZsby1oZWFkZXItbW9iaWxlIC5mbG8taGVhZGVyLW1vYmlsZV9fc2VhcmNoLXRyaWdnZXIgXCIsXG4gICAgICAgICAgICBcIntcIixcbiAgICAgICAgICAgICAgXCJjb2xvcjogXCIgKyBlbGVtZW50c19jb2xvciArIFwiIWltcG9ydGFudDtcIixcbiAgICAgICAgICAgICAgXCJib3JkZXItY29sb3I6IFwiICsgZWxlbWVudHNfY29sb3IgKyBcIjtcIixcbiAgICAgICAgICAgIFwifVwiLFxuXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBoZWFkZXIgLmlzLW5vdC1zdGlja3kgLmZsby1oZWFkZXJfX21lbnUtaXRlbS1zZWFyY2g6YmVmb3JlLCBcIixcbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIGhlYWRlciAuaXMtbm90LXN0aWNreSAuZmxvLWhlYWRlcl9fbWVudS10cmlnZ2VyLWl0ZW0gXCIsXG4gICAgICAgICAgICBcInsgXCIsXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZDogXCIgKyBlbGVtZW50c19jb2xvciArIFwiOyBcIixcbiAgICAgICAgICAgIFwifSBcIixcblxuICAgICAgICAgICAgLyogU1RBUlQ6IEhFQURFUiBGRUFUVVJFRCBJVEVNICovXG4gICAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIGhlYWRlciAuaXMtbm90LXN0aWNreSAuZmxvLWhlYWRlcl9fZmVhdHVyZWQtbGluayBcIixcbiAgICAgICAgICAgICAgXCJ7XCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvcjogXCIgKyBlbGVtZW50c19jb2xvciArIFwiIWltcG9ydGFudDtcIixcbiAgICAgICAgICAgICAgXCJ9XCIsXG4gICAgICAgICAgICAvKiBFTkQ6IEhFQURFUiBGRUFUVVJFRCBJVEVNICovXG5cbiAgICAgICAgICAgIC8qIFNUQVJUOiBIRUFERVIgQ09MVU1OUyAqL1xuICAgICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBoZWFkZXIgLmlzLW5vdC1zdGlja3kgLmZsby1oZWFkZXJfX2NvbHVtbi10b3Atd3JhcCBcIixcbiAgICAgICAgICAgICAgXCJ7XCIsXG4gICAgICAgICAgICAgICAgXCJib3JkZXItY29sb3I6IFwiICsgZWxlbWVudHNfY29sb3IgKyBcIiFpbXBvcnRhbnQ7XCIsXG4gICAgICAgICAgICAgIFwifVwiLFxuICAgICAgICAgICAgLyogRU5EOiBIRUFERVIgQ09MVU1OUyAqL1xuXG4gICAgICAgICAgICAvKiBTVEFSVDogSEVBREVSIFNFQVJDSCAqL1xuICAgICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBoZWFkZXIgLmlzLW5vdC1zdGlja3kgLmZsby1oZWFkZXJfX3NlYXJjaC10cmlnZ2VyLCBcIixcbiAgICAgICAgICAgICAgYmxvY2tfcGFyZW50X3dpdGhfaWQgKyBcIi5mbG8tc2xpZGVzaG93LWJsb2NrLS10eXBlLWEgaGVhZGVyIC5pcy1ub3Qtc3RpY2t5IC5mbG8taGVhZGVyX19zZWFyY2gtZm9ybS1pbnB1dCwgXCIsXG4gICAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIGhlYWRlciAuaXMtbm90LXN0aWNreSAuZmxvLWhlYWRlcl9fc2VhcmNoLWZvcm0tc3VibWl0IFwiLFxuICAgICAgICAgICAgICBcIntcIixcbiAgICAgICAgICAgICAgICBcImNvbG9yOiBcIiArIGVsZW1lbnRzX2NvbG9yICsgXCIhaW1wb3J0YW50O1wiLFxuICAgICAgICAgICAgICBcIn1cIixcblxuICAgICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBoZWFkZXIgLmlzLW5vdC1zdGlja3kgLmZsby1oZWFkZXJfX3NlYXJjaC1mb3JtOmJlZm9yZSwgXCIsXG4gICAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIGhlYWRlciAuaXMtbm90LXN0aWNreSAuZmxvLWhlYWRlcl9fc2VhcmNoLWZvcm06YWZ0ZXIgXCIsXG4gICAgICAgICAgICAgIFwie1wiLFxuICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIgKyBlbGVtZW50c19jb2xvciArIFwiIWltcG9ydGFudDtcIixcbiAgICAgICAgICAgICAgXCJ9XCIsXG4gICAgICAgICAgICAvKiBFTkQ6IEhFQURFUiBTRUFSQ0ggKi9cblxuICAgICAgICAgICAgLyogU1RBUlQ6IFNPQ0lBTCBMSU5LUyAqL1xuICAgICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBoZWFkZXIgLmlzLW5vdC1zdGlja3kgLmZsby1oZWFkZXJfX3NvY2lhbC1saW5rcyBhOmJlZm9yZSwgXCIsXG4gICAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIGhlYWRlciAuaXMtbm90LXN0aWNreSAuZmxvLWhlYWRlcl9fc29jaWFsLWxpbmtzLXRyaWdnZXIsXCIsXG4gICAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIGhlYWRlciAuaXMtbm90LXN0aWNreSAuZmxvLWhlYWRlcl9fbGFuZy1zd2l0Y2hcIixcbiAgICAgICAgICAgICAgXCJ7XCIsXG4gICAgICAgICAgICAgICAgXCJjb2xvcjogXCIgKyBlbGVtZW50c19jb2xvciArIFwiIWltcG9ydGFudDtcIixcbiAgICAgICAgICAgICAgXCJ9XCIsXG4gICAgICAgICAgICAvKiBFTkQ6IFNPQ0lBTCBMSU5LUyAqL1xuXG4gICAgICAgICAgLyogRU5EOiBIRUFERVIgLSBBICovXG5cbiAgICAgICAgICAvKiBTVEFSVDogUExBWSBCVVRUT04gKi9cbiAgICAgICAgICAgIGJsb2NrX3NlbGVjdG9yX3dpdGhfaWQgKyBcIiAuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2J1dHRvblwiLFxuICAgICAgICAgICAgXCJ7XCIsXG4gICAgICAgICAgICAgIFwiY29sb3I6IFwiICsgZWxlbWVudHNfY29sb3IgKyBcIjtcIixcbiAgICAgICAgICAgICAgXCJib3JkZXItY29sb3I6IFwiICsgZWxlbWVudHNfY29sb3IgKyBcIjtcIixcbiAgICAgICAgICAgIFwifVwiLFxuICAgICAgICAgIC8qIEVORDogUExBWSBCVVRUT04gKi9cblxuICAgICAgICAgIC8qIFNUQVJUOiBDT1VOVEVSIC0gQSovXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBcIiArIGRvdGIgKyBcIl9fY291bnRlci1jb3VudCwgXCIsXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBcIiArIGRvdGIgKyBcIl9fY291bnRlci1pbmRleFwiLFxuICAgICAgICAgICAgXCJ7IFwiLFxuICAgICAgICAgICAgICBcImNvbG9yOiBcIiArIGVsZW1lbnRzX2NvbG9yICsgXCIhaW1wb3J0YW50OyBcIixcbiAgICAgICAgICAgIFwifSBcIixcblxuICAgICAgICAgICAgYmxvY2tfcGFyZW50X3dpdGhfaWQgKyBcIi5mbG8tc2xpZGVzaG93LWJsb2NrLS10eXBlLWEgXCIgKyBkb3RiICsgXCJfX2NvdW50ZXItc2VwYXJhdG9yXCIsXG4gICAgICAgICAgICBcInsgXCIsXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIgKyBlbGVtZW50c19jb2xvciArIFwiOyBcIixcbiAgICAgICAgICAgIFwifSBcIixcbiAgICAgICAgICAvKiBFTkQ6IENPVU5URVIgLSBBICovXG5cbiAgICAgICAgICAvKiBTVEFSVDogVElUTEUgQVJFQSAtIEEgKi9cbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIFwiICsgZG90YiArIFwiX190aXRsZS1hcmVhLXByZXRpdGxlLCBcIixcbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIFwiICsgZG90YiArIFwiX190aXRsZS1hcmVhLXRpdGxlXCIsXG4gICAgICAgICAgICBcInsgXCIsXG4gICAgICAgICAgICAgIFwiY29sb3I6IFwiICsgZWxlbWVudHNfY29sb3IgKyBcIiFpbXBvcnRhbnQ7IFwiLFxuICAgICAgICAgICAgXCJ9IFwiLFxuXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYSBcIiArIGRvdGIgKyBcIl9fdGl0bGUtYXJlYS1wcmV0aXRsZTpiZWZvcmUgXCIsXG4gICAgICAgICAgICBcInsgXCIsXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIgKyBlbGVtZW50c19jb2xvciArIFwiOyBcIixcbiAgICAgICAgICAgIFwifSBcIixcbiAgICAgICAgICAvKiBFTkQ6IFRJVExFIEFSRUEgLSBBICovXG5cbiAgICAgICAgICAvKiBTVEFSVDogQVJST1cgTkVYVCAtIEEgKi9cbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1hIFwiICsgZG90YiArIFwiX19hcnJvdy1uZXh0IFwiLFxuICAgICAgICAgICAgXCJ7IFwiLFxuICAgICAgICAgICAgICBcImNvbG9yOiBcIiArIGVsZW1lbnRzX2NvbG9yICsgXCIhaW1wb3J0YW50OyBcIixcbiAgICAgICAgICAgIFwifSBcIixcbiAgICAgICAgICAvKiBFTkQ6IEFSUk9XIE5FWFQgLSBBICovXG5cbiAgICAgICAgICAvKiBTVEFSVDogRkVBVFVSRUQgTElOSyAtIEEsIEMgKi9cbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIgXCIgKyBkb3RiICsgXCJfX2ZlYXR1cmVkLWxpbmstcHJldGl0bGUsIFwiLFxuICAgICAgICAgICAgYmxvY2tfcGFyZW50X3dpdGhfaWQgKyBcIiBcIiArIGRvdGIgKyBcIl9fZmVhdHVyZWQtbGluay10aXRsZVwiLFxuICAgICAgICAgICAgXCJ7IFwiLFxuICAgICAgICAgICAgICBcImNvbG9yOiBcIiArIGVsZW1lbnRzX2NvbG9yICsgXCIhaW1wb3J0YW50OyBcIixcbiAgICAgICAgICAgIFwifSBcIixcblxuICAgICAgICAgICAgYmxvY2tfcGFyZW50X3dpdGhfaWQgKyBcIiBcIiArIGRvdGIgKyBcIl9fZmVhdHVyZWQtbGluay1kaXZpZGVyXCIsXG4gICAgICAgICAgICBcInsgXCIsXG4gICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1jb2xvcjogXCIgKyBlbGVtZW50c19jb2xvciArIFwiOyBcIixcbiAgICAgICAgICAgIFwifSBcIixcbiAgICAgICAgICAvKiBFTkQ6IEZFQVRVUkVEIExJTksgLSBBLCBDICovXG5cbiAgICAgICAgICAvKiBTVEFSVDogVE9QIEFSRUEgLSBDICovXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYyBcIiArIGRvdGIgKyBcIl9fdG9wLWFyZWEtbG9nbyAuZmxvLWhlYWRlcl9fbG9nbywgXCIsXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYyBcIiArIGRvdGIgKyBcIl9fdG9wLWFyZWEtc29jaWFsLWxpbmtzIGE6YmVmb3JlXCIsXG4gICAgICAgICAgICBcInsgXCIsXG4gICAgICAgICAgICAgIFwiY29sb3I6IFwiICsgZWxlbWVudHNfY29sb3IgKyBcIiFpbXBvcnRhbnQ7XCIsXG4gICAgICAgICAgICBcIn0gXCIsXG4gICAgICAgICAgLyogRU5EOiBUT1AgQVJFQSAtIEMgKi9cblxuICAgICAgICAgIC8qIFNUQVJUOiBTTElERSBTRUxFQ1RPUiAtIEMgKi9cbiAgICAgICAgICAgIGJsb2NrX3BhcmVudF93aXRoX2lkICsgXCIuZmxvLXNsaWRlc2hvdy1ibG9jay0tdHlwZS1jIFwiICsgZG90YiArIFwiX19zbGlkZS1zZWxlY3Rvci1wcmV0aXRsZTpiZWZvcmVcIixcbiAgICAgICAgICAgIFwieyBcIixcbiAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLWNvbG9yOiBcIiArIGVsZW1lbnRzX2NvbG9yICsgXCI7IFwiLFxuICAgICAgICAgICAgXCJ9IFwiLFxuXG4gICAgICAgICAgICBibG9ja19wYXJlbnRfd2l0aF9pZCArIFwiLmZsby1zbGlkZXNob3ctYmxvY2stLXR5cGUtYyBcIiArIGRvdGIgKyBcIl9fc2xpZGUtc2VsZWN0b3ItcHJldGl0bGVcIixcbiAgICAgICAgICAgIFwieyBcIixcbiAgICAgICAgICAgICAgXCJjb2xvcjogXCIgKyBlbGVtZW50c19jb2xvciArIFwiOyBcIixcbiAgICAgICAgICAgIFwifSBcIlxuICAgICAgICAgIC8qIEVORDogU0xJREUgU0VMRUNUT1IgLSBDICovXG5cbiAgICAgICAgXS5qb2luKFwiXFxuXCIpKTtcblxuICAgICAgICBjc3MgPSBjc3Muam9pbihcIlxcblwiKTtcblxuICAgICAgICBpZiAoJChcInN0eWxlLmZsby1zbGlkZXNob3dfX3NsaWRlcy0tXCIgKyBibG9ja19pZCkubGVuZ3RoKSB7XG4gICAgICAgICAgJChcInN0eWxlLmZsby1zbGlkZXNob3dfX3NsaWRlcy0tXCIgKyBibG9ja19pZCkuaHRtbChjc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoXCJoZWFkXCIpLmFwcGVuZChcbiAgICAgICAgICAgICQoXCIgPHN0eWxlIGNsYXNzPSdmbG8tc2xpZGVzaG93X19zbGlkZXMtLVwiICsgYmxvY2tfaWQgKyBcIiAnPiBcIikuaHRtbChjc3MpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICB9KVxuICAgIC8qIEVORDogQ0hBTkdFIENPTE9SIEJBU0VEIE9OIFNMSURFIENPTE9SICovXG5cbiAgICAvKiBTVEFSVDogVklERU8gRU1CRUQgKi9cbiAgICAgIC5vbihcImluaXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyICRzbGlkZXMgPSAkKHRoaXMpO1xuICAgICAgICAkZWwuZmluZChcIi5cIitiK1wiX19zbGlkZS0taW1hZ2VfYW5kX3ZpZGVvX2VtYmVkXCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgYWN0aXZlX3NsaWRlX18kID0gJCh0aGlzKTtcbiAgICAgICAgICB2YXIgdmlkZW9fZW1iZWRfaG9zdCA9IGRvdGJsb2NrX3BhcmVudDtcbiAgICAgICAgICB2YXIgdmlkZW9fYnV0dG9uID0gYWN0aXZlX3NsaWRlX18kLmZpbmQoXCIuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2J1dHRvblwiKTtcbiAgICAgICAgICB2YXIgdmlkZW9fY29udGFpbmVyID0gYWN0aXZlX3NsaWRlX18kLmZpbmQoXCIuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2NvbnRhaW5lclwiKTtcbiAgICAgICAgICB2YXIgZW1iZWRfY29kZSA9IGFjdGl2ZV9zbGlkZV9fJC5hdHRyKFwiZGF0YS1lbWJlZC1jb2RlXCIpO1xuXG4gICAgICAgICAgdmlkZW9fYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghdmlkZW9fZW1iZWRfaG9zdC5oYXNDbGFzcyhcInZpZGVvLWlzLXBsYXlpbmdcIikpIHtcbiAgICAgICAgICAgICAgdmlkZW9fY29udGFpbmVyLmh0bWwodW5lc2NhcGUoZW1iZWRfY29kZSkpO1xuICAgICAgICAgICAgICB2aWRlb19lbWJlZF9ob3N0LmFkZENsYXNzKFwidmlkZW8taXMtcGxheWluZ1wiKTtcblxuICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKFwic2xpY2tTZXRPcHRpb25cIiwgXCJhdXRvcGxheVwiLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZpZGVvX2VtYmVkX2hvc3QuaGFzQ2xhc3MoXCJ2aWRlby1pcy1wbGF5aW5nXCIpKSB7XG4gICAgICAgICAgICAgIHZpZGVvX2NvbnRhaW5lci5odG1sKFwiXCIpO1xuICAgICAgICAgICAgICB2aWRlb19lbWJlZF9ob3N0LnJlbW92ZUNsYXNzKFwidmlkZW8taXMtcGxheWluZ1wiKTtcblxuICAgICAgICAgICAgICB2YXIgYXV0b3BsYXkgPSAkc2xpZGVzLmF0dHIoXCJkYXRhLWF1dG9wbGF5XCIpID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgICAkc2xpZGVzLnNsaWNrKFwic2xpY2tTZXRPcHRpb25cIiwgXCJhdXRvcGxheVwiLCBhdXRvcGxheSAsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgICAub24oXCJiZWZvcmVDaGFuZ2VcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGFjdGl2ZV9zbGlkZV9fJCA9ICQodGhpcykuZmluZChcIi5zbGljay1jdXJyZW50XCIpO1xuICAgICAgICB2YXIgdmlkZW9fZW1iZWRfaG9zdCA9IGRvdGJsb2NrX3BhcmVudDtcblxuICAgICAgICAvKiBTVEFSVDogVklERU8gRU1CRUQgQ0xPU0UgT04gU0xJREUgQ0hBTkdFICovXG4gICAgICAgICAgaWYgKHZpZGVvX2VtYmVkX2hvc3QuaGFzQ2xhc3MoXCJ2aWRlby1pcy1wbGF5aW5nXCIpKSB7XG4gICAgICAgICAgICBhY3RpdmVfc2xpZGVfXyQuZmluZChcIi5mbG8taGVyby12aWRlby1lbWJlZF9fYnV0dG9uXCIpLmNsaWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICAvKiBFTkQ6IFZJREVPIEVNQkVEIENMT1NFIE9OIFNMSURFIENIQU5HRSAqL1xuXG4gICAgICB9KVxuICAgIC8qIEVORDogVklERU8gRU1CRUQgKi9cblxuICAgIC8qIFNUQVJUOiBDT1VOVCAtIFNFVCBDT1VOVCAqL1xuICAgICAgLm9uKFwiaW5pdFwiLCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgY291bnQgPSAkdGhpcy5maW5kKFwiLnNsaWNrLXNsaWRlOm5vdCguc2xpY2stY2xvbmVkKVwiKS5sZW5ndGg7XG4gICAgICAgIGNvdW50ID0gcGFkKGNvdW50LCAyKTtcbiAgICAgICAgZG90YmxvY2tfcGFyZW50LmZpbmQoZG90YiArIFwiX19jb3VudGVyLWNvdW50XCIpLmh0bWwoXG4gICAgICAgICAgY291bnRcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgLyogRU5EOiBDT1VOVCAtIFNFVCBDT1VOVCAqL1xuXG4gICAgLyogU1RBUlQ6IENPVU5UIC0gU0VUIElOREVYICovXG4gICAgICAub24oXCJpbml0IGFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KCR0aGlzLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKS5hdHRyKFwiZGF0YS1zbGljay1pbmRleFwiKSkrMTtcbiAgICAgICAgaW5kZXggPSBwYWQoaW5kZXgsIDIpO1xuXG4gICAgICAgIGRvdGJsb2NrX3BhcmVudC5maW5kKGRvdGIgKyBcIl9fY291bnRlci1pbmRleFwiKS5jaGFuZ2VUZXh0VUkoXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgXCJjb3VudGVyXCJcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgLyogRU5EOiBDT1VOVCAtIFNFVCBJTkRFWCAqL1xuXG4gICAgLyogU1RBUlQ6IElOSVRJQUxJWkFUSU9OICovXG4gICAgICAuc2xpY2soKVxuICAgIC8qIEVORDogSU5JVElBTElaQVRJT04gKi9cbiAgO1xuXG4gIC8qIFNUQVJUOiBORVhUIEFSUk9XIEFDVElPTiAqL1xuICAgIGJsb2NrLmZpbmQoZG90YiArIFwiX19hcnJvdy1uZXh0XCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAkZWwuc2xpY2soXCJzbGlja05leHRcIik7XG4gICAgfSk7XG4gIC8qIEVORDogTkVYVCBBUlJPVyBBQ1RJT04gKi9cbn1cbiIsInZhciBzcGxhc2hfX3Nob3cgPSBmdW5jdGlvbigpIHtcbiAgbGV0IHNwbGFzaFNjcmVlbiA9ICQoXCIuZmxvLXNwbGFzaFwiKTtcbiAgRm91bmRhdGlvbi5Nb3Rpb24uYW5pbWF0ZUluKHNwbGFzaFNjcmVlbiwgXCJmYWRlLWluXCIpO1xufVxudmFyIHNwbGFzaF9faGlkZSA9IGZ1bmN0aW9uKCkge1xuICBsZXQgc3BsYXNoU2NyZWVuID0gJChcIi5mbG8tc3BsYXNoXCIpO1xuICBGb3VuZGF0aW9uLk1vdGlvbi5hbmltYXRlT3V0KHNwbGFzaFNjcmVlbiwgXCJmYWRlLW91dFwiKTtcbn1cblxud2luZG93Lm9ubG9hZCA9ICgpID0+IHtcbiAgbGV0IHNwbGFzaFNjcmVlbiA9ICQoXCIuZmxvLXNwbGFzaFwiKTtcbiAgc3BsYXNoU2NyZWVuXG4gIC5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTtcbiAgc2V0VGltZW91dCggKCkgPT4ge1xuICAgIHNwbGFzaF9faGlkZTtcbiAgICBzcGxhc2hTY3JlZW4uaGlkZSgpO1xuICB9LCA0MDApO1xufTtcbiIsIiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCl7XG5cbiAgLy8gVE9ETzogc2tpcF9saXN0IGZvciBhbnkgYmxvY2sgdGhhdCBjb250YWlucyBmbG8taGVhZGVyLS0qXG5cblxuICAvKiBTVEFSVDogU0lERUJBUiBXT1JLUyAqL1xuICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjcgJiYgJChcIi5mbG9fc2lkZWJhclwiKS5sZW5ndGgpIHtcbiAgICB2YXIgYWRhcHRpdmVfc2lkZWJhciA9ICQoXCJib2R5XCIpLmhhc0NsYXNzKFwiYm9keV9oYXNfc2lkZWJhclwiKTtcbiAgICB2YXIgc2lkZWJhcl93b3Jrc19jc3MgPSBbXTtcbiAgICB2YXIgcGFnZV93cmFwID0gJChcIi5mbG9fcGFnZV93cmFwXCIpO1xuICAgIHZhciBzaWRlYmFyID0gJChcIi5mbG9fc2lkZWJhclwiKTtcbiAgICB2YXIgc2lkZWJhcl9oZWlnaHQgPSAwO1xuICAgIHZhciBibG9ja3MgPSAkKFwiLmZsby1ibG9jazpub3QoLmZsby1uby1yZXNpemUpXCIpO1xuICAgIHZhciBhbnlfZm9vdGVyID0gXCJkaXZbY2xhc3NePSdmbG8tZm9vdGVyJ10sZGl2W2NsYXNzKj0nIGZsby1mb290ZXInXVwiO1xuICAgIGZ1bmN0aW9uIGFwcHJveChudW0pIHtcbiAgICAgIHJldHVybiArKE1hdGgucm91bmQobnVtICsgXCJlKzJcIikgICsgXCJlLTJcIik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldE5vZGVzVGhhdENvbnRhaW4oJHRoaXMsIHRleHQpIHtcbiAgICAgIHZhciB0ZXh0Tm9kZXMgPSAkdGhpcy5maW5kKFwiOm5vdChpZnJhbWUsIHNjcmlwdCwgc3R5bGUpXCIpXG4gICAgICAgIC5jb250ZW50cygpLmZpbHRlcihcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGVUeXBlID09IDNcbiAgICAgICAgICAgICAgJiYgdGhpcy50ZXh0Q29udGVudC5pbmRleE9mKHRleHQpID4gLTEgJiYgJCh0aGlzKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAwO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRleHROb2Rlcy5wYXJlbnQoKTtcbiAgICB9XG5cbiAgICAvLyBzcGVjaWZ5IHRoZSBibG9ja3Mgb24gdG9wIHRoYXQgZG8gbm90IG5lZWQgdG8gYmUgYWZmZWN0ZWQgYnkgdGhlIHNpZGViYXIgKGhlYWRlcnMgYW5kIHNsaWRlc2hvd3MgaW4gbW9zdCBjYXNlcylcbiAgICB2YXIgc2tpcF9saXN0ID0gJy5mbG8tYmxvY2stc2xpZGVzaG93LTEsIC5mbG8tYmxvY2stY2F0ZWdvcnktc3dpdGNoZXItMSc7XG5cbiAgICAvKiBTVEFSVDogU0lERUJBUiAqL1xuICAgIC8vIHZhciB0b3AgPSAwO1xuICAgIGlmIChibG9ja3MuZmlyc3QoKS5maW5kKCcuZmxvLWhlYWRlcicpLmxlbmd0aCAmJiBibG9ja3MuZmlyc3QoKS5uZXh0KCkuZmluZChza2lwX2xpc3QpLmxlbmd0aCkge1xuICAgICAgLy8gZmlyc3QgdHdvIGJsb2NrcyA9IGhlYWRlciArIHNraXBfbGlzdFxuICAgICAgYmxvY2tzLmZpcnN0KCkuYWRkQ2xhc3MoJ3NraXBwZWQnKTtcbiAgICAgIGJsb2Nrcy5maXJzdCgpLm5leHQoKS5hZGRDbGFzcygnc2tpcHBlZCcpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBibG9ja3MuZmlyc3QoKS5maW5kKCcuZmxvLWhlYWRlcicpLmxlbmd0aCAmJiBibG9ja3MuZmlyc3QoKS5maW5kKHNraXBfbGlzdCkubGVuZ3RoIHx8XG4gICAgICBibG9ja3MuZmlyc3QoKS5maW5kKHNraXBfbGlzdCkubGVuZ3RoIHx8XG4gICAgICBibG9ja3MuZmlyc3QoKS5maW5kKCcuZmxvLWhlYWRlcicpLmxlbmd0aFxuICAgICl7XG4gICAgICAvLyBmaXJzdCBibG9jayA9IHNraXBfbGlzdCB3aXRoIGhlYWRlciBPUiBmaXJzdCBibG9jayA9IHNraXBfbGlzdCB3aXRoIG5vIGhlYWRlciBPUiBmaXJzdCBibG9jayA9IGhlYWRlciBvbmx5XG4gICAgICBibG9ja3MuZmlyc3QoKS5hZGRDbGFzcygnc2tpcHBlZCcpO1xuICAgIH1cblxuXG4gICAgLyogRU5EOiBTSURFQkFSICovXG5cbiAgICAvKiBTVEFSVDogQkxPQ0tTICovXG4gICAgdmFyIHNraXBwZWRfYmxvY2tfaGVpZ2h0ID0gMDtcblxuICAgIC8vIGFwcGVuZCBzaWRlYmFyIHRvIGZpcnN0IHRyYW5zZm9ybWVkIGJsb2NrXG4gICAgYmxvY2tzLm5vdCgnLnNraXBwZWQnKS5maXJzdCgpLmFkZENsYXNzKCdjb250YWluc19zaWRlYmFyJyk7XG4gICAgdmFyIGJsb2NrX2NvbnRhaW5zX3NpZGViYXIgPSAkKCcuY29udGFpbnNfc2lkZWJhcicpO1xuICAgIGJsb2NrX2NvbnRhaW5zX3NpZGViYXIuYXBwZW5kKHNpZGViYXIpO1xuICAgIHZhciBibG9ja3Nfb25fdGhlX3NpZGVfaGVpZ2h0ID0gMDtcbiAgICB2YXIgc2lkZWJhcldpZHRoSW5QZXJjZW50ID0gc2lkZWJhci53aWR0aCgpICogMTAwIC8gYmxvY2tfY29udGFpbnNfc2lkZWJhci53aWR0aCgpO1xuXG4gICAgc2lkZWJhci5jaGlsZHJlbigpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHNpZGViYXJfaGVpZ2h0ICs9ICQodGhpcykub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgfSk7XG4gICAgc2lkZWJhcl9oZWlnaHQgKz0gcGFyc2VJbnQoYmxvY2tfY29udGFpbnNfc2lkZWJhci5jc3MoXCJwYWRkaW5nLXRvcFwiKSwgMTApICogMjtcblxuICAgIHZhciBzaWRlYmFyTWFyZ2luSW5QZXJjZW50ID0gMDtcbiAgICBpZiAoIXNpZGViYXIuaGFzQ2xhc3MoJ2Zsb19zaWRlYmFyLS1vbi1sZWZ0Jykpe1xuICAgICAgc2lkZWJhck1hcmdpbkluUGVyY2VudCA9IHBhcnNlSW50KHNpZGViYXIuY3NzKFwibWFyZ2luLWxlZnRcIikpICogMTAwIC8gYmxvY2tfY29udGFpbnNfc2lkZWJhci53aWR0aCgpO1xuICAgICAgdmFyIHJpZ2h0aSA9IHBhcnNlSW50KGJsb2NrX2NvbnRhaW5zX3NpZGViYXIuY3NzKCdwYWRkaW5nLXJpZ2h0JykpO1xuICAgIH1lbHNle1xuICAgICAgc2lkZWJhck1hcmdpbkluUGVyY2VudCA9IHBhcnNlSW50KHNpZGViYXIuY3NzKFwibWFyZ2luLXJpZ2h0XCIpKSAqIDEwMCAvIGJsb2NrX2NvbnRhaW5zX3NpZGViYXIud2lkdGgoKTtcbiAgICAgIHZhciBsZWZ0aSA9IHBhcnNlSW50KGJsb2NrX2NvbnRhaW5zX3NpZGViYXIuY3NzKCdwYWRkaW5nLWxlZnQnKSk7XG4gICAgfVxuICAgIHZhciB0b3BwaSA9IHBhcnNlSW50KGJsb2NrX2NvbnRhaW5zX3NpZGViYXIuY3NzKCdwYWRkaW5nLXRvcCcpKTtcblxuICAgIHNpZGViYXJfd29ya3NfY3NzLnB1c2goW1xuICAgICAgXCIuZmxvX3NpZGViYXIge1wiLFxuICAgICAgXCJ0b3A6IFwiICsgdG9wcGkgKyBcInB4IWltcG9ydGFudDtcIixcbiAgICAgIHNpZGViYXIuaGFzQ2xhc3MoXCJmbG9fc2lkZWJhci0tb24tbGVmdFwiKSA/IFwibGVmdDogXCIgKyBsZWZ0aSArXCJweDtcIiA6IFwicmlnaHQ6IFwiICsgcmlnaHRpICsgXCJweDtcIixcbiAgICAgIFwifVwiXG4gICAgXS5qb2luKFwiXFxuXCIpKTtcblxuICAgIHZhciBob3dNdWNoVHJhbnNmb3JtID0gKDEwMCAtIHNpZGViYXJXaWR0aEluUGVyY2VudCAtIHNpZGViYXJNYXJnaW5JblBlcmNlbnQpIC8gMTAwO1xuICAgIHZhciB6b29tRmFjdG9yID0gYmxvY2tfY29udGFpbnNfc2lkZWJhci5maW5kKCcuZmxvLWJsb2NrX19jb250YWluZXInKS53aWR0aCgpIC8gKGJsb2NrX2NvbnRhaW5zX3NpZGViYXIuZmluZCgnLmZsby1ibG9ja19fY29udGFpbmVyJykud2lkdGgoKSAqIGhvd011Y2hUcmFuc2Zvcm0pO1xuXG4gICAgYmxvY2tzLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgIHZhciBibG9jayA9ICQodGhpcyk7XG5cbiAgICAgIGlmICghYmxvY2suaGFzQ2xhc3MoJ3NraXBwZWQnKSkge1xuXG4gICAgICAgIHZhciBzaHJpbmsgPSB0cnVlO1xuICAgICAgICBpZiAoYWRhcHRpdmVfc2lkZWJhciAmJiAoYmxvY2tzX29uX3RoZV9zaWRlX2hlaWdodCA+IHNpZGViYXJfaGVpZ2h0KSkge1xuICAgICAgICAgIHNocmluayA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNocmluayl7XG4gICAgICAgICAgYmxvY2suYWRkQ2xhc3MoJ3Nocmlua2VkJyk7XG4gICAgICAgICAgaWYoISQoJ2JvZHknKS5oYXNDbGFzcygnc2luZ2xlLXBvc3QnKSl7XG4gICAgICAgICAgICB2YXIgdmVydGljYWxfY29ycmVjdGlvbiA9IGJsb2NrLmZpbmQoJy5mbG8tYmxvY2tfX2NvbnRhaW5lcicpLm91dGVySGVpZ2h0KCkgLSAoYmxvY2suZmluZCgnLmZsby1ibG9ja19fY29udGFpbmVyJykub3V0ZXJIZWlnaHQoKSAqIGhvd011Y2hUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKS5maW5kKCcuZmxvLWJsb2NrX19jb250YWluZXInKTtcbiAgICAgICAgICAgIHZhciBpZCA9ICR0aGlzLnBhcmVudCgnLmZsby1ibG9jaycpLmF0dHIoJ2RhdGEtaWQnKTtcbiAgICAgICAgICAgIHZhciB4ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmxvLWJsb2NrLS0nICsgaWQpO1xuICAgICAgICAgICAgeCA9IHhbMF0uZmlyc3RFbGVtZW50Q2hpbGQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgdmFyIGFycmF5ID0geC5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAkLmVhY2goYXJyYXksIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHZhciBtYXRjaCA9IGdldE5vZGVzVGhhdENvbnRhaW4oJHRoaXMsIHRoaXMpO1xuICAgICAgICAgICAgICAkLmVhY2gobWF0Y2gsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAwICYmICQodGhpcykudGV4dCgpICE9ICcnXG4gICAgICAgICAgICAgICAgICB8fCAoJCh0aGlzKS5jaGlsZHJlbigpLmxlbmd0aCA9PSAxICYmICQodGhpcykudGV4dCgpICE9ICcnICYmICQodGhpcykuZmluZCgnLmZsby1pY29uLWFycm93LWxlZnQsIC5mbG8taWNvbi1hcnJvdy1yaWdodCcpLmxlbmd0aCA9PSAxKVxuICAgICAgICAgICAgICAgICl7XG4gICAgICAgICAgICAgICAgICAkKHRoaXMpLm5vdCgnLmZvbnQtcmVzaXplZCcpLmNzcygnZm9udC1zaXplJywgKHBhcnNlSW50KCQodGhpcykuY3NzKCdmb250LXNpemUnKSkgKiB6b29tRmFjdG9yKSAvIHBhcnNlSW50KCQoJ2h0bWwnKS5jc3MoJ2ZvbnQtc2l6ZScpKSArICdyZW0nKS5hZGRDbGFzcygnZm9udC1yZXNpemVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gdXNlIHRyYW5zZm9ybSBpbnN0ZWFkIG9mIHdpZHRoIHRvIHByZXNlcnZlIGNvbnRlbnRzIHdpZHRoL2hlaWdodCByYXRpb1xuICAgICAgICAgICAgLy8gY29tcGFyZSBpbml0aWFsIGhlaWdodCBhbmQgdHJhbnNmb3JtZWQgaGVpZ2h0IGFuZCBhc3NpZ24gdGhlIG51bWJlciBvZiBwaXhlbHMgdGhlIGJsb2NrIGhhcyBsb3N0IGluIGhlaWdodCBhcyBuZWdhdGl2ZSBtYXJnaW4tYm90dG9tXG4gICAgICAgICAgICBzaWRlYmFyX3dvcmtzX2Nzcy5wdXNoKFtcbiAgICAgICAgICAgICAgXCIuZmxvLWJsb2NrLS1cIitibG9jay5kYXRhKFwiaWRcIikrXCIgLmZsby1ibG9ja19fY29udGFpbmVyIHtcIixcbiAgICAgICAgICAgICAgICBcInRyYW5zaXRpb246IG5vbmUhaW1wb3J0YW50O1wiLFxuICAgICAgICAgICAgICAgIFwidHJhbnNmb3JtOiBzY2FsZShcIiArIGFwcHJveChob3dNdWNoVHJhbnNmb3JtKSArIFwiKSFpbXBvcnRhbnQ7XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tOiAtXCIgKyBhcHByb3godmVydGljYWxfY29ycmVjdGlvbikgKyBcInB4IWltcG9ydGFudDtcIixcbiAgICAgICAgICAgICAgICBzaWRlYmFyLmhhc0NsYXNzKFwiZmxvX3NpZGViYXItLW9uLWxlZnRcIikgPyBcInRyYW5zZm9ybS1vcmlnaW46IHRvcCByaWdodCAhaW1wb3J0YW50O1wiIDogXCJ0cmFuc2Zvcm0tb3JpZ2luOiB0b3AgbGVmdCAhaW1wb3J0YW50O1wiLFxuICAgICAgICAgICAgICAgIHNpZGViYXIuaGFzQ2xhc3MoXCJmbG9fc2lkZWJhci0tb24tbGVmdFwiKSA/IFwibWFyZ2luLWxlZnQ6IGF1dG87XCIgOiBcIlwiLFxuICAgICAgICAgICAgICBcIn1cIlxuICAgICAgICAgICAgXS5qb2luKFwiXFxuXCIpKTtcblxuICAgICAgICAgICAgdmFyIGJsb2NrX2hlaWdodF90b19hZGRfdXAgPSBhcHByb3goICggYmxvY2suZmluZCgnLmZsby1ibG9ja19fY29udGFpbmVyJykub3V0ZXJIZWlnaHQoKSAqIGhvd011Y2hUcmFuc2Zvcm0pICsgcGFyc2VGbG9hdChibG9jay5jc3MoJ3BhZGRpbmctdG9wJykpICsgcGFyc2VGbG9hdChibG9jay5jc3MoJ3BhZGRpbmctYm90dG9tJykpKTtcbiAgICAgICAgICAgIGJsb2Nrc19vbl90aGVfc2lkZV9oZWlnaHQgKz0gYmxvY2tfaGVpZ2h0X3RvX2FkZF91cDtcblxuICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIHNpZGViYXJfd29ya3NfY3NzLnB1c2goW1xuICAgICAgICAgICAgICBcIi5mbG8tYmxvY2stLVwiK2Jsb2NrLmRhdGEoXCJpZFwiKStcIiAuZmxvLWJsb2NrX19jb250YWluZXIge1wiLFxuICAgICAgICAgICAgICBcInRyYW5zaXRpb246IG5vbmUhaW1wb3J0YW50O1wiLFxuICAgICAgICAgICAgICBcIndpZHRoOiBcIiArIGFwcHJveCgxMDAgLSBzaWRlYmFyV2lkdGhJblBlcmNlbnQgLSBzaWRlYmFyTWFyZ2luSW5QZXJjZW50KSArIFwiJTtcIixcbiAgICAgICAgICAgICAgc2lkZWJhci5oYXNDbGFzcyhcImZsb19zaWRlYmFyLS1vbi1sZWZ0XCIpID8gXCJtYXJnaW4tcmlnaHQ6IDA7XCIgOiBcIm1hcmdpbi1sZWZ0OiAwO1wiLFxuICAgICAgICAgICAgICBcIn1cIlxuICAgICAgICAgICAgXS5qb2luKFwiXFxuXCIpKTtcbiAgICAgICAgICAgIGJsb2Nrc19vbl90aGVfc2lkZV9oZWlnaHQgKz0gYXBwcm94KGJsb2NrLm91dGVySGVpZ2h0KCkpO1xuXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2V7XG4gICAgICAgIHNraXBwZWRfYmxvY2tfaGVpZ2h0ICs9IGJsb2NrLm91dGVySGVpZ2h0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLyogRU5EOiBCTE9DS1MgKi9cblxuICAgIC8qIFNUQVJUOiBQQUdFIFdSQVAgKi9cbiAgICB2YXIgZm9vdGVyX2hlaWdodCA9IDA7XG4gICAgaWYgKCAkKGFueV9mb290ZXIpLmZpcnN0KCkubGVuZ3RoKSB7XG4gICAgICBmb290ZXJfaGVpZ2h0ID0gJChhbnlfZm9vdGVyKS5maXJzdCgpLm91dGVySGVpZ2h0KCk7XG4gICAgfVxuICAgIFxuICAgIGlmIChzaWRlYmFyX2hlaWdodCA+IGJsb2Nrc19vbl90aGVfc2lkZV9oZWlnaHQpIHtcbiAgICAgIHZhciBwYWdlX3dyYXBfaGVpZ2h0ID0gc2tpcHBlZF9ibG9ja19oZWlnaHQgKyBzaWRlYmFyX2hlaWdodCArIGZvb3Rlcl9oZWlnaHQ7XG4gICAgICBwYWdlX3dyYXAuY3NzKHtcbiAgICAgICAgXCJoZWlnaHRcIiA6IHBhZ2Vfd3JhcF9oZWlnaHRcbiAgICAgIH0pO1xuXG4gICAgICAkKGFueV9mb290ZXIpLmZpcnN0KCkuY3NzKHtcbiAgICAgICAgXCJwb3NpdGlvblwiOiBcImFic29sdXRlXCIsXG4gICAgICAgIFwiYm90dG9tXCI6IDAsXG4gICAgICAgIFwibGVmdFwiOiAwLFxuICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiXG4gICAgICB9KVxuICAgIH1cbiAgICAvKiBFTkQ6IFBBR0UgV1JBUCAqL1xuICAgIC8qIFNUQVJUOiBBUFBFTkQgQ1NTICovXG4gICAgJChcImhlYWRcIikuYXBwZW5kKFtcbiAgICAgIFwiPHN0eWxlIGNsYXNzPSdzaWRlYmFyLXdvcmtzLWNzcyc+XCIsXG4gICAgICBcIkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1wiLFxuICAgICAgc2lkZWJhcl93b3Jrc19jc3Muam9pbihcIlxcblwiKSxcbiAgICAgIFwifVwiLFxuICAgICAgXCI8L3N0eWxlPlwiXG4gICAgXS5qb2luKFwiXFxuXCIpKTtcbiAgICBcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNpZGViYXIuY3NzKCdvcGFjaXR5JywgMSk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gYXR0ZW1wdCB0byByZWluaXQgbWFzb25yeSBhbmQgYWxsIHRoYXQgc2hpdFxuICAgICQod2luZG93KS50cmlnZ2VyKCdyZXNpemUnKTtcblxuICAgICQoJy5ib2R5X2hhc19zaWRlYmFyJykuYWRkQ2xhc3MoJ3NpZGViYXItcmVhZHknKTtcblxuICAgIC8qIEVORDogQVBQRU5EIENTUyAqL1xuICB9XG4gIC8qIEVORDogU0lERUJBUiBXT1JLUyAqL1xufSk7XG4iLCIkKGZ1bmN0aW9uKCl7XG4gICQoXCIuZmxvLWNvcmUtc3R5bGVcIikuZWFjaChmdW5jdGlvbigpe1xuICAgIHZhciB0ZW1wbGF0ZSA9ICQodGhpcyk7XG4gICAgdmFyIHN0eWxlID0gdGVtcGxhdGUuaHRtbCgpO1xuICAgICQoXCJoZWFkXCIpLmFwcGVuZChzdHlsZSk7XG4gICAgdGVtcGxhdGUucmVtb3ZlKCk7XG4gIH0pO1xuXHRsZXQgZmFkZUluU3R5bGVUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG5cdGZhZGVJblN0eWxlVGFnLmNsYXNzTGlzdCA9IFwiZmxvLWNvcmUtZmFkZS1pblwiO1xuXHRmYWRlSW5TdHlsZVRhZy5pbm5lckhUTUwgPSBgXG4gICAgYm9keSAqIHtcbiAgICAgIG91dGxpbmU6IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgIH0gXG4gICAgYm9keSB7XG4gICAgICBvcGFjaXR5OiAxIWltcG9ydGFudDtcbiAgICB9YDtcbiAgJChmYWRlSW5TdHlsZVRhZykuYXBwZW5kVG8oIFwiaGVhZFwiICk7XG59KTtcbiJdfQ==
