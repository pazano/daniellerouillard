<?php
$b = "flo-block-comments"; // To be used inside HTML

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

$elements_color = flo_data($data, "elements_color");

$comments_title = flo_data($data, "comments_title");
$comments_title_font = flo_data($data, "comments_title_font");

$use_facebook_comments = flo_data($data, "use_facebook_comments");

$comment_author_font = flo_data($data, "comment_author_font");
$comment_date_font = flo_data($data, "comment_date_font");
$comment_font = flo_data($data, "comment_font");
$reply_button_label_font = flo_data($data, "reply_button_label_font");

$reply_comment_background_color = flo_data($data, "reply_comment_background_color");
$reply_comment_elements_color = flo_data($data, "reply_comment_elements_color");

$form_title = flo_data($data, "form_title");
$form_title_font = flo_data($data, "form_title_font");
$form_field_labels_font = flo_data($data, "form_field_labels_font");
$form_field_font = flo_data($data, "form_field_font");

$submit_button_label = flo_data($data, "submit_button_label");
$submit_button_label_font = flo_data($data, "submit_button_label_font");
$submit_button_background_color = flo_data($data, "submit_button_background_color");
$submit_button_elements_color = flo_data($data, "submit_button_elements_color");
?>

{{-- START: COMMENT TEMPLATE --}}
  <?php
  if(!function_exists('flo_comment')){
    function flo_comment($comment, $args, $depth) {
      global $flo_options, $comments_data;

      $data = $comments_data;

      $b = "flo-block-comments"; // To be used inside HTML

      $display_comment_date = flo_data($data, "display_comment_date", true);
      $display_avatar = flo_data($data, "display_avatar", true);
      $reply_button_label = flo_data($data, "reply_button_label");

      ?>

      <div {{ comment_class( empty( $args['has_children'] ) ? '' : 'parent' ) }} id="comment-{{ comment_ID() }}">

        <div id="div-comment-{{ comment_ID() }}" class="{{$b}}__comment comment-body ">

          {{-- START: LEFT WRAP --}}
            <div class="{{$b}}__comment-left-wrap">
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
                @if ($display_comment_date)
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
          {{-- END: LEFT WRAP --}}

          {{-- START: COMMENT CONTENT --}}
            <div class="{{$b}}__comment-content comment-content">
              {{-- START: COMMENT TEXT --}}
                <div class="{{$b}}__comment-text">
                  {{ comment_text() }}
                </div>
              {{-- END: COMMENT TEXT --}}

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
          {{-- END: COMMENT CONTENT --}}

        </div>

      <?php
    }
  }
  ?>
{{-- END: COMMENT TEMPLATE --}}

@extends('layout.block', [
  // "block_classes" => "flo-block--full-width", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('core.style', [
    "breakpoint__general" => "

      ".$b__uniq_for_css." {
        color: ".$elements_color.";
        border-color: ". hex2rgba($elements_color, 0.3).";
      }

      ".$b__uniq_for_css." ".$b__for_css."__form-field-wrap textarea, ".$b__uniq_for_css." ".$b__for_css."__form-field-wrap input {
        border-color: ". hex2rgba($reply_comment_elements_color, 0.3)."!important;
      }

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__title",
      $comments_title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__comment-author",
      $comment_author_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__comment-date",
      $comment_date_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__comment-text",
      $comment_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__comment-reply",
      $reply_button_label_font
      )
      ."

      ".$b__uniq_for_css." .comment .comment {
        background-color: ".$reply_comment_background_color.";
        color: ".$reply_comment_elements_color.";
      }


      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__form-title",
      $form_title_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__form-label",
      $form_field_labels_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." ".$b__for_css."__form-field",
      $form_field_font
      )
      ."

      ".
      flo_render_typography_styles(
      $b__uniq_for_css." .submit",
      $submit_button_label_font
      )
      ."

    "
  ])
  <div class="{{$b}} {{$b__uniq}} {{$comments_disabled_class}}">
    @if($use_facebook_comments)
      
        <div class="{{$b}}__fb_comments">
          <div class="{{$b}}__title">
            {{ $comments_title }}
          </div>
          <div class="fb-root"></div>
          <script src="http://connect.facebook.net/en_US/all.js#xfbml=1" type="text/javascript"></script>
          <div class="fb-comments" data-href="<?php the_permalink(); ?>" data-numposts="5"></div>
        </div>
        
    @else
      {{-- START: LIST WRAP --}}
        <div class="{{$b}}__list-wrap">
          <div class="{{$b}}__title">
            {{ $comments_title }}
          </div>

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
        </div>
      {{-- END: LIST WRAP --}}


      {{-- START: FORM --}}
        @if(comments_open())
          <div class="{{$b}}__form-wrap">

            <div class="{{$b}}__form-title">
              {{$form_title}}
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
                '
                <div class="'.$b.'__form-field-wrap '.$b.'__form-field-wrap--small">
                  <input class="'.$b.'__form-field" data-parsley-required id="author" name="author" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
                  '" size="30"' . $aria_req . ' placeholder="'. __("Your name", "flotheme") .'"/>
                </div>
                ',

                'email' =>
                  '
                    <div class="'.$b.'__form-field-wrap '.$b.'__form-field-wrap--small">
                      <input class="'.$b.'__form-field" data-parsley-required data-parsley-trigger="change" id="email" name="email" type="email" value="' . esc_attr(  $commenter['comment_author_email'] ) .
                      '" size="30"' . $aria_req . ' placeholder="'. __("Your email", "flotheme") .'"/>
                    </div>
                  '
                ,

                'url' =>
                  '
                    <div class="'.$b.'__form-field-wrap '.$b.'__form-field-wrap--small">
                      <input class="'.$b.'__form-field" id="url" name="url" type="text" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" placeholder="'. __("Your site", "flotheme") .'"/>
                    </div>
                  '

              ),
              'comment_field' =>
                '
                  <div class="'.$b.'__form-field-wrap '.$b.'__form-field-wrap--big">
                    <textarea  class="'.$b.'__form-field" data-parsley-required id="comment" name="comment" aria-required="true" placeholder="'. __("Your Comment", "flotheme") .'"></textarea>
                  </div>
                '
              ,
              "label_submit"  => $submit_button_label
            ]) }}

          </div>
        @endif
      {{-- END: FORM --}}
    @endif
  </div>
@overwrite
