<?php
?>
@extends('layout.block', [
  "block_classes" => "flo-block--full-width flo-block--header", // Will be added to main block div. e.g. flo-block--full-width
  // "data_onready" => "block_name" // Specify a function (see _blank.js on how to define) that will be executed on document ready.
])
@section('block_content')
  @include('components.flo-header')
@overwrite
