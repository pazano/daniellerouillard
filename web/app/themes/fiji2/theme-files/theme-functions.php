<?php

  define('_FLO_DOCS_', 'https://docs.flothemes.com/fiji-2-welcome/');


	// Include the default fonts that are shipped with this theme
	include_once 'app/fonts-theme-default.php';

  /* START: ACF LOCAL JSON */
    add_filter('acf/settings/save_json', 'flo_acf_json_save_point');
    function flo_acf_json_save_point( $path ) {

      // update path
      $path = get_template_directory() . '/theme-files/acf-fields/local_json';
      // return
      return $path;

    }

    add_filter('acf/settings/load_json', 'flo_acf_json_load_point');
    function flo_acf_json_load_point( $paths ) {
        // remove original path (optional)
        unset($paths[0]);

        // append path
        $paths[] = get_template_directory() . '/theme-files/acf-fields/local_json';

        // return
        return $paths;

    }
  /* END: ACF LOCAL JSON */

  /* START: FOR FRONTEND */

    // Start: WP Comments Move textarea to bottom
      function flo_move_comment_field_to_bottom( $fields ) {
        $comment_field = $fields['comment'];
        unset( $fields['comment'] );
        $fields['comment'] = $comment_field;
        return $fields;
      }

      add_filter( 'comment_form_fields', 'flo_move_comment_field_to_bottom' );
    // Start: WP Comments Move textarea to bottom

  /* END: FOR FRONTEND */

  /* BOF PP migration support */
if (!function_exists('flo_render_gallery_container')) {

  function flo_render_gallery_container($gallery_type)
  {
    // for this theme we don't need any wrappers for the galleries,
    // for other themes the retturn may be more complex
    return array('start' => '', 'end' =>'');
  }
}

if (!function_exists('flo_pp_gallery_types')) {
  function flo_pp_gallery_types()
  {
    $img_path = 'http://flothemes-dashboard-images.s3.amazonaws.com/lovely2/';

    $gallery_types = array(
      'type_a' => $img_path . 'page-gallery-gallery-view--thumb-type-a.jpg',
      'type_b' => $img_path . 'page-gallery-gallery-view--thumb-type-b.jpg',
      'type_c' => $img_path . 'page-gallery-gallery-view--thumb-type-c.jpg',
    );
    return $gallery_types;
  }
}


/* EOF PP migration support */

/* START: ADMIN -> FLOTHEME PAGE DATA */
  if (!function_exists("admin_flotheme_page_data")) {
    function admin_flotheme_page_data() {
      return array(
        "page-flotheme__title" => "Fiji 2",
        "page-flotheme__items" => array(

          array(
                  "title" => "INTRODUCTION",
                  "description" => "We recommend that you start your journey here and learn about the backend and theme structure. This will make the setup process easier."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-1-introduction"
                ),
                array(
                  "title" => "GETTING STARTED",
                  "description" => "Experienced, or first time Flotheme user, your first setup steps will begin here."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-2-getting-started"
                ),
                array(
                  "title" => "HEADER",
                  "description" => "In this area you will find all the necessary info and settings to adjust the website Header to fit your style."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-3-header"
                ),
                array(
                  "title" => "PAGES",
                  "description" => "Each Page is unique and has its own set of features. Click here to learn more about these options."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-4-pages"
                ),
                array(
                  "title" => "POSTS",
                  "description" => "Each Post is unique and has its own set of features. Click here to learn more about these options."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-5-posts"
                ),
                array(
                  "title" => "GALLERIES",
                  "description" => "Each Gallery is unique and has its own set of features. Click here to learn more about these options."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-6-galleries"
                ),
                array(
                  "title" => "GENERICS",
                  "description" => "The following area includes a few general and miscellaneous settings such as Social Media links, CSS, etc."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-7-generics"
                ),
                array(
                  "title" => "SIDEBARS",
                  "description" => "Widgets are great “add-on” options to your site that can help you customize the site and add more feature to the back-end as well."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-8-sidebars"
                ),
                array(
                  "title" => "FOOTER",
                  "description" => "Copyrights and other important footer related can be added in the following section."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-9-footer"
                ),
                array(
                  "title" => "STYLE",
                  "description" => "Style kits, color and font style options are located in here."
                  ,
                  "url" => get_admin_url() . "admin.php?page=acf-options-10-style"
                ),

        )
      );
    }
  }
/* END: ADMIN -> FLOTHEME PAGE DATA */

if (!has_action('flo_footer_credits')) {
  add_action('flo_footer_credits', 'flo_get_footer_credits', 10);
}

if (!function_exists('flo_get_footer_credits')) {
  function flo_get_footer_credits()
  {
    echo ' <a class="flo-footer__flothemes-logo flo-footer__copyrights-flo" href="https://flothemes.com/" target="_blank"><i class="flo-core-icon-flothemes"></i></a>';
  }

}

/**
 *
 * retrieve the first post image.
 * if it is a blog post, then we look for the first content image
 * it it is a gallery post, then we return the first gallery image
 *
 */
if(!function_exists('flo_post_first_image')){
  function flo_post_first_image($post){
    $post_type = get_post_type($post);
    if($post_type == 'gallery'){
      // TO DO
    }else{
      return flo_catch_first_content_image($post, $return_falback_img = false);
    }
  }
}


function flo_render_categories_list($data, $link_class = ''){
  $links_type = flo_data($data, "links_type", "custom");
  $links = array();
  $links_count = 0;

  switch ($links_type) {
    /* START: CUSTOM LINKS */
      case 'custom':
        $custom_links = flo_data($data, "custom_links_list", array());

        if(!$custom_links) {
          return $links;
        }

        $links_count = count($custom_links);

        if($custom_links && sizeof($custom_links)){
          foreach ($custom_links as $link) {
            $links[] = array(
                'url' => $link["url"],
                'title' => $link["title"]
              );

          }
        }
        return $links;
      break;
    /* END: CUSTOM LINKS */

    /* START: POST CATEGORIES */
      case 'post_categories':
        $post_specific_categories = flo_data($data, "specific_post_categories");
        $post_categories = $post_specific_categories ? $post_specific_categories : get_terms( "category", array("hide_empty" => true) );
        $links_count = count($post_categories);

        $links[] = array(
              'url' => get_post_permalink(),
              'title' => __('All','flotheme'),
              'active' => 0
            );

        foreach ($post_categories as $category) {
          if(isset($_GET['categ']) && $_GET['categ'] == $category->slug ){
            $is_active = 1;
          }else{
            $is_active = 0;
          }
          $links[] = array(
              'url' => add_query_arg("categ", $category->slug, get_post_permalink()),
              'title' => $category->name,
              'active' => $is_active
            );
        }
        return $links;
      break;
    /* END: POST CATEGORIES */

    /* START: GALLERY CATEGORIES */
      case 'gallery_categories':
        $gallery_specific_categories = flo_data($data, "specific_gallery_categories");
        $gallery_categories = $gallery_specific_categories ? $gallery_specific_categories : get_terms( "gallery-category", array("hide_empty" => true) );
        $links_count = count($gallery_categories);

        $links[] = array(
              'url' => get_post_permalink(),
              'title' => __('All','flotheme'),
              'active' => 0
            );



        foreach ($gallery_categories as $category) {
          if(isset($_GET['categ']) && $_GET['categ'] == $category->slug ){
            $is_active = 1;
          }else{
            $is_active = 0;
          }

          $links[] = array(
              'url' => add_query_arg("categ", $category->slug, get_post_permalink()),
              'title' => $category->name,
              'active' => $is_active
          );
        }
        return $links;
      break;
    /* END: GALLERY CATEGORIES */

    return $links;
  }
}

/* START: FLO COLOR FUNCTION */
  if(!function_exists('flo_color')){
    function flo_color($color, $prefix = "flo-color-") {
      return flo_get_option($prefix . $color, false);
    }
  }
/* END: FLO COLOR FUNCTION */



/**
 *
 * This function tells if a image has horizontal or vertical orientation
 * @param string - the html for the image (it should contain the 'width' and 'height' attributes)
 * @return string - 'horizontal' or 'vertical'
 *
 */

if(!function_exists('flo_get_image_orientation')){
  function flo_get_image_orientation($img_html){

    $width = '';
    $height = '';

    preg_match_all( '@width="([^"]+)"@' , $img_html, $match_width );
    $width_array = array_pop($match_width);
    if(is_array($width_array) && isset($width_array[0]) ){
      $width = $width_array[0];
    }

    preg_match_all( '@height="([^"]+)"@' , $img_html, $match_height );
    $height_array = array_pop($match_height);
    if(is_array($height_array) && isset($height_array[0]) ){
      $height = $height_array[0];
    }

    if(is_numeric($width) && is_numeric($height) ){
      if($width > $height){
        return 'horizontal';
      }

      if($width < $height){
        return 'vertical';
      }
    }

    return '';
  }
}


add_action('wp_head', 'flo_maybe_fb_app_id',1);
if(!function_exists('flo_maybe_fb_app_id')){
  function flo_maybe_fb_app_id(){

    $fb_app_id = flo_get_option('flo-fb-app-id','');

    // if the App ID is set, we out put it in the header
    if(strlen($fb_app_id)){
      ?>
        <meta property="fb:app_id" content="<?php echo $fb_app_id; ?>">
      <?php
    }

  }
}

add_action('wp_footer', 'flo_add_footer_custom_scripts');
function flo_add_footer_custom_scripts(){

  global $share_enabled, $pinterest_sharing_enabled, $listing_share_enabled;

  // pinterest share script
  if( (is_single() || (isset($listing_share_enabled) && $listing_share_enabled == 1) )  && isset($share_enabled) && $share_enabled && isset($pinterest_sharing_enabled) && $pinterest_sharing_enabled ){

    ?>
      <script async defer src="//assets.pinterest.com/js/pinit.js"></script>
    <?php
  }
}



/**
 *
 * Return the optimal thumbnail size for a specific listing view
 *
 * @param string listing_layout - the listing layout for which we need the the thumbnail
 * @param int image number - the position of the current item in the list. It is necessary for certain
 *        list views because some images have different sizes.
 *
 */

if(!function_exists('flo_get_listing_thumb_size')){
  function flo_get_listing_thumb_size( $listing_layout, $image_number ){

    switch ($listing_layout) {
      case 'listing-1':
          return 'full';
        break;

      case 'listing-2':
          return 'full';
        break;

      case 'listing-3':
          return 'medium_large';
        break;

      case 'listing-4':
          return 'medium_large';
        break;

      case 'listing-5':
          return 'medium_large';

        break;

      default:
          return 'full';
        break;
    }
  }
}



/**
 *
 * Prepare some meta data for the contact form to be compatible with the core function 'flo_send_contact'
 * The block based layout has different meta structure, therefore we get the specific email meta and save it
 * as the 'flo_send_contact' requires.
 *
 * @param array $data - the block data
 * @param string $data_email_field - the name of the 'email to' meta data from the contact block
 * @param string $data_reply_header_field - the name of the 'reply_header' meta data from the contact block
 * @param int $post_id - the contact page post ID
 *
 */
if(!function_exists('flo_set_contact_form_email')){
  function flo_set_contact_form_email($data, $data_email_field, $data_reply_header_field, $post_id){

    // workaround to ensure compatibility with the core code:

    // for previous themes we were keeping the 'contact email' in 'flo-contact-page__contact_email' meta
    // but because this theme used layout blocks, the data structure has changed
    // therefore we need to do the same here - create the 'flo-contact-page__contact_email' if it doe not exist
    // check if the current page has such a meta
    $tomail   = get_field( 'flo-contact-page__contact_email' ,$post_id);
    $data_tomail = flo_data($data, $data_email_field); // the to email saved in the layout meta

    //create the 'flo-contact-page__contact_email' if it does not exist or has a different value
    if( !($tomail && $tomail == $data_tomail) ){
      update_field('flo-contact-page__contact_email', $data_tomail, $post_id);
    }

    // do the same thing with 'contact_page__reply_header' meta
    $reply_header   = get_field( 'contact_page__reply_header' ,$post_id);
    $data_reply_header = flo_data($data, $data_reply_header_field);
    //create the 'flo-contact-page__contact_email' if it does not exist or has a different value
    if( !($reply_header && $reply_header == $data_reply_header) ){
      update_field('contact_page__reply_header', $data_reply_header, $post_id);
    }
  }
}

if(!function_exists('flo_get_listing_thumb_url')){
  function flo_get_listing_thumb_url($listing_layout, $data, $post_id){

    switch ($listing_layout) {
      case 'listing-2':

        // list view
        return get_the_post_thumbnail_url($post_id, 'full');
        break;

      case 'listing-3':
        // for listing_3 we need to check how many columns we have
        $nr_columns = flo_data($data, 'columns', 3);

        //figure out the size we need based on the number of columns
        switch ($nr_columns) {
          case '2':
            $thumb_size = 'large';
            break;
          default:
            $thumb_size = 'medium_large';
            break;
        }

        return get_the_post_thumbnail_url($post_id, $thumb_size);
        break;

      case 'listing-4':

        $thumb_size = 'medium_large';

        return get_the_post_thumbnail_url($post_id, $thumb_size);
        break;

      case 'listing-6':
        $thumb_size = 'medium_large';

        return get_the_post_thumbnail_url($post_id, $thumb_size);
        break;

      default:

          $thumb_size = 'large';

          return get_the_post_thumbnail_url($post_id, $thumb_size);
        break;
    }

  }
}

/* START: INCLUDE WIDGETS */
  include_once(get_template_directory().'/theme-files/widgets/flo-lvy-widget-featured-items.php');
  include_once(get_template_directory().'/theme-files/widgets/flo-lvy-widget-image-link.php');
  include_once(get_template_directory().'/theme-files/widgets/flo-lvy-widget-social-links.php');
  include_once(get_template_directory().'/theme-files/widgets/flo-lvy-widget-subscribe.php');
/* END: INCLUDE WIDGETS */

/**
 *
 * replace the shortcodes from the contact form
 * [something] should be replaced with a text input
 * [[something] should be replaced with a text area
 *
 * @param - string $text - the text that should be replaced.
 # @return - string - the replaced text
 */


function flo_lvy_contact_form_1_render($text) {
  $text_area = '/\{\{.*\}\}/U'; // rex ex to match the text areas placeholders

  // replace text areas placeholders
  $replaced_text = preg_replace($text_area, '<textarea class="flo-block-contact-block-1__form-field flo-no-styling" name="flo-message[]" value="" placeholder="$0"></textarea>', $text);

  // now replace the '[[' and  ']]'
  $replaced_text = str_replace('}}', '' ,str_replace('{{', '', $replaced_text));

  // now we will replace the text inputs
  $text_inputs = '/\{.*\}/U'; // U means n
  $replaced_text = preg_replace($text_inputs, '<input class="flo-block-contact-block-1__form-field flo-no-styling flo-name" type="text" name="flo-text[]" value="" placeholder="$0">', $replaced_text);
  // now replace the '[' and  ']'
  $replaced_text = str_replace('}', '' ,str_replace('{', '', $replaced_text));


  return $replaced_text;

}

function lvy_send_contact() {

  if (isset($_POST['action']) && $_POST['action'] == 'floSendContactFancy') {


    if(isset($_POST['pid']) && (is_numeric($_POST['pid']) || 'options' == $_POST['pid'] ) ){

      $post_id = $_POST['pid'];
      $tomail   = get_field( 'flo-contact-page__contact_email' ,$_POST['pid']);

      // the message containing shortcodes
      $form_row_msg = $_POST['rawmsg'];

      if(!is_email($tomail)){
        $result['error_message'] = '<p class="text-error">' . __('Please add a valid contact email. ', 'flotheme') . '</p>';
      }

      $empty_fields = false;
      foreach ($_POST['flo-message'] as $message_key => $m_value) {
        if($m_value == ''){
          $empty_fields = true;
        }
      }

      foreach ($_POST['flo-text'] as $text_field_key => $text_field_value) {
        if($text_field_value == ''){
          $empty_fields = true;
        }
      }

      if($empty_fields){
        $result['error_message'] = '<p class="text-error">' . __('All fields are required. Please fill in the empty fields', 'flotheme') . '</p>';
      }

      $frommail = '';



      $text_area = '/\{\{.*\}\}/U'; // rexgex to match the text areas placeholders
      $message = preg_replace_callback($text_area, function($matches) use (&$replacements) {
          return array_shift($_POST['flo-message']);
      }, $form_row_msg);

      
      // now we will replace the text inputs
      $text_inputs = '/\{.*\}/U'; // U means n
      $message = preg_replace_callback($text_inputs, function($matches) use (&$replacements) {
          return array_shift($_POST['flo-text']);
      }, $message);
      

      // replace <br> with new line
      $message = str_replace('<br />', '\n', $message );
      $message = stripslashes($message);

      if ( !$empty_fields && is_email($tomail) && strlen($tomail) && strlen($message)) {

        $headers = array();

        $subject = __('New email from', 'flotheme') . ' ' . get_bloginfo('name') . '.' . __(' Sent via contact form.', 'flotheme');

        $maybe_send_email = wp_mail($tomail, $subject, $message, $headers);

        if(true !== $maybe_send_email ){
          $result['error_message'] = '<p class="text-error">' . __('The email could not be sent. ', 'flotheme') . '</p>';
        }else{
          if (isset($_POST['thx_msg']) && strlen(trim($_POST['thx_msg']))) {
            $thx_msg = urldecode($_POST['thx_msg']);
          } else {
            $thx_msg = __('The email was sent successfully ', 'flotheme');
          }

          $result['message'] = '<span class="text-success" >' . $thx_msg . '</span>';
        }



      }

      echo json_encode($result);

    }

  }
  exit();
}

// FILETERS SPESIFIC TO THIS THEME
include_once('theme-filters.php');

?>
