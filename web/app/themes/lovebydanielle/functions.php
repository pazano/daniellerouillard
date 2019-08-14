<?php
function theme_enqueue_styles() {
    wp_enqueue_style( 'parent-main-style', get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-main-style', get_stylesheet_directory_uri() . '/style.css', array('parent-main-style') );
    wp_enqueue_style( 'child-forms-style', get_stylesheet_directory_uri() . '/styles/forms.css', array('parent-main-style') );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

// function dequeue_starter_styles() {
// 	// this removes the original style
// 	wp_dequeue_style( 'start-style' );
// 	wp_deregister_style( 'start-style' );
// }
// add_action( 'wp_enqueue_scripts', 'dequeue_starter_styles', 20 );

// function enqueue_parent_styles() {
// 	// parent style ( this loads the css from the main folder )
// 	wp_enqueue_style( 'parent-main-style', get_template_directory_uri() .'/style.css' );
// }
// add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );

// function enqueue_child_styles() {
// 	// child style ( this loads the css from the child folder after parent-style )
//     wp_enqueue_style( 'child-main-style', get_stylesheet_directory_uri() .'/style.css' );
//     wp_enqueue_style( 'child-forms-style', get_stylesheet_directory_uri() .'/styles/forms.css' );
// }
// add_action( 'wp_enqueue_scripts', 'enqueue_child_styles', 999 );
?>
