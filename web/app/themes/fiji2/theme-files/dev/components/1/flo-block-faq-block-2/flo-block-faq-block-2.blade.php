<?php
$b = "flo-block-faq-block-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$text_elements_color = flo_data($data, "text_elements_color");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$background_image = flo_data($data, "background_image");
$background_image_height = flo_data($data, "background_image_height");
$background_image_height_rem = $background_image_height / 16 . "rem";
$overlay_color = flo_data($data, "overlay_color");
$overlay_color_opacity = flo_data($data, "overlay_color_opacity") / 100;
$questions_and_answers = flo_data($data, "questions_and_answers");
$question_font = flo_data($data, "question_font");
$answer_font = flo_data($data, "answer_font");
$faq_counter_number_font = flo_data($data, "faq_counter_number_font");

$total_faq_number = count($questions_and_answers);
$display_navigation_class = $total_faq_number == 1 ? $b."__navigation--hide" : "";
$run_multiple_faq_questions = $total_faq_number > 1 ? "flo_faq_2" : "";

// Mobile Options

$display_background_image = flo_data($data, "display_background_image");
$text_color = flo_data($data, "text_color");
$hide_overlay_class = $display_background_image ? "" : $b."__image-overlay--hide";
$mobile_options = $display_background_image ? "" : " background-image:none!important; color:".$text_color."; border-color: ".$text_color." ";

// Background Image Optimization
$attachment_id = $background_image['ID'];

$img_sizes = array(
 'small' => array('width' => 800, 'height' => $background_image_height * 2),  // mobile size
 'medium' => array('width' => 2048, 'height' => $background_image_height * 2), // tablet size
 'large' => array('width' => 2560, 'height' => $background_image_height * 2),
);

$img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = true);

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => $run_multiple_faq_questions // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    ".$b__uniq_for_css." {
      color: ".$text_elements_color.";
      border-color: ".$text_elements_color.";
    }

    /* START: TITLE AND IMAGE */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__image-overlay {
        background-color: ".$overlay_color.";
        opacity: ".$overlay_color_opacity.";
      }

    /* END: TITLE AND IMAGE */


    /* START: FAQ SLIDER */

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

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__faq-counter",
      $faq_counter_number_font
      )
      ."

    /* END: FAQ SLIDER */

  ",

  "breakpoint__medium_up" => "

    ".$b__uniq_for_css." {
      min-height: ".$background_image_height_rem.";
    }

  ",

  "breakpoint__small_only" => "

    ".$b__uniq_for_css." {

      ".$mobile_options.";

    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}" style="{{$img_vars}})" aria-label="{{$background_image['alt']}}">
    <div class="{{$b}}__image-overlay {{$hide_overlay_class}}"></div>
      @if ($title)
        <div class="{{$b}}__title">{{$title}}</div>
      @endif

    <div class="{{$b}}__faq-slider">
        @if ($questions_and_answers)

            @foreach ($questions_and_answers as $single_q_and_a)
              <?php
                $question = flo_data($single_q_and_a, "question");
                $answer = flo_data($single_q_and_a, "answer");
              ?>
              <div class="{{$b}}__faq-slide">
                <div class="{{$b}}__faq-slide-content">
                  <h3 class="{{$b}}__question">{{$question}}</h3>
                  <div class="{{$b}}__answer">{{$answer}}</div>
                </div>
              </div>
            @endforeach

        @endif

    </div>

    <div class="{{$b}}__navigation {{$display_navigation_class}}">

      <i class="{{$b}}__arrow {{$b}}__arrow--left flo-icon-line-arrow-left {{$b}}__slide-previous"></i>

      <div class="{{$b}}__faq-counter">
        <div class="{{$b}}__current-item-number"></div>
        <div class="{{$b}}__number-divider"></div>
        <div class="{{$b}}__total-item-number"></div>
      </div>

      <i class="{{$b}}__arrow {{$b}}__arrow--right flo-icon-line-arrow-right {{$b}}__slide-next"></i>

    </div>

  </div>
@overwrite
