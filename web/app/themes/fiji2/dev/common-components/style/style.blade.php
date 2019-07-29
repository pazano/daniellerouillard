<?php

// global $flo_head__styles;
// $flo_head__styles .= $css;
// add_action( 'flo_head__styles', 'flo_head__styles', 10);

/* START: Add Block Title to it's Stylesheet */
  if(isset($style_name) && strlen($style_name) > 0) {
    $rel_tag = 'data-title="'.$style_name.'"';
  } else {
    $rel_tag = '';
  }
/* END: Add Block Title to it's Stylesheet */

// var_dump($maybe_rel);
?>

<script type="text/template" class='flo-core-style'>

  <style media="screen" {{$rel_tag}}>
    @if ( isset($breakpoint__general) &&  $breakpoint__general)
      {{ $breakpoint__general }}
    @endif

    /* START: SMALL ONLY */
      @media (max-width: 767px) {
        @if ( isset($breakpoint__small_only) && $breakpoint__small_only)
          {{ $breakpoint__small_only }}
        @endif
      }
    /* END: SMALL ONLY */

    /* START: MEDIUM ONLY */
      @media (min-width: 768px) and (max-width: 1024px) {
        @if ( isset($breakpoint__medium_only) && $breakpoint__medium_only)
          {{ $breakpoint__medium_only }}
        @endif
      }
    /* END: MEDIUM ONLY */

    /* START: MEDIUM UP*/
      @media (min-width: 768px) {
        @if ( isset($breakpoint__medium_up) && $breakpoint__medium_up)
          {{ $breakpoint__medium_up }}
        @endif
      }
    /* END: MEDIUM UP*/

    /* START: LARGE UP*/
      @media (min-width: 1025px) {
        @if ( isset($breakpoint__large_up) && $breakpoint__large_up)
          {{ $breakpoint__large_up }}
        @endif
      }
    /* END: LARGE UP*/
  </style>

</script>
