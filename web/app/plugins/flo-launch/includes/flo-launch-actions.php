<?php
include_once('class-flo-launch-actions.php');

add_action('wp_ajax_flo_clone_website', 'flo_clone_db');
add_action('wp_ajax_flo_edit_config_file', 'flo_edit_config_file');
add_action('wp_ajax_flo_set_cookie', 'flo_set_cookie');
add_action('wp_ajax_nopriv_flo_set_cookie', 'flo_set_cookie');
add_action('wp_ajax_flo_remove_cookie', 'flo_remove_cookie');
add_action('wp_ajax_flo_delete_test_mode', 'flo_delete_test_mode');
add_action('wp_ajax_flo_getLiveWpDbTables', 'flo_getLiveWpDbTables');
add_action('wp_ajax_flo_clearCache', 'flo_clearCache');
add_action('wp_ajax_flo_nopriv_access_test_mode', 'flo_nopriv_access_test_mode');
add_action('wp_ajax_nopriv_flo_nopriv_access_test_mode', 'flo_nopriv_access_test_mode');
add_action('wp_ajax_flo_generateShareToken', 'flo_generateShareToken');

add_action('wp_ajax_flo_backupTable', 'flo_backupTable');
add_action('wp_ajax_flo_cloneTable', 'flo_cloneTable');
add_action('wp_ajax_flo_lauchTestSite', 'flo_lauchTestSite');
add_action('wp_ajax_flo_revertTestSite', 'flo_revertTestSite');
add_action('admin_init', 'set_default_admin_color');

function crypto_rand_secure($min, $max)
{
    $range = $max - $min;
    if ($range < 1) return $min; // not so random...
    $log = ceil(log($range, 2));
    $bytes = (int) ($log / 8) + 1; // length in bytes
    $bits = (int) $log + 1; // length in bits
    $filter = (int) (1 << $bits) - 1; // set all lower bits to 1
    do {
        $rnd = hexdec(bin2hex(openssl_random_pseudo_bytes($bytes)));
        $rnd = $rnd & $filter; // discard irrelevant bits
    } while ($rnd > $range);
    return $min + $rnd;
}

function flo_generateShareToken() {

  $pageID = $_POST['pageID'];
  $result = array();
  $result['token'] = '';
  $result['pageID'] = $pageID;
  $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  $max = strlen($codeAlphabet);

  for ($i=0; $i < 24; $i++) {
      $result['token'] .= $codeAlphabet[crypto_rand_secure(0, $max-1)];
  }

  flo_launch_set_db_option('flo_launch_share_' . $pageID, $result['token']);

  $result['timestamp'] = gmdate(time()+43200);
  flo_launch_set_db_option('flo_launch_timestamp_' . $pageID, $result['timestamp']);
  echo json_encode($result);

  die();
}

function flo_nopriv_access_test_mode() {
  $result = array();
    $result['responce'] = true;
    $result['prefix'] = flo_launch_get_db_option('last_active_prefix');
    $result['message'] = 'Accessing Clone mode';

  echo json_encode($result);

  die();
}

function flo_getLiveWpDbTables()
{
  global $wpdb;

  $allTables = '*'; // Get all tables from the Database
  $currentSiteTables = array(); // Initialize array of the selected ( current site ) tables
  if ( flo_launch_get_db_option('flo_status') !== 'in_progress' ) {
    $currentSitePrefix = flo_launch_get_db_option('flo_live_db_prefix');
  } else {
    $currentSitePrefix = '_';
  }

  // Format tables array
  if ($allTables == '*') {
      $allTables = array();
      $result = mysqli_query($wpdb->dbh, 'SHOW TABLES');
      while ($row = mysqli_fetch_row($result)) {
          $allTables[] = $row[0];
      }
  } else {
      $allTables = is_array($allTables) ? $allTables : explode(',', str_replace(' ', '', $allTables));
  }

  foreach ($allTables as $key => $table) {
      if (strpos($table, $currentSitePrefix) !== false) {
        array_push($currentSiteTables, $table);
      }
    }

  $result = json_encode($currentSiteTables);

  echo $result;

  die();
}

function flo_backupTable()
{
    $initActions = new FLO_LAUNCH_ACTIONS();
    global $wpdb;

    $index = $_POST['index'];
    $table = $_POST['table'];
    $total = $_POST['total'];
    $result = $initActions->backupTable($index, $total, $table) ? true : false;
    $initActions->logMessage('Backup Status :: ' . $result);

    die();
}

function flo_cloneTable()
{
    $initActions = new FLO_LAUNCH_ACTIONS();
    global $wpdb;

    $index = $_POST['index'];
    $table = $_POST['table'];
    $total = $_POST['total'];
    $prefix = $_POST['prefix'];
    $result = $initActions->cloneTable($index, $total, $prefix, $table) ? true : false;
    $initActions->logMessage('Clone Status :: ' . $result);

    die();
}

function flo_clone_db()
{
  $initActions = new FLO_LAUNCH_ACTIONS();
  global $wpdb;

  $result = $initActions->cloneTables($wpdb->get_col('SHOW TABLES')) ? true : false;
  $initActions->logMessage('Clone Status :: ' . $result);

  die();
}

function flo_delete_test_mode()
{
    $initActions = new FLO_LAUNCH_ACTIONS();
    global $wpdb;

    $result = $initActions->removeTables($wpdb->get_col('SHOW TABLES')) ? true : false;
    $initActions->logMessage('Delete Status :: ' . $result);

    $config_file_name = 'wp-config.php';
    if (file_exists(ABSPATH . $config_file_name)) {
        $global_config_file = ABSPATH . $config_file_name;
    } else {
        $global_config_file = dirname(ABSPATH) . '/'.$config_file_name;
    }

    $file_contents = file_get_contents($global_config_file);
    $old_prefix = flo_launch_get_db_option('flo_live_db_prefix');

    $regex = '/.*flo_custom_table_prefix.*\n/';


    $new_file_contents = preg_replace($regex, '', $file_contents);
    file_put_contents($global_config_file, $new_file_contents);

    die();
}

function flo_edit_config_file()
{
    global $wpdb;
    $config_file_name = 'wp-config.php';
    if (file_exists(ABSPATH . $config_file_name)) {
        $global_config_file = ABSPATH . $config_file_name;
    } else {
        $global_config_file = dirname(ABSPATH) . '/'.$config_file_name;
    }

    $file_contents = file_get_contents($global_config_file);
    if ( defined('WP_ALLOW_MULTISITE') && WP_ALLOW_MULTISITE === true ) {
      $old_prefix = $wpdb->base_prefix;
    } else {
        $old_prefix = flo_launch_get_db_option('flo_live_db_prefix');
    }

    $old_line = "\$table_prefix\s*=\s*'" . $old_prefix . "'\s*;";
    $regex = '/(?<=^|;|\s|<\?\s)(\s*?)(\h*\$table_prefix\s*=)(\s*([\'"].*?[\'"]|.*?)\s*;)/';
    if ( !strpos($file_contents, 'flo_custom_table_prefix' ) ) {
      $new_line   = PHP_EOL . '$table_prefix = \'' . $old_prefix . '\';' . PHP_EOL;
      $new_line  .= 'if(isset($_COOKIE["flo_custom_table_prefix"]) && $_COOKIE["flo_custom_table_prefix"] != "") {';
      $new_line  .= '$table_prefix=$_COOKIE["flo_custom_table_prefix"];';
      $new_line  .= '}';

      $new_file_contents = preg_replace($regex, $new_line, $file_contents);

      file_put_contents($global_config_file, $new_file_contents);
    }
    die();
}

function flo_lauchTestSite()
{
    global $wpdb;
    $config_file_name = 'wp-config.php';
    if (file_exists(ABSPATH . $config_file_name)) {
        $global_config_file = ABSPATH . $config_file_name;
    } else {
        $global_config_file = dirname(ABSPATH) . '/'.$config_file_name;
    }

    $file_contents = file_get_contents($global_config_file);
    $old_prefix = flo_launch_get_db_option('flo_live_db_prefix');
    $new_prefix = flo_launch_get_db_option('last_active_prefix');

    $old_line = "\$table_prefix\s*=\s*'" . $old_prefix . "'\s*;";
    $regex = '/(?<=^|;|\s|<\?\s)(\s*?)(\h*\$table_prefix\s*=)(\s*([\'"].*?[\'"]|.*?)\s*;)/';

    $new_line   = PHP_EOL . '$table_prefix = \'' . $new_prefix . '\';' . PHP_EOL;

    $new_file_contents = preg_replace($regex, $new_line, $file_contents);
    file_put_contents($global_config_file, $new_file_contents);

    $file_contents = file_get_contents($global_config_file);

    $regex = '/.*flo_custom_table_prefix.*\n/';


    $new_file_contents = preg_replace($regex, '', $file_contents);
    file_put_contents($global_config_file, $new_file_contents);

    flo_launch_set_db_option('last_active_prefix', $old_prefix);
    flo_launch_set_db_option('flo_live_db_prefix', $new_prefix);
    flo_launch_set_db_option('flo_status', 'launched');

    die();
}

function flo_revertTestSite()
{
    global $wpdb;
    $config_file_name = 'wp-config.php';
    if (file_exists(ABSPATH . $config_file_name)) {
        $global_config_file = ABSPATH . $config_file_name;
    } else {
        $global_config_file = dirname(ABSPATH) . '/'.$config_file_name;
    }

    $file_contents = file_get_contents($global_config_file);
    $new_prefix = flo_launch_get_db_option('flo_live_db_prefix');
    $old_prefix = flo_launch_get_db_option('last_active_prefix');

    $regex = '/(?<=^|;|\s|<\?\s)(\s*?)(\h*\$table_prefix\s*=)(\s*([\'"].*?[\'"]|.*?)\s*;)/';

    $new_line   = PHP_EOL . '$table_prefix = \'' . $old_prefix . '\';' . PHP_EOL;

    $new_file_contents = preg_replace($regex, $new_line, $file_contents);
    file_put_contents($global_config_file, $new_file_contents);

    $file_contents = file_get_contents($global_config_file);

    if ( !strpos($file_contents, 'flo_custom_table_prefix' ) ) {
      $new_line   = PHP_EOL . '$table_prefix = \'' . $old_prefix . '\';' . PHP_EOL;
      $new_line  .= 'if(isset($_COOKIE["flo_custom_table_prefix"]) && $_COOKIE["flo_custom_table_prefix"] != "") {';
      $new_line  .= '$table_prefix=$_COOKIE["flo_custom_table_prefix"];';
      $new_line  .= '}';

      $new_file_contents = preg_replace($regex, $new_line, $file_contents);

      file_put_contents($global_config_file, $new_file_contents);
    }

    flo_launch_set_db_option('last_active_prefix', $new_prefix);
    flo_launch_set_db_option('flo_live_db_prefix', $old_prefix);
    flo_launch_set_db_option('flo_status', 'in_progress');

    die();
}

function flo_remove_cookie() {
  if (isset($_SERVER['HTTP_COOKIE'])) {
    $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
    foreach($cookies as $cookie) {
        $parts = explode('=', $cookie);
        $name = trim($parts[0]);
        setcookie($name, '', time()-1000);
        setcookie($name, '', time()-1000, '/');
    }
  }

}
function flo_set_cookie() {
  flo_remove_cookie();
  $value = isset($_POST['clone_mode_prefix']) ? $_POST['clone_mode_prefix'] : null;
  setcookie("flo_custom_table_prefix", $value, time()+3600*24*365*3, '/');  /* expire in 3 years */

}
function flo_launch_get_db_option($name)
{
    global $wpdb;
    try {
        $sql = "SELECT value FROM flo_launch_db WHERE meta_key='$name' limit 1";
        $res = mysqli_query($wpdb->dbh, $sql);
        if ( $res ) {
          $result = mysqli_fetch_object($res);
          if ( $result ) {
            return $result->value;
          }
        }

    } catch (Exception $e) {
        print_r($e->getMessage());
        die();
    }
}

/**
 * Add the plugins db options
 *
 * @since    1.0.1
 */
function flo_launch_set_db_option($name, $value)
{
    global $wpdb;
    try {
        $sql = "INSERT INTO `flo_launch_db` (meta_key, value) VALUES ('$name', '$value') ON DUPLICATE KEY UPDATE value = '$value'";
        $res = mysqli_query($wpdb->dbh, $sql);
    } catch (Exception $e) {
        print_r($e->getMessage());
        die();
    }
}

function set_default_admin_color($user_id) {
    $flo_test_mode = (isset($_COOKIE["flo_custom_table_prefix"]) && $_COOKIE["flo_custom_table_prefix"] != "") ? true : false;

    $user_id = get_current_user_id();

    if ( $flo_test_mode ) {
      $args = array(
          'ID' => $user_id,
          'admin_color' => 'sunrise'
      );
      wp_update_user( $args );
    } else {
      $args = array(
          'ID' => $user_id,
          'admin_color' => 'default'
      );
      wp_update_user( $args );
    }
}

function flo_clearCache() {

      // WP Rocket
      // http://docs.wp-rocket.me/article/92-rocketcleandomain
      if ( function_exists('rocket_clean_domain') ) {
          rocket_clean_domain();
      }

      // Better Wordpress Minify plugin
      // bwp-minify/includes/class-bwp-minify.php
      global $bwp_minify;

      if ( is_object( $bwp_minify ) && method_exists ( $bwp_minify, '_flush_cache' ) ) {
          $bwp_minify->_flush_cache();
      }

      // Autooptimize
      if ( class_exists( 'autoptimizeCache' ) ) {

          if (method_exists('WpeCommon', 'purge_memcached')) {
              autoptimizeCache::clearall();
          }
      } else {
          flohub_autoptimize_flush_pagecache();
      }
      die();
  }

  /**
   * Flush cache function taken from AutoOptimize plugin.
   *
   * flush as many page cache plugin's caches as possible
   * hyper cache and gator cache hook into AO, so we don't need to :-)
   */
function flohub_autoptimize_flush_pagecache() {

      if(function_exists('wp_cache_clear_cache')) {
          if (is_multisite()) {
              $blog_id = get_current_blog_id();
              wp_cache_clear_cache($blog_id);
          } else {
              wp_cache_clear_cache();
          }
      } else if ( has_action('cachify_flush_cache') ) {
          do_action('cachify_flush_cache');
      } else if ( function_exists('w3tc_pgcache_flush') ) {
          w3tc_pgcache_flush();
      } else if ( function_exists('wp_fast_cache_bulk_delete_all') ) {
          wp_fast_cache_bulk_delete_all(); // still to retest
      } else if (class_exists("WpFastestCache")) {
          $wpfc = new WpFastestCache();
          $wpfc -> deleteCache();
      } else if ( class_exists("c_ws_plugin__qcache_purging_routines") ) {
          c_ws_plugin__qcache_purging_routines::purge_cache_dir(); // quick cache, still to retest
      } else if ( class_exists("zencache") ) {
          zencache::clear();
      } else if ( class_exists("comet_cache") ) {
          comet_cache::clear();
      } else if ( class_exists("WpeCommon") ) {
          if ( apply_filters('autoptimize_flush_wpengine_aggressive', false) ) {
              if ( method_exists( "WpeCommon", "purge_memcached" ) ) {
                  WpeCommon::purge_memcached();
              }
              if ( method_exists( "WpeCommon", "clear_maxcdn_cache" ) ) {
                  WpeCommon::clear_maxcdn_cache();
              }
          }
          if ( method_exists( "WpeCommon", "purge_varnish_cache" ) ) {
              WpeCommon::purge_varnish_cache();
          }
      } else if(file_exists(WP_CONTENT_DIR.'/wp-cache-config.php') && function_exists('prune_super_cache')){
          // fallback for WP-Super-Cache
          global $cache_path;
          if (is_multisite()) {
              $blog_id = get_current_blog_id();
              prune_super_cache( get_supercache_dir( $blog_id ), true );
              prune_super_cache( $cache_path . 'blogs/', true );
          } else {
              prune_super_cache($cache_path.'supercache/',true);
              prune_super_cache($cache_path,true);
          }
      }
  }
