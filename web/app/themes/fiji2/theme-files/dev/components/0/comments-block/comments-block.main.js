$(function(){

    $(
      [
        ".comments-block__top-bar-hide-button",
        ".comments-block__top-bar-show-button",
        ".comments-block__top-bar-toggle-button"
      ].join(", ")
    ).click(function () {
        $('.comments-block').toggleClass("comments-block--expanded").toggleClass("comments-block--collapsed");
        $(".comments-block__posts").slideToggle();
    });

});
