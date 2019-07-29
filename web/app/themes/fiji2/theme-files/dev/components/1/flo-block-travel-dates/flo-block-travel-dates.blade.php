<?php
$b = "flo-block-travel-dates"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");

$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$title_paragraph = flo_data($data, "title_paragraph");
$title_paragraph_font = flo_data($data, "title_paragraph_font");
$image = flo_data($data, "image");
$image_area_position = flo_data($data, "image_area_position");
$image_area_position_class = $image_area_position == "left" ? $b."--image-area-left" : $b."--image-area-right";

$text_area_background_color = flo_data($data, "text_area_background_color");
$text_area_title = flo_data($data, "text_area_title");
$text_area_title_font = flo_data($data, "text_area_title_font");
$travel_dates_links = flo_data($data, "travel_dates_links");
$travel_date_font = flo_data($data, "travel_date_font");
$travel_destination_font = flo_data($data, "travel_destination_font");

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }

      /* START: IMAGE AREA */

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__title",
        $title_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__title-paragraph",
        $title_paragraph_font
        )
        ."

      /* END: IMAGE AREA */

      /* START: TEXT AREA */

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__text-area-title",
        $text_area_title_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__date",
        $travel_date_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__destination",
        $travel_destination_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__text-area {
          background-color: ".$text_area_background_color.";
        }

      /* END: TEXT AREA */

    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$image_area_position_class}}">
    @if ($title or $title_paragraph or $image)

      <div class="{{$b}}__image-area">

        @if ($title)
          <h3 class="{{$b}}__title">
            {{$title}}
          </h3>
        @endif

        @if ($title_paragraph)
          <h4 class="{{$b}}__title-paragraph">
            {{$title_paragraph}}
          </h4>
        @endif

        @if ($image)
          {{ flo_aq_img($class = $b . "__image", $url = $image['url'], $width = 808, $height = 544, $crop = true, $alt = $image['alt'], $force_sizes = true) }}
        @endif

      </div>

    @endif

    <div class="{{$b}}__text-area">

      @if ($text_area_title)
        <h2 class="{{$b}}__text-area-title">
          {{$text_area_title}}
        </h2>
      @endif

      @if ($travel_dates_links)
        <div class="{{$b}}__travel-dates-links">
          @foreach ($travel_dates_links as $key => $travel_date_link)
            <?php
              $date = flo_data($travel_date_link, "date");
              $destination = flo_data($travel_date_link, "destination");
              $url = flo_data($travel_date_link, "url");
            ?>
            <div class="{{$b}}__travel-date-link">
              @if ($date)
                <h5 class="{{$b}}__date">
                  {{$date}}
                </h5>
              @endif

              @if ($destination)
                <h4 class="{{$b}}__destination">
                  {{$destination}}
                </h4>
              @endif

              @if ($url)
                <a class="{{$b}}__url" href="{{$url}}"></a>
              @endif

            </div>
          @endforeach
        </div>

      @endif

    </div>

  </div>
@overwrite
