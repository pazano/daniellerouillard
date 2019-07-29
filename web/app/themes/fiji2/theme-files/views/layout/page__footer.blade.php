</div>
@if($layout_type && $layout_type != 'full_width')
<div class="flo_sidebar flo-post {{ $sidebar_container_class }}">
  <?php dynamic_sidebar($sidebar) ?>
</div>
@endif
</main>
@include('components.flo-splash')

@include("components.flo-header-mobile-menu")
{{--@include('components.flo-header__menu-popup')--}}

{{ wp_footer() }}
</body>
</html>
