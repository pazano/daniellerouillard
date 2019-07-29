jQuery(document).ready(($) => {
  
  $('[data-key="intro_sections_content"]').each(function() {
    
    let $field = $(this);
    const editorID = $field.find('textarea').attr('id');
    
    const editorConfig = {
      tinymce: {
        wpautop:true, 
        plugins : 'charmap colorpicker compat3x directionality fullscreen hr image lists media paste tabfocus textcolor wordpress wpautoresize wpdialogs wpeditimage wpemoji wpgallery wplink wptextpattern wpview', 
        toolbar1: 'formatselect bold italic | bullist numlist | blockquote | alignleft aligncenter alignright | link unlink | wp_more | spellchecker',
        init_instance_callback : function(editor) {
          
          $(`#${editorID}`).trigger('change');
          
          editor.on('keyup', function(e) {
            const currentContent = editor.getContent();
            $(`#${editorID}`).val(currentContent).text(currentContent);
            $('.cloneNode').text(currentContent).val(currentContent);
          });
          
        }
      }, 
      quicktags: true
    }
    
    wp.editor.initialize(editorID, editorConfig);
    
  });
  
})