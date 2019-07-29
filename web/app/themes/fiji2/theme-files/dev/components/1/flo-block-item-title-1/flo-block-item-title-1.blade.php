<?php
$b = "flo-block-item-title-1"; // To be used inside HTML

/* START: CLASS NAME AUTOMATION */
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
/* END: CLASS NAME AUTOMATION */

/* START: CATEGORY */
  $display_category = flo_data($data, "display_category");

  switch ($post->post_type) {
    case 'post':
      $cat_term = 'category';
    break;
    case 'gallery':
      $cat_term = 'gallery-category';
    break;
    default:
      $cat_term = false;
    break;
  }
  $category = false;
  if ($cat_term && $categories_list) {
    $category = $categories_list;
  }

  $category_font = flo_data($data, "category_font");
/* END: CATEGORY */

$elements_color = flo_data($data, "elements_color");
$display_back_button = flo_data($data, "display_back_button");
$back_button_label = flo_data($data, "back_button_label");
$back_button_font = flo_data($data, "back_button_font");
$title_font = flo_data($data, "title_font");
$display_social_links = flo_data($data, "display_social_links");

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
      $b__uniq_for_css." ".$b__for_css."__back-button",
      $back_button_font
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
      $b__uniq_for_css." ".$b__for_css."__category",
      $category_font
      )
      ."


      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }

    "
  ])
  <div class="{{$b}} {{$b__uniq}}">

    <div class="{{$b}}__back-button-wrap">
      @if ($back_button_label && $display_back_button)
        <a class="{{$b}}__back-button" href="javascript:history.back()">
          {{$back_button_label}}
        </a>
      @endif
    </div>
    <div class="{{$b}}__title-wrap">
      <h1 class="{{$b}}__title">
        {{get_the_title($post->ID)}}
      </h1>
      @if ($display_category)
        <h4 class="{{$b}}__category">
          {{$category}}
        </h4>
      @endif
    </div>
    <div class="{{$b}}__social-links-wrap">
      @if ($display_social_links)
        @include('components.flo-share-links')
      @endif
    </div>
  </div>
@overwrite
