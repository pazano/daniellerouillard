<?php

if( ! class_exists('acf_intro_tutorials') && class_exists('acf_field') ) {
	class acf_intro_tutorials extends acf_field {

		function __construct() {
			// vars
			$this->name = 'acf_intro_tutorials';
			$this->label = __("Intro Tutorials",'acf');
			$this->category = 'flothemes';
			$this->defaults = [
				"intro_sections_title"	=> "",
				"intro_sections_content" => ""
			];
	    parent::__construct();
		}
		
		function input_admin_enqueue_scripts() {
	    wp_enqueue_editor();
	    wp_enqueue_script('acf-intro-tutorial-script', get_template_directory_uri().'/acf/acf-extensions/acf-intro-tutorials/acf-intro-tutorials.js');
			wp_enqueue_style('acf-intro-tutorial-style', get_template_directory_uri().'/acf/acf-extensions/acf-intro-tutorials/acf-intro-tutorials.css');
		}

		function render_field( $field ) {
			
			if(isset($field['intro_sections_title']) && strlen($field['intro_sections_title'])) {
				?>
					<h2 style="text-align: center;" class="intro-section-title">
						<?php echo $field['intro_sections_title']; ?>
					</h2>
				<?php
			}
			
			if(isset($field['intro_sections_content']) && strlen($field['intro_sections_content'])) {
				?>
					<div class="intro-section-content">
						<?php echo $field['intro_sections_content']; ?>
					</div>
				<?php
			}
			
		}
		
	  function render_field_settings( $field ) {
			
	    acf_render_field_setting( $field, array(
	      'label'			=> __('Title','acf'),
	      'instructions'	=> '',
	      'type'			=> 'text',
	      'name'			=> 'intro_sections_title',
	      'placeholder'	=> ''
	    ));
			
	    acf_render_field_setting( $field, array(
	      'label'			=> __('Content','acf'),
	      'instructions'	=> '',
	      'type'			=> 'textarea',
	      'name'			=> 'intro_sections_content',
	      'placeholder'	=> ''
	    ));
			
	  }
		
		function format_value( $value, $post_id, $field ) {}
	  
	}
	
	// initialize
	new acf_intro_tutorials();
}

?>
