<?php
$b = "flo-block-video-block-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

// A. Title Area
$title_area_elements_color = flo_data($data, "title_area_elements_color");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$title_decorative_icon = flo_data($data, "title_decorative_icon");
// B. Image Area
$image = flo_data($data, "image");
$image_height = flo_data($data, "image_height");
$video_embed_code = flo_data($data, "video_embed_code");
$video_embed_button_background_color = flo_data($data, "video_embed_button_icon_color");
// B.2. Image Title Area
$image_title_area_elements_color = flo_data($data, "image_title_area_elements_color");
$text_elements_position = flo_data($data, "text_elements_position");
$image_pretitle = flo_data($data, "image_pretitle");
$image_pretitle_font = flo_data($data, "image_pretitle_font");
$image_title = flo_data($data, "image_title");
$image_title_font = flo_data($data, "image_title_font");


$image_height_rem = $image_height / 16 ."rem";
$text_elements_position_class = "";
 switch ($text_elements_position) {
  case 'left':
    $text_elements_position_class = $b."__image-wrap--text-position-left";
    break;
  case 'right':
    $text_elements_position_class = $b."__image-wrap--text-position-right";
  break;
  case 'center':
    $text_elements_position_class = $b."__image-wrap--text-position-center";
  break;
  default:
    $text_elements_position_class = $b."__image-wrap--text-position-left";
    break;
}

// Mobile Options
$mobile_image_height = flo_data($data, "mobile_image_height");
$mobile_image_height_rem = $mobile_image_height  / 16 ."rem";

$attachment_id = $image['id'];

$img_sizes = array(
 'small' => array('width' => 99999, 'height' => $mobile_image_height * 2),  // mobile size
 'medium' => array('width' => 99999, 'height' => $image_height * 2), // tablet size
 'large' => array('width' => 999999, 'height' => $image_height * 2),
);

$img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

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
    $b__uniq_for_css." ".$b__for_css."__image-pretitle",
    $image_pretitle_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__image-title",
    $image_title_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__title-wrap {
      color: ".$title_area_elements_color.";
    }
    ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
      color: ".$image_title_area_elements_color.";
    }
    .flo-video-embed__video-button {
      background-color: ".$image_title_area_elements_color.";
      color: ".$video_embed_button_background_color."!important;
    }

    ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
      height: ".$image_height_rem.";
    }

  ",
  "breakpoint__small_only" => "

    ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
      height: ".$mobile_image_height_rem.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    @if ($title or $title_decorative_icon)
      <div class="{{$b}}__title-wrap">
        @if ($title_decorative_icon)
          <img class="{{$b}}__title-decorative-icon" alt="{{$title_decorative_icon['alt']}}" src="{{$title_decorative_icon['url']}}">
        @endif
        @if ($title)
          <h2 class="{{$b}}__title">{{$title}}</h2>
        @endif
      </div>
    @endif
    <div class="{{$b}}__image-wrap {{$text_elements_position_class}}" style="{{$img_vars}}" aria-label="{{$image['alt']}}">
      @if ($video_embed_code)
        @include('components.flo-video-embed', [
          "embed_code" => $video_embed_code
        ])
      @endif
      <div class="{{$b}}__text-elements-wrap">
        @if ($image_pretitle)
          <h4 class="{{$b}}__image-pretitle">{{$image_pretitle}}</h3>
        @endif
        @if ($image_title)
          <h3 class="{{$b}}__image-title">{{$image_title}}</h2>
        @endif
      </div>
    </div>
  </div>
@overwrite
