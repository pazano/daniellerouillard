<?php

global $templates;

$templates[] = [
  "name" => "listing_type_e",
  "title" => "Listing Type E",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-e.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-e.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "text_block_6",
    "listing_5",
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
