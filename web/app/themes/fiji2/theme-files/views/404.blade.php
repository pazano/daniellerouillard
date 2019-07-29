@extends('layout.default')

@section('content')
    @include('components.flo-header')
		<div class="flo-block flo-block--not-found error-404 not-found">
		    <article class="flo-wp-content flo-section__content center-text flo-post" style="text-align: center">
	          <h1>{{ get_field("flo-not-found-page__title", "options") }}</h1>
	          <br>
			      <h3>
			      	@if(isset($flo_options["flo-not-found-page__description"]) )
		        		{{ $flo_options["flo-not-found-page__description"] }}
		        	@else
		        		{{ __("We couldn't find the page you were looking for.","flotheme") }}
		        	@endif
			      </h3>
	          <br>
	          <a href="{{ get_home_url() }}"> {{ get_field("flo-not-found-page__link-title", "options") }} </a>
			</article>
		</div>



@stop
