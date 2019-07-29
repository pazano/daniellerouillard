<?php 
  
  /*
  *  ACF Image position selector
  *
  *  All the logic for this field type
  *
  *  @class 		acf_flo_image_position_selector
  *  @extends		acf_field
  *  @package		ACF
  *  @subpackage	Fields
  */
  
  if( ! class_exists('acf_flo_image_position_selector') ) :
    
    class acf_flo_image_position_selector extends acf_field {
      
      /*
    	*  __construct
    	*
    	*  This function will setup the field type data
    	*
      */
      
      function __construct() {
        
        $this->name = 'flo_image_position_selector';
    		$this->label = __("Flo Image Position Selector",'acf');
    		$this->category = 'content';
    		$this->defaults = array(
    			'image_position_X'	=> '50%',
          'image_position_Y'	=> '50%'
    		);


    		// do not delete!
        	parent::__construct();
      }
      
      function render_field( $field ) {
        
        if(!isset($field['value']['x'])) {
          $field['value']['x'] = $field['image_position_X'];
        }
        if(!isset($field['value']['y'])) {
          $field['value']['y'] = $field['image_position_Y'];
        }
        
        ?>
          <div class="image-position-selector">
            <input class="image-position image-position-x" type="hidden" name="<?php echo esc_attr($field['name']).'[x]' ?>" value="<?php echo $field['value']['x']; ?>">
            <input class="image-position image-position-y" type="hidden" name="<?php echo esc_attr($field['name']).'[y]' ?>" value="<?php echo $field['value']['y']; ?>">
            <div class="image-position-popup-selector">
              <div class="flo-featured-image-position-trigger acf-icon dark" onclick="flo_image_position()"><i class="flo-admin-icon-drag"></i></div>
            	<div class="flo-featured-image-popup hidden">
            		<div class="flo-featured-image-popup-wrapper">
            		<i class="flo-admin-icon-close"></i>
            			<h1>Image Position</h1>
            			<p>Drag the focal area below to set the desired image position</p>
            			<div class="flo-featured-image-position-popup">
            				<img src="" class="flo-current-image">
            				<div class="flo-featured-image-position-popup--aim">
            			</div>
            		</div>
            	</div>
            	</div>
            </div>
            
          </div>
        <?php
      }
      
      function render_field_settings( $field ) {
        
        acf_render_field_setting( $field, array(
          'label'			=> __('Value X','acf'),
          'instructions'	=> '',
          'type'			=> 'text',
          'name'			=> 'image_position_X',
          'placeholder'	=> '',
          'value' => '50'
        ));
        
        acf_render_field_setting( $field, array(
          'label'			=> __('Value Y','acf'),
          'instructions'	=> '',
          'type'			=> 'text',
          'name'			=> 'image_position_Y',
          'placeholder'	=> '',
          'value' => '50'
        ));
        
      }
      
    }
    
    if(function_exists('acf_register_field_type')) {
    	acf_register_field_type( new acf_flo_image_position_selector() );
    }
    
  endif; // class_exists check
?>