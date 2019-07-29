function recognizeDashboardView() {
  
  let recommendedItemIdsList = {
    
    'default': [
      5244, // 'activating-a-theme'
      5264, // 'how-to-update-a-flotheme'
      5294, // 'installing-plugin-wp-plugins-directory'
      5307, // 'creating-a-menu'
      5477, // 'social-media-management'
      6462, // 'assigning-a-homepage'
    ],
    
    'flotheme': [
      10562, // 'getting-started-from-scratch'
      5346,  // 'how-to-import-demo-content'
      5517,  // 'adding-google-analytics-to-my-website'
      5513,  // 'how-to-add-a-favicon'
      5454,  // 'font-styles-management'
      6090,  // 'desktop-header-components'
      5404,  // 'global-header-layout'
      5360,  // 'mobile-header-popup-layout'
      5563,  // 'pages-settings'
      5477,  // 'social-media-management'
      5425,  // 'footer-sections-overview'
      5426,  // 'footer-sections-re-ordering'
      5428,  // 'hiding-disabling-footer-sections'
      5433,  // 'global-footer-layout'
      5460,  // 'what-is-a-style-kit'
      5461,  // 'using-style-kits'
    ],
    
    'dashboard': [
      10562, // 'getting-started-from-scratch'
      5346,  // 'how-to-import-demo-content'
      5255,  // 'switching-another-flotheme'
      5307,  // 'creating-a-menu'
      10544, // 'creating-a-page'
      10525, // 'creating-blog-post'
    ],
    
    'slideshow': [
      5555, // 'managing-slideshows'
      4105, // 'flothemes-image-sizes'
      6157, // 'changing-header-color-slideshows'
      6340, // 'what-is-a-page-builder'
      5541, // 'building-a-page-from-scratch'
    ],
    
    'gallery': [
      6258, // 'what-is-a-gallery'
      5617, // 'how-to-create-a-gallery'
      4105, // 'flothemes-image-sizes'
      6269, // 'gallery-image-uploader'
      5624, // 'managing-global-gallery-layout'
      5626, // 'custom-gallery-layout'
      5560, // 'portfolio-page'
      5618, // 'change-parent-slug-galleries'
      6267, // 'gallery-wp-content-block'
    ],
    
    'post': [
      10525, // 'creating-blog-post'
      5588,  // 'uploading-images-post-contents'
      5603,  // 'managing-global-post-layout'
      5605,  // 'managing-custom-post-layout'
      6385,  // 'listing-page'
      5559,  // 'blog-posts-page'
    ],
    
    'video': [
      10476, // 'what-is-a-video-post'
      10481, // 'how-to-create-a-video-post'
      10499, // 'global-video-post-settings'
      5603,  // 'managing-global-post-layout'
      5605,  // 'managing-custom-post-layout'
      10490, // 'custom-video-post'
      10494, // 'changing-parent-slug-video-posts'
    ],
    
    'media': [
      4105, // 'flothemes-image-sizes'
      5588, // 'uploading-images-post-contents'
      5328, // 'changing-image-sizes'
      5330, // 'using-regenerate-thumbnails-plugins'
      5329, // 'changing-uploads-directory-path-resetting-uploads-directory-path-default'
    ],
    
    'page': [
      10544, // 'creating-a-page'
      5541, // 'building-a-page-from-scratch'
      6340, // 'what-is-a-page-builder'
      5540, // 'page-builder-components'
      5539, // 'page-builder-in-page-templates'
      5405, // 'custom-header-layout'
      5434, // 'custom-footer-layout'
      5545, // 'what-is-a-content-block'
      4105, // 'flothemes-image-sizes'      
    ],
    
    'comments': [
      5597, // 'wordpress-comments'
      5598, // 'facebook-comments'
      5604, // 'recommended-blocks-global-post-layout'   
    ],
    
    'flo-forms': [
      6400, // 'flo-forms'
      1913, // 'contact-form-email-issue'
    ],
    
    'themes': [
      5236, // 'how-to-download-a-theme'
      5247, // 'uploading-a-theme-via-dashboard'
      5246, // 'manual-upload-via-ftp-file-manager'
      5244, // 'activating-a-theme'
      5264, // 'how-to-update-a-flotheme'
      5265, // 'manual-flotheme-update-via-ftp'
      5270, // 'how-to-delete-a-theme'
      5274, // 'customize-via-child-theme'
      5273, // 'download-install-a-child-theme'
      5271, // 'disabling-themes-renaming-via-ftp-file-manager'
    ],
    
    'widgets': [
      6306, // 'what-is-a-sidebar'
      6313, // 'create-new-sidebar'
      5500, // 'adding-content-to-sidebars'
      5499, // 'adding-sidebars-to-a-page'
      8415, // 'widgets-in-footer'
      5501, // 'widget-visibility'
    ],
    
    'menus': [
      5307, // 'creating-a-menu'
      5311, // 'custom-url-menu-items'
      5310, // 'non-clickable-menu-items'
      5309, // 'adding-galleries-menu'
      5308, // 'make-menu-item-open-new-tab'
      5312, // 'assigning-menus-main-footer-etc'
      6156, // 'menu-dropdown-text-background-colors'
    ],
    
    'plugins': [
      5294, // 'installing-plugin-wp-plugins-directory'
      5293, // 'installing-plugin-zip-file'
      5302, // 'removing-renaming-plugins-via-file-manager-ftp'
      5295, // 'updating-plugins-importance-updates'
      6400, // 'flo-forms'
      5300, // 'floinstagram'
      5654, // 'where-to-download'
      5655, // 'how-to-upload-flolaunch'
      5653, // 'what-is-flolaunch-and-how-it-works'
    ],
    
    'users': [
      5324, // 'create-temporary-administrator'
      5668, // 'creating-users-changing-user-passwords-using-flolaunch'
    ],
    
    'tools': [
      5357, // 'importing-exporting-your-content-using-wordpress-importer'
      5349, // 'troubleshooting-wordpress-importer'
      5667, // 'adding-new-content-while-in-test-mode'
    ],
    
    'settings-general': [
      5321, // 'site-title-tagline'
      5323, // 'change-timezone-time-date-format-email-language'
    ],
    
    'settings-writing': [
      5325, // 'settings-%e2%86%92-writing'
    ],
    
    'settings-reading': [
      5326, // 'settings-%e2%86%92-reading'
      5559, // 'blog-posts-page'
      6462, // 'assigning-a-homepage'
    ],
    
    'settings-discussion': [
      5597, // 'wordpress-comments'
      5623, // 'comments'
    ],
    
    'settings-media': [
      5328, // 'changing-image-sizes'
      5330, // 'using-regenerate-thumbnails-plugins'
    ],
    
    'settings-permalinks': [
      10587, // 'setting-up-permalinks'
      4164,  // 'changing-permalinks'
      5589,  // 'managing-individual-post-urls-changing-global-permalink-structure-posts'
    ],
    
    'flo-instagram': [
      5300, // 'floinstagram'
      5429, // 'adding-instagram-feed-footer'
      8415, // 'widgets-in-footer'
    ],
    
    'flo-hub': [
      5014, // 'flohub-installing-flohub'
      5017, // 'flohub-update-plugin'
      5015, // 'flohub-general-settings'
      5012, // 'flohub-pricelist-overview'
      5023, // 'flohub-new-pricelist'
      5013, // 'flohub-making-first-pricelist'
      5016, // 'flohub-using-templates'
      5025, // 'flohub-using-content-blocks'
      5024, // 'flohub-using-package-blocks'
      5018, // 'flohub-pricelist-settings'
      5022, // 'flohub-messages-integrations'
      5021, // 'flohub-adding-custom-fonts'
      5020, // 'flohub-translating-pricelists'
      5019, // 'flohub-sharing-pricelists'
    ]
    
  };
  
  let currentView = 'default';
  let currentPath = document.location.pathname;
  let currentPathArr = currentPath.split('/');
  // find the slug that goes directly after 'wp-admin'. that will help us figure out where in the dashboard the user is currently located
  let indexOfWPAdmin = currentPathArr.indexOf('wp-admin');
  let label = '';
  
  if(
    ((currentPathArr[indexOfWPAdmin + 1] == "") || 
    (currentPathArr[indexOfWPAdmin + 1] == 'index.php')) &&
    $('body').hasClass('index-php')
  ) {
    currentView = 'dashboard';
    label = 'Dashboard';
  } 
  // start: post types
  else if ($('body').hasClass('post-type-slideshow')) {
    currentView = 'slideshow';
    label = 'Slideshows';
  } else if ($('body').hasClass('post-type-gallery')) {
    currentView = 'gallery';
    label = 'Galleries';
  } else if ($('body').hasClass('post-type-post')) {
    currentView = 'post';
    label = 'Posts';
  } else if ($('body').hasClass('post-type-video')) {
    currentView = 'video';
    label = 'Videos';
  } else if ($('body').hasClass('post-type-attachment')) {
    currentView = 'media';
    label = 'Media';
  } else if ($('body').hasClass('post-type-page')) {
    currentView = 'page';
    label = 'Pages';
  } 
  // end: post types
  
  else if (
    $('body').hasClass('comment-php') ||
    $('body').hasClass('edit-comments-php')
  ) {
    currentView = 'comments';
    label = 'Comments';
  } else if (
    $('body').hasClass('post-type-flo_forms') || 
    adminpage && adminpage == 'toplevel_page_flo_forms_settings'
  ) {
    currentView = 'flo-forms';
    label = 'FloForms';
  } else if (
    $('body').hasClass('themes-php') || 
    $('body').hasClass('theme-editor-php')
  ) {
    currentView = 'themes';
    label = 'Themes';
  } else if ($('body').hasClass('nav-menus-php')) {
    currentView = 'menus';
    label = '';
  } else if ($('body').hasClass('widgets-php')) {
    currentView = 'widgets';
    label = 'Widgets';
  } else if (
    $('body').hasClass('plugins-php') ||
    $('body').hasClass('plugin-install-php') ||
    $('body').hasClass('plugin-editor-php')
  ) {
    currentView = 'plugins';
    label = 'Plugins';
  } else if (
    $('body').hasClass('users-php') || 
    $('body').hasClass('user-new-php') || 
    $('body').hasClass('profile-php')
  ) {
    currentView = 'users';
    label = 'Users';
  } 
  // wp tools tab
  else if (
    $('body').hasClass('import-php') || 
    $('body').hasClass('export-php')
  ) {
    currentView = 'tools';
    label = 'Tools';
  } 
  
  // start: wp settings tab
  else if ($('body').hasClass('options-general-php')) {
    currentView = 'settings-general';
    label = 'General Settings';
  } else if ($('body').hasClass('options-writing-php')) {
    currentView = 'settings-writing';
    label = 'Writing Settings';
  } else if ($('body').hasClass('options-reading-php')) {
    currentView = 'settings-reading';
    label = 'Reading Settings';
  } else if ($('body').hasClass('options-discussion-php')) {
    currentView = 'settings-discussion';
    label = 'Discussion Settings';
  } else if ($('body').hasClass('options-media-php')) {
    currentView = 'settings-media';
    label = 'Media Settings';
  } else if ($('body').hasClass('options-permalink-php')) {
    currentView = 'settings-permalinks';
    label = 'Permalink Settings';
  } 
  // end: wp settings tab
  
  else if ($('body').hasClass('toplevel_page_flo_instagram')) {
    currentView = 'flo-instagram';
    label = 'FloInstagram';
  } else if (adminpage && (adminpage.includes('flotheme_page_acf') || adminpage == 'toplevel_page_theme-general-settings')) {
    currentView = 'flotheme';
    label = 'FloThemes Settings Page';
  } else if (adminpage && adminpage.includes('flopricing')) {
    currentView = 'flo-hub';
    label = 'FloHub';
  }
  
  if(recommendedItemIdsList[currentView]) {
    if ($(`.flo-support__recommended-articles--title`).length && currentView != 'default') {
      $(`.flo-support__recommended-articles--title`)[0].innerHTML += ` for "${label}"`;
    }
    return recommendedItemIdsList[currentView];
  } else {
    return recommendedItemIdsList['default'];
  }
  
}