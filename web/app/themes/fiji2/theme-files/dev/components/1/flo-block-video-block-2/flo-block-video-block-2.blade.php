<?php
$b = "flo-block-video-block-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

// A. Image Area
$background_color = flo_data($data, "background_color");
$image = flo_data($data, "image");
$image_height = flo_data($data, "image_height");
$image_position = flo_data($data, "image_position");
$video_embed_code  = flo_data($data, "video_embed_code");
$video_button_color = flo_data($data, "video_button_color");
$video_button_background_color = flo_data($data, "video_button_background_color");
// B. Text Area
$text_elements_color = flo_data($data, "elements_color");
$top_label = flo_data($data, "top_label");
$top_label_font = flo_data($data, "top_label_font");
$pretitle = flo_data($data, "pretitle");
$pretitle_font = flo_data($data, "pretitle_font");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$button_link = flo_data($data, "button_link");
$button_link_font = flo_data($data, "button_link_font");

$image_height_rem = $image_height / 16;
$image_position_class = $image_position == "left" ? $b."--image-on-the-left" : $b."--image-on-the-right";

// Background Image optimization


$attachment_id = $image['ID'];

$img_sizes = array(
 'small' => array('width' => 9999, 'height' => $image_height * 2),  // mobile size
 'medium' => array('width' => 9999, 'height' => $image_height * 2), // tablet size
 'large' => array('width' => 9999, 'height' => $image_height * 2),
);

$img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);


?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    /* START: IMAGE AREA */

      ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
        height: ".$image_height_rem."rem;
      }

      ".$b__uniq_for_css." .flo-video-embed__video-button {
        color: ".$video_button_color.";
        background-color: ".$video_button_background_color.";
      }

    /* END: IMAGE AREA */


    /* START: TEXT AREA */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__top-label",
      $top_label_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__pretitle",
      $pretitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__button-link",
      $button_link_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__button-link {
        border: 1px solid ".hex2rgba($text_elements_color, 0.2).";
      }

      ".$b__uniq_for_css." ".$b__for_css."__button-link:hover {
        background-color: ".$text_elements_color.";
        color: ".$background_color.";
        border-color: ".$background_color.";
      }

    /* END: TEXT AREA */

    ".$b__uniq_for_css." {
      color: ".$text_elements_color.";
      background-color: ".$background_color.";
    }

  ",

  "breakpoint__small_only" => "
    ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
      height: ". ($image_height_rem / 2) ."rem;
    }
  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}} {{$image_position_class}}">
    <div class="{{$b}}__image-wrap" style="{{$img_vars}}" aria-label="{{$image['alt']}}">
      @if ($video_embed_code)
        @include('components.flo-video-embed', [
          "embed_code" => $video_embed_code
        ])
      @endif
    </div>
    <div class="{{$b}}__text-elements-wrap">
        @if ($top_label)
          <h4 class="{{$b}}__top-label">{{$top_label}}</h4>
        @endif
        @if ($pretitle or $title)
          <div class="{{$b}}__title-wrap">
            @if ($pretitle)
              <h3 class="{{$b}}__pretitle">{{$pretitle}}</h3>
            @endif
            @if ($title)
              <h2 class="{{$b}}__title">{{$title}}</h2>
            @endif
          </div>
        @endif
        @if (isset($button_link['title']))
          <div class="{{$b}}__button-link-wrap">
            <a class="{{$b}}__button-link" href="{{$button_link['url']}}">
              {{$button_link['title']}}
            </a>
          </div>
        @endif
    </div>
  </div>
@overwrite
