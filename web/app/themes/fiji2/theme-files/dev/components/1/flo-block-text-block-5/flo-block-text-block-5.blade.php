<?php
$b = "flo-block-text-block-5"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

/* START: ACF Fields */
$elements_color = flo_data($data, "elements_color");
$decorative_icon = flo_data($data, "decorative_icon");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$display_separator = flo_data($data, "display_separator", true);
/* END: ACF Fields */

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__title",
    $title_font
    )
    ."
    ".$b__uniq_for_css." {
      color: ".$elements_color.";
    }
    ".$b__uniq_for_css." ".$b__for_css."__separating-line {
      background-color: ".$elements_color.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    @if ($decorative_icon)
      <img class="{{$b}}__decorative-image" src="{{$decorative_icon['url']}}" alt="{{$decorative_icon['alt']}}">
    @endif
    @if ($title)
      <h2 class="{{$b}}__title">{{$title}}</h2>
    @endif
    @if ($display_separator)
      <div class="{{$b}}__separating-line"></div>
    @endif
  </div>
@overwrite
