<?php
  include_once('flo-launch-render.php');
?>
<div class="flo-launch-activation-popup" style="opacity:0; transition: 0.5s">
  <div class="flo-launch-activation-popup-wrapper">
    <div class="flo-launch-activation-content">
      <a class="flo-ui__popup--close" data-handler="popup-controller"></a>
      <h1 class="flo-launch-activation-pretitle">You're All Set Up.</h1>

      <h1 class="flo-launch-activation-title">You have successfully Activated FloLaunch Plugin.</h1>

      <p class="flo-launch-activation-subtitle">What's next:</p>
      <div class="flo-launch-activation-buttons">
        <?php echo floRenderButton(menu_page_url('flo-launch', false), array(), array('r', 'orange'), '', 'Go to FloLaunch' ); ?>
      </div>
    </div>
  </div>
</div>
