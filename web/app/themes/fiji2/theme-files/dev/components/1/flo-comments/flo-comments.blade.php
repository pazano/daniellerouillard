<?php
$b = "flo-comments"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $b__uniq = $b."--".mt_rand(1, 999); // To be used inside HTML
  $b__uniq_for_css = ".".$b__uniq; // To be used inside CSS
  $comments_disabled_class = '';
  if(!comments_open()){
    $comments_disabled_class = $b.'--disabled';
  }
// End: Class name automation

global $comments_data;
$comments_data = $data;

$data = $comments_data;

$comments_number = get_comments_number();

$elements_color = flo_data($data, "elements_color");
$display_comments_count = flo_data($data, "display_comments_count");
$comments_count_font = flo_data($data, "comments_count_font");
$display_sharing_options = flo_data($data, "display_sharing_options");
$sharing_options_label = flo_data($data, "sharing_options_label");
$sharing_options_label_color = flo_data($data, "sharing_options_label_color");
$sharing_options_label_font = flo_data($data, "sharing_options_label_font");
$display_tags = flo_data($data, "display_tags");


$tags_font = flo_data($data, "tags_font");

$author_name_font = flo_data($data, "author_name_font");
$date_font = flo_data($data, "date_font");
$reply_button_font = flo_data($data, "reply_button_font");
$comment_text_font = flo_data($data, "comment_text_font");
$reply_decoration_color = flo_data($data, "reply_decoration_color");

$comments_form_background_color = flo_data($data, "comments_form_background_color");
$comments_form_top_elements_color = flo_data($data, "comments_form_top_elements_color");
$comments_form_middle_elements_color = flo_data($data, "comments_form_middle_elements_color");
$comments_form_title = flo_data($data, "comments_form_title");
$comments_form_title_font = flo_data($data, "comments_form_title_font");
$comments_form_cancel_reply_button_label = flo_data($data, "comments_form_cancel_reply_button_label");
$comments_form_cancel_reply_button_font = flo_data($data, "comments_form_cancel_reply_button_font");
$comments_form_subtitle = flo_data($data, "comments_form_subtitle");
$comments_form_subtitle_font = flo_data($data, "comments_form_subtitle_font");
$comments_form_form_fields_font = flo_data($data, "comments_form_form_fields_font");
$comments_form_submit_label = flo_data($data, "comments_form_submit_label");
$comments_form_submit_button_font = flo_data($data, "comments_form_submit_button_font");
$comments_form_submit_button_text_color = flo_data($data, "comments_form_submit_button_text_color");
$comments_submit_button_background_color = flo_data($data, "comments_submit_button_background_color");

?>

{{-- START: COMMENT TEMPLATE --}}
  <?php
  if(!function_exists('flo_comment')){
    function flo_comment($comment, $args, $depth) {
      global $flo_options, $comments_data;

      $data = $comments_data;

      $display_avatar = flo_data($data, "display_avatar");
      $display_date = flo_data($data, "display_date");
      $reply_button_label = flo_data($data, "reply_button_label");


      $b = "flo-comments"; // To be used inside HTML

      ?>

      <div {{ comment_class( empty( $args['has_children'] ) ? '' : 'parent' ) }} id="comment-{{ comment_ID() }}">

        <div id="div-comment-{{ comment_ID() }}" class="{{$b}}__comment comment-body ">

          {{-- START: TOP WRAP --}}
            <div class="{{$b}}__comment-top-wrap">
              {{-- START: AVATAR --}}
                @if ($display_avatar)
                  <div class="{{$b}}__comment-avatar comment-avatar">
                    @if ($args['avatar_size'] != 0)
                      {{ get_avatar( $comment, $args['avatar_size'] ) }}
                    @endif
                  </div>
                @endif
              {{-- END: AVATAR --}}

              {{-- START: AUTHOR --}}
                <div class="{{$b}}__comment-author comment-author vcard">
                  <?php printf( __( '%s' ), get_comment_author_link() ); ?>
                </div>
              {{-- END: AUTHOR --}}

              {{-- START: DATE --}}
                @if ($display_date)
                  <div class="{{$b}}__comment-date comment-meta commentmetadata">
                    <a href="{{ htmlspecialchars( get_comment_link( $comment->comment_ID ) ) }}">
                      <?php
                      /* translators: 1: date, 2: time */
                      printf( __('%1$s at %2$s','flotheme' ), get_comment_date(),  get_comment_time() ); ?>
                    </a>
                    {{ edit_comment_link( __( '(Edit)','flotheme' ), '  ', '' ) }}
                  </div>
                @endif
              {{-- END: DATE --}}
            </div>
          {{-- END: TOP WRAP --}}

          {{-- START: COMMENT COONTENT --}}
            <div class="{{$b}}__comment-content comment-content flo-post">
              {{ comment_text() }}
            </div>
          {{-- END: COMMENT COONTENT --}}

          {{-- START: REPLY BUTTON --}}
            <div class="{{$b}}__comment-reply">
              {{ comment_reply_link( array_merge( $args, array(
                'add_below' => 'comment',
                'depth' => $depth,
                'reply_text' => $reply_button_label,
                'max_depth' => $args['max_depth']
              ) ) ) }}
            </div>
          {{-- END: REPLY BUTTON --}}

          {{-- START: COMMENT ALERT (APPROVE STATUS) --}}
            @if ( $comment->comment_approved == '0' )
              <div class="{{$b}}__comment-alert flo-post">
                <em class="comment-awaiting-moderation">{{ _e( 'Your comment is awaiting moderation.','flotheme' ) }}</em>
                <br />
              </div>
            @endif
          {{-- END: COMMENT ALERT (APPROVE STATUS) --}}

        </div>

      <?php
    }
  }
  ?>
{{-- END: COMMENT TEMPLATE --}}

@extends('layout.block', [
  "block_classes" => "", // Will be added to main block div. e.g. flo-block--full-width
  "data_onready" => "flo_comments" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      /* START: TOP AREA */
        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__comments-count",
        $comments_count_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__comments-count{
          color: ".$elements_color."!important;
        }

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__sharing-options-label",
        $sharing_options_label_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__sharing-options-label{
          color: ".$sharing_options_label_color."!important;
        }

        ".$b__uniq_for_css." ".$b__for_css."__sharing-links a:before{
          color: ".$elements_color."!important;
        }

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__tags a",
        $tags_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__tags a {
          color: ".$elements_color."!important;
        }
      /* END: TOP AREA */

      /* START: COMMENTS LIST */

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__comment-author",
        $author_name_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__comment-date",
        $date_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__comment-content",
        $comment_text_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__comment-reply",
        $reply_button_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__comment {
          border-color: ".flo_color("secondary-line-color")."!important;
        }

        ".$b__uniq_for_css." ".$b__for_css."__comment-author,
        ".$b__uniq_for_css." ".$b__for_css."__comment-date,
        ".$b__uniq_for_css." ".$b__for_css."__comment-content,
        ".$b__uniq_for_css." ".$b__for_css."__comment-reply
        {
          color: ".$elements_color."!important;
        }

        ".$b__uniq_for_css." ".$b__for_css."__comment:before
        {
          background-color: ".$reply_decoration_color.";
        }

      /* END: COMMENTS LIST */

      /* START: COMMENTS FORM */
        ".$b__uniq_for_css." ".$b__for_css."__form-wrap
        {
          background-color: ".$comments_form_background_color." ;
        }

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__form-title",
        $comments_form_title_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__form-title
        {
          color: ".$comments_form_top_elements_color."!important;
        }

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__form-subtitle",
        $comments_form_subtitle_font
        )
        ."

        ".
        flo_render_typography_styles(
        $b__uniq_for_css." ".$b__for_css."__form-field, "
        .$b__uniq_for_css." ".$b__for_css."__form-textarea ",
        $comments_form_form_fields_font
        )
        ."

        ".$b__uniq_for_css." ".$b__for_css."__form-subtitle,
        ".$b__uniq_for_css." ".$b__for_css."__form-field,
        ".$b__uniq_for_css." ".$b__for_css."__form-textarea
        {
          color: ".$comments_form_middle_elements_color."!important;
          border-color: ".hex2rgba($comments_form_middle_elements_color,0.3)."!important;
        }

        ".$b__uniq_for_css." ".$b__for_css."__form-wrap .submit
        {
          color: ".$comments_form_submit_button_text_color."!important;
          background-color: ".$comments_submit_button_background_color."!important;
        }
      /* END: COMMENTS FORM */

    "
  ])

  <div class="{{$b}} {{$b__uniq}} {{$comments_disabled_class}}">

    {{-- START: TOP AREA --}}
      <div class="{{$b}}__top-area">
        <div class="{{$b}}__comments-count">
          <?php

            if ( '1' === $comments_number ) {
              /* translators: %s: post title */
              _e('ONE COMMENT','flotheme');
            } else {
              printf(
                /* translators: 1: number of comments, 2: post title */
                _nx(
                  '%1$s COMMENT',
                  '%1$s COMMENTS',
                  $comments_number,
                  'comments title',
                  'flotheme'
                ),
                number_format_i18n( $comments_number )
              );
            }
          ?>
        </div>

        <div class="{{$b}}__sharing-options">
          @if ($display_sharing_options)
            <div class="{{$b}}__sharing-options-label">
              {{$sharing_options_label}}
            </div>
            <div class="{{$b}}__sharing-links">
              @include('components.flo-share-links')
            </div>
          @endif
        </div>

          <div class="{{$b}}__tags">
            @if ($display_tags && strlen($tags_list))
              {{$tags_list}}
            @endif
          </div>

      </div>
    {{-- END: TOP AREA --}}

    {{-- START: COMMENTS WRAP --}}
      <div class="{{$b}}__comments-wrap">

        {{-- START: LIST --}}
          <div class="{{$b}}__list">
            {{ wp_list_comments( array(
                'style'       => 'div',
                'short_ping'  => true,
                'avatar_size' => 56,
                'callback'    => "flo_comment"
              ),
              get_comments(array('post_id' => $post->ID))
            ) }}
          </div>
        {{-- END: LIST --}}

        {{-- START: FORM --}}
          @if(comments_open() || have_comments())
            <div class="{{$b}}__form-wrap">

              <div class="{{$b}}__form-top-area">
                <h4 class="{{$b}}__form-title">{{$comments_form_title}}</h4>
                @if ($comments_form_subtitle)
                  <h5 class="{{$b}}__form-subtitle">{{$comments_form_subtitle}}</h5>
                @endif
              </div>

              <?php
                $commenter = wp_get_current_commenter();
                $req = get_option( 'require_name_email' );
                $aria_req = ( $req ? " aria-required='true'" : '' );
              ?>
              <script type="text/javascript">
                jQuery(function($){
                    $(".{{$b}}__form").parsley();
                });
              </script>
              {{ comment_form([
                "class_form"    => $b."__form",
                'title_reply'   => "",
                'cancel_reply_link'   => "<i class='flo-icon-close'></i>",
                'logged_in_as'  => "",
                'comment_notes_before' => "",
                'fields'        => array(
                  'author' =>
                  '<input class="'.$b.'__form-field '.$b.'__form-field--half" data-parsley-required id="author" name="author" type="text" placeholder="'.__("NAME*", "flotheme").'" value="' . esc_attr( $commenter['comment_author'] ) .
                  '" size="30"' . $aria_req . ' />',

                  'email' =>
                    '<input class="'.$b.'__form-field '.$b.'__form-field--half" data-parsley-required data-parsley-trigger="change" id="email" name="email" type="email" placeholder="'.__("EMAIL*", "flotheme").'" value="' . esc_attr(  $commenter['comment_author_email'] ) .
                    '" size="30"' . $aria_req . ' />',

                  'url' => '
                    <input class="'.$b.'__form-field" placeholder="'.__("WEBSITE", "flotheme").'" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) .
                    '" size="30" />
                  ',
                ),
                'comment_field' => '
                                      <textarea  class="'.$b.'__form-textarea" data-parsley-required id="comment" name="comment" aria-required="true" placeholder="'.__("YOUR COMMENT", "flotheme").'"></textarea>
                                    ',
                "label_submit"  => $comments_form_submit_label
              ]) }}

            </div>
          @endif
        {{-- END: FORM --}}

      </div>
    {{-- END: COMMENTS WRAP --}}

  </div>
@overwrite
