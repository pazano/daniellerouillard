<?php
/**
 * Data that will be accessible on single post.
 */
$theme_framework = get_theme_framework();

$post = $theme_framework::get_post();
global $flo_options;

/* translators: used between list items, there is a space after the comma */
$separate_meta = '';
// Get Categories for posts.
//$categories_list = get_the_category_list( '' );
$categories_list = get_the_term_list( $post->ID, 'category', '', $separate_meta );

// Get Tags for posts.
$tags_list = get_the_tag_list( '', $separate_meta );


$data = array(
	'post' => $post,
	//'comments_options' => $comments_options,
	'categories_list' => $categories_list,
	'tags_list' => $tags_list
);
