$(window).load(function(){

  // TODO: skip_list for any block that contains flo-header--*


  /* START: SIDEBAR WORKS */
  if (window.innerWidth > 767 && $(".flo_sidebar").length) {
    var adaptive_sidebar = $("body").hasClass("body_has_sidebar");
    var sidebar_works_css = [];
    var page_wrap = $(".flo_page_wrap");
    var sidebar = $(".flo_sidebar");
    var sidebar_height = 0;
    var blocks = $(".flo-block:not(.flo-no-resize)");
    var any_footer = "div[class^='flo-footer'],div[class*=' flo-footer']";
    function approx(num) {
      return +(Math.round(num + "e+2")  + "e-2");
    }
    function getNodesThatContain($this, text) {
      var textNodes = $this.find(":not(iframe, script, style)")
        .contents().filter(
          function() {
            return this.nodeType == 3
              && this.textContent.indexOf(text) > -1 && $(this).children().length == 0;
          });
      return textNodes.parent();
    }

    // specify the blocks on top that do not need to be affected by the sidebar (headers and slideshows in most cases)
    var skip_list = '.flo-block-slideshow-1, .flo-block-category-switcher-1';

    /* START: SIDEBAR */
    // var top = 0;
    if (blocks.first().find('.flo-header').length && blocks.first().next().find(skip_list).length) {
      // first two blocks = header + skip_list
      blocks.first().addClass('skipped');
      blocks.first().next().addClass('skipped');
    } else if (
      blocks.first().find('.flo-header').length && blocks.first().find(skip_list).length ||
      blocks.first().find(skip_list).length ||
      blocks.first().find('.flo-header').length
    ){
      // first block = skip_list with header OR first block = skip_list with no header OR first block = header only
      blocks.first().addClass('skipped');
    }


    /* END: SIDEBAR */

    /* START: BLOCKS */
    var skipped_block_height = 0;

    // append sidebar to first transformed block
    blocks.not('.skipped').first().addClass('contains_sidebar');
    var block_contains_sidebar = $('.contains_sidebar');
    block_contains_sidebar.append(sidebar);
    var blocks_on_the_side_height = 0;
    var sidebarWidthInPercent = sidebar.width() * 100 / block_contains_sidebar.width();

    sidebar.children().each(function(){
      sidebar_height += $(this).outerHeight(true);
    });
    sidebar_height += parseInt(block_contains_sidebar.css("padding-top"), 10) * 2;

    var sidebarMarginInPercent = 0;
    if (!sidebar.hasClass('flo_sidebar--on-left')){
      sidebarMarginInPercent = parseInt(sidebar.css("margin-left")) * 100 / block_contains_sidebar.width();
      var righti = parseInt(block_contains_sidebar.css('padding-right'));
    }else{
      sidebarMarginInPercent = parseInt(sidebar.css("margin-right")) * 100 / block_contains_sidebar.width();
      var lefti = parseInt(block_contains_sidebar.css('padding-left'));
    }
    var toppi = parseInt(block_contains_sidebar.css('padding-top'));

    sidebar_works_css.push([
      ".flo_sidebar {",
      "top: " + toppi + "px!important;",
      sidebar.hasClass("flo_sidebar--on-left") ? "left: " + lefti +"px;" : "right: " + righti + "px;",
      "}"
    ].join("\n"));

    var howMuchTransform = (100 - sidebarWidthInPercent - sidebarMarginInPercent) / 100;
    var zoomFactor = block_contains_sidebar.find('.flo-block__container').width() / (block_contains_sidebar.find('.flo-block__container').width() * howMuchTransform);

    blocks.each(function(){
      var block = $(this);

      if (!block.hasClass('skipped')) {

        var shrink = true;
        if (adaptive_sidebar && (blocks_on_the_side_height > sidebar_height)) {
          shrink = false;
        }

        if (shrink){
          block.addClass('shrinked');
          if(!$('body').hasClass('single-post')){
            var vertical_correction = block.find('.flo-block__container').outerHeight() - (block.find('.flo-block__container').outerHeight() * howMuchTransform);
            var $this = $(this).find('.flo-block__container');
            var id = $this.parent('.flo-block').attr('data-id');
            var x = document.getElementsByClassName('flo-block--' + id);
            x = x[0].firstElementChild.innerText;
            var array = x.split('\n');
            $.each(array, function(){
              var match = getNodesThatContain($this, this);
              $.each(match, function(){
                if (
                  $(this).children().length == 0 && $(this).text() != ''
                  || ($(this).children().length == 1 && $(this).text() != '' && $(this).find('.flo-icon-arrow-left, .flo-icon-arrow-right').length == 1)
                ){
                  $(this).not('.font-resized').css('font-size', (parseInt($(this).css('font-size')) * zoomFactor) / parseInt($('html').css('font-size')) + 'rem').addClass('font-resized');
                }
              })
            })

            // use transform instead of width to preserve contents width/height ratio
            // compare initial height and transformed height and assign the number of pixels the block has lost in height as negative margin-bottom
            sidebar_works_css.push([
              ".flo-block--"+block.data("id")+" .flo-block__container {",
                "transition: none!important;",
                "transform: scale(" + approx(howMuchTransform) + ")!important;",
                "margin-bottom: -" + approx(vertical_correction) + "px!important;",
                sidebar.hasClass("flo_sidebar--on-left") ? "transform-origin: top right !important;" : "transform-origin: top left !important;",
                sidebar.hasClass("flo_sidebar--on-left") ? "margin-left: auto;" : "",
              "}"
            ].join("\n"));

            var block_height_to_add_up = approx( ( block.find('.flo-block__container').outerHeight() * howMuchTransform) + parseFloat(block.css('padding-top')) + parseFloat(block.css('padding-bottom')));
            blocks_on_the_side_height += block_height_to_add_up;

          } else {

            sidebar_works_css.push([
              ".flo-block--"+block.data("id")+" .flo-block__container {",
              "transition: none!important;",
              "width: " + approx(100 - sidebarWidthInPercent - sidebarMarginInPercent) + "%;",
              sidebar.hasClass("flo_sidebar--on-left") ? "margin-right: 0;" : "margin-left: 0;",
              "}"
            ].join("\n"));
            blocks_on_the_side_height += approx(block.outerHeight());

          }
        }
      } else{
        skipped_block_height += block.outerHeight();
      }
    });
    /* END: BLOCKS */

    /* START: PAGE WRAP */
    var footer_height = 0;
    if ( $(any_footer).first().length) {
      footer_height = $(any_footer).first().outerHeight();
    }
    
    if (sidebar_height > blocks_on_the_side_height) {
      var page_wrap_height = skipped_block_height + sidebar_height + footer_height;
      page_wrap.css({
        "height" : page_wrap_height
      });

      $(any_footer).first().css({
        "position": "absolute",
        "bottom": 0,
        "left": 0,
        "width": "100%"
      })
    }
    /* END: PAGE WRAP */
    /* START: APPEND CSS */
    $("head").append([
      "<style class='sidebar-works-css'>",
      "@media (min-width: 768px) {",
      sidebar_works_css.join("\n"),
      "}",
      "</style>"
    ].join("\n"));
    
    setTimeout(function () {
      sidebar.css('opacity', 1);
    });
    
    // attempt to reinit masonry and all that shit
    $(window).trigger('resize');

    $('.body_has_sidebar').addClass('sidebar-ready');

    /* END: APPEND CSS */
  }
  /* END: SIDEBAR WORKS */
});
