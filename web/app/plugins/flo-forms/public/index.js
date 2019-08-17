import Vue from 'vue';
import FloForm from '../public/vue-components/FloForm.vue';


if(jQuery('.app-flo-forms').length) {
  new Vue({
    el: '.app-flo-forms',
    
    beforeCreate: function() {
      //console.log(this.$formSettings)
    },
  
  
    data: {
      //vue_form_settings: flo_form_settings
    },
  
    components: {
      //'hello': Hello,
      'flo-form' : FloForm
    },
  
    methods: {
      addFormField: function (key, event ) {
        console.log(event, key);
      }
      
    }
  
  
  });
}
