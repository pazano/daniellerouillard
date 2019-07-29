{{--
  REQUIRES VARIABLES:
  - REQ VAR - $b
  - REQ VAR - $b__uniq_for_css
  - REQ VAR - $slideshow_id
  - REQ VAR - $image_type - can be "img" or "bgi"
  - REQ VAR - $height_type - can be "full" or "specific"
  - REQ VAR - $height_px

  SECTIONS:
  - SECTION - slide_content - here you can add custom elements to each slide's content.
  - SECTION - slick_options - here you can add extra options to the slick initialization function.
    Example:
      @section("slick_options")
        "arrows": "false",
        "cssEase": "ease-in-out",
        "speed": "400",
      @overwrite
  - SECTION - elements_to_change_color_to - here you specify which elements inside slides should change their colors (e.g. color, border-color etc.)
    Example:
      @section("elements_to_change_color_to")
        block + "__footer-middle-area:before,",
        block + "__footer-middle-area:after",
        "{ ",
          "background-color: " + hex2rgba(elements_color, 0.2) + ";",
        "} ",

        block + " .flo-block-delimiter-1__delimiter-line",
        "{ ",
          "background-color: " + hex2rgba(elements_color, 0.2) + ";",
        "} ",
      @overwrite

    Note: Don't forget to add a trailing comma to the list!
    Note: RGBA - for a rgba value of elements color use the hex2rgba function.
      Example:
        "border-color: " + hex2rgba(elements_color, 0.3) + "!important;",

  HTML DATA ATTRIBUTES:
  Each slide has some attributes with slide properties. You can get them with the jQuery .attr() function.
  - DATA ATTR - data-elements-color
  - DATA ATTR - data-title
  - DATA ATTR - data-subtitle
  - DATA ATTR - data-url
  - DATA ATTR - data-img

  EVENTS:
  - EVENT - All Slick Events - first of all, since the generic slides are based on the slick carousel - all events provided by the slick carousel are usable.
  - EVENT - elementsColorLight - when the elements color of a slide are light - this event is fired.
  - EVENT - elementsColorDark - when the elements color of a slide are dark - this event is fired.

  NOTES:
  - NOTE - Initialization - to initialize the slideshow you need to trigger the "floInit" event on it. This is very useful when you need to bind some custom functionality to its events before it is intialized.
    Example:
    // $el.find(dotb + "__slides") - usually the selector for the slideshow in our themes.
    $el.find(dotb + "__slides")
      .trigger("floInit")
    ;

--}}

{{-- START: GET SLIDESHOW DATA FUNCTION --}}
  <?php

  if (!function_exists("flo_get_slideshow_data")) {
    function flo_get_slideshow_data($slideshow_id) {
      if ($slides = get_field("_post_image_gallery", $slideshow_id)){
        $slideshow_data = Array();
        $slideshow_data["slides"] = Array();

        /* START: SLIDESHOW DATA */
          $slideshow_data["autoplay"] = get_field("slideshow_autoplay", $slideshow_id) ? 'true': 'false';
          $slideshow_data["transition_speed"] = get_field("slideshow_transition_speed", $slideshow_id);
          $slideshow_data["autoplay_speed"] = get_field("autoplay_speed", $slideshow_id) * 1000;
          $slideshow_data["pause_on_hover"] = get_field("slideshow_pause_on_hover", $slideshow_id) ? "true" : "false";
          $slideshow_data["fade"] = get_field("slideshow_slide_effect", $slideshow_id) == "fade" ? "true" : "false";
        /* END: SLIDESHOW DATA */

        /* START: SLIDES DATA */
          foreach ($slides as $slide) {

            /* START: MOBILE CROP POSITION */
              if( isset($slide["slide_image"]['crop_position']) ){
                $crop_position = $slide["slide_image"]['crop_position'];

                // the background position is calculated using the following formula:
                // y = 1.8x - 40
                // http://www.wolframalpha.com/input/?i=interpolate+%5B(22.22,+0),(77.77,100)+%5D
                $mobile_crop_position = (1.8*$crop_position - 40).'%';
                if((1.8*$crop_position - 40) < 0){
                  $mobile_crop_position = '0%';
                } else if((1.8*$crop_position - 40) > 100){
                  $mobile_crop_position = '100%';
                }
              }else{
                $mobile_crop_position = '50%';
              }
            /* END: MOBILE CROP POSITION */

            /* START: VIDEO FUNCTIONALITY */
              $slide_type = $slide["slide_type"];

              $video_embed_code = "";
              $video_url = "";

              switch ($slide_type) {
                case 'image':

                break;
                case 'image_and_video_embed':
                $video_embed_code = $slide["slide_video_url"];
                break;

                case 'video_slide':
                $video_url = $slide["slide_video"];
                break;

                default:
                break;
              }
            /* END: VIDEO FUNCTIONALITY */

            /* START: ALT TEXT */
              if(isset($slide["slide_image"]['title'])){
                $alt_text = $slide["slide_image"]['title'];
              }else{
                $alt_text = '';
              }
            /* END: ALT TEXT */

            /* START: ADD SLIDE DATA TO SLIDESHOW DATA */
              $slideshow_data["slides"][] = [
                "object" => $slide,
                "elements_color" => $slide["slide_info"][0]["elements_color"],
                "type" => $slide_type,

                "img" => $slide["slide_image"]["url"],
                "image_srcset" => wp_get_attachment_image_srcset( $slide["slide_image"]["id"], 'full' ),
                "alt" => $alt_text,
                "mobile_crop_position" => $mobile_crop_position,

                "video_url" => $video_url,
                "video_embed_code" => $video_embed_code,

                "title" => $slide['slide_info'][0]['title'],
                "text" => $slide['slide_info'][0]['text'],
                "text_url" => $slide['slide_info'][0]['text_url'],
                "bottom_label" => $slide['slide_info'][0]['bottom_label'],
                "overlay_color" => $slide['slide_info'][0]['image_overlay_color'],
                "overlay_opacity" => $slide['slide_info'][0]['image_overlay_opacity']
              ];
            /* END: ADD SLIDE DATA TO SLIDESHOW DATA */

          }
        /* END: SLIDES DATA */

      }

      if (isset($slideshow_data)) {
        return $slideshow_data;
      } else {
        return;
      }
    }
  }

  ?>
{{-- END: GET SLIDESHOW DATA FUNCTION --}}

<?php
// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$slideshow_data = flo_get_slideshow_data($slideshow_id);
if(isset($force_transition) && ($force_transition == 'slide')){
    $slideshow_data["fade"] = false;
}
if (!isset($image_type)) {
  $image_type = "bgi";
}

/* START: SLIDE SIZE */
  if (!isset($height_type)) {
    $height_type = "full";
  }

  if ($height_type == "full") {
    $height = "100vh";
  } elseif ($height_type == "specific") {
    if (!isset($height_px)) {
      $height_px = 600;
    }

    $height = $height_px / 16 . "rem";
  }
/* END: SLIDE SIZE */

?>

@if($slideshow_data["slides"])
  {{-- START: SET HEIGHT --}}
    @include('core.style', [
      "breakpoint__medium_up" => "

        ".$b__uniq_for_css." ".$b__for_css."__slide-img {
          height: ".$height.";
        }

      "
    ])
  {{-- END: SET HEIGHT --}}

  {{-- START: AUTO ELEMENTS COLOR CHANGE --}}
    <?php
      $elements_to_color = [];
    ?>
    <script type="text/javascript">
      /* START: HEX2RGBA */
        function hex2rgba(hex, alpha) {
            var r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);

            if (alpha) {
                return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
            } else {
                return "rgb(" + r + ", " + g + ", " + b + ")";
            }
        }
      /* END: HEX2RGBA */

      jQuery(document).on("floInit", "{{$b__uniq_for_css}} .flo-generic-slides", function(){
        "use strict";

        var $ = jQuery;
        var $el = $(this);
        // var $el = $(".flo-generic-slides");
        var parent = $el.parents(".flo-block");
        var block_id = parent.attr("data-id");

        /* START: CSS SELECTORS */
          var b = "flo-generic-slides"; // Block class for HTML
          var dotb = "." + b; // Block class for CSS
          var block_parent_with_id = ".flo-block--" + block_id; // Block Parent class with ID

          var block = block_parent_with_id + " " + ".{{$b}}";
        /* END: CSS SELECTORS */

        $el
          .on("init afterChange", function(){

            var elements_color = $(this).find(".slick-current").attr("data-elements-color");

            var css = [];

            css.push([
              @yield('elements_to_change_color_to')
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
        ;
      }
    );
    </script>
  {{-- END: AUTO ELEMENTS COLOR CHANGE --}}
  <?php if (isset($disable_fade) && $disable_fade == 'disable'){
      $slideshow_data['fade'] = "false";
  }
  ?>
  <div
    class="flo-generic-slides flo-generic-slides--image-type-{{$image_type}} {{$b}}__slides {{$b}}__slides--image-type-{{$image_type}}"
    data-slick='{
      "speed": {{ $slideshow_data["transition_speed"] }},
      "fade": {{ $slideshow_data["fade"] }},
      "autoplay": {{ $slideshow_data["autoplay"] }},
      "autoplaySpeed": {{ $slideshow_data["autoplay_speed"] }},
      "pauseOnHover": {{ $slideshow_data["pause_on_hover"] }},
      {{-- START: SLICK OPTIONS SECTION TO BE EXTENDED --}}
        @yield("slick_options")
      {{-- END: SLICK OPTIONS SECTION TO BE EXTENDED --}}
      "": ""
    }'
    data-autoplay="{{ $slideshow_data['autoplay'] }}"
  >
    @foreach($slideshow_data["slides"] as $slide)
      <?php
        $slide_class = $b."__slide--".mt_rand(1, 9999);
        $slide_class_for_css = ".".$slide_class;

        if(isset($slide['alt'])){
          $alt_text = $slide['alt'];
        } else {
          $alt_text = '';
        }
      ?>
      <div
        class="flo-generic-slides__slide flo-generic-slides__slide--{{$slide["type"]}} {{$b}}__slide {{ $slide_class }} {{$b}}__slide--{{$slide["type"]}}"

        data-elements-color="{{$slide["elements_color"]}}"
        data-title="{{$slide["title"]}}"
        data-text="{{$slide["text"]}}"
        data-url="{{$slide["text_url"]}}"
        data-bottom-label="{{htmlentities($slide["bottom_label"])}}"
        data-img="{{$slide["img"]}}"
        data-overlay-color="{{$slide['overlay_color']}}"
        data-overlay-opacity="{{$slide['overlay_opacity']}}"

        @if ($slide["type"] == "image_and_video_embed")
          data-embed-code="{{ htmlentities($slide["video_embed_code"]) }}"
        @endif
      >

        <div class="flo-generic-slides__slide-content {{$b}}__slide-content">
          {{-- START: SLIDE IMAGES --}}
            @if ($image_type == "bgi")
              <div class="flo-generic-slides__slide-img flo-generic-slides__slide-img--bgi {{$b}}__slide-img {{$b}}__slide-img--bgi" aria-label="{{$alt_text}}" style="background-image: url({{$slide["img"]}}); background-position: {{$slide['mobile_crop_position']}}"></div>
            @elseif ($image_type == "img")
               <img class="flo-generic-slides__slide-img flo-generic-slides__slide-img--img {{$b}}__slide-img {{$b}}__slide-img--img" alt="{{$alt_text}}" src="{{$slide["img"]}}" srcset="{{ esc_attr($slide['image_srcset']) }}">

            @endif
          {{-- END: SLIDE IMAGES --}}

          {{-- START: VIDEO BACKGROUND --}}
            @if ($slide["type"] == "video_slide")
              <div class="
                flo-generic-slides__slide-background-video
                flo-generic-slides__slide-background-video--{{ $slide["object"]["slide_video_size"] }}
                {{$b}}__slide-background-video
                {{$b}}__slide-background-video--{{ $slide["object"]["slide_video_size"] }}
              ">
                <video muted playsinline loop autoplay>
                  <source src="{{ $slide["video_url"] }}" type="video/mp4">
                </video>
              </div>
            @endif
          {{-- END: VIDEO BACKGROUND --}}

          {{-- START: CONTENT SECTION TO BE EXTENDED --}}
            @yield('slide_content')
          {{-- END: CONTENT SECTION TO BE EXTENDED --}}
        </div>

        {{-- START: VIDEO BUTTON --}}
          @if ($slide["type"] == "image_and_video_embed")
            @include('components.flo-hero-video-embed')
          @endif
        {{-- END: VIDEO BUTTON --}}

      </div>
    @endforeach

  </div>
@endif
