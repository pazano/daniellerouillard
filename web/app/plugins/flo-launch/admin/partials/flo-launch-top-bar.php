<?php

require_once(ABSPATH . 'wp-admin/includes/screen.php');

$post_type = get_post_type();
$post_ID = get_the_ID();
$current_screen = get_current_screen();

$current_screen = isset($current_screen) ? $current_screen : (object) array('base' => 'post');
$test_mode_prefix = flo_launch_get_db_option('last_active_prefix');
$flo_status       = flo_launch_get_db_option('flo_status');
$flo_pass         = flo_launch_get_db_option('flo_launch_pass');

/**
* @param array $render - Side Step Render
*/
$render = array();
$render['1'] = $flo_status === 'start_process' ? true : false;
$render['2'] = $flo_status === 'in_progress' ? true : false;
$render['3'] = $flo_status === 'launched' ? true : false;

$flo_test_mode = (isset($_COOKIE["flo_custom_table_prefix"]) && $_COOKIE["flo_custom_table_prefix"] != "") ? 'active' : 'disabled';

ob_start();
?>
<div class="flo-launch-topbar__wrapper">
  <h2 class="flo-launch-topbar__plugin-name">
    FloLaunch Plugin
    <span class="flo-launch-topbar__plugin-version">Version <?php echo $this->version ?></span>
  </h2>
  <?php
  if ( ( $post_type === 'post' || $post_type === 'page' || $post_type === 'gallery' ) && ( $current_screen->base === 'post') && $flo_test_mode === 'active' ) {
      ?>
      <div class="flo-launch-topbar__share-toggle" data-handler="js-create-share-link" data-pageID="<?php echo $post_ID ?>">
        <i class="flo-launch-icon-share"></i>
        Share clone website
      </div>
      <div class="flo-launch-topbar__pass-wrapper">
        <input class="flo-launch-topbar__pass-input" data-handler="js-copy-pass" readonly data-base="<?php echo 'Access link:: ' . get_permalink() . '?flo_test_mode=1' ?>" value="<?php echo 'Access link:: ' . get_permalink() . '?flo_test_mode=1'; ?>" />
        <span class="flo-launch-topbar__pass-button" data-handler="js-copy-pass">Copy</span>
      </div>
    <?php } ?>

      <a href="#" class="flo-launch__button flo-launch__button--r flo-launch__button--orange" data-handler="js-clear-cache">Clear Cache</a>

    <?php
      if ( isset($test_mode_prefix) && !empty($test_mode_prefix) && !$render['3'] ) { ?>
        <div class="flo-launch-topbar__switcher">
          <div class="flo-launch-topbar__switcher-title <?php echo $flo_test_mode; ?>">Clone Mode Status</div>
              <div class="flo-launch-topbar__switcher--wrapper">
               <label>
                     <input data-handler="js-enable-last-test-mode" type="checkbox" data-prefix="<?php echo $test_mode_prefix; ?>" <?php if( $flo_test_mode == 'active' ) { ?> checked="checked" <?php
                    } ?>>
                 <?php if ( $flo_test_mode == 'active' ) {
                   echo 'Enabled';
                 } else {
                    echo 'Disabled';
                 } ?>
               </label>
             </div>
          </div>
      <?php } ?>
</div>
<?php
$html = ob_get_clean();
$args = array(
  'id'    => 'flo_launch_top_bar',
  'title' => 'Flo Launch',
  'href'  => menu_page_url('flo-launch', false),
  'meta'  => array(
    'class' => 'flo-launch-topbar-page',
    'html' => $html
  )
);
$wp_admin_bar->add_node( $args );
