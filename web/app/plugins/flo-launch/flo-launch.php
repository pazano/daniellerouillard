<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://flothemes.com
 * @since             1.0.0
 * @package           Flo_Launch
 *
 * @wordpress-plugin
 * Plugin Name:       Flo Launch
 * Plugin URI:        https://flothemes.com
 * Description:       Create, Populate and test your New Site privately inside WordPress whilst keeping your current site live. When your ready, just launch it at the click of a button.
 * Version:           2.2.5
 * Author:            Nichita S.
 * Author URI:        https://flothemes.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       flo-launch
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined('WPINC') ) {
    die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define('FLO_LAUNCH_VERSION', '2.2.5');

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-flo-launch-activator.php
 */
function activate_flo_launch()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-flo-launch-activator.php';
    Flo_Launch_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-flo-launch-deactivator.php
 */
function deactivate_flo_launch()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-flo-launch-deactivator.php';
    Flo_Launch_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_flo_launch');
register_deactivation_hook(__FILE__, 'deactivate_flo_launch');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-flo-launch.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_flo_launch()
{

    $plugin = new Flo_Launch();
    $plugin->run();

}
run_flo_launch();

/**
 * Load plugin activation popup after the plugin activation process
 */
function flo_launch_plugin_activation()
{

 add_option('Flo_Launch_Activated', 'flo-launch');

}
register_activation_hook(__FILE__, 'flo_launch_plugin_activation');

function flo_launch_load_plugin()
{
   if ( is_admin() && get_option('Flo_Launch_Activated') == 'flo-launch' ) {

       delete_option('Flo_Launch_Activated');
       include_once('includes/flo-launch-activation-popup.php');
   }
}

add_action('admin_init', 'flo_launch_load_plugin');
