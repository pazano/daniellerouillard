<?php
  $display_featured_link = flo_data($data, "flo-lovely2-header__display-featured-link");
  $featured_link_label = flo_data($data, "flo-lovely2-header__featured-link-label");
  $featured_link_font = flo_data($data, "flo-lovely2-header__featured-link-font");
  $featured_link_url = flo_data($data, "flo-lovely2-header__featured-link-url");
?>
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__featured-link",
    $featured_link_font
    )
    ."
  "
])
<div class="{{$b}} {{$b__uniq}} {{$b}}--type-h-or-i">
  @include('components.flo-header__logo')
  <div class="{{$b}}__menu-and-link">
    @include('components.flo-header__menu')
    @if ($display_featured_link)
      <a class="{{$b}}__featured-link" href="{{$featured_link_url}}">
        {{$featured_link_label}}
      </a>
    @endif
  </div>
</div>
