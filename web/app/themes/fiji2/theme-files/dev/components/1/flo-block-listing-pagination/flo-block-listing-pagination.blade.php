<?php
$b = "flo-block-listing-pagination"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
$display_pagination_numbers = flo_data($data, "display_pagination_numbers");
$page_links_font = flo_data($data, "page_links_font");
$previous_link_label = flo_data($data, "previous_link_label");
$next_link_label = flo_data($data, "next_link_label");
$prev_and_next_links_font = flo_data($data, "prev_and_next_links_font");

$position_modifier_class = $display_pagination_numbers == false ? $b."--hidden-numbers" : "";

global $the_query; // this is usually defined in flo-listing.blade.php

if ( get_query_var('paged') ) {
  $pag_page = get_query_var('paged');
} else if ( get_query_var('page') ) {
  $pag_page = get_query_var('page');
} else {
  $pag_page = 1;
}

$big = 999999999; // need an unlikely integer
$pagination = paginate_links( array(
  'base' => str_replace( $big, '%#%', esc_url( get_pagenum_link( $big ) ) ),
  'format' => '?paged=%#%',
  'current' => max( 1, $pag_page ),
  'prev_text'          => '<span  class="'.$b.'__navigation '.$b.'__navigation--previous"><i class="{{$b}}__arrow-left flo-icon-line-arrow-left"></i>'.$previous_link_label.'</span>',
  'next_text'          => '<span class="'.$b.'__navigation '.$b.'__navigation--next">'.$next_link_label.'<i class="{{$b}}__arrow-right flo-icon-line-arrow-right"></i></span>',
  'total' => $the_query->max_num_pages,
  'type' => 'array'
) );


?>
@if( is_array($pagination) && sizeof($pagination) > 1)
  @extends('layout.block', [
    "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
    // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
  ])
  @include('core.style', [
    "breakpoint__general" => "

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__page-links",
      $page_links_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__navigation",
      $prev_and_next_links_font
      )
      ."


      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }
      
      ".$b__uniq_for_css." ".$b__for_css."__page-number:after {
        background-color: ".$elements_color.";
      }

    "
  ])
  @section('block_content')
    <div class="{{$b}} {{$b__uniq}} {{$position_modifier_class}}">
      @if(isset($pagination[0]) && strstr($pagination[0], 'prev') )
        {{$pagination[0]}}
      @else
        <div class="{{$b}}__spacer"></div>
      @endif
      @if ($display_pagination_numbers)
        <div class="{{$b}}__page-links">

          <?php foreach ($pagination as $key => $current_pagination): ?>
            <?php
              $active_class = '';
              if(strstr($current_pagination, 'current')){
                $active_class = ' flo-block-listing-pagination__page-number--active ';
              }
            ?>
            @if(!strstr($current_pagination, 'prev') && !strstr($current_pagination, 'next') )
              <span class="{{$b}}__page-number  {{$active_class}}">{{ $current_pagination }}</span>
            @endif
          <?php endforeach ?>
        </div>
      @endif
      @if(isset($pagination[sizeof($pagination) - 1]) && strstr($pagination[sizeof($pagination) - 1], 'next') )
        {{ $pagination[sizeof($pagination) - 1] }}
      @else
        <div class="{{$b}}__spacer"></div>
      @endif
    </div>
  @overwrite
@endif
