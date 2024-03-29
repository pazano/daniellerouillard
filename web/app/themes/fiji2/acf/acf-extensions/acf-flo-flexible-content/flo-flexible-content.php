<?php

/*
*  ACF Flexible Content Field Class
*
*  All the logic for this field type
*
*  @class 		acf_field_flo_flexible_content
*  @extends		acf_field
*  @package		ACF
*  @subpackage	Fields
*/

if( ! class_exists('acf_field_flo_flexible_content') ) :

class acf_field_flo_flexible_content extends acf_field {


	/*
	*  __construct
	*
	*  This function will setup the field type data
	*
	*  @type	function
	*  @date	5/03/2014
	*  @since	5.0.0
	*
	*  @param	n/a
	*  @return	n/a
	*/

	function __construct() {

		// vars
		$this->name = 'flo_flexible_content';
		$this->label = __("Flo Flexible Content",'acf');
		$this->category = 'layout';
		$this->defaults = array(
			'layouts'		=> array(),
			'min'			=> '',
			'max'			=> '',
			'button_label'	=> __("Add Block",'acf'),
		);
		$this->l10n = array(
			'layout' 		=> __("layout", 'acf'),
			'layouts'		=> __("layouts", 'acf'),
			'remove'		=> __("remove {layout}?", 'acf'),
			'min'			=> __("This field requires at least {min} {identifier}",'acf'),
			'max'			=> __("This field has a limit of {max} {identifier}",'acf'),
			'min_layout'	=> __("This field requires at least {min} {label} {identifier}",'acf'),
			'max_layout'	=> __("Maximum {label} limit reached ({max} {identifier})",'acf'),
			'available'		=> __("{available} {label} {identifier} available (max {max})",'acf'),
			'required'		=> __("{required} {label} {identifier} required (min {min})",'acf'),
			'layout_warning'	=> __('Flexible Content requires at least 1 layout','acf')
		);


		// ajax
		$this->add_action('wp_ajax_acf/fields/flo_flexible_content/layout_title',			array($this, 'ajax_layout_title'));
		$this->add_action('wp_ajax_nopriv_acf/fields/flo_flexible_content/layout_title',	array($this, 'ajax_layout_title'));


		// filters
		$this->add_filter('acf/prepare_field_for_export',	array($this, 'prepare_any_field_for_export'));
		$this->add_filter('acf/clone_field', 				array($this, 'clone_any_field'), 10, 2);
		$this->add_filter('acf/validate_field',					array($this, 'validate_any_field'));


		// field filters
		$this->add_field_filter('acf/get_sub_field', 			array($this, 'get_sub_field'), 10, 3);
		$this->add_field_filter('acf/prepare_field_for_export', array($this, 'prepare_field_for_export'));
		$this->add_field_filter('acf/prepare_field_for_import', array($this, 'prepare_field_for_import'));


		// do not delete!
    	parent::__construct();

	}


	/*
	*  get_valid_layout
	*
	*  This function will fill in the missing keys to create a valid layout
	*
	*  @type	function
	*  @date	3/10/13
	*  @since	1.1.0
	*
	*  @param	$layout (array)
	*  @return	$layout (array)
	*/

	function get_valid_layout( $layout = array() ) {

		// parse
		$layout = wp_parse_args($layout, array(
			'key'			=> uniqid(),
			'name'			=> '',
			'label'			=> '',
			'display'		=> 'block',
			'sub_fields'	=> array(),
			'min'			=> '',
			'max'			=> '',
		));


		// return
		return $layout;
	}


	/*
	*  load_field()
	*
	*  This filter is appied to the $field after it is loaded from the database
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$field - the field array holding all the field options
	*
	*  @return	$field - the field array holding all the field options
	*/



	function load_field( $field ) {

		// bail early if no field layouts
		if( empty($field['layouts']) ) {

			return $field;

		}


		// vars
		$sub_fields = acf_get_fields($field);


		// loop through layouts, sub fields and swap out the field key with the real field
		foreach( array_keys($field['layouts']) as $i ) {

			// extract layout
			$layout = acf_extract_var( $field['layouts'], $i );


			// validate layout
			$layout = $this->get_valid_layout( $layout );


			// append sub fields
			if( !empty($sub_fields) ) {

				foreach( array_keys($sub_fields) as $k ) {

					// check if 'parent_layout' is empty
					if( empty($sub_fields[ $k ]['parent_layout']) ) {

						// parent_layout did not save for this field, default it to first layout
						$sub_fields[ $k ]['parent_layout'] = $layout['key'];

					}


					// append sub field to layout,
					if( $sub_fields[ $k ]['parent_layout'] == $layout['key'] ) {

						$layout['sub_fields'][] = acf_extract_var( $sub_fields, $k );

					}

				}

			}


			// append back to layouts
			$field['layouts'][ $i ] = $layout;

		}


		// return
		return $field;
	}


	/*
	*  get_sub_field
	*
	*  This function will return a specific sub field
	*
	*  @type	function
	*  @date	29/09/2016
	*  @since	5.4.0
	*
	*  @param	$sub_field
	*  @param	$selector (string)
	*  @param	$field (array)
	*  @return	$post_id (int)
	*/

	function get_sub_field( $sub_field, $selector, $field ) {

		// bail early if no layouts
		if( empty($field['layouts']) ) return false;


		// vars
		$active = get_row_layout();


		// loop
		foreach( $field['layouts'] as $layout ) {

			// bail early if active layout does not match
			if( $active && $active !== $layout['name'] ) continue;


			// bail early if no sub fields
			if( empty($layout['sub_fields']) ) continue;


			// loop
			foreach( $layout['sub_fields'] as $sub_field ) {

				// check name and key
				if( $sub_field['name'] == $selector || $sub_field['key'] == $selector ) {

					// return
					return $sub_field;

				}

			}

		}


		// return
		return false;

	}


	/*
	*  render_field()
	*
	*  Create the HTML interface for your field
	*
	*  @param	$field - an array holding all the field's data
	*
	*  @type	action
	*  @since	3.6
	*  @date	23/01/13
	*/

	function render_field( $field ) {

		// defaults
		if( empty($field['button_label']) ) {

			$field['button_label'] = $this->defaults['button_label'];

		}


		// sort layouts into names
		$layouts = array();

		foreach( $field['layouts'] as $k => $layout ) {

			$layouts[ $layout['name'] ] = $layout;

		}


		// hidden input
		acf_hidden_input(array(
			'type'	=> 'hidden',
			'name'	=> $field['name'],
		));


		// no value message
		$no_value_message = __('Click the "%s" button below to start creating your layout','acf');
		$no_value_message = apply_filters('acf/fields/flo_flexible_content/no_value_message', $no_value_message, $field);

?>
<div <?php acf_esc_attr_e(array( 'class' => 'acf-flexible-content', 'data-min' => $field['min'], 'data-max'	=> $field['max'] )); ?>>

	<div class="no-value-message" <?php if( $field['value'] ){ echo 'style="display:none;"'; } ?>>
		<?php printf( $no_value_message, $field['button_label'] ); ?>
	</div>

	<div class="clones">
		<?php foreach( $layouts as $layout ): ?>
			<?php //$this->render_layout( $field, $layout, 'acfcloneindex', array() ); ?>
		<?php endforeach; ?>
	</div>

	<div class="values">
		<?php if( !empty($field['value']) ): ?>
			<?php foreach( $field['value'] as $i => $value ): ?>
				<?php

				// validate
				// $value['acf_fc_layout'] == 'full'  for old Crowd theme
				if( empty($layouts[ $value['acf_fc_layout'] ]) || $value['acf_fc_layout'] == 'full' || $value['acf_fc_layout'] == '' ) {

					continue;

				}

				$this->render_layout( $field, $layouts[ $value['acf_fc_layout'] ], $i, $value );

				?>
			<?php endforeach; ?>
		<?php endif; ?>
	</div>

	<ul class="acf-actions acf-hl">
		<li>
			<a class="acf-button button button-primary" href="#" data-event="add-layout"><?php echo $field['button_label']; ?></a>

      <div class="acf-fc-popup acf-fc-popup--hidden" style="display: none;">
    		<ul>
    			<?php foreach( $layouts as $layout ) {

    				$atts = array(
    					'data-layout'	=> $layout['name'],
    					'data-min' 		=> $layout['min'],
    					'data-max' 		=> $layout['max'],
    				);

    				?>
    				<li>
    					<a href="#" <?php acf_esc_attr_e( $atts ); ?>><?php echo $layout['label']; ?></a>
    				</li>
    			<?php } ?>
    		</ul>
    		<a href="#" class="focus"></a>
    	</div>

		</li>
	</ul>

	<script type="text-html" class="tmpl-popup">
    <div class="acf-fc-popup acf-flo-flexible-content-blocks-popup">
      <div class="acf-flo-flexible-content-blocks-popup__close dashicons dashicons-no-alt"></div>
      <div class="acf-flo-flexible-content-blocks-popup__items-wrap">
				<input type="text" class="acf-flo-flexible-content-blocks-popup__search-blocks" placeholder="Search Block..." onkeypress="handleTyping(event)" onkeyup="searchBlocks(event)">
  			<div class="acf-flo-flexible-content-blocks-popup__items">
  				<?php foreach( $layouts as $layout ) {

  					$atts = array(
  						'data-layout'	=> $layout['name'],
  						'data-min' 		=> $layout['min'],
  						'data-max' 		=> $layout['max'],
  						'data-preview' 		=> $layout['preview_url'],
  					);

            // Start: Show if
              $show_if = [];
              if (isset($layout["show_if"])) {
                $show_if = explode(",", $layout["show_if"]);
              }
              $show_if = htmlentities(json_encode($show_if));
            // End: Show if

            // Start: Hide if
              $hide_if = [];
              if (isset($layout["hide_if"])) {
                $hide_if = explode(",", $layout["hide_if"]);
              }
              $hide_if = htmlentities(json_encode($hide_if));
            // End: Hide if

  					?>
  						<a href="#" class="acf-flo-flexible-content-blocks-popup__item" <?php acf_esc_attr_e( $atts ); ?> data-show-if="<?php echo $show_if ?>" data-hide-if="<?php echo $hide_if ?>">
                <span class="acf-flo-flexible-content-blocks-popup__item-image" style="background-image: url(<?php echo $layout["thumbnail_url"]; ?>)">
                </span>
                <span class="acf-flo-flexible-content-blocks-popup__item-label">
                  <?php echo $layout['label']; ?>
                </span>
              </a>
  				<?php } ?>
  			</div>
      </div>

      <div class="acf-flo-flexible-content-blocks-popup__preview">

      </div>

			<a href="#" class="focus"></a>
		</div>
	</script>

</div>
<?php

	}


	/*
	*  render_layout
	*
	*  description
	*
	*  @type	function
	*  @date	19/11/2013
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/

	function render_layout( $field, $layout, $i, $value ) {

		// vars
		$order = 0;
		$el = 'div';
		$sub_fields = $layout['sub_fields'];
		$prefix = $field['name'] . '[' . $i .  ']';


		// div
		$div = array(
			'class'			=> 'layout -collapsed',
			'data-id'		=> $i,
			'data-layout'	=> $layout['name']
		);


		// collapsed class
		// if( acf_is_row_collapsed($field['key'], $i) ) {
    //
		// 	$div['class'] .= ' -collapsed';
    //
		// }


		// clone
		if( is_numeric($i) ) {

			$order = $i + 1;

		} else {

			$div['class'] .= ' acf-clone';

		}


		// display
		if( $layout['display'] == 'table' ) {

			$el = 'td';

		}


		// title
		$title = $this->get_layout_title( $field, $layout, $i, $value );


		// remove row
		reset_rows();

?>
<div <?php echo acf_esc_attr($div); ?>>

	<div class="acf-hidden">
		<?php acf_hidden_input(array( 'name' => $prefix.'[acf_fc_layout]', 'value' => $layout['name'] )); ?>
	</div>

	<div class="acf-fc-layout-handle acf-fc-layout-handle--white" title="<?php _e('Drag to reorder','acf'); ?>">
    <?php echo $title; ?>
    <br>
    <div class="acf-fc-latout-handle-subtitle">Click to Open & Drag to Reorder</div>
  </div>

  <img class="acf-fc-layout-preview-image" src="<?php echo $layout["preview_url"] ?>" alt="">
	<?php
	$blockData = array(
		'hide_if' => json_encode(explode(",", $layout['hide_if'])),
		'show_if' => json_encode(explode(",", $layout['show_if'])),
		'min' => $layout['min'],
		'max' => $layout['max'],
		'thumbnail_url' => $layout['thumbnail_url'],
		'preview_url' => $layout['preview_url'],
		'label' => $layout['label'],
		'name' => $layout['name']
	)
	?>
	<div class="acf-fc-layout-controlls acf-fc-layout-controlls--white">
		<a class="acf-icon -up small flo-move-first" href="#" data-event="move-first" title="<?php _e('Move Block to Top','acf'); ?>" ></a>
		<a class="acf-icon -plus small" href="#" data-event="add-layout" title="<?php _e('Add layout','acf'); ?>"></a>
		<a class="acf-icon -pencil small" href="#" data-event="collapse-layout" title="<?php _e('Click to Edit Options','acf'); ?>"></a>
		<a class="acf-icon flo-admin-icon-clone small" href="#" data-event="duplicate-layout" title="<?php _e('Click to Copy Block','acf'); ?>" data-block-setting='<?php echo json_encode($blockData); ?>'></a>
		<a class="acf-icon -minus small" href="#" data-event="remove-layout" title="<?php _e('Remove Block','acf'); ?>"></a>
	</div>

<?php if( !empty($sub_fields) ): ?>

	<?php if( $layout['display'] == 'table' ): ?>
	<table class="acf-table">

		<thead>
			<tr>
				<?php foreach( $sub_fields as $sub_field ):

					// prepare field (allow sub fields to be removed)
					$sub_field = acf_prepare_field($sub_field);


					// bail ealry if no field
					if( !$sub_field ) continue;


					// vars
					$atts = array();
					$atts['class'] = 'acf-th';
					$atts['data-name'] = $sub_field['_name'];
					$atts['data-type'] = $sub_field['type'];
					$atts['data-key'] = $sub_field['key'];


					// Add custom width
					if( $sub_field['wrapper']['width'] ) {

						$atts['data-width'] = $sub_field['wrapper']['width'];
						$atts['style'] = 'width: ' . $sub_field['wrapper']['width'] . '%;';

					}

					?>
					<th <?php echo acf_esc_attr( $atts ); ?>>
						<?php echo acf_get_field_label( $sub_field ); ?>
						<?php if( $sub_field['instructions'] ): ?>
							<p class="description"><?php echo $sub_field['instructions']; ?></p>
						<?php endif; ?>
					</th>

				<?php endforeach; ?>
			</tr>
		</thead>

		<tbody>
			<tr class="acf-row">
	<?php else: ?>
	<div class="acf-fields <?php if($layout['display'] == 'row'): ?>-left<?php endif; ?>">
	<?php endif; ?>

		<?php

		// loop though sub fields
		foreach( $sub_fields as $sub_field ) {

			// prevent repeater field from creating multiple conditional logic items for each row
			// if( $i !== 'acfcloneindex' ) {

			// 	$sub_field['conditional_logic'] = 0;

			// }
			if ( isset($value['cloned']) ) {
				if( isset($value[ $sub_field['key'] ]) ) {
								$field_type = $sub_field['type'];
								$json_value = json_encode($value[ $sub_field['key'] ]);
								$formatte_value = str_replace('%27', '\'', $json_value);
								$array_value = json_decode($formatte_value, true);
								$sub_field['value'] = $array_value;
				} elseif( isset($sub_field['default_value']) ) {
					$sub_field['value'] = $sub_field['default_value'];
				}
			} else {
				if( isset($value[ $sub_field['key'] ]) ) {
					$sub_field['value'] = $value[ $sub_field['key'] ];
				} elseif( isset($sub_field['default_value']) ) {
					// no value, but this sub field has a default value
					$sub_field['value'] = $sub_field['default_value'];
				}
			}



			// update prefix to allow for nested values
			$sub_field['prefix'] = $prefix;


			// render input
			acf_render_field_wrap( $sub_field, $el );

		}

		?>

	<?php if( $layout['display'] == 'table' ): ?>
			</tr>
		</tbody>
	</table>
	<?php else: ?>
	</div>
	<?php endif; ?>

<?php endif; ?>

</div>
<?php

	}


	/*
	*  render_field_settings()
	*
	*  Create extra options for your field. This is rendered when editing a field.
	*  The value of $field['name'] can be used (like bellow) to save extra data to the $field
	*
	*  @type	action
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$field	- an array holding all the field's data
	*/

	function render_field_settings( $field ) {


    // load default layout
		if( empty($field['layouts']) ) {

			$field['layouts'] = array(
				array()
			);

		}

		/**
     * When updating to ACF 5.7.7 the flexible-content field has
     * changed a lot, and we use the new version only for the 'acf-field-group' setting page, and the old version for the other pages (post/page/gallery edit page)
     */
		if( isset($_GET['post']) && 'acf-field-group' == get_post_type($_GET['post']) ) {
			$admin_script_name = 'flo-flexible-content.admin--new.js';
		}else{
			$admin_script_name = 'flo-flexible-content.admin.js';
		}

    $dir = get_template_directory_uri().'/acf/acf-extensions/acf-flo-flexible-content/';
    wp_register_script( 'acf-flo-flexible-content-admin', "{$dir}{$admin_script_name}", array('acf-field-group'), acf_get_setting('version'));
    wp_enqueue_script( 'acf-flo-flexible-content-admin' );

		// loop through layouts
		foreach( $field['layouts'] as $layout ) {

			// get valid layout
			$layout = $this->get_valid_layout( $layout );


			// vars
			$layout_prefix = "{$field['prefix']}[layouts][{$layout['key']}]";


?><tr class="acf-field acf-field-setting-fc_layout" data-name="fc_layout" data-setting="flo_flexible_content" data-id="<?php echo $layout['key']; ?>">
	<td class="acf-label">
		<label><?php _e("Layout",'acf'); ?></label>
		<p class="description acf-fl-actions">
			<a data-name="acf-fc-reorder" class="reorder-layout" title="<?php _e("Reorder Layout",'acf'); ?>" ><?php _e("Reorder",'acf'); ?></a>
			<a data-name="acf-fc-delete" title="<?php _e("Delete Layout",'acf'); ?>" href="#"><?php _e("Delete",'acf'); ?></a>
			<a data-name="acf-fc-duplicate" class="duplicate-layout" title="<?php _e("Duplicate Layout",'acf'); ?>" href="#"><?php _e("Duplicate",'acf'); ?></a>
			<a data-name="acf-fc-add" title="<?php _e("Add New Layout",'acf'); ?>" href="#"><?php _e("Add New",'acf'); ?></a>
		</p>
	</td>
	<td class="acf-input">

		<?php

		acf_hidden_input(array(
			'id'		=> acf_idify( $layout_prefix . '[key]' ),
			'name'		=> $layout_prefix . '[key]',
			'class'		=> 'layout-key',
			'value'		=> $layout['key']
		));

		?>

		<ul class="acf-fc-meta acf-bl">

			<li class="acf-fc-meta-label">
				<?php

				acf_render_field(array(
					'type'		=> 'text',
					'name'		=> 'label',
					'class'		=> 'layout-label',
					'prefix'	=> $layout_prefix,
					'value'		=> $layout['label'],
					'prepend'	=> __('Label','acf')
				));

				?>
			</li>
			<li class="acf-fc-meta-name">
				<?php

				acf_render_field(array(
					'type'		=> 'text',
					'name'		=> 'name',
					'class'		=> 'layout-name',
					'prefix'	=> $layout_prefix,
					'value'		=> $layout['name'],
					'prepend'	=> __('Name','acf')
				));

				?>
			</li>
      <li class="acf-fc-meta-name">
        <?php

        acf_render_field(array(
          'type'		=> 'text',
          'name'		=> 'thumbnail_url',
          'prefix'	=> $layout_prefix,
          'value'		=> $layout['thumbnail_url'],
          'prepend'	=> __('Thumbnail URL','acf')
        ));

        ?>
      </li>
      <li class="acf-fc-meta-name">
        <?php

        acf_render_field(array(
          'type'		=> 'text',
          'name'		=> 'preview_url',
          'prefix'	=> $layout_prefix,
          'value'		=> $layout['preview_url'],
          'prepend'	=> __('Preview URL','acf')
        ));

        ?>
      </li>
      <li class="acf-fc-meta-name">
        <?php

        acf_render_field(array(
          'type'		=> 'text',
          'name'		=> 'hide_if',
          'prefix'	=> $layout_prefix,
          'value'		=> isset($layout['hide_if']) ? $layout['hide_if'] : "",
          'prepend'	=> __('Conditional Logic - Hide If','acf')
        ));

        ?>
      </li>
      <li class="acf-fc-meta-name">
        <?php

        acf_render_field(array(
          'type'		=> 'text',
          'name'		=> 'show_if',
          'prefix'	=> $layout_prefix,
          'value'		=> isset($layout['show_if']) ? $layout['show_if'] : "",
          'prepend'	=> __('Conditional Logic - Show If','acf')
        ));

        ?>
      </li>
			<li class="acf-fc-meta-display">
				<div class="acf-input-prepend"><?php _e('Layout','acf'); ?></div>
				<div class="acf-input-wrap select">
					<?php

					acf_render_field(array(
						'type'		=> 'select',
						'name'		=> 'display',
						'prefix'	=> $layout_prefix,
						'value'		=> $layout['display'],
						'choices'	=> array(
							'table'			=> __('Table','acf'),
							'block'			=> __('Block','acf'),
							'row'			=> __('Row','acf')
						),
					));

					?>
				</div>
			</li>
			<li class="acf-fc-meta-min">
				<?php

				acf_render_field(array(
					'type'		=> 'text',
					'name'		=> 'min',
					'prefix'	=> $layout_prefix,
					'value'		=> $layout['min'],
					'prepend'	=> __('Min','acf')
				));

				?>
			</li>
			<li class="acf-fc-meta-max">
				<?php

				acf_render_field(array(
					'type'		=> 'text',
					'name'		=> 'max',
					'prefix'	=> $layout_prefix,
					'value'		=> $layout['max'],
					'prepend'	=> __('Max','acf')
				));

				?>
			</li>
		</ul>
		<?php

		// vars
		$args = array(
			'fields'	=> $layout['sub_fields'],
			'parent'	=> $field['ID']
		);

		acf_get_view('field-group-fields', $args);

		?>
	</td>
</tr>
<?php

		}
		// endforeach


		// min
		acf_render_field_setting( $field, array(
			'label'			=> __('Button Label','acf'),
			'instructions'	=> '',
			'type'			=> 'text',
			'name'			=> 'button_label',
		));


		// min
		acf_render_field_setting( $field, array(
			'label'			=> __('Minimum Layouts','acf'),
			'instructions'	=> '',
			'type'			=> 'number',
			'name'			=> 'min',
		));


		// max
		acf_render_field_setting( $field, array(
			'label'			=> __('Maximum Layouts','acf'),
			'instructions'	=> '',
			'type'			=> 'number',
			'name'			=> 'max',
		));

	}


	/*
	*  load_value()
	*
	*  This filter is applied to the $value after it is loaded from the db
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$value (mixed) the value found in the database
	*  @param	$post_id (mixed) the $post_id from which the value was loaded
	*  @param	$field (array) the field array holding all the field options
	*  @return	$value
	*/

	function load_value( $value, $post_id, $field ) {

		// bail early if no value
		if( empty($value) || empty($field['layouts']) ) {

			return $value;

		}


		// value must be an array
		$value = acf_get_array( $value );


		// vars
		$rows = array();


		// populate $layouts
		$layouts = array();

		foreach( array_keys($field['layouts']) as $i ) {

			// get layout
			$layout = $field['layouts'][ $i ];


			// append to $layouts
			$layouts[ $layout['name'] ] = $layout['sub_fields'];

		}


		// loop through rows
		foreach( $value as $i => $l ) {

			// append to $values
			$rows[ $i ] = array();
			$rows[ $i ]['acf_fc_layout'] = $l;


			// bail early if layout deosnt contain sub fields
			if( empty($layouts[ $l ]) ) {

				continue;

			}


			// get layout
			$layout = $layouts[ $l ];


			// loop through sub fields
			foreach( array_keys($layout) as $j ) {

				// get sub field
				$sub_field = $layout[ $j ];


				// bail ealry if no name (tab)
				if( acf_is_empty($sub_field['name']) ) continue;


				// update full name
				$sub_field['name'] = "{$field['name']}_{$i}_{$sub_field['name']}";


				// get value
				$sub_value = acf_get_value( $post_id, $sub_field );


				// add value
				$rows[ $i ][ $sub_field['key'] ] = $sub_value;

			}
			// foreach

		}
		// foreach



		// return
		return $rows;

	}


	/*
	*  format_value()
	*
	*  This filter is appied to the $value after it is loaded from the db and before it is returned to the template
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$value (mixed) the value which was loaded from the database
	*  @param	$post_id (mixed) the $post_id from which the value was loaded
	*  @param	$field (array) the field array holding all the field options
	*
	*  @return	$value (mixed) the modified value
	*/

	function format_value( $value, $post_id, $field ) {

		// bail early if no value
		if( empty($value) || empty($field['layouts']) ) {

			return false;

		}


		// populate $layouts
		$layouts = array();

		foreach( array_keys($field['layouts']) as $i ) {

			// get layout
			$layout = $field['layouts'][ $i ];


			// append to $layouts
			$layouts[ $layout['name'] ] = $layout['sub_fields'];

		}


		// loop over rows
		foreach( array_keys($value) as $i ) {

			// get layout name
			$l = $value[ $i ]['acf_fc_layout'];


			// bail early if layout deosnt exist
			if( empty($layouts[ $l ]) ) continue;


			// get layout
			$layout = $layouts[ $l ];


			// loop through sub fields
			foreach( array_keys($layout) as $j ) {

				// get sub field
				$sub_field = $layout[ $j ];


				// bail ealry if no name (tab)
				if( acf_is_empty($sub_field['name']) ) continue;


				// extract value
				$sub_value = acf_extract_var( $value[ $i ], $sub_field['key'] );


				// update $sub_field name
				$sub_field['name'] = "{$field['name']}_{$i}_{$sub_field['name']}";


				// format value
				$sub_value = acf_format_value( $sub_value, $post_id, $sub_field );


				// append to $row
				$value[ $i ][ $sub_field['_name'] ] = $sub_value;

			}

		}


		// return
		return $value;
	}


	/*
	*  validate_value
	*
	*  description
	*
	*  @type	function
	*  @date	11/02/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/

	function validate_value( $valid, $value, $field, $input ){

		// remove acfcloneindex
		if( isset($value['acfcloneindex']) ) {

			unset($value['acfcloneindex']);

		}


		// check if no value
		if( $field['required'] && empty($value) ) return false;


		// vars
		$count = 0;
		$layouts = array();


		// populate $layouts
		foreach( array_keys($field['layouts']) as $i ) {

			// vars
			$layout = $field['layouts'][ $i ];


			// add count
			$layout['count'] = 0;


			// append
			$layouts[ $layout['name'] ] = $layout;

		}


		// check sub fields
		if( !empty($value) ) {

			// set count
			$count = count($value);


			// loop through rows
			foreach( $value as $i => $row ) {

				// get layout
				$l = $row['acf_fc_layout'];


				// bail if layout doesn't exist
				if( !isset($layouts[ $l ]) ) continue;


				// increase count
				$layouts[ $l ]['count']++;



				// bail if no sub fields
				if( empty($layouts[ $l ]['sub_fields']) ) continue;


				// loop
				foreach( $layouts[ $l ]['sub_fields'] as $sub_field ) {

					// get sub field key
					$k = $sub_field['key'];


					// bail if no value
					if( !isset($value[ $i ][ $k ]) ) continue;


					// validate
					acf_validate_value( $value[ $i ][ $k ], $sub_field, "{$input}[{$i}][{$k}]" );

				}

			}

		}


		// validate min / max
		$min = (int) $field['min'];

		if( $min && $min > $count ) {

			// vars
			$error = $this->l10n['min'];
			$identifier = ($min == 1) ? $this->l10n['layout'] : $this->l10n['layouts'];


 			// replace
 			$error = str_replace('{min}', $min, $error);
 			$error = str_replace('{identifier}', $identifier, $error);


 			// return
			return $error;

		}


		foreach( $layouts as $layout ) {

			// validate min / max
			$min = (int) $layout['min'];
			$count = $layout['count'];

			if( $min && $min > $count ) {

				// vars
				$error = $this->l10n['min_layout'];
				$identifier = ($min == 1) ? $this->l10n['layout'] : $this->l10n['layouts'];


	 			// replace
	 			$error = str_replace('{min}', $min, $error);
	 			$error = str_replace('{label}', '"' . $layout['label'] . '"', $error);
	 			$error = str_replace('{identifier}', $identifier, $error);


	 			// return
				return $error;

			}

		}


		// return
		return $valid;

	}


	/*
	*  get_layout
	*
	*  This function will return a specific layout by name from a field
	*
	*  @type	function
	*  @date	15/2/17
	*  @since	5.5.8
	*
	*  @param	$name (string)
	*  @param	$field (array)
	*  @return	(array)
	*/

	function get_layout( $name = '', $field ) {

		// bail early if no layouts
		if( !isset($field['layouts']) ) return false;


		// loop
		foreach( $field['layouts'] as $layout ) {

			// match
			if( $layout['name'] === $name ) return $layout;

		}


		// return
		return false;

	}


	/*
	*  delete_row
	*
	*  This function will delete a value row
	*
	*  @type	function
	*  @date	15/2/17
	*  @since	5.5.8
	*
	*  @param	$i (int)
	*  @param	$field (array)
	*  @param	$post_id (mixed)
	*  @return	(boolean)
	*/

	function delete_row( $i = 0, $field, $post_id ) {

		// vars
		$value = acf_get_metadata( $post_id, $field['name'] );


		// bail early if no value
		if( !is_array($value) || !isset($value[ $i ]) ) return false;


		// get layout
		$layout = $this->get_layout($value[ $i ], $field);


		// bail early if no layout
		if( !$layout || empty($layout['sub_fields']) ) return false;


		// loop
		foreach( $layout['sub_fields'] as $sub_field ) {

			// modify name for delete
			$sub_field['name'] = "{$field['name']}_{$i}_{$sub_field['name']}";


			// delete value
			acf_delete_value( $post_id, $sub_field );

		}


		// return
		return true;

	}


	/*
	*  update_row
	*
	*  This function will update a value row
	*
	*  @type	function
	*  @date	15/2/17
	*  @since	5.5.8
	*
	*  @param	$i (int)
	*  @param	$field (array)
	*  @param	$post_id (mixed)
	*  @return	(boolean)
	*/

	function update_row( $row, $i = 0, $field, $post_id ) {

		// bail early if no layout reference
		if( !is_array($row) || !isset($row['acf_fc_layout']) ) return false;


		// get layout
		$layout = $this->get_layout($row['acf_fc_layout'], $field);


		// bail early if no layout
		if( !$layout || empty($layout['sub_fields']) ) return false;


		// loop
		foreach( $layout['sub_fields'] as $sub_field ) {

			// value
			$value = null;


			// find value (key)
			if( isset($row[ $sub_field['key'] ]) ) {

				$value = $row[ $sub_field['key'] ];

			// find value (name)
			} elseif( isset($row[ $sub_field['name'] ]) ) {

				$value = $row[ $sub_field['name'] ];

			// value does not exist
			} else {

				continue;

			}


			// modify name for save
			$sub_field['name'] = "{$field['name']}_{$i}_{$sub_field['name']}";


			// update field
			acf_update_value( $value, $post_id, $sub_field );

		}


		// return
		return true;

	}




	/*
	*  update_value()
	*
	*  This filter is appied to the $value before it is updated in the db
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$value - the value which will be saved in the database
	*  @param	$field - the field array holding all the field options
	*  @param	$post_id - the $post_id of which the value will be saved
	*
	*  @return	$value - the modified value
	*/

	function update_value( $value, $post_id, $field ) {

		// bail early if no layouts
		if( empty($field['layouts']) ) return $value;


		// vars
		$new_value = array();
		$old_value = acf_get_metadata( $post_id, $field['name'] );
		$old_value = is_array($old_value) ? $old_value : array();


		// update
		if( !empty($value) ) { $i = -1;

			// remove acfcloneindex
			if( isset($value['acfcloneindex']) ) {

				unset($value['acfcloneindex']);

			}


			// loop through rows
			foreach( $value as $row ) {	$i++;

				// bail early if no layout reference
				if( !is_array($row) || !isset($row['acf_fc_layout']) ) continue;


				// delete old row if layout has changed
				if( isset($old_value[ $i ]) && $old_value[ $i ] !== $row['acf_fc_layout'] ) {

					$this->delete_row( $i, $field, $post_id );

				}


				// update row
				$this->update_row( $row, $i, $field, $post_id );


				// append to order
				$new_value[] = $row['acf_fc_layout'];

			}

		}


		// vars
		$old_count = empty($old_value) ? 0 : count($old_value);
		$new_count = empty($new_value) ? 0 : count($new_value);


		// remove old rows
		if( $old_count > $new_count ) {

			// loop
			for( $i = $new_count; $i < $old_count; $i++ ) {

				$this->delete_row( $i, $field, $post_id );

			}

		}


		// save false for empty value
		if( empty($new_value) ) $new_value = '';


		// return
		return $new_value;

	}


	/*
	*  delete_value
	*
	*  description
	*
	*  @type	function
	*  @date	1/07/2015
	*  @since	5.2.3
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/

	function delete_value( $post_id, $key, $field ) {

		// vars
		$old_value = acf_get_metadata( $post_id, $field['name'] );
		$old_value = is_array($old_value) ? $old_value : array();


		// bail early if no rows or no sub fields
		if( empty($old_value) ) return;


		// loop
		foreach( array_keys($old_value) as $i ) {

			$this->delete_row( $i, $field, $post_id );

		}

	}


	/*
	*  update_field()
	*
	*  This filter is appied to the $field before it is saved to the database
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$field - the field array holding all the field options
	*  @param	$post_id - the field group ID (post_type = acf)
	*
	*  @return	$field - the modified field
	*/

	function update_field( $field ) {

		// vars
		$layouts = acf_extract_var($field, 'layouts');


		// update layouts
		$field['layouts'] = array();


		// loop through sub fields
		if( !empty($layouts) ) {

			foreach( $layouts as $layout ) {

				// remove sub fields
				unset($layout['sub_fields']);


				// append to layouts
				$field['layouts'][] = $layout;

			}

		}


		// return
		return $field;
	}


	/*
	*  delete_field
	*
	*  description
	*
	*  @type	function
	*  @date	4/04/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/

	function delete_field( $field ) {

		if( !empty($field['layouts']) ) {

			// loop through layouts
			foreach( $field['layouts'] as $layout ) {

				// loop through sub fields
				if( !empty($layout['sub_fields']) ) {

					foreach( $layout['sub_fields'] as $sub_field ) {

						acf_delete_field( $sub_field['ID'] );

					}
					// foreach

				}
				// if

			}
			// foreach

		}
		// if

	}


	/*
	*  duplicate_field()
	*
	*  This filter is appied to the $field before it is duplicated and saved to the database
	*
	*  @type	filter
	*  @since	3.6
	*  @date	23/01/13
	*
	*  @param	$field - the field array holding all the field options
	*
	*  @return	$field - the modified field
	*/

	function duplicate_field( $field ) {

		// vars
		$sub_fields = array();


		if( !empty($field['layouts']) ) {

			// loop through layouts
			foreach( $field['layouts'] as $layout ) {

				// extract sub fields
				$extra = acf_extract_var( $layout, 'sub_fields' );


				// merge
				if( !empty($extra) ) {

					$sub_fields = array_merge($sub_fields, $extra);

				}

			}
			// foreach

		}
		// if


		// save field to get ID
		$field = acf_update_field( $field );


		// duplicate sub fields
		acf_duplicate_fields( $sub_fields, $field['ID'] );


		// return
		return $field;

	}


	/*
	*  ajax_layout_title
	*
	*  description
	*
	*  @type	function
	*  @date	2/03/2016
	*  @since	5.3.2
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/

	function ajax_layout_title() {

		// options
   		$options = acf_parse_args( $_POST, array(
			'post_id'		=> 0,
			'i'				=> 0,
			'field_key'		=> '',
			'nonce'			=> '',
			'layout'		=> '',
			'acf'			=> array()
		));


		// load field
		$field = acf_get_field( $options['field_key'] );

		if( !$field ) die();


		// vars
		$layout = false;

		foreach( $field['layouts'] as $k => $layout ) {

			if( $layout['name'] === $options['layout'] ) break;

		}


		// bail ealry if no layout
		if( !$layout ) die();


		// value
		// this flexible content field may be a sub field so it is important to
		// loop though all $_POST data to find thi's field's row value
		$value = $options['acf'];

		while( is_array($value) ) {

			// move to end of array
			// - avoids 'acf_fc_layout' value
			end( $value );


			// vars (step through array)
			$key = key($value);
			$value = current($value);


			// stop looking if we have found the correct field's value
			if( $key === $options['field_key'] ) {

				// get row
				$value = current($value);
				break;

			}

		}


		// title
		$title = $this->get_layout_title( $field, $layout, $options['i'], $value );


		// echo
		echo $title;
		die;

	}


	function get_layout_title( $field, $layout, $i, $value ) {

		// vars
		$rows = array();
		$rows[ $i ] = $value;


		// add loop
		acf_add_loop(array(
			'selector'	=> $field['name'],
			'name'		=> $field['name'],
			'value'		=> $rows,
			'field'		=> $field,
			'i'			=> $i,
			'post_id'	=> 0,
		));


		// vars
		$title = $layout['label'];


		// filters
		$title = apply_filters('acf/fields/flo_flexible_content/layout_title', 							$title, $field, $layout, $i);
		$title = apply_filters('acf/fields/flo_flexible_content/layout_title/name='.$field['_name'],	$title, $field, $layout, $i);
		$title = apply_filters('acf/fields/flo_flexible_content/layout_title/key='.$field['key'],		$title, $field, $layout, $i);


		// remove loop
		acf_remove_loop();


		// prepend order
		$order = is_numeric($i) ? $i+1 : 0;
		$title = '<span class="acf-fc-layout-order">' . $order . '</span> ' . $title;


		// return
		return $title;

	}


	/*
	*  clone_any_field
	*
	*  This function will update clone field settings based on the origional field
	*
	*  @type	function
	*  @date	28/06/2016
	*  @since	5.3.8
	*
	*  @param	$clone (array)
	*  @param	$field (array)
	*  @return	$clone
	*/

	function clone_any_field( $field, $clone_field ) {

		// remove parent_layout
		// - allows a sub field to be rendered as a normal field
		unset($field['parent_layout']);


		// attempt to merger parent_layout
		if( isset($clone_field['parent_layout']) ) {

			$field['parent_layout'] = $clone_field['parent_layout'];

		}


		// return
		return $field;

	}


	/*
	*  prepare_field_for_export
	*
	*  description
	*
	*  @type	function
	*  @date	11/03/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/

	function prepare_field_for_export( $field ) {

		// bail early if no layouts
		if( empty($field['layouts']) ) return $field;


		// loop
		foreach( $field['layouts'] as $i => $layout ) {

			$field['layouts'][ $i ]['sub_fields'] = acf_prepare_fields_for_export( $layout['sub_fields'] );

		}


		// return
		return $field;

	}

	function prepare_any_field_for_export( $field ) {

		// remove parent_layout
		unset( $field['parent_layout'] );


		// return
		return $field;

	}


	/*
	*  prepare_field_for_import
	*
	*  description
	*
	*  @type	function
	*  @date	11/03/2014
	*  @since	5.0.0
	*
	*  @param	$post_id (int)
	*  @return	$post_id (int)
	*/

	function prepare_field_for_import( $field ) {

		// bail early if no layouts
		if( empty($field['layouts']) ) return $field;


		// var
		$extra = array();


		// loop
		foreach( array_keys($field['layouts']) as $i ) {

			// extract layout
			$layout = acf_extract_var( $field['layouts'], $i );


			// get valid layout (fixes ACF4 export code bug undefined index 'key')
			if( empty($layout['key']) ) $layout['key'] = uniqid();


			// extract sub fields
			$sub_fields = acf_extract_var( $layout, 'sub_fields');


			// validate sub fields
			if( !empty($sub_fields) ) {

				// loop over sub fields
				foreach( array_keys($sub_fields) as $j ) {

					// extract sub field
					$sub_field = acf_extract_var( $sub_fields, $j );


					// attributes
					$sub_field['parent'] = $field['key'];
					$sub_field['parent_layout'] = $layout['key'];


					// append to extra
					$extra[] = $sub_field;

				}

			}


			// append to layout
			$field['layouts'][ $i ] = $layout;

		}


		// extra
		if( !empty($extra) ) {

			array_unshift($extra, $field);

			return $extra;

		}


		// return
		return $field;

	}


	/*
	*  validate_any_field
	*
	*  This function will add compatibility for the 'column_width' setting
	*
	*  @type	function
	*  @date	30/1/17
	*  @since	5.5.6
	*
	*  @param	$field (array)
	*  @return	$field
	*/
  function input_admin_enqueue_scripts() {

    $dir = get_template_directory_uri().'/acf/acf-extensions/acf-flo-flexible-content/';


    /**
     * When updating to ACF 5.7.7 the flexible-content field has
     * changed a lot, and we use the new version only for the 'acf-field-group' setting page, and the old version for the other pages (post/page/gallery edit page)
     */
    if( isset($_GET['post']) && 'acf-field-group' == get_post_type($_GET['post']) ) {
			$flexible_script_name = 'flo-flexible-content--new.js';
		}else{
			$flexible_script_name = 'flo-flexible-content.js';
		}


    wp_register_script( 'acf-flo-flexible-content', "{$dir}{$flexible_script_name}", array('acf-input'), acf_get_setting('version'));
    wp_enqueue_script( 'acf-flo-flexible-content' );

    // wp_register_script( 'acf-flo-flexible-content-admin', "{$dir}flo-flexible-content.admin.js", array('acf-field-group'), acf_get_setting('version'));
    // wp_enqueue_script( 'acf-flo-flexible-content-admin' );

    wp_enqueue_script( 'acf-flo-flexible-misc', "{$dir}flo-flexible-content.misc.js" );

    // wp_enqueue_style( 'acf-flo-flexible-content', "{$dir}flo-flexible-content.css" );
  }
	function validate_any_field( $field ) {

		// width has changed
		if( isset($field['column_width']) ) {

			$field['wrapper']['width'] = acf_extract_var($field, 'column_width');

		}

		// return
		return $field;

	}

}


// initialize
if(function_exists('acf_register_field_type')){
	acf_register_field_type( new acf_field_flo_flexible_content() );
}

endif; // class_exists check



/**
 * Function that handles the Ajax request for getting a Layout Block
 * For each theme you may need to overwrite the followig variables:
 *	$field_id , $galleries_options_page, $posts_options_page, $gallery_fields_key, $posts_fields_key
 */
add_action('wp_ajax_floAddLayoutBlock' , 'flo_add_layout_block' );
function flo_add_layout_block($layout_block = '', $page_url = '', $screen_post_type = '', $custom_layout = false) {

	if($layout_block == '' && isset($_POST['layout'])) {
		$layout_block = $_POST['layout'];
	}

	if($page_url == '' && isset($_POST['page_url'])) {
		$page_url = $_POST['page_url'];
	}

	if($screen_post_type == '' && isset($_POST['screen_post_type'])) {
		$screen_post_type = $_POST['screen_post_type'];
	}

	//layout field ID
	$field_id = 'field_59b6785041713';

	// use the proper layout for each theme
	// it can be found in the json file with - "title": "Layout"
	$field_id = apply_filters('flo_layout_field_id', $field_id);

	$field = get_field_object($field_id, 'options');


	foreach( $field['layouts'] as $k => $layout ) {

		if(isset($layout['name']) && $layout['name'] == $layout_block){
			$requested_layout = $layout;
		}

	}

	$response = array('key' => $field['key']);


	// for the Galleries and Posts option pages the data is stored in a different way
	// therefore we try to dertermine via the URL if we are working with one of these pages
	if($page_url != ''){
		$url_args = parse_url($page_url);


		$galleries_options_page = 'page=acf-options-6-galleries';
		// use the filter below to ovewrite this for each theme if different
		$galleries_options_page = apply_filters('flo_theme_galleries_options_page', $galleries_options_page);

		$posts_options_page = 'page=acf-options-5-posts';
		// use the filter below to ovewrite this for each theme if different
		$posts_options_page = apply_filters('flo_theme_posts_options_page', $posts_options_page);

		$videos_options_page = 'page=acf-options-7-videos';
		// use the filter below to ovewrite this for each theme if different
		$videos_options_page = apply_filters('flo_theme_videos_options_page', $videos_options_page);



		// check if the ajax request comes from a single gallery edit page
		if(isset($screen_post_type) && $screen_post_type == 'gallery') {
			$refferer_is_gallery_post = true;
		}else{
			$refferer_is_gallery_post = false;
		}

		// use this filter to change the gallery referrer if necessary.
		$refferer_is_gallery_post =  apply_filters('flo_refferer_is_gallery_post', $refferer_is_gallery_post);

		// Dealing with Gallery options
		if( isset($url_args['query']) && $url_args['query'] == $galleries_options_page  ){
			// can be found in the json file with "title": "6. Gallery", Look at the key for "label": "Gallery Layout"
			$gallery_fields_key = 'field_593560fce4afd';
			// use the filter below to ovewrite this for each theme if different
			$gallery_fields_key = apply_filters('flo_gallery_fields_key', $gallery_fields_key);

			// for galleries layout the options are stored like in the example below:
			// acf[field_5937140f3638f][field_5937140f3638f_field_59b6785041713][0][acf_fc_layout]
			// therefore we built the key using the data below
			$response['key'] = $gallery_fields_key.']['.$gallery_fields_key.'_'.$field_id;
		}

		// Dealing with single Gallery
		if( isset($url_args) &&  $refferer_is_gallery_post  ){
			// can be found in the json file for SIngle Gallery with "title": "6. Gallery", Look at the key for "label": "Layout",
			$single_gallery_fields_key = 'field_5948ce78338ff';
			// use the filter below to ovewrite this for each theme if different
			$single_gallery_fields_key = apply_filters('flo_single_gallery_fields_key', $single_gallery_fields_key);
			if($custom_layout){
				$custom_block_val = get_saved_layout_options($op = get_option('flo_gallery_layout_options'), $layout_block);
			}

			// for galleries layout the options are stored like in the example below:
			// acf[field_5937140f3638f][field_5937140f3638f_field_59b6785041713][0][acf_fc_layout]
			// therefore we built the key using the data below
			$response['key'] = $single_gallery_fields_key.']['.$single_gallery_fields_key.'_'.$field_id;
		}


		// Dealing with Posts options
		if( isset($url_args['query']) && $url_args['query'] == $posts_options_page ){
			// can be found in the json file with "title": "5. Post", Look at the key for "label": "Post Layout"
			$posts_fields_key = 'field_5937140f3638f';
			// use the filter below to ovewrite this for each theme if different
			$posts_fields_key = apply_filters('flo_post_fields_key', $posts_fields_key);

			// for Posts layout the options are stored like in the example below:
			// acf[field_5937140f3638f][field_5937140f3638f_field_59b6785041713][0][acf_fc_layout]
			// therefore we built the key using the data below
			$response['key'] = $posts_fields_key.']['.$posts_fields_key.'_'.$field_id;
		}

		// check if the ajax request comes from a single gallery edit page
		if(isset($screen_post_type) && $screen_post_type == 'post') {
			$refferer_is_blog_post = true;
		}else{
			$refferer_is_blog_post = false;
		}

		// use this filter to change the blog post referrer if necessary.
		$refferer_is_blog_post = apply_filters('flo_referrer_is_blog_post', $refferer_is_blog_post);

		// Dealing with single Post edit page
		if( isset($url_args) && $refferer_is_blog_post ){
			// can be found in the json file with "title": "5. Post", Look at the key for "label": "Layout",
			$single_posts_fields_key = 'field_5948d3bc067c3';
			// use the filter below to ovewrite this for each theme if different
			$single_posts_fields_key = apply_filters('flo_single_post_fields_key', $single_posts_fields_key);

			if($custom_layout){
				$custom_block_val = get_saved_layout_options($op = get_option('flo_posts_layout_options'), $layout_block);
			}

			// for Posts layout the options are stored like in the example below:
			// acf[field_5948d3bc067c3][field_5948d3bc067c3_field_59b6785041713][6][acf_fc_layout]
			// therefore we built the key using the data below
			$response['key'] = $single_posts_fields_key.']['.$single_posts_fields_key.'_'.$field_id;
		}

		// support for custom posts screen post type
		$custom_posts_scree_post_types = apply_filters('flo_custom_posts_scree_post_types', array());
		// example array('book');

		if(isset($screen_post_type) &&  in_array($screen_post_type, $custom_posts_scree_post_types) ) {
			$refferer_is_new_custom_post = true;
		}else{
			$refferer_is_new_custom_post = false;
		}



		$any_custom_post_option = apply_filters( 'flo_any_custom_post_option', array() );
		// array example:
		// array( 'page=acf-options-11-videos' => 'videos' )
		// the 'flo_theme_videos_options_page' will be build using 'flo_theme_%array_key%_options_page'
		// where %array_key% is taken from the array defined above (in this example 'videos')


		// Dealing with Any Custom Post options
		if( isset($url_args['query']) && isset($any_custom_post_option[$url_args['query']])  ){
			// can be found in the json file with "title": "7. Video", Look at the key for "label": "Video Layout"
			$custom_posts_fields_key = 'field_5addf3674de65';
			// use the filter below to ovewrite this for each theme if different
			$custom_posts_fields_key = apply_filters('flo_'.$any_custom_post_option[$url_args['query']].'_fields_key', $custom_posts_fields_key);

			// for Posts layout the options are stored like in the example below:
			// acf[field_5937140f3638f][field_5937140f3638f_field_59b6785041713][0][acf_fc_layout]
			// therefore we built the key using the data below
			$response['key'] = $custom_posts_fields_key.']['.$custom_posts_fields_key.'_'.$field_id;
		}

		// Dealing with single Custom Post edit page
		if( isset($url_args) && $refferer_is_new_custom_post ){
			// can be found in the json file with "title": "5. Post", Look at the key for "label": "Layout",
			$new_custom_posts_fields_key = 'field_5948d3bc067c3';
			// use the filter below to ovewrite this for each theme if different
			$single_posts_fields_key = apply_filters('flo_single_'.$screen_post_type.'_fields_key', $new_custom_posts_fields_key);

			if($custom_layout){
				// the option name used below in get_option() is the same used in theme-functions.php function flo_save_post_gallery_options()
				$custom_block_val = get_saved_layout_options($op = get_option('flo_'.$screen_post_type.'s_layout_options'), $layout_block);
			}

			// for Posts layout the options are stored like in the example below:
			// acf[field_5948d3bc067c3][field_5948d3bc067c3_field_59b6785041713][6][acf_fc_layout]
			// therefore we built the key using the data below
			$response['key'] = $single_posts_fields_key.']['.$single_posts_fields_key.'_'.$field_id;
		}


		// Dealing with Video options
		if( isset($url_args['query']) && $url_args['query'] == $videos_options_page ){
			// can be found in the json file with "title": "7. Video", Look at the key for "label": "Video Layout"
			$videos_fields_key = 'field_5addf9674de65';
			// use the filter below to ovewrite this for each theme if different
			$videos_fields_key = apply_filters('flo_video_fields_key', $videos_fields_key);

			// for Posts layout the options are stored like in the example below:
			// acf[field_5937140f3638f][field_5937140f3638f_field_59b6785041713][0][acf_fc_layout]
			// therefore we built the key using the data below
			$response['key'] = $videos_fields_key.']['.$videos_fields_key.'_'.$field_id;
		}

		// check if the ajax request comes from a single gallery edit page
		if(isset($screen_post_type) && $screen_post_type == 'video') {
			$refferer_is_video_post = true;
		}else{
			$refferer_is_video_post = false;
		}

		// use this filter to change the video post referrer if necessary.
		$refferer_is_video_post = apply_filters('flo_referrer_is_video_post', $refferer_is_video_post);

		// Dealing with single Video edit page
		if( isset($url_args) && $refferer_is_video_post ){
			// can be found in the json file with "title": "7. Video", Look at the key for "label": "Layout",
			$single_videos_fields_key = 'field_5addf8e734eb7';
			// use the filter below to ovewrite this for each theme if different
			$single_videos_fields_key = apply_filters('flo_single_video_fields_key', $single_videos_fields_key);

			if($custom_layout){
				$custom_block_val = get_saved_layout_options($op = get_option('flo_videos_layout_options'), $layout_block);
			}

			// for Posts layout the options are stored like in the example below:
			// acf[field_5948d3bc067c3][field_5948d3bc067c3_field_59b6785041713][6][acf_fc_layout]
			// therefore we built the key using the data below
			$response['key'] = $single_videos_fields_key.']['.$single_videos_fields_key.'_'.$field_id;
		}


	}

	ob_start();
	ob_clean();

	if(isset($requested_layout)){
		//flexible content
		$fc_obj = new acf_field_flo_flexible_content();

		if(isset($custom_block_val) && is_array($custom_block_val) && sizeof($custom_block_val) > 1 ){
		//if(isset($custom_block_val) ){
			$block_val = $custom_block_val;

			//$block_val = get_option('flo_posts_layout_options');

		} else if(isset($_POST['cloned_block'])) {
			$cloned_block_data = $_POST['cloned_block'];
			$block_val =  $cloned_block_data;
			$block_val['cloned'] = true;
		} else{
			$block_val = array();
		}

		// $value should be in the following format: https://pastebin.com/cRr5p0SD
		$fc_obj->render_layout( $field, $requested_layout, 'acfcloneindex', $value = $block_val );

	}else{
		echo 'Flo Requested Layout was not found!!!';
	}

	$response['block'] = ob_get_clean();


	if(isset($_POST['action']) && $_POST['action'] == 'floAddLayoutBlock') {
		echo json_encode($response);

		exit();
	}else{
		return $response;
	}
}

/**
 *
 * the options are saved in the DB in a structure a bit different from what we need
 * therefore it is necessary to dig a bit to get to the values we need
 * @param - array $op - array like this: https://pastebin.com/LpL18UuA
 * @return - array
 */
function get_saved_layout_options($op, $layout_block) {

	$result  = '';

	if( !( $op && is_array($op) && sizeof($op)) ) {
		return $result;
	}

	//$op - is an array like this: https://pastebin.com/LpL18UuA
	//therefore  we need to get here: https://i.imgur.com/Mk4vPZS.jpg
	// so the first 2 loops are necessary to get to the inner array we are interested in
	foreach ($op as $key1 => $value1) {
		$op_level_1 = $value1;
		break;
	}

	foreach ($op_level_1 as $key2 => $value2) {
		$op_level_2 = $value2;
		break;
	}

	// this is the array that holds the valuable data and we iterate through it and get only the key that coresponds to the $layout_block we are interested in
	foreach ($op_level_2 as $key3 => $value3) {

		// check if the current key is the one we need
		if($layout_block == $value3['acf_fc_layout']) {
			$result = $value3;
			break;
		}
	}

	return $result;
}


add_action('wp_ajax_floAddTemplateLayoutBlocks' , 'flo_add_template_blocks' );
function flo_add_template_blocks() {

	$template_blocks = explode(',', $_POST['template_blocks']);

	$screen_post_type = $_POST['screen_post_type'];

	$layout_blocks = array();

	$i = 0;
	foreach ($template_blocks as $key => $template_block) {
		$layout_blocks[$template_block.'_'.$i] = flo_add_layout_block( $layout_block = $template_block, $page_url = $_POST['page_url'], $screen_post_type, $custom_layout = true );
		$i++;
	}

	echo json_encode($layout_blocks);


	exit();
}

?>
