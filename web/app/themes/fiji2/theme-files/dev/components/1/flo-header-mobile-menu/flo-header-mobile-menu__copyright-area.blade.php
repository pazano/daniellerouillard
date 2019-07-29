<?php
  $text_above_copyright_notice = flo_get_option("flo-lovely2-header-mobile-popup__text-above-copyright-notice", false);
  $use_custom_copyright_notice = flo_get_option("flo-lovely2-header-mobile-popup__use-custom-copyright-notice", false);
  $custom_copyright_notice = flo_get_option("flo-lovely2-header-mobile-popup__custom-copyright-notice", false);
?>
<div class="{{$b}}__copyright-area">
  <div class="{{$b}}__text-above-copyright-notice">
    {{$text_above_copyright_notice}}
  </div>
  <div class="{{$b}}__copyright-notice">
    @if ($use_custom_copyright_notice)
      {{flo_get_copyright_year($custom_copyright_notice)}}
    @else
      {{flo_get_copyright_year(flo_get_option("flo-lovely2-footer-cp__cn"))}}
    @endif
  </div>
  <div class="{{$b}}__copyright-flo-logo">
    {{ do_action("flo_footer_credits"); }}
  </div>
</div>
