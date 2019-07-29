<?php

global $templates;

$templates[] = [
  "name" => "listing_type_d",
  "title" => "Listing Type D",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-d.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-listing-type-d.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "category_switcher_1",
    "listing_4",
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
