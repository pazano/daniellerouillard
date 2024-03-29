{{-- NOTE: GENERATED BY GULP !!! --}}<?php
$b = "flo-block-text-block-3"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$left_text_column = flo_data($data, "left_text_column");
$right_text_column = flo_data($data, "right_text_column");
$text_columns_font = flo_data($data, "text_columns_font");

?>
@extends('layout.block', [
  // "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
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
    $b__uniq_for_css." ".$b__for_css."__text-columns",
    $text_columns_font
    )
    ."
    ".$b__uniq_for_css."{
      color: ".$elements_color.";
    }
  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    <div class="{{$b}}__title">{{$title}}</div>
    @if ($left_text_column or $right_text_column)

    @endif
    <div class="{{$b}}__text-columns">
      @if ($left_text_column)
        <div class="{{$b}}__left-text-column">{{$left_text_column}}</div>
      @endif
      @if ($right_text_column)
        <div class="{{$b}}__right-text-column">{{$right_text_column}}</div>
      @endif
    </div>
  </div>
@overwrite
