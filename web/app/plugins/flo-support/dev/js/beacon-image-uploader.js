const processImgurFiles = (elt, data = {}, visualFeedback) => {
  if(elt.files.length) {
    
    // declaring all necessary stuff
    let apiURL = 'https://api.imgur.com/3/image';
    let apiKey = '8e6d781c3fdf421';
    
    let formData;
    let uploadedAmount = 0;
    let allImgurLinks = [];
    
    let settings = {
      async: true,
      crossDomain: true,
      processData: false,
      contentType: false,
      type: 'POST',
      url: apiURL,
      headers: {
        Authorization: 'Client-ID ' + apiKey,
        Accept: 'application/json'
      },
      mimeType: 'multipart/form-data'
    };
    
    // for each file send the request and process the response
    
    $(visualFeedback).css({
      'pointer-events': 'none',
      'opacity': '0.2'
    });
    $(visualFeedback).find('.contact--attach').text(`Uploading ${elt.files.length} images...`);
    
    Array.prototype.forEach.call(elt.files, file => {
      
      formData = new FormData();
      formData.append("image", file);
      settings.data = formData;
      
      $.get(settings).done(response => {
        let responseJSON = JSON.parse(response);
        
        if(responseJSON.success) {
          uploadedAmount++;
          allImgurLinks.push(responseJSON.data.link);  
          if(uploadedAmount == elt.files.length) {
            // all links are loaded
            let linksToStrings = allImgurLinks.join(', ');
            $(visualFeedback).css({
              'pointer-events': 'auto',
              'opacity': '1'
            });
            $(visualFeedback).find('.contact--attach').text(`Uploaded ${elt.files.length} images.`);
            data.attachments = linksToStrings;
            HS.beacon.identify(data);
          }
        }
      });
      
    });
    
  }
};