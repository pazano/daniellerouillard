<?php
$b = "flo-share-rollover"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

?>
<div class="{{$b}}" data-onready="flo_share_rollover">
  <div class="{{$b}}__trigger">
    <i class="flo-icon-share"></i>
  </div>
  <div class="{{$b}}__share-wrap">
    @include('components.flo-share-links')
  </div>
</div>
