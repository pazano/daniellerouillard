<?php
  $use_custom_layout = get_field("use_custom_layout");
  $layout_source = $use_custom_layout ? "custom_layout" : "post";
?>
@extends('layout.page', [
  "layout__source" => $layout_source
])

@section('default-content')

	@include('components.flo-wp-title')
  	@include('components.flo-wp-content')
  	@include('layout.footer')
@stop
