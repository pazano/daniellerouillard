<?php

global $templates;

$templates[] = [
  "name" => "listing_type_c",
  "title" => "Listing Type C",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-c.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-c.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "text_block_5",
    "listing_3",
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
