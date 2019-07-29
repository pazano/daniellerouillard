$(function(){
  var header_mobile = $(".flo-header-mobile");

  $(".flo-header-mobile").appendTo(".flo-block:first header");
  $(".flo-header-mobile").css("visibility", "visible");

  /* START: REMOVE ALL BUT FIRST */
    // $(".flo-header-mobile:not(:first)").remove();
  /* END: REMOVE ALL BUT FIRST */

  /* START: STICKY */
    $(".flo-header-mobile").first().addClass("not-sticky");
    $(".flo-header-mobile.sticky").first()
      .on("sticky-end", function(){
        $(this).addClass("not-sticky");
        setTimeout(function () {
          $(this).sticky("update");
        }, 400);
      })
      .on("sticky-start", function(){
        $(this).removeClass("not-sticky");
      })
      .sticky({
        zIndex: 1000,
        className: "is-sticky",
        wrapperClassName: "flo-header-mobile-sticky-wrapper"
      })
    ;
  /* END: STICKY */

});
