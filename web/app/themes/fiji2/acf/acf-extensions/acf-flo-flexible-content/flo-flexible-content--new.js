/**
 *
 * The code below is based on 
 * acf-plugin/pro/assets/js/acf-pro-input.js from SCF 5.7.7
 * and adapted to work for Flo flexible content
 */

(function($){
	
	var Field = acf.Field.extend({
		
		type: 'flo_flexible_content',
		wait: '',

		$el: null,
		$input: null,
		$values: null,
		$clones: null,
		o,
		
		
		
		events: {
			'click [data-event="add-layout"]': 			'_open',
			'click [data-event="remove-layout"]': 		'_remove',
			'click [data-event="collapse-layout"]':		'_collapse',
			'click .acf-fc-layout-handle':				'_collapse',
			'click .acf-fc-layout-preview-image':				'_collapse',
			'click .acf-fc-popup a':					'_add',
			// 'click .acf-fc-popup  .acf-flo-flexible-content-blocks-popup__item':	'_close_2',
			// 'blur .acf-fc-popup .focus':				'_close',
			'click [data-event="move-first"]': 			'_make_first',
			'click .acf-flo-flexible-content-blocks-popup__close':				'_close',
			'mouseenter .acf-fc-layout-handle': 		'_mouseenter',
			'mouseenter .acf-fc-layout-preview-image': 		'_mouseenter',
		},

		$control: function(){
			return this.$('.acf-flexible-content:first');
		},
		
		$layoutsWrap: function(){
			return this.$('.acf-flexible-content:first > .values');
		},
		
		$layouts: function(){
			return this.$('.acf-flexible-content:first > .values > .layout');
		},
		
		$layout: function( index ){
			return this.$('.acf-flexible-content:first > .values > .layout:eq(' + index + ')');
		},
		
		$clonesWrap: function(){
			return this.$('.acf-flexible-content:first > .clones');
		},
		
		$clones: function(){
			return this.$('.acf-flexible-content:first > .clones  > .layout');
		},
		
		$clone: function( name ){
			return this.$('.acf-flexible-content:first > .clones  > .layout[data-layout="' + name + '"]');
		},
		
		$actions: function(){
			return this.$('.acf-actions:last');
		},
		
		$button: function(){
			return this.$('.acf-actions:last .button');
		},
		
		$popup: function(){
			return this.$('.tmpl-popup:last');
		},
		
		getPopupHTML: function(){
			
			// vars
			var html = this.$popup().html();
			var $html = $(html);
			
			// count layouts
			var $layouts = this.$layouts();
			var countLayouts = function( name ){
				return $layouts.filter(function(){
					return $(this).data('layout') === name;
				}).length;
			};
						
			// modify popup
			$html.find('[data-layout]').each(function(){
				
				// vars
				var $a = $(this);
				var min = $a.data('min') || 0;
				var max = $a.data('max') || 0;
				var name = $a.data('layout') || '';
				var count = countLayouts( name );
				
				// max
				if( max && count >= max) {
					$a.addClass('disabled');
					return;
				}
				
				// min
				if( min && count < min ) {
					
					// vars
					var required = min - count;
					var title = acf.__('{required} {label} {identifier} required (min {min})');
					var identifier = acf._n('layout', 'layouts', required);
										
					// translate
					title = title.replace('{required}', required);
					title = title.replace('{label}', name); // 5.5.0
					title = title.replace('{identifier}', identifier);
					title = title.replace('{min}', min);
					
					// badge
					$a.append('<span class="badge" title="' + title + '">' + required + '</span>');
				}
			});
			
			// update
			html = $html.outerHTML();
			
			// return
			return html;
		},
		
		getValue: function(){
			return this.$layouts().length;
		},
		
		allowRemove: function(){
			var min = parseInt( this.get('min') );
			return ( !min || min < this.val() );
		},
		
		allowAdd: function(){
			var max = parseInt( this.get('max') );
			return ( !max || max > this.val() );
		},
		
		isFull: function(){
			var max = parseInt( this.get('max') );
			return ( max && this.val() >= max );
		},
		
		count: function(){

			return this.$values.children('.layout').length;

		},
		
    addSortable: function( self ){
			
			// bail early if max 1 row
			if( this.get('max') == 1 ) {
				return;
			}
			
			// add sortable
			this.$layoutsWrap().sortable({
				items: '> .layout',
				handle: '> .acf-fc-layout-handle',
				forceHelperSize: true,
				forcePlaceholderSize: true,
				scroll: true,
	   			stop: function(event, ui) {
					self.render();
	   			},
	   			update: function(event, ui) {
		   			self.$input().trigger('change');
		   		}
			});
		},
		
		addCollapsed: function(){
			
			// vars
			var indexes = preference.load( this.get('key') );
			
			// bail early if no collapsed
			if( !indexes ) {
				return false;
			}
			
			// loop
			this.$layouts().each(function( i ){
				if( indexes.indexOf(i) > -1 ) {
					$(this).addClass('-collapsed');
				}
			});
		},
		
		addUnscopedEvents: function( self ){
			
			// invalidField
			this.on('invalidField', '.layout', function(e){
				self.onInvalidField( e, $(this) );
			});
		},
		
		initialize: function(){
			
			// add unscoped events
			this.addUnscopedEvents( this );
			
			// add collapsed
			this.addCollapsed();
			
			// disable clone
			//acf.disable( this.$clonesWrap(), this.cid );
						
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
		
		render: function(){
			
			// update order number
			this.$layouts().each(function( i ){
				$(this).find('.acf-fc-layout-order:first').html( i+1 );
			});
			
			// empty
			if( this.val() == 0 ) {
				this.$control().addClass('-empty');
			} else {
				this.$control().removeClass('-empty');
			}
			
			// max
			if( this.isFull() ) {
				//this.$button().addClass('disabled');
				this.$el.find('> .acf-actions .button').addClass('disabled');
			} else {
				//this.$button().removeClass('disabled');
				this.$el.find('> .acf-actions .button').removeClass('disabled');
			}
		},
		
		onShow: function( e, $el, context ){
			
			// get sub fields
			var fields = acf.getFields({
				is: ':visible',
				parent: this.$el,
			});
			
			// trigger action
			// - ignore context, no need to pass through 'conditional_logic'
			// - this is just for fields like google_map to render itself
			acf.doAction('show_fields', fields);
		},
		
		validateAdd: function(){
			
			// return true if allowed
			if( this.allowAdd() ) {
				return true;
			}
			
			// vars
			var max = this.get('max');
			var text = acf.__('This field has a limit of {max} {label} {identifier}');
			var identifier = acf._n('layout', 'layouts', max);
			
			// replace
			text = text.replace('{max}', max);
			text = text.replace('{label}', '');
			text = text.replace('{identifier}', identifier);
			
			// add notice
			this.showNotice({
				text: text,
				type: 'warning'
			});
			
			// return
			return false;
		},
		
		onClickAdd: function( e, $el ){
			
			// validate
			if( !this.validateAdd() ) {
				return false;
			}
			
			// within layout
			var $layout = null;
			if( $el.hasClass('acf-icon') ) {
				$layout = $el.closest('.layout');
				$layout.addClass('-hover');
			}
			
			// new popup
			var popup = new Popup({
				target: $el,
				targetConfirm: false,
				text: this.getPopupHTML(),
				context: this,
				confirm: function( e, $el ){
					
					// check disabled
					if( $el.hasClass('disabled') ) {
						return;
					}
					
					// add
					this.add({
						layout: $el.data('layout'),
						before: $layout
					});
				},
				cancel: function(){
					if( $layout ) {
						$layout.removeClass('-hover');
					}
					
				}
			});
			
			// add extra event
			popup.on('click', '[data-layout]', 'onConfirm');
		},
		
		add: function( args ){
			
			// defaults
			args = acf.parseArgs(args, {
				layout: '',
				before: false
			});
			
			// validate
			if( !this.allowAdd() ) {
				return false;
			}
			
			// add row
			var $el = acf.duplicate({
				target: this.$clone( args.layout ),
				append: this.proxy(function( $el, $el2 ){
					
					// append
					if( args.before ) {
						args.before.before( $el2 );
					} else {
						this.$layoutsWrap().append( $el2 );
					}
					
					// enable 
					acf.enable( $el2, this.cid );
					
					// render
					this.render();
				})
			});
			
			// trigger change for validation errors
			this.$input().trigger('change');
			
			// return
			return $el;
		},
		
		validateRemove: function(){
			
			// return true if allowed
			if( this.allowRemove() ) {
				return true;
			}
			
			// vars
			var min = this.get('min');
			var text = acf.__('This field requires at least {min} {label} {identifier}');
			var identifier = acf._n('layout', 'layouts', min);
			
			// replace
			text = text.replace('{min}', min);
			text = text.replace('{label}', '');
			text = text.replace('{identifier}', identifier);
			
			// add notice
			this.showNotice({
				text: text,
				type: 'warning'
			});
			
			// return
			return false;
		},
		
		onClickRemove: function( e, $el ){
			
			// vars
			var $layout = $el.closest('.layout');
			
			// add class
			$layout.addClass('-hover');
			
			// add tooltip
			var tooltip = acf.newTooltip({
				confirmRemove: true,
				target: $el,
				context: this,
				confirm: function(){
					this.removeLayout( $layout );
				},
				cancel: function(){
					$layout.removeClass('-hover');
				}
			});
		},
		
		removeLayout: function( $layout ){
			
			// reference
			var self = this;
			
			// vars
			var endHeight = this.getValue() == 1 ? 60: 0;
			
			// remove
			acf.remove({
				target: $layout,
				endHeight: endHeight,
				complete: function(){
					
					// trigger change to allow attachment save
					self.$input().trigger('change');
				
					// render
					self.render();
				}
			});
		},
		
		onClickCollapse: function( e, $el ){
			
			// vars
			var $layout = $el.closest('.layout');
			
			// toggle
			if( this.isLayoutClosed( $layout ) ) {
				this.openLayout( $layout );
			} else {
				this.closeLayout( $layout );
			}
		},
		
		isLayoutClosed: function( $layout ){
			return $layout.hasClass('-collapsed');
		},
		
		openLayout: function( $layout ){
			$layout.removeClass('-collapsed');
			acf.doAction('show', $layout, 'collapse');
		},
		
		closeLayout: function( $layout ){
			$layout.addClass('-collapsed');
			acf.doAction('hide', $layout, 'collapse');
			
			// render
			// - no change could happen if layout was already closed. Only render when closing
			this.renderLayout( $layout );
		},
		
		renderLayout: function( $layout ){
			
			// vars
			var $input = $layout.children('input');
			var prefix = $input.attr('name').replace('[acf_fc_layout]', '');
			
			// ajax data
			var ajaxData = {
				action: 	'acf/fields/flo_flexible_content/layout_title',
				field_key: 	this.get('key'),
				i: 			$layout.index(),
				layout:		$layout.data('layout'),
				value:		acf.serialize( $layout, prefix )
			};
			
			// ajax
			$.ajax({
		    	url: acf.get('ajaxurl'),
		    	data: acf.prepareForAjax(ajaxData),
				dataType: 'html',
				type: 'post',
				success: function( html ){
					if( html ) {
						$layout.children('.acf-fc-layout-handle').html( html );
					}
				}
			});
		},
		
		onUnload: function(){
			
			// vars
			var indexes = [];
			
			// loop
			this.$layouts().each(function( i ){
				if( $(this).hasClass('-collapsed') ) {
					indexes.push( i );
				}
			});
			
			// allow null
			indexes = indexes.length ? indexes : null;
			
			// set
			preference.save( this.get('key'), indexes );
		},
		
		onInvalidField: function( e, $layout ){
			
			// open if is collapsed
			if( this.isLayoutClosed( $layout ) ) {
				this.openLayout( $layout );
			}
		},
		
		onHover: function(){
			
			// add sortable
			this.addSortable( this );
			
			// remove event
			this.off('mouseover');
		}
						
	});
	
	acf.registerFieldType( Field );
	
	
	
	/**
	*  Popup
	*
	*  description
	*
	*  @date	7/4/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	var Popup = acf.models.TooltipConfirm.extend({
		
		events: {
			'click [data-layout]': 			'onConfirm',
			'click [data-event="cancel"]':	'onCancel',
		},
		
		render: function(){
			
			// set HTML
			this.html( this.get('text') );
			
			// add class
			this.$el.addClass('acf-fc-popup');
		}		
	});
	
	
	/**
	*  conditions
	*
	*  description
	*
	*  @date	9/4/18
	*  @since	5.6.9
	*
	*  @param	type $var Description. Default.
	*  @return	type Description.
	*/
	
	// register existing conditions
	acf.registerConditionForFieldType('hasValue', 'flo_flexible_content');
	acf.registerConditionForFieldType('hasNoValue', 'flo_flexible_content');
	acf.registerConditionForFieldType('lessThan', 'flo_flexible_content');
	acf.registerConditionForFieldType('greaterThan', 'flo_flexible_content');
	
	
	// state
	var preference = new acf.Model({
		
		name: 'this.collapsedLayouts',
		
		key: function( key, context ){
			
			// vars
			var count = this.get(key+context) || 0;
			
			// update
			count++;
			this.set(key+context, count, true);
			
			// modify fieldKey
			if( count > 1 ) {
				key += '-' + count;
			}
			
			// return
			return key;
		},
		
		load: function( key ){
			
			// vars 
			var key = this.key(key, 'load');
			var data = acf.getPreference(this.name);
			
			// return
			if( data && data[key] ) {
				return data[key]
			} else {
				return false;
			}
		},
		
		save: function( key, value ){
			
			// vars 
			var key = this.key(key, 'save');
			var data = acf.getPreference(this.name) || {};
			
			// delete
			if( value === null ) {
				delete data[ key ];
			
			// append
			} else {
				data[ key ] = value;
			}
			
			// allow null
			if( $.isEmptyObject(data) ) {
				data = null;
			}
			
			// save
			acf.setPreference(this.name, data);
		}
	});
	
})(jQuery);