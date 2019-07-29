<?php
$b = "flo-block-image-block-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

// A. Image Area
$image = flo_data($data, "image");
$image_height = flo_data($data, "image_height");
$image_height_rem = $image_height / 16 . "rem";
// B. Text Area
$elements_color = flo_data($data, "elements_color");
$text_area_background_color = flo_data($data, "text_area_background_color");
$text_area_position = flo_data($data, "text_area_position");
$pretitle = flo_data($data, "pretitle");
$pretitle_font = flo_data($data, "pretitle_font");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$title_paragraph = flo_data($data, "title_paragraph");
$title_paragraph = strlen($title_paragraph) ? $title_paragraph : false;
$title_paragraph_font = flo_data($data, "title_paragraph_font");
$button = flo_data($data, "button");
$button_label_font = flo_data($data, "button_label_font");

/* START: MOBILE OPTIONS */
  $mobile_text_position = flo_data($data, "mobile_text_position");
  $mobile_image_height = flo_data($data, "mobile_image_height") . 'px';
  if($mobile_text_position == 'center') {
    $mobile_image_height = '400px';
  }
  $mobile_text_position_class = $b . '__mobile-text-' . $mobile_text_position;
/* END: MOBILE OPTIONS */

$text_area_position_class = "";

switch ($text_area_position) {
  case 'left':
    $text_area_position_class =  $b."--text-area-on-the-left";
    break;

  case 'center':
    $text_area_position_class =  $b."--text-area-in-the-center";
    break;

  case 'right':
    $text_area_position_class =  $b."--text-area-on-the-right";
    break;

  default:
    $text_area_position_class =  $b."--text-area-on-the-right";
    break;
}

// Background Image Optimization
$attachment_id = $image['ID'];

$img_sizes = array(
 'small' => array('width' => 99999, 'height' => 400 * 2),  // mobile size
 'medium' => array('width' => 99999, 'height' => $image_height * 2), // tablet size
 'large' => array('width' => 99999, 'height' => $image_height * 2),
);

$img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    /* START: TEXT AREA */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__pretitle",
      $pretitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title-paragraph",
      $title_paragraph_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__button",
      $button_label_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__text-area {
        background-color: ".$text_area_background_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__vertical-line {
        background-color: ".$elements_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__button {
        border: 1px solid ".hex2rgba($elements_color, 0.3)."!important;
      }
      ".$b__uniq_for_css." ".$b__for_css."__button:hover {
        background-color: ".$elements_color.";
        color: ".$text_area_background_color.";
        border-color: ".$text_area_background_color.";
      }

    /* END: TEXT AREA */

    ".$b__uniq_for_css." {
      color: ".$elements_color.";
    }

  ",

  "breakpoint__medium_up" => "

    /* START: IMAGE AREA */

      ".$b__uniq_for_css." {
        min-height: ".$image_height_rem.";
      }

    /* END: IMAGE AREA */

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}} {{$text_area_position_class}} {{$mobile_text_position_class}}" style="{{$img_vars}}" aria-label="{{$image['alt']}}">
    @if ($title or $pretitle or $title_paragph or $button)
      @if($mobile_text_position == 'bottom' || $mobile_text_position == 'top')
        <img class="{{$b}}__mobile-img-wrap" src="{{$image['url']}}" alt="{{$image['alt']}}">
      @else
        <div class="{{$b}}__mobile-bg-wrap" style="{{$img_vars}}" aria-label="{{$image['alt']}}"></div>
      @endif
      <div class="{{$b}}__text-area">
        @if ($pretitle)
          <h3 class="{{$b}}__pretitle">{{$pretitle}}</h3>
        @endif
        @if ($title)
          <h2 class="{{$b}}__title">{{$title}}</h2>
        @endif
        @if ( ($pretitle || $title) && $title_paragraph )
          <div class="{{$b}}__vertical-line"></div>
        @endif
        @if ($title_paragraph)
          <div class="{{$b}}__title-paragraph">{{$title_paragraph}}</div>
        @endif
        @if ($button)
          <div class="{{$b}}__button-wrap">
            <a class="{{$b}}__button" href="{{$button['url']}}">{{$button['title']}}</a>
          </div>
        @endif
      </div>
    @endif
  </div>
@overwrite
