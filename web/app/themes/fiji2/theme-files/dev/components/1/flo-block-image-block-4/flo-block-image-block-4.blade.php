<?php
$b = "flo-block-image-block-4"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

  $areas_order = flo_data($data, "areas_order");
  $image = flo_data($data, "image");

/* START: Text Area */
  $background_color = flo_data($data, "background_color");
  $elements_color = flo_data($data, "elements_color");
  $title = flo_data($data, "title");
  $title_font = flo_data($data, "title_font");
  $subtitle = flo_data($data, "subtitle");
  $subtitle_font = flo_data($data, "subtitle_font");
  $text = flo_data($data, "text");

  $button_type = flo_data($data, "button_type");

    /* START: Button Type A */
      $but_a_primary_button = flo_data($data, "but_a_primary_button");
      $but_a_secondary_button = flo_data($data, "but_a_secondary_button");
      $but_a_buttons_label_font = flo_data($data, "but_a_buttons_label_font");
      $but_a_buttons_color = flo_data($data, "but_a_buttons_color");
      $but_a_buttons_accent_color = flo_data($data, "but_a_buttons_accent_color");
    /* END: Button Type A */

    /* START: Button Type B */
      $but_b_links = flo_data($data, "but_b_links");
      $but_b_buttons_label_font = flo_data($data, "but_b_buttons_label_font");
      $but_b_buttons_color = flo_data($data, "but_b_buttons_color");
      $but_b_buttons_borders_color = flo_data($data, "but_b_buttons_borders_color");
      $but_b_buttons_accent_color = flo_data($data, "but_b_buttons_accent_color");
    /* END: Button Type B */

/* END: Text Area */

?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    /* START: Text Area */

      ".$b__uniq_for_css." ".$b__for_css."__text-area {
        color: ".$elements_color.";
        background-color: ".$background_color.";
      }

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__subtitle",
      $subtitle_font
      )
      ."

      /* START: Button Type A */
        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__button",
        $but_a_buttons_label_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__button {
          color: ".$but_a_buttons_color.";
          border-color: ".$but_b_buttons_borders_color.";
        }

        ".$b__uniq_for_css." ".$b__for_css."__button {
          background-color: ".$but_a_buttons_accent_color.";
        }
          ".$b__uniq_for_css." ".$b__for_css."__button:hover {
            color: ".$but_a_buttons_accent_color.";
            background-color: ".$but_a_buttons_color.";
          }

      /* END: Button Type A */

      /* START: Button Type B */

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__button-link",
        $but_b_buttons_label_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__button-link {
          color: ".$but_b_buttons_color.";
          border-color: ".$but_b_buttons_borders_color.";
          background-color: ".$but_b_buttons_borders_color.";
        }
          ".$b__uniq_for_css." ".$b__for_css."__button-link:before {
            color: #BDBDBD;
          }
          ".$b__uniq_for_css." ".$b__for_css."__button-link:hover {
            background-color: ".$but_b_buttons_accent_color.";
          }

      /* END: Button Type B */

    /* END: Text Area */

  ",

  "style_name" => $b__uniq
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">

    @if ($areas_order)
      @foreach ($areas_order as $key => $area)

        {{-- START: Image --}}
          @if ($area == "image")
            @if ($image)
              {{ flo_aq_img($class = $b . "__image", $url = $image['url'], $width = 900, $height = 1300, $crop = true, $alt = $image['alt'], $force_resize = true) }}
            @endif
          @endif
        {{-- END: Image --}}

        {{-- START: Text Area --}}
          @if ($area == "text_area")
            <div class="{{$b}}__text-area">

              @if ($title)
                <h2 class="{{$b}}__title">
                  {{$title}}
                </h2>
              @endif

              @if ($subtitle)
                <h3 class="{{$b}}__subtitle">
                  {{$subtitle}}
                </h3>
              @endif

              @if ($text)
                <div class="{{$b}}__text flo-post">
                  {{$text}}
                </div>
              @endif

              @if ($button_type == "flo-button--type-a")

                {{-- START: Button Type A --}}
                  <div class="{{$b}}__buttons-wrap">

                    {{-- START: Primary Button --}}
                      @if (isset($but_a_primary_button['title']) and strlen($but_a_primary_button['title']))
                        <a class="{{$b}}__button {{$b}}__button--primary" href="{{$but_a_primary_button['url']}}" target="{{$but_a_primary_button['target']}}">
                          {{$but_a_primary_button['title']}}
                        </a>
                      @endif
                    {{-- END: Primary Button --}}

                    {{-- START: Secondary Button --}}
                      @if (isset($but_a_secondary_button['title']) and strlen($but_a_secondary_button['title']))
                        <a class="{{$b}}__button {{$b}}__button--secondary" href="{{$but_a_secondary_button['url']}}" target="{{$but_a_secondary_button['target']}}">
                          {{$but_a_secondary_button['title']}}
                        </a>
                      @endif
                    {{-- END: Secondary Button --}}

                  </div>
                {{-- END: Button Type A --}}

              @elseif ($button_type == "flo-button--type-b")

                {{-- START: Button Type B --}}
                  <div class="{{$b}}__button-links-wrap">
                    @if ($but_b_links)
                      @foreach ($but_b_links as $key => $but_b_single_link)

                        <?php
                          $but_b_link = flo_data($but_b_single_link, "button_link");
                        ?>

                        <a class="{{$b}}__button-link flo-icon-line-arrow-right" href="{{$but_b_link['url']}}" target="{{$but_b_link['target']}}">
                          {{$but_b_link['title']}}
                        </a>

                      @endforeach
                    @endif
                  </div>
                {{-- END: Button Type B --}}

              @endif


            </div>
          @endif
        {{-- END: Text Area --}}

      @endforeach
    @endif

  </div>
@overwrite
