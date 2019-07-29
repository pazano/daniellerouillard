<?php
global $slideshow_data;
$slideshow_data = Array();
$slideshow_data["slides"] = Array();
if($slides = get_field("_post_image_gallery", $slideshow_id)){
  $slideshow_data["autoplay"] = get_field("slideshow_autoplay", $slideshow_id) ? 'true': 'false';
  $slideshow_data["transition_speed"] = get_field("slideshow_transition_speed", $slideshow_id);
  $slideshow_data["autoplay_speed"] = get_field("autoplay_speed", $slideshow_id) * 1000;
  $slideshow_data["pause_on_hover"] = get_field("slideshow_pause_on_hover", $slideshow_id) ? "true" : "false";
  $slideshow_data["fade"] = get_field("slideshow_slide_effect", $slideshow_id) == "fade" ? "true" : "false";

  foreach ($slides as $slide) {
    if( isset($slide["slide_image"]['crop_position']) ){
      $crop_position = $slide["slide_image"]['crop_position'];

      // the background position is calculated using the following formula:
      // y = 1.8x - 40
      // http://www.wolframalpha.com/input/?i=interpolate+%5B(22.22,+0),(77.77,100)+%5D
      $mobile_crop_position = (1.8*$crop_position - 40).'%';

    }else{
      $mobile_crop_position = '50';
    }

    if(isset($slide['slide_info'][0]['title']) && strlen($slide['slide_info'][0]['title'])){
      $slide_title = $slide['slide_info'][0]['title'];
    }else{
      // $slide_title = '&nbsp;';
      $slide_title = '';
    }

    $slide_link = $slide["slide_info"][0]["text_url"];

    $slide_type = $slide["slide_type"];

    $video_embed_code = "";
    $video_url = "";

    switch ($slide_type) {
      case 'image':

      break;
      case 'image_and_video_embed':
      $video_embed_code = $slide["slide_video_url"];
      break;

      case 'video_slide':
      $video_url = $slide["slide_video"];
      break;

      default:
      break;
    }

    if(isset($slide["slide_image"]['title'])){
      $alt_text = $slide["slide_image"]['title'];
    }else{
      $alt_text = '';
    }

    $img = $slide["slide_image"]["url"];

    $slideshow_data["slides"][] = [
      "mobile_crop_position" => $mobile_crop_position,
      "second_pretitle" => $slide['slide_info'][0]['second_pretitle'],
      "pretitle" => $slide['slide_info'][0]['pretitle'],
      "title" => $slide_title,
      "type" => $slide_type,
      "alt" => $alt_text,
      "img" => $img,
      "elements_color" => $slide["slide_info"][0]["elements_color"],
      "background_color" => $slide["slide_info"][0]["background_color"],
      "url" => $slide_link,
      "object" => $slide,
      "video_url" => $video_url,
      "video_embed_code" => $video_embed_code,
      "display_gradient" => flo_data($slide["slide_info"][0], "display_gradient_overlay_on_hover_color", true),
      "gradient_color" => flo_data($slide["slide_info"][0], "gradient_overlay_on_hover_color", "#000000")
    ];
  }

}
?>
