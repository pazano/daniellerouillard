<?php
$b = "flo-block-item-pagination-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$top_labels_font = flo_data($data, "top_labels_font");
$previous_item_label = flo_data($data, "previous_item_label");
$next_item_label = flo_data($data, "next_item_label");
$title_font = flo_data($data, "title_font");

$prev_item = get_previous_post();
$next_item = get_next_post()
?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__top-label",
      $top_labels_font
      )
      ."
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."
      ".$b__uniq_for_css." {
        color: ".$elements_color.";
        border-color: ".hex2rgba($elements_color, 0.3).";
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}}">

    @if ($prev_item)
      <?php
        $item = $prev_item;
        $url = get_the_permalink($item->ID);

        $image = get_the_post_thumbnail_url($item->ID, "small");
        $has_image =  $image;
        $has_image_class = $has_image ? $b . "__link--has-image" : "";

        $title = get_the_title($item->ID);
      ?>
      <a href="{{$url}}" class="{{$b}}__link {{$b}}__link--prev {{$has_image_class}}">
        @if ($has_image)
          <span class="{{$b}}__featured-image" style="background-image: url({{
            $cropped_image = flo_aq($url = $image, $width = 400, $height = 400, $crop = true);
          }})"></span>
        @endif
        <span class="{{$b}}__top-label">
          {{$previous_item_label}}
        </span>
        <h4 class="{{$b}}__title">
          {{$title}}
        </h4>
        <span class="{{$b}}__link-icon">
          <i class="flo-icon-line-arrow-left"></i>
        </span>
      </a>
    @else
      <div class="{{$b}}__spacer"></div>
    @endif

    @if ($next_item)
      <?php
        $item = $next_item;
        $url = get_the_permalink($item->ID);

        $image = get_the_post_thumbnail_url($item->ID, "small");
        $has_image =  $image;
        $has_image_class = $has_image ? $b . "__link--has-image" : "";

        $title = get_the_title($item->ID);
      ?>
      <a href="{{$url}}" class="{{$b}}__link {{$b}}__link--next {{$has_image_class}}">
        @if ($has_image)
          <span class="{{$b}}__featured-image" style="background-image: url({{$cropped_image = flo_aq($url = $image, $width = 400, $height = 400, $crop = true);}})"></span>
        @endif
        <span class="{{$b}}__top-label">
          {{$next_item_label}}
        </span>
        <h4 class="{{$b}}__title">
          {{$title}}
        </h4>

        <span class="{{$b}}__link-icon">
          <i class="flo-icon-line-arrow-right"></i>
        </span>
      </a>
    @else
      <div class="{{$b}}__spacer"></div>
    @endif

  </div>
@overwrite
