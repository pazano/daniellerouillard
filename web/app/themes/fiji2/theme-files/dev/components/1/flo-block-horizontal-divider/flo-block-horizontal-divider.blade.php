<?php
$b = "flo-block-horizontal-divider"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$remove_vertical_paddings = flo_data($data, "remove_vertical_paddings", false);
$paddings_class = $remove_vertical_paddings ? "flo-block--no-top-padding" : "";
$background_color = flo_data($data, "background_color", "#f8f8f8");
$block_height = flo_data($data, "block_height") / 16 . "rem";
$block_height_on_mobile = flo_data($data, "block_height_on_mobile", 100) / 16 . "rem";
$display_line = flo_data($data, "display_line", true);
$width = flo_data($data, "width", 100);
$width_on_mobile = flo_data($data, "width_on_mobile", 100);
$color = flo_data($data, "color", "#e5e5e5");
$decorative_icon = flo_data($data, "decorative_icon");

?>
@extends('layout.block', [
  "block_classes" => "{$paddings_class}", // Will be added to main block div. e.g. flo-block--full-width
  "block_custom_background_color" => $background_color,
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".$b__uniq_for_css." ".$b__for_css."__line {
        width: ".$width."%;
        background-color: ".$color.";
      }

    ",
    "breakpoint__medium_up" => "
      ".$b__uniq_for_css." {
        height: ".$block_height.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__line {
        width: ".$width."%;
      }
    ",
    "breakpoint__small_only" => "
      ".$b__uniq_for_css." {
        height: ".$block_height_on_mobile.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__line {
        width: ".$width_on_mobile."%;
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}}">
    @if ($display_line)
      @if ($decorative_icon)
        <div class="{{$b}}__line"></div>
        <img src="{{$decorative_icon}}" alt="" class="{{$b}}__decorative-icon">
        <div class="{{$b}}__line"></div>
        @else
        <div class="{{$b}}__line">
          @if ($decorative_icon)
            <img src="{{$decorative_icon}}" alt="" class="{{$b}}__decorative-icon">
          @endif
        </div>
      @endif
    @endif
  </div>
@overwrite
