<?php
/**
 * Data that will be accessible on single gallery post.
 */
$theme_framework = get_theme_framework();

$post = $theme_framework::get_post();

global $flo_options;


/* START: ACF GALLERY DATA (THAT WORKS WITH CUSTOM GALLERY) */

  // Global Gallery Options (from "options")
  $gallery_data = $flo_options;


/* END: ACF GALLERY DATA (THAT WORKS WITH CUSTOM GALLERY) */


// get the attached gallery images meta
$post_image_gallery = get_field('_post_image_gallery');

if (is_string($post_image_gallery) && strlen(trim($post_image_gallery))) {
	// compatibility with the old themes  structure - before using ACF galery field
    $img_id_array = array_filter(explode(',', $post_image_gallery));
}else if(is_array($post_image_gallery) && sizeof($post_image_gallery)){
	$img_id_array = $post_image_gallery;
}else{
	$img_id_array = array();
}

$the_real_gallery_type = get_field("flo-lovely2-portfolio-gallery__type");
if (! ( is_string($the_real_gallery_type) && strlen( trim($the_real_gallery_type) ) ) ) {
  $the_real_gallery_type = "image";
}

$gallery_items = array();

switch ($the_real_gallery_type) {
  case 'image':

    $gallery_items = $img_id_array;
  break;

  // case 'video':
  //   $gallery_items = get_field("_post_video_gallery");
  // break;

  // images and videos
  case 'prius':
    $post_prius_gallery = get_field("_post_prius_gallery");
    $gallery_items = $post_prius_gallery;
    $img_id_array = $post_prius_gallery;// reinit the $img_id_array for the Mix gallery and images
  break;

}



/* translators: used between list items, there is a space after the comma */
$separate_meta = '';

// Get Categories for posts.
//deb_e($flo_options);
//deb_e($flo_options['flo-t-g']['layout'][0]);
if(isset($flo_options['flo-t-g']['layout'][0])){
  $gallery_view_options = $flo_options['flo-t-g']['layout'][0];
}
//var_dump(flo_get_option('flo-t-g_display_categories'));


$categories_list = get_the_term_list( $post->ID, 'gallery-category', '', $separate_meta );
  

$tags_list = get_the_term_list( $post->ID, 'gallery-tag', '', $separate_meta );



//deb_e($flo_options); die();
$data = array(
    'the_real_gallery_type' => $the_real_gallery_type,
    'gallery_items' => $gallery_items,
	  'post' => $post,
	  'flo_gallery__gallery_images' => $img_id_array,
	  'categories_list' => $categories_list,
    'tags_list' => $tags_list,

);
