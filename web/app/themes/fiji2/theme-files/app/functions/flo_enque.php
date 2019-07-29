<?php
  function flo_enque() {
    $flo_theme = wp_get_theme('lovely2');

    $siteurl = get_option('siteurl');
    if (!empty($siteurl)) {
      $siteurl = rtrim($siteurl, '/') . '/wp-admin/admin-ajax.php';
    } else {
      $siteurl = home_url('/wp-admin/admin-ajax.php');
    }
    // Start: Core Icons
      wp_register_style("core-icons", get_template_directory_uri() . "/public/fonts/fontello/css/flo-core-icons.css", false, $flo_theme->get( 'Version' ) );
      wp_enqueue_style("core-icons");
    // End: Core Icons

    // Start: Vendor CSS
      wp_register_style("vendor-css", get_template_directory_uri() . "/theme-files/public/css/vendor.css", false, $flo_theme->get( 'Version' ) );
      wp_enqueue_style("vendor-css");
    // End: Vendor CSS

    // we need this for comment-reply
    if (is_singular()) {
        wp_enqueue_script("comment-reply");
    }

    // Start: Vendor JS
      wp_register_script("vendor-js", get_template_directory_uri() . "/theme-files/public/js/vendor.js", array("jquery"), $flo_theme->get( 'Version' ), $in_footer = true);
      wp_enqueue_script("vendor-js");
    // End: Vendor JS

    if ( defined('FLO_ENVIROMENT') && FLO_ENVIROMENT == 'DEV') {
        // Start: Theme CSS
        wp_register_style("theme-css", get_template_directory_uri() . "/theme-files/public/css/style.css", false, $flo_theme->get( 'Version' ) );

        // Start: Theme JS
        wp_register_script("theme-js", get_template_directory_uri() . "/theme-files/public/js/scripts.js", array("jquery"), $flo_theme->get( 'Version' ), $in_footer = true);
    }else{
        // minified files
        
        // Start: Theme CSS
        wp_register_style("theme-css", get_template_directory_uri() . "/theme-files/public/css/style.min.css", false, $flo_theme->get( 'Version' ) );

        // Start: Theme JS
        wp_register_script("theme-js", get_template_directory_uri() . "/theme-files/public/js/scripts.min.js", array("jquery"), $flo_theme->get( 'Version' ), $in_footer = true);

    }

      wp_enqueue_style("theme-css");

      // Default theme stylesheet
      wp_register_style( 'default_stylesheet',get_stylesheet_directory_uri() . '/style.css', false, $flo_theme->get( 'Version' ) );
      wp_enqueue_style( 'default_stylesheet' );


      wp_enqueue_script("theme-js");

      wp_localize_script( 'theme-js', 'ajaxurl', $siteurl );
    // End: Theme JS

    // Start: Options CSS
      // wp_register_style("options-css", get_template_directory_uri() . "/theme-files/public/css/options.css" );
      // wp_enqueue_style("options-css");
    // End: Options CSS
  }

  add_action('wp_enqueue_scripts', 'flo_enque');
?>
