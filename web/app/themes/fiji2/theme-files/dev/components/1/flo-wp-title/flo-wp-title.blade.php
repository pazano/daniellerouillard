<?php
  $b__uniq = "flo-wp-title--".mt_rand(1, 999); // To be used inside HTML
  $text_color = flo_data($data, "flo-lovely2-block-wp-title__title_color");
  $is_hidden_class = strlen(trim($post->post_content)) ? "" : "flo-block--hidden";
?>
@extends("layout.block",[
  "block_classes" => $is_hidden_class
])

@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "
      .".$b__uniq." {
        color: ".$text_color.";
      }
    "
  ])
  <div class="flo-wp-title flo-post {{$b__uniq}}">
    <h1 class="flo-wp-title__title">{{ the_title() }}</h1>
  </div>
@overwrite
