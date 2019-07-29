<?php
	$default_sharing_services = array(
    	array(  'value' => 'facebook', 'label' => 'Facebook'),
		array(  'value' => 'twitter', 'label' => 'Twitter' ),
		array(  'value' => 'pinterest', 'label' => 'Pinterest' )
	);
	$flo_sharing_options = flo_get_option('flo-lovely2-sharing-options', $default_sharing_services);

	global $share_enabled, $pinterest_sharing_enabled;
  	$share_enabled = true; //flag that share enabled
  	$pinterest_sharing_enabled = false;
?>

@if(isset($flo_sharing_options) && is_array( $flo_sharing_options) && sizeof($flo_sharing_options))
	<?php
    $site_title = get_bloginfo('name');
		$post_permalink = urlencode(get_permalink($post->ID));
    
		$social_mapping = array(
			'facebook' => 'http://www.facebook.com/sharer/sharer.php?u='.$post_permalink,
			'twitter' => 'http://twitter.com/home?status='.urlencode($post->post_title).'+'.$post_permalink,
			'gplus' => 'https://plus.google.com/share?url='.$post_permalink,
      		'pinterest' => 'https://www.pinterest.com/pin/create/button/'
		);

	?>

  @foreach($flo_sharing_options as $key => $social_profile)
  	@if( isset($social_profile['value']) && 'pinterest' == $social_profile['value'])
  		<?php  $pinterest_sharing_enabled = true;  // this flag is used in the footer to include the necessary Pinterest script ?>
  		<a class="flo-share-link" data-pin-do="buttonBookmark" data-pin-custom="true" href="https://www.pinterest.com/pin/create/button/">
  			<i class="flo-icon-{{$social_profile['value']}}"></i>
  		</a>
  		
  	@else
  		@if( isset($social_profile['value']) && isset($social_mapping[$social_profile['value']]))
		  	<a class="flo-share-link" href="{{$social_mapping[$social_profile['value']]}}" target="_blank">
		      <i class="flo-icon-{{$social_profile['value']}}"></i>
		  	</a>
	  	@endif
  	@endif
  @endforeach
  

@endif
