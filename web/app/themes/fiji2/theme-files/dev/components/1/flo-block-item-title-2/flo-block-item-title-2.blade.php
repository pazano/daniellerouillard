<?php
$b = "flo-block-item-title-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

/* START: CATEGORY */
  $display_category = flo_data($data, "display_category");

  switch ($post->post_type) {
    case 'post':
      $cat_term = 'category';
    break;
    case 'gallery':
      $cat_term = 'gallery-category';
    break;
    default:
      $cat_term = false;
    break;
  }
  $category = false;
  if ($cat_term && $categories_list) {
    $category = $categories_list;
  }

  $category_font = flo_data($data, "category_font");
/* END: CATEGORY */

$bgc = flo_data($data, "flo-block__custom_background_color");
$text_area_elements_color = flo_data($data, "text_area_elements_color");

$display_decorative_image = flo_data($data, "display_decorative_image");
$decorative_image = get_field("decorative-image");
$title_font = flo_data($data, "title_font");
$display_category = flo_data($data, "display_category");
$category_font = flo_data($data, "category_font");
$display_date = flo_data($data, "display_date");
$date_font = flo_data($data, "date_font");

$featured_image_height = flo_data($data, "featured_image_height") / 16 . "rem";
$display_featured_image = flo_data($data, "display_featured_image");
$display_featured_image = $display_featured_image && get_the_post_thumbnail_url();
$display_featured_image_class = $display_featured_image ? $b . "--display-featured-image" : "";
if(!$display_featured_image) {
  $featured_image_height = 'auto';
}
$mobile_featured_image_height = flo_data($data, "mobile_featured_image_height", 300) / 16 . "rem";

?>
@extends('layout.block', [
  "block_classes" => "flo-block--no-top-padding", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
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
        color: ".$text_area_elements_color.";
        background-color: ".$bgc.";
      }

    ",

    "breakpoint__medium_up" => "

      ".$b__uniq_for_css." ".$b__for_css."__featured-image {
        min-height: ".$featured_image_height.";
      }

    ",
    "breakpoint__small_only" => "
      ".$b__uniq_for_css." ".$b__for_css."__featured-image {
        height: ".$mobile_featured_image_height.";
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$display_featured_image_class}}">
    @if ($display_featured_image)
      <div class="{{$b}}__featured-image" style='background-image: url({{get_the_post_thumbnail_url()}})'></div>
    @endif
    <div class="{{$b}}__text-area">
      @if ($display_decorative_image && $decorative_image)
        <img class="{{$b}}__decorative-image" src="{{$decorative_image["url"]}}" alt="{{$decorative_image["alt"]}}">
      @endif
      <h1 class="{{$b}}__title">
        {{get_the_title()}}
      </h1>
      @if ( ($display_category && $category) or $display_date)
        <div class="{{$b}}__date-and-category">
          @if ($display_category && $category)
            <h4 class="{{$b}}__category">
              {{$category}}
            </h4>
          @endif
          @if ( ($display_category && $category) or $display_date)
            <div class="{{$b}}__separator"></div>
          @endif
          @if ($display_date)
            <h4 class="{{$b}}__date">
              {{get_the_date()}}
            </h4>
          @endif
        </div>
      @endif
    </div>
  </div>
@overwrite
