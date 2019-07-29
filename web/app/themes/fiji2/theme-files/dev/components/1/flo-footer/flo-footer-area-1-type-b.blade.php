<?php
$b = "flo-footer-area-1-type-b"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

$bgc = flo_data($data, "flo-lovely2-footerf-a1__bgc");
$elements_color = flo_data($data, "flo-lovely2-footerf-a1__ec");

$images_source = flo_data($data, "flo-lovely2-footer-a1b-l__i-s");
$images = flo_data($data, "flo-lovely2-footer-a1b-l__i");

$middle_area_content = flo_data($data, "flo-lovely2-footer-a1b-m__c");

$link_list = flo_data($data, "flo-lovely2-footer-a1b-r__l");
$link_font = flo_font_data($data, "flo-lovely2-footer-a1b-r__l-f");
$mobile_instagram_feed_visibility_class = flo_data($data, "flo-fiji2-footerf-a1a__insta_hide_mobile") ? 'hide-mobile-instagram' : '';
?>
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__link",
    $link_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css." {
      color: ".$elements_color.";
      border-color: ".hex2rgba($elements_color, 0.1).";
      background-color: ".$bgc.";
    }
  "
])
<div class="{{$b}} {{$mobile_instagram_feed_visibility_class}}">
  <div class="{{$b}}__left-area">


    @include('components.flo-footer-image-feed', [
      "source" => $images_source,
      "images" => $images,
      "count" => 3,
      "imgfeed_width" => 640,
      "imgfeed_height" => 640,
      "instasize" => "640x640_crop"
    ])

  </div>
  <div class="{{$b}}__middle-area flo-post">
    {{$middle_area_content}}
  </div>
  <div class="{{$b}}__right-area">

    @if ($link_list)
      <div class="{{$b}}__link-list">
        @foreach ($link_list as $link_key => $link)
          <a class="{{$b}}__link" href="{{$link["url"]}}">{{$link["title"]}}</a>
          @if ($link_key == 1)
            <br>
          @endif
        @endforeach

      </div>
    @endif
  </div>
</div>
