<?php
	global $wp_query, $flo_options, $the_query, $flo_archive_page;

	$flo_archive_page = true;
	$the_query = $wp_query;

	$b = "flo-listing"; // To be used inside HTML
 
	// Start: Class name automation
	  $b__for_css = ".".$b; // To be used inside CSS
	  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
	  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
	// End: Class name automation
//debe($flo_options); die();
	// init page options
	$page_options = array();


	if(is_search()){

		if(isset($flo_options['flo-lvy2-search-layout'])){
			$listing_layout = $flo_options['flo-lvy2-search-layout'];

			if(isset( $flo_options['flo-lvy2-search-options-'.$listing_layout] )){
				$page_options = $flo_options['flo-lvy2-search-options-'.$listing_layout];
			}

		}

		$options_prefix = 'flo-lvy2-search-options-';
	}else{


		if(isset($flo_options['flo-lvy2-archives-layout'])){
			$listing_layout = $flo_options['flo-lvy2-archives-layout'];

			if(isset( $flo_options['flo-lvy2-archives-options-'.$listing_layout] )){
				$page_options = $flo_options['flo-lvy2-archives-options-'.$listing_layout];
			}

		}

		$options_prefix = 'flo-lvy2-archives-options-';

	}

	if(!isset($listing_layout)) {
		$listing_layout = 'listing_5';
	}

	//$gutter = flo_data($page_options, 'page-listing-listing__gutter', 75);

	
	if(is_search()){
      $data = get_field('flo-lvy2-search-options-'.$listing_layout,'options');
    }else{
      $data = get_field('flo-lvy2-archives-options-'.$listing_layout,'options');
    }



	$title_font = get_field($options_prefix."title_font",'options');
	$date_font = get_field($options_prefix."date_font",'options');
	$excerpt_font = get_field($options_prefix."excerpt_font",'options');
	$categories_font = get_field($options_prefix."categories_font",'options');

	//$show_content = flo_data($page_options, "page-listing-listing__type_d-full-content"); // add this option later


	////



	$allowed_layouts = array('listing_1','listing_2','listing_3','listing_4','listing_5','listing_6');
	if(!in_array($listing_layout,$allowed_layouts)){
	  $listing_layout = 'listing_2';
	}

	$elements_color = flo_data($page_options, "elements_color");
	$item_background_color_on_hover = flo_data($page_options, "item_background_color_on_hover");

	$category_term = flo_get_category_term($the_query->post);


	$b = "flo-listing"; // To be used inside HTML
	// Start: Class name automation
	  $b__for_css = ".".$b; // To be used inside CSS
	  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
	  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
	// End: Class name automation


?>
{{-- START: ITEMS DATA --}}
<?php
  global $items;
?>
@include('components.flo-generic-listing-items-data')

{{-- END: ITEMS DATA --}}

{{-- @include('layout.wp__header') --}}

@extends('layout.default')

@section('content')
	@include('components.flo-header')


	<div class="flo-block  flo-wp-title flo-post">
      	<h1 class="flo-wp-title__title visible full-visible">{{ $page_title }}</h1>
  	</div> 
	@if (isset($posts) && sizeof($posts))
		<div class="{{$b}} {{$b__uniq}}"> 
		    @include('components.flo-block-'.str_replace('_','-',$listing_layout))
		</div>
	@else
		<div class="flo-section flo-section--padding-small flo-section--journal-grid-section">
		    <article class="flo-section__content center-text flo-post flo-post--not-found" style="text-align: center">
		        <h1>{{ get_field("flo-not-found-page__title", "options") }}</h1>
		        <br/>
				    <h3>
				      	@if(isset($flo_options["flo-not-found-page__description"]) )
			        		{{ $flo_options["flo-not-found-page__description"] }}
			        	@else
			        		We couldn't find the page you were looking for.
			        	@endif
				    </h3>
		        <br/>
		        <a href="{{ get_home_url() }}"> {{ get_field("flo-not-found-page__link-title", "options") }} </a>
			</article>
		</div>
	@endif

	@if($wp_query->max_num_pages > 1)
		<?php
			//debe($flo_options);
			$data = get_field('flo-lvy2-archive_pages_pagination','options');
		?>
		@include ('components.flo-block-listing-pagination', [
		    "wp_query"              => $wp_query
		  ])
	@endif


@stop
