<?php
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-main-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-main-style', get_stylesheet_directory_uri() . '/style.css', array('parent-main-style') );
    wp_enqueue_style( 'child-forms-style', get_stylesheet_directory_uri() . '/styles/forms.css', array('parent-main-style') );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

add_filter( 'jpeg_quality', create_function( '', 'return 100;' ) );

?>
