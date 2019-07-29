<?php
$b = "flo-block-image-links-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "text_elements_color");
$images_list = flo_data($data, "images");
$title_font = flo_data($data, "title_font");
$subtitle_font = flo_data($data, "subtitle_font");

$number_of_images = sizeof($images_list);
$image_number_class = " ";

if ($number_of_images == 3) {
  $image_number_class = $b . "--has-3-images";
}
elseif ($number_of_images == 2) {
  $image_number_class = $b . "--has-2-images";
}
elseif ($number_of_images == 1) {
  $image_number_class = $b . "--has-1-image";
}
?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__link-title",
    $title_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__link-subtitle",
    $subtitle_font
    )
    ."

    ".$b__uniq_for_css."{
      color: ".$elements_color.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}} {{$image_number_class}}">
    @foreach ($images_list as $index => $image)
      <?php
        $link_image = flo_data($image, "image");
        $link_title = flo_data($image, "title");
        $link_subtitle = flo_data($image, "subtitle");
        $url = flo_data($image, "image_url");

        $check_link = $url ? "has-url" : "no-url";

        if ($index == 1) {
          $img_width = 434;
          $img_height = 434;
        }
        else {
          $img_width = 694;
          $img_height = 432;
        }
      ?>
      @if ($url)
        <a href="{{$url}}" class="{{$b}}__link {{$b}}__link--{{$check_link}}">
          <span class="{{$b}}__link-image-wrap">
            {{-- <span class="{{$b}}__link-image {{$b}}__link-image--{{$check_link}}" style="background-image:url({{$link_image["url"]}});"></span> --}}

            {{ flo_aq_img($class = $b . "__link-image ", $url = $link_image['url'], $width = $img_width, $height = $img_height, $crop = true, $alt = $link_image['alt'], $force_sizes = true) }}
          </span>
          <div class="{{$b}}__link-description">
            <span class="{{$b}}__link-title">{{$link_title}}</span>
            <span class="{{$b}}__link-subtitle">{{$link_subtitle}}</span>
          </div>
        </a>
      @else
        <div class="{{$b}}__link {{$b}}__link--{{$check_link}}">
          <div class="{{$b}}__link-image-wrap">
            <div class="{{$b}}__link-image" style="background-image:url({{$link_image["url"]}});" aria-label="{{$link_image["alt"]}}"></div>
          </div>
          <div class="{{$b}}__link-description">
            <h3 class="{{$b}}__link-title">{{$link_title}}</h3>
            <h4 class="{{$b}}__link-subtitle">{{$link_subtitle}}</h4>
          </div>

        </div>
      @endif
    @endforeach
  </div>
@overwrite
