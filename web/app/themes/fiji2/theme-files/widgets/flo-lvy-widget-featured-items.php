<?php
  function flo_lvy_widget_featured_items_load() {
    register_widget( 'flo_lvy_widget_featured_items' );
  }
  add_action( 'widgets_init', 'flo_lvy_widget_featured_items_load' );

  class flo_lvy_widget_featured_items extends WP_Widget {

    function __construct() {
      parent::__construct(

      // Base ID of your widget
      'flo_lvy_widget_featured_items',

      // Widget name will appear in UI
      __('Fiji Featured Items', 'flo'),

      // Widget description
      array( 'description' => __( 'Displays specific posts or galleries.', 'flo' ), )

      );
    }

    /* START: FRONT END */
      public function widget( $args, $instance ) {
        // before and after widget arguments are defined by themes
        // widget div open tag: echo $args['before_widget'];
        // widget div closing tag: echo $args['after_widget'];

        // pulling all widget data
        $title = get_field('featured_items_title', 'widget_'.  $args['widget_id']);
        $title_font = get_field('featured_items_title_font', 'widget_'.  $args['widget_id']);
        $title_font = flo_data($title_font, "default");
        $title_color = get_field('featured_items_title_color', 'widget_'.  $args['widget_id']);
        $items = get_field('featured_items_items', 'widget_'.  $args['widget_id']);
        $items_title_font = get_field('featured_items_items_title_font', 'widget_'.  $args['widget_id']);
        $items_title_font = flo_data($items_title_font, "default");
        $items_title_background_color = get_field('featured_items_items_title_background_color', 'widget_'.  $args['widget_id']);
        $items_title_text_color = get_field('featured_items_items_title_text_color', 'widget_'.  $args['widget_id']);

        echo $args['before_widget']; ?>
          <h2 class="widget--featured-items__title" style="color: <?php echo $title_color ?>; <?php echo $title_font ?>"><?php echo $title; ?></h2>
          <div class="widget--featured-items__wrap">
            <?php foreach ($items as $item){ ?>
            <div class="widget--featured-items__item">
              <?php
                $item_img = get_the_post_thumbnail_url( $item->ID, 'full' );
                if($item_img){
                  $item_img = aq_resize( $item_img, $width = 500, $height = 500, $crop = true, $single = true, $upscale = false );
                }else{
                  $item_img = get_template_directory_uri().'/theme-files/public/img/no-image.jpg';
                }
                $item_src = get_post_permalink($item->ID);
              ?>
              <a href="<?php echo $item_src; ?>" class="widget--featured-items__item-wrap">
                <img src="<?php echo $item_img; ?>" class="widget--featured-items__item-image">
                <h3 class="widget--featured-items__item-title" style="color: <?php echo $items_title_text_color ?>; background-color: <?php echo $items_title_background_color; ?>"><?php echo $item->post_title; ?></h3>
              </a>
            </div>
            <?php } ?>
          </div>
        <?php
        echo $args['after_widget'];
      }
    /* END: FRONT END */

    public function form( $instance ) {

    }

  }
 ?>
