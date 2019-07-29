<!DOCTYPE html>
<html <?php language_attributes(); ?> class="layout-default">
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
