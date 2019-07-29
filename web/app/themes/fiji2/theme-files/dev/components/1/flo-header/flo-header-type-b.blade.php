<?php

  $display_tagline_2 = flo_data($data, "flo-lovely2-header__display-tagline-2");
  $tagline_2_pretitle = flo_data($data, "flo-lovely2-header__tagline-2-pretitle");
  $tagline_2_pretitle_font = flo_font_data($data, "flo-lovely2-header__tagline-2-pretitle-font");
  $tagline_2_title = flo_data($data, "flo-lovely2-header__tagline-2-title");
  $tagline_2_title_font = flo_font_data($data, "flo-lovely2-header__tagline-2-title-font");
?>

@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__tagline-2-pretitle",
    $tagline_2_pretitle_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__tagline-2-title",
    $tagline_2_title_font
    )
    ."

  "
])

<div class="{{$b}} {{$b__uniq}} {{$b}}--type-b">
  <div class="{{$b}}__left-area">
    @if ($display_tagline_2)
      <div class="{{$b}}__tagline-2">
        @if ($tagline_2_pretitle)
          <h5 class="{{$b}}__tagline-2-pretitle">
            {{$tagline_2_pretitle}}
          </h5>
        @endif
        @if ($tagline_2_title)
          <h4 class="{{$b}}__tagline-2-title">
            {{$tagline_2_title}}
          </h4>
        @endif
      </div>
    @endif
  </div>
  <div class="{{$b}}__middle-area">
    @include('components.flo-header__logo')
    @include('components.flo-header__menu')
  </div>
  <div class="{{$b}}__right-area">
    @include('components.flo-header__tagline')
    @include('components.flo-header__social-links')
  </div>
</div>
