<?php
$b = "flo-block-featured-links"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$background_color = flo_data($data, "background_color");
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$number_of_columns = flo_data($data, "number_of_columns");
$links_list = flo_data($data, "links");
$links_title_font = flo_data($data, "links_title_font");

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
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
    $b__uniq_for_css." ".$b__for_css."__featured-link",
    $links_title_font
    )
    ."

    ".$b__uniq_for_css." {
      color: ".$elements_color.";
      background-color: ".$background_color.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    @if ($title)
      <div class="{{$b}}__title-wrap">
        <h2 class="{{$b}}__title">{{$title}}</h2>
      </div>
    @endif
    @if ($links_list)
      <div class="{{$b}}__featured-links-wrap">
        @foreach ($links_list as $link_number => $link)
          <?php
            $single_link = flo_data($link, "link");
          ?>
          @if ( !empty($single_link) )
            <a class="{{$b}}__featured-link" href="{{$single_link['url']}}" target="{{$single_link['target']}}" style="
            --number-of-columns:{{$number_of_columns}};">{{$single_link['title']}}</a>
          @endif
        @endforeach
      </div>
    @endif
  </div>
@overwrite
