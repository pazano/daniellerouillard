(function($){
  
  $(document).ready(function() { 
    var $b = ".acf-video-tutorial";
    
    $('body').append('<div class="acf-video-popup"><div class="acf-video-close-button"></div></div>');
    
    var popup = document.getElementsByClassName("acf-video-popup");
    var video = document.getElementsByClassName("acf-video-tutorial__video-overlay");
    var close = document.getElementsByClassName("acf-video-close-button");
    
    $(video).on("click", function() {
      $(this).addClass("video-opened");
      var embed = $(this).siblings($b + "__video-embed").html();
      $(popup).append(embed);
      $(popup).addClass("popup-opened");
      $("body").addClass("acf-popup-opened");
    });
    
    $(close).on("click", function() {
      var iframe = $(popup).children("iframe");
      $(iframe).remove();
      $(popup).removeClass("popup-opened");
      $("body").removeClass("acf-popup-opened");
    })
  });
  
}) (jQuery);