<?php


function addhttp($url)
{
	if (!preg_match("~^(?:f|ht)tps?://~i", $url)) {
		$url = "http://" . $url;
	}
	return $url;
}

/**
 * Description   : this function will return the class name for the blocks depending on the input (number of columns we want to have)
 *
 *
 * @param    int $arabic - number of columns we want to have
 *
 * @return str
 *****/
if (!function_exists('flo_columns_arabic_to_chars')) {
    function flo_columns_arabic_to_chars($arabic)
    {
        $words_full_width = array(
        	0 => 'small-12 medium-12',
        	1 => 'small-12 medium-12',
        	2 => 'small-12 medium-6',
        	3 => 'small-12 medium-4',
        	4 => 'small-12 medium-3',
        	5 => 'small-12 medium-2-4',
        	6 => 'small-12 medium-2',
            7 => 'small-12 medium-2',
            8 => 'small-12 medium-12',
            9 => 'small-12 medium-12',
            10 => 'small-12 medium-12',
            11 => 'small-12 medium-12',
            12 => 'small-12 medium-12');
        return $words_full_width[$arabic];
    }
}
/**
 * gallery shortcode using massonry
 *
 * @param string $output
 * @param array $attr
 *
 * @return string
 */
function flo_post_gallery($output, $attr)
{
	global $post, $wp_locale;

	static $instance = 0;
	$instance++;

	if (isset($attr['orderby'])) {
		$attr['orderby'] = sanitize_sql_orderby($attr['orderby']);
		if (!$attr['orderby'])
			unset($attr['orderby']);
	}

	$size = 'large';

	extract(shortcode_atts(array(
			'order'      => 'ASC',
			'orderby'    => 'menu_order ID',
			'id'         => $post->ID,
			'itemtag'    => 'dl',
			'icontag'    => 'dt',
			'captiontag' => 'dd',
			'columns'    => 3,
			'size'       => $size,
			'include'    => '',
			'exclude'    => ''
	), $attr));

	$id = intval($id);
	if ('RAND' == $order)
		$orderby = 'none';

	if (!empty($include)) {
		$include      = preg_replace('/[^0-9,]+/', '', $include);
		$_attachments = get_posts(array('include' => $include, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby));

		$attachments = array();
		foreach ($_attachments as $key => $val) {
			$attachments[$val->ID] = $_attachments[$key];
		}
	} elseif (!empty($exclude)) {
		$exclude     = preg_replace('/[^0-9,]+/', '', $exclude);
		$attachments = get_children(array('post_parent' => $id, 'exclude' => $exclude, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby));
	} else {
		$attachments = get_children(array('post_parent' => $id, 'post_status' => 'inherit', 'post_type' => 'attachment', 'post_mime_type' => 'image', 'order' => $order, 'orderby' => $orderby));
	}

	if (empty($attachments))
		return '';

	if (is_feed()) {
		$output = "\n";
		foreach ($attachments as $att_id => $attachment)
			$output .= wp_get_attachment_link($att_id, $size, true) . "\n";
		return $output;
	}

//	$output = '<section class="flo-gallery-shortcode grid-view masonry-grid gallery-' . $columns . '-columns"><div class="gallery-shortcode-wrap row">';
	$output = '

<div class="quick-portfolio flo-gallery-shortcode row">
							<div class="large-12 columns">
								<ul class="medium-block-grid-'.$columns.' large-block-grid-'.$columns.'">';


	$i       = 0;
	$rand_id = mt_rand(1, 1000);

	$block_width = ' ' . flo_columns_arabic_to_chars($columns) . ' ';

	foreach ($attachments as $id => $attachment) {
		$image_attributes = wp_get_attachment_image_src($id, 'large');

		if (isset($attachment->post_excerpt) && strlen($attachment->post_excerpt)) {
			$image_caption = $attachment->post_excerpt;
		} else {
			$image_caption = '';
		}

		if (isset($attachment->post_content) && strlen($attachment->post_content)) {
			$image_description = $attachment->post_content;
		} else {
			$image_description = '';
		}

		$src = wp_get_attachment_image_src($id, 'full'); // get full attachment source
		if (isset($src[0])) {
			$src = $src[0];
		} else {
			$src = '';
		}
		if($columns == '1'){
			$image_attributes1  = wp_get_attachment_image_src($id, 'large');
			$img_url = $image_attributes1[0];
		}else{
			$img_url = aq_resize($src, 600, 600, true, true, true); //resize img , height 400px
		}


		$link = '
		<li class="image">
			<a href="' . $image_attributes[0] . '" rel="gallery-'. $rand_id . '"  title="' . $image_caption . $image_description . '" data-fancybox-group="prettyPhoto[' . $rand_id . ']"
			 class="flo-gallery-shortcode-image flo_swipebox fancybox" >
				<img src="' . $img_url . '" alt="' . $attachment->post_title . '">
			</a>
		</li>';
		$output .= $link;
	}

	$output .= "</ul></div></div>\n";
	return $output;
}

function flo_isValidURL($url)
{
	return preg_match('|^http(s)?://[a-z0-9-]+(.[a-z0-9-]+)*(:[0-9]+)?(/.*)?$|i', $url);
}


if (!function_exists('flo_wpforce_featured')) {
	/* if a post does not have featured image, then we set the first attached image as feat img */
	function flo_wpforce_featured()
	{
		global $flo_options;

		if(isset($flo_options['flo-blog-post__auto-set-featured'])){
		
			global $post;

			$post_types_to_work_with = [ 'post', 'gallery' ]; // add more posts here if you want.

			if (isset($post->ID)) {
				$the_post_format = get_post_type($post->ID);
			} else {
				$the_post_format = 'unknown';
			}
			
			if (in_array($the_post_format, $post_types_to_work_with)) {
				$already_has_thumb = has_post_thumbnail($post->ID);
				
				if (!$already_has_thumb) {
					$args = [
						'numberposts' => 1,
						'post_mime_type' => 'image',
						'post_parent' => $post->ID
					];
					$attached_image = get_children($args);
					
					if ($attached_image) {
						$img_id = key($attached_image);
						set_post_thumbnail($post->ID, $img_id);
					} else {
						if ($the_post_format == "post" && strlen($post->post_content) > 0) {
							// regex
						  $output = preg_match('/<img.+src=[\'"]([^\'"]+)[\'"].*>/i', $post->post_content, $matches);
							// if we found image url, do smth
							if (sizeof($matches) > 1 && strlen($matches[1])) {
								$attachment = attachment_url_to_postid($matches[1]);
								if( !empty($attachment) ) {
									set_post_thumbnail($post->ID, $attachment);	
								}
							}
						} elseif ($the_post_format == "gallery") {
							$attached_images = get_post_meta($post->ID, "_post_image_gallery");
							if(is_array($attached_images) && sizeof($attached_images) > 0 && isset($attached_images[0][0])) {
								$future_fimg = $attached_images[0][0];
								set_post_thumbnail($post->ID, $future_fimg);
							}
						}
					}
				}
			}
		}

	} //end function
}

add_action('the_post', 'flo_wpforce_featured');
add_action('save_post', 'flo_wpforce_featured');
add_action('draft_to_publish', 'flo_wpforce_featured');
add_action('new_to_publish', 'flo_wpforce_featured');
add_action('pending_to_publish', 'flo_wpforce_featured');
add_action('future_to_publish', 'flo_wpforce_featured');

/**
 * Load Theme Variable Data
 * @param string $var
 * @return string
 */
function theme_data_variable($var)
{
	if (!is_file(STYLESHEETPATH . '/style.css')) {
		return '';
	}

	$theme_data = wp_get_theme();
	return $theme_data->{$var};

}


/* related posts by herarchical taxonomy */
/* get tax slugs and number of similar posts  */
function similar_query($post_id, $taxonomy, $posts_per_page = 4)
{

	$the_post_type = get_post_type($post_id);
	if ('video' == $the_post_type) {
		if ($taxonomy == 'post_tag') {
			$taxonomy = 'tag';
		}
		$taxonomy = 'video-' . $taxonomy;
	}

	$topics = wp_get_post_terms($post_id, $taxonomy);

	$terms = array();
	if (!empty($topics)) {
		foreach ($topics as $topic) {
			$term = get_term($topic->term_id, $taxonomy);
			if (isset($term->slug)) {
				array_push($terms, $term->slug);
			}

		}
	}

	if (!empty($terms)) {
		$query = new WP_Query(array(
				'post_type'           => $the_post_type,
				'post__not_in'        => array($post_id),
				'posts_per_page'      => $posts_per_page,
				'orderby'             => 'rand',
				'ignore_sticky_posts' => 1,
				'tax_query'           => array(
						array(
								'taxonomy' => $taxonomy,
								'field'    => 'slug',
								'terms'    => $terms,
						)
				)
		));
	} else {
		$query = array();
	}


	return $query;
}



/**
 * cosmo_get_post_types_hc
 */
if (!function_exists('cosmo_get_post_types_hc')) {
	/**
	 * Description   : this function will return an array of registered custom post types
	 *
	 * @return array
	 *****/
	function cosmo_get_post_types_hc()
	{
		//of course it can be done via get_post_types, but for some reason it return only posts and pages, and no custom posts, and we have to hardcode this shit


		return array('post'    => __('Post', 'flotheme'), /*'video' => __('Video', 'flotheme'),*/
		             'gallery' => __('Gallery', 'flotheme'));
	}
}

if (!function_exists('floSendContact')) {
	function floSendContact(){
		if (isset($_POST['action']) && $_POST['action'] == 'floSendContact') {
			$result = array();

			$tomail   = $_POST['flo-contact-email'];
			$frommail = '';

			if (isset($_POST['flo_name']) && strlen($_POST['flo_name'])) {
				$name = trim($_POST['flo_name']);
			} else {
				$result['contact_name'] = '<div class="text-error">' . __('Error, name is a required field. ', 'flotheme') . '</div>';
				$name                   = '';
			}
			if (isset($_POST['date']) && strlen($_POST['date'])) {
				$flo_date = trim($_POST['date']);
			} else {
				$flo_date                   = '';
			}
			if (isset($_POST['location']) && strlen($_POST['location'])) {
				$flo_location = trim($_POST['location']);
			} else {
				$flo_location                   = '';
			}
			if (isset($_POST['question']) && strlen($_POST['question'])) {
				$flo_question = trim($_POST['question']);
			} else {
				$flo_question                   = '';
			}

			if (isset($_POST['flo-email']) && is_email($_POST['flo-email'])) {
				$frommail = trim($_POST['flo-email']);
			} else {

				$result['contact_email'] = '<div class="text-error">' . __('Error, please enter a valid email address. ', 'flotheme') . '</div>';

			}

			$message = '';
			if (isset($_POST['flo_name'])) {
				$message .= __('Contact name: ', 'flotheme') . trim($_POST['flo_name']) . "\n\n";
			}
			if (isset($_POST['flo-website'])) {
				$message .= __('Contact website: ', 'flotheme') . trim($_POST['flo-website']) . "\n";
			}
			if (isset($_POST['flo-email'])) {
				$message .= __('Contact email: ', 'flotheme') . trim($_POST['flo-email']) . "\n\n";
			}
			if (isset($_POST['date'])) {
				$message .= __('Date: ', 'flotheme') . trim($_POST['date']) . "\n\n";
			}
			if (isset($_POST['location'])) {
				$message .= __('Location: ', 'flotheme') . trim($_POST['location']) . "\n\n";
			}
			if (isset($_POST['question'])) {
				$message .= __('Question: ', 'flotheme') . trim($_POST['question']) . "\n\n";
			}
			if (isset($_POST['flo-phone'])) {
				$message .= __('Phone: ', 'flotheme') . trim($_POST['flo-phone']) . "\n\n";
			}
			$message .= __('Message : ', 'flotheme') . "\n\n" . trim($_POST['message']) . "\n\n";

			if (is_email($tomail) && strlen($tomail) && strlen($frommail) && strlen($name) && strlen($message)) {

				// if this option is enabled, then we will use the visitor email in the Form field
                if( $_POST['use_user_email'] && $_POST['use_user_email'] == '1'){
                    $headers = 'From: ' . trim($_POST['flo-name']) . ' <' . trim($_POST['flo-email']) . '>';
                }else{
                    $headers = '';
                }
				$subject = __('New email from', 'flotheme') . ' ' . get_bloginfo('name') . '.' . __(' Sent via contact form.', 'flotheme');
				if(wp_mail($tomail, $subject, $message, $headers)){
					if (isset($_POST['thx_msg']) && strlen(trim($_POST['thx_msg']))) {
						$thx_msg = urldecode($_POST['thx_msg']);
					} else {
						$thx_msg = __('Email was sent successfully ', 'flotheme');
					}
				}else{
					$thx_msg = __('The email could not be sent at this moment.', 'flotheme');
				}


				$result['message'] = '<span class="text-success" >' . $thx_msg . '</span>';
			}
			echo json_encode($result);
		}


		exit();
	}
}

// add the link to the documentation in the WP dashboard
function flo_dashboard_documentation() {
	return array("<li class='flo-docs' ><a href='"._FLO_DOCS_."' target='_blank' ><img src='".get_template_directory_uri()."/assets/img/documentation_img.jpg' /></a></li>");
}
//add_filter( 'dashboard_glance_items', 'flo_dashboard_documentation' );

if(!function_exists('flo_remove_hentry')){
	// remove 'hentry' class
	function flo_remove_hentry( $classes ) {
	    global $post;

	    $classes = array_diff( $classes, array( 'hentry' ) );

	    return $classes;
	}
}

add_filter( 'post_class','flo_remove_hentry' );

add_filter( 'post_row_actions', 'remove_slideshow_view_link', 10, 2 );
function remove_slideshow_view_link( $action ,$post) {
	//check for your post type
	if ($post->post_type =="slideshow"){
		/*do you stuff here
		you can unset to remove actions
		and to add actions ex:
		$actions['in_google'] = '<a href="http://www.google.com/?q='.get_permalink($post->ID).'">check if indexed</a>';
		*/
		unset ($action['view']);
	}
	return $action;
}


function remove_view_button_on_single_slideshow($button){
	global $post;
	if($post && $post->post_type == 'slideshow'){
		return preg_replace("/<span id='view-post-btn'>(.*)<\/span>/",'',$button);
	}else{
		return $button;
	}

}
add_filter('get_sample_permalink_html','remove_view_button_on_single_slideshow');



/**
 * Generate the srcset atribute for theimages
 *
 * params:
 * @size_array - an array with the images sizes we want to generate
 * @image_meta - the original image meta. It contains the width and the height of the original image
 * @original_img_url
 *
 * @return  string - the srcset code or an empty string.
 *
 * @since Generosity 0.2
 */
if(!function_exists('flo_create_image_srcset')){
	function flo_create_image_srcset($size_array,$image_meta, $original_img_url, $crop = false){
		$image_width = $image_meta['width'];
		$srcset = '';
		$srcset_array = array();
		if(is_array($size_array) && sizeof($size_array)){

			foreach ($size_array as $srcset_dimensions) {
				if($image_width > $srcset_dimensions['width'] || isset($srcset_dimensions['vw_size'])){
					if(isset($srcset_dimensions['vw_size']) && strlen($srcset_dimensions['vw_size'])){
						$srcset_name = $srcset_dimensions['vw_size'];
					} else {
						$srcset_name = $srcset_dimensions['width'];
					}
					$srcset_img_url = aq_resize($original_img_url, $srcset_dimensions['width'], $srcset_dimensions['height'], $crop, true, false, true);
					if(strlen($srcset_img_url)){
						$srcset_array[] = $srcset_img_url .' '.$srcset_name.'w';
					}

				}else if(!in_array($original_img_url .' '.$image_width.'w',$srcset_array) && !$crop){
					$srcset_array[] = $original_img_url .' '.$image_width.'w';
				}
			}
		}

		if(sizeof($srcset_array)){
			$srcset = implode(', ', $srcset_array);
		}

		return $srcset;
	}
}

if (!function_exists('flo_image_srcset')) {
	function flo_image_srcset($image_src, $crop = false) {

	}
}


// the maximum image width to be included in a srcset attribute will be the image width
// default is 1600
if(!function_exists('flo_custom_max_srcset_image_width')){
	function flo_custom_max_srcset_image_width( $max_width, $size_array ) {
		$width = $size_array[0];

		// set the max image width the value of the this image width
		return $width;
	}
}

if(!function_exists('flo_disable_max_srcset_image_width')){
	function flo_disable_max_srcset_image_width() {
		return 1;
	}
}
/**
 *
 * Function that renders the top dashboard link
 * http://i.imgur.com/k7BxRME.png
 */
if(!function_exists('flo_render_dashboard_top_bar')){
	function flo_render_dashboard_top_bar(){
		?>
		<div class="flo-dashboard-top">
			<ul>
				<li class="doc"><a href="<?php echo _FLO_DOCS_; ?>" target="_blank"><?php _e('Documentation','flotheme') ?></a></li>
				<li class="manage"><a href="themes.php?page=flo_quick_setup"><?php _e('Quick Setup','flotheme') ?></a></li>
				<li class="updated"><a href="admin.php?page=flotheme_updater"><?php _e('Updates','flotheme') ?></a></li>
				<!-- <li class="change-log"><a href="admin.php?page=_flo_options&tab=31"><?php _e('Change log','flotheme') ?></a></li> -->
				<li class="news"><a href="<?php echo _FLO_NEWS_; ?>" target="_blank" ><?php _e('News','flotheme') ?></a></li>
				<li class="support"><a href="<?php echo _FLO_SUPPORT_; ?>" target="_blank"><?php _e('Support','flotheme') ?></a></li>
			</ul>
		</div>
		<?php
	}
}

/**
 *
 * Try to retrieve the change log from flothemes.com
 * if that is not possible for some reason, we just read the change log file
 * @params string t_n  theme name
 */
if(!function_exists('flo_get_change_log')){
	function flo_get_change_log($t_n = _TN_){
		$transient_name = $t_n.'_change-remote-log';

		//delete_transient($transient_name );

		if ( FALSE == $response = get_transient( $transient_name ) ) {

			$theme_name = strtolower($t_n);
			$url = 'https://flothemes.com/themes/'.$theme_name.'/?change_log=1';
			$args = array(
					    'sslverify'   => false,
					);

			$response = wp_remote_get( $url, $args );

			set_transient( $transient_name, $response, 60 * 60 * 24 ); // 1 day
		}

		//for debugging purpuses
		if(isset($_GET['flo_debug_change_log']) && $_GET['flo_debug_change_log'] == 1){
			echo '<pre>';
			var_dump($response);
			echo '</pre>';
			die();
		}

		if (is_wp_error($response) || $response['response']['code'] != '200' || !isset($response['body'])) {
			// in case something went wrong retrieving the log from our server,
			// then we just load if from the change log file available in the theme.
			return flo_get_change_log_from_file();
		}

		$result = $response['body'];

		return $result;

	}

}

if(!function_exists('flo_get_change_log_from_file')){
	function flo_get_change_log_from_file(){
		global $wp_filesystem;
		// Initialize the WP filesystem, no more using 'file-put-contents' function
		if (empty($wp_filesystem)) {
			require_once (ABSPATH . '/wp-admin/includes/file.php');
			WP_Filesystem();
		}
		$change_log_abs_file_path = get_stylesheet_directory().'/change-log.txt';

		// read the change log file;
		$change_log_content = $wp_filesystem->get_contents($change_log_abs_file_path);

		return  nl2br($change_log_content) ;
	}
}


if(!function_exists('flo_get_first_category')){
	function flo_get_first_category($post_type){
	//    var_dump($post_type);die;
		global $post;
		$category = '';
		if(isset($post_type) && $post_type != ''):
			if($post_type == 'gallery'):
				$taxonomy = 'gallery-category';
			elseif($post_type == 'video'):
				$taxonomy = 'video-category';
			else:
				$taxonomy = 'category';
			endif;
			$category = get_the_terms($post, $taxonomy);
		endif;

		if(is_array($category)):
			return $category[0];
		else:
			return $category;
		endif;
	}
}

// handle responsive images flor the blog post
$flo_responsive_img = get_field('flo-blog-post__responsive_images','options');
if($flo_responsive_img){
	$flo_responsive_img_option = $flo_responsive_img;
}else{
	$flo_responsive_img_option = 'no_responsive';
}

switch ($flo_responsive_img_option) {
	case 'no_responsive':
		add_filter( 'max_srcset_image_width', 'flo_disable_max_srcset_image_width' );
		break;
	case 'mobile_only':
		add_filter( 'max_srcset_image_width', 'flo_custom_max_srcset_image_width', 9, 2 );
		break;

	default: // all_devices
		// we do nothing, let WP to handle this
		break;
}

?>
