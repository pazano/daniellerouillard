<?php
$b = "flo-block-faq-block-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$text_elements_color = flo_data($data, "text_elements_color");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$q_and_a_list = flo_data($data, "q-and-a_list");
$question_font = flo_data($data, "question_font");
$answer_font = flo_data($data, "answer_font");

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
    $b__uniq_for_css." ".$b__for_css."__question",
    $question_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__answer",
    $answer_font
    )
    ."

    ".$b__uniq_for_css." {
      color: ".$text_elements_color.";
    }
    ".$b__uniq_for_css." ".$b__for_css."__divider {
      background-color: ".hex2rgba($text_elements_color,0.14).";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    <div class="{{$b}}__title-area">
      <div class="{{$b}}__title">
        {{$title}}
      </div>
    </div>
    <div class="{{$b}}__faq-wrap">
      <div class="{{$b}}__divider"></div>
      @foreach ($q_and_a_list as $single_q_and_a)
        <?php
          $question = flo_data($single_q_and_a, "question");
          $answer = flo_data($single_q_and_a, "answer");
        ?>
        <div class="{{$b}}__single-qa">
          <h3 class="{{$b}}__question">• {{$question}}</h3>
          <div class="{{$b}}__answer">{{$answer}}</div>
        </div>
      @endforeach
    </div>
  </div>
@overwrite
