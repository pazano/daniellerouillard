<?php
$b = "flo-block-listing-pagination-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

/* START: BLOCK VARS */
  $post_type = flo_data($data, "post_type");
  $posts_per_page = flo_data($data, "posts_per_page");
  $button_text = flo_data($data, "button_text", "LOAD MORE");
  $loading_text = flo_data($data, "loading_text", "LOADING");
  $text_color = flo_data($data, "text_color");
  $button_font = flo_data($data, "button_font");
  $background_color = flo_data($data, "background_color");
  $hover_text_color = flo_data($data, "hover_text_color");
  $hover_background_color = flo_data($data, "hover_background_color");
/* END: BLOCK VARS */

global $the_query; // this is usually defined in flo-listing.blade.php

if ( get_query_var('paged') ) {
  $pag_page = get_query_var('paged');
} else if ( get_query_var('page') ) {
  $pag_page = get_query_var('page');
} else {
  $pag_page = 1;
}

$big = 999999999; // need an unlikely integer
$pagination = paginate_links(
  [
    'base'       => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
    'format'     => '?paged=%#%',
    'current'    => max( 1, $pag_page ),
    'prev_next'  => true,
    'prev_text'  => '<i class="'.$b.'__arrow-prev flo-icon-line-arrow-left"></i>',
    'next_text'  => '<i class="'.$b.'__arrow-next flo-icon-line-arrow-right"></i>',
    'total'      => $the_query->max_num_pages,
    'type'       => 'array'
  ] 
);

?>
@if(sizeof($pagination) > 1)
  @extends('layout.block', [
    "block_classes" => "flo-block--half-vertical-padding", // Will be added to main block div. e.g. flo-block--full-width
    "data_onready" => "flo_block_listing_pagination_2" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
  ])
  @section('block_content')
    
    @include('core.style', [
      "breakpoint__general" => 
        flo_render_typography_styles(
        $b__uniq_for_css,
        $button_font
        )
    ])
    
    <div class="{{$b}} {{$b__uniq}}">
      @if(strlen($button_text) && $the_query->max_num_pages > 1)
        <div class="{{$b}}__button-wrap" style="
          --text-color: {{$text_color}}; 
          --background-color: {{$background_color}}; 
          --hover-text-color: {{$hover_text_color}}; 
          --hover-background-color: {{$hover_background_color}};
        ">
          <?php
            $data_next_href = "";
            if (strstr($pagination[count($pagination) - 1], 'next')) {
              preg_match_all('/<a[^>]+href=([\'"])(?<href>.+?)\1[^>]*>/i', $pagination[count($pagination) - 1], $result);
              if (!empty($result)) {
                $data_next_href = $result['href'][0];
              }
            }
          ?>
          @if ($data_next_href)
            <div class="{{$b}}__button" data-next-href="{{$data_next_href}}" data-default-text="{{$button_text}}" data-loading-text="{{$loading_text}}">
              {{$button_text}}
            </div>
          @endif
        </div>
      @endif
    </div>
  @overwrite
@endif
