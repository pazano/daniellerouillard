{{-- Needs: $source, $images and $count --}}

<?php
  if (!isset($count)) {
    $count = 1;
  }
  if (!isset($instasize)) {
    $instasize = '320x320_crop';
  }
  $custom_width = isset($imgfeed_width) ? $imgfeed_width : 320;
  $custom_height = isset($imgfeed_height) ? $imgfeed_height : 320;
?>

<div class="{{$b}}__images">
  <?php
    $image_index = 1;
  ?>
  @if ($source == "images")
    @if ($images)
      @foreach ($images as $image)
        @if ($image_index <= $count)
          <?php
            $src = $image["url"];
            $image_alt = $image["alt"];
          ?>
          {{ flo_aq_img($class = $b . "__image", $url = $src, $width = $custom_width, $height = $custom_height, $crop = true, $alt = $image_alt, $force_sizes = true) }}
        @endif
        <?php
          $image_index++;
        ?>
      @endforeach
    @endif
  @elseif ($source == "plugin" && function_exists('flo_instagram_init') )
    <?php 
      $accountID = flo_data($data, "flo-instagram-footer-account"); 
      if(!$accountID) {
        $accountID = get_option("flo_instagram_user_id");
      }
    ?>
    {{ do_shortcode('[flo_instagram padding="0" use_pattern="" picture_sizes="'.$instasize.'" link="1" nr_columns="'.$count.'" limit="'.$count.'" new_user_id="'.$accountID.'" user_id="" access_token="" ]') }}
  @endif
</div>
