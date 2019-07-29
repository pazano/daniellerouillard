<?php
$b = "flo-block-slideshow-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$display_header = flo_data($data, "display_header");

$slideshow_id = flo_data($data, "slideshow_id");
$slideshow_height_type = flo_data($data, "slideshow_height_type");
$slideshow_height_px = flo_data($data, "slideshow_height_px");

$slide_title_font = flo_data($data, "slide_title_font");
$slide_text_font = flo_data($data, "slide_text_font");
$slide_button = flo_data($data, "slide_display_button", false);
$slide_button_label = flo_data($data, "slide_button_label");
$slide_button_font = flo_data($data, "slide_button_font");
$slide_button_hover_color = flo_data($data, "slide_button_hover_color");
$slide_button_hover_background = flo_data($data, "slide_button_hover_background");
$slide_button_class = $slide_button ? $b . "__slideshow-has-button" : " ";
$counter_numbers_font = flo_data($data, "counter_numbers_font");
$counter_separator_font = flo_data($data, "counter_separator_font");
$slide_bottom_label_font = flo_data($data, "slide_bottom_label_font");

/* START: Slideshow Mobile Options */
  $mobile_arrows_class = flo_data($data, "mobile_arrows_display") ? '' : $b . '__mobile-disabled';
  $mobile_text_class = flo_data($data, "mobile_slideshow1_show_text") ? '' : $b . '__mobile-disabled';
  $mobile_bottom_area_class = flo_data($data, "mobile_slideshow1_show_bottom_area") ? '' : $b . '__mobile-disabled';
  $slideshow_mobile_style = '';
  if(flo_data($data, "mobile_slideshow1_layout") == 'fixed-height'){
    $slideshow_mobile_style = $b__uniq_for_css . " .flo-generic-slides__slide-content, ".$b__uniq_for_css." ".$b__for_css."__content-wrap { height: " . flo_data($data, 'mobile_slideshow1_height') . "px}";
  }
/* END: Slideshow Mobile Options */
?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_slideshow_1" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $slide_title_font
      )
      ."
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__text",
      $slide_text_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__counter",
      $counter_numbers_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__counter-separator",
      $counter_separator_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__bottom-label",
      $slide_bottom_label_font
      )
      ."
      
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__button",
      $slide_button_font
      )
      ."
      
      ".$b__uniq_for_css." ".$b__for_css."__button:hover {
        color: ".$slide_button_hover_color.";
        background-color: ".$slide_button_hover_background.";
        border-color: ".$slide_button_hover_background.";
      }
      
    ",
    "breakpoint__small_only" => "
      ".$b__uniq_for_css." ".$b__for_css."__mobile-disabled {
        display: none;
      }".$slideshow_mobile_style."
    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$slide_button_class}}">
    {{-- START: SLIDES --}}
      @include('components.flo-block-slideshow-1__slides')
    {{-- END: SLIDES --}}

    <div class="{{$b}}__content-wrap">

      <div class="{{$b}}__header-area">
        @if ($display_header)
          @include('components.flo-header')
        @endif
      </div>

      <div class="{{$b}}__title-area {{$mobile_text_class}}">
        <h3 class="{{$b}}__title"></h3>
        <h4 class="{{$b}}__text"></h4>
        @if ($slide_button)
          <a class="{{$b}}__button" href="">{{$slide_button_label}}</a>
        @endif
      </div>

      <div class="{{$b}}__bottom-area {{$mobile_bottom_area_class}}">
        <h5 class="{{$b}}__bottom-label"></h5>
      </div>

    </div>

    <div class="{{$b}}__navigation {{$mobile_arrows_class}}">
      <div class="{{$b}}__arrow {{$b}}__arrow--prev">
        <i class="flo-icon-line-arrow-left"></i>
      </div>
      <div class="{{$b}}__counter">
        <div class="{{$b}}__counter-index">
          01
        </div>
        <div class="{{$b}}__counter-separator">
          of
        </div>
        <div class="{{$b}}__counter-count">
          04
        </div>
      </div>
      <div class="{{$b}}__arrow {{$b}}__arrow--next">
        <i class="flo-icon-line-arrow-right"></i>
      </div>
    </div>
    
  </div>
@overwrite
