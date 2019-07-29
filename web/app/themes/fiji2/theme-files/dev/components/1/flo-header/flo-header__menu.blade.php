<?php

$flo_header__dropdown_menu_background_color = flo_data($data, "flo-lovely2-header__dropdown-menu-background-color","#090909");
$flo_header__dropdown_menu_color = flo_data($data, "flo-lovely2-header__dropdown-menu-items-color","#fff");
$flo_header__menu_use_another = flo_data($data, "flo-lovely2-header__use-another-menu");
$flo_header__menu_to_use = flo_data($data, "flo-lovely2-header__menu-to-use");

$menu_items_font = flo_font_data($data, "flo-lovely2-header__menu-items-font");
$dropdown_items_font = flo_font_data($data, "flo-lovely2-header__dropdown-menu-items-font");

$display_search = flo_data($data, "flo-lovely2-header__display-search");
?>
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__search-form-input",
    $menu_items_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__search-form {
      background-color: ".$flo_header__background_color.";
      color: ".$flo_header__elements_color.";
      border-color: ".$flo_header__elements_color.";
    }

    /* START: MENU */
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__menu > div > ul > li > a",
      $menu_items_font
      )
      ."


      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__menu .sub-menu a",
      $dropdown_items_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__menu .sub-menu li.current-menu-item a,
      ".$b__uniq_for_css." ".$b__for_css."__menu .sub-menu li.current-menu-parent a
      {
        ".$dropdown_items_font["active"]."
      }
    /* END: MENU */

    /* START: DROPDOWNS */
      ".$b__uniq_for_css." ".$b__for_css."__menu ul ul {
        background-color: ".$flo_header__dropdown_menu_background_color.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__menu ul ul:after {
        border-color: transparent transparent ".$flo_header__dropdown_menu_background_color." transparent!important;
      }

      ".$b__uniq_for_css." ".$b__for_css."__menu ul ul a {
        color: ".$flo_header__dropdown_menu_color."!important;
      }

      ".$b__uniq_for_css." ".$b__for_css."__menu li ul li > a:before {
        background-color: ".$flo_header__dropdown_menu_color.";
      }

    /* END: DROPDOWNS */

  "
])
<div class="{{$b}}__menu">
  @if ($display_search)
    <div class="{{$b}}__search-wrap">
      <div class="{{$b}}__search-trigger">
        <div class="{{$b}}__search-trigger-icon {{$b}}__search-trigger-icon--open">
          <i class="flo-icon-search"></i>
        </div>
        <div class="{{$b}}__search-trigger-icon {{$b}}__search-trigger-icon--close">
          <i class="flo-icon-close-icon"></i>
        </div>
      </div>

      <form class="{{$b}}__search-form" action="{{ home_url("/") }}" method="get">
        <input class="{{$b}}__search-form-input flo-no-styling" name="s" placeholder="<?php echo __("SEARCH") ?>" type="text" value="">
        <button class="{{$b}}__search-form-submit" type="submit" >
          <i class="{{$b}}__search-icon flo-icon-search"></i>
        </button>
      </form>
    </div>
  @endif

  @if ($flo_header__menu_use_another)
    <?php
      $menu = wp_get_nav_menu_object($flo_header__menu_to_use);
      $menu_slug = $menu->slug;
    ?>
    {{
      wp_nav_menu(
        array(
          "container_class" => $b . "__menu-wrap",
          "menu_class" => $b . "__menu-items",
          "menu_id" => $flo_header__menu_to_use,
          "menu" => $menu_slug
        )
      );
    }}
  @else
    {{
      wp_nav_menu(
        array(
          "container_class" => $b . "__menu-wrap",
          "menu_class" => $b . "__menu-items",
          'theme_location' => 'primary'
        )
      );
    }}
  @endif
</div>
