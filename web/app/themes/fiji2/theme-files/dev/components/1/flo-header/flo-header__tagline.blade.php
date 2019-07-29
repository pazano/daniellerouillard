<?php
  $display_tagline = flo_data($data, "flo-lovely2-header__display-tagline");
  $tagline = flo_data($data, "flo-lovely2-header__tagline");
  $tagline_font = flo_font_data($data, "flo-lovely2-header__tagline-font");
?>
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__tagline",
    $tagline_font
    )
    ."

  "
])

@if ($display_tagline)
  <h4 class="{{$b}}__tagline">
    {{$tagline}}
  </h4>
@endif
