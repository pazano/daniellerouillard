<?php

global $templates;

$templates[] = [
  "name" => "gallery_type_c",
  "title" => "Gallery Type C",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-gallery-type-c.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-gallery-type-c.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "gallery_view_3",
    "share_links",
    "horizontal_divider",
    "related_items",
    "footer_placeholder"
  ],
  "hide_if" => [
    "always"
  ],
  "show_if" => [
    "is-gallery-options"
  ]

];

?>
