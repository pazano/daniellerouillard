<?php
	$hero_slider_enable = get_field("flo-custom-header__slideshow-display");
	$header_slider_id = get_field("flo-slideshow__slideshow");

	ob_start();
	ob_clean();
	dynamic_sidebar('header-translation');
	$lang_switcher_sidebar = ob_get_clean();
?>

@include("components.flo-header")

@include("components.flo-header-mobile-menu")

{{-- @include('components.flo-header__menu-popup') --}}

<?php
	ob_start();
	ob_clean();
	dynamic_sidebar('top-sidebar');
	$top_sidebar = ob_get_clean();

	if($top_sidebar){
?>
		<div class="flo-header-sidebars flo-section flo-post flo-section--padding-small">
			        	{{$top_sidebar}}
		</div>
<?php
	}
?>
