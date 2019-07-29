$(function(){
  $(".flo-core-style").each(function(){
    var template = $(this);
    var style = template.html();
    $("head").append(style);
    template.remove();
  });
	let fadeInStyleTag = document.createElement("style");
	fadeInStyleTag.classList = "flo-core-fade-in";
	fadeInStyleTag.innerHTML = `
    body * {
      outline: solid transparent;
    } 
    body {
      opacity: 1!important;
    }`;
  $(fadeInStyleTag).appendTo( "head" );
});
