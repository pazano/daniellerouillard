<?php
$b = "flo-block-featured-link-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

  $elements_color = flo_data($data, "elements_color");
  $background_color = flo_data($data, "background_color");

/* START: Text Area */
  $pretitle = flo_data($data, "pretitle");
  $pretitle_font = flo_data($data, "pretitle_font");
  $title = flo_data($data, "title");
  $title_font = flo_data($data, "title_font");
  $text = flo_data($data, "text");
/* END: Text Area */

/* START: Image Link Area */
  $image = flo_data($data, "image");
  $link_description = flo_data($data, "link_description");
  $link_description_font = flo_data($data, "link_description_font");
  $button = flo_data($data, "button");
  $button_link_font = flo_data($data, "button_link_font");
  $button_link_color = flo_data($data, "button_link_color");
  $button_link_background_color = flo_data($data, "button_link_background_color");
/* END: Image Link Area */

?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

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
    $b__uniq_for_css." ".$b__for_css."__link-description",
    $link_description_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__button",
    $button_link_font
    )
    ."

    ".$b__uniq_for_css." {
      color: ".$elements_color.";
      background-color: ".$background_color.";
    }

    ".$b__uniq_for_css." ".$b__for_css."__button {
      color: ".$button_link_color.";
      background-color: ".$button_link_background_color.";
    }
      ".$b__uniq_for_css." ".$b__for_css."__button:hover {
        color: ".$button_link_background_color.";
        background-color: ".$button_link_color.";
      }

  ",

  "style_name" => $b__uniq
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">

    @if ($pretitle or $title or $text)
      <div class="{{$b}}__text-area">

        @if ($pretitle)
          <span class="{{$b}}__pretitle">
            {{$pretitle}}
          </span>
        @endif

        @if ($title)
          <h2 class="{{$b}}__title">
            {{$title}}
          </h2>
        @endif

        @if ($text)
          <div class="{{$b}}__text flo-post">
            {{$text}}
          </div>
        @endif

      </div>
    @endif

    @if ($image or $link_description or isset($button['title']))
      <div class="{{$b}}__image-link-area">

        @if ($image)
          {{ flo_aq_img($class = $b . "__image", $url = $image['url'], $width = 360, $height = 360, $crop = true, $alt = $image['alt'], $force_resize = true) }}
        @endif

        @if ($link_description or isset($button['title']))
          <div class="{{$b}}__link-wrap">

            @if ($link_description)
              <span class="{{$b}}__link-description">
                {{$link_description}}
              </span>
            @endif

            @if (isset($button['title']) or strlen($button['title']))
              <div class="{{$b}}__button-wrap">
                <a class="{{$b}}__button" href="{{$button['url']}}" target="{{$button['target']}}">
                  {{$button['title']}}
                </a>
              </div>
            @endif

          </div>
        @endif

      </div>
    @endif

  </div>
@overwrite
