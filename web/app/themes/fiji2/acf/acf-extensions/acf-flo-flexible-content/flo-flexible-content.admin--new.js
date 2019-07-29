/**
 *
 * The code below is based on 
 * acf-plugin/pro/assets/js/acf-pro-field-group.js from SCF 5.7.7
 * and adapted to work for Flo flexible content
 */
 
(function($){

  /*
  *  flo_flexible_content
  *
  *  description
  *
  *  @type	function
  *  @date	25/09/2015
  *  @since	5.2.3
  *
  *  @param	$post_id (int)
  *  @return	$post_id (int)
  */

  var FloFlexibleContentLayoutFieldSetting = acf.FieldSetting.extend({
    type: 'flo_flexible_content',
    name: 'fc_layout',
    
    
    events: {
      'change .acf-fc-meta-display select':   'flo_change_display',
      'blur .acf-fc-meta-label input':      'onChangeLabel',
      'click a[data-name="acf-fc-add"]':      'onClickAdd',
      'click a[data-name="acf-fc-duplicate"]':  'onClickDuplicate',
      'click a[data-name="acf-fc-delete"]':   'onClickDelete',
    },
    
    $input: function( name ){
      return $('#' + this.getInputId() + '-' + name);
    },
    
    $list: function(){
      return this.$('.acf-field-list:first');
    },
    
    getInputId: function(){
      return this.fieldObject.getInputId() + '-layouts-' + this.field.get('id');
    },
    
    // get all sub fields
    getFields: function(){
      return acf.getFieldObjects({ parent: this.$el });
    },
    
    // get imediate children
    getChildren: function(){
      return acf.getFieldObjects({ list: this.$list() });
    },
    
    initialize: function(){
      
      // add sortable
      var $tbody = this.$el.parent();
      if( !$tbody.hasClass('ui-sortable') ) {
        
        $tbody.sortable({
          items: '> .acf-field-setting-fc_layout',
          handle: '.reorder-layout',
          forceHelperSize: true,
          forcePlaceholderSize: true,
          scroll: true,
            stop: this.proxy(function(event, ui) {
            this.fieldObject.save();
            })
        });
      }
      
      // add meta to sub fields
      this.updateFieldLayouts();
    },
    
    updateFieldLayouts: function(){
      this.getChildren().map(this.updateFieldLayout, this);
    },
    
    updateFieldLayout: function( field ){
      field.prop('parent_layout', this.get('id'));
    },
    
    onChangeLabel: function( e, $el ){
      
      // vars
      var label = $el.val();
      var $name = this.$input('name');
      
      // render name
      if( $name.val() == '' ) {
        acf.val($name, acf.strSanitize(label));
      }
    },
    
    onClickAdd: function( e, $el ){
      
      // vars
      var prevKey = this.get('id');
      var newKey = acf.uniqid('layout_');
      
      // duplicate
      $layout = acf.duplicate({
        $el: this.$el,
        search: prevKey,
        replace: newKey,
        after: function( $el, $el2 ){
          
          // vars
          var $list = $el2.find('.acf-field-list:first');
          
          // remove sub fields
          $list.children('.acf-field-object').remove();
          
          // show empty
          $list.addClass('-empty');
          
          // reset layout meta values
          $el2.find('.acf-fc-meta input').val('');
        }
      });
      
      // get layout
      var layout = acf.getFieldSetting( $layout );
      
      // update hidden input
      layout.$input('key').val( newKey );
      
      // save
      this.fieldObject.save();
    },
      
    onClickDuplicate: function( e, $el ){
      
      // vars
      var prevKey = this.get('id');
      var newKey = acf.uniqid('layout_');
      
      

      // duplicate
      $layout = acf.duplicate({
        $el: this.$el,
        search: prevKey,
        replace: newKey
      });

      
      
      // get all fields in new layout similar to fieldManager.onDuplicateField().
      // important to run field.wipe() before making any changes to the "parent_layout" prop
      // to ensure the correct input is modified.
      var children = acf.getFieldObjects({ parent: $layout });
      if( children.length ) {
        
        // loop
        children.map(function( child ){
          
          // wipe field
          child.wipe();
          
          // update parent
          child.updateParent();
        });
      
        // action
        acf.doAction('duplicate_field_objects', children, this.fieldObject, this.fieldObject);
      }
      
      // get layout
      var layout = acf.getFieldSetting( $layout );

      // update hidden input
      layout.$input('key').val( newKey );
          
      // save
      this.fieldObject.save();
    },

    onClickDelete: function( e, $el ){
      
      // add class
      this.$el.addClass('-hover');
      
      // add tooltip
      var tooltip = acf.newTooltip({
        confirmRemove: true,
        target: $el,
        context: this,
        confirm: function(){
          this.delete();
        },
        cancel: function(){
          this.$el.removeClass('-hover');
        }
      });
    },
    
    delete: function(){
      
      // vars
      var $siblings = this.$el.siblings('.acf-field-setting-fc_layout');
      
      // validate
      if( !$siblings.length ) {
        alert( acf.__('Flexible Content requires at least 1 layout') );
        return false;
      }
      
      // delete sub fields
      this.getFields().map(function( child ){
        child.delete({
          animate: false
        });
      });
      
      // remove tr
      acf.remove( this.$el );
      
      // save
      this.fieldObject.save();
    },

    flo_change_display: function( $el ){

      this.render( $el );

    },

    flo_blur_label: function( $el ){

      // vars
      var $label = $el.find('.acf-fc-meta-label:first input'),
        $name = $el.find('.acf-fc-meta-name:first input');


      // only if name is empty
      if( $name.val() == '' ) {

        // vars
        var s = $label.val();


        // sanitize
        s = acf.str_sanitize(s);


        // update name
        $name.val( s ).trigger('change');

      }

    },

    
  });

  acf.registerFieldSetting( FloFlexibleContentLayoutFieldSetting );

  /**
  *  flexibleContentHelper
  *
  *  description
  *
  *  @date  19/4/18
  *  @since ACF 5.6.9
  *
  *  @param type $var Description. Default.
  *  @return  type Description.
  */
  
  var floFlexibleContentHelper = new acf.Model({
    actions: {
      'sortstop_field_object':    'updateParentLayout',
      'change_field_object_parent':   'updateParentLayout'
    },
    
    updateParentLayout: function( fieldObject ){
      
      // vars
      var parent = fieldObject.getParent();
      
      // delete meta
      if( !parent || parent.prop('type') !== 'flo_flexible_content' ) {
        
        fieldObject.prop('parent_layout', null);
        return;
      }
      
      // get layout
      var $layout = fieldObject.$el.closest('.acf-field-setting-fc_layout');
      var layout = acf.getFieldSetting($layout);
      
      // check if previous prop exists
      // - if not, set prop to allow following code to trigger 'change' and save the field
      if( !fieldObject.has('parent_layout') ) {
        fieldObject.prop('parent_layout', 0);
      }
      
      // update meta
      fieldObject.prop('parent_layout', layout.get('id'));
    }
  });

})(jQuery);
