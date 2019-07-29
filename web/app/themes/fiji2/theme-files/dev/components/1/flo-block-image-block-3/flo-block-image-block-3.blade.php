<?php
$b = "flo-block-image-block-3"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

/* START: Image Area */

  $image = flo_data($data, "image");
  $image_height = flo_data($data, "image_height");
  $image_overlay_color = flo_data($data, "image_overlay_color");
  $overlay_opacity = flo_data($data, "overlay_opacity") / 100;

/* END: Image Area */

/* START: Text Area */

  /* START: Change elements color if user does not set an image */
    if ($image) {
      $elements_color = flo_data($data, "with_image_elements_color");
    } else {
      $elements_color = flo_data($data, "without_image_elements_color");
    }
  /* END: Change elements color if user does not set an image */

  $title = flo_data($data, "title");
  $title_font = flo_data($data, "title_font");
  $subtitle = flo_data($data, "subtitle");
  $subtitle_font = flo_data($data, "subtitle_font");
  $text_paragraph = flo_data($data, "text_paragraph");
  $button = flo_data($data, "button");
  $button_label_font = flo_data($data, "button_label_font");
  $button_label_color = flo_data($data, "button_label_color");
  $button_background_color = flo_data($data, "button_background_color");

/* END: Text Area */

/* START: Mobile Options */
  $mobile_image_height = flo_data($data, "mobile_image_height");
/* END: Mobile Options */

/* START: Do not set block height if there is no image set */
  if ($image) {
    $image_height_rem = $image_height / 16 . "rem";
    $mobile_image_height_rem = $mobile_image_height / 16 . "rem";
  } else {
    $image_height_rem = "auto";
    $mobile_image_height_rem = "auto";
  }
/* END: Do not set block height if there is no image set */

/* START: Background Image Optimization */
  $attachment_id = $image['ID'];
  $img_sizes = array(
   'small' => array('width' => 99999, 'height' => $mobile_image_height * 2),  // mobile size
   'medium' => array('width' => 99999, 'height' => $image_height * 2), // tablet size
   'large' => array('width' => 99999, 'height' => $image_height * 2),
  );
  $img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);
/* END: Background Image Optimization */

?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    ".$b__uniq_for_css." {
      color: ".$elements_color.";
    }

    /* START: Image Area */
      ".$b__uniq_for_css." ".$b__for_css."__image-overlay {
        background-color: ".$image_overlay_color.";
        opacity: ".$overlay_opacity.";
      }
    /* END: Image Area */

    /* START: TEXT AREA */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__subtitle",
      $subtitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__button",
      $button_label_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__button {
        color: ".$button_label_color.";
        background-color: ".$button_background_color.";
      }
        ".$b__uniq_for_css." ".$b__for_css."__button:hover {
          color: ".$button_background_color.";
          background-color: ".$button_label_color.";
        }

    /* END: TEXT AREA */

  ",

  "breakpoint__medium_up" => "

    /* START: IMAGE AREA */

      ".$b__uniq_for_css." {
        min-height: ".$image_height_rem.";
      }

    /* END: IMAGE AREA */

  ",

  "breakpoint__small_only" => "

    /* START: Mobile Image Area */

      ".$b__uniq_for_css." {
        min-height: ".$mobile_image_height_rem.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__button {
        color: ".$button_background_color.";
        background-color: ".$button_label_color.";
      }

    /* END: Mobile Image Area */

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}" style="{{$img_vars}}" aria-label="{{$image['alt']}}">

    @if ($image)
      <div class="{{$b}}__image-overlay"></div>
    @endif

    @if ($title or $subtitle or $text_paragraph or isset($button['title']))
      <div class="{{$b}}__text-area">

        @if ($title)
          <h2 class="{{$b}}__title">
            {{$title}}
          </h2>
        @endif

        @if ($subtitle)
          <h3 class="{{$b}}__subtitle">
            {{$subtitle}}
          </h3>
        @endif

        @if ($text_paragraph)
          <div class="{{$b}}__text-paragraph flo-post">
            {{$text_paragraph}}
          </div>
        @endif

        @if (isset($button['title']) and strlen($button['title']))
          <div class="{{$b}}__button-wrap">
            <a class="{{$b}}__button" href="{{$button['url']}}" target="{{$button['target']}}">
              {{$button['title']}}
            </a>
          </div>
        @endif
      </div>
    @endif

  </div>
@overwrite
