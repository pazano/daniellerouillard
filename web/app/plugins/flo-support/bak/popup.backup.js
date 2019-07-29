// "unimportant" words - the, of, to, and, a, in, is, it, you, that, he, was, for, on, are, with, as, I, his, they, be, at, one, have and this. 
// for now taken from: https://marksprague.wordpress.com/enterprise-seo-2/unimportant-words-impact-relevancy/
var omitDictionary = [
  "the", "of", "to", "and", "a", "in", "is", "it", "you", "that", 
  "he", "was", "for", "on", "are", "with", "as", "I", "his", "they", 
  "be", "at", "one", "have", "this", "how", "why", "am", "do", "if",
  "or", "ok"
];

function cleanifyQuery(str){
	var words = str.split(" ");
	
	words = words.filter(function(val) {
		return omitDictionary.indexOf(val) == -1;
	});
  
  words = words.join(' ');
  
	return words;
}

// strip HTML tags from strings (post content usually)
function textify(html) {
	var tmp = document.createElement("DIV");
	html = html.replace(/’/g, '');
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
}

// Split text into array of tokens
function tokenize(text) {
  return text.split(/\W+/);
}

// A function to validate a token
function validate(token) {
  return /\w{2,}/.test(token);
}

function countWords(str, wordsToCount) {
  let wordList = tokenize(str);
  let occurrences = {};
  wordsToCount.forEach(wordToCount => {
    occurrences[wordToCount] = 0;
    wordList.forEach(word => {
      if ((word.toLowerCase() == wordToCount.toLowerCase()) || (word.toLowerCase() == wordToCount.toLowerCase() + "s")) {
        occurrences[wordToCount]++;
      }
    });
  });
  
  return occurrences;
}

window.onload = function() {
  
  /* START: GET THEMES LIST */
    
    let themeSlug = $(".ticket-user-info").find(".theme-slug").val();
    // let themesList = [];
    // let excludeThemesList = [];
    // fetch("https://docs.flothemes.com/wp-json/wp/v2/theme/?per_page=100").then((response) => response.json().then((respdata) => {
    // 
    //   respdata.forEach((theme, index) => {
    //     let respThemeSlug = theme.slug;
    //     respThemeSlug = respThemeSlug.replace("-", "");
    //     themesList.unshift(respThemeSlug);
    //   });
    // 
    //   if($.inArray(themeSlug, themesList)) {
    //     excludeThemesList = themesList;
    //     let currentThemeIndex = excludeThemesList.indexOf(themeSlug);
    //     excludeThemesList.splice(currentThemeIndex, 1);
    //     excludeThemesList = excludeThemesList.join('|');
    //   }
    //   // console.log(excludeThemesList);
    // 
    // }));
  /* END: GET THEMES LIST */
  
  /* START: CREATING POPUP MARKUP */
    
    let b = "flo-support";
    let dotb = `.${b}`;
    let popupTrigger = $(`${dotb}__popup-trigger`);
    
    let popup = document.createElement("div");
    popup.className = `${b}`;
    
    popup.innerHTML = `
      <span class="${b}__close-trigger dashicons dashicons-no"></span>
      <div class="${b}__search-form">
        <input type="text" class="${b}__search-input" placeholder="Got a question? Fire away!" />
        <span class="${b}__search-button">Search</span>
      </div>
      <span class="${b}__menu-trigger">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="${b}__all-articles-menu"></div>
      <div class="${b}__search-results-wrap"></div>
      <div class="${b}__recommended-articles">
        <h3 class="${b}__recommended-articles--title">Recommended Articles:</h3>
        <ul class="${b}__recommended-articles--items menu"></ul>
      </div>
    `;
    
    let getMenuURL = `https://docsflothemes.staging.wpengine.com/wp-json/flo_api/v1/menus/?slug=${themeSlug}`;
    let menuObj = "";
    
    fetch(getMenuURL).then((response) => {
      response.json().then((responseJSON) => {
        
        if(responseJSON.length) {
          menuObj = responseJSON;
          let menuWrap = popup.querySelector(`${dotb}__all-articles-menu`);
          menuWrap.innerHTML = menuObj;
          let menuTrigger = popup.querySelector(`${dotb}__menu-trigger`);
          
          menuTrigger.addEventListener("click", () => {
            let menuItems = menuWrap.querySelector("div");
            $(menuItems).fadeToggle("fast", function() {
              if($(menuTrigger).hasClass(`${b}__trigger-toggled`)) {
                $(`${dotb}__search-results-wrap`).css({
                  "opacity": 0,
                  "pointer-events": "none"
                });
                $(`${dotb}__recommended-articles`).css({
                  "opacity": 0,
                  "pointer-events": "none"
                });
              } else {
                $(`${dotb}__search-results-wrap`).css({
                  "opacity": "",
                  "pointer-events": ""
                });
                $(`${dotb}__recommended-articles`).css({
                  "opacity": "",
                  "pointer-events": ""
                });
              }
            });
            $(menuTrigger).toggleClass(`${b}__trigger-toggled`);
            
          });
          
          /* START: pull recommended resources */
            
            // the list of menu item ids to pull (from the "menuItems" variable), clone and append to the recommended wrap
            // ex: #menu-item-xxxx
            let recommendedItemIdsArray = [
              "9985",
              "9999",
              "10017",
              "10032"
            ];
            
            let recommendedItemsWrap = $(`${dotb}__recommended-articles--items`);
            recommendedItemIdsArray.forEach((recommendedItemId, index) => {
              let recommendedItemHTML = $(menuWrap.querySelector(`#menu-item-${recommendedItemId}`)).clone();
              recommendedItemsWrap.append(recommendedItemHTML);
            });
            
          /* END: pull recommended resources */
          
          /* START: DROPDOWN TOGGLES */
            let menuItem = $(`${dotb} .menu .menu-item-has-children > a`);
            menuItem.on("click", function(event) {
              event.preventDefault();
              let subMenu = $(this).siblings(".sub-menu");
              subMenu.slideToggle("350", function() {
                let childrenSubMenus = $(this).find(".submenu-open > .sub-menu");
                childrenSubMenus.each(function() {
                  $(this).hide();
                  $(this).parent().removeClass("submenu-open");
                });
              });
              $(this).parent().toggleClass("submenu-open");
            });
          /* END: DROPDOWN TOGGLES */
        }
      });
    });
    
    /* START: SEARCH INPUT ALTERNATIVES */
      /* START: GOOGLE HTML */
        // <gcse:search personalizedAds="false" enableAutoComplete="true"></gcse:search>
      /* END: GOOGLE HTML */
      
      /* START: OUR OWN HTML */
        // <input type="text" class="${b}__search-input" placeholder="Got a question? Fire away!" />
        // <span class="${b}__search-button">Search</span>
      /* END: OUR OWN HTML */
    /* END: SEARCH INPUT ALTERNATIVES */
    
  /* END: CREATING POPUP MARKUP */
  
  let $popup = $(popup);
  
  popupTrigger.on("click", function(event) {
    
    // (function() {
		// 	var cx = '011641767047383812541:sqedn2ldse4';
		// 	var gcse = document.createElement('script');
		// 	gcse.type = 'text/javascript';
		// 	gcse.async = true;
		// 	gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
		// 	var s = document.getElementsByTagName('script')[0];
		// 	s.parentNode.insertBefore(gcse, s);
		// })();
    
    if(document.querySelector(`${dotb}`) == null) {
      
      // if working with popup contents, declare all variables, selectors etc BELOW this line:
      document.body.appendChild(popup);
      
      /* START: POPUP VARIABLES */
        let searchInput = $(`${dotb}__search-input`);
        let searchButton = $(`${dotb}__search-button`);
        let searchResultsWrap = $(`${dotb}__search-results-wrap`);
        let recommendedArticlesWrap = $(`${dotb}__recommended-articles`);
      /* END: POPUP VARIABLES */
      
      $(`${dotb}__close-trigger`).on("click", () => $popup.fadeOut("fast"));
      
      
      function docsSearch(str) {
        
        let parsedStr = encodeURIComponent(cleanifyQuery(str));
        let queryArray = cleanifyQuery(str).split(" ");
        
        // let mainUrl = "https://www.googleapis.com/customsearch/v1/siterestrict";
        // let apiKey = "AIzaSyBc6wqjx6GOZTTASes_0kVJ7DyxAUxlaQ8";
        // let cxKey = "011641767047383812541:sqedn2ldse4";
        // let themeName = $(".ticket-user-info").find(".theme-name").val();
        
        /* START: THEME-SPECIFIC QUERY URLS */
        
          // exact term: theme name
          // let formedQueryUrl = `${mainUrl}?key=${apiKey}&cx=${cxKey}&exactTerms=${themeName}&q=${str}`;
          
          // exclude terms: all theme slugs except current one:
          // console.log(excludeThemesList);
          // let formedQueryUrl = `${mainUrl}?key=${apiKey}&cx=${cxKey}&excludeTerms=${excludeThemesList}&exactTerms=${themeName}&q=${str}`;
          // let formedQueryUrl = `${mainUrl}?key=${apiKey}&cx=${cxKey}&exactTerms=${themeName}&q=${str}`;
          
          // let formedQueryUrl = `${mainUrl}?key=${apiKey}&cx=${cxKey}&exactTerms=${themeName}&q=${str}`;
          
        /* END: THEME-SPECIFIC QUERY URLS */
        
        /* START: GENERAL QUERY URL, NO FILTERING */
          // let formedQueryUrl = `${mainUrl}?key=${apiKey}&cx=${cxKey}&q=${str}`;
        /* END: GENERAL QUERY URL, NO THEME FILTERING */
        
        searchResultsWrap.html("");
        searchResultsWrap.html("<h4 class='search-loading'>Searching...</h4>");
        
        if($(`${dotb}__menu-trigger`).hasClass(`${b}__trigger-toggled`))
          $(`${dotb}__menu-trigger`).trigger("click");
        
        recommendedArticlesWrap.fadeOut("fast", () => searchResultsWrap.fadeIn("fast"));
        
        let baseUrl = "http://localhost/newdocs/";
        // let baseUrl = "https://docsfothemes.staging.wpengine.com/";
        let urlParams = "wp-json/flo_api/v1/search/";
        let url = `${baseUrl}${urlParams}?s=${parsedStr}&tags=${themeSlug},generic`;
        
        fetch(url).then((response) => {
          response.json().then((resultsJSON) => {
            
            console.clear();
            console.log("custom search: ");
            console.log(resultsJSON);
            
            $(".search-loading").remove();
            
            if(resultsJSON.length) {
              resultsJSON.forEach((result, index) => {
                let itemUrl = baseUrl + themeSlug + "/#" + result.slug;
                searchResultsWrap.append(`
                  <div class="${b}__search-result">
                    <a href="${itemUrl}" target="_blank">
                      ${result.title}
                    </a>
                  </div>
                `);
              });
            } else {
              searchResultsWrap.html("<h4>No results found</h4>");
            }
            
          });
        });
        
        // let homeURL = "https://docsflothemes.staging.wpengine.com/";
        // let homeURL = "http://localhost/newdocs/";
        // let RestAPIBase = "wp-json/wp/v2/posts/";
        // let queryURLComponent = `?search=${parsedStr}`;
        // let queryOptions = `&filter[tag]=${themeSlug},generic&per_page=50&orderby=relevance`;
        // 
        // let fullSearchURL = homeURL + RestAPIBase + queryURLComponent + queryOptions;
        // 
        // fetch(fullSearchURL).then((response) => {
        //   let resultsCountData = [];
        // 
        //   response.json().then((resultsJSON) => {
        // 
        //     $(".search-loading").remove();
        // 
        //     if(resultsJSON.length) {
        // 
        //       // console.log("wp search: ");
        //       // console.log(resultsJSON);
        // 
        //       resultsJSON.forEach((result, index) => {
        // 
        //         // start the weird shit with counting words and determining relevance
        //           let $postContent = result.content.rendered;
        //           $postContent = $postContent.split(`<div class="m-entry__feedback">`)[0];
        // 
        //           let plainTextContent = textify($postContent);
        //           let articleWordCount = countWords(plainTextContent, queryArray);
        // 
        //           let articleWordData = {
        //             "title": result.title.rendered,
        //             "wordCount": articleWordCount
        //           }
        // 
        //           let infoMarkup = document.createElement("div");
        //           infoMarkup.className = "result-debug-info";
        //           infoMarkup.innerHTML = " ---- ";
        // 
        //           for (var i in articleWordCount) {
        //             infoMarkup.innerHTML += ` ${i} - ${articleWordCount[i]} `;
        //           }
        // 
        //           resultsCountData.push(articleWordData);
        //         // end the weird shit with counting words and determining relevance
        // 
        //         let itemUrl = homeURL + themeSlug + "/#" + result.slug;
        //         searchResultsWrap.append(`
        //           <div class="${b}__search-result">
        //             <a href="${itemUrl}" target="_blank">
        //               ${result.title.rendered}
        //             </a>
        //             <span>${infoMarkup.innerHTML}</span>
        //           </div>
        //         `);
        // 
        // 
        //       });
        // 
        //     } else {
        //       searchResultsWrap.html("<h4>No results found</h4>");
        //     }
        // 
        //     /* START: DEV -> SEARCH QUERY DATA */
        // 
        //       // let debugInfo = {
        //       //   "originalQuery": decodeURIComponent(str),
        //       //   "parsedQuery": decodeURIComponent(parsedStr),
        //       //   "resultItems": resultsJSON
        //       //   // "totalWordCount": resultsCountData
        //       // };
        //       // 
        //       // console.clear();
        //       // console.log("SEARCH QUERY DATA:");
        //       // console.log("------------------");
        //       // console.log(debugInfo);
        //       // console.log("------------------");
        // 
        //     /* END: DEV -> SEARCH QUERY DATA */
        // 
        //   });
        // });
        
        // fetch(formedQueryUrl).then((response) => {
        //   response.json().then((gData) => {
        // 
        //     let resultsList = gData.items;
        // 
        //     searchResultsWrap.html("");
        // 
        //     console.log(gData);
        // 
        //     if(gData.searchInformation.totalResults > 0) {
        // 
        //       resultsList.forEach((result, index) => {
        // 
        //         let itemTitle = result.pagemap.metatags[0]["og:title"];
        //         itemTitle = itemTitle.replace(" – Flothemes Documentation", "");
        //         let itemUrl = result.link;
        // 
        //         let ogStuff = {
        //           "section": result.pagemap.metatags["0"]["article:section"],
        //           "description": result.pagemap.metatags["0"]["og:description"]
        //         };
        // 
        //         // console.log("-------------");
        //         // console.log("article data:");
        //         // console.log(`title - ${result.title}`);
        //         // console.log(`article:section - ${ogStuff.section}`);
        //         // console.log(`og:description - ${ogStuff.description}`);
        //         // console.log("-------------");
        // 
        //         if(typeof(result.pagemap.metatags["0"]["article:section"]) == "undefined" || typeof(result.pagemap.metatags["0"]["og:description"]) == "undefined") {
        //           resultsList.splice(resultsList.indexOf(result), 1);
        //         } else {
        //           searchResultsWrap.append(`
        //             <div class="${b}__search-result">
        //               <a href="${itemUrl}" target="_blank">
        //                 ${itemTitle}
        //               </a>
        //               <div class="${b}__search-result-info">
        //                 <span class="${b}__search-result-info--full-info">console.log JSON</span>
        //                 <span class="${b}__search-result-info--full-json">copy JSON</span>
        //                 <span class="${b}__search-result-info--section">section: ${ogStuff.section}</span>
        //                 <span class="${b}__search-result-info--description">description: ${ogStuff.description}</span>
        //               </div>
        //             </div>
        //           `);  
        //         }
        // 
        //         /* START: DEV: GET FULL RESULT INFO */
        //           $(`${dotb}__search-result:nth-child(${index + 1}) ${dotb}__search-result-info--full-info`).on("click", function() {
        //             console.log(result);
        //           });
        //           $(`${dotb}__search-result:nth-child(${index + 1}) ${dotb}__search-result-info--full-json`).on("click", function() {
        // 
        //             let jsonString = JSON.stringify(result, null, "\t");
        //             // console.log(jsonString);
        // 
        //             let tempText = document.createElement("textarea");
        //             tempText.setAttribute("style", `
        //               pointer-events: none;
        //               position: absolute;
        //               top: ${$(window).scrollTop()}px;
        //               opacity: 0;
        //               z-index: -111;
        //             `);
        // 
        //             document.body.appendChild(tempText);
        //             tempText.value = jsonString;
        // 
        //             tempText.focus();
        //             tempText.select();
        // 
        //             try {
        //               var successful = document.execCommand('copy');
        //               var msg = successful ? 'successful' : 'unsuccessful';
        //               console.log('Copied JSON to clipboard!');
        //             } catch (err) {
        //               console.log("Unable to copy");
        //             }
        // 
        //             $(tempText).remove();
        // 
        //           });
        //         /* END: DEV: GET FULL RESULT INFO */
        // 
        //       });
        //     } else {
        //       searchResultsWrap.html("No results found");
        //     }
        // 
        //   })
        // });
      
      }
      
      searchInput.on("keyup", function(event) {
        
        // esc
        if(event.keyCode == 27) {
          $(this).val("");
        }
        
        if($(this).val().length === 0)
          recommendedArticlesWrap.fadeIn("fast", () => searchResultsWrap.fadeOut("fast"));
        
        // enter
        if(event.keyCode == 13) {
          let currentQuery = $(this).val();
          if(currentQuery.length)
            docsSearch(currentQuery);
        }
        
      });
      
      searchButton.on("click", function() {
        let currentQuery = $(this).siblings(searchInput).val();
        if(currentQuery.length)
          docsSearch(currentQuery);
      });
      
      $popup.fadeIn("fast");
      
    } else {
      $popup.fadeIn("fast");
    }
  });
  
  /* START: DEV: OPEN POPUP ON PAGE LOAD */
    popupTrigger.trigger("click");
  /* END: DEV: OPEN POPUP ON PAGE LOAD */
  
}