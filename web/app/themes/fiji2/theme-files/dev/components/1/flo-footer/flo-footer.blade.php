<?php
$b = "flo-footer"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

if (isset($data) && flo_data($data, "custom_footer_layout")) {
  $data = flo_data($data, "cff");
} else {
  //$data = get_fields("options");
  $data = $flo_options;
}


$areas_order = flo_data($data, "flo-lovely2-footer__areas-order", false);

$area_1_layout = flo_data($data, "flo-lovely2-footer-a1__layout", false);

// if the footer block contains only one element, it is being pushed too low and never fades in, therefore we disable fading for these cases
$disable_appear = '';
if(count($areas_order) <= 2){
    $disable_appear = 'disable-appear';
}
?>
<div class="{{$b}} {{$b__uniq}} {{$disable_appear}}">
  @if($areas_order && sizeof($areas_order))
    @foreach ($areas_order as $area)
      @if ($area == "area_1")
        @if ($area_1_layout == "b")
          @include("components.flo-footer-area-1-type-b")
        @elseif ($area_1_layout == "d")
          @include("components.flo-footer-area-1-type-d")
        @endif
      @elseif ($area == "area_2")
        @include("components.flo-footer-area-2")
      @elseif ($area == "copyrights")
        @include("components.flo-footer-copyrights-area")
      @endif
    @endforeach
  @endif
</div>
