<?php
$b = "flo-header-topbar--simple"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$topbar_settings_group = flo_get_option("flo-fiji2-header_top_bar_simple_settings");
$topbar_text_font = flo_render_typography_styles_by_option_name("flo-fiji2-header_top_bar_simple_settings_top_bar_text_font", "options");
$topbar_button_font = flo_render_typography_styles_by_option_name("flo-fiji2-header_top_bar_simple_settings_top_bar_button_font", "options");
$topbar_button_target = $topbar_settings_group["top_bar_button_target"] ? "_blank" : "_self";
// pull letter spacing value from the button font configuration
$topbar_button_letter_spacing = 0;
if(strpos($topbar_button_font, "letter-spacing")) {
  $topbar_button_letter_spacing = floatval(str_replace("em", "", explode(";", explode("letter-spacing:", $topbar_button_font)[1])[0]));  
}

?>

@include('core.style', [
  "breakpoint__general" => "
    ".$b__for_css." {
      color: ".$topbar_settings_group["elements_color"].";
    }
    ".$b__for_css."__close, ".$b__for_css."__button:after {
      color: ".$topbar_settings_group["accent_color"].";
      border-color: ".$topbar_settings_group["accent_color"].";
    }
    ".$b__for_css."__button:after, ".$b__for_css."__button:before {
      left: calc(50% - ". $topbar_button_letter_spacing ."em / 2);
    }
    ".$b__for_css."__close:hover {
      color: ".$topbar_settings_group["elements_color"].";
    }
    ".$b__for_css."__button:before {
      color: ".$topbar_settings_group["elements_color"].";
    }
    ".
    $topbar_text_font.
    $topbar_button_font,
    
  "breakpoint__medium_up" => "
    
  "
])

@extends('layout.block', [
  "block_classes" => "flo-block--no-top-padding flo-block-mobile--no-vertical-padding flo-no-resize", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_topbar", // Specify a function (see _blank.js on how to define) that will be executed on document ready.
  "block_custom_background_color" => $topbar_settings_group["background_color"]
])
@section('block_content')
  <div class="{{$b}}" style="display: none;">
    @if(strlen($topbar_settings_group["top_bar_text"]))
      <div class="{{$b}}__text">
        {{$topbar_settings_group["top_bar_text"]}}
      </div>
    @endif
    @if(strlen($topbar_settings_group["top_bar_button_text"]))
      <a target="{{$topbar_button_target}}" class="{{$b}}__button" href="{{$topbar_settings_group["top_bar_button_link"]}}">{{$topbar_settings_group["top_bar_button_text"]}}</a>
    @endif
    <span class="{{$b}}__close">
      <i class="flo-icon flo-icon-close-icon"></i>
    </span>
  </div>
@overwrite