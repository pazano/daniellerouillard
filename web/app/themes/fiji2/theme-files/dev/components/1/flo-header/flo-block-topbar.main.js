window.flo_block_topbar = function(el) {
  'use strict';
  let $el = $(el);
  let b = el.children[0].querySelector('div').classList[0];
  let dotb = '.' + b;
  let closeTrigger = $el.find(dotb + '__close');
  let leCookie = floGetCookie('topbar_dismissed');

  if(!leCookie && $el.find(dotb).css('display') == 'none') {
    $el.find(dotb).slideDown('fast');
    closeTrigger.on('click', event => {
      createCookie('topbar_dismissed', true, 5);
      $el.find(dotb).slideUp('500', () => $el.remove());
    });
  } else {
    $el.remove();
  }
}