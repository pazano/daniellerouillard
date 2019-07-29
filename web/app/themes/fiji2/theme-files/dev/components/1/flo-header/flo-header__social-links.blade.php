<?php
  $display_social_links = flo_data($data, "flo-lovely2-header__display-social-links");
?>

@if ($display_social_links)
  <div class="{{$b}}__social-links">
    @include('components.social-links')
  </div>
@endif
