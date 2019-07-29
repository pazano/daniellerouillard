<?php
  $block_id = mt_rand(1, 9999);
  $block_class = 'flo-block--'.$block_id;

  /* START: IF NO DATA SET SET EMPTY DATA SO A BLOCK CAN BE USED WITH IT'S DEFAULTS */
    if (!isset($data)) {
      $data = array();
    }
  /* END: IF NO DATA SET SET EMPTY DATA SO A BLOCK CAN BE USED WITH IT'S DEFAULTS */

  /* START: BACKGROUND COLOR */
    // $block_background_color = flo_data($data, "block_background_color");
    if(isset($block_custom_background_color)) {
      $block_background_color = $block_custom_background_color;
    } else {
      $block_background_color = flo_data($data, "flo-block__custom_background_color");
    }
  /* END: BACKGROUND COLOR */

  $merge_with_header = false;
  if (
    isset($section_index) && $section_index == 0
    && flo_data($data, "flo-block__merge-with-header", false)
  ) {
      $merge_with_header = true;
  }

  $hide_block_desktop = '';
  if(isset($data['flo-blocks__hide-block-desktop']) && $data['flo-blocks__hide-block-desktop']){
    $hide_block_desktop = 'display: none;';

  }

  $margin_top_desktop = 0;
  if(isset($data['flo-block__margin-top-desktop'])){
    $margin_top_desktop = $data['flo-block__margin-top-desktop'];
  }

  $margin_bottom_desktop = 0;
  if(isset($data['flo-block__margin-bottom-desktop'])){
    $margin_bottom_desktop = $data['flo-block__margin-bottom-desktop'];
  }

  $hide_block_mobile = '';
  if(isset( $data['flo-blocks__hide-block-mobile']) && $data['flo-blocks__hide-block-mobile'] ){
    $hide_block_mobile = 'display: none;';
  }

  $margin_top_mobile = 0;
  if(isset( $data['flo-block__margin-top-phones'])){
    $margin_top_mobile = $data['flo-block__margin-top-phones'];
  }

  $margin_bottom_phones = 0;
  if(isset( $data['flo-block__margin-bottom-phones'])){
    $margin_bottom_phones = $data['flo-block__margin-bottom-phones'];
  }

  $flo_block_id = '';
  if(isset( $data['flo-block__id']) && strlen($data['flo-block__id']) ){
    $flo_block_id = 'id="'.$data['flo-block__id'].'"';
  }

  $flo_block_classes ='';
  if(isset( $data['flo-block__classes'])){
    $flo_block_classes = $data['flo-block__classes'];
  }

  $block_custom_css ='';
  if(isset( $data['flo-block__custom-css'])){
    $block_custom_css = $data['flo-block__custom-css'];
  }

  $block_custom_js ='';
  if(isset( $data['flo-block__custom-javascript'])){
    $block_custom_js = strip_tags($data['flo-block__custom-javascript']);
  }

  if (isset($data_onready) && $data_onready !== "" ) {
    $data_onready = "data-onready='".$data_onready."'";
  } else {
    $data_onready = "";
  }
?>
@include('core.style', [
  'breakpoint__general' => $block_custom_css,
  'breakpoint__medium_up' => '
    .'.$block_class.' {
      '.$hide_block_desktop .'
      margin-top: '. $margin_top_desktop/16 .'rem;
      margin-bottom: '. $margin_bottom_desktop/16 .'rem;
    }
  ',
  'breakpoint__small_only' => '
    .'.$block_class.' {
      ' .$hide_block_mobile . '
      margin-top: '. $margin_top_mobile/16 .'rem;
      margin-bottom: '. $margin_bottom_phones/16 .'rem;
    }
  '
])
@if ($block_background_color)
  @include('core.style', [
    "breakpoint__general" => "

      .".$block_class." {
        background-color: ".$block_background_color.";
      }

    "
  ])
@endif

@if(strlen($block_custom_js))
<script>{{$block_custom_js}}</script>
@endif
<div  {{$flo_block_id}} class='flo-block {{$block_classes or ""}} {{$flo_block_classes}} {{$merge_with_header ? "flo-block--merged-with-header" : "" }}  {{ $block_class }} @yield('block_classes') @section('block_classes') @overwrite ' data-id="{{ $block_id }}" {{$data_onready}}>
  @if ($merge_with_header)
    <div class="flo-block__header">
      @include('layout.header')
    </div>
  @endif
  <div class="flo-block__container">
    @yield('block_content')
    @section('block_content') @overwrite
  </div>
</div>
