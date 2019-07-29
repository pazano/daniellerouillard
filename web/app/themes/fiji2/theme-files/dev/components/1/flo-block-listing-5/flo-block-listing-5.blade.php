<?php
$b = "flo-block-listing-5"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$columns = flo_data($data, "columns");
$gap = flo_data($data, "gap", 44);
$gap_for_css = $gap/ 16 / 2 . "rem";
$masonry_layout = flo_data($data, "masonry_layout");
$masonry_layout_class = $masonry_layout ? $b . "--masonry" : "";

$display_category = flo_data($data, "display_category");
$category_font = flo_data($data, "category_font");
$title_font = flo_data($data, "title_font");

$overlay_background_color = flo_data($data, "overlay_background_color");
$overlay_opacity = flo_data($data, "overlay_opacity") / 100;
$overlay_padding = flo_data($data, "overlay_padding") / 16 . "rem";
$overlay_elements_color = flo_data($data, "overlay_elements_color");
$display_decorative_icon = flo_data($data, "display_decorative_icon");
$overlay_label = flo_data($data, "overlay_label");
$overlay_label_font = flo_data($data, "overlay_label_font");

$mobile_image_height = flo_data($data, "mobile_image_height") / 16 ."rem";

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block span. e.g. flo-block--full-width
  "data_onready" => "flo_block_listing_5" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
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
      $b__uniq_for_css." ".$b__for_css."__overlay",
      $overlay_label_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__overlay {
        color: ".$overlay_elements_color.";
        width: calc(100% - ".$overlay_padding." * 2);
        height: calc(100% - ".$overlay_padding." * 2);
        transform: translate(".$overlay_padding.", ".$overlay_padding.");
      }

      ".$b__uniq_for_css." ".$b__for_css."__overlay-color {
        background-color: ".$overlay_background_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__text-area {
        color: ".$elements_color.";
      }

    ",
    "breakpoint__medium_up" => "

      ".$b__uniq_for_css." ".$b__for_css."__item {
        width: calc(100% / ".$columns.");
        padding: ".$gap_for_css.";
      }
      .grid-sizer{
        width: calc(100% / ".$columns.");
      }

      ".$b__uniq_for_css." {
        margin: -".$gap_for_css.";
      }
    "

  ])
  <div class="{{$b}} {{$b__uniq}} {{$masonry_layout_class}}">
    @if ($masonry_layout)
        <div class="grid-sizer"></div>
    @endif
    @foreach ($items as $item)
      <?php
        $has_featured_img_class = $item["has_feat_img"] ? $b . "__item--has-featured-image" : "";
      ?>
      <a class="{{$b}}__item {{$has_featured_img_class}}" href="{{$item["url"]}}" style="
      --overlay-opacity: {{$overlay_opacity}};
      --mobile-height: {{$mobile_image_height}};
      ">
        @if ($item["has_feat_img"])
          <span class="{{$b}}__featured-image-wrap">
            @if ($masonry_layout)
              {{$item["featured_image"]}}
            @else
              <span class="{{$b}}__featured-image {{$b}}__featured-image--bgi" style='background-image: url({{$item["featured_image_url"]}});'></span>
            @endif

            @if ($overlay_label or $display_decorative_icon)
              <span class="{{$b}}__overlay">
                <span class="{{$b}}__overlay-color"></span>
                @if ($display_decorative_icon)
                  {{ flo_aq_img($class = $b . "__decorative-image", $url = $item['decorative_image']['url'], $width = 100, $height = 999999, $crop = true, $alt = $item['decorative_image']['alt']) }}
                @endif

                @if ($display_decorative_icon and $overlay_label)
                  <span class="{{$b}}__separator"></span>
                @endif

                @if ($overlay_label)
                  <span class="{{$b}}__overlay-label">
                    {{$overlay_label}}
                  </span>
                @endif

              </span>
            @endif
          </span>
        @endif
        <span class="{{$b}}__text-area">
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
