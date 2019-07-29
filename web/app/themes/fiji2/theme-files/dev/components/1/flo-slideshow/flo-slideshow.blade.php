<?php
$b = "flo-slideshow"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__id = mt_rand(1, 999);
  $b__uniq = $b."--".$b__id; // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$slideshow_id = flo_data($data, "slideshow");
$layout = flo_data($data, "layout");

$elements_color = flo_data($data, "elements_color");
$gap_around_slideshow = flo_data($data, "gap_around_slideshow") / 16 . "rem";
$title_area_pretitle_font = flo_data($data, "title_area_pretitle_font");
$title_area_second_pretitle_font = flo_data($data, "title_area_second_pretitle_font");
$title_area_title_font_a_and_b = flo_data($data, "title_area_title_font_a_and_b");
$title_area_title_font_c = flo_data($data, "title_area_title_font_c");
$title_area_text_color = flo_data($data, "title_area_text_color");
$title_area_background_color_on_hover = flo_data($data, "title_area_background_color_on_hover");
$title_area_text_color_on_hover = flo_data($data, "title_area_text_color_on_hover");
$counter_display_counter = flo_data($data, "counter_display_counter");
$counter_counter_font = flo_data($data, "counter_counter_font");

$right_bar_background_color = flo_data($data, "right_bar_background_color");
$right_bar_elements_color = flo_data($data, "right_bar_elements_color");
$right_bar_display_search = flo_data($data, "right_bar_display_search");
$right_bar_display_link = flo_data($data, "right_bar_display_link");
$right_bar_link_title = flo_data($data, "right_bar_link_title");
$right_bar_link_url = flo_data($data, "right_bar_link_url");
$right_bar_link_font = flo_data($data, "right_bar_link_font");

$display_featured_link = flo_data($data, "display_featured_link");
$featured_link_url = flo_data($data, "featured_link_url");
$featured_link_pretitle = flo_data($data, "featured_link_pretitle");
$featured_link_pretitle_font = flo_data($data, "featured_link_pretitle_font");
$featured_link_title = flo_data($data, "featured_link_title");
$featured_link_title_font = flo_data($data, "featured_link_title_font");
$featured_link_image = flo_data($data, "featured_link_image");
$featured_link_image_border_color = flo_data($data, "featured_link_image_border_color");
$display_logo = flo_data($data, "display_logo");
$display_social_links = flo_data($data, "display_social_links");

?>

{{-- START: SLIDESHOW DATA --}}
  <?php
  global $slideshow_data;
  ?>
  @include('components.flo-slideshow__data')
{{-- END: SLIDESHOW DATA --}}

@extends('layout.block', [
  "block_classes" => "flo-block--full-width flo-slideshow-block--type-".$layout, // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_slideshow" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')

  <div class="{{$b}} {{$b__uniq}} {{$b}}--layout-type-{{$layout}}" data-block-id="{{$b__id}}">
    @if ($layout == "a")
      @include('components.flo-slideshow__layout--type-a')
    @elseif ($layout == "b")
      @include('components.flo-slideshow__layout--type-b')
    @elseif ($layout == "c")
      @include('components.flo-slideshow__layout--type-c')
    @endif
  </div>
@overwrite
