<?php
$b = "flo-slideshow"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

?>

@include('core.style', [
  "breakpoint__general" => "

    /* START: SLIDE SELECTOR */
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__slide-selector-pretitle",
      $title_area_pretitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__slide-selector-second-pretitle",
      $title_area_second_pretitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__slide-selector-title",
      $title_area_title_font_c
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__slide-selector:before,
      ".$b__uniq_for_css." ".$b__for_css."__slide-selector-wrap:before
      {
        background-color: ".$title_area_background_color_on_hover.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__slide-selector-second-pretitle,
      ".$b__uniq_for_css." ".$b__for_css."__slide-selector-title
      {
        color: ".$title_area_text_color."!important;
      }

      ".$b__uniq_for_css." ".$b__for_css."__slide-selector.slick-current ".$b__for_css."__slide-selector-second-pretitle,
      ".$b__uniq_for_css." ".$b__for_css."__slide-selector.slick-current ".$b__for_css."__slide-selector-title,
      ".$b__uniq_for_css." ".$b__for_css."__slide-selector:hover ".$b__for_css."__slide-selector-second-pretitle,
      ".$b__uniq_for_css." ".$b__for_css."__slide-selector:hover ".$b__for_css."__slide-selector-title
      {
        color: ".$title_area_text_color_on_hover."!important;
      }
    /* END: SLIDE SELECTOR */

    /* START: RIGHT BAR */
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__right-bar-link",
      $right_bar_link_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__right-bar {
        background-color: ".$right_bar_background_color.";
        border-left-color: ".flo_color("secondary-line-color").";
        border-bottom-color: ".flo_color("secondary-line-color").";
      }

      ".$b__uniq_for_css." ".$b__for_css."__right-bar-search-trigger,
      ".$b__uniq_for_css." ".$b__for_css."__right-bar-link,
      ".$b__uniq_for_css." ".$b__for_css."__right-bar-menu-trigger
      {
        color: ".$right_bar_elements_color."!important;
      }
    /* END: RIGHT BAR */

  "
])
<div class="{{$b}}__layout {{$b}}__layout--type-c" data-onready="flo_slideshow__layout__type_c">

  {{-- START: TOP AREA --}}
    <div class="{{$b}}__top-area">
      @if ($display_logo)
        <div class="{{$b}}__top-area-logo">
          @include('components.flo-header__logo')
        </div>
      @endif

      @if ($display_social_links)
        <div class="{{$b}}__top-area-social-links">
          @include('components.social-links')
        </div>
      @endif
    </div>
  {{-- END: TOP AREA --}}

  @include('components.flo-slideshow__slides')
  @include('components.flo-slideshow__featured-link')

  {{-- START: SLIDE SELECTOR --}}
    @if($slideshow_data["slides"])
      <div class="{{$b}}__slide-selectors">

        @foreach($slideshow_data["slides"] as $slide)
          <div class="{{$b}}__slide-selector">

            <div class="{{$b}}__slide-selector-wrap">
              @if ($slide["pretitle"])
                <h3 class="{{$b}}__slide-selector-pretitle">
                  {{$slide["pretitle"]}}
                </h3>
              @endif
              @if ($slide["second_pretitle"])
                <h3 class="{{$b}}__slide-selector-second-pretitle">
                  {{$slide["second_pretitle"]}}
                </h3>
              @endif
              <h3 class="{{$b}}__slide-selector-title">
                {{$slide["title"]}}
              </h3>
            </div>

          </div>
        @endforeach

      </div>
    @endif
  {{-- END: SLIDE SELECTOR --}}

  {{-- START: RIGHT BAR --}}
    <div class="{{$b}}__right-bar">
      @if ($right_bar_display_search)
        <div class="{{$b}}__right-bar-search-trigger" data-open="flo-header-popup">
          <i class="flo-icon-search"></i>
        </div>
      @endif

      @if ($right_bar_display_link)
        <a href="{{$right_bar_link_url}}" class="{{$b}}__right-bar-link">
          {{$right_bar_link_title}}
        </a>
      @endif

      <div class="{{$b}}__right-bar-menu-trigger" data-open="flo-header-popup">
        <i class="flo-icon-menu-trigger"></i>
      </div>
    </div>
  {{-- END: RIGHT BAR --}}

</div>
