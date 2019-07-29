<?php
/**
 * Data that will be accessible in every view.
 */

$theme_framework = get_theme_framework();

global $flo_options;

/**
 * Sample of the $page_layout array:
 * Array(
	    [layout_type] => full_width // options: full_width/left_sidebar/right_sidebar
	    [sidebar] => main // or any other sidebar name
	)
	flo_get_page_layout function has a filter, in case you need to modify this data
 */
$page_layout = flo_get_page_layout();

$favicon = flo_get_option('flo-get_started__favicon','');

if( !($favicon && strlen($favicon)) ){
	$favicon = '';
}

if(isset($flo_options["flo-social-links"]) && is_array($flo_options["flo-social-links"]) && sizeof($flo_options["flo-social-links"])){
	$flo_social_links = $flo_options["flo-social-links"];
}else{
	$flo_social_links = array();
}


$data = array(
	//'menu' => new Classy\Menu(),
	'post' => $theme_framework::get_post(),
	'flo_options' => $flo_options,
	'flo_custom_favicon' => $favicon,
	'layout_type' => $page_layout['layout_type'],
	'sidebar' => $page_layout['sidebar'],
	'body_sidebar_class' => $page_layout['body_sidebar_class'],
	'sidebar_container_class' => $page_layout['sidebar_container_class'],
	'flo_social_links' => $flo_social_links
);
//deb_e($data);
