<?php
$b = "flo-block-text-block-6"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$text_elements_color = flo_data($data, "elements_color");
$background_color = flo_data($data, "background_color");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$subtitle = flo_data($data, "subtitle");
$subtitle_font = flo_data($data, "subtitle_font");
$title_paragraph = flo_data($data, "title_paragraph");
$title_paragraph = strlen($title_paragraph) ? $title_paragraph : false;
$title_paragraph_font = flo_data($data, "title_paragraph_font");

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

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__title-paragraph",
    $title_paragraph_font
    )
    ."

    ".$b__uniq_for_css." {
      color: ".$text_elements_color.";
      background-color: ".$background_color.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">

    @if ($title or $subtitle)
      <div class="{{$b}}__title-section">
        @if ($title)
          <h2 class="{{$b}}__title">{{$title}}</h2>
        @endif
        @if ($subtitle)
          <h3 class="{{$b}}__subtitle">{{$subtitle}}</h3>
        @endif
      </div>
    @endif

    @if ($title_paragraph)
      <div class="{{$b}}__title-paragraph">{{$title_paragraph}}</div>
    @endif
    
  </div>
@overwrite
