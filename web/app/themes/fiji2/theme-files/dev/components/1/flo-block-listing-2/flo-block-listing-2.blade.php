<?php
$b = "flo-block-listing-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$featured_image_height = flo_data($data, "featured_image_height") / 16 ."rem";
$text_area_background_color = flo_data($data, "text_area_background_color");
$text_area_elements_color = flo_data($data, "text_area_elements_color");
$display_decorative_images = flo_data($data, "display_decorative_images");
$title_font = flo_data($data, "title_font");
$display_category = flo_data($data, "display_category");
$category_font = flo_data($data, "category_font");
$display_date = flo_data($data, "display_date");
$date_font = flo_data($data, "date_font");
$crop_img = flo_data($data, "crop_feat_img_b");

// Mobile Options

$mobile_image_height = flo_data($data, "mobile_image_height") /16 ."rem";
?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block span. e.g. flo-block--full-width
  // "data_onready" => "flo_block_listing_1" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('components.flo-generic-listing-items-data')
<?php
  global $items;
?>
@section('block_content')
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
      $b__uniq_for_css." ".$b__for_css."__category",
      $category_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__date",
      $date_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__text-area {
        background-color: ".$text_area_background_color.";
        color: ".$text_area_elements_color.";
        border-bottom: 1px solid;
        border-color: transparent;
      }

      ".$b__uniq_for_css." ".$b__for_css."__hover-line {
        background-color: ".hex2rgba($text_area_elements_color, 0.4).";
      }

      ".$b__uniq_for_css." ".$b__for_css."__featured-image-border {
        border-color: ".$text_area_background_color.";
      }

    ",

    "breakpoint__medium_up" => "

      ".$b__uniq_for_css." ".$b__for_css."__featured-image-bg {
        height: ".$featured_image_height.";
      }

    ",

    "breakpoint__small_only" => "

      ".$b__uniq_for_css." ".$b__for_css."__featured-image-bg {
        height: ".$mobile_image_height.";
      }

    "
  ])
  <div class="{{$b}} {{$b__uniq}}">
    @foreach ($items as $item)
      <?php
        $has_featured_img_class = $item["has_feat_img"] ? $b . "__item--has-featured-image" : "";
      ?>
      <a class="{{$b}}__item {{$has_featured_img_class}}" href="{{$item["url"]}}">
        @if ($item["has_feat_img"])
          @if ($crop_img)

            <?php

              $attachment_id = get_post_thumbnail_id($item['id']);

              $img_sizes = array(
               'small' => array('width' => 1000, 'height' => 9999),  // mobile size
               'medium' => array('width' => 2000, 'height' => 9999), // tablet size
               'large' => array('width' => 2000, 'height' => 999999),
              );

              $img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);
            ?>
            <span class="{{$b}}__featured-image-bg" style="{{$img_vars}}"></span>
          @else
            <span class="{{$b}}__featured-image">
              {{$item['featured_image']}}
            </span>
          @endif
        @endif
        <span class="{{$b}}__text-area">

          @if ($display_decorative_images && $item["decorative_image"])
            <img class="{{$b}}__decorative-image" src="{{$item["decorative_image"]["url"]}}">
          @endif

          <span class="{{$b}}__title">{{$item["title"]}}</span>

          @if ($display_date or $display_category)
            <span class="{{$b}}__date-and-category-wrap">

              @if ($display_category)
                <span class="{{$b}}__category">
                  {{$item["first_category"]}}
                </span>
              @endif

              @if ($display_category or $display_date)
                <span class="{{$b}}__separator"></span>
              @endif

              @if ($display_date && $item["date"])
                <span class="{{$b}}__date">
                  {{$item["date"]}}
                </span>
              @endif

            </span>
          @endif

          <span class="{{$b}}__hover-line"></span>

        </span>
      </a>
    @endforeach
  </div>
@overwrite
