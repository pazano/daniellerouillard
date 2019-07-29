<?php 
/**
 *======================================================================
 * THIS FILE IS SUPPOSE TO HANDLE THE FILETERS SPESIFIC TO THIS THEME
 *======================================================================
 */


/**
 *
 * Add the necessary body classed depending on options
 *
 */
if(!function_exists('flo_lovely2_body_class')){
  function flo_lovely2_body_class($classes) {
    global $flo_options;

    if(flo_get_option('flo-lovely2-setions__fade-effect-disable')){
      $classes[] = 'flo-appear-disabled'; // disable the blocks fade in effect
    }

    if(flo_get_option('flo-lovely2-setings__tablet-fade-effect-disable', true)){ // default value should be true
      $classes[] = 'flo-tablet-appear-disabled'; // Tablet: disable the blocks fade in effect
    }

    if(flo_get_option('flo-lovely2-setings__mobile-fade-effect-disable', true)){ // default value should be true
      $classes[] = 'flo-mobile-appear-disabled'; // Mobile: disable the blocks fade in effect
    }

    return $classes;
  }
}

add_filter('body_class', 'flo_lovely2_body_class');


function flo_set_lovely2_typography_option_url(){
  return get_admin_url().'admin.php?page=acf-options-10-style&edit_font_style=';
}
add_filter('flo_custom_typography_option_url','flo_set_lovely2_typography_option_url');

/*==================================================
=         BOF   STYLEKIT specific settings            =
==================================================*/

  /**
   *
   * Block comment
   *
   */
  if(!function_exists('flo_disable_typography_color')){
    function flo_disable_typography_color(){
      // this means the Typography default color is disabled for this theme
      return true;
    }
  }
  add_filter('flo_disable_typography_color','flo_disable_typography_color');

/*=====  End of STYLEKIT specific settings  ======*/


add_filter('flo_current_theme_typography_options_page', 'lvy_typography_options_page');
function lvy_typography_options_page(){
  return array('flotheme_page_acf-options-10-style','flotheme_page_acf-options-1-introduction');

}

/* START: ADD DEFAULT LAYOUT TO PAGE ON CREATION */
  add_filter('acf/load_value/name=layout', 'add_starting_repeater', 10, 3);
  function  add_starting_repeater($value, $post_id, $field) {
    if ($value !== NULL) {
      // $value will only be NULL on a new post
      return $value;
    }
    // add default layouts
    // $value = array(
    //   array(
    //     'acf_fc_layout' => 'wp_title'
    //   ),
    //   array(
    //     'acf_fc_layout' => 'wp_content'
    //   ),
    //   array(
    //     'acf_fc_layout' => 'footer_placeholder'
    //   )
    // );
    // return $value;
  }
/* END: ADD DEFAULT LAYOUT TO PAGE ON CREATION */


/**
 *
 * This theme does not need the Page font_field_objects
 * therefore we use the 'flo_pages_need_font_field_objects' filter to disable it.
 *
 */
add_filter('flo_pages_need_font_field_objects', 'flo_lovely2_page_font_field_objects');
function flo_lovely2_page_font_field_objects() {
  return false;
}


/**
 *
 * This is used in function.php to define the $content_width
 *
 */
add_filter('flo_max_content_width', 'flo_lovely2_max_content_width');
function flo_lovely2_max_content_width(){
  return 1300;
}

/**
 *
 * Add the proper layout_field_id for the LVY2 theme.
 * it is used by the Flo Flexible layout
 */
add_filter('flo_layout_field_id', 'flo_lovely_2_layout_field_id');
function flo_lovely_2_layout_field_id() {
  return 'field_5a2547584f1a1';

}

/**
 * added the correct style kit option name for Lvy 2 theme
 */
add_filter('flo_theme_stylekit_option_name', 'flo_lvy_stylekit_option_name');
function flo_lvy_stylekit_option_name() {
  return 'flo-stylekit-lovely2';
}


/**
 *
 * this filter is used to pass the correct default layout options name for posts and galleries
 * the names passed here are then used to delete the transients on options save
 *
 */
add_filter('flo_cached_layout_options', 'flo_fiji2_cached_layout_options');
function flo_fiji2_cached_layout_options() {
  // the layout options names
  $cached_layout = array('flo-l2-p_layout','flo-l2-g_layout');

  return $cached_layout;
}

/**
 *
 * this filter is used to return the correct layout options names for the Blog posts
 * and Gallery posts.
 * It is usually used to generate the proper WPML xml config file for the saved options.
 *
 */
add_filter('flo_layout_options_name', 'flo_fiji2_layout_options_names');
function flo_fiji2_layout_options_names() {
  // the layout options names
  $layout_options_names = array('flo-l2-p','flo-l2-g');

  return $layout_options_names;
}


/**
 *
 * Because the theme folder name is different from the  Product slug on flothems.com
 * We need to corect it to be able to get the correct change log
 *
 */
add_filter('flo_changelog_product_name','flo_lovely2_changelog_product_name');
function flo_lovely2_changelog_product_name() {
  return 'fiji-2';
}

?>