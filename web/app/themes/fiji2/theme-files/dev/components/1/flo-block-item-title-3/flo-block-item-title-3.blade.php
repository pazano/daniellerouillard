<?php
$b = "flo-block-item-title-3"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$image_focus_position = get_field("featured_image_position");
/* START: GENERIC */
  $elements_color = flo_data($data, "elements_color");
/* END: GENERIC */

/* START: HEADER */
  $display_header = flo_data($data, "display_header");
  $display_header_class = $display_header ? $b."--has-header-inside" : "";
/* END: HEADER */

/* START: FEATURED IMAGE */
  $display_featured_image = flo_data($data, "display_featured_image");
  $featured_image = get_the_post_thumbnail_url($post->ID, "full");
  $feat_img_data = wp_get_attachment_metadata(get_post_thumbnail_id($post->ID));
  $orientation_class = 'landscape';

  $overlay_color = flo_data($data, "overlay_color");
  $overlay_opacity = flo_data($data, "overlay_opacity") / 100;

  if(isset($feat_img_data['width']) && isset($feat_img_data['height']) ){
    if($feat_img_data['width'] <= $feat_img_data['height']){
      $orientation_class = 'portrait';
    }
  }

  $display_featured_image = $display_featured_image && $featured_image;
  $featured_image_position = flo_data($data, "featured_image_position");
  $featured_image_position_class = $display_featured_image ? $b."--featured-image-position-".$featured_image_position : "";
  $elements_color_on_featured_image = flo_data($data, "elements_color_on_featured_image");
  if ($display_featured_image && $featured_image_position == "bg") {
    $elements_color = $elements_color_on_featured_image;
  }
/* END: FEATURED IMAGE */

/* START: DATE */
  $display_date = flo_data($data, "display_date");
  $date_font = flo_data($data, "date_font");
/* END: DATE */

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

/* START: TITLE */
  $title_font = flo_data($data, "title_font");
/* END: TITLE */

/* START: EXCERPT */
  $display_excerpt = flo_data($data, "display_excerpt");
  $excerpt_font = flo_data($data, "excerpt_font");
  $use_custom_excerpt = flo_data($data, "use_custom_excerpt");
  $custom_excerpt = flo_data($data, "custom_excerpt");

  $excerpt = false;
  if ($display_excerpt) {
    if ($use_custom_excerpt) {
      if ($custom_excerpt) {
        $excerpt = $custom_excerpt;
      }
    } else {
      $excerpt = flo_get_post_excerpt($post, $ln = 200, $subfix = '...');
    }
  }
/* END: EXCERPT */
?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width {$b}-block", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__date",
      $date_font
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
      $b__uniq_for_css." ".$b__for_css."__title, h1.product_title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__excerpt",
      $excerpt_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
        border-color: ".$elements_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__image-overlay {
        background-color: ".$overlay_color.";
        opacity: ".$overlay_opacity.";
      }
      
      ".$b__uniq_for_css." ".$b__for_css."__featured-image {
        background-position: ".$image_focus_position["x"]." ".$image_focus_position["y"].";
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$featured_image_position_class}} {{$display_header_class}}">
    @if ($display_header)
      <div class="{{$b}}__header-area">
        @include('components.flo-header')
      </div>
    @endif

    @if ($display_featured_image)
      @if ($featured_image_position == "above" || $featured_image_position == "below")
        <img class="{{$b}}__featured-image {{$b}}__featured-image--img-{{$orientation_class}} {{$b}}__featured-image--{{$featured_image_position}}" src="{{$featured_image}}" alt="{{$post->post_title}}">
      @elseif ($featured_image_position == "bg")
        <div class="{{$b}}__featured-image {{$b}}__featured-image--bgi {{$b}}__featured-image--{{$featured_image_position}}" style="background-image: url({{$featured_image}})">
          <div class="{{$b}}__image-overlay"></div>
      </div>
      @endif
    @endif

    <div class="{{$b}}__text-area-wrap">
      <div class="{{$b}}__text-area">
        <h5 class="{{$b}}__date-and-category">
          @if ($display_date)
            <span class="{{$b}}__date">
              {{get_the_date("", $post->ID)}}
            </span>
          @endif
          @if ($display_category && $category)
            <span class="{{$b}}__category">
              /
              {{$category}}
            </span>
          @endif
        </h5>
        <h1 class="{{$b}}__title">{{$post->post_title}}</h1>
        @if ($excerpt)
          <div class="{{$b}}__excerpt">
            {{$excerpt}}
          </div>
        @endif
      </div>
    </div>
  </div>
@overwrite
