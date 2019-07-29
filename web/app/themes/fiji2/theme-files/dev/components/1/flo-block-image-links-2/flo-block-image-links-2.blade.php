<?php
$b = "flo-block-image-links-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$number_of_columns = flo_data($data, "number_of_columns");
if(!is_numeric($number_of_columns)) {
  $number_of_columns = 4;
}

$gap_between_image_links = flo_data($data, "gap_between_image_links") / 16 . "rem";
$gap_between_image_links_numeric = flo_data($data, "gap_between_image_links") / 16;

if(!is_numeric($gap_between_image_links_numeric)) {
  $gap_between_image_links_numeric = 12;
}
// Because the user can set the number of columns dynamically, if he chooses 2 columns for example
// there is only 1 gap between them, so we must re-calculate the space taken from each item
// to have the correct spacing in between them.
$gap_per_item = ($gap_between_image_links_numeric * $number_of_columns - 1) / $number_of_columns;

$images_height = flo_data($data, "images_height");
$images_height_px = $images_height . "px";
$image_links_list = flo_data($data, "image_links_list");
$image_link_title_font = flo_data($data, "image_link_title_font");
$image_link_subtitle_font = flo_data($data, "image_link_subtitle_font");
$title_default_color = flo_data($data, "title_default_color");
$image_links_background_color_on_hover = flo_data($data, "image_links_background_color_on_hover");
$background_color_opacity = flo_data($data, "background_color_opacity") / 100;
$title_and_subtitle_color_on_hover = flo_data($data, "title_and_subtitle_color_on_hover");


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
    $image_link_title_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__subtitle",
    $image_link_subtitle_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__image-content {
      color: ".$title_default_color.";
      background-color: transparent;
    }
      ".$b__uniq_for_css." ".$b__for_css."__image-link:hover ".$b__for_css."__image-content {
        background-color: ".hex2rgba($image_links_background_color_on_hover,$background_color_opacity).";
        color: ".$title_and_subtitle_color_on_hover.";
      }

    ".$b__uniq_for_css." ".$b__for_css."__image-link {
      width: calc(100% / ".$number_of_columns." - ".$gap_per_item."rem);
      height: ".$images_height_px.";
    }
  ",
  "breakpoint__small_only" => "
  ".$b__uniq_for_css." ".$b__for_css."__image-content {
    background-color: ".hex2rgba($image_links_background_color_on_hover,$background_color_opacity).";
    color: ".$title_and_subtitle_color_on_hover.";
  }
  ".$b__uniq_for_css." ".$b__for_css."__image-link {
    margin-bottom: ".$gap_between_image_links.";
  }
  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    <div class="{{$b}}__links-wrap">
      @if(is_array($image_links_list))
        @foreach ($image_links_list as $image_link)
          <?php
            $url = flo_data($image_link, "url");
            $image = flo_data($image_link, "image");
            $title = flo_data($image_link, "title");
            $subtitle = flo_data($image_link, "subtitle");


            $attachment_id = $image['ID'];

            $img_sizes = array(
             'small' => array('width' => 1280, 'height' => 99999),  // mobile size
             'medium' => array('width' => 99999, 'height' => $images_height * 2), // tablet size
             'large' => array('width' => 99999, 'height' => $images_height * 3),
            );

            $img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

          ?>
          <div class="{{$b}}__image-link" style="--number-of-columns:{{$number_of_columns}};">
            <div class="{{$b}}__image" style="{{$img_vars}}" aria-label="{{$image['alt']}}">
              @if ($title or $subtitle)
                <div class="{{$b}}__image-content">
                  @if ($title)
                    <h3 class="{{$b}}__title">{{$title}}</h3>
                  @endif
                  @if ($subtitle)
                    <h4 class="{{$b}}__subtitle">{{$subtitle}}</h4>
                  @endif
                </div>
              @endif
            </div>
            @if ($url)
              <a class="{{$b}}__link" href="{{$url}}"></a>
            @endif
          </div>
        @endforeach
      @endif
    </div>
  </div>
@overwrite
