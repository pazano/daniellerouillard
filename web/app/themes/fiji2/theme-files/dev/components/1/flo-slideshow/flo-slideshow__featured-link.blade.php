@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__featured-link-pretitle",
    $featured_link_pretitle_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__featured-link-title",
    $featured_link_title_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__featured-link-image {
      border-color: ".$featured_link_image_border_color.";
      background-color: ".$featured_link_image_border_color.";
    }

  "
])
@if ($display_featured_link)
  <a href="{{$featured_link_url}}" class="{{$b}}__featured-link">
    <span class="{{$b}}__featured-link-title-area">
      @if ($featured_link_pretitle)
        <span class="{{$b}}__featured-link-pretitle">
          {{$featured_link_pretitle}}
        </span>
      @endif
      @if ($featured_link_title)
        <span class="{{$b}}__featured-link-title">
          {{$featured_link_title}}
        </span>
      @endif
    </span>
    @if ($featured_link_image)
      <span class="{{$b}}__featured-link-image" style="background-image: url({{$featured_link_image["url"]}})"></span>
    @else
      <span class="{{$b}}__featured-link-divider"></span>
    @endif
  </a>
@endif
