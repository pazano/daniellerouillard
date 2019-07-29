<?php
$b = "flo-block-listing-3"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$featured_image_height = flo_data($data, "featured_image_height");
$featured_image_height_rem = $featured_image_height / 16 ."rem";
$elements_color = flo_data($data, "elements_color");
$background_color = flo_data($data, "background_color");
$display_decorative_images = flo_data($data, "display_decorative_images");
$title_font = flo_data($data, "title_font");
$display_category = flo_data($data, "display_category");
$category_font = flo_data($data, "category_font");
$display_excerpt = flo_data($data, "display_excerpt");
$excerpt_font = flo_data($data, "excerpt_font");
$button_label = flo_data($data, "button_label");
$button_font = flo_data($data, "button_font");

// Mobile Options

$mobile_image_height = flo_data($data, "mobile_featured_image_height");
$mobile_image_height_rem = $mobile_image_height / 16 . "rem";

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
      $b__uniq_for_css." ".$b__for_css."__excerpt",
      $excerpt_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__button",
      $button_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
        border-color: ".hex2rgba($elements_color, 0.3).";
      }
      ".$b__uniq_for_css." ".$b__for_css."__excerpt {
        color: ".hex2rgba($elements_color, 0.7).";
      }
      ".$b__uniq_for_css." ".$b__for_css."__item {
        background-color: ".$background_color.";
      }

    ",

    "breakpoint__medium_up" => "

      ".$b__uniq_for_css." ".$b__for_css."__featured-image {
        height: ".$featured_image_height_rem."
      }

      ".$b__uniq_for_css." ".$b__for_css."__button:hover {
        background-color: ".$elements_color.";
        color: ".$background_color.";
      }

    ",

    "breakpoint__small_only" => "

      ".$b__uniq_for_css." ".$b__for_css."__featured-image {
        height: ".$mobile_image_height_rem."
      }

    "
  ])
  <div class="{{$b}} {{$b__uniq}}">
    @foreach ($items as $item)
      <?php
        $has_featured_img_class = $item["has_feat_img"] ? $b . "__item--has-featured-image" : "";

        $attachment_id = get_post_thumbnail_id($item['id']);

        $img_sizes = array(
         'small' => array('width' => 999999, 'height' => $mobile_image_height * 3),  // mobile size
         'medium' => array('width' => 999999, 'height' => $featured_image_height * 2), // tablet size
         'large' => array('width' => 999999, 'height' => $featured_image_height * 2),
        );

        $img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

      ?>
      <a class="{{$b}}__item {{$has_featured_img_class}}" href="{{$item["url"]}}">
        @if ($item["has_feat_img"])
          <span class="{{$b}}__featured-image" style="{{$img_vars}}"></span>
        @endif
        <span class="{{$b}}__text-area">
          @if ($display_decorative_images && $item["decorative_image"])
            <img class="{{$b}}__decorative-image" src="{{$item["decorative_image"]["url"]}}" alt="">
          @endif
          <span class="{{$b}}__title">
            {{$item["title"]}}
          </span>
          @if ($display_category)
            <span class="{{$b}}__category">
              {{$item["first_category"]}}
            </span>
          @endif
          @if ($display_excerpt && $item["excerpt"])
            <span class="{{$b}}__excerpt">
              <?php
                $ln = 120;
                $excerpt = mb_substr(strip_tags(strip_shortcodes($item["excerpt"])), 0, $ln);
                $delim = "";
                if(strlen($excerpt) > 120) $delim = "...";
              ?>
              {{$excerpt . $delim}}
            </span>
          @endif
          @if ($button_label)
            <span class="{{$b}}__button">
              {{$button_label}}
            </span>
          @endif
        </span>
      </a>
    @endforeach
  </div>
@overwrite
