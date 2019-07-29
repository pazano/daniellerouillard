<?php
  global $dif_mob_menu, $dif_mob_menu_id;
?>

@if ($dif_mob_menu)
  <?php
    $menu = wp_get_nav_menu_object($dif_mob_menu_id);
    $menu_slug = $menu->slug;
  ?>
  {{
    wp_nav_menu(
      array(
        'container' => '',
        'menu_class' => $b.'__menu',
        "menu_id" => $dif_mob_menu_id,
        "menu" => $menu_slug
      )
    );
  }}
@else
  {{
    wp_nav_menu(
      array(
      'container' => '',
      'menu_class' => $b.'__menu',
      'theme_location' => 'primary'
      )
    );
  }}
@endif