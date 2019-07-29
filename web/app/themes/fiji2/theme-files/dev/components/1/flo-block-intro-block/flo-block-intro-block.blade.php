<?php
$b = "flo-block-intro-block"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation


// C. Image Area
$elements_color = flo_data($data, "elements_color");
$image = flo_data($data, "image");
$image_height = flo_data($data, "image_height");
$image_height_rem = $image_height / 16 . "rem";
$image_overlay_color = flo_data($data, "image_overlay_color");
$overlay_opacity = flo_data($data, "overlay_opacity") / 100;

$display_header = flo_data($data, "display_header");
$display_header_class = $display_header ? $b . "--header-is-visible" : "";
$brighness_class = flo_color_bright($elements_color) ? "flo-header__logo--is-light" : "";

// B. Text Area
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$text = flo_data($data, "text");
$text_font = flo_data($data, "text_font");

$mobile_merge_menu = flo_data($data, "mobile_merge_header", true) ? $b . "__header-mobile-merge" : "";
$mobile_logo_image = flo_data($data, "light_logo_image", false) ? $b ."__light-mobile-logo" : "";
$mobile_image_height = flo_data($data, "mobile_image_height", "400") / 16 ."rem";
// Background Image Optimization
$attachment_id = $image['ID'];

$img_sizes = array(
 'small' => array('width' => 99999, 'height' => $image_height),  // mobile size
 'medium' => array('width' => 99999, 'height' => $image_height * 2), // tablet size
 'large' => array('width' => 99999, 'height' => $image_height * 2),
);

$img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width {$b}", // Will be added to main block div. e.g. flo-block--full-width
    "data_onready" => "" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__text",
      $text_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__image-overlay {
        background-color: ".$image_overlay_color.";
        opacity: ".$overlay_opacity.";
      }

    ",
    "breakpoint__medium_up" => "

      ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
        height: ".$image_height_rem.";
      }

    ",
    "breakpoint__small_only" => "
      ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
        height: ".$mobile_image_height.";
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$display_header_class}} {{$mobile_merge_menu}} {{$mobile_logo_image}}">
    <div class="{{$b}}__image-wrap" style="{{$img_vars}}" aria-label="{{$image['alt']}}">
      @if ($display_header)
          <div class="{{$b}}__header-area {{$brighness_class}}">
            @include('components.flo-header')
          </div>
      @endif
      <div class="{{$b}}__image-overlay"></div>
    
      <div class="{{$b}}__title-area">
        @if ($title)
          <h2 class="{{$b}}__title">
            {{$title}}
          </h2>
        @endif
        @if ($text)
          <div class="{{$b}}__text">
            {{$text}}
          </div>
        @endif
      </div>
      
    </div>
  </div>
@overwrite
