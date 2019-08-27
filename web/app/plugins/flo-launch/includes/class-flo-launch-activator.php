<?php

/**
* Fired during plugin activation
*
* @link       https://flothemes.com
* @since      1.0.0
*
* @package    Flo_Launch
* @subpackage Flo_Launch/includes
*/

/**
* Fired during plugin activation.
*
* This class defines all code necessary to run during the plugin's activation.
*
* @since      1.0.0
* @package    Flo_Launch
* @subpackage Flo_Launch/includes
* @author     Nichita S. <nikita@flosites.net>
*/
class Flo_Launch_Activator
{

/**
 * Short Description. (use period)
 *
 * Long Description.
 *
 * @since    1.0.0
 */
public static function activate()
{

    /*
    * Creates Database Table that will be used to run the plugin
    */
    try {

      global $wpdb;

            if (!mysqli_set_charset($wpdb->dbh, DB_CHARSET)) {
                    mysqli_query($wpdb->dbh, 'SET NAMES ' . DB_CHARSET);
            }

            $sql = "CREATE TABLE flo_launch_db (
							meta_key VARCHAR(30) NOT NULL PRIMARY KEY,
							value VARCHAR(30) NOT NULL
							)";
      $res = mysqli_query($wpdb->dbh, $sql);

            /*
            * Stores the initial Database prefix
            */
            if ( empty(flo_launch_get_db_option('flo_live_db_prefix')) && empty(flo_launch_get_db_option('flo_status') ) ) {
              if ( defined('WP_ALLOW_MULTISITE') && WP_ALLOW_MULTISITE === true ) {
                flo_launch_set_db_option('flo_live_db_prefix', $wpdb->base_prefix);
              } else {
                  flo_launch_set_db_option('flo_live_db_prefix', $wpdb->prefix);
              }
              flo_launch_set_db_option('flo_status', 'start_process');
            }
    }
    catch (Exception $e) {
            $upload_dir = wp_upload_dir();
            $log  = "User: ".$_SERVER['REMOTE_ADDR'].' - '.date("F j, Y, g:i a").PHP_EOL.
            "Backup result: " . $e->getMessage() .PHP_EOL.
            "-------------------------".PHP_EOL;

            //Save string to log, use FILE_APPEND to append.
            file_put_contents(UPLOADS_DIRECTORY . '/flo-launch-backups/log_'.date("j.n.Y").'.log', $log, FILE_APPEND);
            // print_r($e->getMessage());
            die();
    }

}

}
