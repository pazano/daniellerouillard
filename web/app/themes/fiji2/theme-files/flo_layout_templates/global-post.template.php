<?php

/**
 *  Template used for inheriting the global post and gallery layout within post and gallery editors
 *  IMPORTANT: Replace 'flo-p2-p' and 'flo-p2-g' with the field names for the layout options (usually from 5. Posts and 6. Galleries fields)
 *  Block adding is handled in acf-flo-template-selector.js (see POST AND GALLERY GLOBAL TEMPLATE INHERITING)
 */

global $templates;
$global_template_blocks = [];
$screen = get_current_screen();

if($screen->post_type == 'post'){
  $post_layout = get_field("flo-l2-p_layout", "options");
}else if($screen->post_type == 'gallery') {
  $post_layout = get_field("flo-l2-g_layout", "options");
}else {
  /* For any other custom post type */

  $custom_post_type_layouts = apply_filters( 'flo_custom_post_type_layout', array() );
  // use this filter in a child theme to define which layout to use for an existing non standard custom post type.
  // the array should be in the following format:
  // array('book' => 'flo-cn-b');
  // where 'flo-cn-b' should be exact name from the  options for the current custom post: 
  // https://i.imgur.com/8eByoxJ.jpg
  // https://i.imgur.com/tXYveRB.jpg

  if(  isset($custom_post_type_layouts[$screen->post_type]) ) {

    $c_post_layout_option_name = $custom_post_type_layouts[$screen->post_type].'_layout'; 

    $post_layout = get_field($c_post_layout_option_name, "options");
  }


}

if (isset($post_layout)) {
  foreach($post_layout as $key => $item){
    array_push($global_template_blocks, $item['acf_fc_layout']);
  }
  $global_template_blocks = array_values($global_template_blocks);
} else {
  $global_template_blocks = false;
}

$templates[] = [
  "name" => "post-global-layout",
  "title" => "",
  "thumb_url" => "",
  "preview_url" => "",
  "blocks" => $global_template_blocks,
  "hide_if" => [
    "always"
  ],
  "default_if" => "is-post-editor"
];

?>
