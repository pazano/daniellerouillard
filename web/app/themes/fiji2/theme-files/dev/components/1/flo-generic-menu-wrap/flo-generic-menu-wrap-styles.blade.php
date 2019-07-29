<?php
  $b = ".flo-generic-menu-wrap";

  $flo_header__dropdown_menu_background_color = flo_get_option("flo-lovely2-header__dropdown-menu-background-color","#090909");
  $flo_header__dropdown_menu_color = flo_get_option("flo-lovely2-header__dropdown-menu-items-color","#fff");
?>
<style media="screen">
  /* START: DROPDOWNS */
    {{$b}}__menu ul {
      background-color: {{$flo_header__dropdown_menu_background_color}};
    }
    {{$b}}__menu ul:after {
      border-color: transparent transparent {{$flo_header__dropdown_menu_background_color}} transparent!important;
    }

    {{$b}}__menu ul a {
      color: {{$flo_header__dropdown_menu_color}}!important;
    }
  /* END: DROPDOWNS */
</style>
