(function($){


	function toArray(_Object){
		 var _Array = new Array();
		 for(var name in _Object){
						 _Array[name] = _Object[name];
		 }
		 return _Array;
	 }

	acf.fields.flo_flexible_content = acf.field.extend({

		type: 'flo_flexible_content',
		$el: null,
		$input: null,
		$values: null,
		$clones: null,

		actions: {
			'ready':	'initialize',
			'append':	'initialize',
			'show':		'show'
		},

		events: {
			'click [data-event="add-layout"]': 			'_open',
			'click .acf-flo-refresh-clone': 			'_refresh',
			'click [data-event="add-clone-layout"]': 			'_add_clone',
			'click [data-event="remove-layout"]': 		'_remove',
			'click [data-event="collapse-layout"]':		'_collapse',
			'click .acf-fc-layout-handle':				'_collapse',
			'click .acf-fc-layout-preview-image':				'_collapse',
			'click .acf-fc-popup a:not([data-event="add-clone-layout"])':					'_add',
			// 'click .acf-fc-popup  .acf-flo-flexible-content-blocks-popup__item':	'_close_2',
			// 'blur .acf-fc-popup .focus':				'_close',
			'click [data-event="move-first"]': 			'_make_first',
			'click [data-event="duplicate-layout"]': 			'_duplicate',
			'click .acf-flo-flexible-content-blocks-popup__close':				'_close',
			'mouseenter .acf-fc-layout-handle': 		'_mouseenter',
			'mouseenter .acf-fc-layout-preview-image': 		'_mouseenter',
		},

		focus: function(){

			// vars
			this.$el = this.$field.find('.acf-flexible-content:first');
			this.$input = this.$el.siblings('input');
			this.$values = this.$el.children('.values');
			this.$clones = this.$el.children('.clones');


			// get options
			this.o = acf.get_data( this.$el );


			// min / max
			this.o.min = this.o.min || 0;
			this.o.max = this.o.max || 0;

		},

		count: function(){

			return this.$values.children('.layout').length;

		},

		initialize: function(){

			// disable clone
			//acf.disable_form( this.$clones, 'flo_flexible_content' );

			// render
			this.render();

      /* START: HOOK THE add_json_template event TO THE add_json_template FUNCTION */
        var field = this;
        this.$el.on("add_json_template", function(e, layout_blocks){
          // console.log("Flo Flexible Content: Add Json Template procedure initiated");
          field.add_json_template(layout_blocks);
        });
      /* END: HOOK THE add_json_template event TO THE add_json_template FUNCTION */

		},

		show: function(){

			this.$values.find('.acf-field:visible').each(function(){

				acf.do_action('show_field', $(this));

			});

		},

		render: function(){

			// vars
			var self = this;


			// update order numbers
			this.$values.children('.layout').each(function( i ){

				$(this).find('> .acf-fc-layout-handle .acf-fc-layout-order').html( i+1 );

			});


			// empty?
			if( this.count() == 0 ) {

				this.$el.addClass('empty');

			} else {

				this.$el.removeClass('empty');

			}


			// row limit reached
			if( this.o.max > 0 && this.count() >= this.o.max ) {

				this.$el.find('> .acf-actions .button').addClass('disabled');

			} else {

				this.$el.find('> .acf-actions .button').removeClass('disabled');

			}

		},

		// render_layout_title: function( $layout ){

		// 	// vars
		// 	var ajax_data = acf.serialize( $layout );


		// 	// append
		// 	ajax_data = acf.parse_args( ajax_data, {
		// 		action: 	'acf/fields/flo_flexible_content/layout_title',
		// 		field_key: 	this.$field.data('key'),
		// 		i: 			$layout.index(),
		// 		layout:		$layout.data('layout')
		// 	});


		// 	// prepare
		// 	ajax_data = acf.prepare_for_ajax(ajax_data);


		// 	// ajax get title HTML
		// 	$.ajax({
		//     	url			: acf.get('ajaxurl'),
		// 		dataType	: 'html',
		// 		type		: 'post',
		// 		data		: ajax_data,
		// 		success: function( html ){

		// 			// bail early if no html
		// 			if( !html ) return;


		// 			// update html
		// 			$layout.find('> .acf-fc-layout-handle').html( html );

		// 		}
		// 	});

		// },

		validate_add: function( layout ){

			// defaults
			layout = layout || '';


			// vars
			var max = this.o.max,
				count = this.count();


			// vadiate max
			if( max && count >= max ) {

				// vars
				var identifier	= ( max == 1 ) ? 'layout' : 'layouts',
					s 			= acf._e('flo_flexible_content', 'max');


				// translate
				s = s.replace('{max}', max);
				s = s.replace('{identifier}', acf._e('flo_flexible_content', identifier));


				// alert
				alert( s );


				// return
				return false;

			}


			// vadiate max layout
			if( layout ) {

				// vars
				var $popup			= $( this.$el.children('.tmpl-popup').html() ),
					$a				= $popup.find('[data-layout="' + layout + '"]'),
					layout_max		= parseInt( $a.attr('data-max') ),
					layout_count	= this.$values.children('.layout[data-layout="' + layout + '"]').length;


				if( layout_max > 0 && layout_count >= layout_max ) {

					// vars
					var identifier	= ( layout_max == 1 ) ? 'layout' : 'layouts',
						s 			= acf._e('flo_flexible_content', 'max_layout');


					// translate
					s = s.replace('{max}', layout_count);
					s = s.replace('{label}', '"' + $a.text() + '"');
					s = s.replace('{identifier}', acf._e('flo_flexible_content', identifier));


					// alert
					alert( s );


					// return
					return false;
				}

			}


			// return
			return true;

		},

		validate_remove: function( layout ){

			// defaults
			layout = layout || '';


			// vars
			var min = this.o.min,
				count = this.count();


			// vadiate min
			if( min > 0 && count <= min ) {

				// vars
				var identifier	= ( min == 1 ) ? 'layout' : 'layouts',
					s 			= acf._e('flo_flexible_content', 'min') + ', ' + acf._e('flo_flexible_content', 'remove');


				// translate
				s = s.replace('{min}', min);
				s = s.replace('{identifier}', acf._e('flo_flexible_content', identifier));
				s = s.replace('{layout}', acf._e('flo_flexible_content', 'layout'));


				// return
				return confirm( s );

			}


			// vadiate min layout
			if( layout ) {

				// vars
				var $popup			= $( this.$el.children('.tmpl-popup').html() ),
					$a				= $popup.find('[data-layout="' + layout + '"]'),
					layout_min		= parseInt( $a.attr('data-min') ),
					layout_count	= this.$values.children('.layout[data-layout="' + layout + '"]').length;


				if( layout_min > 0 && layout_count <= layout_min ) {

					// vars
					var identifier	= ( layout_min == 1 ) ? 'layout' : 'layouts',
						s 			= acf._e('flo_flexible_content', 'min_layout') + ', ' + acf._e('flo_flexible_content', 'remove');


					// translate
					s = s.replace('{min}', layout_count);
					s = s.replace('{label}', '"' + $a.text() + '"');
					s = s.replace('{identifier}', acf._e('flo_flexible_content', identifier));
					s = s.replace('{layout}', acf._e('flo_flexible_content', 'layout'));


					// return
					return confirm( s );

				}

			}


			// return
			return true;

		},

		sync: function(){

			// vars
			var name = 'collapsed_' + this.$field.data('key'),
				collapsed = [];


			// populate collapsed value
			this.$values.children('.layout').each(function( i ){

				if( $(this).hasClass('-collapsed') ) {

					collapsed.push( i );

				}

			});


			// update
			acf.update_user_setting( name, collapsed.join(',') );

		},

		add: function( layout, $before, cloned_block ){

			// defaults
			$before = $before || false;


			// bail early if validation fails
			if( !this.validate_add(layout) ) {

				return false;

			}

			var this_obj = this;


			// make an ajax request and get the block we need - the one the user clicked on
			// @param: page_url - it is used to differentiate btween some options pages and single pages
			// @param: layout - the layout block we need to add

			if ( cloned_block === undefined ) {
					data = '&action=floAddLayoutBlock&page_url='+encodeURIComponent(window.location.href)+'&layout='+layout+'&screen_post_type='+jQuery('.flo-screen-post-type').val()
			} else {
				data = {
					action: "floAddLayoutBlock",
					page_url: window.location.href,
					layout,
					screen_post_type: jQuery('.flo-screen-post-type').val(),
					cloned_block
				}
			}
			jQuery.ajax({
				url: ajaxurl,
				data,
				type: 'POST',
				dataType: "json",

				success: function (json) {

					// reference
					var $field = this_obj.$field;

					// console.log(json)
					// vars
					/// use here the 'response'
					var block = jQuery(json.block);
					// the hidden input name must be in the following format: acf[field_5950e98f78a32][59f2f3c529c74][acf_fc_layout]
					var block_id = Math.floor(Math.random() * (99999 - 1 + 1)) + 1;

					// the first hidden input from each layout block - it is used to store this block in the Layout
					var hidden_input_name = 'acf['+json.key+']['+block_id+'][acf_fc_layout]';

					block.addClass(' -collapsed ui-sortable-handle '); // add this class to make the block collapsed by default
					block.removeClass('acf-clone');
					block.attr('data-id',block_id); // we need this for some reason


					// we should iterate throught all the hidden inputs
					// there may be situations whre some hidden inputs are not the ones that define the Block structure
					// for example such field is the  'Link' field which contains the link structure in 3 hidden inputs with the
					// classes: .input-url, .input-title, .input-target
					block.find('.acf-hidden input').each( function( index ) {

						// exclude the hidden inputs from Link field and from the Gallery field
					  if(!$( this ).is('.input-url, .input-title, .input-target, .acf-gallery .acf-hidden input, .acf-gallery-main .acf-gallery-attachment input') ){
							$( this ).attr('name',hidden_input_name);
						}

					});



					// iterate throught each input/textarea/select from the block, and set the correct names
					// this way ensuring the data si saved correctly
					jQuery(block).find('.acf-input input, .acf-input textarea, .acf-input select').each(function( index ) {

						// figure out the correct input name
					  	var input_name = jQuery(this).attr('name'); // this is the name we get by default
						// it has a format like: name="layout[acfcloneindex][field_59d38427bf051_field_59d37eac01815]"
						// but it should be like name="acf[field_59b6785041713][field_59d38427bf051_field_59d37eac01815]"

						if( typeof input_name != 'undefined') {
							// therefore the 'layout[acfcloneindex]' part should be replaced with 'acf[field_59b6785041713]'
							input_name = input_name.replace('layout[acfcloneindex]', 'acf['+json.key+']['+block_id+']');

							jQuery(this).attr('name', input_name); // replace the name with good one
						}


					});


					//var $clone = block;

					$el = block;


					// enable
					acf.enable_form( $el, 'flo_flexible_content' );


					// add row
					if( $before ) {

						 $before.before( $el );

					} else {

						this_obj.$values.append( $el );

					}


					// focus (may have added sub flexible content)
					this_obj.doFocus($field);


					// update order
					this_obj.render();


					// validation
					acf.validation.remove_error( this_obj.$field );


					// sync collapsed order
					this_obj.sync();

					setTimeout(function(){

						// this will properly initialize the added ACF fields
						acf.do_action('append', block );

					}, 200);

					// hide the following message: "Click the "Add Block" button below to start creating your layout"
					jQuery('.no-value-message').hide();
				}

			});


		},

	    add_json_template: function(template_blocks) {
	      //console.log(template_blocks);
	      var this_obj = this;

	      template_blocks = template_blocks.replace('[','').replace(']','').replace(/"/g,'').replace(/ /g,'');

				// make an ajax request and get the block we need - the one the user clicked on
				// @param: page_url - it is used to differentiate btween some options pages and single pages
				// @param: layout - the layout block we need to add
				jQuery.ajax({
					url: ajaxurl,
					data: '&action=floAddTemplateLayoutBlocks&page_url='+encodeURIComponent(window.location.href)+'&template_blocks='+encodeURIComponent(template_blocks)+'&screen_post_type='+jQuery('.flo-screen-post-type').val(),
					type: 'POST',
					dataType: "json",
					success: function (json) {

						// reference
						var $field = this_obj.$field;

						jQuery.each( json, function( json_key, json_value ) {
						  //console.log( json_value );

							if(json_value.block == 'Flo Requested Layout was not found!!!'){
								console.log('Flo Requested Layout was not found!!!');
								console.log(json_value);

								// if for some reason one of the block was not found,
								// skip this loop iteration
								return;
							}

							// vars
							/// use here the 'response'
							var block = jQuery(json_value.block);



							// the hidden input name must be in the following format: acf[field_5950e98f78a32][59f2f3c529c74][acf_fc_layout]
							var block_id = Math.floor(Math.random() * (99999 - 1 + 1)) + 1;

							// the first hidden input from each layout block - it is used to store this block in the Layout
							var hidden_input_name = 'acf['+json_value.key+']['+block_id+'][acf_fc_layout]';

							block.addClass(' -collapsed ui-sortable-handle '); // add this class to make the block collapsed by default
							block.removeClass('acf-clone');
							block.attr('data-id',block_id); // we need this for some reason
							//block.find('.acf-hidden input').attr('name',hidden_input_name); // replace the name with good one

							// we should iterate throught all the hidden inputs
							// there may be situations whre some hidden inputs are not the ones that define the Block structure
							// for example such field is the  'Link' field which contains the link structure in 3 hidden inputs with the
							// classes: .input-url, .input-title, .input-target
							block.find('.acf-hidden input').each( function( index ) {

								// exclude the hidden inputs from Link field
							  if(!$( this ).is('.input-url, .input-title, .input-target, .acf-gallery .acf-hidden input, .acf-gallery-main .acf-gallery-attachment input') ){
									$( this ).attr('name',hidden_input_name);
								}

							});

							// iterate throught each input/textarea/select from the block, and set the correct names
							// this way ensuring the data si saved correctly
							jQuery(block).find('.acf-input input, .acf-input textarea, .acf-input select').each(function( index ) {

								// figure out the correct input name
							  	var input_name = jQuery(this).attr('name'); // this is the name we get by default
								// it has a format like: name="layout[acfcloneindex][field_59d38427bf051_field_59d37eac01815]"
								// but it should be like name="acf[field_59b6785041713][field_59d38427bf051_field_59d37eac01815]"

								if( typeof input_name != 'undefined') {
									// therefore the 'layout[acfcloneindex]' part should be replaced with 'acf[field_59b6785041713]'
									input_name = input_name.replace('layout[acfcloneindex]', 'acf['+json_value.key+']['+block_id+']');

									jQuery(this).attr('name', input_name); // replace the name with good one
								}

							});


							//var $clone = block;

							$el = block;


							// enable
							acf.enable_form( $el, 'flo_flexible_content' );


							// add row
							this_obj.$values.append( $el );


							// focus (may have added sub flexible content)
							this_obj.doFocus($field);


							// update order
							this_obj.render();


							// validation
							acf.validation.remove_error( this_obj.$field );


							// sync collapsed order
							this_obj.sync();

							setTimeout(function(){

								// this will properly initialize the added ACF fields
								acf.do_action('append', block );

							}, 200);

							jQuery('.no-value-message').hide();

						});


					}

				});
	    },

		/*
		*  events
		*
		*  these functions are fired for this fields events
		*
		*  @type	function
		*  @date	17/09/2015
		*  @since	5.2.3
		*
		*  @param	e
		*  @return	n/a
		*/

    _makesortable: function( e ) {
			var self = this;
			this.$values.sortable({
				items: '> .layout.-collapsed',
				// handle: '> .layout',
				forceHelperSize: true,
				forcePlaceholderSize: true,
				scroll: true,
				start: function(event, ui) {

					acf.do_action('sortstart', ui.item, ui.placeholder);

	   			},
	   			stop: function(event, ui) {

					// render
					self.render();

					acf.do_action('sortstop', ui.item, ui.placeholder);

	   			},
	   			update: function(event, ui) {

		   			// trigger change
					self.$input.trigger('change');

		   		}
			});
    },

		_mouseenter: function( e ){ //console.log('_mouseenter');

			// bail early if already sortable
			if( this.$values.hasClass('ui-sortable') ) return;


			// bail early if max 1 row
			if( this.o.max == 1 ) return;


			// reference
			var self = this;


			// sortable
      this._makesortable();

		},

		_open: function( e, clone ){ //console.log('_open');

      if (this.$el.find(".acf-fc-popup:not(.acf-fc-popup--hidden)").length) return false;

			// bail early if validation fails
			if( !this.validate_add() ) return false;


			// reference
			var $values = this.$values;


			// vars
			var $popup = $( this.$el.children('.tmpl-popup').html() );

			// modify popup
			$popup.find('a').each(function(){

        if ( $(this).hasClass('acf-flo-flexible-content-blocks-popup__item')) {
          // START: PROCESS CONDITIONS

            var thumb = $(this);
            var thumb__display = true;

            // Start: Hide if
              var conditions__hide_if = JSON.parse(thumb.attr("data-hide-if"));
              conditions__hide_if.forEach(function(value){
                // If there is an object with the needed class then the object is visible
                if ( value && $("."+value).length ) {
                  thumb__display = false;
                }

                if ( value && value == "always" ) {
                  thumb__display = false;
                }
              });
            // End: Hide if

            // Start: Show if
              var conditions__show_if = JSON.parse(thumb.attr("data-show-if"));
              conditions__show_if.forEach(function(value){
                // If there is an object with the needed class then the object is visible
                if ( value && $("."+value).length ) {
                  thumb__display = true;
                }
              });
            // End: Show if

            if (thumb__display) {
              thumb.addClass("visible");
            }

          // END: PROCESS CONDITIONS
        }

				// vars
				var $a = $(this),
					min = $a.data('min') || 0,
					max = $a.data('max') || 0,
					name = $a.data('layout'),
					count = $values.children('.layout[data-layout="' + name + '"]').length;


				// max
				if( max && count >= max) {

					$a.addClass('disabled');
					return;

				}

				// min
				if( min ) {

					// find diff
					var required	= min - count,
						s			= acf._e('flo_flexible_content', 'required'),
						identifier	= ( required == 1 ) ? 'layout' : 'layouts',


					// translate
					s = s.replace('{required}', required);
					s = s.replace('{min}', min);
					s = s.replace('{label} ', ''); // remove label since 5.5.0
					s = s.replace('{identifier}', acf._e('flo_flexible_content', identifier));


					// limit reached?
					if( required > 0 ) {

						var $badge = $('<span class="badge"></span>').attr('title', s).text(required);
						$a.append( $badge );

					}

				}

			});


			// add popup
			e.$el.after( $popup );


			// within layout?
			if( e.$el.closest('.acf-fc-layout-controlls').exists() ) {

				$popup.closest('.layout').addClass('-open');

			}


			// vars
			$popup.css({
				'margin-top' : 0 - $popup.height() - e.$el.outerHeight() - 15,
				'margin-left' : ( e.$el.outerWidth() - $popup.width() ) / 2
			});


			// check distance to top
			var dist_to_top = $popup.offset().top,
				min = ($('#wpadminbar').height() || 0) + 30; // 30px buffer below 'top'

			if( dist_to_top < min ) {

				$popup.css({
					'margin-top' : 15
				});

				$popup.addClass('bottom');

			}


			// focus
			$popup.children('.focus').trigger('focus');
			$('.acf-flo-flexible-content-blocks-popup__search-blocks').focus();

			let totalBlocksArrayFromStorage = localStorage.getItem('cloned_block')
			if ( totalBlocksArrayFromStorage ) {
				let storredArray = toArray(JSON.parse(totalBlocksArrayFromStorage))

				$( ".acf-flo-flexible-content-blocks-popup__items--clone" ).remove();
				jQuery('.acf-flo-flexible-content-blocks-popup__items').append(`
					<div class="acf-flo-flexible-content-blocks-popup__items acf-flo-flexible-content-blocks-popup__items--clone">
						<div class="acf-flo-flexible-content-blocks-popup__items--clone-header">
						<span class="acf-flo-flexible-content-blocks-popup__item-label">Cloned Blocks</span>
						<a href="#" class="acf-flo-refresh-clone acf-icon small -sync"></a>
						</div>
					</div>
				`)

				$.each(storredArray, function(e, i) {
					let visibility = jQuery(`.acf-flo-flexible-content-blocks-popup__item[data-layout="${i.blockData.name}"]`).hasClass('visible')? 'visible' : 'hidden'
					jQuery('.acf-flo-flexible-content-blocks-popup__items--clone').append(`
							<a href="#" class="acf-flo-flexible-content-blocks-popup__item ${visibility}" data-index="${e}" data-layout="${i.blockData.name}" title="${i.post_title}" data-event="add-clone-layout" data-min="${i.blockData.min}" data-max="${i.blockData.max}" data-preview="${i.blockData.preview_url}" data-show-if='${i.blockData.show_if}' data-hide-if='${i.blockData.hide_if}'>
				        <span class="acf-flo-flexible-content-blocks-popup__item-image" style="background-image: url(${i.blockData.thumbnail_url})">
				        </span>
								<span class="acf-flo-flexible-content-blocks-popup__item-label">${i.blockData.label}</span>
							</a>
					`)
				})
			}

		},

		_close: function( e ){ //console.log('_close');

			var $popup = e.$el.parent(),
				$layout = $popup.closest('.layout');


			// hide controlls?
			$layout.removeClass('-open');


			// remove popup
			setTimeout(function(){

				// $popup.remove();
        $popup.fadeOut(200, function() { $(this).remove(); });

			}, 200);

		},

    _close_2: function( e ){ //console.log('_close');

			var $popup = this.$el.find('.acf-fc-popup'),
				  $layout = this.$el.find('.layout');

			// hide controlls?
			$layout.removeClass('-open');


			// remove popup
			setTimeout(function(){

				// $popup.remove();
        $popup.fadeOut(200, function() { $(this).remove(); });

			}, 200);

		},

		_add: function( e ){ //console.log('_add');

			// vars
			var $popup = e.$el.closest('.acf-fc-popup'),
				layout = e.$el.attr('data-layout'),
				$before = false;

			// move row
			if( $popup.closest('.acf-fc-layout-controlls').exists() ) {

				$before = $popup.closest('.layout');

			}
      // Start: If footer is last -> add new layout before it
        $last_layout = $(this.$el).find(".values .layout").last();
        if ($last_layout.attr("data-layout") == "footer_placeholder") {
          $before = $last_layout;
        }
      // End: If footer is last -> add new layout before it


			// add row
			this.add( layout, $before );
			$('.acf-flo-flexible-content-blocks-popup__close').trigger('click');

		},

		_remove: function( e ){ //console.log('_remove');
      var confirmation = true;
      if (e.dontAsk != true) {
        confirmation = confirm("Are you sure?");
      }

      if (!confirmation) return;

			// reference
			var self = this;


			// vars
			var $layout	= e.$el.closest('.layout');


			// bail early if validation fails
			if( !this.validate_remove( $layout.attr('data-layout') ) ) {

				return;

			}


			// close field
			var end_height = 0,
				$message = this.$el.children('.no-value-message');

			if( $layout.siblings('.layout').length == 0 ) {

				end_height = $message.outerHeight();

			}


			// action for 3rd party customization
			acf.do_action('remove', $layout);


			// remove
			acf.remove_el( $layout, function(){

				// update order
				self.render();


				// trigger change to allow attachment save
				self.$input.trigger('change');


				if( end_height > 0 ) {

					$message.show();

				}


				// sync collapsed order
				self.sync();

			}, end_height);

		},

		_collapse: function( e ){ //console.log('_collapse');

			// vars
			var $layout	= e.$el.closest('.layout'),
				collapsed = $layout.hasClass('-collapsed'),
				action = collapsed ? 'show' : 'hide';


			// render
			// - do this before calling actions to avoif focusing on the wrong field
			//this.render_layout_title( $layout );


			// toggle class
			$layout.toggleClass('-collapsed');

      var self = this;
      self.$values.sortable("destroy");
      setTimeout(function () {
        self._makesortable();
      }, 10);

			// sync collapsed order
			this.sync();


			// action
			acf.do_action(action, $layout, 'collapse');

		},

		_make_first: function( e ) {

			// target block:
			var $layout	= e.$el.closest('.layout');

			if(!$layout.is(":first-child")){
				// if block is not first, make it first :)
				this.$values.prepend($layout);

				// reincrement all relevant indexes
				this.$values.children('.layout').each(function(index){
					$(this).attr('data-id', index);
					$(this).find('> .acf-fc-layout-handle .acf-fc-layout-order').html( index + 1 );
				});
			} else {
				// is first, no action necessary
				return false;
			}

		},

		_duplicate: function( e ) {

			var _fields	= e.$el.closest('.layout').find('input, textarea, select')

			var data = new FormData();
			var blockData = JSON.parse(e.$el.attr('data-block-setting'))
			var post_title = `Cloned from ${$('[name="post_title"]').val()}`
			var fullObject = {}

			/**
			 * Simple object check.
			 * @param item
			 * @returns {boolean}
			 */
			function isObject(item) {
			  return (item && typeof item === 'object' && !Array.isArray(item));
			}

			/**
			 * Deep merge two objects.
			 * @param target
			 * @param ...sources
			 */
			function mergeDeep(target, ...sources) {
			  if (!sources.length) return target;
			  const source = sources.shift();

			  if (isObject(target) && isObject(source)) {
			    for (const key in source) {
			      if (isObject(source[key])) {
			        if (!target[key]) Object.assign(target, { [key]: {} });
			        mergeDeep(target[key], source[key]);
			      } else {
			        Object.assign(target, { [key]: source[key] });
			      }
			    }
			  }

			  return mergeDeep(target, ...sources);
			}

			function assocArray(jsonString, fullObject) {
						var input = jsonString
						var pair = input.split(':::').map(function (str) { return str.replace(/-----/g, ''); });
						pair[0].split('.')
						let formatted = pair[0].replace(' ','')
						var newObj = setObjVal({}, pair[0].split('.'), pair[1]);

						let tmpObj = fullObject
						finallObject = mergeDeep(tmpObj, newObj);

						return finallObject
			}

			function setObjVal(obj, paths, val) {
				var arrayRegExp = /^(\w+)\((\d+)\)$/;

				var path;
				var arrayInfo;

				if (paths.length === 0) {
					return val;
				}

				obj = obj || {};
				path = paths.shift();
				arrayInfo = path.match(arrayRegExp);

				if (arrayInfo) {
					path = arrayInfo[1];

					if (!Array.isArray(obj[path])) {
						obj[path] = [];
					}

					obj[path][arrayInfo[2]] = setObjVal(obj[path][arrayInfo[2]], paths, val);
				}
				else {
					obj[path] = setObjVal(obj[path], paths, val);
				}

				return obj;
			}

			e.$el.addClass('saved');
			_fields.each( function(e, i) {
					let name = '',
							type = '',
							multiple = false
					let objValue = '',
							newObj = {}

					if ($(i).attr('name') !== undefined) {

						name = $(i).attr('name')
						if ( $(i).is("textarea") ) {
							type = 'textarea'
						} else if ( $(i).is("select") ) {
							type = 'select'
						} else {
							type = $(i).attr('type')
						}

						switch(type) {
						  case 'checkbox':
						    objValue = $(i).is(":checked") ? 1 : 0
						    break;
						  case 'radio':
						    	if ( $(i).is(":checked") && $(i).val() !== '' && $(i).val() !== undefined) {
										objValue = $(i).val()
									}
						    break;
							case 'text':
								if (!$(i).hasClass('wp-color-picker'))  {
									objValue = $(i).val().replace(/'/g, "%27")
								} else {
									objValue = $(i).val()
								}
								break;
							case 'hidden':
								if (!$(i).hasClass('wp-color-picker'))   {
									objValue = $(i).val()
								}
								break;
							case 'textarea':
								objValue = $(i).val().replace(/'/g, "%27")
								break;
							case 'select':
								if ( typeof $(i).attr('data-multiple') !== typeof undefined && $(i).attr('data-multiple') !== false ) {
									objValue = $(i).val()
									multiple = true
								} else {
									objValue = $(i).val()
								}
								break;
						  default:
								if ( typeof $(i).attr('value') !== typeof undefined && $(i).attr('value') !== false && $(i).val() !== '' && $(i).val() !== undefined ) {
									objValue = $(i).val()
								}
						}

						if ( objValue && !$(i).parent().hasClass('acf-flo-color-picker__custom-color-picker') ) {
							let newStr = name.replace(/\[\]/g, '').replace(/\]\[/g, '.').replace(/\[/g, '.').replace(/\]/g, '').replace(' ','')

							if ( ( type === 'select' && multiple ) || $(i).parent().hasClass('acf-gallery-attachment') ) {
								let index = 0
								if ( multiple ) {
									$(i).find(":selected").each(function(e){
											jsonString = `-----${newStr}.${index}-----:::-----${$(this).val()}-----`
							        newObj = assocArray(jsonString, fullObject)
											index++
							    });
								} else {
									$('[name="'+name+'"]').each( function(e, item) {
										jsonString = `-----${newStr}.${index}-----:::-----${$(item).val()}-----`
										newObj = assocArray(jsonString, fullObject)
										index++
									})
								}
							} else {
									jsonString = `-----${newStr}-----:::-----${objValue}-----`
									newObj = assocArray(jsonString, fullObject)
							}
							if ( newObj.acf ) {
								newObj.acf.blockData = blockData
								newObj.acf.post_title = post_title
								newObj.acf.pagenow = pagenow
							}

						}

					}

	    }, post_title, blockData);
			let storredArray = []
			let totalBlocksArrayFromStorage = localStorage.getItem('cloned_block')
			if ( totalBlocksArrayFromStorage ) {
				storredArray = toArray(JSON.parse(totalBlocksArrayFromStorage))
				storredArray.unshift(finallObject.acf)
				if (storredArray.length > 9) {
					storredArray.length = 9;
				}

			} else {
				storredArray.unshift(finallObject.acf)
			}

			$( ".acf-flo-flexible-content-blocks-popup__items--clone" ).remove();
			jQuery('.acf-flo-flexible-content-blocks-popup__items').append(`
				<div class="acf-flo-flexible-content-blocks-popup__items acf-flo-flexible-content-blocks-popup__items--clone">
					<div class="acf-flo-flexible-content-blocks-popup__items--clone-header">
					<span class="acf-flo-flexible-content-blocks-popup__item-label">Cloned Blocks</span>
					<a href="#" class="acf-flo-refresh-clone acf-icon small -sync"></a>
					</div>
				</div>
			`)

			$.each(storredArray, function(e, i) {
				let visibility = jQuery(`.acf-flo-flexible-content-blocks-popup__item[data-layout="${i.blockData.name}"]`).hasClass('visible')? 'visible' : 'hidden'
				jQuery('.acf-flo-flexible-content-blocks-popup__items--clone').append(`
						<a href="#" class="acf-flo-flexible-content-blocks-popup__item ${visibility}" data-index="${e}" data-layout="${i.blockData.name}" title="${i.post_title}" data-event="add-clone-layout" data-min="${i.blockData.min}" data-max="${i.blockData.max}" data-preview="${i.blockData.preview_url}" data-show-if='${i.blockData.show_if}' data-hide-if='${i.blockData.hide_if}'>
							<span class="acf-flo-flexible-content-blocks-popup__item-image" style="background-image: url(${i.blockData.thumbnail_url})">
							</span>
							<span class="acf-flo-flexible-content-blocks-popup__item-label">${i.blockData.label}</span>
						</a>
				`)
			})

			localStorage.setItem('cloned_block', JSON.stringify(storredArray));
			setTimeout(function(){ e.$el.removeClass('saved'); }, 2000);

		},

		_refresh: function( e ) {

			let totalBlocksArrayFromStorage = localStorage.getItem('cloned_block')
			let storredArray = toArray(JSON.parse(totalBlocksArrayFromStorage))

			$( ".acf-flo-flexible-content-blocks-popup__items--clone" ).remove();
			jQuery('.acf-flo-flexible-content-blocks-popup__items').append(`
				<div class="acf-flo-flexible-content-blocks-popup__items acf-flo-flexible-content-blocks-popup__items--clone">
					<div class="acf-flo-flexible-content-blocks-popup__items--clone-header">
					<span class="acf-flo-flexible-content-blocks-popup__item-label">Cloned Blocks</span>
					<a href="#" class="acf-flo-refresh-clone acf-icon small -sync"></a>
					</div>
				</div>
			`)

			$.each(storredArray, function(e, i) {
				let visibility = jQuery(`.acf-flo-flexible-content-blocks-popup__item[data-layout="${i.blockData.name}"]`).hasClass('visible')? 'visible' : 'hidden'
				jQuery('.acf-flo-flexible-content-blocks-popup__items--clone').append(`
						<a href="#" class="acf-flo-flexible-content-blocks-popup__item ${visibility}" data-index="${e}" data-layout="${i.blockData.name}" title="${i.post_title}" data-event="add-clone-layout" data-min="${i.blockData.min}" data-max="${i.blockData.max}" data-preview="${i.blockData.preview_url}" data-show-if='${i.blockData.show_if}' data-hide-if='${i.blockData.hide_if}'>
			        <span class="acf-flo-flexible-content-blocks-popup__item-image" style="background-image: url(${i.blockData.thumbnail_url})">
			        </span>
							<span class="acf-flo-flexible-content-blocks-popup__item-label">${i.blockData.label}</span>
						</a>
				`)
			})

		},

		_add_clone: function( e ) {
			// vars
			var $popup = e.$el.closest('.acf-fc-popup'),
				layout_index = e.$el.attr('data-index'),
				$before = false;

			// move row
			if( $popup.closest('.acf-fc-layout-controlls').exists() ) {

				$before = $popup.closest('.layout');

			}
      // Start: If footer is last -> add new layout before it
        $last_layout = $(this.$el).find(".values .layout").last();
        if ($last_layout.attr("data-layout") == "footer_placeholder") {
          $before = $last_layout;
        }
      // End: If footer is last -> add new layout before it

			var cloned_block = localStorage.getItem('cloned_block');
			layout = JSON.parse(cloned_block)
			layoutKey = layout[layout_index]
			layoutName = layoutKey.blockData.name
			indexKey = layoutKey[Object.keys(layoutKey)[0]]
			layoutIndex = indexKey[Object.keys(indexKey)[0]]
			if ( layoutKey.pagenow === 'page' ) {
				this.add(layoutName, $before, layoutIndex)
			} else {
				layoutIndexPost = layoutIndex[Object.keys(layoutIndex)[0]]
				this.add(layoutName, $before, layoutIndexPost)
			}

			$('.acf-flo-flexible-content-blocks-popup__close').trigger('click');
		}

	});

})(jQuery);
