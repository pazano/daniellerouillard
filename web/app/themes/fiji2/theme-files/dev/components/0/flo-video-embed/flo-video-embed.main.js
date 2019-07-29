$(function(){
  $(".flo-video-embed").each(function(){
    var video_embed = $(this);
    var video_embed__loaded_class = "flo-video-embed--loaded";
    var video_screen = video_embed.find(".flo-video-embed__screen");
    var video_screen__embed_code = video_screen.attr("data-flo-video-embed-embed-code");
    var video_button = video_embed.find(".flo-video-embed__video-button");
    var video_start = function() {
      video_screen.html(video_screen__embed_code);
      video_embed.addClass(video_embed__loaded_class);
    }
    var video_stop = function() {
      video_embed.removeClass(video_embed__loaded_class);
      video_screen.html("");
    }
    video_button.on("click", function(e){
      e.preventDefault();
      switch (video_embed.hasClass(video_embed__loaded_class)) {
        case false:
          video_start();
        break;
        case true:
          video_stop();
        break;
      }
    });

    video_embed.on("floVideoEmbedStop", function() {
      video_stop();
    })



  });
});
