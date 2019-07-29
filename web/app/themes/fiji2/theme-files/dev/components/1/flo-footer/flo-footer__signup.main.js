window.footer_miniblock_signup = function(){

  var $form = $(".flo-form--newsletter");

  if ($form.length) {
    // Start: Validation
      $form.parsley();
    // End: Validation

    // Start: Mailchimp Subscription
      var
      embed_code =
        unescape(
          $form.parent().find(".embed_code").text()
        ),
      $embed_code = $("<div>").html(embed_code);

      if(typeof $embed_code.find("form").attr("action") !== 'undefined'){
        var embed_form_action = $embed_code.find("form").attr("action").replace(/\\"/g, '');

        $form.attr("action", embed_form_action);
      }else{
        console.log('The mailchimp code is incorect');
      }

    // End: Mailchimp Subscription`

  }

}
