window.flo_header_block = function (el) {
  var header = $(el);
  var flo_header__class = "flo-header";
  var $flo_header = $("." + flo_header__class);
  var $header = $(header).find($flo_header);

  /* START: STICKY HEADER */
    var is_not_sticky_class = "is-not-sticky";
    var header_sticky_class = "is-sticky";
  
    
    $($header).addClass(is_not_sticky_class);
    if ($(header).hasClass('flo-header--sticky') && window.innerWidth > 768) {
      $($header).first().on("sticky-start", function () {
        $(this).removeClass(is_not_sticky_class);
        header.addClass(header_sticky_class);
      }).on("sticky-end", function () {
        $(this).addClass(is_not_sticky_class);
        header.removeClass(header_sticky_class);
        setTimeout(function () {
          $(this).sticky("update");
        }, 600);
      }).sticky({
        zIndex: 9999,
        className: "is-sticky"
      });
    }
  /* END: STICKY HEADER*/

  /* START: DROPDOWN */
  if (window.outerWidth >= 768) {
    var dropdown_elements = new Foundation.DropdownMenu($(".menu-item-has-children ul"));
  }
  /* END: DROPDOWN */

  /* START: LOGO CENTER - SPLIT MENU IN HALF */
  if ($(".flo-header__menu-donor").length) {

    /* WPML split elements*/
    if ($(".menu-item").hasClass("wpml-ls-item") && $(".flo-header").hasClass('flo-header--type-c') && $(window).width() >= 768) {
      var wpml_menu_items = $(".flo-header__menu-items .wpml-ls-item");
      var wpml_container = document.createElement("ul");
      wpml_container.className = "flo-header--wpml-elements";
      $.each(wpml_menu_items, function (index, el) {
        wpml_menu_items = this;
        $(wpml_menu_items).appendTo(wpml_container);
      });
      $(wpml_container).appendTo(".flo-header--type-c");
    }

    var $menu_donor = $(header).find(".flo-header__menu-donor"),
        $menu_donor_ul = $menu_donor.find("> div > ul"),
        $menu_donor_first_level = $menu_donor_ul.children("li"),
        $menu_left = $(header).find(".flo-header__menu--left > div > ul"),
        $menu_right = $(header).find(".flo-header__menu--right > div > ul"),
        $search_form = $menu_donor.find("div[class*='__search-wrap']");

    $menu_donor_first_level.each(function (index) {
      var $item = $(this),
          length = $menu_donor_first_level.length;
      if (index < length / 2) {
        $menu_left.append($item);
      }
      if (index >= length / 2) {
        $menu_right.append($item);
      }
      if ($search_form.length) {
        $menu_right.append($search_form);
      }
      if (index == length - 1) {
        $menu_donor.remove();
      }
    });
  }
  /* END: LOGO CENTER - SPLIT MENU IN HALF */

  /* START: SEARCH TRIGGER */
  $(".flo-header__search-trigger").click(function () {
    $(this).parents(".flo-header__search-wrap").toggleClass("flo-header__search-wrap--open");
  });
  /* END: SEARCH TRIGGER */

  /* START: ADD ZINDEX TO THE BLOCK WITH HEADER INSIDE */
  $(".flo-block > .flo-block__container > header").parents(".flo-block").css("z-index", "3");
  /* END: ADD ZINDEX TO THE BLOCK WITH HEADER INSIDE */
};