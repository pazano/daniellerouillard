<?php
$b = "flo-block-slideshow-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");

$slideshow_id = flo_data($data, "slideshow_id");
$slideshow_height_px = flo_data($data, "slideshow_height", 480);
$gap_between_slides = flo_data($data, "gap_between_slides", 15) / 2 / 16 . "rem";

$display_numbered_navigation = flo_data($data, "display_numbered_navigation");
$numbered_navigation_font = flo_data($data, "numbered_navigation_font");
$full_width_or_not = flo_data($data, "slideshow_full_width") ? 'flo-block--full-width': "";

/* START: Slideshow Mobile Options */
  $mobile_arrows_class = flo_data($data, "mobile_slideshow2_show_arrows") ? '' : $b . '__mobile-disabled';
  $mobile_numbered_navigation_class = flo_data($data, "mobile_slideshow2_display_numbered_navigation") ? '' : $b . '__mobile-disabled';
  $mobile_slideshow_type = flo_data($data, "mobile_slideshow2_layout");
  $mobile_slideshow_height = flo_data($data, "mobile_slideshow2_height");
  $mobile_slideshow_style = $mobile_slideshow_type == 'fixed-height' ? $b__uniq_for_css." ".$b__for_css."__slides, ".$b__uniq_for_css." ".$b__for_css."__slide img{ height: ".$mobile_slideshow_height."px; }" : '';
  $slick_alteration_class = $mobile_slideshow_type == 'full-height' ? $b.'__height-auto' : '';
/* END: Slideshow Mobile Options */

?>
@extends('layout.block', [
  "block_classes" => "{$full_width_or_not}", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_slideshow_2" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__dots",
      $numbered_navigation_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color."!important;
      }
      ".$b__uniq_for_css." ".$b__for_css."__slide-img {
        margin: 0 ".$gap_between_slides.";
      }
    ",
    "breakpoint__small_only" => "
      ".$b__uniq_for_css." ".$b__for_css."__mobile-disabled {
        display: none;
      }
    ".$mobile_slideshow_style
  ])
  <div class="{{$b}} {{$b__uniq}} {{$slick_alteration_class}}">

    @include('components.flo-block-slideshow-2__slides')

    <div class="{{$b}}__navigation">
      <div class="{{$b}}__arrow {{$b}}__arrow--prev {{$mobile_arrows_class}}">
        <i class="flo-icon-line-arrow-left"></i>
      </div>
      @if ($display_numbered_navigation)
        <div class="{{$b}}__dots {{$mobile_numbered_navigation_class}}"></div>
      @endif
      <div class="{{$b}}__arrow {{$b}}__arrow--next {{$mobile_arrows_class}}">
        <i class="flo-icon-line-arrow-right"></i>
      </div>
    </div>

  </div>
@overwrite
