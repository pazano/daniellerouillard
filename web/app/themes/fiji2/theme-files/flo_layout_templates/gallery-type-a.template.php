<?php

global $templates;

$templates[] = [
  "name" => "gallery_type_a",
  "title" => "Gallery Type A",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-gallery-1.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-gallery-1.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "gallery_view_1",
    "wp_content",
    "share_links",
    "horizontal_divider",
    "related_items",
    "footer_placeholder"
  ],
  "hide_if" => [
    "always"
  ],
  "default_if" => "is-gallery-options",
  "show_if" => [
    "is-gallery-options"
  ]

];

?>
