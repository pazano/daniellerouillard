<?php
  function flo_lvy_widget_image_link_load() {
    register_widget( 'flo_lvy_widget_image_link' );
  }
  add_action( 'widgets_init', 'flo_lvy_widget_image_link_load' );

  class flo_lvy_widget_image_link extends WP_Widget {

    function __construct() {
      parent::__construct(

      // Base ID of your widget
      'flo_lvy_widget_image_link',

      // Widget name will appear in UI
      __('Fiji Image Link', 'flo'),

      // Widget description
      array( 'description' => __( 'A widget that displays an image, text and a link.', 'flo' ),)

      );
    }

    /* START: FRONT END */
      public function widget( $args, $instance ) {

        // before and after widget arguments are defined by themes
        // widget div open tag: echo $args['before_widget'];
        // widget div closing tag: echo $args['after_widget'];

        // pulling all widget data
        $elements_color = get_field('image_link_elements_color', 'widget_'.  $args['widget_id']);

        $image = get_field('image_link_image', 'widget_'.  $args['widget_id']);
        $img_url = aq_resize( $image, $width = 450, $height = 550, $crop = true, $single = true, $upscale = false );

        $title = get_field('image_link_title', 'widget_'.  $args['widget_id']);
        $title_font = get_field('image_link_title_font', 'widget_'.  $args['widget_id']);
        $title_font = flo_data($title_font, "default");
        $text = get_field('image_link_text', 'widget_'.  $args['widget_id']);
        $text_font = get_field('image_link_text_font', 'widget_'.  $args['widget_id']);
        $text_font = flo_data($text_font, "default");
        $button_label = get_field('image_link_button_label', 'widget_'.  $args['widget_id']);
        $button_font = get_field('image_link_button_font', 'widget_'.  $args['widget_id']);
        $button_font = flo_data($button_font, "default");
        $button_url = get_field('image_link_button_url', 'widget_'.  $args['widget_id']);


        echo $args['before_widget'];
        ?>
          <div style="color: <?php echo $elements_color ?>; border-color: <?php echo hex2rgba($elements_color, 0.3) ?>;">
            <img src="<?php echo $img_url; ?>" class="widget--image-link__image">
            <h2 class="widget--image-link__title" style="<?php echo $title_font; ?>"><?php echo $title; ?></h2>
            <p class="widget--image-link__text" style="<?php echo $text_font; ?>"><?php echo $text; ?></p>
            <a href="<?php echo $button_url; ?>" class="flo-button widget--image-link__button" target="" style="<?php echo $button_font; ?>"><?php echo $button_label; ?></a>
          </div>
        <?php
        echo $args['after_widget'];

      }
    /* END: FRONT END */

    public function form( $instance ) {

    }

  }
 ?>
