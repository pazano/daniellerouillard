<?php
$b = "flo-footer-area-1-type-a"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$bgc = flo_data($data, "flo-lovely2-footerf-a1__bgc");
$elements_color = flo_data($data, "flo-lovely2-footerf-a1__ec");

$images_source = flo_data($data, "flo-lovely2-footer-a1a-img__source");
$images = flo_data($data, "flo-lovely2-footer-a1a-img__images");

$text_area_bgi = flo_data($data, "flo-lovely2-footer-a1a-t__bgi");
$text_area_bgi = flo_data($text_area_bgi, "url");
$decorative_image = flo_data($data, "flo-lovely2-footer-a1a-t__d");
$title = flo_data($data, "flo-lovely2-footer-a1a-t__t");
$title_font = flo_font_data($data, "flo-lovely2-footer-a1a-t__t-font");
$subtitle = flo_data($data, "flo-lovely2-footer-a1a-t__s");
$subtitle_font = flo_font_data($data, "flo-lovely2-footer-a1a-t__s-font");
$link_label = flo_data($data, "flo-lovely2-footer-a1a-t__l-label");
$link_font = flo_font_data($data, "flo-lovely2-footer-a1a-t__l-font");
$link_url = flo_data($data, "flo-lovely2-footer-a1a-t__l-url");
$display_social_links = flo_data($data, "flo-lovely2-footer-a1a-t__social-display");

?>
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
    $b__uniq_for_css." ".$b__for_css."__subtitle",
    $subtitle_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__link",
    $link_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css." {
      background-color: ".$bgc.";
      color: ".$elements_color.";
    }
  "
])
<div class="{{$b}}">
  @include('components.flo-footer-image-feed', [
    "source" => $images_source,
    "images" => $images,
    "count" => 6
  ])
  <div class="{{$b}}__text-area" style='background-image: url({{$text_area_bgi}})'>
    @if ($decorative_image)
      <img class="{{$b}}__decorative-image" src="{{$decorative_image["url"]}}" alt="">
    @endif
    @if ($title)
      <h4 class="{{$b}}__title">
        {{$title}}
      </h4>
    @endif
    @if ($subtitle)
      <h5 class="{{$b}}__subtitle">
        {{$subtitle}}
      </h5>
    @endif
    @if ($link_label)
      <a class="{{$b}}__link" href="{{$link_url}}">
        {{$link_label}}
      </a>
    @endif
    @if ($display_social_links)
      <div class="{{$b}}__social-links">
        @include('components.social-links')
      </div>
    @endif
  </div>
</div>
