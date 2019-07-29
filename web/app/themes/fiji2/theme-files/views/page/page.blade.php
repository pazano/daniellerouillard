@extends('layout.page', [
  "layout__source" => "current__post"
])

@section('default-content')
	@include('components.flo-wp-title')
  	@include('components.flo-wp-content')
  	@include('layout.footer')
@stop
