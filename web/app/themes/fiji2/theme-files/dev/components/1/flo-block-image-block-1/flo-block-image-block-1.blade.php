<?php
$b = "flo-block-image-block-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

/* START: ACF Fields */
$elements_color = flo_data($data, "elements_color");
$image = flo_data($data, "image");
$image_position = flo_data($data, "image_position");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$title_paragraph = flo_data($data, "title_paragraph");
$title_paragraph_font = flo_data($data, "title_paragraph_font");
$button = flo_data($data, "button");
$button_label_font = flo_data($data, "button_label_font");
$button_border_color = flo_data($data, "button_border_color");
$button_label_color_on_hover = flo_data($data, "button_label_color_on_hover");
$button_background_color_on_hover = flo_data($data, "button_background_color_on_hover");

$image_position_modifier = $image_position == "left" ? $b ."--left-aligned" :  $b . "--right-aligned";
/* END: ACF Fields */
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
    $b__uniq_for_css." ".$b__for_css."__title-paragraph",
    $title_paragraph_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__button",
    $button_label_font
    )
    ."

    ".$b__uniq_for_css." {
      color: ".$elements_color.";
      border-color: ".$button_border_color.";
    }
    ".$b__uniq_for_css." ".$b__for_css."__button:hover {
      color: ".$button_label_color_on_hover.";
      background-color: ".$button_background_color_on_hover.";
      // border-color: ".$button_background_color_on_hover.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}} {{$image_position_modifier}}">
    @if ($image)
      {{-- <div class="{{$b}}__image" style="background-image:url({{$image}});"></div> --}}
      <div class="{{$b}}__image-wrap">
        {{ flo_aq_img($class = $b . "__image", $url = $image['url'], $width = 854, $height = 1080, $crop = true, $alt = $image['alt'], $force_sizes = true)}}
      </div>
    @endif
    @if ($title or $title_paragraph or $button)
      <div class="{{$b}}__text-area">
        @if ($title)
          <div class="{{$b}}__title">{{$title}}</div>
        @endif
        @if ($title_paragraph)
          <div class="{{$b}}__title-paragraph">{{$title_paragraph}}</div>
        @endif
        @if ($button)
          <div class="{{$b}}__button-wrap">
            <a href="{{$button['url']}}" class="{{$b}}__button" target="{{$button['target']}}">{{$button['title']}}</a>
          </div>
        @endif
      </div>
    @endif
  </div>
@overwrite
