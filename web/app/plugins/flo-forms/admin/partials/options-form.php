<?php
  $plugin_path = dirname(__FILE__) . '/../../flo-forms.php';

  $plugin_data = get_plugin_data($plugin_path);

  $settings_url = admin_url('admin.php?page=flo_forms_settings');

  if($plugin_data['Name'] == 'Flo Forms Pro') {
    $is_pro_version = true;
  }else{
    $is_pro_version = false;
  }

  // add below new tabs if necessary
  $tabs = array('settings', 'test-email-tab');
  $tabs_class = array('settings' => '', 'test-email' => '');

  if($is_pro_version) {
    $tabs[] = 'custom_fonts';
    $tabs_class['custom_fonts'] = '';
  }


  if( isset($_GET['tab']) && isset($tabs_class[$_GET['tab']]) ) {

    $tabs_class[$_GET['tab']] = ' active ';
  }else {
    // else set the first tab as active
    $tabs_class['settings'] = ' active ';
  }

  $captcha_settings_class = '';
  if( !(isset($forms_options['enable-captcha']) && $forms_options['enable-captcha'] == 1 ) ) {
    $captcha_settings_class = 'hidden';
  }

  $email_reminder_options_class = '';
  if($forms_options['enable_email_reminder'] != 1) {
    $email_reminder_options_class = 'display: none;';
  }

?>
<div class="flo-forms-settings--title"><?php echo sprintf (__('%s Settings','flo-forms'), $plugin_data['Name']) ?></div>
<div class="flo-forms-settings--version"><?php  echo sprintf(__('Version %s','flo-forms'), $plugin_data['Version']) ?></div>
<div class="flo-forms-settings">

  <div class="flo-forms-settings--tabs">
    <div class="tab settings-tab  <?php echo $tabs_class['settings'] ?>">
      <a href="<?php echo $settings_url ?>&tab=settings"><?php _e('Settings','flo-forms') ?></a>
    </div>
    <div class="tab test-email-tab <?php echo $tabs_class['test-email'] ?>">
      <a href="<?php echo $settings_url ?>&tab=test-email"><?php _e('Test email','flo-forms') ?></a>
    </div>
    <?php if($is_pro_version): ?>
      <div class="tab custom_fonts-tab  <?php echo $tabs_class['custom_fonts'] ?>">
        <a href="<?php echo $settings_url ?>&tab=custom_fonts"><?php _e('Custom Fonts','flo-forms') ?></a>
      </div>
    <?php endif; ?>
  </div>

	<form method="post" action="options.php">
    <div class="settings-tab-content tab-content <?php echo $tabs_class['settings'] ?>">
      <div class="send-test-email">

      </div>

        <?php wp_nonce_field('update-options') ?>


      <div class="options-row flex border-bottom">
        <h4 class="options-row--label"><?php _e('Email as plain text instead html','flo-forms'); ?></h4>

        <div class="options-row--hint">

        </div>
        <div class="options-row--settings">
          <label>
            <input type="radio" name="flo_forms_options[text_email]" <?php checked( $forms_options['text_email'], '1' ); ?> value="1">
            <?php _e('Yes','flo-forms'); ?>
          </label>
          <label>
            <input type="radio" name="flo_forms_options[text_email]" <?php checked( $forms_options['text_email'], '0' ); ?> value="0">
            <?php _e('No','flo-forms'); ?>
          </label>
        </div>
      </div>
      <div class="options-row flex border-bottom">
          <h4 class="options-row--label"><?php _e('Enable "Reply-to" email header?','flo-forms'); ?></h4>

          <div class="options-row--hint">
            <span class="tab-title hint">
                <?php
                _e('Note: This header enables the replay-to feature. But on some hosting services this feature is not available, so if you have issues getting emails, try to disabling this.','flo-forms');
                ?>
            </span>
          </div>
          <div class="options-row--settings">
            <label>
                <input type="radio" name="flo_forms_options[reply_to_header]" <?php checked( $forms_options['reply_to_header'], '1' ); ?> value="1">
                <?php _e('Yes','flo-forms'); ?>
            </label>

            <label>
                <input type="radio" name="flo_forms_options[reply_to_header]" <?php checked( $forms_options['reply_to_header'], '0' ); ?> value="0">
                <?php _e('No','flo-forms'); ?>
            </label>
          </div>
      </div>
      <div class="options-row flex border-bottom">
        <h4 class="options-row--label"><?php _e('Enable email reminder if there are unread Entries?','flo-forms'); ?></h4>
        <div class="options-row--hint"></div>
        <div class="options-row--settings">
          <label>
            <input type="radio" name="flo_forms_options[enable_email_reminder]" class="email-reminder-true" onchange="displayReminderOptions()" <?php checked( $forms_options['enable_email_reminder'], '1' ); ?> value="1">
            <?php _e('Yes','flo-forms'); ?>
          </label>
          <label>
            <input type="radio" name="flo_forms_options[enable_email_reminder]" onchange="displayReminderOptions()" <?php checked( $forms_options['enable_email_reminder'], '0' ); ?> value="0">
            <?php _e('No','flo-forms'); ?>
          </label>
        </div>
      </div>
    	<div class="options-row flex border-bottom email-reminder-option-row" style="<?php echo $email_reminder_options_class ?>">

				<h4 class="options-row--label"><span><?php _e('How old should the Entries be to receive the reminder via email?','flo-forms'); ?> </span></h4>
        <div class="options-row--hint"></div>
        <div class="options-row--settings">
          <select class="link-to" data-setting="link" name="flo_forms_options[entries_days_old_reminder]">

          <?php for ($i=1;$i<11;$i++): ?>
            <option value="<?php echo $i ?>" <?php selected( $forms_options['entries_days_old_reminder'], $i ); ?> ><?php echo sprintf(_n('%d Day','%d Days',$i,'flo-forms'), $i); ?></option>
          <?php endfor ?>
          </select>
        </div>

    	</div>
    	<div class="options-row flex border-bottom email-reminder-option-row" style="<?php echo $email_reminder_options_class ?>">
    		<h4 class="options-row--label"><span><?php _e('Enter the email address the reminder will be sent to:','flo-forms'); ?> </span></h4>
        <div class="options-row--hint"></div>
        <div class="options-row--settings">
          <input type="text" name="flo_forms_options[send_to_email]" value="<?php echo $forms_options['send_to_email'] ?>">
        </div>
    	</div>
        <div class="options-row flex border-bottom">
            <h4 class="options-row--label">
              <?php _e('Enable google captcha','flo-forms'); ?>
            </h4>

            <div class="options-row--hint hint">
              <?php _e('(Works with reCAPTCHA v2)','flo-forms'); ?>
            </div>
            <div class="options-row--settings">
              <label>
                  <input onchange="displayCaptchaOptions()" type="radio" class="captcha-true" name="flo_forms_options[enable-captcha]" <?php $checked = isset($forms_options['enable-captcha'])? checked( $forms_options['enable-captcha'], '1' ):''; echo $checked; ?> value="1">
                  <?php _e('Yes','flo-forms'); ?>
              </label>

              <label>
                  <input onchange="displayCaptchaOptions()" type="radio" name="flo_forms_options[enable-captcha]" <?php $checked = isset($forms_options['enable-captcha'])? checked( $forms_options['enable-captcha'], '0' ):'checked'; echo $checked; ?> value="0">
                  <?php _e('No','flo-forms'); ?>
              </label>
            </div>
        </div>
        <div class="options-row captcha-row border-bottom <?php echo $captcha_settings_class; ?>" style="padding-top: 20px;">
          <div class="options-row flex ff_margin_bottom_30">
            <h4 class="options-row--label">
              <?php _e('Access to generate your personal pair of keys','flo-forms'); ?>
            </h4>
            <div class="options-row--hint hint"></div>
            <div class="options-row--settings">

                <a target="_blank" href="https://www.google.com/recaptcha/admin" class="button button-large recaptcha-key-generation-link">Get Access</a>

            </div>


          </div>
          <div class="options-row flex ff_margin_bottom_30">
            <h4 class="options-row--label options-row--label"><span><?php _e('Google Recaptcha site key:','flo-forms'); ?> </span></h4>
            <div class="options-row--hint"></div>
            <div class="options-row--settings">
              <input type="text" name="flo_forms_options[g_site_key]" value="<?php $site_key =  isset($forms_options['g_site_key'])? $forms_options['g_site_key']:''; echo $site_key ?>">
            </div>
          </div>
          <div class="options-row flex">
            <h4 class="options-row--label"><span><?php _e('Google Recaptcha secret key:','flo-forms'); ?> </span></h4>
            <div class="options-row--hint"></div>
            <div class="options-row--settings">
              <input type="text" name="flo_forms_options[g_secret_key]" value="<?php $secret_key = isset($forms_options['g_secret_key'])? $forms_options['g_secret_key']: ''; echo $secret_key; ?>">
            </div>
          </div>
        </div>


    	<p class="for-submit"><input type="submit" class="button button-primary button-large " name="Submit" value="<?php _e('Save Options','flo-forms'); ?>" /></p>
        <input type="hidden" name="action" value="update" />

      <input type="hidden" name="page_options" value="flo_forms_options" />

      <div class="floform-settings--import_export">
        <div class="floform-settings--import">

          <div class="import-export-title"><?php _e('Import Settings','flo-forms'); ?></div>

          <div class="import-export-description"><?php _e('Import settings from a backup file','flo-forms'); ?></div>

          <div class="">
            <input type="file" id="settings-file" class="flo-forms-import-settings-file" onchange="import_forms_options();"  name="import_form_settings">
            <label for="settings-file"><?php _e('Choose a file','flo-forms'); ?></label>
<!--            <button type="button" class="import-export-btn" onclick="import_forms_options();">--><?php //_e('Import','flo-forms'); ?><!--</button>-->
          </div>
          <span class="spinner spinner-import"></span>

          <div class="import-msg"></div>
        </div>

        <div class="floform-settings--export">
          <div class="import-export-title"><?php _e('Export Settings','flo-forms'); ?></div>
          <div class="import-export-description"><?php _e('Want to save the current forms settings to a backup file?','flo-forms'); ?></div>
          <button type="button" class="import-export-btn" onclick="export_forms_options();"><?php _e('Export','flo-forms'); ?></button>
          <a id="downloadFloFormsOtionsAnchorElem" style="display:none"></a>
        </div>
      </div>
    </div>
    <div class="test-email-tab-content tab-content <?php echo $tabs_class['test-email'] ?>">

      <div class="floform-settings--test-email test-email-options">

        <div class="test-email-options-title"><?php _e('Send a test email','flo-forms'); ?></div>

        <div class="test-email-options-description"><?php _e('Enter below the email address the email will be sent to','flo-forms'); ?></div>
        <br/>

        <div class="">
          <input type="email" id="send-test-email">
          <button type="button" class="send-email-btn" onclick="formSentTestEmail();"><?php _e('Send','flo-forms'); ?></button>
        </div>
        <span class="spinner spinner-send-test-email"></span>

        <div class="test-email-response-container">

        </div>
      </div>
    </div>

    <?php
    // add here all the PRO tabs
    if($is_pro_version) {
      ?>
      <div class="custom_fonts-tab-content tab-content <?php echo $tabs_class['custom_fonts'] ?>">
        <?php include_once dirname(__FILE__).'/../../pro/fonts.php'; ?>
        <p class="for-submit"><input type="submit" class="button button-primary button-large " name="Submit" value="<?php _e('Save Options','flo-forms'); ?>" /></p>
      </div>
      <?php
    }
    ?>
	</form>
</div>

<?php
  if(isset($_GET['flo_email_error']) && $_GET['flo_email_error'] == 1) {
    // show the email errors
    $messages = get_option( 'floforms_wperror_mail', '' );

    print_r($messages);

    if(trim($messages) == '') {
      echo 'No errors were recorded';
    }
  }
?>
