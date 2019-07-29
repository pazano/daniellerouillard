@include('layout.default__header')

  {{-- START: CHECK IF IS PASSWORD PROTECTED --}}
    @if(!post_password_required())

      {{-- START: CONTENT WITHOUT PASSWORD --}}

        {{-- START: BLOCKS --}}
          <?php

            $custom_post_type_layouts = apply_filters( 'flo_custom_post_type_layout', array() );
            // use this filter in a child theme to define which layout to use for an existing non standard custom post type.
            // the array should be in the following format:
            // array('book' => 'flo-cn-b');
            // where 'flo-cn-b' should be exact name from the  options for the current custom post:
            // https://i.imgur.com/8eByoxJ.jpg
            // https://i.imgur.com/tXYveRB.jpg

            if (!isset($layout__source)) {
              $layout__source = "current__post";
            }

            switch ($layout__source) {
              case 'current__post':
                $page_layout = get_field("layout");
              break;

              case 'custom_layout':
                $page_layout = get_field("custom_layout");
              break;

              case 'gallery':
                //$page_layout = get_field("flo-l2-g_layout", "options");
                $page_layout = flo_maybe_get_cached_layout($option_name = 'flo-l2-g_layout');
              break;

              case 'post':
                //$page_layout = get_field("flo-l2-p_layout", "options");
                $page_layout = flo_maybe_get_cached_layout($option_name = 'flo-l2-p_layout');
              break;

              default:


                if(  isset($custom_post_type_layouts[$layout__source]) ) {

                  $c_post_layout_option_name = $custom_post_type_layouts[$layout__source].'_layout';

                  $page_layout = flo_maybe_get_cached_layout($option_name = $c_post_layout_option_name);

                }

              break;

            }

          ?>

          @if(isset($page_layout) && is_array($page_layout) && sizeof($page_layout) && isset($page_layout[0]['acf_fc_layout']))

            <?php
              $section_index = 0;
            ?>

            @foreach ($page_layout as $data)

              <?php
                $section_name = $data["acf_fc_layout"];
                $section_id = $section_index;
              ?>

              @if($section_name == "header_placeholder")
                {{-- @include('components.flo-header') --}}
                @include('components.flo-block-header-placeholder')

              @elseif($section_name == "wp_title")
                @include('components.flo-wp-title')

              @elseif($section_name == "wp_content")
                @include('components.flo-wp-content')

              @elseif($section_name == "wp_content_with_pagination")
                @include('components.flo-wp-content-with-pagination')

              @elseif($section_name == "item_pagination_1")
                @include("components.flo-block-item-pagination-1")

              @elseif($section_name == "comments")

                <?php

                  $comments_options = flo_data($data,'comment_type', array('wp'));

                ?>

                <?php foreach ($comments_options as $key => $comments_type_value): ?>
                  @if($comments_type_value == 'wp')
                    @if (comments_open() || get_comments_number())
                      @include('components.flo-block-comments')
                    @endif
                  @elseif($comments_type_value == 'fb_comments' )
                    @include('components.flo-fb-comments')
                  @endif
                <?php endforeach ?>


              {{-- START: Text Blocks --}}
                @elseif($section_name == "text_block_1")
                  @include("components.flo-block-text-block-1")
                @elseif($section_name == "text_block_2")
                  @include("components.flo-block-text-block-2")
                @elseif($section_name == "text_block_3")
                  @include("components.flo-block-text-block-3")
                @elseif($section_name == "text_block_4")
                  @include("components.flo-block-text-block-4")
                @elseif($section_name == "text_block_5")
                  @include("components.flo-block-text-block-5")
                @elseif($section_name == "text_block_6")
                  @include("components.flo-block-text-block-6")
              {{-- END: Text Blocks --}}
              
              {{-- START: Press Package Block --}}
            @elseif($section_name == "press")
                  @include("components.flo-block-press")
              {{-- END: Press Package Block --}}
              
              {{-- START: Pricing Package Blocks --}}
                @elseif($section_name == "pricing_packages_block")
                  @include("components.flo-block-pricing-packages")
                @elseif($section_name == "pricing_packages_block_2")
                  @include("components.flo-block-pricing-packages-2")
              {{-- END: Pricing Package Blocks  --}}

              {{-- START: Featured Links Blocks --}}
                @elseif($section_name == "featured_link_1")
                  @include("components.flo-block-featured-link-1")
                @elseif($section_name == "featured_links")
                  @include("components.flo-block-featured-links")
              {{-- END: Featured Links Blocks  --}}

              {{-- START: Block Dividers --}}
                @elseif($section_name == "horizontal_divider")
                    @include("components.flo-block-horizontal-divider")
              {{-- END: Block Dividers --}}

              {{-- START: Image Links --}}
                @elseif($section_name == "image_links_1")
                  @include("components.flo-block-image-links-1")
                @elseif($section_name == "image_links_2")
                  @include("components.flo-block-image-links-2")
                @elseif($section_name == "image_links_3")
                  @include("components.flo-block-image-links-3")
                @elseif($section_name == "image_links_4")
                  @include("components.flo-block-image-links-4")
                @elseif($section_name == "image_links_5")
                  @include("components.flo-block-image-links-5")
              {{-- END: Image Links --}}

              {{-- START: Image Blocks --}}
                @elseif($section_name == "image_block_1")
                  @include("components.flo-block-image-block-1")
                @elseif($section_name == "image_block_2")
                  @include("components.flo-block-image-block-2")
                @elseif($section_name == "image_block_3")
                  @include("components.flo-block-image-block-3")
                @elseif($section_name == "image_block_4")
                  @include("components.flo-block-image-block-4")
              {{-- END: Image Blocks --}}

              {{-- START: Mosaic Image Links --}}
                @elseif($section_name == "mosaic_image_links_1")
                  @include("components.flo-block-mosaic-image-links-1")
              {{-- END: Mosaic Image links --}}

              {{-- START: LISTINGS --}}
                @elseif($section_name == "listing_1")
                  @include("components.flo-block-listing-1")
                @elseif($section_name == "listing_2")
                  @include("components.flo-block-listing-2")
                @elseif($section_name == "listing_3")
                  @include("components.flo-block-listing-3")
                @elseif($section_name == "listing_4")
                  @include("components.flo-block-listing-4")
                @elseif($section_name == "listing_5")
                  @include("components.flo-block-listing-5")
              {{-- END: LISTINGS --}}

              {{-- START: LISTINGS PAGINATION BLOCK and CATEGORY SWITCHER --}}
                @elseif($section_name == "listing_pagination")
                  @include("components.flo-block-listing-pagination")
                @elseif($section_name == "listing_pagination_2")
                    @include("components.flo-block-listing-pagination-2")  
                @elseif($section_name == "category_switcher_1")
                  @include("components.flo-block-category-switcher-1")
              {{-- END: LISTINGS PAGINATION BLOCK and CATEGORY SWITCHER --}}

              {{-- START: Testimonials Blocks --}}
                @elseif($section_name == "testimonials_block_1")
                  @include("components.flo-block-testimonials-1")
              {{-- END: Testimonials Blocks --}}

              {{-- START: FAQ Blocks --}}
                @elseif($section_name == "faq_block_1")
                  @include("components.flo-block-faq-block-1")
                @elseif($section_name == "faq_block_2")
                  @include("components.flo-block-faq-block-2")
              {{-- END: FAQ Blocks --}}

              {{-- START: SLIDESHOWS --}}
                @elseif($section_name == "slideshow_1")
                  @include("components.flo-block-slideshow-1")
                @elseif($section_name == "slideshow_2")
                  @include("components.flo-block-slideshow-2")
              {{-- END: SLIDESHOWS --}}

              {{-- START: Video Blocks --}}
                @elseif($section_name == "video_block_1")
                  @include("components.flo-block-video-block-1")
                @elseif($section_name == "video_block_2")
                  @include("components.flo-block-video-block-2")
              {{-- END: Video Blocks --}}

              {{-- START: Contact Blocks --}}
                @elseif($section_name == "contact_block_1")
                  @include("components.flo-block-contact-block-1")
                @elseif($section_name == "contact_block_2")
                  @include("components.flo-block-contact-block-2")
                @elseif($section_name == "contact_block_3")
                  @include("components.flo-block-contact-block-3")
              {{-- END: Contact Blocks --}}

              {{-- START: FOOTER PLACEHOLDER --}}
                @elseif($section_name == "footer_placeholder")
                  @include("components.flo-footer")
              {{-- END: FOOTER PLACEHOLDER --}}

              {{-- START: GALLERIES --}}
                @elseif($section_name == "gallery_view_1")
                  @include("components.flo-block-gallery-view-1")
                @elseif($section_name == "gallery_view_2")
                  @include("components.flo-block-gallery-view-2")
                @elseif($section_name == "gallery_view_3")
                  @include("components.flo-block-gallery-view-3")
              {{-- END: GALLERIES --}}

              {{-- START: NEWSLETTER BLOCKS --}}
                @elseif($section_name == "newsletter_block_1")
                  @include("components.flo-block-newsletter-block-1")
                @elseif($section_name == "newsletter_block_2")
                  @include("components.flo-block-newsletter-block-2")
              {{-- END: NEWSLETTER BLOCKS --}}

              {{-- START: MISC --}}
            @elseif($section_name == "numeric_details")
                  @include("components.flo-block-numeric-details")
                @elseif($section_name == "intro_block")
                  @include("components.flo-block-intro-block")
                @elseif($section_name == "intro_block_2")
                  @include("components.flo-block-intro-block-2")
                @elseif($section_name == "travel_dates")
                  @include("components.flo-block-travel-dates")
                @elseif($section_name == "related_items")
                  @include("components.flo-block-related-items")
                @elseif($section_name == "item_title_1")
                  @include("components.flo-block-item-title-1")
                @elseif($section_name == "item_title_2")
                  @include("components.flo-block-item-title-2")
                @elseif($section_name == "item_title_3")
                  @include("components.flo-block-item-title-3")
                @elseif($section_name == "item_vendors")
                  @include("components.flo-block-item-vendors")
                @elseif($section_name == "item_vendors_2")
                  @include("components.flo-block-item-vendors-2")
                @elseif($section_name == "share_links")
                  @include("components.flo-block-share-links")
                @elseif($section_name == "item_tags")
                  @if(isset($tags_list) && $tags_list)
                    @include("components.flo-block-item-tags")
                  @endif
                @elseif($section_name == "item_categories")
                  @if(isset($categories_list) && $categories_list)
                    @include("components.flo-block-item-categories")
                  @endif
              {{-- END: MISC --}}

              {{-- START: Deleted Blocks from LVY 2 --}}

                {{--

                Category switcher 1 -> now is replaced by Category Switcher 2;
                Featured Links 1 -> Now is replaced by Featured Links 2;
                Image Links 2 -> Replaced by Image Links 3, which is replaced by Image Links 4;
                Mosaic Image Links 2;
                Pricing Packages Block 1 -> Now Replaced by Pricing Packages 2;
                Testimonials 2;
                Vertical Divider;
                Item Credits;
                Slideshow 2 -> Now replaced by Slideshow 3;
                Item Title 2 -> Now Replaced by Item Title 3;

                Item Title 3 was added at boss request

                --}}

              {{-- END: Deleted Blocks from LVY 2 --}}


              @elseif($section_name == "button")
                @include("components.flo-block-button")

              @elseif($section_name == "dev_block")
                @include("components.flo-custom-block")
              @else
                <?php
                  // the custom blocks provided by the plugins
                  flo_maybe_plugin_bundle_block($section_name, $data)
                ?>

              @endif

              <?php $section_index++; ?>

            @endforeach
          @else
            @include("layout.header")
            @yield('default-content')
          @endif
        {{-- END: BLOCKS --}}

      {{-- END: CONTENT WITHOUT PASSWORD --}}

    @else

      {{-- START: CONTENT WITH PASSWORD --}}
      @include("layout.head")
        <div class="flo_page_wrap">
          <div class="flo_page">
            @include("layout.header")
            <div class="flo-block">
              <div class="flo-block__container">
                @include('components.flo-wp-title')
                  <div class="flo-wp-content section-text-content__content section-text-content__pass-protected flo-post">
                    {{ the_content() }}
                  </div>
              </div>
            </div>
            @include('layout.footer')
          </div>
        </div>
      {{-- END: CONTENT WITH PASSWORD --}}

    @endif
  {{-- END: CHECK IF IS PASSWORD PROTECTED --}}

  @yield('content')

@include('layout.page__footer')
