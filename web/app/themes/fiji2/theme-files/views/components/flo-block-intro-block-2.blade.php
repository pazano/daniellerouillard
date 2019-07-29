{{-- NOTE: GENERATED BY GULP !!! --}}<?php
$b = "flo-block-intro-block-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$text_layout_type = flo_data($data, "layout_type");
$text_layout_type_class = $b . "--type-" . $text_layout_type;

// Image Area
$elements_color = flo_data($data, "elements_color");
$image = flo_data($data, "image");
$image_overlay_color = flo_data($data, "image_overlay_color");
$overlay_opacity = flo_data($data, "overlay_opacity") / 100;

$display_header = flo_data($data, "display_header");
$display_header_class = $display_header ? $b . "--header-is-visible" : "";
$brighness_class = flo_color_bright($elements_color) ? "flo-header__logo--is-light" : "";

// B. Text Area
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$text = flo_data($data, "text");
$text_font = flo_data($data, "text_font");

// C. Buttons
if($text_layout_type == 'a') {
  $button_data = flo_data($data, "buttons");
  $button_position_class = $b . "__buttons-position--" . flo_data($data, "type_a_button_position", "right");
} elseif($text_layout_type == 'b'){
  $button_data = flo_data($data, "button");
} elseif($text_layout_type == 'c') {
  $button_data = flo_data($data, "links");
}

// Background Image Optimization
$attachment_id = $image['ID'];

$img_sizes = array(
 'small' => array('width' => 99999, 'height' => 800),  // mobile size
 'medium' => array('width' => 99999, 'height' => 1550), // tablet size
 'large' => array('width' => 99999, 'height' => 1550),
);

$img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
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

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__text",
      $text_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__image-overlay {
        background-color: ".$image_overlay_color.";
        opacity: ".$overlay_opacity.";
      }

    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$display_header_class}} {{$text_layout_type_class}}">
    <div class="{{$b}}__image-wrap" style="{{$img_vars}}" aria-label="{{$image['alt']}}">
      <div class="{{$b}}__image-overlay"></div>
      @if ($display_header)
        <div class="{{$b}}__header-area {{$brighness_class}}">
          @include('components.flo-header')
        </div>
      @endif
      <div class="{{$b}}__text-area @if($text_layout_type == 'a') {{$button_position_class}} @endif">
        <div class="{{$b}}__text-wrap">
          <h2 class="{{$b}}__title">
            {{$title}}
          </h2>
          <div class="{{$b}}__text">
            {{$text}}
          </div>  
        </div>
        
        <div class="{{$b}}__actions-wrap">
          @if($text_layout_type == "a" && is_array($button_data) && sizeof($button_data) > 0)
            @foreach ($button_data as $index => $button)
              <?php 
                $single_button_data = $button['button'];
                $button_bg = hex2rgba($button["button_background_color"], $button["button_background_color_opacity"] / 100);
                $button_bg_hover = hex2rgba($button["button_background_color"], $button["button_background_color_opacity_hover"] / 100);
              ?>
              @include('core.style', [
                "breakpoint__general" => "
                  ".$b__uniq_for_css." ".$b__for_css."__button--".$index." {
                    color: ".$button["button_text_color"].";
                    background-color: ".$button_bg.";
                    border-color: ".$button["button_border_color"].";
                  }
                  ".$b__uniq_for_css." ".$b__for_css."__button--".$index.":hover {
                    color: ".$button["button_text_color_hover"].";
                    background-color: ".$button_bg_hover.";
                  }
                  ".
                  flo_render_typography_styles(
                  $b__uniq_for_css." ".$b__for_css."__button--".$index,
                  $button["button_text_font"]
                  )
                  ."
                "
              ])
              <a href="{{$single_button_data['url']}}" target="{{$single_button_data['target']}}" class="{{$b}}__button {{$b}}__button--{{$index}}">{{$single_button_data['title']}}</a>
            @endforeach
          @endif
          @if($text_layout_type == "b" && isset($button_data["button"]["title"]) && strlen($button_data["button"]["title"]))
            <?php 
              $single_button_data = $button_data["button"];
              $button_bg = hex2rgba($button_data["button_background_color"], $button_data["button_background_color_opacity"] / 100);
              $button_bg_hover = hex2rgba($button_data["button_background_color"], $button_data["button_background_color_opacity_hover"] / 100);
            ?>
            @include('core.style', [
              "breakpoint__general" => "
                ".$b__uniq_for_css." ".$b__for_css."__button {
                  color: ".$button_data["button_text_color"].";
                  background-color: ".$button_bg.";
                  border-color: ".$button_data["button_border_color"].";
                }
                ".$b__uniq_for_css." ".$b__for_css."__button:hover {
                  color: ".$button_data["button_text_color_hover"].";
                  background-color: ".$button_bg_hover.";
                }
                ".
                flo_render_typography_styles(
                $b__uniq_for_css." ".$b__for_css."__button",
                $button_data["button_text_font"]
                )
                ."
              "
            ])
            <a href="{{$single_button_data['url']}}" target="{{$single_button_data['target']}}" class="{{$b}}__button">{{$single_button_data['title']}}</a>
          @endif
          @if($text_layout_type == "c" && is_array($button_data) && sizeof($button_data) > 0)
            @foreach ($button_data as $index => $button)
              <?php 
                $butt_target = $button['button_target'] ? "_blank": "_self";
                $button_bg = hex2rgba($button["button_background_color"], $button["button_background_color_opacity"] / 100);
                $button_bg_hover = hex2rgba($button["button_background_color"], $button["button_background_color_opacity_hover"] / 100);
              ?>
              @include('core.style', [
                "breakpoint__general" => "
                  ".$b__uniq_for_css." ".$b__for_css."__button--".$index." {
                    color: ".$button["button_text_color"].";
                    background-color: ".$button_bg.";
                    border-color: ".$button["button_border_color"].";
                  }
                  ".$b__uniq_for_css." ".$b__for_css."__button--".$index.":hover {
                    color: ".$button["button_text_color_hover"].";
                    background-color: ".$button_bg_hover.";
                  }
                  ".
                  flo_render_typography_styles(
                  $b__uniq_for_css." ".$b__for_css."__button--".$index." ".$b__for_css."__button-pretitle",
                  $button["button_pretitle_font"]
                  )
                  ."
                  ".
                  flo_render_typography_styles(
                  $b__uniq_for_css." ".$b__for_css."__button--".$index." ".$b__for_css."__button-title",
                  $button["button_title_font"]
                  )
                  ."
                "
              ])
              <a href="{{$button['button_link']}}" target="{{$butt_target}}" class="{{$b}}__button {{$b}}__button--{{$index}}">
                <span class="{{$b}}__button-pretitle">{{$button['button_pretitle']}}</span>
                <span class="{{$b}}__button-title">
                  {{$button['button_title']}}
                  <i class="{{$b}}__icon flo-icon flo-icon-line-arrow-right"></i>
                </span>
                
              </a>
            @endforeach
          @endif
        </div>

      </div>
    </div>
  </div>
@overwrite
