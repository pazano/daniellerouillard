<?php
  function flo_lvy_widget_subscribe_load() {
    register_widget( 'flo_lvy_widget_subscribe' );
  }
  add_action( 'widgets_init', 'flo_lvy_widget_subscribe_load' );

  class flo_lvy_widget_subscribe extends WP_Widget {

    function __construct() {
      parent::__construct(

      // Base ID of your widget
      'flo_lvy_widget_subscribe',

      // Widget name will appear in UI
      __('Fiji Subscribe', 'flo'),

      // Widget description
      array( 'description' => __( 'Displays a Mailchimp subscription font.', 'flo' ),)

      );
    }

    /* START: FRONT END */
      public function widget( $args, $instance ) {
        // before and after widget arguments are defined by themes
        // widget div open tag: echo $args['before_widget'];
        // widget div closing tag: echo $args['after_widget'];

        // pulling all widget data
        $bgc = get_field('subscribe_background_color', 'widget_'.  $args['widget_id']);
        $elements_color = get_field('subscribe_elements_color', 'widget_'.  $args['widget_id']);

        $title = get_field('subscribe_title', 'widget_'.  $args['widget_id']);
        $title_font = get_field('subscribe_title_font', 'widget_'.  $args['widget_id']);
        $title_font = flo_data($title_font, "default");
        $text = get_field('subscribe_text', 'widget_'.  $args['widget_id']);
        $text_font = get_field('subscribe_text_font', 'widget_'.  $args['widget_id']);
        $text_font = flo_data($text_font, "default");
        $fields_font = get_field('subscribe_fields_font', 'widget_'.  $args['widget_id']);
        $fields_font = flo_data($fields_font, "default");
        $name_placeholder = get_field('subscribe_name_placeholder', 'widget_'.  $args['widget_id']);
        $email_placeholder = get_field('subscribe_email_placeholder', 'widget_'.  $args['widget_id']);

        $submit_button_label = get_field('subscribe_submit_button_label', 'widget_'.  $args['widget_id']);
        $submit_button_font = get_field('subscribe_submit_button_font', 'widget_'.  $args['widget_id']);
        $submit_button_font = flo_data($submit_button_font, "default");
        $submit_button_bgc = get_field('subscribe_submit_button_bgc', 'widget_'.  $args['widget_id']);
        $submit_button_tc = get_field('subscribe_submit_button_tc', 'widget_'.  $args['widget_id']);

        $mailchimp_code = get_field('subscribe_embed_code', 'widget_'.  $args['widget_id']);

        echo $args['before_widget']; ?>
          <div class="widget__flo-form--newsletter__main-wrap" style="color: <?php echo $elements_color ?>; background-color: <?php echo $bgc ?>;">
            <div class="widget__flo-form--newsletter__text-wrap">
              <h2 class="widget__flo-form--newsletter__title" style="<?php echo $title_font ?>"><?php echo $title; ?></h2>
              <p class="widget__flo-form--newsletter__text" style="<?php echo $text_font ?>"><?php echo $text; ?></p>
            </div>
            <form class="widget__flo-form--newsletter" method="post">
              <input class="widget__flo-form--newsletter__form-name" type="text" name="FNAME" value="" placeholder="<?php echo $name_placeholder; ?>" style="<?php echo $fields_font ?>">
              <input class="widget__flo-form--newsletter__form-email" type="email" name="EMAIL" value="" placeholder="<?php echo $email_placeholder; ?>" style="<?php echo $fields_font ?>">
              <input class="widget__flo-form--newsletter__form-submit" type="submit" value="<?php echo $submit_button_label; ?>" style="color: <?php echo $submit_button_tc ?>; border-color: <?php echo hex2rgba($submit_button_tc, 0.3) ?>; background-color: <?php echo $submit_button_bgc ?>; <?php echo $submit_button_font ?>">
            </form>
            <noscript type="text/template" class="embed_code" data-onready="widget_newsletter_signup">
              <?php echo $mailchimp_code; ?>
            </noscript>
          </div>
        <?php echo $args['after_widget'];
      }
    /* END: FRONT END */

    public function form( $instance ) {

    }

  }
 ?>
