<?php

global $templates;

$templates[] = [
  "name" => "post_type_a",
  "title" => "Post Type A",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-post-type-a.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-post-type-a.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "item_title_2",
    "wp_content",
    "share_links",
    "horizontal_divider",
    "comments",
    "horizontal_divider",
    "related_items",
    "footer_placeholder"
  ],
  "hide_if" => [
    "always"
  ],
  "default_if" => "is-post-options",
  "show_if" => [
    "is-post-options"
  ]

];

?>
