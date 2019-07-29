@foreach($flo_social_links as $key => $social_profile)
	@if($social_profile['type']['value'] == 'custom')
		<a href="{{$social_profile['link']}}" target="_blank" class="  flo-social-links--link-custom flo-social-links__link-label ">{{$social_profile['custom-label']}}</a>
	@else
    	<a href="{{$social_profile['link']}}" target="_blank" class="flo-social-links__link-label flo-social-links-type-b__link">{{$social_profile['type']['label']}}</a>
    @endif

@endforeach
