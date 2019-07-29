<?php
  $use_custom_logo = flo_get_option("flo-lovely2-header-mobile-header__use-custom-logo", false);
  if ($use_custom_logo) {
    /* START: USE CUSTOM MOBILE LOGO */
      $custom_logo_type = flo_get_option("flo-lovely2-header-mobile-header__logo-type", false);
      $custom_logo_text = flo_get_option("flo-lovely2-header-mobile-header__logo-text", false);
      $custom_logo_image = flo_get_option("flo-lovely2-header-mobile-header__logo-image", false);
      $custom_logo_image_light = flo_get_option("flo-lovely2-header-mobile-header__logo-image--light", false);

      $logo_type = $custom_logo_type;
      $logo_text = $custom_logo_text;
      $logo_image = $custom_logo_image;
      $logo_image_light = $custom_logo_image_light ? $custom_logo_image_light : $custom_logo_image;
    /* END: USE CUSTOM MOBILE LOGO */
  } else {
    /* START: USE DESKTOP LOGO */
      $desktop_logo_type = flo_get_option("flo-lovely2-header__logo-type", "site-title");
      $desktop_logo_text = flo_get_option("flo-lovely2-header__logo-text", false);;
      $desktop_logo_image = flo_get_option("flo-lovely2-header__logo-image", false);;
      $desktop_logo_image_light = flo_get_option("flo-lovely2-header__logo-image--light", false);;

      $logo_type = $desktop_logo_type;
      $logo_text = $desktop_logo_text;
      $logo_image = $desktop_logo_image;
      $logo_image_light = $desktop_logo_image_light ? $desktop_logo_image_light : $desktop_logo_image;
    /* END: USE DESKTOP LOGO */
  }

?>

<a href="{{ get_home_url() }}" class="flo-header-mobile__logo">
  @if($logo_type == "image")
    <img class="flo-header-mobile__logo-image flo-header-mobile__logo-image--default" src="{{ $logo_image }}" alt="{{ get_bloginfo( 'name' ) }}"/>
    <img class="flo-header-mobile__logo-image flo-header-mobile__logo-image--light" src="{{ $logo_image_light }}" alt="{{ get_bloginfo( 'name' ) }}"/>
  @elseif($logo_type == "text")
    {{ $logo_text }}
  @elseif($logo_type == "site-title" || !$logo_type)
    {{ get_bloginfo( 'name' ); }}
  @endif
</a>
