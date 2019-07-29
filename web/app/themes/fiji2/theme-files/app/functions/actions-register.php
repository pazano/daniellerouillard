<?php
/**
 * Register all the themes actions here and their functions
 *
 * @since  0.1.0
 */


	// used for Slideshow to add data to the new added slides
	add_action('wp_ajax_get_slide_data', 'flo_get_slide_data' );
	if(!function_exists('flo_get_slide_data')){
		function flo_get_slide_data(){

		    if (isset($_POST['post_id']) && isset($_POST['attachment_id']) && isset($_POST['container_class'])) {

		        $key = $_POST['container_class']; // the unique key that will be used mark each slide info

		        echo flo_get_slider_image_meta($_POST['attachment_id'], array(), $_POST['post_id'], $key);

		    }

		    exit;
		}
	}

	add_action('wp_ajax_floSendContact' , 'flo_send_contact' );
    add_action('wp_ajax_nopriv_floSendContact' , 'flo_send_contact' );

    add_action('wp_ajax_floSendContactFancy' , 'lvy_send_contact' );
    add_action('wp_ajax_nopriv_floSendContactFancy' , 'lvy_send_contact' );

     

	//add_action( 'init', 'flo_plugins_loaded' );
	if(!function_exists('flo_plugins_loaded')){
		function flo_plugins_loaded(){
			// var_dump('dddd');
			// if(!defined('COSMO_TEMPLATE_PATH')){
			// 	define('COSMO_TEMPLATE_PATH',get_template_directory().'/theme-files/floshortcodes/');
			// }else{
			// 	uopz_undefine('COSMO_TEMPLATE_PATH');
			// 	define('COSMO_TEMPLATE_PATH',get_template_directory().'/theme-files/floshortcodes/');
			// }
			define('COSMO_TEMPLATE_PATH',false);
			define('COSMO_TEMPLATE_PATH',get_template_directory().'/theme-files/floshortcodes/');
		}
	}

?>
