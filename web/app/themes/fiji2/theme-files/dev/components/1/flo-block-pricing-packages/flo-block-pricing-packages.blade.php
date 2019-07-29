<?php
$b = "flo-block-pricing-packages"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

// A. Title Area
  $pretitle = flo_data($data, "pretitle");
  $pretitle_font = flo_data($data, "pretitle_font");
  $title = flo_data($data, "title");
  $title_font = flo_data($data, "title_font");
  $title_color = flo_data($data, "title_color");
// B. Pricing Packages
  $pricing_packages = flo_data($data, "pricing_packages");
  $package_overlay_background_color = flo_data($data, "package_overlay_background_color");
  $package_overlay_elements_color = flo_data($data, "package_overlay_elements_color");
  $package_title_font = flo_data($data, "package_title_font");
  $package_description_font = flo_data($data, "package_text_font");
  $package_price_font = flo_data($data, "package_bottom_label_font");
// C. Button Area
  $button_link = flo_data($data, "button_link");
  $button_link_font = flo_data($data, "button_link_font");
  $button_link_color = flo_data($data, "button_link_color");
  $button_link_background_color = flo_data($data, "button_link_background_color");

  $total_packages_number = count($pricing_packages);
  $package_number_class = $total_packages_number == 3 ? $b."__packages-area--3-packages" : "";
?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

  ".
  flo_render_typography_styles(
  $b__uniq_for_css." ".$b__for_css."__pretitle",
  $pretitle_font
  )
  ."

  ".
  flo_render_typography_styles(
  $b__uniq_for_css." ".$b__for_css."__title",
  $title_font
  )
  ."

  ".
  flo_render_typography_styles(
  $b__uniq_for_css." ".$b__for_css."__package-title",
  $package_title_font
  )
  ."

  ".
  flo_render_typography_styles(
  $b__uniq_for_css." ".$b__for_css."__package-description",
  $package_description_font
  )
  ."

  ".
  flo_render_typography_styles(
  $b__uniq_for_css." ".$b__for_css."__package-price",
  $package_price_font
  )
  ."

  ".
  flo_render_typography_styles(
  $b__uniq_for_css." ".$b__for_css."__package-block-button",
  $button_link_font
  )
  ."

  ".$b__uniq_for_css." ".$b__for_css."__image-overlay {
    background-color: ".$package_overlay_background_color.";
  }
  ".$b__uniq_for_css." ".$b__for_css."__package-block-button {
    color: ".$button_link_color.";
    background-color: ".$button_link_background_color.";
    border-color: ".hex2rgba($button_link_color,0.1).";
  }
    ".$b__uniq_for_css." ".$b__for_css."__package-block-button:hover {
      color: ".$button_link_background_color.";
      background-color: ".$button_link_color.";
      border-color: ".$button_link_color.";
    }

  ".$b__uniq_for_css." ".$b__for_css."__title,
  ".$b__uniq_for_css." ".$b__for_css."__pretitle {
    color: ".$title_color.";
  }"
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">
    @if ($title or $pretitle)
      <div class="{{$b}}__title-area">

        @if ($pretitle)
          <h3 class="{{$b}}__pretitle">
            {{$pretitle}}
          </h3>
        @endif

        @if ($title)
          <h2 class="{{$b}}__title">
            {{$title}}
          </h2>
        @endif

      </div>
    @endif
    <div class="{{$b}}__packages-area {{$package_number_class}}">
      @foreach ($pricing_packages as $pricing_package)
        <?php
          $package_image = flo_data($pricing_package, "image");
          $package_title = flo_data($pricing_package, "title");
          $package_description = flo_data($pricing_package, "text");
          $package_price = flo_data($pricing_package, "bottom_label");
          $package_url = flo_data($pricing_package, "package_url");
          $package_elements_color_on_image = flo_data($pricing_package, "elements_on_image_color");
        ?>
        <div class="{{$b}}__package"
        style="
          --elements-on-image-color:{{$package_elements_color_on_image}};
          --elements-on-hover-color:{{$package_overlay_elements_color}};
          background-image: url({{$package_image['url']}});
        ">
          <div class="{{$b}}__package-content">
            <div class="{{$b}}__image-overlay"></div>

            @if ($package_title)
              <h3 class="{{$b}}__package-title">{{$package_title}}</h3>
            @endif

            @if ($package_description)
              <p class="{{$b}}__package-description">{{$package_description}}</p>
            @endif

            @if ($package_price)
              <div class="{{$b}}__package-price">{{$package_price}}</div>
            @endif

          </div>
          @if ($package_url)
            <a href="{{$package_url}}" class="{{$b}}__package-link" aria-label="{{$package_image['alt']}}"></a>
          @endif
        </div>
      @endforeach
    </div>
    @if ($button_link)
      <div class="{{$b}}__package-block-button-wrap">
        <a class="{{$b}}__package-block-button" href="{{$button_link['url']}}">{{$button_link['title']}}</a>
      </div>
    @endif
  </div>
@overwrite
