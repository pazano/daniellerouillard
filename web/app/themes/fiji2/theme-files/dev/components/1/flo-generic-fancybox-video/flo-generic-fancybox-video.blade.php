<?php
$b = "flo-generic-fancybox-video"; // To be used inside HTML

// Start: Class name automation
  $b__for_css = ".".$b; // To be used inside CSS
  $uniq_id = mt_rand(1, 999);
  $b__uniq = $b . "--" . $uniq_id;
  $b__uniq_for_css = "." . $b__uniq;
// End: Class name automation

?>
<a data-fancybox data-type="iframe" data-src="javascript:document.write('{{htmlentities($video_code)}}')" data-ssrc="#{{$b}}__code--{{$uniq_id}}" class="{{$b}} {{$b__uniq}}">
  <script type="text/html" class="{{$b}}__code" id="{{$b}}__code--{{$uniq_id}}">
    {{$video_code}}
  </script>
</a>
