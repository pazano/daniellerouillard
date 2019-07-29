<?php
$b = "flo-block-gallery-view-3"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$background_color = flo_data($data, "background_color");
$elements_color = flo_data($data, "elements_color");

$date_and_category_font = flo_data($data, "date_and_category_font");
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
if ($cat_term) {
  $category = flo_get_the_first_term( $id = $post->ID, $taxonomy = $cat_term, $before = '', $sep = '', $after = '', $linked_terms = false ); // Need Name Only
}
$display_category = $display_category && $category ? $category : false;

$display_date = flo_data($data, "display_date");

$title_font = flo_data($data, "title_font");

$display_content = flo_data($data, "display_content");

$display_share = flo_data($data, "display_share");
$share_label = flo_data($data, "share_label");
$share_label_font = flo_data($data, "share_label_font");

$display_scroll_button = flo_data($data, "display_scroll_button");
$scroll_button_label = flo_data($data, "scroll_button_label");
$scroll_button_label_font = flo_data($data, "scroll_button_label_font");

global $images;
?>
@include('components.flo-generic-gallery-view-data')

@extends('layout.block', [
  "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_gallery_view_3" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__date-and-category",
      $date_and_category_font
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
      $b__uniq_for_css." ".$b__for_css."__share-label",
      $share_label_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__scroll-button-label",
      $scroll_button_label_font
      )
      ."


    ",
    "breakpoint__medium_up" => "
      ".$b__uniq_for_css." {
        background-color: ".$background_color.";
      }
    ",
    "breakpoint__small_only" => "
      ".$b__uniq_for_css." ".$b__for_css."__text-area {
        background-color: ".$background_color.";
      }
    "
  ])

  <div class="{{$b__uniq}} {{$b}}">
    <div class="{{$b}}__images">
      @if(is_array($images) && sizeof($images))
        @foreach ($images as $counter => $image)

          <?php
            if(isset($image['slide']['alt'])){
                $alt_text = $image['slide']['alt'];
            }else{
                $alt_text = '';
            }

            if(isset($_COOKIE['flo_small_screen']) && $_COOKIE['flo_small_screen'] == '1' ){
              $resized_list_image_url = aq_resize( $image["full_img"], $width = 1280, $height = 99999, $crop = null, $single = true, $upscale = false );
            }else{
              $resized_list_image_url = aq_resize( $image["full_img"], $width = 2000, $height = 99999, $crop = null, $single = true, $upscale = false, $force_sizes = true);
            }

          ?>
          @if ($counter < 4)
            <img class="{{$b}}__image" alt="{{$alt_text}}"  src="{{$resized_list_image_url}}" href="{{$resized_list_image_url}}" data-fancybox="{{$b__uniq}}" data-type="image">
          @else
            <img class="{{$b}}__image" alt="{{$alt_text}}"  data-src="{{ $resized_list_image_url }}" href="{{$resized_list_image_url}}" data-fancybox="{{$b__uniq}}" data-type="image">
          @endif
        @endforeach
      @endif
    </div>
    <div class="{{$b}}__text-area">
      @if ($display_date || $display_category)
        <h3 class="{{$b}}__date-and-category">
          @if ($display_category)
            {{$category}}
          @endif
          @if ($display_date && $display_category)
            |
          @endif
          @if ($display_date)
            {{get_the_date()}}
          @endif
        </h3>
      @endif
      <h1 class="{{$b}}__title">
        {{get_the_title()}}
      </h1>
      <div class="{{$b}}__content flo-post">
        {{get_the_content()}}
      </div>
      @if ($display_share)
        <div class="{{$b}}__share">
          @if ($share_label)
            <h4 class="{{$b}}__share-label">
              {{$share_label}}
            </h4>
            <div class="{{$b}}__share-separator"></div>
          @endif
          <div class="{{$b}}__share-links">
            @include('components.flo-share-links')
          </div>
        </div>
      @endif

      @if ($display_scroll_button)
        <div class="{{$b}}__scroll-button">
          <div class="{{$b}}__scroll-button-label">
            {{$scroll_button_label}}
          </div>
          <i class="flo-icon-arrow-down"></i>
        </div>
      @endif
    </div>

  </div>
@overwrite
