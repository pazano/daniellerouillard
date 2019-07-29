<head>
  <meta charset="{{ bloginfo( 'charset' ) }}" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="alternate" type="application/rss+xml" title="{{ bloginfo('name') }} RSS Feed" href="{{ bloginfo('rss2_url') }}" />
  @if ( strlen($flo_custom_favicon))
      <link rel="shortcut icon" href="{{ $flo_custom_favicon }}" />
  @else
      <link rel="shortcut icon" href="{{ CLASSY_THEME_DIR }}assets/favicon.ico" />
  @endif
  <link rel="profile" href="http://gmpg.org/xfn/11">
  @if  ( is_singular() && pings_open( get_queried_object() ) )
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  @endif

  {{ wp_head() }}
  <style media="screen">
    /* START: GENERICS */

      body {
        background-color: {{ flo_get_option("flo-lovely2-site-background-color") }};
        color: {{ flo_color("1") }};
      }

      /*.flo-post {
        color: {{ flo_color("1") }};
      }*/


      .flo-post a img, .flo-post img, .flo-post img.alignleft, .flo-post img.alignright, .flo-post img.aligncenter,
      .wp-caption-text.gallery-caption {
        margin-bottom: {{ flo_get_option('flo-fiji2-blog-post__content-distance-below-images', 10)}}px;
      }
      .wp-caption-text.gallery-caption{
        margin-top: -{{  flo_get_option('flo-fiji2-blog-post__content-distance-below-images', 10) - 5 }}px;
      }

      .flo_sidebar {
        width: {{ flo_get_sidebar_width() }};
      }

      .flo-button,
      input[type="submit"]
      {
        color: {{ flo_get_option("flo-lovely2-buttons__text-color", "#000000") }};
        border-color: {{ hex2rgba(flo_get_option("flo-lovely2-buttons__text-color", "#000000"), 0.3) }};
      }
      .flo-button:hover,
      input[type="submit"]:hover
      {
        background-color: {{ flo_get_option("flo-lovely2-buttons__background-color-on-hover", "#ffffff") }}!important;
        color: {{ flo_get_option("flo-lovely2-buttons__text-color-on-hover", "#555049") }}!important;
      }
    /* END: GENERICS */


  </style>
  @include('components.flo-generic-menu-wrap-styles')
</head>
