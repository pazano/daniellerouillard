<?php

global $templates;

$templates[] = [
  "name" => "about_type_b",
  "title" => "About Type B",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-about-type-b.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-about-type-b.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "image_block_1",
    "horizontal_divider",
    "travel_dates",
    "featured_links",
    "mosaic_image_links_1",
    "testimonials_block_1",
    "footer_placeholder"
  ],
  "hide_if" => [
    "is-gallery-options",
    "is-post-options"
  ],
  "show_if" => [

  ]

];

?>
