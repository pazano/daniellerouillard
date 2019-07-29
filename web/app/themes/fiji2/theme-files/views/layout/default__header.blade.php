<!DOCTYPE html>
<?php
  $site_width_class = flo_get_option("flo-lovely2-site_width", "responsive");
  if($site_width_class == 'fixed'){
    $site_width_class = 'html--style-fixed';
    $site_width_px = flo_get_option("flo-lovely2-maximum_content_width", 990);
  } else {
    $site_width_class = '';
  } ?>
<html <?php language_attributes(); ?> class="{{$site_width_class}}">
  @include('layout.head')
  <?php $social_links_type_class = "flo-social-links-type-".flo_get_option("flo-lovely2-social-links-style", "a"); ?>
  <body {{ body_class($body_sidebar_class." ".$social_links_type_class) }}>

    @section("header")
      {{-- @include("layout.header") --}}
    @stop
    @yield("header")

    @include('components.flo-header-mobile')
    <?php if (flo_get_option("flo-lovely2-site_width", "responsive") == 'fixed'){ ?>
      @include('core.style', [
        "breakpoint__large_up" => "
          .html--style-fixed .flo-block:not(.flo-block--full-width),
          .html--style-fixed .flo-footer > * {
            padding-left: calc((100vw - ". number_format(($site_width_px / number_format($site_width_px / 61.875, 2)), 2) ."rem) / 2);
            padding-right: calc((100vw - ". number_format(($site_width_px / number_format($site_width_px / 61.875, 2)), 2) ."rem) / 2);
          }
          html.html--style-fixed {
            font-size: ". number_format($site_width_px / 61.875, 2) ."px;
          }
          html.html--style-fixed .flo-block-intro-block .flo-block-intro-block__title-area{
            margin-left: calc((100vw - ". number_format(($site_width_px / number_format($site_width_px / 61.875, 2)), 2) ."rem) / 2);
          }
        ",
        "breakpoint__medium_up" => "

          html.html--style-fixed .flo-block-item-title-3-block .flo-block-item-title-3--featured-image-position-bg .flo-block-item-title-3__text-area-wrap {
            padding-left: calc((100vw - ". number_format(($site_width_px / number_format($site_width_px / 61.875, 2)), 2) ."rem) / 2);
            padding-right: calc((100vw - ". number_format(($site_width_px / number_format($site_width_px / 61.875, 2)), 2) ."rem) / 2);
          }

        "
      ])
    <?php } ?>

    <main class="flo_page_wrap {{ $flo_page_wrap__padding_top or "" }}">
      <div class="flo_page">
        {{-- @include("components.flo-header") --}}
