<?php
$b = "flo-block-text-block-4"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

/* START: ACF Fields */
$elements_color = flo_data($data, "elements_color");
$text_columns = flo_data($data, "text_columns");
$title_font = flo_data($data, "title_font");
$title_paragraph_font = flo_data($data, "title_paragraph_font");
/* END: ACF Fields */

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
    $b__uniq_for_css." ".$b__for_css."__title-paragraph",
    $title_paragraph_font
    )

    .$b__uniq_for_css." ".$b__for_css."__text-column {
      color: ".$elements_color.";
    }

  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    @foreach ($text_columns as $text_column)
      <?php
        $title = flo_data($text_column, "title");
        $title_paragraph = flo_data($text_column, "title_paragraph");
      ?>
      <div class="{{$b}}__text-column">
        <h3 class="{{$b}}__title">{{$title}}</h3>
        <div class="{{$b}}__title-paragraph">{{$title_paragraph}}</div>
      </div>
    @endforeach
  </div>
@overwrite
