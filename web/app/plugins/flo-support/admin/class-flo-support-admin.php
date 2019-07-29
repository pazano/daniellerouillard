<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://flothemes.com/
 * @since      1.0.0
 *
 * @package    Flo_Support
 * @subpackage Flo_Support/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Flo_Support
 * @subpackage Flo_Support/admin
 * @author     Alex Bulat <alexb@flothemes.com>
 */
class Flo_Support_Admin {

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

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Flo_Support_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Flo_Support_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
		 
	  
		wp_enqueue_style( $this->plugin_name . '-icons', plugin_dir_url( __FILE__ ) . '../public/fonts/fontello/css/flo-support-icon.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . '../public/css/styles.min.css', array(), $this->version, 'all' );
		
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Flo_Support_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Flo_Support_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */
	 
	 	
		/* START: BETA - FIREBASE */
			wp_enqueue_script( 'fb-dep-1', 'https://www.gstatic.com/firebasejs/4.12.1/firebase.js', array(), '', false );
			wp_enqueue_script( 'fb-dep-2', 'https://www.gstatic.com/firebasejs/4.12.1/firebase-app.js', array(), '', false );
			wp_enqueue_script( 'fb-dep-3', 'https://www.gstatic.com/firebasejs/4.12.1/firebase-database.js', array(), '', false );
		/* END: BETA - FIREBASE */
		
		$deps = [ 
			'jquery', 
			// 'acf-flo-template-selector',
			'acf-input',
			// 'acf-flo-flexible-content',
			// 'acf-flo-flexible-misc', 
			// 'jquery-ui-draggable', 
			// 'jquery-ui-core', 
			// 'select2'
		];
		// wp_enqueue_script( $this->plugin_name . '-rita', plugin_dir_url( __FILE__ ) . '../dev/vendor/js/rita-small.min.js', $deps, $this->version, false );
		wp_enqueue_script( $this->plugin_name . '-vendor', plugin_dir_url( __FILE__ ) . '../public/js/vendor.min.js', $deps, $this->version, false );
		wp_enqueue_script( $this->plugin_name . '-scripts', plugin_dir_url( __FILE__ ) . '../public/js/scripts.min.js', array( 'jquery', $this->plugin_name . '-vendor' ), $this->version, true );

	}
	
	/**
	 * Check for the plugin updates
	 *
	 * @since    1.0.0
	 */
	function flo_include_updater() {

		if ( is_admin() && !version_compare(phpversion(), '5.3.0', '<') ) {

			$plugin_data = get_plugin_data( plugin_dir_path( __DIR__ ) . 'flo-support.php' );

			$plugin_version = $plugin_data['Version'];

			$flo_plugin_remote_path = 'http://flothemes.com/recommended_plugins/plugin-updates.php';

			$flo_plugin_slug = plugin_basename( plugin_dir_path( __DIR__ ) . 'flo-support.php' );

			$product_name = 'flo-support';

			$the_plugin = 'flo-support/flo-support.php';

			require_once ('class-flo-plugin-auto-update.php');

			new flo_support_plugin_auto_update ($plugin_version, $flo_plugin_remote_path, $flo_plugin_slug, $product_name, $the_plugin);

		}

	}


}


add_action( 'admin_menu', 'flo_add_support_options' );
function flo_add_support_options() {
	add_submenu_page(
		$parent_slug = 'options-general.php', 
		$page_title  = 'FloSupport Settings', 
		$menu_title = 'FloSupport Settings', 
		$capability = 'manage_options', 
		$menu_slug = 'flo_support_settings', 
		$function = 'flo_support_options_render'
	);
}

function flo_support_options_render() { ?>
	
		<div class="flo-support__options-wrap">
			<form method="post" action="options.php">
				<?php
					settings_fields( 'flo_support_options' ); 
					do_settings_sections( 'flo_support_options' );
				?>
			<div class="flo-support__option-group">
				<h3 class="flo-support__option-title">
					Automatically send technical information in tickets
				</h3>
				<input 
					id="flo-support__settings-analytics"
					class="flo-support__option flo-support__option-checkbox"
					type="checkbox" 
					<?php checked(1, get_option('flo_support_analytics')); ?> 
					value="<?php echo get_option('flo_support_analytics'); ?>"
					name="flo_support_analytics"
				/>

				<p class="flo-support__option-tip">
					By enabling this option, you agree to automatically 
					send us your technical information when opening a ticket: 
					Operating System (macOS/Windows), 
					PHP Version, 
					WordPress Version, 
					Activated Plugins and their versions, 
					Theme Name and Version, previous plugin search terms
				</p>
			</div>
			<?php submit_button(); ?>
			</form>
		</div>
	<?php
}

add_action('admin_init', 'flo_support_register_settings' );
function flo_support_register_settings() {
	// delete_option('flo_support_analytics');
	register_setting(
		'flo_support_options', 
		'flo_support_analytics', 
		[
			'type' => 'boolean', 
			'default' => true, 
			
		]
	);
}

add_action('admin_footer', 'render_beacon_wrap', 11);

if(get_option('flo_support_analytics', true)) {
	add_action('admin_enqueue_scripts', 'render_info_data', 11);
}

function render_info_data() {
	
	$flo_support_user_data = get_transient( 'flo_support_user_data' );
	if(!$flo_support_user_data) {
		// getting all data for ticket prepopulating
		global $wp_version;
		
		// theme name and version
		$theme_data = wp_get_theme();
		if($theme_data->get('Author') == 'Flothemes') {
			$theme_name = $theme_data->Name;
			$theme_version = $theme_data->Version;
		} else {
			$theme_name = 'Not a Flotheme';
			$theme_version = 'Not a Flotheme';
		}
		
		// purchase code
		if(function_exists('flo_get_theme_key')){
			$updater_order_key = flo_get_theme_key();
		} else {
			$updater_order_key = 'Not Defined';
		}
		
		// active plugins
		$apl = get_option('active_plugins');
		$plugins = get_plugins();
		$activated_plugins = array();
		foreach ($apl as $p) {
			if(isset($plugins[$p])){
				array_push($activated_plugins, $plugins[$p]['Name']);
			}           
		}
		
		$activated_plugins_list = implode(', ', $activated_plugins); 
		
		$flo_support_user_data = [
			'wp_version' => $wp_version,
			'order_nr' => $updater_order_key,
			'theme_name' => $theme_name,
			'theme_version' => $theme_version,
			'php_version' => phpversion(),
			'active_plugins' => $activated_plugins_list
		];
		
		// delete_transient('flo_support_user_data');
		set_transient( 'flo_support_user_data', json_encode($flo_support_user_data), 60 * 60 * 24 ); // save the options for 24h
		
	}

	wp_localize_script( 'flo-support-scripts', 'flo_support_user_data', $flo_support_user_data);
	
}

function render_beacon_wrap() { 
	$theme_slug = get_template();
	if(strpos($theme_slug, '2') && !strpos($theme_slug, '-')) {
		$theme_slug = str_replace('2', '-2', $theme_slug);
	}
	
	wp_localize_script( 'flo-support', 'flo_theme_slug', $theme_slug); ?>
	
	<style class="flo-beacon-styles">
		/* START: FONTS */
			@font-face {
				font-family: "Miller-Banner-Light"; 
				src: url("<?php echo FLO_SUPPORT_PATH . "public/fonts/Miller-Banner-Light.ttf" ;?>") format("truetype");
			}
			@font-face {
				font-family: "Nitti-Grotesk-Medium"; 
				src: url("<?php echo FLO_SUPPORT_PATH . "public/fonts/Nitti-Grotesk-Medium.otf" ;?>") format("opentype");
			}
			@font-face {
				font-family: "Nitti-Grotesk-SemiLight"; 
				src: url("<?php echo FLO_SUPPORT_PATH . "public/fonts/Nitti-Grotesk-SemiLight.otf" ;?>") format("opentype");
			}
			@font-face {
				font-family: "flo-support-icon";
				src: url("<?php echo FLO_SUPPORT_PATH . "public/fonts/fontello/font/flo-support-icon.woff" ;?>") format('woff');
			}
		/* END: FONTS */
		
		body, .frame-root, .frame-content {
			width: 100%;
			height: 100%;
		}
		.main.modal {
	    height: calc(100% - 70px)!important;
			width: calc(100% - 80px)!important;
			padding: 35px 40px 35px 40px!important;
			border-radius: 0!important;
			background-color: #f8f8f8!important;
			max-height: none!important;
			bottom: auto!important;
			overflow-y: scroll !important;
			right: auto!important;
			max-width: none!important;
		}
		.modal-close {
			display: none;
		}
		.main.modal .content {
			padding: 0;
			overflow: visible;
		}
		.main.modal .contact {
	    max-height: none !important;
	    margin: 0 !important;
	    height: 100% !important;
			overflow: visible;
		}
		.main.modal .contact > div:first-child {
			overflow: visible;
		}
		.main.modal .contact::-webkit-scrollbar-track, 
		.main.modal .content::-webkit-scrollbar-track, 
		.main.modal::-webkit-scrollbar-track {
			background-color: #f8f8f8;
			
		}
		body .contact::-webkit-scrollbar, 
		body .content::-webkit-scrollbar, 
		body .main::-webkit-scrollbar,
		body .contact::-webkit-scrollbar-thumb, 
		body .content::-webkit-scrollbar-thumb, 
		body .main::-webkit-scrollbar-thumb {
			width: 2px;
			background-color: #cecece;
		}
		.frame-content .form-control {
			box-shadow: 0 0 10px rgba(0, 0, 0, .08);	
		}
		.frame-content .form-control ::placeholder{
			color: #000;
		}
		.frame-content .form-control input, 
		.frame-content .form-control select, 
		.frame-content .form-control textarea {
			border-radius: 6px;
			background-color: #fff;
			padding: 20px 25px !important;
			font-size: 14px;
			border: none;
			color: #000;
			font-family: "Nitti-Grotesk-Medium";
			height: auto;
		}
		.frame-content .form-control input:focus, 
		.frame-content .form-control select:focus, 
		.frame-content .form-control textarea:focus{
			border-color: #000;
		}
		.frame-content .form-control textarea {
			height: 135px !important;
		}
		.frame-content .article--content a, 
		.frame-content .contact--attach {
			text-decoration: none;
		}
		
		.frame-content .submit-ticket-title {
			margin-top: 0;
			margin-bottom: 15px;
			font-size: 22px;
			font-family: "Miller-Banner-Light";
		}
		.frame-content .submit-ticket-subtitle {
    	font-family: "Nitti-Grotesk-SemiLight";
			font-size: 15px;
		}
		.frame-content .flo-ticket-header {
			display: flex;
			flex-direction: column;
			margin-bottom: 20px;
		}
		
		.frame-content .contact--submit {
			display: flex;
	    flex-direction: row;
	    align-items: center;
	    justify-content: flex-start;
			margin-top: 30px;
			margin-left: 15px;
		}
		.frame-content .flo-support-icon-file {
			order: 0;
		}
		.frame-content .flo-support-icon-file:before {
			content: '\e806';
			font-style: normal;
			font-family: 'flo-support-icon';
			font-size: 20px;
			line-height: 16px;
		}
		.frame-content .contact--attach {
			margin: 0;
			line-height: 16px;
			font-size: 15px;
			font-family: "Nitti-Grotesk-SemiLight";
		}
		.frame-content .contact--attach:not(.contact--attach__remove) {
	    order: 0;
		}
		.frame-content .contact--attach__remove {
			order: 1;
		}
		.frame-content .contact--submit > div {
	    display: flex;
	    width: auto;
			margin-left: 15px;
	    flex-grow: 1;
			order: 1;
	    margin-right: 30px;
	    justify-content: space-between;
	    align-items: center;
		}
		
		.frame-content .contact--submit .btn {
			background-color: #383838;
			border-radius: 30px;
			font-size: 15px;
			padding: 15px 40px;
	    font-family: "Nitti-Grotesk-Medium";
			order: 2;
		}
		
		.form-control .contact--select {
			background-position-y: 25px!important;
		}
		
		.frame-content .contact-success {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding-top: 110px;
		}
		.frame-content .contact-success .flo-support-icon-mail-sent {
			margin-bottom: 65px;
		}
		.frame-content .contact-success .flo-support-icon-mail-sent:before {
			content: '\e808';
			font-family: 'flo-support-icon';
			font-style: normal;
			display: block;
			font-size: 50px;
			line-height: 50px;
		}
		
		.frame-content .contact-success .flo-support__contact-success--title {
			margin-top: 0;
			margin-bottom: 15px;
			font-family: "Miller-Banner-Light";
			font-size: 22px;
			line-height: 1em;
			
		}
		
		.frame-content .contact-success .flo-support__contact-success--description {
			margin-bottom: 65px;
			font-family: "Nitti-Grotesk-SemiLight";
			font-size: 15px;
			line-height: 18px;
		}
		.frame-content .contact-success .flo-support__contact-success--docs-button {
			padding: 10px 25px;
			background-color: #383838;
			color: #fff;
			font-family: "Nitti-Grotesk-Medium";
			font-size: 14px;
			line-height: 1em;
			border-radius: 25px;
			text-decoration: none;	
		}
		
		body .mobile.main .contact {
			border: 0;
			box-shadow: none;
		}
		
		body .mobile.main .beacon-wrapper {
			background: transparent;
			bottom: auto;
			left: auto;
			position: static;
			right: auto;
			top: auto;
		}
		body .mobile.main .contact {
			position: absolute;
			width: 100%!important;
			height: 100%!important;
		}
		body .mobile.main .contact .contact--form {
			padding: 35px 25px 35px 25px;
		}
		
	</style>
	<div id="beacon-flo" class="flo-support__popup-trigger" data-analytics="<?php echo get_option('flo_support_analytics', true); ?>" data-theme-slug="<?php echo $theme_slug; ?>">
		<i class="flo-support-icon-help"></i>
		<span>Get Help</span>
	</div>
	<div class="flo-support__file-uploader">
		<input type="file" id="flo-support__imgur-uploader" accept="image/*" multiple />	
	</div>
	
<?php } ?>