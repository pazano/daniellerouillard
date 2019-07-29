<?php
$b = "flo-block-mosaic-image-links-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

// A. Title Area
$title_elements_color = flo_data($data, "title_elements_color");
$pre_title = flo_data($data, "pre_title");
$pre_title_font = flo_data($data, "pre_title_font");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
// B. Left Side Images
$left_side_image_links = flo_data($data, "left_side_image_links");
$left_big_image_link_font = flo_data($data, "left_big_image_link_font");
$left_small_images_links_font = flo_data($data, "left_small_images_links_font");
// C. Right Side Images
$right_side_image_links = flo_data($data, "right_side_image_links");
$right_big_image_link_font = flo_data($data, "right_big_image_link_font");
$right_small_images_links_font = flo_data($data, "right_small_images_links_font");
// D. Additional Settings
$image_links_color = flo_data($data, "elements_color");
$left_and_right_image_overlay_color = flo_data($data, "left_and_right_image_overlay_color");
$overlay_opacity = flo_data($data, "overlay_opacity") / 100;

// Mobile Options;

$mobile_gap = flo_data($data, "gap_between_images") / 16;

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    /* START: Title Area */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__pre-title",
      $pre_title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__title-area {
        color: ".$title_elements_color.";
      }

    /* END: Title Area */

    /* START: Left Side */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__left-side-image:not(:last-child)",
      $left_small_images_links_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__left-side-image:last-child",
      $left_big_image_link_font
      )
      ."

    /* END: Left Side */

    /* START: Right Side */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__right-side-image:first-child",
      $right_big_image_link_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__right-side-image:not(:first-child)",
      $right_small_images_links_font
      )
      ."

    /* END: Right Side */

    ".$b__uniq_for_css." ".$b__for_css."__images-area {
      color: ".$image_links_color.";
    }

    ".$b__uniq_for_css." ".$b__for_css."__image-overlay {
      background-color: ".$left_and_right_image_overlay_color.";
      opacity: ".$overlay_opacity.";
    }

  ",

  "breakpoint__small_only" => "


    /* START: Left Side Images */

      ".$b__uniq_for_css." ".$b__for_css."__left-side-image:first-child {
        margin-right: ".$mobile_gap."rem;
      }

      ".$b__uniq_for_css." ".$b__for_css."__left-side-image:last-child {
        margin-bottom: ".$mobile_gap."rem;
      }

      ".$b__uniq_for_css." ".$b__for_css."__left-side-image:not(:last-child) {
        width: calc(50% - ".$mobile_gap / 2 ."rem);
        margin-bottom: ".$mobile_gap."rem;
      }

    /* END: Left Side Images */

    /* START: Right Side Images */

      ".$b__uniq_for_css." ".$b__for_css."__right-side-image:first-child {
        margin-bottom: ".$mobile_gap."rem;
      }

      ".$b__uniq_for_css." ".$b__for_css."__right-side-image:not(:first-child) {
        width: calc(50% - ".$mobile_gap / 2 ."rem);
      }

      ".$b__uniq_for_css." ".$b__for_css."__right-side-image:nth-child(2) {
        margin-right: ".$mobile_gap."rem;
      }

    /* END: Right Side Images */

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    @if ($pre_title or $title)
      <div class="{{$b}}__title-area">
        @if ($pre_title)
          <h3 class="{{$b}}__pre-title">{{$pre_title}}</h3>
        @endif
        @if ($title)
          <h2 class="{{$b}}__title">{{$title}}</h2>
        @endif
      </div>
    @endif
    <div class="{{$b}}__images-area">
      <div class="{{$b}}__left-side-images-area">
        @if ($left_side_image_links)
          @foreach ($left_side_image_links as $index => $single_left_side_image_link)
            <?php
              $left_side_image = flo_data($single_left_side_image_link, "image");
              $left_side_image_link = flo_data($single_left_side_image_link, "image_link");

              $attachment_id = $left_side_image['ID'];

              if($index < 2) { // small images
                $img_sizes = array(
                 'small' => array('width' => 470, 'height' => 328),  // mobile size
                 'medium' => array('width' => 470, 'height' => 328), // tablet size
                 'large' => array('width' => 470, 'height' => 328),
                );


                $img_sizes = apply_filters( 'fiji2_mosaic_image_links_1_small_image_sizes', $img_sizes );
              }
              else
              {
                $img_sizes = array(
                 'small' => array('width' => 780, 'height' => 520),  // mobile size
                 'medium' => array('width' => 780, 'height' => 520), // tablet size
                 'large' => array('width' => 1200, 'height' => 900),
                );


                $img_sizes = apply_filters( 'fiji2_mosaic_image_links_1_large_image_sizes', $img_sizes );
              }

              $img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = true);

            ?>

            <div class="{{$b}}__left-side-image">

              <div class="{{$b}}__image-overlay"></div>

              <div class="{{$b}}__image" style="{{$img_vars}}"></div>

              @if ($left_side_image_link)
                <a href="{{$left_side_image_link['url']}}" class="{{$b}}__left-side-image-link" target="{{$left_side_image_link['target']}}">
                  {{$left_side_image_link['title']}}
                </a>
              @endif

            </div>

          @endforeach
        @endif
      </div>

      <div class="{{$b}}__right-side-images-area">
        @if ($right_side_image_links)
          @foreach ($right_side_image_links as $index => $single_right_side_image_link)
            <?php
              $right_side_image = flo_data($single_right_side_image_link, "image");
              $right_side_image_link = flo_data($single_right_side_image_link, "image_link");

              $attachment_id = $right_side_image['ID'];

              if($index > 0) { // small images
                $img_sizes = array(
                 'small' => array('width' => 470, 'height' => 328),  // mobile size
                 'medium' => array('width' => 470, 'height' => 328), // tablet size
                 'large' => array('width' => 470, 'height' => 328),
                );


                $img_sizes = apply_filters( 'fiji2_mosaic_image_links_1_small_image_sizes', $img_sizes );
              }
              else
              {
                $img_sizes = array(
                 'small' => array('width' => 780, 'height' => 520),  // mobile size
                 'medium' => array('width' => 780, 'height' => 520), // tablet size
                 'large' => array('width' => 1200, 'height' => 900),
                );


                $img_sizes = apply_filters( 'fiji2_mosaic_image_links_1_large_image_sizes', $img_sizes );

              }

              $img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = true);

            ?>

            <div class="{{$b}}__right-side-image">

              <div class="{{$b}}__image-overlay"></div>

              <div class="{{$b}}__image" style="{{$img_vars}}"></div>

              @if ($right_side_image_link)
                <a href="{{$right_side_image_link['url']}}" class="{{$b}}__right-side-image-link" target="{{$right_side_image_link['target']}}">
                  {{$right_side_image_link['title']}}
                </a>
              @endif

            </div>

          @endforeach
        @endif
      </div>

    </div>
  </div>
@overwrite
