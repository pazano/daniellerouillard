<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://flothemes.com
 * @since      1.0.0
 *
 * @package    Flo_Launch
 * @subpackage Flo_Launch/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Flo_Launch
 * @subpackage Flo_Launch/public
 * @author     Nichita S. <nikita@flosites.net>
 */
class Flo_Launch_Public
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of the plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct( $plugin_name, $version )
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

        add_action('wp', array(&$this, 'flo_enable_test_mode'));
    }

    function flo_enable_test_mode() {
      $flo_test_mode = (isset($_COOKIE["flo_custom_table_prefix"]) && $_COOKIE["flo_custom_table_prefix"] != "") ? 'active' : 'disabled';
      if ( isset($_GET["flo_launch_id"]) ) {
        $pageID = $_GET["flo_launch_id"];
      } else {
        $pageID = '';
      }

      $flo_token = flo_launch_get_db_option('flo_launch_share_' . $pageID);
      $flo_token_timestamp = flo_launch_get_db_option('flo_launch_timestamp_' . $pageID);

      if (isset($_GET['flo_test_mode']) && $_GET['flo_test_mode'] === '1' && $flo_test_mode === 'disabled') {
        if ( $_GET['token'] === $flo_token && $flo_token_timestamp >= gmdate(time())) {
          echo '<div class="flo-launch-public_access-wrapper">
                  <div class="flo-launch-public_access-popup">
                    <div class="flo-launch-public_access-popup-wrapper">
                      <div class="flo-launch-public_access-content">
                        <a class="flo-ui__popup--close" data-handler="popup-controller"></a>
                        <h1 class="flo-launch-public_access-title">You\'re trying to access the test mode site</h1>

                        <p class="flo-launch-public_access-subtitle">Click below to see a preview.</p>
                        <p class="flo-launch-public_access-status"></p>
                        <div class="flo-launch-public_access-buttons">
                          <span class="flo-launch__button flo-launch__button--r flo-launch__button--orange " data-handler="js-access-test-mode">Access test mode</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>';
        } else {
            echo '<div class="flo-launch-public_access-wrapper">
                    <div class="flo-launch-public_access-popup">
                      <div class="flo-launch-public_access-popup-wrapper">
                        <div class="flo-launch-public_access-content">
                          <a class="flo-ui__popup--close" data-handler="popup-controller"></a>

                          <h1 class="flo-launch-public_access-title">The link has expired</h1>

                          <p class="flo-launch-public_access-subtitle">Unfortunately, the access token has expired. Please contact the site owner and ask them to send you another link</p>
                        </div>
                      </div>
                    </div>
                  </div>';
        }
      }

      if ( $flo_test_mode === 'active' && (is_singular() || is_archive()) ) {
        echo '<div class="flo-launch-test-mode-enabled-message">Test mode is enabled</div>';
      }
    }

    /**
     * Register the stylesheets for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Flo_Launch_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Flo_Launch_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/all.min.css', array(), $this->version, 'all');
        // wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'font/icons/css/fontello.css', array(), $this->version, 'all');

    }

    /**
     * Register the JavaScript for the public-facing side of the site.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Flo_Launch_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Flo_Launch_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/all.min.js', array( 'jquery' ), $this->version, false);

    }

}
