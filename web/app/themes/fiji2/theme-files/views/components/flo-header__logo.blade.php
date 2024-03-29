{{-- NOTE: GENERATED BY GULP !!! --}}<?php
  $logo_type = flo_data($data, "flo-lovely2-header__logo-type", "site-title");
  $logo_font = flo_font_data($data, "flo-lovely2-header__logo-font");
  $flo_header__logo_max_width = rem_calc(flo_data($data, "flo-lovely2-header__logo-max-width", 176) );
  $flo_header__logo_max_width_tablet = rem_calc(flo_data($data, "flo-lovely2-header__logo-max-width--tablet", 176) );
?>
<div class="{{$b}}__logo-wrap">
  <a href="{{ get_home_url() }}" class="{{$b}}__logo">
    @include('core.style', [
      "breakpoint__general" => "
        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__logo",
        $logo_font
        )
        ."
      ",

      "breakpoint__large_up" => "
        ".$b__uniq_for_css." ".$b__for_css."__logo {
          max-width: ".$flo_header__logo_max_width.";
        }

      ",

      "breakpoint__medium_only" => "
      ".$b__uniq_for_css." ".$b__for_css."__logo {
        max-width: ".$flo_header__logo_max_width_tablet.";
      }
      "
    ])
    @if($logo_type == "image")
    	<?php

    		$main_logo_url = '';
            $main_logo_url = flo_data($data, 'flo-lovely2-header__logo-image', '');

    		if(isset($data['flo-lovely2-header__logo-image--sticky']) && strlen(trim($data['flo-lovely2-header__logo-image--sticky']))){
    			$sticky_logo_url = flo_data($data, 'flo-lovely2-header__logo-image--sticky');
    		}else{
    			$sticky_logo_url = $main_logo_url;
    		}

    		if(isset($data['flo-lovely2-header__logo-image--light']) && strlen(trim($data['flo-lovely2-header__logo-image--light']))){
    			$light_logo_url = flo_data($data, 'flo-lovely2-header__logo-image--light');
    		}else{
    			$light_logo_url = $main_logo_url;
    		}
    	?>
      <img class="flo-header__logo-image flo-header__logo-image--default" src="{{ $main_logo_url }}" alt="{{ get_bloginfo( 'name' ) }}" />
      <img class="flo-header__logo-image flo-header__logo-image--sticky" src="{{ $sticky_logo_url }}" alt="{{ get_bloginfo( 'name' ) }}" />
      <img class="flo-header__logo-image flo-header__logo-image--light" src="{{ $light_logo_url }}" alt="{{ get_bloginfo( 'name' ) }}" />
    @elseif($logo_type == "text")
      {{ flo_data($data, "flo-lovely2-header__logo-text", "") }}
    @elseif($logo_type == "site-title" || !$logo_type)
      {{ get_bloginfo( 'name' ); }}
    @endif
  </a>
</div>
