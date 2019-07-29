@extends("components.flo-generic-slides-template", [
  "height_type" => $slideshow_height_type,
  "height_px" => $slideshow_height_px
])
@section("elements_to_change_color_to")
  block,
  "{ ",
    "color: " + elements_color + ";",
    "border-color: " + elements_color + ";",
  "} ",

  block + " .flo-header-mobile.not-sticky",
  "{ ",
    "color: " + elements_color + "!important;",
  "} ",
@overwrite
