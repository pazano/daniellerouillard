<?php

define('FLO_TEMPLATE_PATH', 'theme-files/floshortcodes');

	/**
	 * Get other templates (e.g. product attributes) passing attributes and including the file.
	 *
	 * @access public
	 * @param mixed $template_name
	 * @param array $args (default: array())
	 * @param string $template_path (default: '')
	 * @param string $default_path (default: '')
	 * @return void
	 */
	function flo_get_template( $template_name, $template_path = '', $default_path = '', $args = array() ) {
		
		if ( $args && is_array($args) )
			extract( $args );

		$located = flo_locate_template( $template_name, $template_path, $default_path );

		//do_action( 'flo_before_template_part', $template_name, $template_path, $located, $args );

		include( $located );

		//do_action( 'flo_after_template_part', $template_name, $template_path, $located, $args );
	}

	/**
	 * Locate a template and return the path for inclusion.
	 *
	 * This is the load order:
	 *
	 *		yourtheme		/	$template_path	/	$template_name
	 *		yourtheme		/	$template_name
	 *		$default_path	/	$template_name
	 *
	 * @access public
	 * @param mixed $template_name
	 * @param string $template_path (default: '')
	 * @param string $default_path (default: '')
	 * @return string
	 */
	function flo_locate_template( $template_name, $template_path = '', $default_path = '' ) {
		global $woocommerce;

		if ( ! $template_path ) $template_path = FLO_TEMPLATE_PATH;
		if ( ! $default_path ) $default_path = plugin_dir_path( __FILE__ ) ;

		// Look within passed path within the theme - this is priority
		$template = locate_template(
			array(
				trailingslashit( $template_path ) . $template_name,
				$template_name
			)
		);

		// Get default template
		if ( ! $template )
			$template = $default_path . $template_name;

		// Return what we found
		return apply_filters('flo_locate_template', $template, $template_name, $template_path);
	}	
// add here the custom functions for cosmoShortcodes plugin

function flo_list_posts_custom($atts, $content = NULL)
{
	global $flo_options;
	
	if(isset($post->ID)){
		$post_id  = $post->ID;
	}else{
		$post_id  = 0;
	}
	
	$defaults = array(
			'post_type'                  => 'post',
			'taxonomy'                   => '',
			'term_name'                  => '',
			'number_posts'               => get_option('posts_per_page'),
			'pagination' => '0'
	);


	extract(shortcode_atts($defaults, $atts));

	if($post_type == 'gallery'){
		$category_term = 'gallery_category';
	}else{
		$category_term = 'category';
	}

	//// -------------------------------------------------------
	$b = "flo-listing"; // To be used inside HTML

	// Start: Class name automation
	  $b__for_css = ".".$b; // To be used inside CSS
	  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
	  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
	// End: Class name automation

	$listing_layout = 'listing_2';
	$options_prefix = 'flo-lovely2-archives-options-';
	//$data = get_field('flo-lovely2-archives-options-'.$listing_layout,'options');

	if(isset( $flo_options['flo-lvy2-archives-options-'.$listing_layout] )){
		$data = $flo_options['flo-lvy2-archives-options-'.$listing_layout];
	}
	$data['post_type'] = $post_type;
	$data['items_per_page'] = $number_posts;

	$page_options = array();
	if(isset( $flo_options['flo-lovely2-archives-options-'.$listing_layout] )){
		$page_options = $flo_options['flo-lovely2-archives-options-'.$listing_layout];
	}

	$title_font = get_field($options_prefix."title_font",'options');
	$date_font = get_field($options_prefix."date_font",'options');
	$excerpt_font = get_field($options_prefix."excerpt_font",'options');
	$categories_font = get_field($options_prefix."categories_font",'options');
	$elements_color = flo_data($page_options, "elements_color");
	$item_background_color_on_hover = flo_data($page_options, "item_background_color_on_hover");

?>

<?php
  global $items, $the_query;

  Classy\Classy::render('components.flo-generic-listing-items-data', array('data' => $data) );

  if (isset($items) && sizeof($items)){
  	?>
  	<div class="<?php echo $b .' ' . $b__uniq; ?>" > 
	    <?php 
	    	Classy\Classy::render('components.flo-block-'.str_replace('_','-',$listing_layout), array('data' => $data) );
	    ?>
	</div>
  	<?php
  }
	
	if( $pagination && $the_query->max_num_pages > 1){
		$data = get_field('flo-porto-2-archive_pages_pagination','options');

		Classy\Classy::render(
			'components.flo-block-listing-pagination',
			array( "wp_query" => $the_query, 'data' => $data )
		);
	}


	$posts_list     = ob_get_clean();
	//add_filter( 'the_content', 'wpautop' );
	return $posts_list;
}

remove_shortcode('cosmo_list_posts'); // remove the plugin generated shortcode
add_shortcode('flo_list_posts', 'flo_list_posts_custom'); // use the function from the theme

if (!function_exists('cosmo_set_list_posts_shortcode')) {
	/**
	 * /////////////////////////////////=================================/////////////////////////////////
	 *
	 *    overwrite the default parameters for cosmo_list_posts shortcode
	 *    For the necesary format and possible arguments see the Cosmo Shortcodes plugin (/tinymce/config.php)
	 *    Returns and array with configuration settings for the shortcode
	 */

	function cosmo_set_list_posts_shortcode() {
		$cosmo_list_posts_config = array(
				'no_preview'  => true,
				'params'      => array(
						'post_type'                  => array(
								'type'    => 'select',
								'label'   => __('Post type', 'flotheme'),
								'desc'    => __('Select the post type you want to be displayed', 'flotheme'),
								'options' => cosmo_get_post_types_hc()
						),
						'number_posts'           => array(
								'std'          => '',
								'type'         => 'text',
								'label'        => __('Number of posts', 'flotheme'),
								'desc'         => 'Number of posts.',
								'hide_default' => false,
								'class'        => ' nr_of_posts'
						),
						'pagination'                      => array(
								'type'    => 'select',
								'label'   => __('Show pagination', 'flotheme'),
								'desc'    => '',
								'options' => array(
										'0'  => __('No', 'flotheme'),
										'1' => __('Yes', 'flotheme'),
								)
						),

				),
				'shortcode'   => '[flo_list_posts
									post_type="{{post_type}}" 
									number_posts="{{number_posts}}"
									pagination="{{pagination}}"
			 						]
								[/flo_list_posts]',
				'popup_title' => __('Insert List Posts Shortcode', 'flotheme')
		);
		return $cosmo_list_posts_config;
	}
}

if (!function_exists('cosmo_set_box_shortcode')) {
	/**
	 * /////////////////////////////////=================================/////////////////////////////////
	 *
	 *    overwrite the default parameters for cosmo_box shortcode
	 *    For the necesary format and possible arguments see the Cosmo Shortcodes plugin (/tinymce/config.php)
	 *    Returns and array with configuration settings for the shortcode
	 */

	function cosmo_set_box_shortcode()
	{
		$cosmo_box_config = array(
				'no_preview'  => true,
				'params'      => array(

						'box_bg_color'   => array(
								'std'   => '#fff',
								'type'  => 'colorpicker',
								'label' => __('Background color', 'flotheme'),
								'desc'  => ''
						),
						'box_text_color' => array(
								'std'   => '#000',
								'type'  => 'colorpicker',
								'label' => __('Text color', 'flotheme'),
								'desc'  => ''
						),
						'content_width'  => array(
								'type'    => 'select',
								'label'   => __('Content width', 'flotheme'),
								'desc'    => __('You will notice the difference only if the shortcode is used in a page using "Full width" template page.', 'flotheme'),
								'options' => array(
										'1140px' => '1140px',
										'100%'   => '100%'
								)
						),
						'padding'        => array(
								'type'    => 'select',
								'label'   => __('Add padding', 'flotheme'),
								'desc'    => __('If this option is enabled then a padding will be added around the box.', 'flotheme'),
								'options' => array(
										'disabled' => __('No', 'flotheme'),
										'enabled'  => __('Yes', 'flotheme')
								)
						),
				),
				'shortcode'   => '[flo_box box_bg_color="{{box_bg_color}}" box_text_color="{{box_text_color}}" content_width="{{content_width}}" padding="{{padding}}" ]' . __('Add your content here', 'flotheme') . '[/flo_box]',
				'popup_title' => __('Insert Box Shortcode', 'flotheme')
		);
		return $cosmo_box_config;
	}
}

if (!function_exists('cosmo_box_custom')) {
	function cosmo_box_custom($atts, $content = NULL)
	{
		extract(shortcode_atts(array(
				'box_bg_color'   => '',
				'box_text_color' => '',
				'content_width'  => '',
				'padding'        => 'disabled'
		), $atts));

		if (strlen($box_bg_color)) {
			$bg_color = 'background-color: ' . $box_bg_color . ';';
		} else {
			$bg_color = '';
		}

		if (strlen($box_text_color)) {
			$text_color = 'color: ' . $box_text_color . ';';
		} else {
			$text_color = '';
		}

		$padding_class = '';
		if ($padding == 'enabled') {
			$padding_class = ' padded ';
		}
		$result = "<div class='cosmo-box $padding_class ' style='$bg_color $text_color' >";
		if (strlen($content_width) && $content_width == '1140px') {
			$result .= '<div class="row">';
		}
		$result .= do_shortcode($content);
		if (strlen($content_width) && $content_width == '1140px') {
			$result .= '</div>';
		}
		$result .= "</div>";
		return $result;
	}

}
remove_shortcode('cosmo_box'); // remove the plugin generated shortcode
add_shortcode('cosmo_box', 'cosmo_box_custom'); // use the function from the theme
add_shortcode('flo_box', 'cosmo_box_custom'); // use the function from the theme

/**

 */
if (!function_exists('cosmo_contact_form_custom')) {
	function cosmo_contact_form_custom($atts, $content = NULL)
	{
		extract(shortcode_atts(array(
				'email'   => '',
				'thx_msg' => ''
		), $atts));

		if (!is_email($email)) {
			$output = __('plese use a valid email address', 'flotheme');
		} else {

			ob_start();
			ob_clean();
			?>
			<div class="contact-icon">
				<i class="icon-email"></i>
			</div>
			<form id="flo-contact-form" class="flo-contact-form">

				<div class="row">
					<div class="six columns">
						<p class="contact-form-name">
							<label for="cosmo-name"><?php _e('Name', 'flotheme'); ?> <span class="required">*</span></label>
							<input id="cosmo-name" name="cosmo-name" type="text" value="" aria-required="true">
						</p>

						<p class="contact-form-email">
							<label for="cosmo-email"><?php _e('Email', 'flotheme'); ?> <span class="required">*</span></label>
							<input id="cosmo-email" name="cosmo-email" type="text" value="" aria-required="true">
						</p>

						<p class="contact-form-phone">
							<label for="cosmo-phone"><?php _e('Phone', 'flotheme'); ?> </label>
							<input id="cosmo-phone" name="cosmo-phone" type="text" value="">
						</p>

						<p class="contact-form-subject">
							<label for="cosmo-subject"><?php _e('Subject', 'flotheme'); ?> </label>
							<input id="cosmo-subject" name="cosmo-subject" type="text" value="">
						</p>
					</div>
					<div class="six columns">
						<p class="comment-form-comment">
							<label for="cosmo-message"><?php _e('Message', 'flotheme'); ?> </label>
							<textarea id="cosmo-message" name="cosmo-message" cols="45" rows="8"></textarea>
						</p>
					</div>
					<div class="twelve columns">
						<p class="form-submit submit gray">
							<input type="button" value="<?php _e('Send Message', 'flotheme'); ?>" tabindex="5"
									   id="cosmo-send-msg" name="btn_submit" onclick="floSendMail( '#flo-contact-form' ,
								    'div#cosmo_contact_response' );">
						</p>
						<input type="hidden" name="cosmo-contact-email" value="<?php echo $email; ?>">
						<input type="hidden" name="thx_msg" value="<?php echo $thx_msg; ?>">

						<div id="cosmo_contact_response"></div>
					</div>

				</div>
			</form>

			<?php
			$output = ob_get_clean();
		}

		return $output;
	}

	remove_shortcode('cosmo_contact_form'); // remove the plugin generated shortcode
	add_shortcode('cosmo_contact_form', 'cosmo_contact_form_custom'); // use the function from the theme
	add_shortcode('flo_contact_form', 'cosmo_contact_form_custom'); // use the function from the theme

}
?>
