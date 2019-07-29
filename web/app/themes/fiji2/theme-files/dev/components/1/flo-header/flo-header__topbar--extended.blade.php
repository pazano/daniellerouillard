<?php
$b = "flo-header-topbar--extended"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$topbar_settings_group = flo_get_option("flo-fiji2-header_top_bar_extended_settings");
$topbar_title_font = flo_render_typography_styles_by_option_name("flo-fiji2-header_top_bar_extended_settings_top_bar_title_font", "options");
$topbar_button_font = flo_render_typography_styles_by_option_name("flo-fiji2-header_top_bar_extended_settings_top_bar_button_font", "options");
$topbar_button_target = $topbar_settings_group["top_bar_button_target"] ? "_blank" : "_self";

?>
@extends('layout.block', [
  "block_classes" => "flo-block--no-top-padding flo-block-mobile--no-vertical-padding flo-no-resize", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_topbar", // Specify a function (see _blank.js on how to define) that will be executed on document ready.
  "block_custom_background_color" => $topbar_settings_group["background_color"]
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "
      ".$b__for_css." {
        color: ".$topbar_settings_group["elements_color"].";
      }
      ".$b__for_css."__close {
        color: ".$topbar_settings_group["accent_color"].";
      }
      ".$b__for_css."__button, 
      ".$b__for_css."__button:focus, 
      ".$b__for_css."__button:active,
      ".$b__for_css."__button:hover {
        background-color: ".$topbar_settings_group["accent_color"].";
        color: ".$topbar_settings_group["top_bar_button_color"]."!important;
      }
      ".$b__for_css."__close:hover {
        color: ".$topbar_settings_group["elements_color"].";
      }
      ".
      $topbar_title_font.
      $topbar_button_font
  ])
  <div class="{{$b}}" style="display: none;">
    @if(strlen($topbar_settings_group["top_bar_image"]))
      <div class="{{$b}}__image-wrap">
        {{ flo_aq_img($class = $b . "__image", $url = $topbar_settings_group["top_bar_image"], $width = 360, $height = 220, $crop = true, $alt = "", $force_sizes = true) }}
      </div>
    @endif
    <div class="{{$b}}__text-wrap">
      @if(strlen($topbar_settings_group["top_bar_title"]))
        <h2 class="{{$b}}__title">{{$topbar_settings_group["top_bar_title"]}}</h2>
      @endif
      @if(strlen($topbar_settings_group["top_bar_text"]))
        <div class="{{$b}}__text flo-post">
          {{$topbar_settings_group["top_bar_text"]}}
        </div>
      @endif
    </div>
    <div class="{{$b}}__actions-wrap">
      <span class="{{$b}}__close">
        <i class="flo-icon flo-icon-close-icon"></i>
      </span>
      @if(strlen($topbar_settings_group["top_bar_button_text"]))
        <a target="{{$topbar_button_target}}" class="{{$b}}__button" href="{{$topbar_settings_group["top_bar_button_link"]}}">{{$topbar_settings_group["top_bar_button_text"]}}</a>
      @endif
    </div>
  </div>
@overwrite
