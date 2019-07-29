<?php
$b = "flo-slideshow"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

?>
@if ($logo_image)
  <?php
    $default_img = $logo_image;
    $light_img = $logo_image_light ? $logo_image_light : $logo_image;
  ?>
  <div class="{{$b}}__logo" style="max-width: {{$maximum_logo_width / 16}}rem">
    <img class="{{$b}}__logo-img {{$b}}__logo-img--default" src="{{$default_img["url"]}}" alt="{{$default_img["alt"]}}">
    <img class="{{$b}}__logo-img {{$b}}__logo-img--light" src="{{$light_img["url"]}}" alt="{{$light_img["alt"]}}">
  </div>
@endif
