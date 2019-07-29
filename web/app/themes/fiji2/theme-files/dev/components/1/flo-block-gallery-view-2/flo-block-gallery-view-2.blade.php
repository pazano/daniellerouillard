<?php
$b = "flo-block-gallery-view-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$columns = flo_data($data, "columns", 2);
$columns_class = $b . "--columns-" . $columns;
$gap = flo_data($data, "gap", 89) / 16;
$gap = $gap / 2 . "rem";
//$image_width = "calc(100% / ".$columns." - ((".$columns." - 1) * ".$gap.") / ".$columns." - 0.05rem )";
$image_width = "calc(100% / " . $columns . ")";
$mobile_columns = flo_data($data, "mobile_columns");
$mobile_image_width = "calc(100% / " . $mobile_columns . ")";
$mobile_gap = flo_data($data, "mobile_gap", 10) / 16;
$mobile_gap = $mobile_gap / 2 . "rem";
global $images;
?>
@include('components.flo-generic-gallery-view-data')

@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_gallery_view_2" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "


    ",
    "breakpoint__medium_up" => "
      .grid-sizer{
        width: ".$image_width.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__image {
        width: ".$image_width.";
        padding: ".$gap.";
      }
      ".$b__uniq_for_css."{
        margin: -".$gap." -".$gap." 0 -".$gap.";
      }
    ",
    "breakpoint__small_only" => "
      .grid-sizer{
        width: ".$mobile_image_width.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__image {
        width: ".$mobile_image_width.";
        padding: ".$mobile_gap.";
      }
      ".$b__uniq_for_css."{
        margin: -".$mobile_gap.";
      }
    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$columns_class}}" data-mobile-cols="{{$mobile_columns}}">
    <div class="grid-sizer"></div>
    <?php
      $i = 1;
      $images_to_preload_count = 10;
      $spacer_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=";
    ?>
    @foreach ($images as $image)
      <?php //debe($images); die();
        if(isset($image['slide']['width']) && isset($image['slide']['height'])){
          $img_width_atr = 'width="'.$image['slide']['width'].'"';
          $img_height_atr = 'height="'.$image['slide']['height'].'"';
        }else{
          $img_width_atr = '';
          $img_height_atr = '';
        }
      ?>
      @if ($i <= $images_to_preload_count)
        <a class="{{$b}}__image" href={{$image["full_img"]}} data-caption="{{$image['slide']['caption']}}" data-fancybox="{{$b__uniq}}" data-srcset="{{$image['srcset']}}">
          <img class="{{$b}}__image-thumb" src="{{$image["img_url_large"]}}" alt="{{$image["alt"]}}" data-width="{{$image['slide']['width']}}" data-height="{{$image['slide']['height']}}" srcset="{{$image['srcset']}}" alt="{{$image['alt']}}">
        </a>
      @elseif ($i > $images_to_preload_count)
        <a class="{{$b}}__image to-appear-disabled lazy" data-caption="{{$image['slide']['caption']}}" href={{$image["full_img"]}} data-fancybox="{{$b__uniq}}" data-srcset="{{$image['srcset']}}">
          <img class="{{$b}}__image-thumb" data-width="{{$image['slide']['width']}}" data-height="{{$image['slide']['height']}}" {{$img_width_atr}} {{$img_height_atr}} src="{{$spacer_src}}" data-src="{{$image["img_url_large"]}}"  alt="{{$image["alt"]}}">
        </a>
      @endif
      <?php
        $i++;
      ?>
    @endforeach
  </div>
@overwrite
