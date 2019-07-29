=== Flo Forms - Easy Drag & Drop Form Builder ===
Contributors: wpmigo,flothemesplugins
Donate link: https://flothemes.com/donation/
Tags: contact form, contact form plugin, form, custom form builder, submission form, conditional logic
Requires at least: 4.7.0
Tested up to: 5.1
Stable tag: 1.0.13
Author: Flothemes
Author URI: https://flothemes.com/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Easily create custom contact forms.

== Description ==

Create contact forms for your WordPress site with our easy to use drag & drop contact form builder. Collect the information you need from your clients and start converting leads today.

Deploy a form in your site in a matter or minutes, no coding needed.

Flo Forms is 100% mobile responsive, so your contact forms will look great on any device.

== Installation ==

This section describes how to install the plugin and get it working.


1. Upload the `flo-forms` directory to your `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Visit the 'Flo Forms' menu item in your admin sidebar to create and edit forms. And to set up the global plugin settings, go to Flo Forms settings menu item in the dashboard.
4. For more details check the documentation: https://docs.flothemes.com/flo-forms/

== Frequently Asked Questions ==
= I do not receive notification via email when the form is submitted. What can I do? =

Check please the following tutorial that should help find and solve the issue:
<a href="https://docs.flothemes.com/flo-forms-issues/" target="_blank">Flo Forms email issues</a>

= Does the plugin have any dependency on anything ? =

By default it doesn't. But if you want to add captcha to fight the spam, then you must have a <a href="https://www.google.com/gmail/about/#" target="_blank">Google</a> account and set up reCAPTCHA API keys.

= The form stopped working, what can I do ? =

There may be various reasons, but one common problem happens when adding SSL certificate to the website, and the WordPress address URL is not updated to contain 'https'.
So if the SSL certificate was added, make sure these settings have also 'https': <a href="https://i.imgur.com/Lc2Aepv.jpg" target="_blank">https://i.imgur.com/Lc2Aepv.jpg</a>
If the problem persists, check the console and see if there are any Javascript errors.

= Can I use multiple forms on the same page ? =

At the moment this is not possible. Only one form per page works properly.

== Screenshots ==


== Changelog ==
= 1.0.13 =
* Log the errors occurring when sending emails
* Fixed error occurring in certain conditions on some servers (Failed to open 'ventor/autoload.php')

= 1.0.12 =
* Confirmation email - added support for %field_id% in the message
* Added option for field hint
* Confirmation options -> Redirect to a page:
  If user entered a URL instead of a page title, the URL will have priority.
* Removed placeholder option for the Message field as it is not applicable for it.
* Prevent submitting the forms multiple times

= 1.0.11 =
* Fixed issue related to the confirmation email option

= 1.0.10 =
* Added 'Admin notice' box that informs about the possibility of emails not functioning properly and how to deal with that.
* Added admin notice that shows up when there are unread entries.
* Added possibility to send a test email.
* Select field without label - use the first option name as label in the submission table


= 1.0.9 =
* Fixed date field issue occurring on non English WP installations.
* Fixed error occurring when captcha is enabled and and the required fields are not filled in.
* Checkbox field - replace new line with <br> to allow multi line message without using markup tags

= 1.0.8 =
* Fixed reCaptcha issue

= 1.0.7 =
* Show warning to update the site URL settings if mixed content is detected.

= 1.0.6 =
* Added option to sent form submission confirmation email.
* Added filter  to overwrite the confirmation text if needed for developers
* Added filter  to overwrite the redirect page if needed for developers

= 1.0.5 =
* Mobile view columns adjustment
* For the required fields, add the '*' at the end of the labels

= 1.0.4 =
* Bug Fix - Multisite WP install error fix.
* Improvement - Conditional logic rule operator: if the label is not set, show the placeholder.

= 1.0.3 =
* Added validate timeout to the form option to have a delay before on change validation - especially useful for email field
* Styling adjustment for the field validation error message
* Fixed section break field issue
* Added support for the rest API for the flo_forms posts - Now it is possible to fetch the forms posts using REST API
* Added verifications for the cases when the schema is not a valid JSON
* Fixed conditional logic issue for the checklist element

= 1.0.2 =
* Fixed ajax URL for some edge cases

= 1.0.1 =
* Sanitized the backend field options before saving to the data base.
* Added support for Upgrade Notice

= 0.9.0 =
* Fixed date field format for the fields that were created before the date format option was added.

= 0.8.0 =
* Fixed potential js error on pages that do not have the contact form.

= 0.6.0 =
* Temporarily removed 'has_shortcode' verification

= 0.6.0 =
* Made the subject replacement to work with both he numeric ID and ID prefixed by 'fid_'

= 0.5.0 =
* Load plugin scripts only on the pages that have the shortcode.
* Repositioned captcha before the submit button.
* Conditional logic improvements - for the Fields with multiple values, we show the possible values in dropdowns.
* Added option for the date format for the Date field.
* Include captcha script only when captcha is enabled.

= 0.4.0 =
* Fixed JS error appearing when the form was used in a 'Contact block'

= 0.3.0 =
* Added Section Break field

= 0.2.0 =
* fixed scripts enqueue issue for some themes

= 0.1.0 =
* Release of the redesigned version




== Features ==

⁃ Never lose an email again, store all your inquiries directly on your site and get email reminders when when you miss an email.
⁃ GDPR ready, add a check box and link to your privacy policy.
⁃ Add conditional logic to your forms to allow you to create dynamic forms, and collect the information you really need.
⁃ Add required fields and make sure users add the information you need.
⁃ Create a custom success message or re-direct them to a new page.
- Send submission confirmation email to the user.
⁃ View, edit, download user information directly stored on your server.
⁃ Hidden fields, great for adding information about where the user is submitting the form, or for passing information to other tools.
⁃ Multi Columns, create unique layouts with 1 and 2 columns.
⁃ Translate your plugin, great for multilingual sites.
⁃ All the fields that you need to collect the information you need. Add radio buttons, conditional logic, drop down menus, date, phone and email fields.

== CRM Extensions ==

Flo Forms gives you the chance to connect to Tave or ShootQ for the simplest way to nature your leads.

<a href="https://flothemes.com/forms-tave-integration/?ref=wp_com" target="_blank">https://flothemes.com/forms-tave-integration/ </a>
<a href="https://flothemes.com/forms-shootq-integration/?ref=wp_com" target="_blank">https://flothemes.com/forms-shootq-integration/ </a>

== Documentation ==

All documentation for Flo Forms an be found in the documentation on our site at <a href="https://flothemes.com">Flothemes.com </a>or directly here:

View Docs - <a href="https://docs.flothemes.com/flo-forms/">https://docs.flothemes.com/flo-forms/</a>

Having issues, check out our Flo Forms Issues guide.

<a href="https://docs.flothemes.com/flo-forms-issues/">https://docs.flothemes.com/flo-forms-issues/</a>