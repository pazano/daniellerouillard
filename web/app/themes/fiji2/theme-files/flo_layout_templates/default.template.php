<?php

global $templates;

$templates[] = [
  "name" => "defaul",
  "title" => "Default",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-default.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-default.preview.jpg",
  "blocks" => [
    "header_placeholder",
    "wp_title",
    "wp_content",
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
