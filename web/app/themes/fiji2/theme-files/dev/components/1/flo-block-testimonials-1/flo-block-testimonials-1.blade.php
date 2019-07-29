<?php
$b = "flo-block-testimonials-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$background_color = flo_data($data, "background_color");
$testimonial_items_list = flo_data($data, "testimonial_items_list");
$testimonial_title_font = flo_data($data, "testimonial_title_font");
$title_decorative_letter_font = flo_data($data, "title_decorative_letter_font");
$testimonial_text_font = flo_data($data, "testimonial_text_font");
$testimonial_counter = flo_data($data, "testimonial_counter");
$testimonial_counter_font = flo_data($data, "testimonial_counter_font");

$total_testimonials_number = count($testimonial_items_list);
$display_arrows_class = $total_testimonials_number == 1 ? $b."__arrows--hide-arrows" : "";
$run_multiple_testimonials = $total_testimonials_number > 1 ? "flo_testimonials_1" : "";

$crop_desktop_images_class = flo_data($data, "crop_images") == 'crop' ? '' : $b . '__image--no-crop';
$crop_mobile_images_class = flo_data($data, "crop_mobile_images") == 'crop' ? '' : $b . '__mobile-image--no-crop';

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => $run_multiple_testimonials // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__title",
    $testimonial_title_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__decorative-letter",
    $title_decorative_letter_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__text",
    $testimonial_text_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__testimonial-counter",
    $testimonial_counter_font
    )
    ."

    ".$b__uniq_for_css." {
      color: ".$elements_color.";
      background-color: ".$background_color.";
    }
    ".$b__uniq_for_css." ".$b__for_css."__number-divider {
      background-color: ".$elements_color.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    <div class="{{$b}}__testimonials-slider {{$crop_desktop_images_class}} {{$crop_mobile_images_class}}">
      @foreach ($testimonial_items_list as $item_number => $testimonial_item)
        <?php
          $testimonial_image = flo_data($testimonial_item, "testimonial_image");
          $testimonial_image['url'] = flo_aq($url = $testimonial_image['url'], $width = '99999', $height = '960', $crop = false, $force_sizes = true);
          $testimonial_title = flo_data($testimonial_item, "testimonial_title");
          $title_decorative_letter = flo_data($testimonial_item, "title_decorative_letter");
          $testimonial_text = flo_data($testimonial_item, "testimonial_text");

        ?>
        <div class="{{$b}}__testimonial-slide">
          <div class="{{$b}}__testimonial-slide-content">

            <div class="{{$b}}__testimonial-image" style="background-image:url({{$testimonial_image['url']}});" aria-label="{{$testimonial_image['alt']}}"></div>
            <div class="{{$b}}__testimonial-text-area">
              @if ($title_decorative_letter)
                <div class="{{$b}}__decorative-letter">{{$title_decorative_letter}}</div>
              @endif
              @if ($testimonial_title)
                <div class="{{$b}}__title">{{$testimonial_title}}</div>
              @endif
              @if ($testimonial_text)
                <div class="{{$b}}__text">{{$testimonial_text}}</div>
              @endif
              @if ($testimonial_counter)
                <div class="{{$b}}__testimonial-counter">
                  <div class="{{$b}}__current-item-number">0{{$item_number + 1}}</div>
                  <div class="{{$b}}__number-divider"></div>
                  <div class="{{$b}}__total-item-number">0{{$total_testimonials_number}}</div>
                </div>
              @endif
            </div>
          </div>
        </div>
      @endforeach
    </div>
    <div class="{{$b}}__arrows {{$display_arrows_class}}">
      <i class="{{$b}}__arrow {{$b}}__arrow--left flo-icon-line-arrow-left {{$b}}__slide-previous"></i>
      <i class="{{$b}}__arrow {{$b}}__arrow--right flo-icon-line-arrow-right {{$b}}__slide-next"></i>
    </div>
  </div>
@overwrite
