<!DOCTYPE html>
<?php
  $site_width_class = flo_get_option("flo-lovely2-site_width", "responsive");
  if($site_width_class == 'fixed'){
    $site_width_class = 'html--style-fixed';
    $site_width_px = flo_get_option("flo-lovely2-maximum_content_width", 990);
  } else {
    $site_width_class = '';
  } 
?>
<html <?php language_attributes(); ?> class="{{$site_width_class}} layout-default">
  @include('layout.head')
  <body {{ body_class($body_sidebar_class) }}>

    {{-- @yield("header") --}}
    {{-- @section("header") --}}
    {{--@yield("header_vars")--}}
    {{--@if (!isset($hide_header) || isset($hide_header) && $hide_header != 1)--}}
      {{--@include("layout.header")--}}
    {{--@endif--}}
    {{-- @show --}}
    @yield('before-content')

    @include('components.flo-header-mobile')
    <main class="flo_page_wrap {{ $flo_page_wrap__padding_top or "" }}">
      <div class="flo_page">
      	@include("components.flo-header")
