<?php

/**
 * This file contains the FLO_LAUNCH_ACTIONS class wich performs
 * a akax callbacks for plugin
 * @author Nichita S <nichita.dots@gmail.com>
 * @version 1.0
 */

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

$upload_dir = wp_upload_dir();
define("UPLOADS_DIRECTORY", $upload_dir["basedir"]);
define("UPLOADS_URL", $upload_dir["baseurl"] . '/flo-launch-backups/');
define("BACKUP_DIR", UPLOADS_DIRECTORY . '/flo-launch-backups');

class FLO_LAUNCH_ACTIONS
{
    public function __construct()
    {
        // Include WP Abstact Class ( DB Connection )
        global $wpdb;

        $this->host                    = DB_HOST;
        $this->username                = DB_USER;
        $this->passwd                  = DB_PASSWORD;
        $this->dbName                  = DB_NAME;
        $this->charset                 = DB_CHARSET;
        $this->conn                    = $wpdb->dbh;
        $this->backupDir               = BACKUP_DIR ? BACKUP_DIR : '.';
        $this->backupFile              = 'flo-launch-backup-' . $this->dbName . '-' . date("Ymd_H", time()) . '.sql';
        $this->gzipBackupFile          = true;
        $this->disableForeignKeyChecks = true;
        $this->batchSize               = 1000;
    }

    /**
     * Backup the whole database or just some tables
     * Use '*' for whole database or 'table1 table2 table3...'
     * @param string $tables
     */
    public function logMessage($message)
    {
        if (!file_exists($this->backupDir)) {
            mkdir($this->backupDir, 0777, true);
        }

        $log = "User: " . $_SERVER['REMOTE_ADDR'] . ' - ' . date("F j, Y, g:i a") . PHP_EOL . $message . PHP_EOL . "----------------------------------------------------------------------------------------------------" . PHP_EOL;

        //Save string to log, use FILE_APPEND to append.
        file_put_contents(UPLOADS_DIRECTORY . '/flo-launch-backups/flo-launch-logs.log', $log, FILE_APPEND);
    }

    public function last_active_prefix($flo_prefix)
    {
        flo_launch_set_db_option('last_active_prefix', $flo_prefix);
        flo_launch_set_db_option('flo_status', 'in_progress');
    }

    public function copy_table($from, $to, $prefix, $flo_prefix)
    {
        global $wpdb;

        if ( defined('WP_ALLOW_MULTISITE') && WP_ALLOW_MULTISITE === true ) {
          $to = str_replace($wpdb->base_prefix, '', $to);
        } else {
          $to = str_replace($wpdb->prefix, '', $to);
        }

        // $sql = "SET sql_mode = 'ALLOW_INVALID_DATES'";
        // mysqli_query($wpdb->dbh, $sql);

        $sql = "CREATE TABLE " . $to . " LIKE " . $from;
        $res = mysqli_query($wpdb->dbh, $sql);

        $sql = "INSERT INTO `" . $to . "` SELECT * FROM `" . $from . "`;";
        $res = mysqli_query($wpdb->dbh, $sql);

        if (strpos($to, '_usermeta')) {
            $sql = "UPDATE `" . $to . "` SET meta_key = REPLACE(meta_key,'" . $prefix . "', '" . $flo_prefix . "') WHERE meta_key LIKE '$prefix%'";
            $res = mysqli_query($wpdb->dbh, $sql);
        }

        if (strpos($to, '_options')) {
            $sql = "UPDATE `" . $to . "` SET option_name = REPLACE(option_name,'" . $prefix . "', '" . $flo_prefix . "') WHERE option_name LIKE '$prefix%'";
            $res = mysqli_query($wpdb->dbh, $sql);
        }
    }

    /**
     * Backup the table
     * Use '*' for whole database or 'table1 table2 table3...'
     * @param string $index
     * @param string $total
     * @param string $table
     */
    public function backupTable($index, $total, $table)
    {
      $sql = '';

      if ( $index === 1 ) {
        $sql = 'CREATE DATABASE IF NOT EXISTS ' . $this->dbName . ";\n\n";
        $sql .= 'USE `' . $this->dbName . "`;\n\n";

        /**
         * Disable foreign key checks
         */
        if ($this->disableForeignKeyChecks === true) {
            $sql .= "SET foreign_key_checks = 0;\n\n";
        }
      }

      /**
       * CREATE TABLE
       */
      $sql .= 'DROP TABLE IF EXISTS `' . $table . '`;';
      $row = mysqli_fetch_row(mysqli_query($this->conn, 'SHOW CREATE TABLE `' . $table . '`'));
      $sql .= "\n\n" . $row[1] . ";\n\n";

      /**
       * INSERT INTO
       */

      $row     = mysqli_fetch_row(mysqli_query($this->conn, 'SELECT COUNT(*) FROM `' . $table . '`'));
      $numRows = $row[0];

      // Split table in batches in order to not exhaust system memory
      $numBatches = intval($numRows / $this->batchSize) + 1; // Number of while-loop calls to perform

      for ($b = 1; $b <= $numBatches; $b++) {

          $query         = 'SELECT * FROM `' . $table . '` LIMIT ' . ($b * $this->batchSize - $this->batchSize) . ',' . $this->batchSize;
          $result        = mysqli_query($this->conn, $query);
          $realBatchSize = mysqli_num_rows($result); // Last batch size can be different from $this->batchSize
          $numFields     = mysqli_num_fields($result);

          if ($realBatchSize !== 0) {
              $sql .= 'INSERT INTO `' . $table . '` VALUES ';

              for ($i = 0; $i < $numFields; $i++) {
                  $rowCount = 1;
                  while ($row = mysqli_fetch_row($result)) {
                      $sql .= '(';
                      for ($j = 0; $j < $numFields; $j++) {
                          if (isset($row[$j])) {
                              $row[$j] = addslashes($row[$j]);
                              $row[$j] = str_replace("\n", "\\n", $row[$j]);
                              $row[$j] = str_replace("\r", "\\r", $row[$j]);
                              $row[$j] = str_replace("\f", "\\f", $row[$j]);
                              $row[$j] = str_replace("\t", "\\t", $row[$j]);
                              $row[$j] = str_replace("\v", "\\v", $row[$j]);
                              $row[$j] = str_replace("\a", "\\a", $row[$j]);
                              $row[$j] = str_replace("\b", "\\b", $row[$j]);
                              if ($row[$j] == 'true' or $row[$j] == 'false' or preg_match('/^-?[0-9]+$/', $row[$j]) or $row[$j] == 'NULL' or $row[$j] == 'null') {
                                  $sql .= $row[$j];
                              } else {
                                  $sql .= '"' . $row[$j] . '"';
                              }
                          } else {
                              $sql .= 'NULL';
                          }

                          if ($j < ($numFields - 1)) {
                              $sql .= ',';
                          }
                      }

                      if ($rowCount == $realBatchSize) {
                          $rowCount = 0;
                          $sql .= ");\n"; //close the insert statement
                      } else {
                          $sql .= "),\n"; //close the row
                      }

                      $rowCount++;
                  }
              }

              $this->saveFile($sql);
              $sql = '';
          }
      }

      $sql .= "\n\n";

      if ( $index === $total - 1 ) {
        /**
         * Re-enable foreign key checks
         */
        if ($this->disableForeignKeyChecks === true) {
            $sql .= "SET foreign_key_checks = 1;\n";
        }
      }

      $this->saveFile($sql);

      if ( $index === $total ) {
        if ($this->gzipBackupFile) {
            $this->gzipBackupFile();
        }
      }

      $response['table'] = $table;
      $response['index'] = $index;
      $response['total'] = $total;
      $response['file_name'] = $this->backupFile . '.gz';
      $response['backup_link'] = UPLOADS_URL . $this->backupFile . '.gz';

      echo json_encode($response);

      die();
    }

    /**
     * Clone whole database or just some tables
     * Use '*' for whole database or 'table1 table2 table3...'
     * @param string $tables
     */
    public function cloneTable($index, $total, $prefix, $table)
    {
        global $wpdb;
        if ( defined('WP_ALLOW_MULTISITE') && WP_ALLOW_MULTISITE === true ) {
          $this->copy_table($table, $prefix . $table, $wpdb->base_prefix, $prefix);
        } else {
          $this->copy_table($table, $prefix . $table, $wpdb->prefix, $prefix);
        }

        $this->last_active_prefix($prefix);

        $response['table'] = $table;
        $response['index'] = $index;
        $response['prefix'] = $prefix;
        $response['total'] = $total;

        echo json_encode($response);

        die();
    }

    /**
     * Clone whole database or just some tables
     * Use '*' for whole database or 'table1 table2 table3...'
     * @param string $tables
     */
    public function removeTables($tables = '*')
    {
        try {
            /**
             * Tables to export
             */
            if ($tables == '*') {
                $tables = array();
                $result = mysqli_query($wpdb->dbh, 'SHOW TABLES');
                while ($row = mysqli_fetch_row($result)) {
                    $tables[] = $row[0];
                }
            } else {
                $tables = is_array($tables) ? $tables : explode(',', str_replace(' ', '', $tables));
            }

            global $wpdb;
            $test_mode_prefix = flo_launch_get_db_option('last_active_prefix');
            foreach ($tables as $key => $table) {

                if (strpos($table, $test_mode_prefix) !== false) {
                    $sql = 'DROP TABLE `' . $table . '`;';
                    $res = mysqli_query($wpdb->dbh, $sql);
                }
                flo_launch_set_db_option('last_active_prefix', '');
            }
            flo_launch_set_db_option('flo_status', 'start_process');
        }
        catch (Exception $e) {
            return false;
        }

        return true;
    }

    /*
     * Gzip backup file
     *
     * @param integer $level GZIP compression level (default: 9)
     * @return string New filename (with .gz appended) if success, or false if operation fails
     */
    protected function gzipBackupFile($level = 9)
    {
        if (!$this->gzipBackupFile) {
            return true;
        }

        $source = $this->backupDir . '/' . $this->backupFile;
        $dest   = $source . '.gz';

        $mode = 'wb' . $level;
        if ($fpOut = gzopen($dest, $mode)) {
            if ($fpIn = fopen($source, 'rb')) {
                while (!feof($fpIn)) {
                    gzwrite($fpOut, fread($fpIn, 1024 * 256));
                }
                fclose($fpIn);
            } else {
                return false;
            }
            gzclose($fpOut);
            if (!unlink($source)) {
                return false;
            }
        } else {
            return false;
        }

        return $dest;
    }

    /**
     * Save SQL to file
     * @param string $sql
     */
    protected function saveFile(&$sql)
    {
        if (!$sql)
            return false;

        try {

            if (!file_exists($this->backupDir)) {
                mkdir($this->backupDir, 0777, true);
            }

            file_put_contents($this->backupDir . '/' . $this->backupFile, $sql, FILE_APPEND | LOCK_EX);

        }
        catch (Exception $e) {
            print_r($e->getMessage());
            return false;
        }

        return true;
    }
}

// Set script max execution time
set_time_limit(900); // 15 minutes
