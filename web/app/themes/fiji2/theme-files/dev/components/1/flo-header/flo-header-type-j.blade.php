<?php
  $popup_menu_trigger_open_label = flo_data($data, "flo-lovely2-header__menu-trigger-open-label");
  $popup_menu_trigger_close_label = flo_data($data, "flo-lovely2-header__menu-trigger-close-label");
  $popup_menu_trigger_font = flo_data($data, "flo-lovely2-header__menu-trigger-label-font");

  $popup_use_another_menu = flo_data($data, "flo-lovely2-header__popup-menu-use-another-menu");
  $popup_menu_to_use = flo_data($data, "flo-lovely2-header__popup-menu-menu-to-use");
  $popup_bgc = flo_data($data, "flo-lovely2-header__popup-menu-background-color");
  $popup_elements_color = flo_data($data, "flo-lovely2-header__popup-menu-items-color");
  $popup_items_font = flo_data($data, "flo-lovely2-header__popup-menu-items-font");

  $hide_menu = flo_data($data, "flo-lovely2-header__hide-menu");
?>
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__popup-menu",
    $popup_items_font
    )
    ."

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__popup-menu-trigger",
    $popup_menu_trigger_font
    )
    ."

    ".$b__uniq_for_css." ".$b__for_css."__popup-menu {
      color: $popup_elements_color;
    }

    ".$b__uniq_for_css." ".$b__for_css."__popup-menu-wrap--open ".$b__for_css."__popup-menu-trigger,
    ".$b__uniq_for_css." ".$b__for_css."__popup-menu-wrap--open ".$b__for_css."__popup-menu,
    ".$b__uniq_for_css." ".$b__for_css."__popup-menu-items ul
    {
      background-color: $popup_bgc;
    }

  "
])
<div class="{{$b}} {{$b__uniq}} {{$b}}--type-j" data-onready="flo_header_type_j">

  <div class="{{$b}}__popup-menu-top-wrap">
    <div class="{{$b}}__popup-menu-wrap">

      <div class="{{$b}}__popup-menu-trigger">
        <div class="{{$b}}__popup-menu-trigger-icon-wrap">
          <div class="{{$b}}__popup-menu-trigger-icon {{$b}}__popup-menu-trigger-icon--open">
            <i class="flo-icon-menu-trigger"></i>
          </div>
          <div class="{{$b}}__popup-menu-trigger-icon {{$b}}__popup-menu-trigger-icon--close">
            <i class="flo-icon-close-icon"></i>
          </div>
        </div>

        <div class="{{$b}}__popup-menu-trigger-label-wrap">
          <div class="{{$b}}__popup-menu-trigger-label {{$b}}__popup-menu-trigger-label--open">
            {{$popup_menu_trigger_open_label}}
          </div>
          <div class="{{$b}}__popup-menu-trigger-label {{$b}}__popup-menu-trigger-label--close">
            {{$popup_menu_trigger_close_label}}
          </div>
        </div>
      </div>

      @if ($popup_use_another_menu)
        <?php
          $menu = wp_get_nav_menu_object($popup_menu_to_use);
          $menu_slug = $menu->slug;
        ?>
        {{
          wp_nav_menu(
            array(
              "container_class" => $b . "__popup-menu",
              "menu_class" => $b . "__popup-menu-items",
              "menu_id" => $popup_menu_to_use,
              "menu" => $menu_slug
            )
          );
        }}
      @else
        {{
          wp_nav_menu(
            array(
              "container_class" => $b . "__popup-menu",
              "menu_class" => $b . "__popup-menu-items",
              'theme_location' => 'primary'
            )
          );
        }}
      @endif

    </div>
  </div>


  @include('components.flo-header__logo')

  <div class="{{$b}}__menu-area">
    @if (!$hide_menu)
      @include('components.flo-header__menu')
    @endif
  </div>
</div>
