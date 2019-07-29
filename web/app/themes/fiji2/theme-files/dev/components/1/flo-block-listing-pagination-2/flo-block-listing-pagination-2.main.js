window.flo_block_listing_pagination_2 = function(el){
  "use strict";
  var $el = $(el);
  var b = "flo-block-listing-pagination-2";
  var dotb = "." + b;
  var $button = $el.find(dotb + '__button');
  var listing_selector, $listing, grid_sizer, $grid_sizer;
  
  if(typeof(ajax_listing_selector) && ajax_listing_selector.length) {
    listing_selector = '.' + ajax_listing_selector;
    $listing = $(listing_selector);
    if(ajax_listing_selector == "flo-block-listing-5") {
      $grid_sizer = $listing;
    } else {
      $grid_sizer = $listing.find(listing_selector + '__grid-sizer');
    }    
  }
  
  $button.on('click', function(){
    $button.text($button.data('loading-text'));
    let scrollTop = $(window).scrollTop();
    let nextPageUrl = $(this).attr("data-next-href");
    
    fetch(nextPageUrl).then((response) => {
      response.text().then((data) => {
        let $new_page = $(data);
        let $new_listing = $new_page.find(listing_selector);
        let $new_data_next_href = $new_page.find(dotb + "__button").attr("data-next-href");
        let next_page_items;
        
        next_page_items = $($new_listing.find(listing_selector + '__item'));
        next_page_items.css('opacity', 0);
        
        function reinit_masonry() {
          if($grid_sizer.length && $(window).width() > 767) {
            let tempHeight = $listing.height();
            $listing.css('min-height', tempHeight);
            $listing.masonry("destroy");
            $listing.masonry();
            $listing.css('min-height', '');
          }
          $listing.find(next_page_items).animate({
              opacity: 1
          }, 350);
        }
        
        $listing.append(next_page_items);
        
        // setTimeout(function () {
        //   $(window).trigger("resize");
        //   reinit_masonry();
        // }, 50);
        
        $listing.imagesLoaded(function() {
          $(window).trigger("resize");
          reinit_masonry();
        });
        
        if ($new_data_next_href) {
          $button.attr("data-next-href", $new_data_next_href);
          setTimeout(function () {
            $button.text($button.data('default-text'));
          }, 50);
        } else {
          $button.parents('.flo-block').fadeOut();
        }
        
      });
    });
    // .catch(err => {
    //   console.error("Error:", err.message);
    //   $button.parents('.flo-block').remove();
    // });
    
  });
  
}