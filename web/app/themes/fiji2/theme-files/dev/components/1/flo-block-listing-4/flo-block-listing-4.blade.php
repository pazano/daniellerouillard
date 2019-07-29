<?php
$b = "flo-block-listing-4"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$columns = flo_data($data, "columns");
$gap = flo_data($data, "gap", 44) / 16 . "rem";
$overlay_background_color = flo_data($data, "overlay_background_color");
$overlay_elements_color = flo_data($data, "text_area_elements_color");
$display_decorative_images = flo_data($data, "display_decorative_images");
$title_font = flo_data($data, "title_font");
$display_category = flo_data($data, "display_category");
$category_font = flo_data($data, "category_font");

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block span. e.g. flo-block--full-width
  "data_onready" => "flo_block_listing_4" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
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

      ".$b__uniq_for_css." ".$b__for_css."__overlay {
        color: ".$overlay_elements_color.";
        background-color: ".$overlay_background_color.";
      }

    ",
    "breakpoint__medium_up" => "
      ".$b__uniq_for_css." ".$b__for_css."__item {
        width: calc(100% / ".$columns." - ".$gap." * (".$columns." - 1) / ".$columns.");
        margin-bottom: ".$gap.";
      }

      ".$b__uniq_for_css." {
        margin-bottom: -".$gap.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__item:not(:nth-child(".$columns."n)) {
        margin-right: ".$gap.";
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
          <span class="{{$b}}__featured-image" style='background-image: url({{$item["featured_image_url"]}})'></span>
        @endif
        <span class="{{$b}}__overlay">
          @if ($display_decorative_images && $item["decorative_image"])
            <img class="{{$b}}__decorative-image" src="{{$item["decorative_image"]["url"]}}" alt="{{$item["decorative_image"]["alt"]}}">
          @endif
          <span class="{{$b}}__title">
            {{$item["title"]}}
          </span>
          @if ($display_category)
            <span class="{{$b}}__category">
              {{$item["first_category"]}}
            </span>
          @endif
        </span>
      </a>
    @endforeach
  </div>
@overwrite
