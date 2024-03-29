{{-- NOTE: GENERATED BY GULP !!! --}}<?php
$b = "flo-footer-area-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$bgc = flo_data($data, "flo-lovely2-footer-a2__bgc");
$elements_color = flo_data($data, "flo-lovely2-footer-a2__ec");

$link_label = flo_data($data, "flo-lovely2-footer-a2__l-l");
$link_label_font = flo_font_data($data, "flo-lovely2-footer-a2__l-f");
$link_url = flo_data($data, "flo-lovely2-footer-a2__l-u");
$display_social_links = flo_data($data, "flo-lovely2-footer-a2__d-s");

$title = flo_data($data, "flo-lovely2-footer-a2__t");
$title_font = flo_font_data($data, "flo-lovely2-footer-a2__t-f");
$subtitle = flo_data($data, "flo-lovely2-footer-a2__st");
$subtitle_font = flo_font_data($data, "flo-lovely2-footer-a2__st-f");

$newsletter_placeholder = flo_data($data, "flo-lovely2-footer-a2__nf-p");
$newsletter_font = flo_font_data($data, "flo-lovely2-footer-a2__nf-f");
$newsletter_bgc = flo_data($data, "flo-lovely2-footer-a2__nf-bgc");
$newsletter_elements_color = flo_data($data, "flo-lovely2-footer-a2__nf-ec");
?>
@include('core.style', [
  "breakpoint__general" => "
    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__link",
    $link_label_font
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
    $b__uniq_for_css." ".$b__for_css."__subtitle",
    $subtitle_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__newsletter-form-email",
    $newsletter_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css." {
      background-color: ".$bgc.";
      color: ".$elements_color.";
      border-color: ".hex2rgba($elements_color, 0.1).";
    }

    ".$b__uniq_for_css." ".$b__for_css."__newsletter-form {
      background-color: ".$newsletter_bgc.";
      color: ".$newsletter_elements_color.";
    }
  "
])
<div class="{{$b}}">
  <div class="{{$b}}__social-area">
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
  <div class="{{$b}}__title-area">
    <h3 class="{{$b}}__title">{{$title}}</h3>
    <h4 class="{{$b}}__subtitle">{{$subtitle}}</h4>
  </div>
  <form class="{{$b}}__newsletter-form flo-form--newsletter" method="post">
    <input class="{{$b}}__newsletter-form-email flo-no-styling" type="email" name="EMAIL" value="" placeholder="{{$newsletter_placeholder}}">
    <button class="{{$b}}__newsletter-form-submit" type="submit" name="button">
      <i class="flo-icon-right-dir"></i>
    </button>
  </form>
  @if(strlen(flo_get_option("flo-lovely2-footer-mailchimp_code","") ) )
      <noscript type="text/template" class="embed_code" data-onready="footer_miniblock_signup">
        {{ addslashes($flo_options["flo-lovely2-footer-mailchimp_code"]) }}
      </noscript>
  @endif
</div>
