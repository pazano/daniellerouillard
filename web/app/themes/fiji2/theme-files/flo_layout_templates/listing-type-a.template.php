<?php

global $templates;

$templates[] = [
  "name" => "listing_type_a",
  "title" => "Listing Type A",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-a.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-a.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "listing_1",
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
