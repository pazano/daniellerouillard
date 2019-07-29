<?php
$b = "flo-block-image-links-4"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$image_links_list = flo_data($data, "image_links_list");
$text_area_background_color = flo_data($data, "text_area_background_color");
$text_area_elements_color = flo_data($data, "text_area_elements_color");
$pretitle_font = flo_data($data, "pretitle_font");
$title_font = flo_data($data, "title_font");
$subtitle_font = flo_data($data, "subtitle_font");
$button_link_font = flo_data($data, "button_link_font");
$button_color = flo_data($data, "button_color");
$button_background_color = flo_data($data, "button_background_color");

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
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
    $b__uniq_for_css." ".$b__for_css."__subtitle",
    $subtitle_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__button",
    $button_link_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__button {
      color: ".$button_color.";
      background-color: ".$button_background_color.";
    }
      ".$b__uniq_for_css." ".$b__for_css."__button:hover {
        color: ".$button_background_color.";
        background-color: ".$button_color.";
      }

  ",

  "style_name" => $b__uniq
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    @if ($image_links_list)
      @foreach ($image_links_list as $key => $single_image_link)

        <?php
          $area_type = flo_data($single_image_link, "area_type");
          $image = flo_data($single_image_link, "image");
          $text_area_background_color = flo_data($single_image_link, "text_area_background_color");
          $text_area_elements_color = flo_data($single_image_link, "text_area_elements_color");
          $pretitle = flo_data($single_image_link, "pretitle");
          $title = flo_data($single_image_link, "title");
          $subtitle = flo_data($single_image_link, "subtitle");
          $button = flo_data($single_image_link, "button");
        ?>

        @if ($area_type == "image")
          <div class="{{$b}}__image-link {{$b}}__image-link--image">
            {{ flo_aq_img($class = $b . "__image", $url = $image['url'], $width = 1080, $height = 900, $crop = true, $alt = $image['alt'], $force_resize = true) }}
          </div>
        @elseif ($area_type == "text_area")
          <div class="{{$b}}__image-link {{$b}}__image-link--text-area" style="
          color: {{$text_area_elements_color}};
          background-color: {{$text_area_background_color}}
          ">

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

            @if ($subtitle)
              <h3 class="{{$b}}__subtitle">
                {{$subtitle}}
              </h3>
            @endif

            @if (isset($button['title']) and strlen($button['title']))
              <div class="{{$b}}__button-wrap">
                <a class="{{$b}}__button" href="{{$button['url']}}" target="{{$button['target']}}">
                  {{$button['title']}}
                </a>
              </div>
            @endif

          </div>
        @endif

      @endforeach
    @endif

  </div>
@overwrite
