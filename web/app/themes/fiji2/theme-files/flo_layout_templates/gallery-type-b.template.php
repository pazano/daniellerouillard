<?php

global $templates;

$templates[] = [
  "name" => "gallery_type_b",
  "title" => "Gallery Type B",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-gallery-type-b.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-gallery-type-b.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "item_title_2",
    "gallery_view_2",
    "wp_content",
    "share_links",
    "item_pagination_1",
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
