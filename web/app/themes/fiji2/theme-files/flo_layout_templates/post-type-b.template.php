<?php

global $templates;

$templates[] = [
  "name" => "post_type_b",
  "title" => "Post Type B",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-post-type-b.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-post-type-b.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "item_title_1",
    "wp_content",
    "share_links",
    "horizontal_divider",
    "item_tags",
    "item_pagination_1",
    "footer_placeholder"
  ],
  "hide_if" => [
    "always"
  ],
  "show_if" => [
    "is-post-options"
  ]

];

?>
