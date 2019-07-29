<?php 
  
  /*
  *  ACF Image position selector
  *
  *  All the logic for this field type
  *
  *  @class 		acf_flo_instagram_selector
  *  @extends		acf_field
  *  @package		ACF
  *  @subpackage	Fields
  */
  
  if( ! class_exists('acf_flo_instagram_selector') ) :
    
    class acf_flo_instagram_selector extends acf_field {
      
      /*
    	*  __construct
    	*
    	*  This function will setup the field type data
    	*
      */
      
      function __construct() {
        
        $this->name = 'acf_flo_instagram_selector';
    		$this->label = __("Flo Instagram Selector",'acf');
    		$this->category = 'content';
    		$this->defaults = array(
    		);


    		// do not delete!
        	parent::__construct();
      }
      
      function render_field( $field ) {
		  ?>
		  	<div class="instagram-selector">
		  <?php
		  $all_plugins = get_plugins();
  			if(!empty($all_plugins["flo-instagram/flo-instagram.php"])){
  				$active_plugins = apply_filters('active_plugins', get_option('active_plugins'));
  				if(in_array("flo-instagram/flo-instagram.php", $active_plugins)){
  						$instagramAccounts = get_option('flo_instagram_accounts');
              
						if(empty($instagramAccounts)) {
                echo '1. If you have not linked Instagram Account, please proceed to the <a href="'. admin_url() .'admin.php?page=flo_instagram" target="_blank">Settings Page</a>.';
                echo '<br> 2. If you are using the outdated Flo Instagram plugin, please update it to the latest version of Flo Social Plugin.';
						} else {
		  					?>
		  						<select class="" name="<?php echo esc_attr($field['name']) ?>">
		  					<?php
		  					foreach ($instagramAccounts as $key => $account) {
		  						?>
						        <option value="<?php echo $account['username']; ?>" <?php selected( esc_attr($field['value']), $account['username'] ); ?>><?php echo $account['username']; ?></option>
		  						<?php
		  					}
		  					?>
		  						</select>
                  <p class="description">Please select the Instagram Account ID which you want to be displayed in the footer part of your site</p>
		  					<?php
                
						}
  				    } else {
  						echo 'This options requires <a href="https://wordpress.org/plugins/flo-instagram/" target="_blank"> Flo Social plugin</a> to be Activated. Please activate the Flo Social plugin in order to use this option further.';
  					}
  		    	} else {
  					echo 'This options requires <a href="https://wordpress.org/plugins/flo-instagram/" target="_blank"> Flo Social plugin</a> to be Installed.';
  				}
    	?>
          </div>
        <?php
      }
      
      function render_field_settings( $field ) {

        
      }
      
    }
    
    if(function_exists('acf_register_field_type')) {
    	acf_register_field_type( new acf_flo_instagram_selector() );
    }
    
  endif; // class_exists check
?>