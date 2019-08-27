<?php
function floRenderButton ($link = '#', $dataAttr, $classes, $handler, $label) {
  $outputClasse = '';
  $data = NULL;
  foreach ($classes as &$class) {
    $outputClasse .= 'flo-launch__button--' . $class . ' ';
  }
  foreach ($dataAttr as $key => &$value) {
    $data .= ' data-' . $key . '="' . $value . '" ';
  }
  $str  = '<a href="' . $link . '"';
  $str .= 'class="flo-launch__button ' . $outputClasse . '"';
  if ( isset($data) ) {
    $str .= $data;
  }
  $str .= 'data-handler="' . $handler . '">';
  $str .= $label;
  $str .= '</a>';

  return $str;
}

function floRender ($args) {
  $step             = $args[0];
  if ( isset($args[1]) ) {
    $status           = $args[1];
  }
  if ( isset($args[2]) ) {
    $flo_test_mode    = $args[2];
  }
  if ( isset($args[3]) ) {
    $test_mode_prefix = $args[3];
  }

  switch ( $step ) {
    case 'zero':
      if ( $status ) {
        if ( $flo_test_mode !== 'active' ) {
          $str  = '<div class="flo-launch__process__tab flo-launch__process__tab--zero active">';
          $str .=   '<h3 class="flo-launch__process__tab--zero--message">Currently you don\'t have any Clone <br/> Website available or created</h3>';
          $str .=   floRenderButton('#', array(), array('r', 'orange'), 'js-start-process', 'Start Cloning Process' );
          $str .= '</div>';

          return $str;
        }
      }
      return null;
      break;
    case '1':
      $str  = '<div data-step="' . $step . '" class="flo-launch__process__tab">';
      $str .=   '<div class="flo-launch__process__tab--head">';
      $str .=     '<span class="flo-launch__process__tab--step">' . $step . '</span>';
      $str .=     '<h2 class="flo-launch__process__tab--title">Compatibility check</h2>';
      $str .=   '</div>';
      if ( $status ) {
        $str .=   '<div class="flo-launch__process__tab--body">';
        $str .=     '<div class="flo-launch__process__tab--message">';
        $str .=       'Before making a clone site, your server configutation will be verified to ensure it supports clone site creation without any issues.';
        $str .=     '</div>';
        $str .=     floRenderButton('#', array(), array('s', 'white'), 'js-open-compatibility-popup', 'Start Compatibility Check' );
        $str .=   '</div>';
      }
      $str .= '</div>';
      return $str;
      break;
    case '2':
      $str = '<div data-step="' . $step . '" class="flo-launch__process__tab">';
      $str .= '<div class="flo-launch__process__tab--head">';
      $str .=   '<span class="flo-launch__process__tab--step">' . $step . '</span>';
      $str .=   '<h2 class="flo-launch__process__tab--title">Create Backup</h2>';
      $str .= '</div>';
      if ( $status ) {
        $str  .= '<div class="flo-launch__process__tab--body">';
        $str  .=  '<div class="flo-launch__process__tab--message">';
        $str  .=    'We recommend making a database backup before proceeding with the clone site creation. <br/>';
        $str  .=    'Note that it is highly recommended to have a working copy of your website data in case anything goes wrong.';
        $str  .=  '</div>';
        $str  .=  floRenderButton('#', array(), array('s', 'white'), 'js-create-backup', 'Create Backup' );
        $str  .=  '<div class="flo-launch__information--wrapper">';
        $str  .=    '<div class="flo-launch__information--label">Progress:</div>';
        $str  .=    '<div id="information" class="flo-launch__information"></div>';
        $str  .=  '</div>';
        $str  .=  '<div class="flo-launch__progressbar--wrapper">';
        $str  .=    '<div id="progressbar" class="flo-launch__progressbar">0%</div>';
        $str  .=  '</div>';
        $str  .=  '<div class="flo-launch__backup--success">';
        // $str  .=    floRenderButton('#', array(), array('s', 'white', 'icons'), 'js-download-backup', 'Download Backup' );
        $str  .=    '<a href="#" class="flo-launch__button flo-launch__button--s flo-launch__button--white flo-launch__button--icons" data-handler="js-download-backup" download>';
        $str  .=      '<i class="flo-launch-icon-backup"></i>';
        $str  .=      'Download Backup';
        $str  .=      '<div class="flo-launch__tooltip--wrapper">';
        $str  .=        '<div class="flo-launch__tooltip">The backup file was saved to your server ( TODO::path ). You can aslo download it directly to your computer for quicker access</div>';
        $str  .=        '<i class="flo-launch-icon-question"></i>';
        $str  .=      '</div>';
        $str  .=    '</a>';
        $str  .=    floRenderButton('#', array(), array('s', 'orange'), 'js-open-step-clone', 'Proceed to step 3' );
        $str  .=  '</div>';
        $str  .=  '<div class="flo-launch__backup--error">';
        $str  .=    floRenderButton('https://flothemes.com/submit-a-ticket', array(), array('s', 'white'), '', 'Contact Support to continue' );
        $str  .=    floRenderButton('#', array(), array('s', 'orange'), 'js-open-step-clone', 'Skip Backup' );
        $str  .=  '</div>';
        $str  .= '</div>';
      }
      $str  .= '</div>';

      return $str;
      break;
    case '3':
      $str = '<div data-step="' . $step . '" class="flo-launch__process__tab">';
      $str .=   '<div class="flo-launch__process__tab--head">';
      $str .=     '<span class="flo-launch__process__tab--step">' . $step . '</span>';
      $str .=     '<h2 class="flo-launch__process__tab--title">Create Clone Website</h2>';
      $str .=   '</div>';
      if ( $status ) {
        $str .=   '<div class="flo-launch__process__tab--body">';
        $str .=     '<div class="flo-launch__process__tab--message">';
        $str .=           'Great! Your website is compatible with FloLaunch.<br/>';
        $str .=           'Start creating your clone site by clicking the button below.<br/>';
        $str .=           'Note: Once the clone mode is created, the page will be refreshed and you will need to log in again.';
        $str .=     '</div>';
        $str  .=    floRenderButton('#', array(), array('r', 'black'), 'js-clone-site', 'Create Clone Mode' );
        $str .=     '<div class="flo-launch__information--wrapper">';
        $str .=       '<div class="flo-launch__information--label">Progress:</div>';
        $str .=       '<div id="flo-launch__clone-information" class="flo-launch__information"></div>';
        $str .=     '</div>';
        $str .=     '<div class="flo-launch__progressbar--wrapper">';
        $str .=       '<div id="flo-launch__clone-progressbar" class="flo-launch__progressbar">0%</div>';
        $str .=     '</div>';
        $str .=   '</div>';
      }
      $str .= '</div>';

      return $str;
      break;
    case '4':
      if ( $status ) {
        $flo_test_mode_progress = 'active';
      } else {
        $flo_test_mode_progress = 'disabled';
      }
      $str  = '<div data-step="' . $step . '" class="flo-launch__process__tab ' . $flo_test_mode_progress . '">';
      $str .=   '<div class="flo-launch__process__tab--head">';
      $str .=     '<span class="flo-launch__process__tab--step">' . $step . '</span>';
      $str .=     '<h2 class="flo-launch__process__tab--title">Make Changes</h2>';
      $str .=   '</div>';
      if ( $status ) {
        $str .=   '<div class="flo-launch__process__tab--body ' . $flo_test_mode_progress . '">';
        $str .=     '<div class="flo-launch__process__tab--message">';
        if ( $flo_test_mode === 'active' ) {
          $str .=       'You are now in the Clone Mode. All the changes you make in this mode will affect only the Clone site, not your Live site. If you need to make any changes on your Live site, you need to disable Clone Mode. In case you would like to delete the Clone site, disable Clone Mode and you will see the option to remove Clone site right in this area. When your Clone site is ready for launch, proceed to Launch step.';
          $str .=     '</div>';
          $str  .=    floRenderButton('#', array(), array('r', 'orange'), 'js-disable-clone-mode', 'Disable Clone Mode' );
          $str  .=    floRenderButton('#', array(), array('s', 'white'), 'js-open-step-launch', 'Proceed to Step 5 — Launch' );
        } else {
          $str .=       'You are now in Live site mode. The changes that you make now will be applied to your Live site and won’t be applied to the Clone site. You can enable Clone mode to get back to your new site population. You can launch the new site only being in Clone mode.';
          $str .=     '</div>';
          $str  .=    floRenderButton('#', array('prefix' => $test_mode_prefix), array('r', 'orange'), 'js-enable-clone-mode', 'Enable Clone Mode' );
          $str  .=    floRenderButton('#', array(), array('s', 'white'), 'js-confirm-delete', 'Delete Clone Mode' );
        }
        $str .= '</div>';
      } else {
        $str .= '';
      }
      $str .= '</div>';
      if ( $status ) {
        if ( $flo_test_mode !== 'active' ) {
          $str .= '<div class="flo-launch__confirmation__popup">';
          $str .=   '<div class="flo-launch__confirmation__popup--inner">';
          $str .=   '<h1 class="flo-launch-activation-pretitle">Please confirm the action</h1>';
          $str .=   '<h1 class="flo-launch__confirmation__popup-title">Delete Clone Site</h1>';
          $str .=   '<div class="flo-launch__confirmation__popup-message">';
          $str .=     'You have selected to remove the Clone Site you have been working on. This action will not affect your Live site. After the current Clone Site is deleted, you will be able to start from scratch and create a new one.';
          $str .=     '</div>';
          $str .=     floRenderButton('#', array(), array('r', 'orange'), 'js-delete-clone-mode', 'Delete Clone Mode' );
          $str .=     floRenderButton('#', array(), array('r', 'white'), 'js-cancel-delete', 'Cancel' );
          $str .=   '</div>';
          $str .= '</div>';
        }
      }

      return $str;
      break;
    case '5':
      $str = '<div data-step="' . $step . '" class="flo-launch__process__tab">';
      $str .=   '<div class="flo-launch__process__tab--head">';
      $str .=     '<span class="flo-launch__process__tab--step">' . $step . '</span>';
      $str .=     '<h2 class="flo-launch__process__tab--title">Launch</h2>';
      $str .=   '</div>';
      if ( $status && $flo_test_mode === 'active' ) {
        $str .=   '<div class="flo-launch__process__tab--body">';
        $str .=     '<div class="flo-launch__process__tab--message">';
        $str .=       'You are all set up and ready to launch the new site. The site launch process will be similar to the steps 1-3 above and will consists of pre-launch compatibility check, backup creation and new site launch. If anything goes wrong after the new site (Clone Site) is launched, you will have an option to revert to previous site (that is Live site now).';
        $str .=     '</div>';
        $str .=     floRenderButton('#', array(), array('r', 'black'), 'js-back-to-edit', 'Go back' );
        $str .=     floRenderButton('#', array(), array('r', 'orange'), 'js-open-compatibility-popup', 'Launch Site' ); // js-launch-clone-mode
        $str .=   '</div>';
      }
      $str .= '</div>';

      return $str;
      break;
    case 'launch':
      if ( $status ) {
          $str  = '<div class="flo-launch__process__tab flo-launch__process__tab--zero active">';
          $str .=   '<h3 class="flo-launch__process__tab--zero--message">Currently you don\'t have any Clone <br/> Websites available or created</h3>';
          $str .=   floRenderButton('#', array(), array('r', 'orange'), 'js-start-process', 'Start Cloning Process' );
          $str .=   floRenderButton('#', array(), array('r', 'black'), 'js-revert-launch', 'Revert back' );
          $str .= '</div>';

          if ( isset($_GET['flo-status']) ) {
            if ( $_GET['flo-status'] === 'launched' ) {
              $str .= '<div class="flo-launch__confirmation__popup in">';
              $str .=   '<div class="flo-launch__confirmation__popup--inner">';
              $str .=   '<h1 class="flo-launch-activation-pretitle">Clear Cache</h1>';
              $str .=   '<h1 class="flo-launch__confirmation__popup-title">You\'ve succesfully launched the site</h1>';
              $str .=   '<div class="flo-launch__confirmation__popup-message">';
              $str .=     'We highly recommend to clear the server side cache. Since currently both old and new site are cached at your server, removing the cache will provide seamless launch of the new site. Just click [Clear Cache] button below and the static files will be regenerated immediately.';
              $str .=     '</div>';
              $str .=     floRenderButton('#', array(), array('r', 'orange'), 'js-clear-cache', 'Clear Cache' );
              $str .=   '</div>';
              $str .= '</div>';
            }
          }

          return $str;
      }

      return NULL;
      break;
  }
}
