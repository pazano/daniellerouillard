<?php
$post_type = get_post_type($post->ID);

if($post_type == 'gallery'){
  $taxonomy = 'gallery-category';
}else{
  $taxonomy = 'category';
}

$related_posts__query = similar_query($post->ID, $taxonomy, 3);
if( is_object($related_posts__query) && $related_posts__query->have_posts()){


  $b = "flo-related-items"; // To be used inside HTML

  // Start: Class name automation
    $b__for_css = ".".$b; // To be used inside CSS
    $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
    $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
  // End: Class name automation

  $elements_color = flo_data($data, "elements_color");
  $title = flo_data($data, "title");
  $title_font = flo_data($data, "title_font");
  $item_title_font = flo_data($data, "item_title_font");

  ?>
  @extends('layout.block', [
    "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
    // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
  ])
  @section('block_content')
    @include('core.style', [
      "breakpoint__general" => "

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__title",
        $title_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__item-title",
        $item_title_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__title,
        ".$b__uniq_for_css." ".$b__for_css."__item-title
        {
          color: ".$elements_color."!important;
        }

        ".$b__uniq_for_css." ".$b__for_css."__title
        {
          border-color: ".flo_color("secondary-line-color").";
        }

      "
    ])
    <div class="{{$b}} {{$b__uniq}}">
      <div class="{{$b}}__title">
        {{$title}}
      </div>
      
      <div class="{{$b}}__items">
        @while($related_posts__query->have_posts())
          <?php
            $related_posts__query->the_post();
            if(has_post_thumbnail($related_posts__query->post->ID)){
              $thumb_url = get_the_post_thumbnail_url($related_posts__query->post->ID);

              $thumb_url = aq_resize( $thumb_url, $width = 550, $height = 360, $crop = true, $single = true, $upscale = false );

            }else{
              $thumb_url = get_template_directory_uri().'/theme-files/public/img/no-image.jpg';
            }
          ?>
          <a href="{{the_permalink()}}" class="{{$b}}__item">
            <span class="{{$b}}__item-image" style="background-image: url({{$thumb_url}})"></span>
            <span class="{{$b}}__item-title">
              {{the_title()}}
            </span>
          </a>
          
        <?php wp_reset_postdata(); ?>
        @endwhile
      </div>
    </div>
  @overwrite
<?php  }  // END if $related_posts__query->have_posts() ?>
