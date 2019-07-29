<?php
$b = "flo-block-share-links"; // To be used inside HTML

/* START: CLASS NAME AUTOMATION */
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
/* END: CLASS NAME AUTOMATION */

$elements_color = flo_data($data, "elements_color");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
?>
@extends('layout.block', [
  "block_classes" => "flo-block--no-top-padding", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }

    "
  ])
  <div class="{{$b}} {{$b__uniq}}">
    @if ($title)
      <h3 class="{{$b}}__title">
        {{$title}}
      </h3>
    @endif
    <div class="{{$b}}__share-links">
      @include('components.flo-share-links')
    </div>
  </div>
@overwrite
