<?php
$b = "flo-block-item-vendors-2"; // To be used inside HTML

/* START: CLASS NAME AUTOMATION */
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
/* END: CLASS NAME AUTOMATION */

$elements_color = flo_data($data, "elements_color");
$background_color = flo_data($data, "background_color");
$links = flo_data($data, "links");
$link_pretitle_font = flo_data($data, "link_pretitle_font");
$link_title_font = flo_data($data, "link_title_font");

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
      $b__uniq_for_css." ".$b__for_css."__link-pretitle",
      $link_pretitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__link-title",
      $link_title_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__links {
        background-color: ".$background_color.";
      }

    "
  ])
  <div class="{{$b}} {{$b__uniq}}">
    <div class="{{$b}}__links">
      @foreach ($links as $link)
        <a class="{{$b}}__link" href="{{$link["url"]}}">
          <span class="{{$b}}__link-pretitle">
            {{$link["pretitle"]}}
          </span>
          <span class="{{$b}}__link-title">
            {{$link["title"]}}
          </span>
        </a>
      @endforeach
    </div>
  </div>
@overwrite
