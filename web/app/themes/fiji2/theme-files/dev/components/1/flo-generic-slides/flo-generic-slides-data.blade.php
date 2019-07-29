<?php

if (!function_exists("flo_get_slideshow_data")) {
  function flo_get_slideshow_data($slideshow_id) {
    if ($slides = get_field("_post_image_gallery", $slideshow_id)){
      $slideshow_data = Array();
      $slideshow_data["slides"] = Array();

      /* START: SLIDESHOW DATA */
        $slideshow_data["autoplay"] = get_field("slideshow_autoplay", $slideshow_id) ? 'true': 'false';
        $slideshow_data["transition_speed"] = get_field("slideshow_transition_speed", $slideshow_id);
        $slideshow_data["autoplay_speed"] = get_field("autoplay_speed", $slideshow_id) * 1000;
        $slideshow_data["pause_on_hover"] = get_field("slideshow_pause_on_hover", $slideshow_id) ? "true" : "false";
        $slideshow_data["fade"] = get_field("slideshow_slide_effect", $slideshow_id) == "fade" ? "true" : "false";
      /* END: SLIDESHOW DATA */

      /* START: SLIDES DATA */
        foreach ($slides as $slide) {

          /* START: MOBILE CROP POSITION */
            if( isset($slide["slide_image"]['crop_position']) ){
              $crop_position = $slide["slide_image"]['crop_position'];

              // the background position is calculated using the following formula:
              // y = 1.8x - 40
              // http://www.wolframalpha.com/input/?i=interpolate+%5B(22.22,+0),(77.77,100)+%5D
              $mobile_crop_position = (1.8*$crop_position - 40).'%';
            }else{
              $mobile_crop_position = '50%';
            }
          /* END: MOBILE CROP POSITION */

          /* START: VIDEO FUNCTIONALITY */
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
          /* END: VIDEO FUNCTIONALITY */

          /* START: ALT TEXT */
            if(isset($slide["slide_image"]['title'])){
              $alt_text = $slide["slide_image"]['title'];
            }else{
              $alt_text = '';
            }
          /* END: ALT TEXT */

          /* START: ADD SLIDE DATA TO SLIDESHOW DATA */
            $slideshow_data["slides"][] = [
              "object" => $slide,
              "elements_color" => $slide["slide_info"][0]["elements_color"],
              "type" => $slide_type,

              "img" => $slide["slide_image"]["url"],
              "image_srcset" => wp_get_attachment_image_srcset( $slide["slide_image"]["id"], 'full' ),
              "alt" => $alt_text,
              "mobile_crop_position" => $mobile_crop_position,

              "video_url" => $video_url,
              "video_embed_code" => $video_embed_code,

              "title" => $slide['slide_info'][0]['title'],
              "text" => $slide['slide_info'][0]['text'],
              "bottom_label" => $slide['slide_info'][0]['bottom_label'],
              "overlay_color" => $slide['slide_info'][0]['image_overlay_color'],
              "overlay_opacity" => $slide['slide_info'][0]['image_overlay_opacity']
            ];
          /* END: ADD SLIDE DATA TO SLIDESHOW DATA */

        }
      /* END: SLIDES DATA */

    }

    if (isset($slideshow_data)) {
      return $slideshow_data;
    } else {
      return;
    }
  }
}

?>
