<?php
$b = "flo-footer-copyrights-area"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$bgc = flo_data($data, "flo-lovely2-footerf-cp__bgc");
$elements_color = flo_data($data, "flo-lovely2-footerf-cp__ec");

$cn = flo_data($data, "flo-lovely2-footer-cp__cn");
$cn_font = flo_font_data($data, "flo-lovely2-footer-cp__cn-font");
$at = flo_data($data, "flo-lovely2-footer-cp__at");
$at_font = flo_font_data($data, "flo-lovely2-footer-cp__at-font");

$display_back_to_top = flo_data($data, "flo-lovely2-footer-cp__dbtt");
$back_to_top_label = flo_data($data, "flo-lovely2-footer-cp__btt-label");
$back_to_top_label_font = flo_font_data($data, "flo-lovely2-footer-cp__bttlf");

?>
@include('core.style', [
  "breakpoint__general" => "
    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__copyright-notice",
    $cn_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__back-to-top-label",
    $back_to_top_label_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css." {
      color: ".$elements_color.";
      background-color: ".$bgc.";
    }
  "
])
<div class="{{$b}}" data-onready="flo_footer_copyrights_area">
  <div class="{{$b}}__icon-wrap">
    {{ do_action("flo_footer_credits"); }}
  </div>
  <div class="{{$b}}__copyright-notice">
    {{ flo_get_copyright_year($cn) }}
  </div>
  <div class="{{$b}}__back-to-top-wrap">
    @if ($display_back_to_top)
      <div class="{{$b}}__back-to-top">
        <div class="{{$b}}__back-to-top-label">
          {{$back_to_top_label}}
        </div>
        <i class="flo-icon-up-dir"></i>
      </div>
    @endif
  </div>
</div>
