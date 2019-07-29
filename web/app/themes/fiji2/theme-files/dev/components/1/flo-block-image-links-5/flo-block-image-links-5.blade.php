<?php
$b = "flo-block-image-links-5"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

  $elements_color = flo_data($data, "elements_color");
  $lines_color = flo_data($data, "lines_color");

/* START: Title Area */
  $block_title = flo_data($data, "title");
  $block_title_font = flo_data($data, "title_font");
  $block_subtitle = flo_data($data, "subtitle");
  $block_subtitle_font = flo_data($data, "subtitle_font");
/* END: Title Area */

/* START: Image Links */
  $image_links = flo_data($data, "image_links");
  $pretitle_font = flo_data($data, "pretitle_font");
  $display_pretitle_background = flo_data($data, "display_pretitle_background");
  $display_pretitle_background_class = $display_pretitle_background ? $b."__pretitle--with-bg" : "";
  $title_font = flo_data($data, "title_font");
  $description_font = flo_data($data, "description_font");
  $button_link_font = flo_data($data, "button_link_font");
  $button_link_color = flo_data($data, "button_link_color");
  $button_background_color = flo_data($data, "button_background_color");

  $nr_of_img_links = count($image_links);
  $img_links_class = $nr_of_img_links == 3 ? $b."__image-links-area--3-links" : "";
/* END: Image Links */

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    ".$b__uniq_for_css." {
      color: ".$elements_color.";
      border-color: ".$lines_color.";
    }

    /* START: Title Area */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__block-title",
      $block_title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__block-subtitle",
      $block_subtitle_font
      )
      ."

    /* END: Title Area */

    /* START: Image Links */

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
      $b__uniq_for_css." ".$b__for_css."__description",
      $description_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__button",
      $button_link_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__button {
        color: ".$button_link_color.";
        background-color: ".$button_background_color.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__button:hover {
        color: ".$button_background_color.";
        background-color: ".$button_link_color.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__pretitle--with-bg {
        margin-right: -".$pretitle_font['offset']."em;
      }
      ".$b__uniq_for_css." ".$b__for_css."__pretitle--with-bg:before {
        left: calc(50% - ".$pretitle_font['offset'] / 2 ."em);
        background-color: ".$lines_color.";
      }

    /* END: Image Links */

  ",

  "style_name" => $b__uniq
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">

    @if ($block_title or $subtitle)
      <div class="{{$b}}__title-area">

        @if ($block_title)
          <h2 class="{{$b}}__title">
            {{$block_title}}
          </h2>
        @endif

        @if ($block_subtitle)
          <h3 class="{{$b}}__block-subtitle">
            {{$block_subtitle}}
          </h3>
        @endif

      </div>
    @endif

    @if ($image_links)
      <div class="{{$b}}__image-links-area {{$img_links_class}}">
        @foreach ($image_links as $key => $image_link)

          <?php
            $image = flo_data($image_link, "image");
            $pretitle = flo_data($image_link, "pretitle");
            $title = flo_data($image_link, "title");
            $description = flo_data($image_link, "description");
            $button_link = flo_data($image_link, "button_link");

            $image_missing_class = "";

            if ($key % 3 === 1) {
              if ($image == false) {
                $image_missing_class = $b."__image-link--image-missing";
              }
            }
          ?>

          <div class="{{$b}}__image-link {{$image_missing_class}}">

            @if ($image)
              {{ flo_aq_img($class = $b . "__image", $url = $image['url'], $width = 630, $height = 630, $crop = true, $alt = $image['alt'], $force_resize = true) }}
            @endif

            @if ($pretitle)
              <h3 class="{{$b}}__pretitle {{$display_pretitle_background_class}}">
                {{$pretitle}}
              </h3>
            @endif

            @if ($title)
              <h4 class="{{$b}}__title">
                {{$title}}
              </h4>
            @endif

            @if ($description)
              <p class="{{$b}}__description">
                {{$description}}
              </p>
            @endif

            @if (isset($button_link['title']) and strlen($button_link['title']))
              <div class="{{$b}}__button-wrap">
                <a class="{{$b}}__button" href="{{$button_link['url']}}" target="{{$button_link['target']}}">
                  {{$button_link['title']}}
                </a>
              </div>
            @endif

          </div>

        @endforeach
      </div>
    @endif

  </div>
@overwrite
