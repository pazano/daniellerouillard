{{-- NOTE: GENERATED BY GULP !!! --}}<?php
$b = "flo-block-image-links-3"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation
$elements_color = flo_data($data, "elements_color");
$title_area_background_color = flo_data($data, "title_area_background_color");
$title_area_position = flo_data($data, "title_area_position");
$image_links = flo_data($data, "image_links");
$pretitle_font = flo_data($data, "pretitle_font");
$title_font = flo_data($data, "title_font");
$image_links_number_font = flo_data($data, "image_links_number_font");

$total_image_links_number = count($image_links);
$display_arrows_class = $total_image_links_number == 1 ? $b."__navigation-wrap--hide-arrows" : "";
$check_if_slick_is_needed = $total_image_links_number > 1 ? "flo_image_links_3" : "";

$title_area_position_class = $title_area_position == "left" ? $b."__image-links-slide-content--title-area-left" : $b."__image-links-slide-content--title-area-right";
?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
   "data_onready" => $check_if_slick_is_needed // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__pretitle",
    $pretitle_font
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
    $b__uniq_for_css." ".$b__for_css."__image-links-counter",
    $image_links_number_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__title-area {
      color: ".$elements_color.";
      background-color: ".$title_area_background_color.";
    }
    ".$b__uniq_for_css." ".$b__for_css."__number-divider {
      background-color: ".$elements_color.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    <div class="{{$b}}__image-links-slider">
      @foreach ($image_links as $item_number => $image_link)
        <?php
          $image = flo_data($image_link, "image");
          $url = flo_data($image_link, "url");
          $pretitle = flo_data($image_link, "pretitle");
          $title = flo_data($image_link, "title");


          $attachment_id = $image['ID'];

          $img_sizes = array(
           'small' => array('width' => 99999, 'height' => 750),  // mobile size
           'medium' => array('width' => 1140, 'height' => 99999), // tablet size
           'large' => array('width' => 1140, 'height' => 99999),
          );

          $img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

        ?>
        <div class="{{$b}}__image-links-slide">
          <div class="{{$b}}__image-links-slide-content {{$title_area_position_class}}">
            <div class="{{$b}}__title-area">

            @if ($url)
              {{-- START: IN CASE URL IS ADDED --}}
                @if ($pretitle)
                  <h4 class="{{$b}}__pretitle">
                    {{$pretitle}}
                  </h4>
                @endif
                @if ($title)
                  <a class="{{$b}}__title" href="{{$url}}">{{$title}}</a>
                @endif
              {{-- END: IN CASE URL IS ADDED --}}
            @else
              {{-- START: IN CASE NO URL IS ADDED --}}
                @if ($pretitle)
                  <h4 class="{{$b}}__pretitle">
                    {{$pretitle}}
                  </h4>
                @endif
                @if ($title)
                  <h3 class="{{$b}}__title">{{$title}}</h3>
                @endif
              {{-- END: IN CASE NO URL IS ADDED --}}
            @endif

            <div class="{{$b}}__navigation-wrap {{$display_arrows_class}}">
              <i class="{{$b}}__arrow {{$b}}__arrow--left flo-icon-line-arrow-left {{$b}}__slide-previous"></i>
              <div class="{{$b}}__image-links-counter">
                <div class="{{$b}}__current-item-number">0{{$item_number + 1}}</div>
                <div class="{{$b}}__number-divider"></div>
                <div class="{{$b}}__total-items-number">0{{$total_image_links_number}}</div>
              </div>
              <i class="{{$b}}__arrow {{$b}}__arrow--right flo-icon-line-arrow-right {{$b}}__slide-next"></i>
            </div>
            </div>
            <div class="{{$b}}__image" style="{{$img_vars}}">
            </div>
          </div>
        </div>
      @endforeach
    </div>
  </div>
@overwrite
