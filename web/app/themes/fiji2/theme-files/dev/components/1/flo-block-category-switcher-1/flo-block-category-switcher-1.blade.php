<?php
$b = "flo-block-category-switcher-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");
// A. Image
$image = flo_data($data, "image");
$image_height = flo_data($data, "image_height");
$image_height_rem = $image_height / 16 . "rem";
// B. title
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
// C. Links
$links_elements_color = flo_data($data, "links_elements_color");
$background_color = flo_data($data, "background_color");
$links_title = flo_data($data, "links_title");
$links_title_font = flo_data($data, "links_title_font");
$links_type = flo_data($data, "links_type");
//$custom_links_list = flo_data($data, "custom_links_list");
$specific_post_categories = flo_data($data, "specific_post_categories");
$specific_gallery_categories = flo_data($data, "specific_gallery_categories");
$categories_font = flo_data($data, "categories_font");

$image_exists_class = $image ? $b."__categories-wrap--with-image" : $b."__categories-wrap--no-image";
$categories_list = flo_render_categories_list($data, $link_class = '');
//debe($categories_list);

$list_layout_type = flo_data($data, "mobile_switcher_layout");
$list_layout_class = $b . '__layout--' . $list_layout_type;
if($list_layout_type == 'dropdown') {
  $icon_class = 'flo-icon-down-dir';
} else {
  $icon_class = '';
}
$hide_mobile_image_class = flo_data($data, "hide_mobile_image") == true ? $b . '__image-hidden-mobile' : '';
$mobile_title_color = flo_data($data, "mobile_title_color");
$mobile_image_height = flo_data($data, "mobile_image_height");

// Background Image Optimization
$attachment_id = $image['ID'];

$img_sizes = array(
 'small' => array('width' => 9999, 'height' => $mobile_image_height * 3),  // mobile size
 'medium' => array('width' => 9999, 'height' => $image_height * 2), // tablet size
 'large' => array('width' => 9999, 'height' => $image_height * 3),
);

$img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

?>
  @extends('layout.block', [
    "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
    "data_onready" => "flo_mobile_category_switcher" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
  ])
  @include('core.style', [
    "breakpoint__general" => "
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__links-title",
      $links_title_font
      )
      ."
      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__category",
      $categories_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
        color: ".$elements_color.";
        height: ".$image_height_rem.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__links-divider {
        background-color: ".$links_elements_color.";
      }
      ".$b__uniq_for_css." ".$b__for_css."__categories-wrap {
        color: ".$links_elements_color.";
        background-color: ".$background_color.";
      }

    ",
    "breakpoint__small_only" => "
      ".$b__uniq_for_css." ".$b__for_css."__image-wrap {
        height: ".$mobile_image_height."px;
      }
    "
  ])
  @section('block_content')
    <div class="{{$b}} {{$b__uniq}} {{$hide_mobile_image_class}}">

      @if ($image)
        <div class="{{$b}}__image-wrap" style="{{$img_vars}}" aria-label="{{$image['alt']}}">
          @if ($title)
            <h2 class="{{$b}}__title">{{$title}}</h2>
          @endif
        </div>
      @endif

      @if ($categories_list)
        @if(sizeof($categories_list))
          <div class="{{$b}}__categories-wrap {{$image_exists_class}} {{$list_layout_class}}">
              <h3 class="{{$b}}__links-title">{{$links_title}}</h3>
              <div class="{{$b}}__links-divider {{$icon_class}}"></div>
              <div class="{{$b}}__links-list">
                <?php foreach ($categories_list as $key => $cat):
                  if(isset($cat['active']) && $cat['active'] == 1 ){
                    $active_class = $b.'__category--active';
                  }else{
                    $active_class = '';
                  }
                ?>
                  <a href="{{$cat['url']}}" class="{{$b}}__category {{$active_class}}">{{$cat['title']}}</a>
                <?php endforeach ?>
              </div>
          </div>
        @endif
      @endif
    </div>
  @overwrite
