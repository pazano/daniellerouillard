{{-- NOTE: GENERATED BY GULP !!! --}}<?php
$b = "flo-block-numeric-details"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$bg_color = flo_data($data, "background_color");
$enable_animation = flo_data($data, "enable_number_animation");
$anim_duration = flo_data($data, "num_anim_duration", 1000);
$number_font = flo_data($data, "number_font");
$text_font = flo_data($data, "details_font");
$numeric_details_obj = flo_data($data, "numeric_details");
$col_nr = 1;
if(isset($numeric_details_obj) && is_array($numeric_details_obj) && sizeof($numeric_details_obj) > 0) {
  $col_nr = sizeof($numeric_details_obj);
}

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_numeric_details" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "
      ".$b__uniq_for_css.$b__for_css." {
        color: ".$elements_color.";
        background-color: ".$bg_color.";
        border-color: ".hex2rgba($elements_color, 0.15).";
      }
      ".$b__uniq_for_css." ".$b__for_css."__numeric-detail-number:not(".$b__for_css."__plus-will-show) {
        margin-right: -".$number_font['offset']."em;
      }
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__numeric-detail-number",
      $number_font
      )
      ."
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__numeric-detail-text",
      $text_font
      )
      ."
    ",
    "breakpoint__medium_up" => "
      ".$b__uniq_for_css." ".$b__for_css."__numeric-detail {
        width: calc(100% / ".$col_nr.");
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}}" data-animnum="{{$enable_animation}}" data-anim-ms="{{$anim_duration}}">
    @if(isset($numeric_details_obj) && is_array($numeric_details_obj) && sizeof($numeric_details_obj) > 0)
      @foreach ($numeric_details_obj as $numeric_detail)
        <?php 
          $initial_num = $enable_animation ? "0" : $numeric_detail["number"]; 
          $show_plus_class = "";
          if($numeric_detail["enable_num_plus"]) {
            $show_plus_class = $b . "__plus-will-show";
          }
        ?>
        <div class="{{$b}}__numeric-detail">
          @if($numeric_detail["number"])
            <span class="{{$b}}__numeric-detail-number {{$show_plus_class}}" data-num="{{$numeric_detail["number"]}}">{{$initial_num}}</span>
          @endif
          @if($numeric_detail["text"])
            <span class="{{$b}}__numeric-detail-text">{{$numeric_detail["text"]}}</span>
          @endif
        </div>
      @endforeach
    @endif
  </div>
@overwrite