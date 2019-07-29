<?php

define('_TN_', wp_get_theme());
define('FLOTHEME_CUSTOMIZED', false); // set to TRUE if you changed something in the source code.
define('_FLO_NEWS_', 'https://flothemes.com/blog');
define('_FLO_SUPPORT_', 'https://flothemes.com/submit-a-ticket');
define('_FLO_CORE_', 'Enzo');
/*============================================*/
// Minimum required version.
/*============================================*/
define( 'THEME_REQUIRED_PHP_VERSION', '5.4.0' );

add_action( 'init', 'flo_maybe_deactivate_acf' );

/**
 * Check if ACF is activated, then disable it
 * if acf plugins is activated, we disable it to avoid conflicts
 * @since    1.0.0
 */
if(!function_exists('flo_maybe_deactivate_acf')){
	function flo_maybe_deactivate_acf() {
		if(is_admin()){

			if(get_option('acf_generate_notice')) {
				add_action( 'admin_notices', 'flo_acf_deactivated_admin_notice' );
				delete_option('acf_generate_notice');
			}

			// this should make the 'is_plugin_active' function available
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

			if(function_exists('is_plugin_active')){
				if ( is_plugin_active( 'advanced-custom-fields/acf.php' ) ||
				is_plugin_active( 'advanced-custom-fields-pro/acf.php') ||
				is_plugin_active( 'acf-plugin/acf.php')
				) {

					deactivate_plugins('advanced-custom-fields/acf.php');
					deactivate_plugins('advanced-custom-fields-pro/acf.php');
					deactivate_plugins('acf-plugin/acf.php');

					// reload the current page to avoid warnings
					update_option('acf_generate_notice', 1);
					header("Location: ".$_SERVER['REQUEST_URI']);
				}
			}

			if(function_exists('is_plugin_active_for_network')){
				if ( is_plugin_active_for_network( 'advanced-custom-fields/acf.php' ) ||
				is_plugin_active_for_network( 'advanced-custom-fields-pro/acf.php') ||
				is_plugin_active_for_network( 'acf-plugin/acf.php')
				) {

					deactivate_plugins('advanced-custom-fields/acf.php');
					deactivate_plugins('advanced-custom-fields-pro/acf.php');
					deactivate_plugins('acf-plugin/acf.php');

					// reload the current page to avoid warnings
					update_option('acf_generate_notice', 1);
					header("Location: ".$_SERVER['REQUEST_URI']);
				}
			}
		}
	}
}

add_action( 'init', 'flo_maybe_deactivate_acf' );
// add_action( 'customize_preview_init', 'flo_maybe_deactivate_acf' );


/**
 * Show a message to the user when the ACF is disabled
 *
 * @since    1.0.0
 */
if(!function_exists('flo_acf_deactivated_admin_notice')){
	function flo_acf_deactivated_admin_notice() { ?>
		<div class="error notice-warning">
			<p><?php echo sprintf(__( 'The ACF (Advanced Custom Fields) plugin was disabled to avoid conflicts with the %s theme', 'flotheme' ), _TN_); ?></p>
    </div><?php
	}
}

if(!function_exists('flo_server_requirements_admin_notice')) {
	function flo_server_requirements_admin_notice() { ?>
		<div class="error notice-warning" style="padding: 20px; font-size: 16px; line-height: 1.4;">
			<?php
				echo sprintf(__('You need to update your PHP version to run %s.<br>
					The PHP version that is currently used on your website is %s, while the minimum required is %s.<br>
					Check %s this tutorial%s to find out how to update the PHP version.', 'flotheme'),
				_TN_,
				'<b><u>'.phpversion().'</u></b>', '<b><u>'.THEME_REQUIRED_PHP_VERSION.'</u></b>',
				'<a href="https://docs.flothemes.com/changing-php-version/" target="_blank">', '</a>')
			?>
	  </div>
	<?php }
}

function customizer_php_version_notice() {
	die(flo_server_requirements_admin_notice());
}

function revert_theme_change () {
	switch_theme( get_option( 'theme_switched' ) );
}

if ( version_compare(phpversion(), THEME_REQUIRED_PHP_VERSION, '>=') ){
	include_once 'flo-functions.php';
} else {
	add_action( 'after_switch_theme', 'revert_theme_change' );
  add_action( 'admin_notices', 'flo_server_requirements_admin_notice' );
	add_action( 'customize_preview_init', 'customizer_php_version_notice' );
}

add_action("init", "maybe_fix_memory_limit");
if(!function_exists("maybe_fix_memory_limit")) {
	function maybe_fix_memory_limit() {

		if ( wp_is_ini_value_changeable('memory_limit') === true ) {
			$flo_current_limit     = @ini_get( 'memory_limit' );
			$flo_current_limit_int = wp_convert_hr_to_bytes( $flo_current_limit );
			$flo_min_memory = wp_convert_hr_to_bytes('512M');
			//memory can be changed, change to 512 at least
			if ( $flo_current_limit_int <= $flo_min_memory ) {
				ini_set('memory_limit', '512M');

				if(!defined("WP_MEMORY_LIMIT")) {
					define( 'WP_MEMORY_LIMIT', '512M' );
				}

				if(!defined("WP_MAX_MEMORY_LIMIT")) {
					define( 'WP_MAX_MEMORY_LIMIT', '512M' );
				}
			}
		}

	}
}
