<?php
$b = "flo-block-gallery-view-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$stick_block_to_top = flo_data($data, "stick_block_to_top", true);
$stick_block_to_top_class = $stick_block_to_top ? $b."--stuck-to-top" : "";

$display_header = flo_data($data, "display_header");

$display_title_area = flo_data($data, "display_title_area");
$title_area_position = flo_data($data, "title_area_position", "above");
$title_area_position_class = $b . "--title-area-position-" . $title_area_position;
$display_back_button = flo_data($data, "display_back_button");
$back_button_label = flo_data($data, "back_button_label");
$back_button_font = flo_font_data($data, "back_button_font");
$title_font = flo_font_data($data, "title_font");
$display_category = flo_data($data, "display_category");
$category_font = flo_font_data($data, "category_font");
$display_counter = flo_data($data, "display_counter");
$counter_font = flo_font_data($data, "counter_font");

$gallery_view_layout = flo_data($data, "gallery_view_layout");
$gallery_view_layout_class = $b . "--gallery-view-layout-" . $gallery_view_layout;
$image_height = flo_data($data, "image_height", 479) / 16 . "rem";
$image_height_px = flo_data($data, "image_height", 479) * 2;
$gap_between_images = flo_data($data, "gap_between_images", 10) / 16 . "rem";

$arrows_color = flo_data($data, "arrows_color");
$arrows_overlay_color = flo_data($data, "arrows_overlay_color");
$arrows_overlay_opacity = flo_data($data, "arrows_overlay_opacity") / 100;

$first_categ = flo_get_the_first_term( $id = $post->ID, $taxonomy = 'gallery-category', $before = '', $sep = '', $after = '', $linked_terms = true ); //  Linked Cat Name

global $images;
?>
@include('components.flo-generic-gallery-view-data')
@extends('layout.block', [
  "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_gallery_view_1" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__back-button",
      $back_button_font
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
      $b__uniq_for_css." ".$b__for_css."__category",
      $category_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__counter",
      $counter_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
        border-color: ".hex2rgba($elements_color, 0.1).";
      }

      ".$b__uniq_for_css." .is-not-sticky.flo-header {
        color: inherit!important;
        border-color: inherit!important;
        background-color: transparent!important;
      }

      ".$b__uniq_for_css." ".$b__for_css."__arrow {
        color: ".$arrows_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__arrow-overlay {
        background-color: ".$arrows_overlay_color.";
        opacity: ".$arrows_overlay_opacity.";
      }

    ",

    "breakpoint__medium_up" => "
      ".$b__uniq_for_css." ".$b__for_css."__image {
        height: ".$image_height.";
      }
      ".$b__uniq_for_css."".$b__for_css."--gallery-view-layout-b ".$b__for_css."__image-wrap {
        margin: 0 ".$gap_between_images.";
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$gallery_view_layout_class}} {{$title_area_position_class}} {{$stick_block_to_top_class}}">
    {{-- <div class="{{$b}}__placeholder"></div> --}}
    <div class="{{$b}}__content">
      @if ($display_header)
        <div class="{{$b}}__header-area">
          @include('components.flo-header')
        </div>
      @endif

      @if ($display_title_area)
        <div class="{{$b}}__title-area">
          <div class="{{$b}}__back-button-wrap">
            @if ($back_button_label && $display_back_button)
              <a class="{{$b}}__back-button" href="javascript:history.back()">
                {{$back_button_label}}
              </a>
            @endif
          </div>
          <div class="{{$b}}__title-wrap">
            <h1 class="{{$b}}__title">
              {{get_the_title($post->ID)}}
            </h1>
            @if ($display_category)
              <h4 class="{{$b}}__category">
                {{ $first_categ }}
              </h4>
            @endif
          </div>
          <div class="{{$b}}__counter-wrap">
            @if ($display_counter)
              <div class="{{$b}}__counter">
                <div class="{{$b}}__counter-index">
                  01
                </div>
                <div class="{{$b}}__counter-separator"></div>
                <div class="{{$b}}__counter-count">
                  26
                </div>
              </div>
            @endif
          </div>
        </div>
      @endif

      <div class="{{$b}}__images-wrap">
        <div class="{{$b}}__images">
          <?php $i = 0; ?>
          @foreach ($images as $image)
            <div class="{{$b}}__image-wrap">
              <?php $desktop_src = flo_aq($url = $image["full_img"], $width = 99999, $height = $image_height_px, $crop = false, $force_sizes = true);
              if($i <= 2){ ?>
                <img src="{{$desktop_src}}" class="{{$b}}__image" alt="{{$image['alt']}}">
              <?php } else { ?>
                <img class="{{$b}}__image" data-lazy="{{$desktop_src}}" alt="{{$image['alt']}}">
              <?php } ?>
              @if ($image["video_code"])
                @if ($image["video_code"])
                  @include('components.flo-video-embed', [
                  "embed_code" => $image["video_code"]
                  ])
                @endif
              @endif
            </div>
            <?php $i++; ?>
          @endforeach
        </div>
        <div class="{{$b}}__arrow {{$b}}__arrow--prev">
          <div class="{{$b}}__arrow-overlay"></div>
          <i class="flo-icon-triangle-arrow-left"></i>
        </div>
        <div class="{{$b}}__arrow {{$b}}__arrow--next">
          <div class="{{$b}}__arrow-overlay"></div>
          <i class="flo-icon-triangle-arrow-right"></i>
        </div>
      </div>
    </div>

  </div>
@overwrite
