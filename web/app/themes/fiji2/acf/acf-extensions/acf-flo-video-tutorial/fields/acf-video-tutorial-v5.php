<?php 

/*
*  ACF - Video Tutorial Field Class
*
*/

// exit if accessed directly
if ( ! defined( 'ABSPATH' ) )
	exit;

// check if class already exists
if ( ! class_exists('ACF_Field_video_tutorial') ) :

  class ACF_Field_video_tutorial extends acf_field {
    
    // Field vars
    var $settings;
    
    /*
    *  __construct
    *
    *  This function will setup the field type data
    */
    
    function __construct() {
        
      // vars
      $this->name = 'video_tutorial';
      
      $this->label = __('Video Tutorial', 'flotheme');
      
      $this->category = 'layout';
      
      // settings (array) Store plugin settings (url, path, version)
      // as a reference for later use with assets
      $this->defaults = array(
        'video_title'	=> '',
        'video_description' => '',
        'video_embed' => '',
        'video_embed_image' => '',
      );
      
      // do not delete!
      parent::__construct();
      
    }
    
    /*
    *  render_field()
    */
    
    function render_field( $field ) {
      
  			$title = $field['video_title'];
        $description = $field['video_description'];
        $videoImage = $field['video_embed_image'];
        $videoEmbed = $field['video_embed'];
         
        if( empty($videoImage) ){
          $regex = '%(?:youtube(?:-nocookie)?\.com/(?:[^/]+/.+/|(?:v|e(?:mbed)?)/|.*[?&]v=)|youtu\.be/)([^"&?/ ]{11})%i';
          preg_match($regex, $videoEmbed, $videoID, PREG_OFFSET_CAPTURE, 0);
          // var_dump($videoID);
          
          $videoImage = "https://img.youtube.com/vi/". $videoID[1][0] ."/maxresdefault.jpg";
        }
        
  			?>
          <div class="acf-video-tutorial">
            <div class="acf-video-tutorial-wrap">
              
              <div class="acf-video-tutorial__embed-wrap">
                
                <div class="acf-video-tutorial__video-overlay">
                  <img src="<?php echo $videoImage ?>">
									
									<div class="acf-video-play">
										<i class="flo-admin-icon-play"></i>
									</div>
                </div>
                
                <div class="acf-video-tutorial__video-embed hide">
                  <?php echo $videoEmbed; ?>
                </div>
								
              </div>
              
              <div class="acf-video-tutorial__text-wrap">
                
                <div class="acf-video-tutorial__title">
                  
                  <h3> <?php echo $title; ?> </h3>
                  
                </div>
                
                
                <div class="acf-video-tutorial__text">
                  
                  <p> <?php echo $description; ?> </p>
                  
                </div>
                
              </div>
              
            </div>
          </div>
        <?php
      
    }
    
    /*
    *  field_group_admin_enqueue_scripts()
    */
    
    // function field_group_admin_enqueue_scripts() {
    // 
    //   $dir = get_template_directory_uri().'/acf/acf-extensions/acf-flo-video-tutorial/';
    // 
    //   // register & include JS
    //   wp_register_script( 'acf-flo-video-tutorial', "{$dir}js/hreni.js", array(), false, true );
    // 
    //   wp_enqueue_script('acf-flo-video-tutorial', "{$dir}js/hreni.js", array(), false, true );
    // 
    //   // register & include CSS
  	// 	// wp_register_style( 'acf-input-select_sidebar', "{$dir}assets/css/input.css", array('acf-input'), $version );
  	// 	// wp_enqueue_style('acf-input-select_sidebar');
    // 
    // }
    
    function input_admin_enqueue_scripts() {
      
      // vars
      $url = get_template_directory_uri().'/acf/acf-extensions/acf-flo-video-tutorial/';
      $version = $this->settings['version'];
      
      
      // register & include JS
      wp_register_script( 'acf-video_tutorial', "{$url}assets/js/input.js", array('acf-input'), $version );
      wp_enqueue_script('acf-video_tutorial');
      
      
      // register & include CSS
      wp_register_style( 'acf-video_tutorial', "{$url}assets/css/input.css", array('acf-input'), $version );
      wp_enqueue_style('acf-video_tutorial');
      
    }
    
    /*
    *  load_field()
    *
    */

    function load_field( $field ) {
      if ( ! is_admin() ) {
        return $field;
      }
      
      require_once(ABSPATH . 'wp-admin/includes/screen.php'); 
      $current_screen = get_current_screen();

      if ( null !== $current_screen && 'acf-field-group' !== $current_screen->post_type ) {
        $field['label'] = '';
      }

      return $field;
    }
    
    /*
    *  render_field_settings()
    */

    function render_field_settings( $field ) {
      
      // Title
      acf_render_field_setting( $field, array(
        'label'			=> __('Video Title','flotheme'),
        'type'			=> 'text',
        'name'			=> 'video_title',
      ));
      
      // Description
      acf_render_field_setting( $field, array(
        'label'			=> __('Video Description','flotheme'),
        'type'			=> 'textarea',
        'name'			=> 'video_description',
      ));
      
      // Embed
      acf_render_field_setting( $field, array(
        'label'			=> __('Video Embed','flotheme'),
        'type'			=> 'textarea',
        'name'			=> 'video_embed',
      ));
      
      // Embed
      acf_render_field_setting( $field, array(
        'label'			=> __('Video Image URL','flotheme'),
        'type'			=> 'text',
        'name'			=> 'video_embed_image',
      ));
      
    }
  }

  /**
   * Initialize field
   *
   * @param array $settings  Settings from the main plugin file.
   */
   
  new ACF_Field_video_tutorial( $this->settings );

// class_exists check
endif;
