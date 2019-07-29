<?php
  $b = "flo-text-content";
	$b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  if(isset($section_data)){
    $content_width = flo_data($section_data,'flo-lovely2-block-wp-content__width', '80');
  }else{
    $content_width = '80';
  }

	$content_width_css = $content_width.'%;';
?>

@extends("layout.block")
@section('block_content')
	@include('core.style', [
    "breakpoint__medium_up" => "

      .".$b__uniq."{max-width: ".$content_width_css."}

    "
  ])
  	<article class="{{$b}} flo-post {{$b__uniq}} flo-post-wrap">
      {{ flo_data($section_data, "content", "") }}
  	</article>
@overwrite
