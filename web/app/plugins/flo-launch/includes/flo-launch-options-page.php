<?php
  include_once('flo-launch-render.php');

  $test_mode_prefix = flo_launch_get_db_option('last_active_prefix');
  $flo_status       = flo_launch_get_db_option('flo_status');

  /**
  * @param array $render - Side Step Render
  */
  $render = array();
  $render['1'] = $flo_status === 'start_process' ? true : false;
  $render['2'] = $flo_status === 'in_progress' ? true : false;
  $render['3'] = $flo_status === 'launched' ? true : false;

  $flo_test_mode = (isset($_COOKIE["flo_custom_table_prefix"]) && $_COOKIE["flo_custom_table_prefix"] != "") ? 'active' : 'disabled';

 ?>

<div class="flo-launch_settings_wrapper">
  <div class="flo-launch_settings_wrapper--header">
    <h2 class="flo-launch_settings--name">
      FloLaunch Plugin
      <span>Version <?php echo $this->version ?></span>
    </h2>
    <?php if ( isset($test_mode_prefix) && !empty($test_mode_prefix) && !$render['3'] ) { ?>
      <div class="flo-launch__switcher">
        <div class="flo-launch__switcher-title <?php echo $flo_test_mode; ?>">Clone Mode Status</div>
            <div class="flo-launch__switcher--wrapper">
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


  <div class="flo-launch_settings_wrapper--body">
    <div class="flo-launch__process__wrapper">
      <div class="flo-launch__process__wrapper--left-area">
        <div class="flo-launch__process__info__tabs--navigation">
          <a href="#" data-index="1" class="flo-launch__process__info__tabs--nav active" data-handler="js-activate-info-tab">Overview</a>
          <a href="#" data-index="2" class="flo-launch__process__info__tabs--nav" data-handler="js-activate-info-tab">Process</a>
          <a href="#" data-index="3" class="flo-launch__process__info__tabs--nav" data-handler="js-activate-info-tab">Features & Details</a>
        </div>
        <div class="flo-launch__process__info__tabs--wrapper">
          <div data-index="1" class="flo-launch__process__info__tab active">
            <h2 class="flo-launch__process__info__tab--title">Get your new site setup and fully tested without any down-time - use FloLaunch by Flothemes</h2>
            <div class="flo-launch__process__info__tab--body">
              <div class="flo-launch__video__wrapper">
                <div class="flo-launch__video__overlay">
                  <img class="flo-launch__video__preview--image" src="https://img.youtube.com/vi/Hf1-9saCJUI/maxresdefault.jpg">
                                    <a class="flo-launch__video--play" data-handler="js-play-video">
                                      <span>
                                        <i class="flo-launch-icon-right-dir"></i>
                                      </span>
                                    </a>
                </div>
                <div class="flo-launch__video--embed">
                  <iframe width="800" height="500" data-src="https://www.youtube.com/embed/Hf1-9saCJUI/?autoplay=1" src="" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                </div>
              </div>
              <div class="flo-launch__process__info__tab--body--text">
                  When you get a new theme from Flothemes and get it installed (not activated yet), you can use FloLaunch plugin to work on the new site, create new pages and content, without your live site being affected. We create a copy of the live site database and give you access to the cloned site that is available only from your Admin Panel and not visible to your site users. When you get the cloned site updated and prepared for launch, you publish it and it replaces your previous site. Let’s go through all steps of the process.
                </div>
            </div>
          </div>
          <div data-index="2" class="flo-launch__process__info__tab">
            <h2 class="flo-launch__process__info__tab--title">Get your new site setup and fully tested without any down-time - use FloLaunch by Flothemes</h2>
            <div class="flo-launch__process__info__tab--body">
              <div class="flo-launch__process__info__tab--body--column">
                <h3 class="flo-launch__process__info__tab--body--title">Step 1 - Compatibility checker</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  Before we start making any changes or cloning, we need to ensure that your server configuration is correct and no issues will appear during the process. At this stage we check your PHP version, space availability, SSL certificate, plugins that can cause potential issues. If the compatibility check is passed, the next steps are safe to be executed. In case any setting doesn’t correspond to FloLaunch minimum requirements, you will be notified and the options to solve the conflict will be suggested. Once all the requirements are met, you will proceed to the next step.
                </div>
                <h3 class="flo-launch__process__info__tab--body--title">Step 2 - DB backup</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  In order to make things even safer, we suggest to make a backup of your current site database. It will automatically be saved at your hosting account (WordPress uploads directory), however after the backup is created you also have an additional option to download it to your computer. Having the backup on hand will help in case of urgency, since Flothemes support or the hosting support can use it to revert the site back.
                </div>
                <h3 class="flo-launch__process__info__tab--body--title">Step 3 - Clone mode creation</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  Now, when all compatibility tests are passed and the site database backup is created, the site clone can be created. The duration of the process varies depending on your server configuration, performance, free space etc. Finally you will get an option to activate the Clone Site.
                </div>
              </div>
              <div class="flo-launch__process__info__tab--body--column">
                <h3 class="flo-launch__process__info__tab--body--title">Step 4 - Working on the content</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  As soon as you have Clone Mode created, there are two environments where you can work - your current live site and the new clone mode site that is visible only for you. Note that you can also tweak live site contents the same way you did before creating the clone mode. You will however need to disable the clone mode to access your live site. This is possible by switching between the live and clone modes that will be available for you from any page in the backend. The clone mode will be indicated with a different WP skin so you can always be sure what site you currently work with. While you work with the clone site, you can build absolutely new menu and pages structure, add new types of content, use different fonts and colors - there is no limit of what you can do here while your live site remains unchanged. Avoid deleting the files like images, plugins, themes, etc. since these are unique and deleting them in the clone mode will affect your live site. When the clone site is ready to replace the old live site, you can advance to the final step.
                </div>
                <h3 class="flo-launch__process__info__tab--body--title">Step 5 - Launching the new site</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  At this step you will go through the stages that are similar to steps 1, 2 and 3 above. First, we will make a quick compatibility check that is required in case any settings were changed during the new site setup process. After the test is passed, we will make a backup of the current site database (that allows quickly reverting the clone mode publishing process if necessary).
                  <br> The third and final step is the clone site launch process itself: This step enables public access to your test mode site (which now becomes your new live site) and disables access to your previous site version. Since this process happens in a matter of seconds, no downtime will occur.
                  <br> At this step, FloLaunch will also attempt to clear any known caching data to ensure the most consistent and up-to-date rendered version of your site.
                </div>
              </div>
            </div>
          </div>
          <div data-index="3" class="flo-launch__process__info__tab">
            <h2 class="flo-launch__process__info__tab--title">Get your new site setup and fully tested without any down-time - use FloLaunch by Flothemes</h2>
            <div class="flo-launch__process__info__tab--body">
              <div class="flo-launch__process__info__tab--body--column">
                <h3 class="flo-launch__process__info__tab--body--title">Zero downtime</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  Building a new site is always a complicated process. It’s impossible to make it very fast and keep the process invisible for your users. You need to setup a new site at a staging server (if your hosting provides it) or keep your site in “under construction” mode for days.  The main idea of FloLaunch is to give you the environment where you can create a new site using the existing content with no stress and time pressure and launch it in 1 second without any down-time.
                </div>
                <h3 class="flo-launch__process__info__tab--body--title">Private site access</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  As soon as the Clone Site is created, it will act as the private copy for your live site. From this point onwards, you can apply any content changes without these being reflected on the live site. That can be easily confirmed by accessing your site from a browser where you are not logged in as an administrator and did not enable the Clone Mode (incognito browser window). You will see your live site there.
                  <br>
                  Since Clone Mode access is provided via cookies (read more about cookies), these can sometimes expire from your browser and disable Clone Mode access. This is not a cause for concern, since you can manually re-enable the Clone Mode as usual and resume work from where you left off.
                </div>
              </div>
              <div class="flo-launch__process__info__tab--body--column">
                <h3 class="flo-launch__process__info__tab--body--title">Revert back</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  Even when you are 100% sure that you are ready to launch your Clone Site, there are situations when you might change your mind after launching.
                    Note that you can revert your site launch in case you are not satisfied with the results and need some more time to work on your Clone Site before publishing.
                    Reverting will bring your whole site back to the moment right before publishing (this process is similar to restoring a full website files and database backup).
                </div>
                <h3 class="flo-launch__process__info__tab--body--title">Sharing private pages</h3>
                <div class="flo-launch__process__info__tab--body--text">
                  What if you want to share a page of the new site with your friend to get a piece of advice but you don’t want to share your admin credentials? At the top of any page, post or gallery you will see Share Clone Page/Post/Gallery. Clicking this button will generate a private access link to the page, post or gallery. You can copy this link and share it with whom necessary.
                  <br>
                    The link includes specific parameters that make the resource visible only for people you share it with, while other visitors will still see the live site version.
                    <br>
                    Opening this link will provide a one-time Clone Mode access session. This means that the person opening this link for the first time will be able to see how this page looks in the Clone Mode. If this same link will be accessed a second time, it will direct the visitor back to the public site page.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flo-launch__process__wrapper--right-area">
          <?php
            echo floRender( array('zero', $render['1'], $flo_test_mode) );
            echo floRender( array('launch', $render['3']) );
            echo floRender( array('1', ($render['1'] || $render['3']) ) );
            echo floRender( array('2', ($render['1'] || $render['3']) ) );
            echo floRender( array('3', ($render['1'] || $render['3']) ) );
            echo floRender( array('4', $render['2'], $flo_test_mode, $test_mode_prefix) );
            echo floRender( array('5', $render['2'], $flo_test_mode) );
          ?>
        </div>
      </div>
    </div>
  </div>
</div>

<?php
  $render['1'] || $render['3'] ? include_once('flo-launch-walkthrough-popup.php') : NULL;

  $render['2'] ? include_once('flo-launch-finish-popup.php') : NULL;
