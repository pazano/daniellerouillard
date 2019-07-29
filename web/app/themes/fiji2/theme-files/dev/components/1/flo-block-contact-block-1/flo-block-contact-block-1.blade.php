<?php
$b = "flo-block-contact-block-1"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$disable_scroll_effect = flo_data($data, "disable_scroll_effect");
$disable_scroll_effect_class = $disable_scroll_effect ? $b . "--no-scroll-effect" : "";
// A. Form Description
// $display_contact_description_section = flo_data($data, "display_contact_description_section");
$elements_color = flo_data($data, "elements_color","#ffffff");

$display_header = flo_data($data, "display_header");
$display_header_class = $display_header ? $b . "--header-is-visible" : "";
$brighness_class = flo_color_bright($elements_color) ? "flo-header__logo--is-light" : "";

$background_image = flo_data($data, "background_image");
$image_overlay_color = flo_data($data, "image_overlay_color");
$image_overlay_color_opacity = flo_data($data, "overlay_color_opacity") / 100;
$title = flo_data($data, "title");
$title_font = flo_data($data, "title_font");
$title_paragraph = flo_data($data, "title_paragraph");
$title_paragraph_font = flo_data($data, "title_paragraph_font");
$scroll_down_label = flo_data($data, "scroll_down_label");
$scroll_down_label_font = flo_data($data, "scroll_down_label_font");

$social_links_pretitle = flo_data($data, "social_links_pretitle");
$social_links_pretitle_font = flo_data($data, "social_links_pretitle_font");
$social_links_title = flo_data($data, "social_links_title");
$social_links_title_font = flo_data($data, "social_links_title_font");
$display_social_links = flo_data($data, "display_social_links");
$location_pretitle = flo_data($data, "location_pretitle");
$location_pretitle_font = flo_data($data, "location_pretitle_font");
$location_title = flo_data($data, "location_title");
$location_title_font = flo_data($data, "location_title_font");
$location = flo_data($data, "location");
$location_font = flo_data($data, "location_font");

// B. Form
$form_elements_color = flo_data($data, "form_elements_color");
$form_background_color = flo_data($data, "form_background_color");
$form_title = flo_data($data, "form_title");
$form_title_font = flo_data($data, "form_title_font");
$form_subtitle = flo_data($data, "form_subtitle");
$form_subtitle_font = flo_data($data, "form_subtitle_font");
$name_field_label = flo_data($data, "name_field_label");
$second_name_field_label = flo_data($data, "second_name_field_label");
$email_field_label = flo_data($data, "email_field_label");
$date_field_label = flo_data($data, "date_field_label");
$message_field_label = flo_data($data, "message_field_label");
$submit_button_label = flo_data($data, "submit_button_label");
$submit_button_label_font = flo_data($data, "submit_button_label_font");
$submit_button_label_color = flo_data($data, "submit_button_label_color");
$submit_button_background_color = flo_data($data, "submit_button_background_color","#555049");
$contact_form_labels_font = flo_data($data, "contact_form_labels_font");
// D. Form Settings
$form_type = flo_data($data, "contact_form_type");
$contact_form_shortcode = flo_data($data, "contact_form_shortcode");
$contact_form_email = flo_data($data, "your_email");
$use_reply_to_header = flo_data($data, "use_reply_to_header");
$custom_thank_you_message = flo_data($data, "custom_thank_you_message");

// workaround to ensure compatibility with the core code:
flo_set_contact_form_email($data, $data_email_field = 'your_email', $data_reply_header_field ='use_reply_to_header', $post_id = $post->ID);

// Background Image Optimization
$attachment_id = $background_image['ID'];

$img_sizes = array(
 'small' => array('width' => 1280, 'height' => 99999),  // mobile size
 'medium' => array('width' => 2048, 'height' => 99999), // tablet size
 'large' => array('width' => 2560, 'height' => 99999),
);

$img_vars = flo_get_bg_image_vars($attachment_id, $img_sizes, $crop = false);

?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width disable-appear", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_block_contact_block_1" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

    /* START: CONTACT DESCRIPTION */

      ".$b__uniq_for_css." ".$b__for_css."__contact-description {
        color: ".$elements_color.";
      }

      ".$b__uniq_for_css." ".$b__for_css."__image-overlay, ".$b__uniq_for_css." ".$b__for_css."__contact-description:before {
        background-color: ".$image_overlay_color.";
        opacity: ".$image_overlay_color_opacity.";
      }


    /* END: CONTACT DESCRIPTION */

    /* START: Contact Description LEFT SIDE */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title-paragraph",
      $title_paragraph_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__scroll-down",
      $scroll_down_label_font
      )
      ."



    /* END: Contact Description LEFT SIDE */

    /* START: Contact Description RIGHT SIDE */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__social-links-pretitle",
      $social_links_pretitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__social-links-title",
      $social_links_title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__location-pretitle",
      $location_pretitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__location-title",
      $location_title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__location",
      $location_font
      )
      ."

    /* END: Contact Description RIGHT SIDE */

    /* START: FORM */

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__form-title",
      $form_title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__form-subtitle",
      $form_subtitle_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__form-field",
      $contact_form_labels_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__form-submit",
      $submit_button_label_font
      )
      ."

      ".$b__uniq_for_css." ".$b__for_css."__form-section {
        color: ".$form_elements_color.";
        background-color: ".$form_background_color.";
      }

      /* Set Color for Input Fields */
      ".$b__uniq_for_css." input:not([type='submit']),
      ".$b__uniq_for_css." textarea {
        border-bottom: 1px solid ".hex2rgba($form_elements_color,0.3)."!important;
      }

      /* Set Color and Background-color for Submit Button */
      ".$b__uniq_for_css." ".$b__for_css."__form-submit {
        color: ".$submit_button_label_color."!important;
        background-color: ".$submit_button_background_color."!important;
      }

      /* Set Color and Background-color for Submit Button ON HOVER */
      ".$b__uniq_for_css." ".$b__for_css."__form-submit:hover {
        color: ".$submit_button_background_color."!important;
        background-color: ".$submit_button_label_color."!important;
      }

      ".$b__for_css."__response p {
        color: ".$form_elements_color."!important;
        border-color:".$form_elements_color.";
      }

    /* END: FORM */

  ",
  "breakpoint__medium_up" => "
  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}} {{$display_header_class}} {{$disable_scroll_effect_class}}"  style="{{$img_vars}}" aria-label="{{$background_image['alt']}}">

    <div class="{{$b}}__image-overlay"></div>

    <div class="{{$b}}__contact-description" style="{{$img_vars}}">

      @if ($display_header)
          <div class="{{$b}}__header-area {{$brighness_class}}">
            @include('components.flo-header')
          </div>
      @endif
      <div class="{{$b}}__desktop-wrap">
        <div class="{{$b}}__left-side">

          @if ($title)
            <h1 class="{{$b}}__title">{{$title}}</h1>
          @endif

          @if ($title_paragraph)
            <p class="{{$b}}__title-paragraph">{{$title_paragraph}}</p>
          @endif

          @if ($scroll_down_label)
            <div class="{{$b}}__scroll-down-wrap">
              <i class="{{$b}}__arrow-down flo-icon-arrow-down"></i>
              <div class="{{$b}}__scroll-down">
                {{$scroll_down_label}}
              </div>
            </div>
          @endif

        </div>

        <div class="{{$b}}__right-side">

          @if ($social_links_title or $social_links_pretitle or $display_social_links)
            <div class="{{$b}}__social-links-wrap">
              @if ($social_links_pretitle)
                <div class="{{$b}}__social-links-pretitle">
                  {{$social_links_pretitle}}
                </div>
              @endif

              @if ($social_links_title)
                <div class="{{$b}}__social-links-title">
                  {{$social_links_title}}
                </div>
              @endif

              @if ($display_social_links)
                <div class="{{$b}}__social-links">
                  @include('components.social-links')
                </div>
              @endif
            </div>
          @endif

          @if ($location_pretitle or $location_title or $location)
            <div class="{{$b}}__location-wrap">
              @if ($location_pretitle)
                <div class="{{$b}}__location-pretitle">
                  {{$location_pretitle}}
                </div>
              @endif

              @if ($location_title)
                <div class="{{$b}}__location-title">
                  {{$location_title}}
                </div>
              @endif

              @if ($location)
                <div class="{{$b}}__location">
                  {{$location}}
                </div>
              @endif
            </div>
          @endif

        </div>
      </div>

      <div class="{{$b}}__mobile-wrap">
        <div class="{{$b}}__left-side">

          @if ($title)
            <h1 class="{{$b}}__title">{{$title}}</h1>
          @endif

          @if ($title_paragraph)
            <p class="{{$b}}__title-paragraph">{{$title_paragraph}}</p>
          @endif

        </div>

        <div class="{{$b}}__right-side">

          @if ($social_links_title or $social_links_pretitle or $display_social_links)
            <div class="{{$b}}__social-links-wrap">
              @if ($social_links_pretitle)
                <div class="{{$b}}__social-links-pretitle">
                  {{$social_links_pretitle}}
                </div>
              @endif

              @if ($social_links_title)
                <div class="{{$b}}__social-links-title">
                  {{$social_links_title}}
                </div>
              @endif

              @if ($display_social_links)
                <div class="{{$b}}__social-links">
                  @include('components.social-links')
                </div>
              @endif
            </div>
          @endif

          @if ($location_pretitle or $location_title or $location)
            <div class="{{$b}}__location-wrap">
              @if ($location_pretitle)
                <div class="{{$b}}__location-pretitle">
                  {{$location_pretitle}}
                </div>
              @endif

              @if ($location_title)
                <div class="{{$b}}__location-title">
                  {{$location_title}}
                </div>
              @endif

              @if ($location)
                <div class="{{$b}}__location">
                  {{$location}}
                </div>
              @endif
            </div>
          @endif
          @if ($scroll_down_label)
            <div class="{{$b}}__scroll-down-wrap">
              <i class="{{$b}}__arrow-down flo-icon-arrow-down"></i>
              <div class="{{$b}}__scroll-down">
                {{$scroll_down_label}}
              </div>
            </div>
          @endif
        </div>
      </div>

    </div>


    @if($form_type == 'builtin')
      <div class="{{$b}}__form-wrap">
        <div class="flo-modal" style="display: none;">
            <div class="thx-msg">
              <div class="flo-icon__close"></div>
              <div class="content">{{flo_data($data,'custom_thank_you_message')}}</div>  <!--  use the correct field name here -->
            </div>
        </div>

        <form class="{{$b}}__form-section flo-form__built-in"> <!-- flo-form__built-in is required class -->

          @if ($form_title)
            <h2 class="{{$b}}__form-title">
              {{$form_title}}
            </h2>
          @endif
          @if ($form_subtitle)
            <h3 class="{{$b}}__form-subtitle">
              {{$form_subtitle}}
            </h3>
          @endif

          <div class="{{$b}}__fields-wrap">
              <div class="{{$b}}__form-field {{$b}}__form-field--half-width">
                <input id="name" class="flo-name" type="text" name="flo-name" value="" placeholder="{{$name_field_label}}">
              </div>
              <div class="{{$b}}__form-field {{$b}}__form-field--half-width">
                <input id="email" class="flo-email" type="text" name="flo-email" value="" placeholder="{{$email_field_label}}">
              </div>
            <div class="{{$b}}__form-field">
              <textarea id="message" class="" name="flo-message" placeholder="{{$message_field_label}}"></textarea>
            </div>
          </div>
          <input type="hidden" value="{{ $post->ID }}" name="pid"> <!-- required -->
          <div class="{{$b}}__response contact-response"></div>  <!-- required -->
          <div class="clearfix"></div>
          <button class="{{$b}}__form-submit flo-button flo-form-submit">{{$submit_button_label}}</button> <!-- should use class flo-form-submit -->
        </form>
      </div>
      @else
        <div class="{{$b}}__form-wrap">
          <div class="{{$b}}__form-section {{$b}}__form-section--custom">
            @if ($form_title)
              <h2 class="{{$b}}__form-title">
                {{$form_title}}
              </h2>
            @endif
            @if ($form_subtitle)
              <h3 class="{{$b}}__form-subtitle">
                {{$form_subtitle}}
              </h3>
            @endif

            <?php
            /*=========================================================
            =  Suport for the Flo Forms plugin shortcode               =
            =========================================================*/

              // $running_flo_shortcode is necessary for the Flo Forms plugin
              // it tells the plugin that the shortcode is being used and then the plugin loads the js and css files
              global $running_flo_shortcode;
              $running_flo_shortcode = true;

            /*=====  End of Suport for the Flo FOrms plugin hortcode  ======*/
              $form_shortcode = trim(flo_data($data,'contact_form_shortcode'));

              echo do_shortcode( $form_shortcode );
            ?>
          </div>
        </div>
    @endif
  </div>
@overwrite
