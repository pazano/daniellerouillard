@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__title-area-pretitle",
    $title_area_pretitle_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__title-area-title",
    $title_area_title_font_a_and_b
    )
    ."

  "
])

@if ($slide["pretitle"] || $slide["title"])
  <a href="{{$slide["url"]}}" class="{{$b}}__title-area">
    @if ($slide["pretitle"])
      <h4 class="{{$b}}__title-area-pretitle">
        {{$slide["pretitle"]}}
      </h4>
    @endif
    @if ($slide["title"])
      <h3 class="{{$b}}__title-area-title">
        {{$slide["title"]}}
      </h3>
    @endif
  </a>
@endif
