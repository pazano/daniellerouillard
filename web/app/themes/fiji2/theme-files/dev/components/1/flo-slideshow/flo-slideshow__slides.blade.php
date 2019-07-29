<?php
$b = "flo-slideshow"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
// End: Class name automation

?>

@if($slideshow_data["slides"])
  <div class="{{$b}}__slides" data-slick='{ "speed": {{ $slideshow_data["transition_speed"] }}, "fade": {{ $slideshow_data["fade"] }}, "autoplay": {{ $slideshow_data["autoplay"] }}, "autoplaySpeed": {{ $slideshow_data["autoplay_speed"] }}, "pauseOnHover": {{ $slideshow_data["pause_on_hover"] }} }' data-autoplay="{{ $slideshow_data['autoplay'] }}" data-onready="flo_slideshow__slides">

    @foreach($slideshow_data["slides"] as $slide)
      <?php
        $slide_class = $b."__slide--".mt_rand(1, 9999);
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
      class="{{$b}}__slide {{ $slide_class }} {{$b}}__slide--{{$slide["type"]}}"  data-elements-color="{{$slide["elements_color"]}}"
      data-title="{{$slide["title"]}}"
      data-pretitle="{{$slide["pretitle"]}}"
      data-url="{{$slide["url"]}}"
      data-img="{{$slide["img"]}}"

      @if ($slide["type"] == "image_and_video_embed")
        data-embed-code="{{ htmlentities($slide["video_embed_code"]) }}"
      @endif

      >
        {{-- START: GRADIENT ON HOVER --}}
          @if ($display_hover_gradient)
            @include('core.style', [
              "breakpoint__general" => "
                ".$slide_class_for_css." ".$b__for_css."__slide-img:after,
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

        <div class="{{$b}}__slide-content">
          <div class="{{$b}}__slide-img {{$b}}__slide-img--bgi" aria-label="{{$alt_text}}" style="background-image: url({{$slide["img"]}})"></div>

          @include('components.flo-slideshow__title-area')

          {{-- START: VIDEO BACKGROUND --}}
            @if ($slide["type"] == "video_slide")
              <div class="{{$b}}__slide-background-video {{$b}}__slide-background-video--{{ $slide["object"]["slide_video_size"] }}">
                <video muted playsinline loop autoplay>
                  <source src="{{ $slide["video_url"] }}" type="video/mp4">
                </video>
              </div>
            @endif
          {{-- END: VIDEO BACKGROUND --}}
        </div>

      </div>
    @endforeach

  </div>
@endif
