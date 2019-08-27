<div class="flo-launch-walkthrough-popup--wrapper">
  <div class="flo-launch-walkthrough-popup--close-area"></div>
  <div class="flo-launch-walkthrough-popup--inner">

    <div class="flo-launch-walkthrough-popup--head">
      <h2 class="flo-launch_settings--name">Compatibility Check</h2>
      <div class="flo-launch__compatibility-steps-navigation active">
        <div class="flo-launch__compatibility-steps-navigation-item" data-index="1">1</div>
        <div class="flo-launch__compatibility-steps-navigation-item" data-index="2">2</div>
        <div class="flo-launch__compatibility-steps-navigation-item" data-index="3">3</div>
      </div>
      <a href="#" class="flo-launch_settings--close" data-handler="js-close-compatibility-popup">Return to dashboard</a>
    </div>
    <div class="flo-launch-walkthrough-popup--body">
      <div class="flo-launch__compatibility-steps-navigation flo-launch__compatibility-steps-navigation--side">
        <div class="flo-launch__compatibility-steps-navigation-item flo-launch__compatibility-steps-navigation-item--side" data-index="1"><i class="flo-launch__compatibility-icon flo-launch-icon-validation"></i>SSL configuration</div>
        <div class="flo-launch__compatibility-steps-navigation-item flo-launch__compatibility-steps-navigation-item--side" data-index="2"><i class="flo-launch__compatibility-icon flo-launch-icon-validation"></i>PHP Version</div>
        <div class="flo-launch__compatibility-steps-navigation-item flo-launch__compatibility-steps-navigation-item--side" data-index="3"><i class="flo-launch__compatibility-icon flo-launch-icon-validation"></i>Memory limit</div>
        <div class="flo-launch__compatibility-steps-navigation-item flo-launch__compatibility-steps-navigation-item--side" data-index="4"><i class="flo-launch__compatibility-icon flo-launch-icon-validation"></i>Config file permissions</div>
        <div class="flo-launch__compatibility-steps-navigation-item flo-launch__compatibility-steps-navigation-item--side" data-index="5"><i class="flo-launch__compatibility-icon flo-launch-icon-validation"></i>Uploads directory permissions</div>
        <div class="flo-launch__compatibility-steps-navigation-item flo-launch__compatibility-steps-navigation-item--side" data-index="6"><i class="flo-launch__compatibility-icon flo-launch-icon-validation"></i>Available Disk space</div>

        <div class="flo-launch__compatibility-backup-step">
          <div class="flo-launch__information--wrapper">
            <div class="flo-launch__information--label">Progress:</div>
            <div id="information" class="flo-launch__information"></div>
          </div>
          <div class="flo-launch__progressbar--wrapper">
            <div id="progressbar" class="flo-launch__progressbar">0%</div>
          </div>

          <div class="flo-launch__compatibility-cache-step">
          </div>
        </div>
      </div>
      <div class="flo-launch__compatibility-steps--info-wrapper">
        <div class="flo-launch__compatibility-steps--info-step active" data-index="default">
          <h3 class="flo-launch__compatibility-steps--info-step--title">Launch Compatibility Check is in progress</h3>
          <div class="flo-launch__compatibility-steps--info-step--message">Before launch a clone site, your server configutation will be verified to ensure it supports clone site creation without any issues.</div>
        </div>
        <div class="flo-launch__compatibility-steps--info-step" data-index="1">
          <div class="flo-launch__compatibility-steps--error-message">
            <i class="flo-launch-icon-error"></i>
            <div class="flo-launch__compatibility--error-message">
              Error
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Problem:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">SSL issue</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">

              We have detected that your website has SSL but is not configured properly to work with it.
              Most likely all website resources are still being loaded from a non-secure source.<br/>
              This issue results in scripts not being able to be executed, which will affect your whole website,<br/>
              so it is highly recommended to properly configure your resource requests.<br/>
              <br/>
              If an image is requested from a secure environment (HTTPS/SSL), the server will block it due to security concerns.<br/>
              For example, one of your posts might request an image with the URL: "<b>http://</b>yoursite.com/image.jpg"
              For it to be loaded it needs to have the following URL: "<b>https://</b>yoursite.com/image.jpg"<br/>
              <br/>
              This issue can be solved by replacing all http occurrences in the database with https.<br/>
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 1:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Get SSL service package</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              Our Services team can help you to sort out any SSL and HTTPS related issues or conflicts.
              <a href="https://flothemes.com/seo-services/" class="flo-launch__button flo-launch__button--s flo-launch__button--white flo-launch__button--border" target="_blank">Find out More</a>
            </div>
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 2:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Contact Hosting provider</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              In most cases, hosting providers offers SSL implementation and configuration free of charge.
            </div>
          </div>
        </div>
        <div class="flo-launch__compatibility-steps--info-step" data-index="2">
          <div class="flo-launch__compatibility-steps--error-message">
            <i class="flo-launch-icon-error"></i>
            <div class="flo-launch__compatibility--error-message">
              Error
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Problem:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">PHP version</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              Your server runs a deprecated PHP version <b>(<?php echo phpversion(); ?>)</b>. <br/>
              <br/>
              The minimum recommended version is 5.6.<br/>
              If your server runs a lower version, FloThemes products might not work as expected.<br/>
              <br/>
              <strong style="color: red;">TODO:: check hosting NS</strong><br/>
              <strong style="color: red;">TODO:: wrappers</strong>
            </div>
          </div>

          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 1:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Contact Hosting Provider</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              Ask your hosting provider to set your server PHP version to at least <b>5.6</b> (<b>7.0</b> recommended).
              <br/>
              <br/>
            </div>
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 2:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Change PHP Version Yourself</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              Most hosting providers have tutorial articles on how to change the PHP version for your server/installation.<br/>
              Below is a link to an article containing relevant tutorial resources to the most common hosting providers.
              <a href="https://docs.flothemes.com/fiji-2/#changing-php-version/"
                class="
                  flo-launch__button
                  flo-launch__button--s
                  flo-launch__button--white
                  flo-launch__button--border
                "
                target="_blank"
              >
                Read More
              </a>
            </div>
          </div>

        </div>
        <div class="flo-launch__compatibility-steps--info-step" data-index="3">
          <div class="flo-launch__compatibility-steps--error-message">
            <i class="flo-launch-icon-error"></i>
            <div class="flo-launch__compatibility--error-message">
              Error
            </div>
          </div>

        </div>
        <div class="flo-launch__compatibility-steps--info-step" data-index="4">
          <div class="flo-launch__compatibility-steps--error-message">
            <i class="flo-launch-icon-error"></i>
            <div class="flo-launch__compatibility--error-message">
              Error
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Problem:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Memory Limit too Low</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              Your server memory limit value (<?php echo 'todo memory limit val' ?>) is below the recommended value (256MB).
              The memory limit value is the maximum amount of resources the server allocates for executing a script.<br/>
              <br/>
              If a script does not have enough memory for being executed, the whole website will crash.<br/>
              <br/>
              <strong style="color: red;">TODO:: rewrite mihai's genius code (flo_PHP_memory_limit function)</strong>
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Contact Hosting Provider</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              Ask your hosting provider to set your server memory limit value to at least <b>256MB</b> (<b>512MB</b> recommended).
            </div>
          </div>
        </div>
        <div class="flo-launch__compatibility-steps--info-step" data-index="5">
          <div class="flo-launch__compatibility-steps--error-message">
            <i class="flo-launch-icon-error"></i>
            <div class="flo-launch__compatibility--error-message">
              Error
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Problem:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Restrictive File Permissions</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              FloLaunch is unable to edit the WordPress config file (<b>wp-config.php</b>).<br/>
              <br/>
              The clone mode cannot be successfully created without write permissions.<br/>
              Because of that, FloLaunch will not be able to provide a connection to the clone mode database.
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 1:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Modify file permissions via FTP</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              If you are familiar with server files editing via an FTP client (FileZilla) or your server file manager,
              try setting the wp-config.php file permissions as recommended by WordPress.
              <a href="https://wordpress.org/support/article/changing-file-permissions/"
                class="
                  flo-launch__button
                  flo-launch__button--s
                  flo-launch__button--white
                  flo-launch__button--border
                "
                target="_blank"
              >
                Read More
              </a>
            </div>

            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 2:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Contact Hosting Provider</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              If you are not aware how to modify files or their permissions,
              it's better to ask your hosting provider to enable write permissions for the <b>wp-config.php</b> file.
            </div>
          </div>
        </div>
        <div class="flo-launch__compatibility-steps--info-step" data-index="6">
          <div class="flo-launch__compatibility-steps--error-message">
            <i class="flo-launch-icon-error"></i>
            <div class="flo-launch__compatibility--error-message">
              Error
            </div>
          </div>

          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Problem:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Uploads folder not editable</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              FloLaunch is unable to upload files to your website uploads directory (<b>/wp-content/uploads/</b>).<br/>
              <br/>
              This folder must be writable in order to save backups and logs if enabled.<br/>
              <br/>
              <p style="color: red;">NOT MANDATORY! PROVIDE OPTION TO SKIP!</p>
              <p style="color: red;">IGNORE GEORGE, HE DOESN'T KNOW WHAT HE'S TALKING ABOUT!</p>
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 1:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Modify folder permissions via FTP</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              If you are familiar with server files editing via an FTP client (FileZilla) or your server file manager,
              try setting the <b>uploads</b> folder permissions as recommended by WordPress.
              <a href="https://wordpress.org/support/article/changing-file-permissions/"
                class="
                  flo-launch__button
                  flo-launch__button--s
                  flo-launch__button--white
                  flo-launch__button--border
                "
                target="_blank"
              >
                Read More
              </a>
            </div>

            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 2:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Contact Hosting Provider</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              If you are not aware how to modify files or their permissions,
              it's better to ask your hosting provider for assistance.
            </div>
          </div>
        </div>
        <div class="flo-launch__compatibility-steps--info-step" data-index="7">
          <div class="flo-launch__compatibility-steps--error-message">
            <i class="flo-launch-icon-error"></i>
            <div class="flo-launch__compatibility--error-message">
              Error
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Problem:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Not enough disk space</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              There is no enough space to upload your database backup.<br/>
              Please increase the storage limits for your server or delete unused contents from your website to free up space.
            </div>
          </div>
          <div class="flo-launch__compatibility-steps--info-step-column">
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 1:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Delete unused files from your server via FTP</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              If you are familiar with server files editing via an FTP client (FileZilla) or your server file manager,
              you can browse your server files and delete old and unused files.
              These are usually old photos, outdated backups etc.
              <a href="https://docs.flothemes.com/fiji-2/#ftp-file-manager-use/"
                class="
                  flo-launch__button
                  flo-launch__button--s
                  flo-launch__button--white
                  flo-launch__button--border
                "
                target="_blank"
              >
                Read More
              </a>
            </div>
            <h4 class="flo-launch__compatibility-steps--info-step--pretitle">Solution 2:</h4>
            <h3 class="flo-launch__compatibility-steps--info-step--title">Contact Hosting Provider</h3>
            <div class="flo-launch__compatibility-steps--info-step--message">
              Contact your Hosting Provider and ask them to increase the storage limits for your server or clean up unused contents.
            </div>
          </div>
        </div>
        <div class="flo-launch__compatibility-steps--info-step launchmode" data-index="final">
          <h3 class="flo-launch__compatibility-steps--info-step--title">Create a Backup</h3>
          <h3 class="flo-launch__compatibility-steps--info-step--title done">Congratulations! Your new site is ready.</h3>
          <div class="flo-launch__compatibility-steps--info-step--message">Maecenas faucibus mollis interdum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nullam id dolor id nibh ultricies vehicula ut id elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</div>
          <div class="flo-launch__compatibility-steps--info-step--message done">As soon as you click [Finish Launch Process] button below, you will be logged out. You will need to login back to get access to the updated backend resources. Please note that in FloLaunch settings you will have an option to revert back to your old site (until you create a new clone site).</div>
          <?php
            echo floRenderButton('#', array(), array('s', 'white', 'border'), 'js-create-full-backup', 'Create Backup' );
          ?>

          <div class="flo-launch__backup--success">
            <a href="#" class="flo-launch__button flo-launch__button--s flo-launch__button--white flo-launch__button--border flo-launch__button--icons" data-handler="js-download-backup" download>
              <i class="flo-launch-icon-backup"></i>
              Download Backup
              <div class="flo-launch__tooltip--wrapper">
                <div class="flo-launch__tooltip">The backup file was saved to your server ( TODO::path ). You can aslo download it directly to your computer for quicker access</div>
                <i class="flo-launch-icon-question"></i>
              </div>
            </a>
          </div>
          <?php
            echo floRenderButton('#', array(), array('r', 'orange', 'hidden'), 'js-launch-clone-mode', 'Finish Launch Process' );
          ?>
        </div>
      </div>
    </div>
    <div class="flo-launch-walkthrough-popup--footer backup">
      <div class="flo-launch-walkthrough-popup--process">
        <h3 class="flo-launch-walkthrough-popup--status"></h3>
        <?php
          echo floRenderButton('#', array(), array('r', 'orange'), 'js-proceed-to-launch', 'Proceed to Launch Step' );
        ?>

      </div>
    </div>

  </div>
</div>
