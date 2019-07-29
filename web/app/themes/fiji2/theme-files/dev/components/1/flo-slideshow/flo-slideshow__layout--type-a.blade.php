<?php
$b = "flo-slideshow"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

?>

@include('core.style', [
  "breakpoint__medium_up" => "

    .flo-slideshow-block--type-a.flo-block--merged-with-header {
      margin-top: ".$gap_around_slideshow.";
    }

    ".$b__uniq_for_css." {
      height: calc(100vh - ".$gap_around_slideshow.");
      width: calc(100vw - ".$gap_around_slideshow." * 2);
      margin: 0 auto;
    }

  "
])

<div class="{{$b}}__layout {{$b}}__layout--type-a flo-hero-video-embed--button-at-bottom" data-onready="flo_slideshow__layout__type_a">
  @include('components.flo-slideshow__slides')
  @include('components.flo-slideshow__counter')
  @include('components.flo-slideshow__featured-link')

  <div class="{{$b}}__arrow-next">
    <i class="flo-icon-arrow-right-1"></i>
  </div>
</div>
