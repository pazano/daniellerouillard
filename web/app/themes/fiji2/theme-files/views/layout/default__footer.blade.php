
</div>
@if($layout_type && $layout_type != 'full_width')
<div class="flo_sidebar flo-post {{ $sidebar_container_class }}">
  <?php dynamic_sidebar($sidebar) ?>
</div>
@endif
</main>
@yield('after-content')

@include("components.flo-header-mobile-menu")
{{-- @include('components.flo-header__menu-popup') --}}

@include('layout.footer')
{{ wp_footer() }}

</body>
</html>
