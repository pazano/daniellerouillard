<?php
$b = "flo-block-contact-block-2"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
// End: Class name automation

$elements_color = flo_data($data, "elements_color");

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

$form_type = flo_data($data, "contact_form_type");
$contact_form_shortcode = flo_data($data, "contact_form_shortcode");
$contact_form_email = flo_data($data, "your_email");
$use_reply_to_header = flo_data($data, "use_reply_to_header");
$custom_thank_you_message = flo_data($data, "custom_thank_you_message");

// workaround to ensure compatibility with the core code:
flo_set_contact_form_email($data, $data_email_field = 'your_email', $data_reply_header_field ='use_reply_to_header', $post_id = $post->ID);

?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width disable-appear", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "flo_block_contact_block_2" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@include('core.style', [
  "breakpoint__general" => "

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

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
      }

      /* Set Color for Input Fields */
      ".$b__uniq_for_css." input:not([type='submit']),
      ".$b__uniq_for_css." textarea {
        color: ".$elements_color.";
        border-bottom: 1px solid ".hex2rgba($elements_color, 0.3)."!important;
      }

      /* Set Color and Background-color for Submit Button */
      ".$b__uniq_for_css." ".$b__for_css."__form-submit {
        color: ".$submit_button_label_color."!important;
        background-color: ".$submit_button_background_color.";
      }

      /* Set Color and Background-color for Submit Button ON HOVER */
      ".$b__uniq_for_css." ".$b__for_css."__form-submit:hover {
        color: ".$submit_button_background_color."!important;
        background-color: ".$submit_button_label_color."!important;
      }

      ".$b__for_css."__response p {
        color: ".$elements_color."!important;
        border-color:".$elements_color.";
      }

  ",
  "breakpoint__medium_up" => "
  "
])
@section('block_content')
  <div class="{{$b}} {{$b__uniq}}">

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
