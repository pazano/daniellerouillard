<?php $fb_app_id = flo_get_option('flo-fb-app-id',''); ?>
@if(strlen($fb_app_id))
	<div id="fb-root"></div>
	<script src="//connect.facebook.net/en_US/all.js#xfbml=1&appId={{$fb_app_id}}" type="text/javascript"></script>
@endif
<div class="flo-comments__facebook">
	<div class="fb-root"></div>
	<script src="http://connect.facebook.net/en_US/all.js#xfbml=1" type="text/javascript"></script>
	<div class="fb-comments" data-href="<?php the_permalink(); ?>" data-numposts="5"></div>
</div>
