<?php
$b = "flo-block-button"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$button_link = flo_data($data, "button_link");
if(empty($button_link)){
  $button_link = [
    "title" => "Button Title",
    "url" => "#",
    "target" => ""
  ];
}
$button_label_color = flo_data($data, "button_label_color");
$button_label_font = flo_data($data, "button_label_font");
$button_background_color = flo_data($data, "button_background_color");

$button_label_color_on_hover = flo_data($data, "button_label_color_on_hover");
$button_background_color_on_hover = flo_data($data, "button_background_color_on_hover");
?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__button",
    $button_label_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__button {
      color: ".$button_label_color.";
      border-color: ".hex2rgba($button_label_color, 0.3).";
      background-color: ".$button_background_color.";
    }

    ".$b__uniq_for_css." ".$b__for_css."__button:hover {
      color: ".$button_label_color_on_hover.";
      background-color: ".$button_background_color_on_hover.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    <a href="{{$button_link['url']}}" class="{{$b}}__button" target="{{$button_link['target']}}">{{$button_link['title']}}</a>
  </div>
@overwrite
