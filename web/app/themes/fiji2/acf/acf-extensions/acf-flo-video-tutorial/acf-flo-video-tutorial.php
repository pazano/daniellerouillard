<?php

if ( ! class_exists( 'ACF_Plugin_video_tutorial' ) ) :
	class ACF_Plugin_video_tutorial {
    
    /*
		*  __construct
		*
		*  This function will setup the class functionality
		*
		*  @type	function
		*  @date	17/02/2016
		*  @since	1.0.0
		*
		*  @param	n/a
		*  @return	n/a
		*/
		function __construct() {
      
      // vars
			$this->settings = array(
				'url'		=> plugin_dir_url( __FILE__ ),
				'path'		=> plugin_dir_path( __FILE__ ),
			);
      
      // include field
			add_action( 'acf/include_field_types', 	array( $this, 'include_field_types' ) ); // v5
      
    }
    
    function include_field_types( $version ) {
			if ( empty( $version ) )
				$version = 5;

			// include
			include_once( 'fields/acf-video-tutorial-v' . $version . '.php' );
		}
    
  }
  
  // initialize
	new ACF_Plugin_video_tutorial();
  
// class_exists check
endif;
