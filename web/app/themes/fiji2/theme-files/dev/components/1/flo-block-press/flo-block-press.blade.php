<?php
$b = "flo-block-press"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$line_color = flo_data($data, "line_color");
$title = flo_data($data, "title");
$press_images = flo_data($data, "press_images");
$layout_type = flo_data($data, "layout_type", "grid");

if ($layout_type == "grid") {
  $layoutClass = $b . "__grid";
} else {
  $layoutClass = $b . "__slider";
  $elnumber = flo_data($data, "sliderNumber", 4);
}

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_numeric_details" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "
      ".$b__uniq_for_css." {
        border-color: ".$line_color.";
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$layoutClass}}">
    @if ($title)
      <div class="{{$b}}__title flo-post">
        <h3>{{$title}}</h3>
      </div>
    @endif
    
    <div class="{{$b}}__press-images">
      @if ($press_images)
        @if ($layout_type == "grid") 
          <div class="{{$b}}__press-images-wrap">
            
            @foreach ($press_images as $key => $press_image)
              <a class="{{$b}}__press-image-link" href="{{$press_image['link']}}">
                {{ flo_aq_img($class = $b . "__press-image", $url = $press_image['image']['url'], $width = 400, $height = 9999, $crop = false, $alt = $press_image['image']['alt']) }}
              </a>
            @endforeach
          </div>
        @else 
          <?php 
            if(count($press_images) <= $elnumber) {
              $elnumber = count($press_images) - 1;
            }
          ?>
            <div class="{{$b}}__slides" data-elements="{{$elnumber}}">
              @foreach ($press_images as $key => $press_image)
                <a class="{{$b}}__press-image-link" href="{{$press_image['link']}}">
                  {{ flo_aq_img($class = $b . "__press-image", $url = $press_image['image']['url'], $width = 400, $height = 9999, $crop = false, $alt = $press_image['image']['alt']) }}
                </a>
              @endforeach
            </div>
            <div class="{{$b}}__arrow {{$b}}__arrow--prev">
              <i class="flo-icon-triangle-arrow-left"></i>
            </div>

            <div class="{{$b}}__arrow {{$b}}__arrow--next">
              <i class="flo-icon-triangle-arrow-right"></i>
            </div>
        @endif
      @endif
    </div>
  </div>
@overwrite
