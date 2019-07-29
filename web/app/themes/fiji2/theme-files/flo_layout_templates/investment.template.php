<?php

global $templates;

$templates[] = [
  "name" => "investment",
  "title" => "Investment",
  "thumb_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-investment.thumb.jpg",
  "preview_url" => "https://s3-us-west-2.amazonaws.com/flothemes-dashboard-images/fiji2/template-investment.preview.jpg",
  "blocks" => [
    "intro_block",
    "pricing_packages_block",
    "faq_block_2",
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
