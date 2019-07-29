<?php

global $templates;

$templates[] = [
  "name" => "listing_type_b",
  "title" => "Listing Type B",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-b.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-b.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "category_switcher_1",
    "listing_2",
    "listing_pagination",
    "footer_placeholder"
  ],
  "hide_if" => [
    "is-gallery-options",
    "is-post-options"
  ],
  "show_if" => [
  ],
  "default_if" => "none-other-present"

];

?>
