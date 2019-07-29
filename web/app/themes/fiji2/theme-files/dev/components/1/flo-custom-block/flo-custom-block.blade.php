<?php
  	$code = $data["flo-block-custom__code"];
  	ob_start();
	eval( '?>'.$code );
	$code = ob_get_contents();
	ob_end_clean();
?>

@extends("layout.block")
@section('block_content')
	{{ $code }}
@overwrite
