{{--@foreach($social_links as $link)--}}

	{{--@if($link['type']['value'] == 'custom')--}}
		{{--<a href="{{ $link["link"] }}" target="_blank" class="flo-social-block__link">--}}
			{{--{{ $link["custom-label"] }}--}}
		{{--</a>--}}
	{{--@else--}}
		{{--<a href="{{ $link["link"] }}" target="_blank" class="flo-social-block__link">--}}
			{{--{{ $link["type"]["label"] }}--}}
		{{--</a>--}}
	{{--@endif--}}

{{--@endforeach--}}

@include("core.social-links-global")
