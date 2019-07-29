<?php 
$b = "flo-splash";
$b__for_css = ".".$b;

$splash_enabled = flo_get_option("flo-fiji2-settings__preloader", false);
?>

@if ( $splash_enabled )

<?php
  $splash_background_color = flo_get_option("flo-fiji2-settings___preloader-background-color", "#FFFFFF");
  $splash_image_size = flo_get_option("flo-fiji2-settings___preloader-size", "450") / 16 ."rem";
  $splash_mobile_image_size = flo_get_option("flo-fiji2-settings___preloader-mobile-size", "250") / 16 ."rem";
  $splash_default_logo = flo_get_option("flo-fiji2-settings___preloader-default-logo", true);
  $logo_type = flo_get_option("flo-lovely2-header__logo-type", "site-title");
  $logo_color = flo_get_option("flo-lovely2-header__elements_color", "#000000");
  $logo_font = flo_font_data("flo-lovely2-logo_options", "flo-lovely2-header__logo-font");
  
  if ($splash_default_logo == true) {
    // global header logo setting 
    
    if ($logo_type == "image") {
      $logo = flo_get_option("flo-lovely2-header__logo-image", '');
    } elseif ($logo_type == "text") {
      $logo = flo_get_option("flo-lovely2-header__logo-text", '');
    } else {
      $logo = get_bloginfo( 'name' );
    }
    
    $preloader_img_vars = "";
  } else {
    $splash_custom_logo = flo_get_option("flo-fiji2-settings___preloader-custom-image");
    $featured_img_id = $splash_custom_logo["ID"];
    $featured_img_sizes = [
      'small' => ['width' => 9999, 'height' => 700],  // mobile size
      'medium' => ['width' => 9999, 'height' => 1024], // tablet size
      'large' => ['width' => 9999, 'height' => 1500]
    ];
    $preloader_img_vars = flo_get_bg_image_vars($featured_img_id, $featured_img_sizes, $crop = false);
  }
  ?>

  @include('core.style', [
    "breakpoint__general" => "
        ".$b__for_css."{
          color: ".$logo_color.";
          background-color: ".$splash_background_color.";
        }
        ".
        flo_render_typography_styles(
          $b__for_css."__content", $logo_font
        )."
    ",
    "breakpoint__medium_up" => "
      ".$b__for_css."__image-logo{
        width: ".$splash_image_size." !important;
      }
    ", 
    "breakpoint__small_only" => "
    ".$b__for_css."__image-logo {
      width: ".$splash_mobile_image_size." !important;
    }
    "
  ])

  <div class="{{$b}}">
    @if ($splash_default_logo)
      @if ($logo_type == "image")
        <div class="{{$b}}__content">
          <img src="{{$logo}}" class="{{$b}}__image-logo">
        </div>
      @else
        <div class="{{$b}}__content">
          <div class="{{$b}}__text-logo">
              {{$logo}}
          </div>
        </div>
      @endif
    @else
      <div class="{{$b}}__content {{$b}}__image-logo {{$b}}__custom-preloader" style="{{ $preloader_img_vars }}">
      </div>
    @endif
  </div>

@endif