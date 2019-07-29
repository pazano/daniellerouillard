<?php
$b = "flo-footer-area-1-type-c"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$bgc = flo_data($data, "flo-lovely2-footerf-a1__bgc");
$elements_color = flo_data($data, "flo-lovely2-footerf-a1__ec");

$image = flo_data($data, "flo-lovely2-footer-a1c__i");

$title = flo_data($data, "flo-lovely2-footer-a1c__t");
$title_font = flo_font_data($data, "flo-lovely2-footer-a1c__t-f");
$subtitle = flo_data($data, "flo-lovely2-footer-a1c__st");
$subtitle_font = flo_font_data($data, "flo-lovely2-footer-a1c__st-f");
$text = flo_data($data, "flo-lovely2-footer-a1c__tx");
$text_font = flo_font_data($data, "flo-lovely2-footer-a1c__tx-font");
$bottom_link_label = flo_data($data, "flo-lovely2-footer-a1c__bl-l");
$bottom_link_label_font = flo_font_data($data, "flo-lovely2-footer-a1c__bl-l-f");
$bottom_link_url = flo_data($data, "flo-lovely2-footer-a1c__bl-url");

$link_list_title = flo_data($data, "flo-lovely2-footer-a1c-r__t");
$link_list_title_font = flo_font_data($data, "flo-lovely2-footer-a1c-r__t-f");
$link_list = flo_data($data, "flo-lovely2-footer-a1c-r__l");
$link_font = flo_font_data($data, "flo-lovely2-footer-a1c-r__l-f");
$button_label = flo_data($data, "flo-lovely2-footer-a1c-r__b");
$button_label_font = flo_font_data($data, "flo-lovely2-footer-a1c-r__b-f");
$button_background_color = flo_data($data, "flo-lovely2-footer-a1c-r__b-bgc");
$button_text_color = flo_data($data, "flo-lovely2-footer-a1c-r__b-tc");
$button_url = flo_data($data, "flo-lovely2-footer-a1c-r__b-url");
$subtitle_url = flo_data($data, "flo-lovely2-footer-a1c__st-url");
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
    $b__uniq_for_css." ".$b__for_css."__text",
    $text_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__bottom-link",
    $bottom_link_label_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__link-list-title",
    $link_list_title_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__link",
    $link_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__button",
    $button_label_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css." {
      color: ".$elements_color.";
      border-color: ".hex2rgba($elements_color, 0.1).";
      background-color: ".$bgc.";
    }

    ".$b__uniq_for_css." ".$b__for_css."__button {
      color: ".$button_text_color.";
      background-color: ".$button_background_color.";
    }

  "
])
<div class="{{$b}}">

  @if ($image)
    <div class="{{$b}}__image" style='background-image: url({{$image["url"]}})'></div>
  @endif

  <div class="{{$b}}__text-area">
    @if ($title)
      <h4 class="{{$b}}__title">
        {{$title}}
      </h4>
    @endif
    @if ($subtitle)
      <a class="{{$b}}__subtitle" href="{{$subtitle_url}}">
        {{$subtitle}}
      </a>
    @endif
    @if ($text)
      <div class="{{$b}}__text">
        {{$text}}
      </div>
    @endif
    @if ($bottom_link_label)
      <a class="{{$b}}__bottom-link" href="{{$bottom_link_url}}">
        {{$bottom_link_label}}
      </a>
    @endif
  </div>

  <div class="{{$b}}__right-area">
    @if ($link_list_title)
      <h4 class="{{$b}}__link-list-title">
        {{$link_list_title}}
      </h4>
    @endif
    @if ($link_list)
      <div class="{{$b}}__link-list">
        @foreach ($link_list as $link)
          <a class="{{$b}}__link" href="{{$link["url"]}}">{{$link["title"]}}</a>
        @endforeach
      </div>
    @endif
    @if ($button_label)
      <a class="{{$b}}__button" href="{{$button_url}}">{{$button_label}}</a>
    @endif
  </div>

</div>
