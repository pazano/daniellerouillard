<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://flothemes.com/
 * @since             1.0.0
 * @package           Flo_Support
 *
 * @wordpress-plugin
 * Plugin Name:       FloSupport
 * Plugin URI:        https://flothemes.com/flo-support/
 * Description:       If you ever need help with anything related to your FloTheme, this tool will be here to help!
 * Version:           0.4
 * Author:            Flothemes.com
 * Author URI:        https://flothemes.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       flo-support
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'FLO_SUPPORT_VERSION', '0.4' );
define( 'FLO_SUPPORT_PATH',  plugin_dir_url( __FILE__ ) );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-flo-support-activator.php
 */
function activate_flo_support() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-flo-support-activator.php';
	Flo_Support_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-flo-support-deactivator.php
 */
function deactivate_flo_support() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-flo-support-deactivator.php';
	Flo_Support_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_flo_support' );
register_deactivation_hook( __FILE__, 'deactivate_flo_support' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-flo-support.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_flo_support() {

	$plugin = new Flo_Support();
	$plugin->run();

}
run_flo_support();
