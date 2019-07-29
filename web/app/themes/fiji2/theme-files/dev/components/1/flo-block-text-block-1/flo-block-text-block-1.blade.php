<?php
$b = "flo-block-text-block-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$subtitle = flo_data($data, "subtitle");
$subtitle_font = flo_data($data, "subtitle_font");

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

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__subtitle",
    $subtitle_font
    )
    ."

    ".$b__uniq_for_css." {
      color: ".$elements_color.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    @if ($title)
      <div class="{{$b}}__title">{{$title}}</div>
    @endif
    @if ($subtitle)
      <div class="{{$b}}__subtitle">{{$subtitle}}</div>
    @endif
  </div>
@overwrite
