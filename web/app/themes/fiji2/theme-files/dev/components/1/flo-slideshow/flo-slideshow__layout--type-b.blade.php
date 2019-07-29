<?php
$b = "flo-slideshow"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

?>

@include('core.style', [
  "breakpoint__medium_up" => "

    ".$b__uniq_for_css." ".$b__for_css."__counter-count,
    ".$b__uniq_for_css." ".$b__for_css."__counter-index,
    ".$b__uniq_for_css." ".$b__for_css."__arrow
    {
      color: ".$elements_color."!important;
    }

  "
])
<div class="{{$b}}__layout {{$b}}__layout--type-b " data-onready="flo_slideshow__layout__type_b">

  {{-- START: BACKGROUND --}}
    <div class="{{$b}}__background"></div>
  {{-- END: BACKGROUND --}}

  {{-- START: SPACER --}}
    <div class="{{$b}}__spacer"></div>
  {{-- END: SPACER --}}

  {{-- START: COUNTER --}}
    @include('components.flo-slideshow__counter')
  {{-- END: COUNTER --}}

  {{-- START:  --}}
    <div class="{{$b}}__arrows">
      <div class="{{$b}}__arrow {{$b}}__arrow--next">
        <i class="flo-icon-arrow-triangle-right-08"></i>
      </div>
      <div class="{{$b}}__arrow {{$b}}__arrow--prev">
        <i class="flo-icon-arrow-triangle-left"></i>
      </div>
    </div>
  {{-- END:  --}}

  {{-- START: SLIDES --}}
    @if ($slideshow_data["slides"])
      <div class="{{$b}}__slides" data-slick='{ "speed": {{ $slideshow_data["transition_speed"] }}, "autoplay": {{ $slideshow_data["autoplay"] }}, "autoplaySpeed": {{ $slideshow_data["autoplay_speed"] }}, "pauseOnHover": {{ $slideshow_data["pause_on_hover"] }} }' data-autoplay="{{ $slideshow_data['autoplay'] }}">
        @foreach($slideshow_data["slides"] as $slide)
          <?php
            $slide_id = mt_rand(1, 999);
            $slide_class = $b."__slide--".$slide_id;
            $slide_class_for_css = ".".$slide_class;

            if(isset($slide['alt'])){
                $alt_text = $slide['alt'];
            }else{
                $alt_text = '';
            }

            $display_hover_gradient = $slide["display_gradient"];
            $hover_gradient_color = $slide["gradient_color"];
          ?>
          <div
            class="{{$b}}__slide {{$b}}__slide--{{$slide_id}} {{$b}}__slide--{{$slide["type"]}}"
            data-slide-bg="{{$slide["background_color"]}}"
            @if ($slide["type"] == "image_and_video_embed")
              data-embed-code="{{ htmlentities($slide["video_embed_code"]) }}"
            @endif
          >
            @include('core.style', [
              "breakpoint__general" => "

                ".$b__for_css."__slide--".$slide_id." ".$b__for_css."__title-area-pretitle,
                ".$b__for_css."__slide--".$slide_id." ".$b__for_css."__title-area-title
                {
                  color: ".$slide["elements_color"]."!important;
                }

                ".$b__for_css."__slide--".$slide_id." ".$b__for_css."__title-area-pretitle:before
                {
                  background-color: ".$slide["elements_color"].";
                }

              "
            ])

            <div class="{{$b}}__slide-main-wrap">
              <div class="{{$b}}__slide-image-wrap">

                {{-- START: GRADIENT ON HOVER --}}
                  @if ($display_hover_gradient)
                    @include('core.style', [
                      "breakpoint__general" => "
                        ".$slide_class_for_css." ".$b__for_css."__slide-image:after
                        {
                          background: -moz-linear-gradient(top, rgba(255,255,255,0) 30%, ".$hover_gradient_color." 100%);
                          background: -webkit-linear-gradient(top, rgba(255,255,255,0) 30%, ".$hover_gradient_color." 100%);
                          background: linear-gradient(to bottom, rgba(255,255,255,0) 30%, ".$hover_gradient_color." 100%);
                          filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='".$hover_gradient_color."',GradientType=0 );
                        }
                      "
                    ])
                  @endif
                {{-- END: GRADIENT ON HOVER --}}

                {{-- START: VIDEO BUTTON --}}
                  @if ($slide["type"] == "image_and_video_embed")
                    @include('components.flo-hero-video-embed')
                  @endif
                {{-- END: VIDEO BUTTON --}}

                <div class="{{$b}}__slide-image" aria-label="{{$alt_text}}" style="background-image: url({{$slide["img"]}})"></div>

                {{-- START: VIDEO BACKGROUND --}}
                  @if ($slide["type"] == "video_slide")
                    <div class="{{$b}}__slide-background-video {{$b}}__slide-background-video--{{ $slide["object"]["slide_video_size"] }}">
                      <video muted playsinline loop autoplay>
                        <source src="{{ $slide["video_url"] }}" type="video/mp4">
                      </video>
                    </div>
                  @endif
                {{-- END: VIDEO BACKGROUND --}}
                @include('components.flo-slideshow__title-area')
              </div>

            </div>
          </div>
        @endforeach

      </div>
    @endif
  {{-- END: SLIDES --}}

</div>
