<?php
$b = "flo-block-newsletter-block-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$background_color = flo_data($data, "background_color");
$elements_color = flo_data($data, "elements_color");

$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$subtitle = flo_data($data, "subtitle");
$subtitle_font = flo_data($data, "subtitle_font");
$form_field_placeholder = flo_data($data, "form_field_placeholder");
$form_field_font = flo_data($data, "form_field_font");
$submit_button_label = flo_data($data, "submit_button_label");
$submit_button_font = flo_data($data, "submit_button_font");
$newsletter_mailchimp_code = flo_data($data, "newsletter_mailchimp_code");

$display_instagram_icon = flo_data($data, "display_instagram_icon");
$images_source = flo_data($data, "images_source");
$images = flo_data($data, "images");
$bottom_link = flo_data($data, "bottom_link");
$bottom_link_font = flo_data($data, "bottom_link_font");

$display_mobile_feed = flo_data($data, "display_instagram_area_on_mobile");
$mobile_feed_css_snippet = '';
if(!$display_mobile_feed) {
  $mobile_feed_css_snippet = $b__uniq_for_css." ".$b__for_css."__images-area { display: none; }";
}

?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "
      ".$b__uniq_for_css." {
        color: ".$elements_color.";
        border-color: ".hex2rgba($elements_color, 0.1).";
      }
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
      $b__uniq_for_css." ".$b__for_css."__form-field",
      $form_field_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__submit-button",
      $submit_button_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__bottom-link",
      $bottom_link_font
      )
      ."
    ",
    "breakpoint__medium_up" => "
      ".$b__uniq_for_css." ".$b__for_css."__newsletter-main-wrap {
        background-color: ".$background_color.";
      }
    ",
    "breakpoint__small_only" => "
      ".$b__uniq_for_css." ".$b__for_css."__form-area {
        background-color: ".$background_color.";
      }"
      .$mobile_feed_css_snippet."
    "
      
  ])
  <div class="{{$b}} {{$b__uniq}}">
    <div class="{{$b}}__newsletter-main-wrap">
      <form class="{{$b}}__form-area flo-form--newsletter" method="post">
        @if ($title)
          <h3 class="{{$b}}__title">
            {{$title}}
          </h3>
        @endif
        @if ($subtitle)
          <h5 class="{{$b}}__subtitle">
            {{$subtitle}}
          </h5>
        @endif
        <input class="{{$b}}__form-field flo-no-styling" type="email" name="EMAIL" value="" placeholder="{{$form_field_placeholder}}">
        <button class="{{$b}}__submit-button" type="submit" name="button">
          {{$submit_button_label}}
        </button>
      </form>
      @if(strlen(flo_data($data, "newsletter_mailchimp_code") ) )
          <noscript type="text/template" class="embed_code" data-onready="newsletter_block_1">
            {{ addslashes(flo_data($data, "newsletter_mailchimp_code") ) }}
          </noscript>
      @endif
      

      <div class="{{$b}}__images-area">
        @if ($display_instagram_icon)
          <div class="{{$b}}__instagram-icon">
            <i class="flo-icon-instagram"></i>
          </div>
        @endif
        @include('components.flo-footer-image-feed', [
          "source" => $images_source,
          "count" => 4,
          "images" => $images,
          "imgfeed_width" => 640,
          "imgfeed_height" => 640,
          "instasize" => "640x640_crop"
        ])
        @if ($bottom_link)
          <a class="{{$b}}__bottom-link" href="{{$bottom_link["url"]}}" target="{{$bottom_link["target"]}}">
            {{$bottom_link["title"]}}
          </a>
        @endif
      </div>
    </div>
  </div>
@overwrite
