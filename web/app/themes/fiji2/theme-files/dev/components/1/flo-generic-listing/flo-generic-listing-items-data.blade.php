<?php

/* START: QUERY */
  global $the_query;


  if(isset($flo_archive_page) && $flo_archive_page){
    // if(is_search()){
    //   $data = get_field('flo-lovely2-search-options-'.$listing_layout,'options');
    // }else{
    //   $data = get_field('flo-lovely2-archives-options-'.$listing_layout,'options');
    // }

  }else{
    $listing_layout = flo_data($data, 'acf_fc_layout', 'listing_1');

  }

  $listing_layout = str_replace('_','-',$listing_layout);
  
  wp_localize_script("theme-js", 'ajax_listing_selector', 'flo-block-'.$listing_layout);
  
  $post_type = flo_data($data, "post_type","post");
  $post_type__category_taxonomy = $post_type == "gallery" ? "gallery-category" : "category";

  if(!isset($post_type)){
    $post_type = 'post';
  }

  if($post_type == "gallery"){
    $post_type__categories = flo_data($data, "gallery_categories");
  }else{
    $post_type__categories = flo_data($data, "post_categories");
  }

  if( !(is_array($post_type__categories) && sizeof($post_type__categories)) ){

    $post_type__categories = array();
  }

  $masonry_layout = flo_data($data, "masonry_layout");


  $display_featured_images = flo_data($data, "display_featured_images", true);

  $posts_per_page = flo_data($data, "items_per_page");

  $listing_item_thumb_class = 'flo-block-'.$listing_layout.'__featured-image';



  //$paged = (get_query_var('paged')) ? get_query_var('paged') : 1;
  if ( get_query_var('paged') ) {
    $paged = get_query_var('paged');
  } else if ( get_query_var('page') ) {
    $paged = get_query_var('page');
  } else {
    $paged = 1;
  }


  $the_query__args = array(
    'post_type'                   => $post_type,
    'ignore_sticky_posts'         => true,
    'paged'                       => $paged
  );

  if(isset($_GET['categ']) && strlen($_GET['categ']) ){
    // when the category filter is passed via URL
    $the_query__args['tax_query'] = array(
      array(
        'taxonomy' => $post_type__category_taxonomy,
        'field'    => 'slug',
        'terms'    => $_GET['categ'],
      )
    );

  }else if( sizeof($post_type__categories) ){
    $the_query__args['tax_query'] = array(
      array(
        'taxonomy' => $post_type__category_taxonomy,
        'field'    => 'term_id',
        'terms'    => $post_type__categories,
        'operator' => 'IN'
      )
    );
  }

  if(is_numeric($posts_per_page)){
    $the_query__args['posts_per_page'] = $posts_per_page;
  }

  if( !(isset($flo_archive_page) && $flo_archive_page) ){
    // we need to init the query only for listing block on single pages.
    // no need for it on Search and archives
    $the_query = new WP_Query( $the_query__args );
  }

  //deb_e($the_query);
  $category_term = flo_get_category_term($the_query->post);
/* END: QUERY */

/* START: ITEMS DATA */
  global $items;
  $items = array();

  $i=1;
  while ($the_query->have_posts()) {
    $the_query->the_post();

  	$post_feat_img_url = get_template_directory_uri().'/theme-files/public/img/no-image.jpg';
  	$post_feat_img = '<img src="'.get_template_directory_uri().'/theme-files/public/img/no-image.jpg'.'" class="'.$listing_item_thumb_class.'" />';
  	$has_feat_img = false;

    /* START: FEATURED IMAGE */
      //var_dump($the_query->post->ID ,has_post_thumbnail($the_query->post->ID));

      if( $display_featured_images && has_post_thumbnail($the_query->post->ID)){
        $listing_layout_with_img = array('listing-1', 'listing-2', 'listing-3', 'listing-5');

        if(in_array($listing_layout, $listing_layout_with_img)){
          $thumb_size = flo_get_listing_thumb_size( $listing_layout, $image_number = $i );

          $post_feat_img = get_the_post_thumbnail($the_query->post->ID, $size = $thumb_size, $attr = array('class' => 'flo-listing__img '.$listing_item_thumb_class));
        }

        $listing_layout_with_bg_img = array('listing-2', 'listing-3', 'listing-4', 'listing-5');
        if(in_array($listing_layout, $listing_layout_with_bg_img)){

          // there is a special case for listing-2 with masonry - we need image for this one:
          if( $listing_layout == 'listing-2'  && $masonry_layout){
            $thumb_size = flo_get_listing_thumb_size( $listing_layout, $image_number = $i );

            $post_feat_img = get_the_post_thumbnail($the_query->post->ID, $size = $thumb_size, $attr = array('class' => 'flo-listing__img '.$listing_item_thumb_class));

          }else{
            // we need the url for the layout that are using background images:
            $post_feat_img_url = flo_get_listing_thumb_url($listing_layout, $data, $the_query->post->ID);
          }

        }

        if($listing_layout == 'listing-4'){
          if($i == 1){
            // we need the large size for the first item only
            $post_feat_img_url = get_the_post_thumbnail_url($the_query->post->ID, 'large');

          }else{
            $post_feat_img_url = flo_get_listing_thumb_url($listing_layout, $data, $the_query->post->ID);
          }
        }

        $has_feat_img = true;
      }
    /* END: FEATURED IMAGE */

    /* START: POST TYPE */
      $post_type = get_post_type();

      switch ($post_type) {
        case 'post':
        $cat_term = 'category';
        break;
        case 'gallery':
        $cat_term = 'gallery-category';
        break;
        default:
        // the post types that are not supported will not have categories listed
        $cat_term = false;
        break;
      }
    /* END: POST TYPE */

    //deb_e($the_query->post);

    $items[] = array(
    	"id" => $the_query->post->ID,
      "date" => get_the_date("", $the_query->post->ID),
      "featured_image_url" => $post_feat_img_url,
      "featured_image" => $post_feat_img,
      "has_feat_img" => $has_feat_img,
      "decorative_image" => get_field("decorative-image", $the_query->post->ID),
      "post_type" => $post_type,
      "first_category" => flo_get_the_first_term( $id = $the_query->post->ID, $taxonomy = $cat_term, $before = '', $sep = '', $after = '', $linked_terms = false ), // Need Name Only
      "first_category_linked" => flo_get_the_first_term( $id = $the_query->post->ID, $taxonomy = $cat_term, $before = '', $sep = '', $after = '', $linked_terms = true ), //  Linked Cat Name
      "title" => get_the_title(),
      "url" => get_the_permalink(),
      "excerpt" => flo_get_post_excerpt($the_query->post, $ln = 200, $subfix = '...'),
      "content" => $the_query->post->post_content,
      "post_obj" => $the_query->post
    );

    wp_reset_postdata();
    $i++;
  }
/* END: ITEMS DATA */

?>
