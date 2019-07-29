<?php
$b = "flo-block-newsletter-block-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$background_color = flo_data($data, "background_color");

$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");

$text = flo_data($data, "text");
$text_font = flo_data($data, "text_font");
$newsletter_field_placeholder = flo_data($data, "newsletter_field_placeholder");
$placeholder_font = flo_data($data, "placeholder_font");
$newsletter_mailchimp = flo_data($data, "newsletter_mailchimp");

$form_submit_label = flo_data($data, "form_submit_label");
$submit_label_font = flo_data($data, "submit_label_font");
$label_color_on_hover = flo_data($data, "label_color_on_hover");

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "newsletter_block_2" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      /* START: Title */
        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__title",
        $title_font
        )
        ."
      /* END: Title */

      /* START: NEWSLETTER AREA */

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__text",
        $text_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__newsletter-area-form-field",
        $placeholder_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__newsletter-area-form-submit",
        $submit_label_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__newsletter-area-form-submit:hover {
          color: ".$label_color_on_hover."!important;
          background-color: ".$elements_color."!important;
          border-color: ".$elements_color."!important;
        }

      /* END: NEWSLETTER AREA */

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
        background-color: ".$background_color.";
        border-color: ".hex2rgba($elements_color, 0.3).";
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}}">

    @if ($title)
      <div class="{{$b}}__title-area">
        <h2 class="{{$b}}__title">
          {{$title}}
        </h2>
      </div>
    @endif

    <div class="{{$b}}__newsletter-area">
      @if ($text)
        <h3 class="{{$b}}__text">
          {{$text}}
        </h3>
      @endif
      <div class="{{$b}}__newsletter">
        <form class="{{$b}}__newsletter-area-form flo-form--newsletter"  method="post">
          <input class="{{$b}}__newsletter-area-form-field flo-no-styling" type="email" name="EMAIL" value="" placeholder="{{$newsletter_field_placeholder}}">
          <button class="{{$b}}__newsletter-area-form-submit" type="submit" name="button">
            {{$form_submit_label}}
          </button>
        </form>
        @if(strlen(flo_data($data, "mailchimp_code") ) )
            <noscript type="text/template" class="embed_code" data-onready="newsletter_block_2">
              {{ addslashes(flo_data($data, "mailchimp_code") ) }}
            </noscript>
        @endif
      </div>

    </div>
  </div>
@overwrite
