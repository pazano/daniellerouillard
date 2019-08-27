<?php

add_action('wp_ajax_flo_statussl', 'flo_statuSSL');
add_action('wp_ajax_flo_compatibility_php', 'flo_compatibility_PHP');
add_action('wp_ajax_flo_db_current_size', 'flo_DBCurrentSize');
add_action('wp_ajax_flo_php_memory_limit', 'flo_PHP_memory_limit');
add_action('wp_ajax_flo_config_permission', 'flo_config_permission');
add_action('wp_ajax_flo_content_permission', 'flo_content_permission');
add_action('wp_ajax_flo_disk_space', 'flo_disk_space');
  /**
  * Function which is checking the SSL status
  */

  function flo_statuSSL()
  {
    $status = is_ssl();
    $result = array();

    if ($status == true) {
      $result["response"] = true;
      $result["message"] = "SSL Activated";
    } else {
      $result["response"] = false;
      $result["message"] = "SSL not detected";
    }

    $initActions = new FLO_LAUNCH_ACTIONS();
    $initActions->logMessage('Clone Status :: ' . json_encode($result));
    echo json_encode($result);

    die();
  }

  /**
  * Function for PHP version
  */
  function flo_compatibility_PHP()
  {
    $currentPHP = phpversion();
    $result = array();
    if(version_compare(PHP_VERSION, '5.6.0') >= 0) {
      $result['phpversion'] = $currentPHP;
      $result["response"] = true;
      $result["message"] = "All Good!";
    } else {
      $result['PHP_VERSION'] = PHP_VERSION;
      $result['phpversion'] = $currentPHP;
      $result["response"] = false;
      $result["message"] = "The Current PHP version is outdated. Please contact the hosting support team and upgrade the PHP version to 5.6+";
    }

    $initActions = new FLO_LAUNCH_ACTIONS();
    $initActions->logMessage('Clone Status :: ' . json_encode($result));
    echo json_encode($result);

    die();
  }

  /**
  * Function to calculate the size, in bytes, of a MySQL database
  */
  function flo_DBCurrentSize()
  {
    global $wpdb;

    $sql = 'SELECT
    TABLE_SCHEMA AS DB_Name,
    ROUND(sum(data_length + index_length)/1024/1024) AS "db_size"
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = "'.DB_NAME.'"
    GROUP BY TABLE_SCHEMA ;';

    $result = $wpdb->get_results($sql);

    $initActions = new FLO_LAUNCH_ACTIONS();
    $initActions->logMessage('Clone Status :: ' . json_encode($result));
    return $result[0]->db_size;
  }

  /**
  * Function to check the memory_limit
  */
  function flo_PHP_memory_limit()
  {
    $memory_limit = ini_get('memory_limit');
    if (preg_match('/^(\d+)(.)$/', $memory_limit, $matches)) {
        if ($matches[2] == 'M') {
            $memory_limit = $matches[1] * 1024 * 1024; // nnnM -> nnn MB
        } else if ($matches[2] == 'K') {
            $memory_limit = $matches[1] * 1024; // nnnK -> nnn KB
        } else if ($matches[2] == 'G') {
            $memory_limit = $matches[1] * 1024 * 1024 * 1024; // nnnG -> nnn KB
        }
    }

    $memoryLimitValue = ($memory_limit >= 256 * 1024 * 1024);

    $result = array();
    if($memoryLimitValue) {
      $result["response"] = true;
      $result["message"] = "All Good!";
      $result["value"] = $memory_limit;
    } else {
      $result["response"] = false;
      $result["message"] = "The current Hosting Memory Limit is too low to procced with the Test mode creation, please upgrade the memory limit configuration in order to proceed further";
      $result["value"] = $memory_limit;
    }

    $initActions = new FLO_LAUNCH_ACTIONS();
    $initActions->logMessage('Clone Status :: ' . json_encode($result));
    echo json_encode($result);

    die();
  }

  /**
  * Function to check if the WP-CONFIG file is writeable and try to change the File permission
  */
  function flo_config_permission()
  {
    $configFileName = "wp-config.php";
    $config_file_name = 'wp-config.php';
		if ( file_exists( ABSPATH . $configFileName) ) {
			$config = ABSPATH . $configFileName;
		} else {
			$config = dirname(ABSPATH) . '/'.$configFileName;
		}
    $result = array();

    //check if file exists
    if ( file_exists($config) ) {

      //check if writable
      $configWrite = is_writable($config);
      //result return
      if($configWrite == false){
        $result["response"] = false;
        $result["message"] = "The wp-config.php file  is not writable. Please make the file writable in order to be able to proceed further.";
      } else {
        $result["response"] = true;
        $result["message"] = "Writable.";
      }

    } else {
      $result["response"] = false;
      $result["message"] = "The config file was not found.";
    }

    $initActions = new FLO_LAUNCH_ACTIONS();
    $initActions->logMessage('Clone Status :: ' . json_encode($result));
    echo json_encode($result);

    die();
  }

  /**
  * Function to check if the WP-CONTENT folder is writeable and try to change the Folder permission
  */
  function flo_content_permission()
  {
    $folder = ABSPATH ."wp-content";
    $result = array();

    if ( is_dir($folder) ) {
      //check if writable
      $contentWrite =  is_writable($folder);

      if ( $contentWrite == false ) {
        $result["response"] = false;
        $result["message"] = "Error: The wp-content folder  is %snot writable. Please make the folder writable in order to be able to use this plugin.";
      } else {
        $result["response"] = true;
        $result["message"] = "Writable";
      }

    } else {
      $result["response"] = false;
      $result["message"] = "The content folder was not found";
    }

    $initActions = new FLO_LAUNCH_ACTIONS();
    $initActions->logMessage('Clone Status :: ' . json_encode($result));
    echo json_encode($result);

    die();
  }

  /**
  * Function which is checking the free disk space according to double sized DB and + 150% of DB size for further operations
  */
  function flo_disk_space()
  {
    $path = ABSPATH;
    // get disable_disk_check wordpress option;
    $disable_disk_check = get_option('disable_disk_check');
    $necessaryDBsize = flo_DBCurrentSize() * 3;
    $result = array();

    if ( ( disk_free_space($path) !== false && disk_free_space($path) > $necessaryDBsize ) && $disable_disk_check == false ) {
      $result["response"] = true;
      $result["message"] = "All good";
    } else {
      $result["response"] = false;
      $result["message"] = "There is not enough disk space on the server to proceed with the process, or the disk space is not readable.";
    }

    $initActions = new FLO_LAUNCH_ACTIONS();
    $initActions->logMessage('Clone Status :: ' . json_encode($result));
    echo json_encode($result);

    die();
  }
