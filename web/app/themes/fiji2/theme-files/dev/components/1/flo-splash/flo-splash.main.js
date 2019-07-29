var splash__show = function() {
  let splashScreen = $(".flo-splash");
  Foundation.Motion.animateIn(splashScreen, "fade-in");
}
var splash__hide = function() {
  let splashScreen = $(".flo-splash");
  Foundation.Motion.animateOut(splashScreen, "fade-out");
}

window.onload = () => {
  let splashScreen = $(".flo-splash");
  splashScreen
  .css("opacity", "0");
  setTimeout( () => {
    splash__hide;
    splashScreen.hide();
  }, 400);
};
