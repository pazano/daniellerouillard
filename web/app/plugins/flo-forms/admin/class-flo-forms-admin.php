<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://flothemes.com
 * @since      1.0.0
 *
 * @package    Flo_Forms
 * @subpackage Flo_Forms/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Flo_Forms
 * @subpackage Flo_Forms/admin
 * @author     Alex G. <alexg@flothemes.com>
 */
if(!class_exists('Flo_Forms_Admin')){
	class Flo_Forms_Admin {

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
		 * @param      string    $plugin_name       The name of this plugin.
		 * @param      string    $version    The version of this plugin.
		 */
		public function __construct( $plugin_name, $version ) {

			$this->plugin_name = $plugin_name;
			$this->version = $version;

		}

		/**
		 * Register the stylesheets for the admin area.
		 *
		 * @since    1.0.0
		 */
		public function enqueue_styles() {

			$cpt =  array('flo_forms', 'flo_form_entry');
			
			$screen = get_current_screen();

			if(isset($screen->post_type) && in_array($screen->post_type, $cpt) || 
					(isset($screen->base) && 'toplevel_page_flo_forms_settings' == $screen->base ) || 
					(isset($screen->base) && strpos($screen->base, 'floforms-settings') !== false )

				) {

				
				wp_enqueue_style( 'flo-froala', plugin_dir_url( __FILE__ ) . 'css/froala-editor.css', array(), $this->version, 'all' );
				wp_enqueue_style( 'flo-froala-font-awesome', plugin_dir_url( __FILE__ ) . 'css/font-awesome.min.css', array(), $this->version, 'all' );
			
				wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/flo-forms-admin.min.css', array(), $this->version, 'all' );
				wp_enqueue_style( 'flo-iconmoon', plugin_dir_url( __FILE__ ) . 'iconmoon/style.css', array(), $this->version, 'all' );

				global $pagenow, $typenow;
				if (empty($typenow) && !empty($_GET['post'])) {
				    $post = get_post($_GET['post']);
				    $typenow = $post->post_type;
				}

				if (is_admin() && $typenow=='flo_forms') {
				    if ($pagenow=='post-new.php' OR $pagenow=='post.php') {
				    	wp_enqueue_style('wp-color-picker');
				    	wp_enqueue_style( $this->plugin_name.'_jquery_ui', plugin_dir_url( __FILE__ ) . 'vendor/jquery-ui-flo/jquery-ui.min.css', array(), $this->version, 'all');
				    }
				}

			}					

		}

		/**
		 * Register the JavaScript for the admin area.
		 *
		 * @since    1.0.0
		 */
		public function enqueue_scripts() {

			$cpt =  array('flo_forms', 'flo_form_entry');
			
			$screen = get_current_screen();

      $forms_options = get_option('flo_forms_options');

      $google_fonts = array(); // default val
      if(isset($forms_options['google_fonts'])) {
        $google_fonts = json_decode( $forms_options['google_fonts'] );
      }

      $custom_fonts = array(); // default val
      if(isset($forms_options['custom_fonts'])) {
        $custom_fonts = json_decode( $forms_options['custom_fonts'] );
      }


			// enqueue the scripts only on the pages we use them
			if(isset($screen->post_type) && in_array($screen->post_type, $cpt) /*||
					(isset($screen->base) && 'toplevel_page_flo_forms_settings' == $screen->base )*/ ) {


				wp_enqueue_script( 'flo-froala', plugin_dir_url( __FILE__ ) . 'js/froala_editor.pkgd.min.js', array('jquery'), $this->version, $in_footer = true );

				wp_enqueue_script( 'sortable', plugin_dir_url(__FILE__).'js/Sortable.js', array(), $this->version, $in_footer = true );

				// canvas
        if(IS_FLO_FORMS_PRO) {
          wp_enqueue_script( 'flo_html2canvas', plugin_dir_url( __FILE__ ) . 'js/html2canvas.min.js', array(), $this->version, $in_footer = true );
        }


				wp_enqueue_script( 'flo_vue_bundle_js', plugin_dir_url(__FILE__).'../dist/js/adminApp.js', array(), $this->version, $in_footer = true );

				wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/flo-forms-admin.js', array( 'jquery','jquery-ui-autocomplete' ), $this->version, $in_footer = true );





				global $pagenow, $typenow;
				if (empty($typenow) && !empty($_GET['post'])) {
				    $post = get_post($_GET['post']);
				    $typenow = $post->post_type;
				}

				if (is_admin() && $typenow=='flo_forms') {
				    if ($pagenow=='post-new.php' OR $pagenow=='post.php') {
				    	wp_enqueue_script('jquery-ui-tabs');
				    	wp_enqueue_script('jquery-ui-sortable');
				    }
				}


        $form_integrations = apply_filters('flo_forms_integrations', array());

				$months = array();
        $monthsShort = array();
        $weekdaysShort = array();
        $weekdays = array();

        // generate translated months
        for ($i=1; $i<13; $i++ ) {
          $months[] = date_i18n('F',strtotime('20-'.$i.'-2019'));
          $monthsShort[] = date_i18n('M',strtotime('20-'.$i.'-2019'));

        }

        // generate translated week days
        for ($i=1; $i<8; $i++ ) {
          $weekdaysShort[] = date_i18n('D',strtotime($i.'-09-2019'));
          $weekdays[] = date_i18n('l',strtotime($i.'-09-2019'));
        }


				$flo_date_i18n = array(
          'previousMonth' => __("Previous Month","flo-forms"),
          'nextMonth'     => __("Next Month","flo-forms"),
          'months' => $months,
          'monthsShort' => $monthsShort,
          'weekdays'      => $weekdays,
          'weekdaysShort' => $weekdaysShort,
        );

        $vue_app_data = array(
          'form_integrations' => $form_integrations,
          'flo_date_i18n' => $flo_date_i18n,
        );



				wp_localize_script( 'flo_vue_bundle_js', 'flo_forms_google_fonts', $google_fonts); // default val
        wp_localize_script( 'flo_vue_bundle_js', 'flo_forms_custom_fonts', $custom_fonts); // default val

        wp_localize_script( 'flo_vue_bundle_js', 'vue_app_data', $vue_app_data);

        $enque_g_fonts_styles = self::maybe_enque_g_fonts_styles($google_fonts);

			}

			if( isset($screen->base) && 'toplevel_page_flo_forms_settings' == $screen->base ) {
        wp_enqueue_script( 'flo_vue_fonts_bundle_js', plugin_dir_url(__FILE__).'../dist/js/adminFontsApp.js', array(), $this->version, $in_footer = true );
        wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/flo-forms-admin.js', array( 'jquery','jquery-ui-autocomplete' ), $this->version, $in_footer = true );


        wp_localize_script( 'flo_vue_fonts_bundle_js', 'flo_forms_google_fonts', $google_fonts); // default val

        wp_localize_script( 'flo_vue_fonts_bundle_js', 'flo_forms_custom_fonts', $custom_fonts); // default val

      }

			

		}


		public function maybe_enque_g_fonts_styles($google_fonts) {

		  if( isset($google_fonts) && is_array($google_fonts) && sizeof($google_fonts)) {
        foreach ($google_fonts as $g_font) {
          wp_enqueue_style( $this->plugin_name.$g_font->name, $g_font->font_styles_url, array(), '', 'all');
        }
      }

    }

		/**
		 *
		 * Add custom shortcode column to the Forms browse page
		 *
		 */
		public function custom_columns($column, $post_id){
			if ($column == 'form_shortcode'){
			?>	
			[floform id='<?php echo $post_id ?>']
			<?php
			}
		}

		/**
		 *
		 * register Shortcode column to the Forms browse page
		 *
		 */
		public function set_custom_columns($columns){

			$new = array();
			foreach($columns as $key => $title) {
			    if ($key=='date') // Put the Shortcode column before the Date column
			      $new['form_shortcode'] = __( 'Shortcode', 'flo-forms' );
			    $new[$key] = $title;
			}
			return $new;

		}

		public function entry_custom_columns($column, $post_id){
			if ($column == 'user_email'){
				$user_email = get_post_meta($post_id, 'user_email', true);
				echo $user_email;
			
			}
		}

		public function set_entry_custom_columns($columns){
			
			$new = array();
			foreach($columns as $key => $title) {
			    if ($key=='date') // Put the User Email column before the Date column
			      $new['user_email'] = __( 'User Email', 'flo-forms' );
			    $new[$key] = $title;
			}
			return $new;
		}



		/**
		 *
		 * Create a drop down with the list of Forms to be able to filter entries by Form
		 * Used on Entries browse page
		 *
		 */
		public function restrict_entries_by_form() {
			global $typenow;
			$post_type = 'flo_form_entry'; // change HERE
			$taxonomy = 'entry_form'; // change HERE
			if ($typenow == $post_type) {
				$selected = isset($_GET[$taxonomy]) ? $_GET[$taxonomy] : '';
				$info_taxonomy = get_taxonomy($taxonomy);
				wp_dropdown_categories(array(
					'show_option_all' => __("Show All {$info_taxonomy->label}"),
					'taxonomy' => $taxonomy,
					'name' => $taxonomy,
					'orderby' => 'name',
					'selected' => $selected,
					'show_count' => true,
					'hide_empty' => true,
					'value_field' => 'slug'
				));
			};
		}

		/**
		 *
		 * Method used by post_class filter
		 * check if the post type is flo_form_entry and if it has 'entry_read'
		 * meta data, and add a class to that Form Entry post
		 * That class is used to style the Browse entries differntly depending 
		 * if it was read or not
		 *
		 */
		public function read_unread_entries($classes, $class, $post_id){
			// only for entries posts
			if(get_post_type($post_id) == 'flo_form_entry'){
				$is_entry_read = get_post_meta($post_id,'entry_read', true);
				if ( 'read' == $is_entry_read ) {
			        $classes[] = 'entry-read';
			    }
			}

		    return $classes;
		}

		/**
		 *
		 * this method is fired when a post is edited
		 * check if the post is a Form Entry, and add a meta data that will be used
		 * as flad for read and unread Entries
		 *
		 */
		public function set_entry_read(){
			if(isset($_GET['post']) && is_numeric($_GET['post'])){
				if(get_post_type($_GET['post']) == 'flo_form_entry'){
					update_post_meta(sanitize_text_field($_GET['post']),'entry_read','read'); // set a meta data for the read entries
				}
			}
		}


		/**
		 *
		 * to the Entries browse list add a button that allows to mark each entry as read or unread
		 *
		 */
		public function read_unread_entries_button($actions, $post){
			//check for your post type
		   if ($post->post_type =="flo_form_entry"){
		   	
		   		$is_entry_read = get_post_meta($post->ID,'entry_read', true);
				if ( 'read' == $is_entry_read ) {
			        $actions['entry_read_unread'] = '<a href="#" data-entry_read="1" data-post_id="'.$post->ID.'" onclick="entryReadUnread(jQuery(this)); return false;">'.__('Mark as unread','flo-forms').'</a>';
			    }else{
			    	$actions['entry_read_unread'] = '<a href="#" data-entry_read="0" data-post_id="'.$post->ID.'" onclick="entryReadUnread(jQuery(this)); return false;">'.__('Mark as read','flo-forms').'</a>';
			    }


		   }
		   return $actions;
		}

		/**
		 *
		 * handle ajax request that marks a Entry  as read or unread
		 *
		 */
		public function read_unread_entry(){
			if($_POST['is_read'] == 1){ // if the Entry was read already
				// we want to mark it as unread
				delete_post_meta( sanitize_text_field($_POST['post_id']), 'entry_read');
				$response['is_read'] = 0;
				$response['text'] = __('Mark as read','flo-forms');
			}else{
				update_post_meta(sanitize_text_field($_POST['post_id']) ,'entry_read','read');
				$response['is_read'] = 1;
				$response['text'] = __('Mark as unread','flo-forms');
			}

			echo json_encode($response);
			exit();
		}


    /**
     * handle ajax request that saves a form template
     */
    public function save_form_template() {
      $response = array();


      //delete_option('flo_forms_templates');

      $templates_option = get_option('flo_forms_templates', array());


      if(isset($_POST['schema'])) {

        // for sanitization of the user input.
        $allowed_html = array(
          'a' => array(
            'href' => array(),
            'title' => array(),
            'target' => array()
          ),
          'br' => array(),
          'em' => array(),
          'strong' => array(),
          'h1' => array(), 'h2' => array(), 'h3' => array(), 'h4' => array(), 'h5' => array(), 'h6' => array(),
          'p' => array(),
          'b' => array(),
          'i' => array()
        );

        // there may be fields attributes that allow html tags, and in case those tags contain double quotes -> '"' ,
        // we need to replace them with the single quotes.
        // That usually happens with <a> tags
        $schema = preg_replace_callback(
          '|<\s*a[^>]*>(.*?)<\s*/\s*a>|', // match the <a> tags and its content
          function ($matches) {
            return str_replace( '"',"'", $matches[0]); // replace the " with ' for each matched
          },
          stripslashes($_POST[ 'schema' ]) // work with the schema without slashes
        );

        $schema = str_replace('&amp;&amp;','and', $schema);
        $schema = str_replace('&&','and', $schema);

        // replace the double quotes if any, and the '><' which breaks the form
        $schema = str_replace('><','',  str_replace('\"',"'",$schema));

        // strip the slaches from the result one more time, just in case
        // sanitize the result using wp_kses_post
        // add the slashes back using wp_slash -> for the default schema double quotes
        $schema	= wp_slash(wp_kses(  stripslashes($schema), $allowed_html)); // sanitize

        $img_src = self::save_image($_POST['img_src'], $_POST['template_title'] );

        $current_template = array(
          'schema' => $schema,
          //'img_src' => wp_kses($_POST['img_src'], array()),
          'img_src' => $img_src ,
          'template_title' => wp_kses($_POST['template_title'], array())
        );

        $templates_option[] = $current_template;

        update_option('flo_forms_templates', $templates_option, $autoload = false);

        $response['message'] = 'The template was saved successfully. <br/> And can be used after the page is reloaded.';
      }





      echo json_encode($response);
      exit();
    }

    public function delete_form_template() {
      $response = array();
      if(isset($_POST['template_index'])) {
        $template_index = $_POST['template_index'];

        $templates_option = get_option('flo_forms_templates', array());

        if(is_array($templates_option) && isset($templates_option[$template_index]) ) {
          unset($templates_option[$template_index]);

          update_option('flo_forms_templates', $templates_option, $autoload = false);

          $response['msg'] = 'Template removed successfully';
        }
      }

      echo json_encode($response);

      exit();
    }

    /**
     * Save a base64 jpeg image on the server in Media library.
     */
    function save_image($base64_image_string, $output_file_name_without_extension) {
      global $wp_filesystem;

      // Initialize the WP filesystem, no more using 'file-put-contents' function
      if (empty($wp_filesystem)) {
        require_once (ABSPATH . '/wp-admin/includes/file.php');
        WP_Filesystem();
      }

      // get uploads dir
      $upload_dir = wp_upload_dir();
      $upload_basedir = $upload_dir['basedir'];
      $upload_baseurl = $upload_dir['baseurl'];

      $screens_dir = $upload_basedir . '/flo_forms_screens/'; // custom folder where the screen shots will be kept

      // if folder that will hold the screens does not exist yet, create it
      if(!$wp_filesystem->is_dir($screens_dir)) {
        $wp_filesystem->mkdir($screens_dir);
      }

      // folder exists, push image to it
      $file = false;
      if($wp_filesystem->is_dir($screens_dir)) {


        $img             = str_replace( 'data:image/jpeg;base64,', '', $base64_image_string );
        $img             = str_replace( ' ', '+', $img );
        $decoded         = base64_decode( $img );

        $hashed_filename = md5( $output_file_name_without_extension . microtime() ) . '_' . $output_file_name_without_extension;

        $filePath = $screens_dir . $hashed_filename . ".jpeg";
        $fileCallback = $wp_filesystem->put_contents(
          $filePath,
          $decoded,
          FS_CHMOD_FILE // predefined mode settings for WP files
        );

        $publicFilePath = str_replace($upload_basedir, $upload_baseurl, $filePath);
        if($fileCallback) $file = $publicFilePath;
      }

      return $file;

    }

    /**
		 *
		 * SHow a update-like notification bubble on Entries menu
		 * to show the number of unread entries
		 *
		 */
		public function unread_entries_note(){
			global  $submenu;

			// retrieve all unread Entries
			$args = array(
				'post_type' => 'flo_form_entry',
				'posts_per_page' => -1,
				'meta_query' => array(
				    array(
				     'key' => 'entry_read',
				     'compare' => 'NOT EXISTS' // this should work...
				    ),
				)

			);
			$query = new WP_Query( $args );

			if($query->post_count){
        $unread_count = $query->post_count;
        add_action( 'admin_notices', function() use ($unread_count) {

          ?>
          <div class="notice notice-error is-dismissible">


            <h4><?php echo sprintf( __('There are %d unread Flo Forms entries. Please %s check them %s', 'flo-forms'),$unread_count,
                '<a href="'.admin_url('edit.php?post_type=flo_form_entry').'">','</a>' ); ?></h4>
          </div>
          <?php
        }, 1 );

				if(isset($submenu['edit.php?post_type=flo_forms'])){
					foreach ( $submenu['edit.php?post_type=flo_forms'] as $key => $value) {
						if($value[2] == 'edit.php?post_type=flo_form_entry'){
							$submenu['edit.php?post_type=flo_forms'][$key][0] .= '<span title="'.__('Unread entries','flo-forms').'" class="update-plugins count-' . $query->post_count . '"><span class="plugin-count">' . $query->post_count . '</span></span>';
							return;
						}
					}
				}


			}
			

		}

		/**
		 * Check for the plugin updates
		 *
		 * @since    1.0.0
		 */
		function flo_plugin_update() {

			if ( is_admin() && !version_compare(phpversion(), '5.3.0', '<') ) {

				$plugin_data = get_plugin_data( plugin_dir_path( __DIR__ ) . 'flo-forms.php' );

				$plugin_version = $plugin_data['Version'];

				$flo_plugin_remote_path = 'http://flothemes.com/recommended_plugins/plugin-updates.php';

				$flo_plugin_slug = plugin_basename( plugin_dir_path( __DIR__ ) . 'flo-forms.php' );

				$product_name = 'floforms';

				$the_plugin = 'floforms/flo-forms.php';

				require_once ('class-flo-plugin-auto-update.php');

				new flo_plugin_auto_update ($plugin_version, $flo_plugin_remote_path, $flo_plugin_slug, $product_name, $the_plugin);

			}

		}

		/**
		 * Add the plugins settings page
		 *
		 * @since    1.0.0
		 */
		public function flo_add_forms_options(){

			add_menu_page( $page_title  = 'Flo Forms settings', $menu_title = 'FloForms Settings', $capability = 'manage_options', $menu_slug = 'flo_forms_settings', $function = array(&$this, 'flo_forms_options') , $icon_url = 'dashicons-admin-generic', $position = '58' );


			add_submenu_page( 'flo_forms_settings', $page_title  = 'Flo Forms settings', $menu_title = 'FloForms Settings', $capability = 'manage_options', $menu_slug = 'flo_forms_settings', $function = array(&$this, 'flo_forms_options') , $icon_url = 'dashicons-admin-generic' );


		}

		/**
		 * Add the plugins settings page options
		 *
		 * @since    1.0.0
		 */
		public function flo_forms_options(){
			$forms_options = get_option('flo_forms_options');

			if(!$forms_options){
				$current_user = wp_get_current_user(); // get the current user info

				// if the options are not save yet, we define the defaults
				$forms_options = array(
					'enable_email_reminder' => 1,
					'reply_to_header' => 1,
					//how many days old should entries be in order to triger the reminder email
					'entries_days_old_reminder' => 1,
					'send_to_email' => $current_user->user_email,
					'text_email' => 0,
	                'enable-captcha' => 0,
	                'g_site_key' => '',
	                'g_secret_key' => ''
				);
			}

			if(!isset($forms_options['reply_to_header'])){
				$forms_options['reply_to_header'] = 1;
			}

			if(!isset($forms_options['text_email'])){
				$forms_options['text_email'] = 0;
			}

			include_once('partials/options-form.php');
		}

		/**
		 *
		 * handlle ajax request for searching pages
		 *
		 */
		public function search_page() {

			$query = array('post_type' => 'page');		

			$query['s'] = isset( $_GET['term'] ) ? $_GET['term'] : exit;
	    
	    global $wp_query;
	    $result = array();
	    
	    $wp_query = new WP_Query( $query );
	    
	    if( $wp_query -> have_posts() ){
	       
	        foreach( $wp_query -> posts as $post ){
	            
	            $a_json_row["suggestions"] = $post -> post_title;
	            $a_json_row["id"] =  $post -> ID;
	            $a_json_row["label"] = $post -> post_title;
	            
	            array_push($result, $a_json_row);
	        }
	    }
	    
	    echo json_encode( $result );

			exit;
		}


		/**
		 *
		 * having the form schema, we return an array of all the fields
		 * basically the returned array has a simpler form and used the 'model' as key
		 * @param - object -> the schemaobject
		 * @return - array -> an array of field objects
		 */		
		public static  function get_fields_from_schema($schema){
			$fields = array();

			foreach ($schema->groups as $gr_key => $group) {
				foreach ($group->fields as $field_key => $field) {
					$fields[$field->model] = $field;
				}
			}

			return $fields;
		}

    /**
     * Display plugin upgrade notice to users if the Upgrade Notice is passed via the readme.txt file
     * @return -
     */
    public function flo_forms_plugin_update_message($data, $response){
      if( isset( $data['upgrade_notice'] ) ) {
        printf(
          '<div class="update-message">%s</div>',
          wpautop( $data['upgrade_notice'] )
        );
      }
    }

    /**
     * Adds the appropriate mime types to WordPress
     *
     * @param array $existing_mimes
     *
     * @return array
     */

    public function flo_forms_additional_mime_types($mimes){
      $mimes['ttf']  = 'font/ttf';
      $mimes['otf']  = 'font/otf';
      $mimes['woff'] = 'application/font-woff';
      $mimes['woff2'] = 'application/font-woff2';
      $mimes['svg'] = 'image/svg+xml';

      return $mimes;
    }

    public function flo_export_forms_options() {

      //update_option('flo_forms_options',wp_kses($forms_options, array()));

      $forms_options = get_option('flo_forms_options');

      $JSON_PRETTY_PRINT = defined( 'JSON_PRETTY_PRINT' ) ? JSON_PRETTY_PRINT : null;

      echo json_encode(
        $forms_options,
        $JSON_PRETTY_PRINT
      );

      exit();
    }


    public function flo_import_forms_options() {
      //var_dump('$_FILES',$_FILES);

      $response = array();

      if(isset($_FILES['options_file']) ) {
        if(isset($_FILES['options_file']['type'])  && $_FILES['options_file']['type'] == 'application/json') {
          global $wp_filesystem;

          if (empty($wp_filesystem)) {
            require_once (ABSPATH . '/wp-admin/includes/file.php');
            WP_Filesystem();
          }

          $f_options = $wp_filesystem->get_contents($_FILES['options_file']['tmp_name']);

          if(is_string($f_options) && strlen($f_options)) {

            $f_options_arr = (array)json_decode($f_options);

            // check for some keys to ensure the content of the uploaded file is legit
            if(isset($f_options_arr['send_to_email']) && isset($f_options_arr['enable_email_reminder'])) {
              update_option('flo_forms_options', $f_options_arr, false);
              //_e('The settings were imported successfully.','flo-forms');
              $response['msg'] = __('The settings were imported successfully.','flo-forms');
              $response['status'] = 'success';
            }else{
              //_e('Invalid file content. Some key data is missing.','flo-forms');
              $response['msg'] = __('Invalid file content. Some key data is missing.','flo-forms');
              $response['status'] = 'error';
            }


          }else{
            //_e('Invalid file content.','flo-forms');
            $response['msg'] = __('Invalid file content.','flo-forms');
            $response['status'] = 'error';
          }

        }else{
          //_e('Wrong file type. Please upload a json file.','flo-forms');
          $response['msg'] = __('Wrong file type. Please upload a json file.','flo-forms');
          $response['status'] = 'error';
        }

      }else{
        //_e('Please upload a json file.','flo-forms');
        $response['msg'] = __('Please upload a json file.','flo-forms');
        $response['status'] = 'error';
      }

      echo json_encode($response);

      exit();
    }


    /**
     * CHeck if the site is accessed via HTTPS and then check if the WP site_url settings are not using https,
     * call a method that shows a warning
     */
    public function flo_check_for_mixed_content() {

      if ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || $_SERVER['SERVER_PORT'] == 443) {
        // site accessed via https
        if(strpos(get_site_url(),'https://') === false) {
          // show the notice
          add_action( 'admin_notices', array('Flo_Forms_Admin', 'flo_update_site_url_notice') );
        }
      }
    }


    /**
     * show admin notice about updating the site url to HTTPS
     */
    public static function flo_update_site_url_notice() {
      ?>
      <div class="notice notice-warning is-dismissible">
        <p><?php echo sprintf( __( 'It looks like the site is using https, but the "Site URL" settings are still using http. 
    Update please the WordPress Address URL and the Site Address URL to use https as well to avoid problems with Flo Forms and other 
    themes or plugins functionality. Check the %s documentation %s for details.', 'flo-forms' ),
            '<a href="https://docs.flothemes.com/flothemes-flo-forms/#the-form-stopped-working-what-can-i-do" target="_blank" >', '</a>');
          ?></p>
      </div>
      <?php
    }


    /**
     * handle the Ajax request that sends a test email
     */
    public function flo_send_test_email() {
        $response = array();
        if( !(isset($_POST['email']) && is_email($_POST['email'])) ) {
          $response['error'] = true;
          $response['error_message'] = __('Please enter a valid email', 'flo-forms');
        }else{
          $subject = __('Flo Forms Test Email', 'flo-forms');

          //$headers = array();

          $headers[] = 'Content-Type: text/html; charset=UTF-8';// send html email


          $message = __('This is a test email from Flo Forms settings','flo-forms');

          //$maybe_send_email = wp_mail( $tomail = $_POST['email'], $subject, $message, $headers);

          $maybe_send_email = Flo_Forms::wp_mail( $tomail = $_POST['email'], $subject, $message, $headers);

          if(!$maybe_send_email){
            $response['error'] = true;
            $response['error_message'] = __('We could not send the email', 'flo-forms');
          }
        }

        if(!isset($response['error'])) {


          $response['success_message'] = '<div class="notice-success notice is-dismissible">';
          $response['success_message'] .= __('A test email was sent successfully! Please check your inbox to make sure it is delivered.', 'flo-forms');

          $response['success_message'] .= '<br>'. __('NOTE! Even if this email worked fine, we strongly recommend to test each Form as well to make sure everything is good.', 'flo-forms');
          $response['success_message'] .= '</div>';
        }

        echo json_encode($response);

        exit();
    }

    public function ff_email_issues_notice() {
      if(get_option('ff-email-issue-notice'))
          return;
      ?>
      <div class="notice notice-error ff-email-issue-notice" style="position: relative;">
        <h3 style="color: red">
          <span class="dashicons dashicons-warning"></span>
          <?php _e('Important Flo Forms Notice To Avoid Missing Contact Form Inquiries.') ?>
        </h3>

        <a class="ff-emails-message-close notice-dismiss" style="display: flex; text-decoration: none;" href="<?php echo admin_url('?dismiss_ff_email_notice=1') ?>">
          <?php _e('Dismiss','flo-forms'); ?>
        </a>


        <p>
          <?php echo sprintf( __( 'Depending on the hosting server configuration and a combination of other factors there may be issues with <u><b>sending</b> and <b>receiving</b></u> emails. 
  <br/> Go %s here %s to test if the email function works on this site. 
  If there are issues with the emails please check %s these recommendations %s.<br/> 
  The plugin is storing all the submissions in the Database,  we recommend to check the %s form entries %s from time to time in case the email fails. <br/>
  Also we strongly recommend testing the contact form on regular basis, and especially after updates to the site or plugins are made.', 'flo-forms' ),
            '<a href="'.admin_url('admin.php?page=flo_forms_settings&tab=test-email').'">', '</a>',
          '<a href="https://docs.flothemes.com/flo-forms-issues/" target="_blank">', '</a>',
          '<a href="'.admin_url('edit.php?post_type=flo_form_entry').'">', '</a>'
            ); ?>
        </p>
      </div>
      <?php
    }

    public function ff_dismiss_email_issues_notice() {
      //delete_option('ff-email-issue-notice');
      if(isset($_GET['dismiss_ff_email_notice']) && $_GET['dismiss_ff_email_notice'] == 1 ) {
        update_option('ff-email-issue-notice', 'dismissed');
      }
    }

    /*append the browser meta if applicable */
    public function flo_append_browser_meta($flo_entry_fields, $entry_id) {
      if(IS_FLO_FORMS_PRO) {
        $browser_meta = get_post_meta($entry_id, 'browser_meta', true);

        $browser_meta_table = self::create_browser_meta_table($browser_meta);

        $flo_entry_fields = $flo_entry_fields.$browser_meta_table;
      }

      return $flo_entry_fields;
    }

    public static function create_browser_meta_table($browser_meta) {

      $label_row_style = 'font-weight: bold; background-color: #fafafa; padding: 8px 35px';
      $value_row_style = 'padding: 5px 30px 5px 60px; background-color: #fff; border-bottom: 1px solid #DFDFDF;';
      $table_rows = '';


        ob_start();
        ob_clean();
        ?>
          <tr>
            <th><h3><?php _e('Additional meta:') ?></h3></th>
          </tr>
        <?php
        foreach ($browser_meta as $label => $bm_val) {
          ?>
          <tr style="<?php //echo $label_row_style; ?>">
            <td style="<?php echo $label_row_style; ?>"><?php echo $label; ?></td>
          </tr>
          <tr style="<?php //echo $value_row_style; ?>">
            <td style="<?php echo $value_row_style; ?>"><?php echo nl2br(sanitize_textarea_field($bm_val)); ?></td>
          </tr>
          <?php
        }
        $table_rows .= ob_get_clean();



      $the_table = '<table style="width: 100%; border: 1px solid #DFDFDF; border-bottom:0px; border-spacing: 0px;">';
      $the_table .= $table_rows;
      $the_table .= '</table>';

      return $the_table;
    }

  }
}





