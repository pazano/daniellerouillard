<?php
  $b = "flo-header";

  /* START: CLASS NAME AUTOMATION */
    $b__for_css = ".".$b; // To be used inside CSS
    $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
    $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
  /* END: CLASS NAME AUTOMATION */

  /* START: DATA */
    if (isset($data) && flo_data($data, "custom_header_layout")) {
      $options = $flo_options;
      $ch = flo_data($data, "ch");

      $data = array_replace($options, $ch);

    } else {
      //$data = get_fields("options");
      $data = $flo_options;
    }
  /* END: DATA */

  /* START: DEFINE HEADER TYPES */
    $lovely2_data_header_layout = flo_data($data, "flo-lovely2-header__layout", "flo-header--layout-type-a");

    // Map -> option value => blade component name
    $lovely2_headers = array(
      'flo-header--layout-type-a' => 'flo-header-type-a',
      'flo-header--layout-type-b' => 'flo-header-type-b',
      'flo-header--layout-type-c' => 'flo-header-type-c',
      'flo-header--layout-type-d' => 'flo-header-type-d-or-e',
      'flo-header--layout-type-e' => 'flo-header-type-d-or-e',
      'flo-header--layout-type-f' => 'flo-header-type-f-or-g',
      'flo-header--layout-type-g' => 'flo-header-type-f-or-g',
      'flo-header--layout-type-h' => 'flo-header-type-h-or-i',
      'flo-header--layout-type-i' => 'flo-header-type-h-or-i',
      'flo-header--layout-type-j' => 'flo-header-type-j'
    );
    $flo_header__layout = flo_data($lovely2_headers, $lovely2_data_header_layout, "flo-header--type-a");

    // make sure we always have one of the permitted theme headers
    if(!in_array($flo_header__layout, $lovely2_headers)){
      $flo_header__layout = 'flo-header--type-a';
    }
  /* END: DEFINE HEADER TYPES */

  /* START: NON STICKY HEADER VALUES */
    $flo_header__background_color = flo_data($data, "flo-lovely2-header__background-color", "#F8F6F5");
    $flo_header__elements_color = flo_data($data, "flo-lovely2-header__elements-color", "#000000");
    $flo_header__spacing = flo_data($data, "flo-fiji2-header__elements-color", "60") / 16 ."rem";
  /* END: NON STICKY HEADER VALUES */

  /* START: STICKY HEADER VALUES */
    $flo_header__sticky_header_background_color = flo_data($data, "flo-lovely2-header__sticky-header-background-color", "#ffffff");
    $flo_header__sticky_header_background_opacity = flo_data($data, "flo-lovely2-header__sticky-header-background-opacity", 100) / 100;
    $flo_header__sticky_header_elements_color = flo_data($data, "flo-lovely2-header__sticky-header-elements-color", "#332F2F");

    if(flo_data($data, "flo-lovely2-header__sticky-header") ){
      $sticky_header_class = 'flo-header--sticky';
    }
    else{
      $sticky_header_class = false;
    }
  /* END: STICKY HEADER VALUES */
  
  /* START: HEADER TOPBAR */
    $enable_topbar = flo_get_option("flo-fiji2-header_top_bar_enable", false);
    if($enable_topbar) {
      $topbar_layout = flo_get_option("flo-fiji2-header_top_bar_layout", "simple");
    }
  /* END: HEADER TOPBAR */

?>
@include('core.style', [
  "breakpoint__general" => "
    /* START: NON STICKY HEADER RULES */
      header:not(.is-sticky) ".$b__uniq_for_css." {
        color: ".$flo_header__elements_color.";
        border-color: ".hex2rgba($flo_header__elements_color, 0.3).";
        padding-top: ".$flo_header__spacing.";
        padding-bottom: ".$flo_header__spacing.";
      }

      header:not(.is-sticky) ".$b__uniq_for_css." {
        background-color: ".$flo_header__background_color.";
      }
      header:not(.is-sticky) ".$b__uniq_for_css." ".$b__for_css."__menu > ul > li > a {
        color: ".$flo_header__elements_color.";
      }
    /* END: NON STICKY HEADER RULES */

    /* START: STICKY HEADER RULES */
      .flo-header--sticky .is-sticky ".$b__uniq_for_css." {
        background-color: ".hex2rgba($flo_header__sticky_header_background_color, $flo_header__sticky_header_background_opacity) .";
        color: ".$flo_header__sticky_header_elements_color."!important;
        border-color: ". hex2rgba($flo_header__sticky_header_elements_color, 0.3).";
      }
    /* END: STICKY HEADER RULES */
  "
])

<header class="{{$sticky_header_class}}" data-layout="{{$lovely2_data_header_layout}}" data-onready="flo_header_block">
  @if($enable_topbar)
    @include('components.' . 'flo-header__topbar--' . $topbar_layout)
  @endif
  @include('components.' . $flo_header__layout)
</header>
