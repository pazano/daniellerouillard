<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link               https://flothemes.com/
 * @since             1.0.0
 * @package           Flo_Instagram
 *
 * @wordpress-plugin
 * Plugin Name:       Flo Social
 * Plugin URI:         https://flothemes.com/
 * Description:       Flo Social is an awesome plugin allowing you to easily add your Instagram feed to your WordPress site and customize it using built in features.
 * Version:           2.3.1
 * Author:            Flothemes
 * Author URI:         https://flothemes.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       flo-instagram
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
define( 'FLO_INSTAGRAM_VERSION', '2.3.1' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-flo-instagram-activator.php
 */
function activate_flo_instagram() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-flo-instagram-activator.php';
	Flo_Instagram_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-flo-instagram-deactivator.php
 */
function deactivate_flo_instagram() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-flo-instagram-deactivator.php';
	Flo_Instagram_Deactivator::deactivate();
}

/**
 * The code that runs after plugin update.
 * This action is documented in includes/class-flo-instagram-updater.php
 */
function update_flo_instagram() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-flo-instagram-updater.php';
	Flo_Instagram_Updater::update();
}

if (!function_exists('flo_instagram_init')) {
	function flo_instagram_init() {
		return false;
	}
}

register_activation_hook( __FILE__, 'activate_flo_instagram' );
register_deactivation_hook( __FILE__, 'deactivate_flo_instagram' );
add_action( 'upgrader_process_complete', 'update_flo_instagram',10, 2);

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-flo-instagram.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_flo_instagram() {

	$plugin = new Flo_Instagram();
	$plugin->run();

}
run_flo_instagram();