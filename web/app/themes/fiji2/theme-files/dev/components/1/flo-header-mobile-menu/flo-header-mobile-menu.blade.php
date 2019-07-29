<?php
  $b = "flo-mobile-menu";
  $b__for_css = ".".$b;
  
  global $dif_mob_menu, $dif_mob_menu_id;
  
  $flo_mobile_header__use_another = flo_get_option("flo-lovely2-header-mobile-popup__use-another-menu", false);
  $flo_mobile_header__another_menu = flo_get_option("flo-lovely2-header-mobile-popup__menu-to-use");
  
  if($flo_mobile_header__use_another) {
    // global variables for usage in mobile header popup
    $dif_mob_menu = true;
    $dif_mob_menu_id = $flo_mobile_header__another_menu;
  }
  
  $bgc = flo_get_option("flo-lovely2-header-mobile-popup__background-color", false);
  $elements_color = flo_get_option("flo-lovely2-header-mobile-popup__elements-color", false);
  $close_button_label = flo_get_option("flo-lovely2-header-mobile-popup__close-button-label", false);
  $display_social_links = flo_get_option("flo-lovely2-header-mobile-popup__display-social-links");
  
  $mobile_popup_layout = flo_get_option("flo-fiji2-header-mobile-popup__type", "type-a");
  if ($mobile_popup_layout == "type-a") {
    $mobile_popup_class = $b ."__popup-type-a";
  } else {
    $mobile_popup_class = $b ."__popup-type-b";
  }
?>
@include('core.style', [
  "breakpoint__small_only" => "
    ".$b__for_css." {
      background-color: ".$bgc.";
      color: ".$elements_color.";
    }

    /* START: DROPDOWN ITEMS */
      ".$b__for_css."__menu > li
      {
        border-bottom-color: ".hex2rgba($elements_color, 0.15)."!important;
      }

      ".$b__for_css."__menu-dropdown-toggle
      {
        color: ".hex2rgba($elements_color, 0.15)."!important;
      }
    /* END: DROPDOWN ITEMS */

  "
])
<div class="{{$b}} {{$mobile_popup_class}}" data-onready="flo_mobile_menu">
  <div class="{{$b}}__top-area">
    @include('components.flo-header-mobile__logo')
    <div class="{{$b}}__close">
      {{$close_button_label}}
    </div>
  </div>

  @include('components.flo-header-mobile-menu__menu')

  <div class="{{$b}}__bottom-area">
    @if ($display_social_links)
      <div class="{{$b}}__social-links">
        @include('components.social-links')
      </div>
    @endif
    @include('components.flo-header-mobile-menu__copyright-area')
  </div>
</div>

{{-- <script type="text/javascript">
  // DEV -> Trigger mobile menu on page load
  jQuery(function($){
    setTimeout(function () {
      $(".flo-header-mobile__menu-trigger").click();
    }, 10);
  });
</script> --}}
