{{-- NOTE: GENERATED BY GULP !!! --}}<?php
$b = "flo-footer-area-1-type-d"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$bgc = flo_data($data, "flo-lovely2-footerf-a1__bgc");
$elements_color = flo_data($data, "flo-lovely2-footerf-a1__ec");

$top_padding_enable = flo_data($data, "flo-fiji2-footerf-a1b__top-padding_enable", false);
$top_padding_enable_class = $top_padding_enable ? $b . "__dynamic-padding" : "";
$top_padding_px = $top_padding_enable ? flo_data($data, "flo-fiji2-footerf-a1b__top-padding_value", 30) : "0";

$images_source = flo_data($data, "flo-lovely2-footer-a1d__i-s");
$images = flo_data($data, "flo-lovely2-footer-a1d__i");
$link_label = flo_data($data, "flo-lovely2-footer-a1d__l-l");
$link_font = flo_font_data($data, "flo-lovely2-footer-a1d__l-f");
$link_bgc = flo_data($data, "flo-lovely2-footer-a1d__l-bgc");
$link_text_color = flo_data($data, "flo-lovely2-footer-a1d__l-ec");
$link_url = flo_data($data, "flo-lovely2-footer-a1d__l-url");
$mobile_image_count = flo_data($data, "flo-fiji2-footerf-a1b__insta_images_count_mobile", 6);
$mobile_imgs_to_show = 6 - intval($mobile_image_count);
$zero_or_not = $mobile_imgs_to_show == 6 ? 'mobile-hide-whole-block' : '';
?>
@include('core.style', [
  "breakpoint__general" => "
    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__link",
    $link_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__link {
      color: ".$link_text_color.";
      background-color: ".$link_bgc.";
    }

    ".$b__uniq_for_css." ".$b__for_css." {
      color: ".$elements_color.";
      border-color: ".hex2rgba($elements_color, 0.1).";
      background-color: ".$bgc.";
    }
  ",
  "breakpoint__medium_up" => "
    ".$b__uniq_for_css." ".$b__for_css." {
      padding-top: ". $top_padding_px / 16 ."rem;
    }
  ",
  "breakpoint__small_only" => "
    ".$b__uniq_for_css." ".$b__for_css."__image:nth-last-child(-n+".$mobile_imgs_to_show.") ,
    ".$b__uniq_for_css." ".$b__for_css."__images .img-block:nth-last-child(-n+".$mobile_imgs_to_show.")  {
      display: none;
    }
  "
])
<div class="{{$b}} {{$zero_or_not}} {{$top_padding_enable_class}}">
  @include('components.flo-footer-image-feed', [
    "source" => $images_source,
    "count" => 6,
    "images" => $images
  ])
  @if ($link_label)
    <a class="{{$b}}__link" href="{{$link_url}}">
      {{$link_label}}
    </a>
  @endif
</div>
