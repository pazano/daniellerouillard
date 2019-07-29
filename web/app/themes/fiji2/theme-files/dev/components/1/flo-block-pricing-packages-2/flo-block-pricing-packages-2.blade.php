<?php
$b = "flo-block-pricing-packages-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation


/* START: Title Area */
  $pretitle_and_title_color = flo_data($data, "title_color");
  $pretitle = flo_data($data, "pretitle");
  $pretitle_font = flo_data($data, "pretitle_font");
  $title = flo_data($data, "title");
  $title_font = flo_data($data, "title_font");
/* END: Title Area */

/* START: Pricing Packages */

  $pricing_packages = flo_data($data, "pricing_packages");

  $packages_background_color = flo_data($data, "packages_background_color");
  $packages_background_color_hover = flo_data($data, "packages_background_color_hover");
  $packages_elements_color = flo_data($data, "packages_elements_color");

  $package_number_font = flo_data($data, "package_number_font");
  $package_title_font = flo_data($data, "package_title_font");
  $package_description_font = flo_data($data, "package_text_font");
  $package_price_label_font = flo_data($data, "package_price_label_font");
  $button_link_font = flo_data($data, "button_link_font");
  $button_link_color = flo_data($data, "button_link_color");
  $button_background_color = flo_data($data, "button_background_color");
  $button_background_color_hover = flo_data($data, "button_background_color_hover");

  $total_packages_number = count($pricing_packages);
  $package_number_class = $total_packages_number == 3 ? $b."__packages-area--3-packages" : "";

/* END: Pricing Packages */
?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    /* START: Title Area */

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

      ".$b__uniq_for_css." ".$b__for_css."__title-area {
        color: ".$pretitle_and_title_color.";
      }

    /* END: Title Area */

    /* START: Pricing Packages */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__package-number",
      $package_number_font
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
      $package_price_label_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__package-button",
      $button_link_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__package {
        color: ".$packages_elements_color.";
        background-color: ".$packages_background_color.";
      }
        ".$b__uniq_for_css." ".$b__for_css."__package:hover {
          background-color: ".$packages_background_color_hover.";
        }

      /* START: Package Button */

        ".$b__uniq_for_css." ".$b__for_css."__package-button {
          color: ".$button_link_color.";
          background-color: ".$button_background_color.";
        }
          ".$b__uniq_for_css." ".$b__for_css."__package-button:hover {
            background-color: ".$button_background_color_hover.";
          }

      /* END: Package Button */


    /* END: Pricing Packages */

  "

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

    @if ($pricing_packages)
      <div class="{{$b}}__packages-area {{$package_number_class}}">
        @foreach ($pricing_packages as $pricing_package)
          <?php
            $package_number = flo_data($pricing_package, "number");
            $package_title = flo_data($pricing_package, "title");
            $package_description = flo_data($pricing_package, "text");
            $package_price = flo_data($pricing_package, "price_label");
            $package_button = flo_data($pricing_package, "package_button");
          ?>
          <div class="{{$b}}__package">

            @if ($package_number)
              <span class="{{$b}}__package-number">
                {{$package_number}}
              </span>
            @endif

            @if ($package_title)
              <h3 class="{{$b}}__package-title">{{$package_title}}</h3>
            @endif

            @if ($package_description)
              <p class="{{$b}}__package-description">{{$package_description}}</p>
            @endif

            @if ($package_price)
              <span class="{{$b}}__package-price">{{$package_price}}</span>
            @endif

            @if (isset($package_button['title']) and strlen($package_button['title']))
              <div class="{{$b}}__package-button-wrap">
                <a class="{{$b}}__package-button" href="{{$package_button['url']}}" target="{{$package_button['target']}}">
                  {{$package_button['title']}}
                </a>
              </div>
            @endif

          </div>
        @endforeach
      </div>
    @endif

  </div>
@overwrite
