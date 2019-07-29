<?php
global $images;

// needs to be reset for cases when multiple gallery views are used on a single gallery
$images = array();
$counter = 0;
foreach ($gallery_items as $item) {

  $slide = $item;
  $video_code = false;
  $img_url_large = '';
  $img_url_original = '';

  switch ($the_real_gallery_type) {
    case 'image':
    //$img_url = wp_get_attachment_url($slide, 'full');

    if(is_array($slide) && isset($slide['url'])){
      if(isset($slide['sizes']['medium_large'])){
        $img_url = $slide['sizes']['medium_large'];
      }else{
        $img_url = $slide['url'];  
      }

      $img_url_original = $slide['url'];  
      

      // for the Gal View 2 we will use the large image size
      if(isset($slide['sizes']['large'])){
        $img_url_large = $slide['sizes']['large'];
      }

    }else{
      // compatibility with the galleries created before ACF
      $img_url = wp_get_attachment_url($slide, 'full');
      $img_url_original = wp_get_attachment_url($slide, 'full');
    }
    $slide = $item;
    break;

    case 'video':
      $slide = $item["image"];
      $img_url = $slide;
      $img_url_original = $slide;
      $video_code = $item["video_embed_code"];
    break;

    case 'prius':
      // $slide = $item["image"];
      // $img_url = $slide;
      // $video_code = $item["video_embed_code"];

      $img_url = $item["image"]['url'];
      $img_url_original = $item["image"]['url'];
      $video_code = $item["video_embed_code"];
      $alt_text = $item["image"]['alt'];
      $slide['height'] = $item["image"]["height"];
      $slide['width'] = $item["image"]["width"];
    break;
  }


  if($img_url_large == ''){
    $img_url_large = $img_url_original;
  }

  if(isset($slide['alt'])){
    $alt_text = $slide['alt'];
  }else{
    $alt_text = '';
  }

  $srcset= '';
  if(isset($slide['ID'])){
    $srcset = wp_get_attachment_image_srcset($slide['ID']);
  }

  // $height = $slideshow__height;
  $height = 600;

  $images[] = [
    "slide" => $slide,
    "video_code" => $video_code,
    "url" => $img_url,
    "full_img" => $img_url_original,
    "img_url_large" => $img_url_large,
    "srcset" => $srcset,
    "alt" => $alt_text,
    "height_px" => $height."px",
    "height_rem" => $height / 16 . "rem"
  ];

  $counter ++;

}
?>
