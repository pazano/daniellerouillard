@if ($counter_display_counter)

  @include('core.style', [
    "breakpoint__general" => "

      ".
      flo_render_typography_styles(
      join(", ", [
        $b__uniq_for_css." ".$b__for_css."__counter-index",
        $b__uniq_for_css." ".$b__for_css."__counter-count",
      ]),
      $counter_counter_font
      )
      ."

    "
  ])
  <div class="{{$b}}__counter {{$b}}__counter--position-{{$position or "bottom-left"}}">
    <div class="{{$b}}__counter-index"></div>
    <div class="{{$b}}__counter-separator"></div>
    <div class="{{$b}}__counter-count"></div>
  </div>

@endif
