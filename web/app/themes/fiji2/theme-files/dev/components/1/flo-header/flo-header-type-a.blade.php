<?php
  $display_social_links = flo_data($data, "flo-lovely2-header__display-social-links");
  $social_links_font = flo_data($data, "flo-lovely2-header__social-links-font");
?>
@include('core.style', [
  "breakpoint__general" => "

    ".
    flo_render_typography_styles(
    $b__uniq_for_css." ".$b__for_css."__social-links a",
    $social_links_font
    )
    ."

  "
])

<div class="{{$b}} {{$b__uniq}} {{$b}}--type-a">
  @include('components.flo-header__logo')

  @include('components.flo-header__menu')

  @if ($display_social_links)
    <div class="{{$b}}__social-links">
      @foreach($flo_social_links as $key => $social_profile)
      	@if($social_profile['type']['value'] == 'custom')
      		<?php
      			if(isset($social_profile['custom-icon--hover']) && strlen($social_profile['custom-icon--hover']) ){
      				$data_img_hover = 'data-icon_hover="'.$social_profile['custom-icon--hover'].'"';
      			}else{
      				$data_img_hover = '';
      			}
      		?>
      		<a href="{{$social_profile['link']}}" target="_blank" class="flo-icon flo-icon__{{$social_profile['type']['value']}}  flo-social-links--link-custom ">
      			@if(isset($social_profile['custom-icon']) && strlen($social_profile['custom-icon']) )
      				<img src="{{$social_profile['custom-icon']}}" class="flo-footer__social-custom-icon" {{$data_img_hover}} />
      			@endif
      		</a>
      	@else
          	<a href="{{$social_profile['link']}}" target="_blank" class="flo-icon flo-icon- flo-social-links__link ">
              {{$social_profile['type']['label']}}
            </a>
          @endif

      @endforeach

    </div>
  @endif

</div>
