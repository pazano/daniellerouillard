<?php
$b = "flo-block-listing-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");

$display_decorative_images = flo_data($data, "display_decorative_images");
$display_date = flo_data($data, "display_date");
$date_font = flo_data($data, "date_font");
$title_font = flo_data($data, "title_font");

$display_category = flo_data($data, "display_category");
$category_font = flo_data($data, "category_font");

$display_featured_images = flo_data($data, "display_featured_images");

$content_display = flo_data($data, "content_display");
$excerpt_font = flo_data($data, "excerpt_font");

$display_item_link = flo_data($data, "display_item_link");
$item_link_label = flo_data($data, "item_link_label");
$item_link_font = flo_data($data, "item_link_font");

$item_tag = $display_item_link ? "div" : "a";
?>
@extends('layout.block', [
  "block_classes" => "", // Will be added to main block span. e.g. flo-block--full-width
  // "data_onready" => "flo_block_listing_1" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('components.flo-generic-listing-items-data')
<?php
  global $items;
?>
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__date",
      $date_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__category",
      $category_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__excerpt",
      $excerpt_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__item-link",
      $item_link_font
      )
      ."

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
        border-color: ".hex2rgba($elements_color, 0.3).";
      }

    "
  ])
  <div class="{{$b}} {{$b__uniq}}">
    @foreach ($items as $item)
      <?php
        $item_href_attr = $display_item_link && $item_link_label ? "" : "href='".$item["url"]."'";
      ?>
      <{{$item_tag}} class="{{$b}}__item" {{$item_href_attr}}>
        @if ($display_decorative_images && $item["decorative_image"])
          <img class="{{$b}}__decorative-image" src="{{$item["decorative_image"]["url"]}}" alt="">
        @endif

        <span class="{{$b}}__title">
          <a  href="{{$item["url"]}}">
            {{$item["title"]}}
          </a>
        </span>

        @if ($display_date or $display_category)
          <div class="{{$b}}__date-and-category">

            @if ($display_category)
              <span class="{{$b}}__category">
                {{$item["first_category_linked"]}}
              </span>
            @endif

            @if ($display_date or $display_category)
              <div class="{{$b}}__separator"></div>
            @endif

            @if ($display_date)
              <span class="{{$b}}__date">
                {{$item["date"]}}
              </span>
            @endif

          </div>
        @endif

        @if ($display_featured_images && $item["has_feat_img"])
          <span class="{{$b}}__featured-image">
            {{$item["featured_image"]}}
          </span>
        @endif

        @if ($content_display == "excerpt" && $item["excerpt"])
          <span class="{{$b}}__excerpt">
            {{ $item["excerpt"] }}
          </span>
        @elseif ($content_display == "full_content")
          <span class="{{$b}}__content flo-post">
            <?php echo apply_filters('the_content', $item['content']); ?>
          </span>
        @endif

        @if ($display_item_link && $item_link_label)
          <a class="{{$b}}__item-link" href="{{$item["url"]}}">
            {{$item_link_label}}
          </a>
        @endif
      </{{$item_tag}}>
    @endforeach
  </div>
@overwrite
