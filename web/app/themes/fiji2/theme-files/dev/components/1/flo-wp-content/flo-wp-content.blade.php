
  <?php
  	$b__uniq = "flo-wp-content--".mt_rand(1, 999); // To be used inside HTML
    if(isset($data)){
      $content_width = flo_data($data,'flo-lovely2-block-wp-content__width', '80');
    }else{
      $content_width = '80';
    }
    $text_color = flo_data($data, "flo-lovely2-block-wp-content__text_color");
    $is_hidden_class = strlen(trim($post->post_content)) ? "" : "flo-block--hidden";

  	$content_width_css = $content_width.'%;';
  ?>

  @extends("layout.block", [
    "block_classes" => $is_hidden_class
  ])
  @section('block_content')
    @if(strlen(trim($post->post_content)))
    	@include('core.style', [
        "breakpoint__general" => "

          .".$b__uniq." {
            color: ".$text_color.";
          }
        ",

        "breakpoint__medium_up" => "

          .".$b__uniq."{max-width: ".$content_width_css."}

        "
      ])
    	<article class="flo-wp-content flo-post {{$b__uniq}} flo-post-wrap ">
      	<?php while ( have_posts() ) : the_post();
          $content = apply_filters( 'the_content', the_content() ); ?>
  	      {{ $content }}
  	    <?php endwhile; ?>
    	</article>
    @endif
  @overwrite
