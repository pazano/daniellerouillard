<?php
$b = "flo-header-mobile";
$b__for_css = ".".$b;

$logo_max_width = flo_get_option("flo-lovely2-header-mobile-header__logo-max-width", 160) / 16 . "rem";

$layout = flo_get_option("flo-lovely2-header-mobile-header__layout", "a");
$layout_class = $b . "--type-" . $layout;
$bgc = flo_get_option("flo-lovely2-header-mobile-header__background-color", false);
$elements_color = flo_get_option("flo-lovely2-header-mobile-header__elements-color", false);

$is_sticky = flo_get_option("flo-lovely2-header-mobile-header__is-sticky", false);
$sticky_class = $is_sticky ? "sticky" : "";
$sticky_bgc = flo_get_option("flo-lovely2-header-mobile-header__sticky-background-color", false);
$sticky_elements_color = flo_get_option("flo-lovely2-header-mobile-header__sticky-elements-color", false);

$menu_trigger_label = flo_get_option("flo-lovely2-header-mobile-header__menu-trigger-label");
$menu_trigger_font = flo_get_option("flo-lovely2-header-mobile-header__menu-trigger-label-font");
?>

@include('core.style', [
  "breakpoint__general" => "

    /* START: LOGO */
      .flo-header-mobile__logo {
        max-width: ".$logo_max_width.";
      }
    /* END: LOGO */

    /* START: COLORS */
      .flo-header-mobile {
        background-color: ".$bgc.";
        color: ".$elements_color.";
      }

      .is-sticky .flo-header-mobile.is-main {
        background-color: ".$sticky_bgc.";
        color: ".$sticky_elements_color.";
      }
    /* END: COLORS */
  "
])

<div class="{{$b}} {{$layout_class}} {{$sticky_class}}">
  <div class="{{$b}}__spacer"></div>
  @include("components.flo-header-mobile__logo")
  <div class="{{$b}}__menu-trigger">
    {{$menu_trigger_label}}
  </div>
</div>
