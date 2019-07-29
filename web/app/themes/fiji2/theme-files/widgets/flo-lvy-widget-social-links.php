<?php
  function flo_lvy_widget_social_links_load() {
    register_widget( 'flo_lvy_widget_social_links' );
  }
  add_action( 'widgets_init', 'flo_lvy_widget_social_links_load' );

  class flo_lvy_widget_social_links extends WP_Widget {

    function __construct() {
      parent::__construct(

      // Base ID of your widget
      'flo_lvy_widget_social_links',

      // Widget name will appear in UI
      __('Fiji Social Links', 'flo'),

      // Widget description
      array( 'description' => __( 'Displays Social Links.', 'flo' ), )

      );
    }

    /* START: FRONT END */
      public function widget( $args, $instance ) {
        // before and after widget arguments are defined by themes
        // widget div open tag: echo $args['before_widget'];
        // widget div closing tag: echo $args['after_widget'];
        // pulling all widget data
        $elements_color = get_field('social_links_elements_color', 'widget_'.  $args['widget_id']);
        $background_color = get_field('social_links_background_color', 'widget_'.  $args['widget_id']);

        $pretitle = get_field('social_links_pretitle', 'widget_'.  $args['widget_id']);
        $pretitle_font = get_field('social_links_pretitle_font', 'widget_'.  $args['widget_id']);
        $pretitle_font = flo_data($pretitle_font, "default");
        $title = get_field('social_links_title', 'widget_'.  $args['widget_id']);
        $title_font = get_field('social_links_title_font', 'widget_'.  $args['widget_id']);
        $title_font = flo_data($title_font, "default");
        $social_links = flo_get_option('flo-social-links','');
        $social_links_style = flo_get_option('flo-lovely2-social-links-style', 'a');

        echo $args['before_widget']; ?>
          <div class="widget--social-links__main-wrap" style="color: <?php echo $elements_color; ?>; background-color: <?php echo $background_color ?>;">

            <h3 class="widget--social-links__pretitle" style="<?php echo $pretitle_font ?>"><?php echo $pretitle; ?></h3>
            <h2 class="widget--social-links__title" style="<?php echo $title_font ?>"><?php echo $title; ?></h2>
            <div class="widget--social-links__wrap">
              <?php

              foreach($social_links as $key => $social_profile) {
                if($social_profile['type']['value'] == 'custom') { ?>
                  <a href="<?php echo $social_profile['link']; ?>" target="_blank" class="  flo-social-links--link-custom flo-social-links__link-label ">
                    <?php if(isset($social_profile['custom-icon']) && strlen($social_profile['custom-icon']) ) { ?>
                      <img src="<?php echo $social_profile['custom-icon']; ?>" class="flo-footer__social-custom-icon"/>
                    <?php } else {
                      echo $social_profile['custom-label'];
                    } ?>
                  </a>
                <?php } else {
                  if($social_links_style == 'b') {
                    $social_letters = ' flo-social-links-type-b__link ';
                  } else {
                    $social_letters = '';
                  } ?>
                  <a href="<?php echo $social_profile['link']; ?>" target="_blank" class="flo-icon flo-icon-<?php echo $social_profile['type']['value'], $social_letters; ?> flo-social-links__link"></a>
                <?php }
              } ?>
            </div>
          </div>
        <?php echo $args['after_widget'];

      }
    /* END: FRONT END */

    public function form( $instance ) {

    }

  }
 ?>
