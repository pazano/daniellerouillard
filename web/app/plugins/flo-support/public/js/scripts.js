(function($){'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var processImgurFiles = function processImgurFiles(elt) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var visualFeedback = arguments[2];

  if (elt.files.length) {

    // declaring all necessary stuff
    var apiURL = 'https://api.imgur.com/3/image';
    var apiKey = '8e6d781c3fdf421';

    var formData = void 0;
    var uploadedAmount = 0;
    var allImgurLinks = [];

    var settings = {
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
    $(visualFeedback).find('.contact--attach').text('Uploading ' + elt.files.length + ' images...');

    Array.prototype.forEach.call(elt.files, function (file) {

      formData = new FormData();
      formData.append("image", file);
      settings.data = formData;

      $.get(settings).done(function (response) {
        var responseJSON = JSON.parse(response);

        if (responseJSON.success) {
          uploadedAmount++;
          allImgurLinks.push(responseJSON.data.link);
          if (uploadedAmount == elt.files.length) {
            // all links are loaded
            var linksToStrings = allImgurLinks.join(', ');
            $(visualFeedback).css({
              'pointer-events': 'auto',
              'opacity': '1'
            });
            $(visualFeedback).find('.contact--attach').text('Uploaded ' + elt.files.length + ' images.');
            data.attachments = linksToStrings;
            HS.beacon.identify(data);
          }
        }
      });
    });
  }
};

var BetaLog = function () {
  function BetaLog() {
    _classCallCheck(this, BetaLog);

    // START: FIREBASE INIT
    this.appConfig = {
      apiKey: "AIzaSyAgAlM44YV3aRp5uFYMXw2Pt-3d8I5ZCWE",
      authDomain: "flosupport-base.firebaseapp.com",
      databaseURL: "https://flosupport-base.firebaseio.com",
      projectId: "flosupport-base",
      storageBucket: "flosupport-base.appspot.com",
      messagingSenderId: "236985967899"
    };

    this.docsApp;

    // use this to stop connection to firebase (???)
    // docsApp.delete();

    // END: FIREBASE INIT
  }

  _createClass(BetaLog, [{
    key: 'load',
    value: function load() {
      this.docsApp = firebase.initializeApp(this.appConfig);
    }

    // reading is disabled from firebase rules for now
    // readDB(identifier){
    // 	var theDb = firebase.database().ref(identifier + '/');
    // 	theDb.on('value', function(snapshot) {
    // 	  console.log(snapshot.val());
    // 	});
    // }

    // write term in firebase

  }, {
    key: 'write',
    value: function write(term, termID) {

      var pageNow = window.location.pathname;

      firebase.database().ref('term_log/' + termID).set({
        term: term, pageNow: pageNow
      }, function (error) {
        if (error) {
          // The write failed...
          console.log(error);
        } else {
          // Data saved successfully!
        }
      });
    }
  }]);

  return BetaLog;
}();

!function (e, o, n) {
  window.HSCW = o, window.HS = n, n.beacon = n.beacon || {};var t = n.beacon;t.userConfig = {}, t.readyQueue = [], t.config = function (e) {
    this.userConfig = e;
  }, t.ready = function (e) {
    this.readyQueue.push(e);
  }, o.config = { docs: { enabled: !1, baseUrl: "" }, contact: { enabled: !0, formId: "2b5be479-3459-11e8-8d65-0ee9bb0328ce" } };var r = e.getElementsByTagName("script")[0],
      c = e.createElement("script");c.type = "text/javascript", c.async = !0, c.src = "https://djtflbt20bdde.cloudfront.net/", r.parentNode.insertBefore(c, r);
}(document, window.HSCW || {}, window.HS || {});

// Beacon Config
HS.beacon.config({
  modal: true,
  color: '#000000',
  icon: 'message',
  poweredBy: false,
  showName: true,
  showSubject: true,
  zIndex: 1000000,
  topArticles: false,
  autoInit: false,
  attachment: true,
  instructions: ' ',
  translation: {
    topicLabel: 'Support Type',
    contactLabel: 'Submit a Ticket',
    sendLabel: 'Submit'
  },
  topics: [{ val: 'bug', label: 'Bug' }, { val: 'question', label: 'Question' }, { val: 'contact-form-issues', label: 'Contact Form Issues' }, { val: 'css-customization', label: 'CSS Customization' }, { val: 'feature-request', label: 'Feature Request' }, { val: 'flohub', label: 'FloHub' }, { val: 'floforms', label: 'FloForms' }, { val: 'floinstagram', label: 'FloInstagram' }, { val: 'font-issues', label: 'Font Issues' }, { val: 'image-quality-and-sizing', label: 'Image Quality and Sizing' }, { val: 'other', label: 'Other' }]
});

$(window).on("load", function () {
  var b = "flo-support";
  var dotb = '.' + b;

  // plugin options
  var analyticsCheckbox = document.getElementById(b + '__settings-analytics');
  if (analyticsCheckbox) {
    analyticsCheckbox.addEventListener("change", function (event) {
      if (event.target.checked) {
        event.target.value = 1;
      } else {
        event.target.value = 0;
      }
    });
  }

  /* START: CREATING POPUP MARKUP */
  var popupTrigger = $(dotb + '__popup-trigger');
  var themeSlug = $("#beacon-flo").attr("data-theme-slug");
  // let docsURL = '//docsflothemes.staging.wpengine.com/';
  var docsURL = "https://docs.flothemes.com/";
  // let docsURL = "http://localhost/newdocs/";

  var useTechnicalData = $("#beacon-flo").attr("data-analytics");
  // if(useTechnicalData) {
  //   let userData = JSON.parse(flo_support_user_data);
  // }

  // defining as global variable for proper breadcrumb management across different articles
  var articleHistory = [];

  // "unimportant" words - the, of, to, and, a, in, is, it, you, that, he, was, for, on, are, with, as, I, his, they, be, at, one, have and this.
  // for now taken from: https://marksprague.wordpress.com/enterprise-seo-2/unimportant-words-impact-relevancy/
  var omitDictionary = ["the", "of", "to", "and", "a", "in", "is", "it", "you", "that", "he", "was", "for", "on", "are", "with", "as", "I", "his", "they", "be", "at", "one", "have", "this", "how", "why", "am", "do", "if", "or", "ok", "what", "where", "when", "who", "which", "so", "too", "my", "not"];

  function cleanifyQuery(str) {
    var words = tokenize(str);

    words = words.filter(function (val) {
      return omitDictionary.indexOf(val) == -1;
    });

    words = words.join(" ");

    return words;
  }

  // strip HTML tags from strings (post content usually)
  function textify(html) {
    var tmp = document.createElement("div");
    html = html.replace(/’/g, "");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  // Split text into array of tokens
  function tokenize(text) {
    return text.split(/\W+/);
  }

  function compareTwoTexts(arr1, arr2) {
    var matches = 0;
    arr1.forEach(function (e1) {
      return arr2.forEach(function (e2) {
        if (e1.toLowerCase() === e2.toLowerCase()) {
          matches++;
        }
      });
    });
    return matches;
  }

  function countWords(str, wordsToCount) {
    var wordList = tokenize(str);
    var occurrences = {};
    wordsToCount.forEach(function (wordToCount) {
      occurrences[wordToCount] = 0;
      wordList.forEach(function (word) {
        if (word.toLowerCase() == wordToCount.toLowerCase() || word.toLowerCase() == wordToCount.toLowerCase() + "s") {
          occurrences[wordToCount]++;
        }
      });
    });

    return occurrences;
  }

  var popup = document.createElement("div");
  popup.className = '' + b;

  popup.innerHTML = '\n    \n      <span class="' + b + '__close-trigger">\n        <i class="' + b + '__close-icon  ' + b + '-icon-cancel-1"></i>\n        <svg class="' + b + '__close-button-bg" width="111px" height="23px" viewBox="0 0 111 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n            <g id="Artboard" transform="translate(-240.000000, -64.000000)" fill="#FFFFFF" fill-rule="nonzero">\n              <path d="M351,87 C320.806012,87 323.799999,64 296,64 C268.200001,64 266.097256,87 240,87 C276,87 311.5,87 351,87 Z" id="Path-2"></path>\n            </g>\n          </g>\n        </svg>\n      </span>\n      <div class="' + b + '__not-single-elts">\n        <div class="' + b + '__tab-switcher">\n          <span class="' + b + '__tab-switch ' + b + '__tab-switch--docs" data-tab="docs-tab">\n            <i class="' + b + '-icon-menu"></i>\n            Documentation\n          </span>\n          <span class="' + b + '__tab-switch ' + b + '__tab-switch--search ' + b + '__tab-switch--active" data-tab="search-tab">\n            <i class="' + b + '-icon-search"></i>\n            Search Docs\n          </span>\n          <span class="' + b + '__tab-switch ' + b + '__tab-switch--hs" data-tab="hs-tab">\n            <i class="' + b + '-icon-mail"></i>\n            Submit a Ticket\n          </span>\n          \n          <!-- BETA: FEEDBACK TAB TRIGGER -->\n          <span class="' + b + '__tab-switch ' + b + '__tab-switch--feedback" data-tab="feedback-tab" title="Leave Feedback">\n            <i class="' + b + '-icon-info-outline"></i>\n          </span>\n          \n        </div>\n        <div class="' + b + '__tabs-wrap">\n          <div class="' + b + '__docs-tab ' + b + '__tab">\n            <div class="' + b + '__all-articles-menu"></div>\n          </div>\n          <div class="' + b + '__search-tab ' + b + '__tab ' + b + '__active-tab">\n            <div class="' + b + '__search-form">\n              <input type="text" class="' + b + '__search-input" placeholder="Got a question? Fire away!" />\n              <span class="' + b + '__search-button">Search</span>\n            </div>\n            <div class="' + b + '__search-results-wrap"></div>\n            <div class="' + b + '__recommended-articles">\n              <span class="' + b + '__recommended-articles--title">Recommended Articles</span>\n              <div class="' + b + '__recommended-loading">\n                <div class="' + b + '__search-loading-bar"></div>\n                <div class="' + b + '__search-loading-bar"></div>\n                <div class="' + b + '__search-loading-bar"></div>\n                <div class="' + b + '__search-loading-bar"></div>\n              </div>\n              <!-- needs scrollbar -->\n              <ul class="' + b + '__recommended-articles--items menu"></ul>\n            </div>\n          </div>\n          <div class="' + b + '__hs-tab ' + b + '__tab"></div>\n          <!-- BETA: FEEDBACK TAB -->\n          <div class="' + b + '__feedback-tab ' + b + '__tab">\n            <h3 class="' + b + '__feedback-loading">\n              Loading Feedback Form\n              <span class="dot">.</span>\n              <span class="dot">.</span>\n              <span class="dot">.</span>\n            </h3>\n            <iframe class="' + b + '__feedback-iframe waiting-load" data-src="https://docs.flothemes.com/flosupport-leave-feedback" frameborder="0"></iframe>\n          </div>\n          <div class="' + b + '__single-article-wrap ' + b + '__tab">\n            <div class="' + b + '__article-actions">\n              <span class="' + b + '__article-close">\n                <i class="' + b + '-icon-arrow-back"></i>\n              </span>\n              <div class="' + b + '__breadcrumbs-wrap"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="' + b + '__notice-wrap"></div>\n      \n    ';

  // if working with popup contents, declare all variables, selectors etc BELOW this line:
  document.body.appendChild(popup);

  /* START: POPUP VARIABLES */
  var searchInput = $(dotb + '__search-input');
  var searchButton = $(dotb + '__search-button');
  var searchResultsWrap = $(dotb + '__search-results-wrap');
  var recommendedArticlesWrap = $(dotb + '__recommended-articles');
  var docsTabTrigger = $(dotb + '__tab-switch--docs');
  var docsTab = $(dotb + '__docs-tab');
  var hsTabTrigger = $(dotb + '__tab-switch--hs');
  var hsTab = $(dotb + '__hs-tab');
  var searchTabTrigger = $(dotb + '__tab--search');
  var searchTab = $(dotb + '__search-tab');
  /* END: POPUP VARIABLES */

  /* START: BETA LOG (init firebase) */
  var betaLog = new BetaLog();
  betaLog.load();
  /* END: BETA LOG (init firebase) */

  /* START: BETA ASYNC LOAD IFRAME */
  $(dotb + '__tab-switch--feedback').one("click", function (event) {
    $(dotb + '__feedback-iframe').one("load", function (e) {
      $(e.target).removeClass("waiting-load");
      setTimeout(function () {
        $(dotb + '__feedback-loading').remove();
      }, 300);
    });
    $(dotb + '__feedback-iframe').attr("src", $(dotb + '__feedback-iframe').attr("data-src"));
  });
  /* END: BETA ASYNC LOAD IFRAME */

  function docsSearch(searchQ) {
    betaLog.write(searchQ, new Date().getTime());

    // preprocess query text for result sorting
    var cleanQuery = RiTa.stem(searchQ.toLowerCase());
    var queryArray = RiTa.tokenize(cleanQuery);

    var parsedStr = encodeURIComponent(cleanifyQuery(searchQ));

    searchResultsWrap.html("");
    searchResultsWrap.html('\n        <div class="' + b + '__search-loading-bar"></div>\n        <div class="' + b + '__search-loading-bar"></div>\n        <div class="' + b + '__search-loading-bar"></div>\n        <div class="' + b + '__search-loading-bar"></div>\n      ');

    $(dotb + '__recommended-articles').css("display", "none");
    $(dotb + '__search-results-wrap').css("display", "flex");

    var urlParams = "wp-json/flo_api/v1/search/";
    var url = '' + docsURL + urlParams + '?s=' + parsedStr + '&tags=' + themeSlug + ',generic';

    /* START: RENDERING SEARCH RESULTS LOGIC */
    fetch(url).then(function (response) {
      response.json().then(function (resultsJSON) {
        searchResultsWrap.fadeOut("400", function () {
          searchResultsWrap.html("");

          if (resultsJSON.length) {
            // declare 5 empty arrays that will hold the results based on relevance score
            var first = [],
                second = [],
                third = [],
                fourth = [],
                fifth = [];


            resultsJSON.forEach(function (result, index) {
              /* count relevance score for each article
                  We will try to mimic the "orderby=relevance" method that WordPress does via get_posts or WP_Query: https://core.trac.wordpress.org/ticket/7394#comment:72
                  1 is the highest value and 5 is the lowest:
                    1 - Full sentence matches in post titles
                    2 - All search terms in post titles
                    3 - Any search terms in post titles
                    4 - Full sentence matches in post content or "acf sections" content
                    5 - Each section and any remaining posts are then sorted by date
                  for posts that have a relevance score of "5" we will sort by the amount of times each query term occurs in the post content or "acf sections" content
                  */

              var postTitle = result.post_title;
              var postContent = result.text_content;
              var postSections = result.acf.sections;
              var postSectionsContent = "";

              // if post has acf sections, merge the sections content in the postContent variable
              if (postSections && postSections.length) {
                postSections.forEach(function (section, index) {
                  if (section.content && section.content.length) {
                    postSectionsContent += section.content;
                  }
                });
                postContent += postSectionsContent;
              }

              var postContentPlainText = textify(postContent);

              var postExcerpt = postContentPlainText.length > 150 ? postContentPlainText.slice(0, 150) + "..." : postContentPlainText;
              result.excerpt = textify(postExcerpt);

              // preprocess post title for determining relevance scores (2, 3)
              var postTitleStemmed = RiTa.stem(postTitle);
              var postTitleStemmedTokens = tokenize(cleanifyQuery(postTitleStemmed).toLowerCase());

              function keyIsInString(currentValue) {
                return postTitleStemmed.toLowerCase().includes(currentValue);
              }

              setTimeout(function () {
                if (postTitle.toLowerCase().includes(searchQ.toLowerCase())) {
                  result.relevance_score = 1;
                  first.push(result);
                } else if (queryArray.every(keyIsInString)) {
                  result.relevance_score = 2;
                  second.push(result);
                } else if (tokenize(cleanifyQuery(cleanQuery)).some(function (substring) {
                  return cleanifyQuery(postTitleStemmed).toLowerCase().includes(substring);
                })) {
                  // count the post title words: how many times these match the query words (repeating increases count as well)
                  result.relevance_score = 3;
                  result.titleMatchCount = compareTwoTexts(tokenize(cleanifyQuery(cleanQuery)), postTitleStemmedTokens);
                  third.push(result);
                } else if (RiTa.stem(postContentPlainText.toLowerCase()).includes(cleanifyQuery(cleanQuery.toLowerCase()))) {
                  result.relevance_score = 4;
                  fourth.push(result);
                } else {
                  // relevance score 5, count how many times each word from the post content occurs in the query
                  var wordCount = countWords(postContentPlainText.toLowerCase(), tokenize(cleanifyQuery(searchQ).toLowerCase()));
                  var wordCountSum = 0;
                  Object.values(wordCount).forEach(function (wordCountValue) {
                    wordCountSum += wordCountValue;
                  });
                  var wordCountMean = wordCountSum / Object.values(wordCount).length;
                  var num = Number(wordCountMean); // The Number() only visualizes the type and is not needed
                  var roundString = num.toFixed(2); // toFixed() returns a string (often suitable for printing already)
                  var roundWordCountMean = Number(roundString);

                  result.word_count = {
                    words: wordCount,
                    wordCountScore: roundWordCountMean
                  };

                  fifth.push(result);
                }
              });
            });

            // console.log({first, second, third, fourth, fifth});
            setTimeout(function () {
              // for results that have a relevance score of 3 sort them by titleMatchCount
              third.sort(function (a, b) {
                return b.titleMatchCount - a.titleMatchCount;
              });

              // for results that have a relevance score of 5 sort them by (mean word count - wordcount sum divided by amount of words)
              fifth.sort(function (a, b) {
                return b.word_count.wordCountScore - a.word_count.wordCountScore;
              });

              var sortedResultsJSON = first.concat(second, third, fourth, fifth);

              searchResultsWrap.append('\n                    <span class="' + b + '__search-results-info">\n                      Showing ' + sortedResultsJSON.length + ' results\n                    </span>\n                  ');

              sortedResultsJSON.forEach(function (result) {
                // let wordCountConditionalInfo = `
                //   <span>Relevance Score: ${result.relevance_score}</span>
                // `;
                //
                // if(result.titleMatchCount)
                //   wordCountConditionalInfo += `
                //     <span>Word matches in title: ${result.titleMatchCount}</span>
                //   `;
                //
                // if(result.word_count)
                //   wordCountConditionalInfo += `
                //     <span>${JSON.stringify(result.word_count.words)}</span>
                //     <span>Mean Value: ${result.word_count.wordCountScore}</span>
                //   `;
                //
                // let wordCountData = `
                //   <span class="${b}__wordcount-data-wrap">
                //     <i class="dashicons dashicons-info"></i>
                //     <div class="${b}__wordcount-info">
                //       ${wordCountConditionalInfo}
                //     </div>
                //   </span>
                // `;

                var itemUrl = docsURL + themeSlug + "/#" + result.slug;

                var searchResultExcerptWrap = result.excerpt.length > 0 ? '<p class="' + b + '__search-result-excerpt">' + result.excerpt + '</p>' : "";

                searchResultsWrap.append('\n                      <div class="' + b + '__search-result">\n                        <a href="' + itemUrl + '" target="_blank">\n                          <span class="' + b + '__search-result-post-title">' + result.post_title + '</span>\n                          ' + searchResultExcerptWrap + '\n                          <i class="' + b + '-icon-arrow-right ' + b + '__search-result-item-icon"></i>\n                        </a>\n                      </div>\n                    ');
              });

              var searchResultLink = $(dotb + '__search-result > a');
              searchResultLink.on("click", function (event) {
                event.preventDefault();
                var targetIndex = $(event.target).parents(dotb + '__search-result').index();
                var articleToRender = sortedResultsJSON[targetIndex - 1];
                renderArticle(articleToRender, true);
              });
            });
          } else {
            searchResultsWrap.html("<h4>No results found</h4>");
          }

          searchResultsWrap.fadeIn("400");
        });
      });
    });
    /* END: RENDERING SEARCH RESULTS LOGIC */
  }

  $(dotb + '__tab-switch').on("click", function () {
    var tabToShow = $(this).attr("data-tab");

    $(dotb + '__tab-switch--active').removeClass(b + '__tab-switch--active');
    $(this).addClass(b + '__tab-switch--active');
    $(dotb + '__previously-active-tab').removeClass(b + '__previously-active-tab');
    $(dotb + '__active-tab').removeClass(b + '__active-tab');
    $(dotb + '__' + tabToShow).addClass(b + '__active-tab');
  });

  searchInput.on("keyup", function (event) {
    // esc
    if (event.keyCode == 27) {
      $(this).val("");
    }

    if ($(this).val().length === 0) {
      recommendedArticlesWrap.css("display", "flex");
      searchResultsWrap.css("display", "none");
    }

    // enter
    if (event.keyCode == 13) {
      var currentQuery = $(this).val();
      if (currentQuery.length) docsSearch(currentQuery);
    }
  });

  searchButton.on("click", function () {
    var currentQuery = $(this).siblings(searchInput).val();
    if (currentQuery.length) docsSearch(currentQuery);
  });

  /* START: CLOSE ARTICLE AND GET BACK TO PREVIOUS SCREEN */
  $(dotb + '__article-close').on("click", function () {
    if (articleHistory.length <= 1) {
      closeArticle();
      articleHistory = [];
    } else {
      var prevArticle = articleHistory[articleHistory.length - 2];
      articleHistory.splice(articleHistory.length - 1, 1);
      renderArticle(prevArticle, false, true);
    }
  });
  /* END: CLOSE ARTICLE AND GET BACK TO PREVIOUS SCREEN */
  var getMenuURL = docsURL + 'wp-json/flo_api/v1/menus/?slug=' + themeSlug;
  var menuObj = "";
  // fetch(getMenuURL).then((response) => {
  //   response.json().then((responseJSON) => {
  //
  //     if(responseJSON.length) {
  //
  //       menuObj = responseJSON;
  //       let menuWrap = popup.querySelector(`${dotb}__all-articles-menu`);
  //       menuWrap.innerHTML = menuObj;
  //
  //       /* START: DROPDOWN TOGGLES */
  //         let menuItemWithDropdown = $(`${dotb} .menu .menu-item-has-children > a`);
  //         menuItemWithDropdown.on('click', function(event) {
  //           event.preventDefault();
  //           let subMenu = $(this).siblings('.sub-menu');
  //           subMenu.slideToggle('350', function() {
  //             let childrenSubMenus = $(this).find('.submenu-open > .sub-menu');
  //             childrenSubMenus.each(function() {
  //               $(this).hide();
  //               $(this).parent().removeClass('submenu-open');
  //             });
  //           });
  //           $(this).parent().toggleClass('submenu-open');
  //         });
  //       /* END: DROPDOWN TOGGLES */
  //
  //       /* START: ARTICLES WITHIN POPUP */
  //         let articleLink = $(`${dotb} .menu .menu-item:not(.menu-item-has-children) > a`);
  //         articleLink.on('click', function(event) {
  //           event.preventDefault();
  //           let articleURL = $(this).attr('href');
  //           $(this).append(`<div class="flo-dual-ring"></div>`);
  //           fetchAndRenderArticle(articleURL, true);
  //         });
  //       /* END: ARTICLES WITHIN POPUP */
  //     }
  //   });
  // });

  $.get(getMenuURL, function (responseJSON) {
    if (responseJSON.length) {
      menuObj = responseJSON;
      var menuWrap = popup.querySelector(dotb + '__all-articles-menu');
      menuWrap.innerHTML = menuObj;

      /* START: DROPDOWN TOGGLES */
      var menuItemWithDropdown = $(dotb + ' .menu .menu-item-has-children > a');
      menuItemWithDropdown.on("click", function (event) {
        event.preventDefault();
        var subMenu = $(this).siblings(".sub-menu");
        subMenu.slideToggle("350", function () {
          var childrenSubMenus = $(this).find(".submenu-open > .sub-menu");
          childrenSubMenus.each(function () {
            $(this).hide();
            $(this).parent().removeClass("submenu-open");
          });
        });
        $(this).parent().toggleClass("submenu-open");
      });
      /* END: DROPDOWN TOGGLES */

      /* START: ARTICLES WITHIN POPUP */
      var articleLink = $(dotb + ' .menu .menu-item:not(.menu-item-has-children) > a');
      articleLink.on("click", function (event) {
        event.preventDefault();
        var articleURL = $(this).attr("href");
        $(this).append('<div class="flo-dual-ring"></div>');
        fetchAndRenderArticle(articleURL, true);
      });
      /* END: ARTICLES WITHIN POPUP */
    }
  });

  /* START: pull recommended resources */

  function fetchRecommended() {
    var currentRecommendedArticles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    // use ids and fetch, since menu item ids are different from theme to theme
    var allItemIds = currentRecommendedArticles.join(",");
    var fetchURL = docsURL + 'wp-json/flo_api/v1/posts/?ids=' + allItemIds + '&posts_per_page=' + currentRecommendedArticles.length;

    fetch(fetchURL).then(function (response) {
      response.json().then(function (responseJSON) {
        // sort response so that items are in the same order as specified in the original array
        responseJSON.sort(function (a, b) {
          var aIndex = currentRecommendedArticles.indexOf(a.post_id);
          var bIndex = currentRecommendedArticles.indexOf(b.post_id);

          if (aIndex > bIndex) return 1;
          if (bIndex > aIndex) return -1;
        });

        responseJSON.forEach(function (recommendedItem) {
          // strip html tags from text content and get only first 150 characters
          var recommendedItemExcerptText = "";
          if (recommendedItem.text_content.length > 0) {
            recommendedItemExcerptText = textify(recommendedItem.text_content).length > 150 ? textify(recommendedItem.text_content).slice(0, 150) + "..." : textify(recommendedItem.text_content);
          } else if (recommendedItem.acf.sections && recommendedItem.acf.sections[0].content.length > 0) {
            recommendedItemExcerptText = textify(recommendedItem.acf.sections[0].content).length > 150 ? textify(recommendedItem.acf.sections[0].content).slice(0, 150) + "..." : textify(recommendedItem.acf.sections[0].content);
          }

          var recommendedMenuItem = document.createElement("li");
          recommendedMenuItem.className = b + '__recommended-menu-item ' + b + '__recommended-menu-item--' + recommendedItem.post_id;

          recommendedMenuItem.innerHTML = '<span class="' + b + '__recommended-menu-item--title">' + recommendedItem.post_title + '</span>';
          if (recommendedItemExcerptText.length > 0) recommendedMenuItem.innerHTML += '<span class="' + b + '__recommended-menu-item--excerpt">' + recommendedItemExcerptText + '</span>';
          recommendedMenuItem.innerHTML += '<i class="' + b + '-icon-arrow-right ' + b + '__recommended-menu-item--icon"></i>';

          $(dotb + '__recommended-articles--items').append($(recommendedMenuItem));

          recommendedMenuItem.addEventListener("click", function () {
            var index = $(this).index();
            var articleToRender = responseJSON[index];
            renderArticle(articleToRender, true);
          });
        });

        $(dotb + '__recommended-loading').fadeOut("fast", function () {
          $(dotb + '__recommended-loading').remove();
          $(dotb + '__recommended-articles--items').fadeIn("fast");
        });
      });
    });
  }

  // the var below will be the page type where the user currently is at.
  // we'll have a conditional article list to provide depending on the location: (check recommendedItemIdsList variable)
  var currentViewArticles = recognizeDashboardView();
  fetchRecommended(currentViewArticles);

  /* END: pull recommended resources */

  function handleArticleLinkClick(e, link) {
    e.preventDefault();
    if (link.hasAttribute("href") && link.attributes.href.value.length) {
      var parentArticleWrap = e.target.closest(dotb + '__single-article-wrap');
      parentArticleWrap.querySelector(dotb + '__article-wrap--content').style.opacity = "0.3";
      parentArticleWrap.querySelector(dotb + '__article-wrap--content').style.pointerEvents = "none";
      fetchAndRenderArticle(link.attributes.href.value);
    }
  }

  function handleBreadcrumbClick(e) {
    var breadcrumb = e.target;
    var breadcrumbIndex = breadcrumb.attributes["data-index"].value;
    var articleToRender = articleHistory[breadcrumbIndex];
    breadcrumbIndex++;
    var newHistory = articleHistory.slice(0, breadcrumbIndex);
    articleHistory = newHistory;
    renderArticle(articleToRender, false, true);
  }

  // articleToRender -  parameter represents the post object received from the server
  // clearHistory - if the post is accessed from a main window, breadcrumbs need to be cleared
  // skipHistory - there are cases when we don't need to push items to breadcrumbs, so we skip this via this parameter passed as a boolean true value
  function renderArticle(articleToRender) {
    var clearHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var skipHistory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var articleWrap = $(dotb + '__single-article-wrap');
    articleWrap.find(dotb + '__article-wrap--content').remove();

    var articleURL = '' + docsURL + themeSlug + '/#' + articleToRender.slug;

    var articleContent = document.createElement("div");
    articleContent.className = b + '__article-wrap--content';
    articleContent.innerHTML = '\n        <h2 class="' + b + '__article-wrap--title">' + articleToRender.post_title + '</h2>\n        <a href="' + articleURL + '" title="Open in new tab" target="_blank" class="' + b + '__article-wrap--direct-link">\n          <i class="flo-support-icon-link"></i>\n        </a>\n        <div class="' + b + '__article-wrap--text">\n          <div class="' + b + '__article-wrap--wp-content">\n            ' + articleToRender.text_content + '\n          </div>\n          <div class="' + b + '__article-wrap--sections"></div>\n        </div>\n      ';

    var articleSections = articleToRender.acf.sections;

    if (articleSections && articleSections.length) {
      var articleSectionsWrap = articleContent.querySelector(dotb + '__article-wrap--sections');
      articleSections.forEach(function (articleSection) {
        var sectionTitle = document.createElement("h2");
        sectionTitle.className = b + '__article-section-title';
        sectionTitle.innerHTML = articleSection.title;
        articleSectionsWrap.appendChild(sectionTitle);

        var sectionContent = document.createElement("div");
        sectionContent.className = b + '__article-section-content';
        sectionContent.innerHTML = articleSection.content;
        articleSectionsWrap.appendChild(sectionContent);
      });
    }

    if (clearHistory) articleHistory = [];
    if (!skipHistory) articleHistory.push(articleToRender);

    var breadcrumbsWrap = popup.querySelector(dotb + '__breadcrumbs-wrap');
    breadcrumbsWrap.innerHTML = "";

    // add the breadcrumbs
    articleHistory.forEach(function (postFromHistory, index) {
      if (index !== 0 && index <= articleHistory.length - 1) breadcrumbsWrap.innerHTML += '<div class="' + b + '__breadcrumb-delimiter">/</div>';
      breadcrumbsWrap.innerHTML += '\n          <div data-index="' + index + '" class="' + b + '__breadcrumb">\n            ' + postFromHistory.post_title + '\n          </div>\n        ';
    });

    var breadcrumbLinks = breadcrumbsWrap.querySelectorAll(dotb + '__breadcrumb:not(:last-child)');
    breadcrumbLinks.forEach(function (breadcrumb) {
      return breadcrumb.addEventListener("click", handleBreadcrumbClick);
    });

    var articleContentTextWrap = articleContent.querySelector(dotb + '__article-wrap--text');
    var articleContentLinks = articleContentTextWrap.querySelectorAll("a");

    articleContentLinks.forEach(function (articleContentLink) {
      var articleLinkHref = "";
      var linkToDocs = false;
      if (articleContentLink.attributes.href) {
        articleLinkHref = articleContentLink.attributes.href.value;
        if (articleLinkHref.includes("/#") && articleLinkHref.includes("docs") && articleLinkHref.includes("flothemes")) linkToDocs = true;
      }

      if (articleLinkHref.length && linkToDocs) articleContentLink.classList.add(b + '__nav-within-popup');
    });

    var linksForInternalNavigation = articleContentTextWrap.querySelectorAll(dotb + '__nav-within-popup');
    [].concat(_toConsumableArray(linksForInternalNavigation)).forEach(function (link) {
      return link.addEventListener("click", function (event) {
        return handleArticleLinkClick(event, link);
      });
    });

    articleWrap.append(articleContent);
    openArticle();
  }

  function fetchAndRenderArticle(url) {
    var clearHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var articleURL = url.replace(/\/$/, "");
    articleURL = articleURL.replace("#", "");
    var articleSlug = articleURL.substr(articleURL.lastIndexOf("/") + 1);
    var fetchPostURL = docsURL + 'wp-json/flo_api/v1/posts/?slug=' + articleSlug;

    fetch(fetchPostURL).then(function (response) {
      response.json().then(function (responseJSON) {
        if (responseJSON && responseJSON.length) {
          renderArticle(responseJSON[0], clearHistory);
          $('.flo-dual-ring').remove();
        } else {
          // TODO
          var noticeWrap = document.querySelector(dotb + '__notice-wrap');
          noticeWrap.innerHTML = "Oops, the resource you requested could not be found";
          $(noticeWrap).fadeIn("fast", function () {
            $(dotb + '__article-wrap--content').css({
              opacity: "1",
              "pointer-events": "auto"
            });

            setTimeout(function () {
              $(noticeWrap).fadeOut("fast");
            }, 1500);
          });
        }
      });
    });
  }

  function openArticle() {
    $(dotb + '__active-tab:not(' + dotb + '__single-article-wrap)').addClass(b + '__previously-active-tab').removeClass(b + '__active-tab');
    $(dotb + '__single-article-wrap').addClass(b + '__active-tab');
  }

  function closeArticle() {
    $(dotb + '__single-article-wrap').removeClass(b + '__active-tab');
    $(dotb + '__previously-active-tab').addClass(b + '__active-tab').removeClass(b + '__previously-active-tab');
  }

  /* END: CREATING POPUP MARKUP */

  var $popup = $(popup);
  popupTrigger.on("click", function () {
    $popup.addClass(b + '__popup-visible');

    if ($popup.find(hsTab).find("#hs-beacon").length === 0) {
      /* START: INIT HS BEACON */

      // initialize ONLY after moving the beacon wrap where necessary (in the popup)
      hsTab.append($("#hs-beacon"));
      HS.beacon.init();

      setTimeout(function () {
        HS.beacon.ready(function () {
          this.open();

          setTimeout(function () {
            var beaconIframe = document.getElementById("hs-beacon").getElementsByTagName("iframe")[0],
                doc = beaconIframe.contentDocument || beaconIframe.contentWindow;
            if (doc.document) doc = doc.document;

            var _timer = setInterval(function () {
              if (doc.readyState == "complete") {
                clearInterval(_timer);

                setTimeout(function () {
                  var beaconIframeContents = beaconIframe.contentDocument.body;
                  var beaconIframeHeadTag = beaconIframe.contentDocument.head;
                  var styleTagForBeacon = document.querySelector(".flo-beacon-styles");

                  var instructionsHTML = document.createElement("div");
                  instructionsHTML.className = "flo-ticket-header";
                  instructionsHTML.innerHTML = '\n                      <span class="submit-ticket-title">Contact Customer Care</span>\n                      <span class="submit-ticket-subtitle">If you cannot find answers to your questions within the documentation, feel free to contact us and we will get back to you as soon as possible.</span>\n                    ';

                  var fileUploadIcon = document.createElement("i");
                  fileUploadIcon.className = b + '-icon-file';
                  var fileUploadTrigger = beaconIframeContents.querySelector(".contact--submit");

                  var hsSuccessIcon = beaconIframeContents.querySelector(".contact-success--icon");
                  $(hsSuccessIcon).remove();

                  var successMessageWrap = beaconIframeContents.querySelector(".contact-success");
                  successMessageWrap.innerHTML = '\n                      <i class="' + b + '-icon-mail-sent"></i>\n                      <span class="' + b + '__contact-success--title">Message Sent</span>\n                      <span class="' + b + '__contact-success--description">Send us a message and read our answer when it\u2019s convenient for you</span>\n                      <a href="https://docs.flothemes.com/" target="_blank" class="' + b + '__contact-success--docs-button">View Docs</a>\n                    ';
                  var instructionsWrap = beaconIframeContents.querySelector(".contact--instructions");

                  beaconIframeHeadTag.appendChild(styleTagForBeacon);
                  instructionsWrap.appendChild(instructionsHTML);
                  fileUploadTrigger.prepend(fileUploadIcon);

                  var userData = {};
                  if (useTechnicalData) {
                    userData = JSON.parse(flo_support_user_data);
                  } else {
                    userData.nodata = "Additional information unavailable.";
                  }
                  HS.beacon.identify(userData);

                  /* START: IMGUR UPLOADER */
                  var fileUploadActions = beaconIframeContents.getElementsByClassName("contact--attach");
                  var fileRemoveAction = fileUploadActions[0];
                  var fileAddAction = fileUploadActions[1];

                  var submitActionsWrap = beaconIframeContents.getElementsByClassName("contact--submit")[0];

                  var floFileInput = document.getElementById("flo-support__imgur-uploader");
                  floFileInput.addEventListener("change", function (event) {
                    return processImgurFiles(event.target, userData, submitActionsWrap);
                  });

                  fileAddAction.addEventListener("click", function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(floFileInput).trigger("click");
                  });
                  /* END: IMGUR UPLOADER */
                });
              }
            }, 1000);
          });
        });
      }, 10);

      /* END: INIT HS BEACON */
    }
  });

  $(dotb + '__close-trigger').on("click", function () {
    $popup.removeClass(b + '__popup-visible');
    if ($("body").css("position") == "fixed" && $(window).width() < 768) $("body").css("position", "");
  });

  /* START: DEV: OPEN POPUP AND SEARCH ON PAGE LOAD */
  // popupTrigger.trigger("click");
  // $(`${dotb}__tab-switch--hs`).trigger('click');
  // let qqq = "page builder components";
  // $popup.find(".flo-support__search-input").val(qqq);
  // $popup.find(".flo-support__search-button").trigger("click");
  /* END: DEV: OPEN POPUP AND SEARCH ON PAGE LOAD */
});

function recognizeDashboardView() {

  var recommendedItemIdsList = {

    'default': [5244, // 'activating-a-theme'
    5264, // 'how-to-update-a-flotheme'
    5294, // 'installing-plugin-wp-plugins-directory'
    5307, // 'creating-a-menu'
    5477, // 'social-media-management'
    6462],

    'flotheme': [10562, // 'getting-started-from-scratch'
    5346, // 'how-to-import-demo-content'
    5517, // 'adding-google-analytics-to-my-website'
    5513, // 'how-to-add-a-favicon'
    5454, // 'font-styles-management'
    6090, // 'desktop-header-components'
    5404, // 'global-header-layout'
    5360, // 'mobile-header-popup-layout'
    5563, // 'pages-settings'
    5477, // 'social-media-management'
    5425, // 'footer-sections-overview'
    5426, // 'footer-sections-re-ordering'
    5428, // 'hiding-disabling-footer-sections'
    5433, // 'global-footer-layout'
    5460, // 'what-is-a-style-kit'
    5461],

    'dashboard': [10562, // 'getting-started-from-scratch'
    5346, // 'how-to-import-demo-content'
    5255, // 'switching-another-flotheme'
    5307, // 'creating-a-menu'
    10544, // 'creating-a-page'
    10525],

    'slideshow': [5555, // 'managing-slideshows'
    4105, // 'flothemes-image-sizes'
    6157, // 'changing-header-color-slideshows'
    6340, // 'what-is-a-page-builder'
    5541],

    'gallery': [6258, // 'what-is-a-gallery'
    5617, // 'how-to-create-a-gallery'
    4105, // 'flothemes-image-sizes'
    6269, // 'gallery-image-uploader'
    5624, // 'managing-global-gallery-layout'
    5626, // 'custom-gallery-layout'
    5560, // 'portfolio-page'
    5618, // 'change-parent-slug-galleries'
    6267],

    'post': [10525, // 'creating-blog-post'
    5588, // 'uploading-images-post-contents'
    5603, // 'managing-global-post-layout'
    5605, // 'managing-custom-post-layout'
    6385, // 'listing-page'
    5559],

    'video': [10476, // 'what-is-a-video-post'
    10481, // 'how-to-create-a-video-post'
    10499, // 'global-video-post-settings'
    5603, // 'managing-global-post-layout'
    5605, // 'managing-custom-post-layout'
    10490, // 'custom-video-post'
    10494],

    'media': [4105, // 'flothemes-image-sizes'
    5588, // 'uploading-images-post-contents'
    5328, // 'changing-image-sizes'
    5330, // 'using-regenerate-thumbnails-plugins'
    5329],

    'page': [10544, // 'creating-a-page'
    5541, // 'building-a-page-from-scratch'
    6340, // 'what-is-a-page-builder'
    5540, // 'page-builder-components'
    5539, // 'page-builder-in-page-templates'
    5405, // 'custom-header-layout'
    5434, // 'custom-footer-layout'
    5545, // 'what-is-a-content-block'
    4105],

    'comments': [5597, // 'wordpress-comments'
    5598, // 'facebook-comments'
    5604],

    'flo-forms': [6400, // 'flo-forms'
    1913],

    'themes': [5236, // 'how-to-download-a-theme'
    5247, // 'uploading-a-theme-via-dashboard'
    5246, // 'manual-upload-via-ftp-file-manager'
    5244, // 'activating-a-theme'
    5264, // 'how-to-update-a-flotheme'
    5265, // 'manual-flotheme-update-via-ftp'
    5270, // 'how-to-delete-a-theme'
    5274, // 'customize-via-child-theme'
    5273, // 'download-install-a-child-theme'
    5271],

    'widgets': [6306, // 'what-is-a-sidebar'
    6313, // 'create-new-sidebar'
    5500, // 'adding-content-to-sidebars'
    5499, // 'adding-sidebars-to-a-page'
    8415, // 'widgets-in-footer'
    5501],

    'menus': [5307, // 'creating-a-menu'
    5311, // 'custom-url-menu-items'
    5310, // 'non-clickable-menu-items'
    5309, // 'adding-galleries-menu'
    5308, // 'make-menu-item-open-new-tab'
    5312, // 'assigning-menus-main-footer-etc'
    6156],

    'plugins': [5294, // 'installing-plugin-wp-plugins-directory'
    5293, // 'installing-plugin-zip-file'
    5302, // 'removing-renaming-plugins-via-file-manager-ftp'
    5295, // 'updating-plugins-importance-updates'
    6400, // 'flo-forms'
    5300, // 'floinstagram'
    5654, // 'where-to-download'
    5655, // 'how-to-upload-flolaunch'
    5653],

    'users': [5324, // 'create-temporary-administrator'
    5668],

    'tools': [5357, // 'importing-exporting-your-content-using-wordpress-importer'
    5349, // 'troubleshooting-wordpress-importer'
    5667],

    'settings-general': [5321, // 'site-title-tagline'
    5323],

    'settings-writing': [5325],

    'settings-reading': [5326, // 'settings-%e2%86%92-reading'
    5559, // 'blog-posts-page'
    6462],

    'settings-discussion': [5597, // 'wordpress-comments'
    5623],

    'settings-media': [5328, // 'changing-image-sizes'
    5330],

    'settings-permalinks': [10587, // 'setting-up-permalinks'
    4164, // 'changing-permalinks'
    5589],

    'flo-instagram': [5300, // 'floinstagram'
    5429, // 'adding-instagram-feed-footer'
    8415],

    'flo-hub': [5014, // 'flohub-installing-flohub'
    5017, // 'flohub-update-plugin'
    5015, // 'flohub-general-settings'
    5012, // 'flohub-pricelist-overview'
    5023, // 'flohub-new-pricelist'
    5013, // 'flohub-making-first-pricelist'
    5016, // 'flohub-using-templates'
    5025, // 'flohub-using-content-blocks'
    5024, // 'flohub-using-package-blocks'
    5018, // 'flohub-pricelist-settings'
    5022, // 'flohub-messages-integrations'
    5021, // 'flohub-adding-custom-fonts'
    5020, // 'flohub-translating-pricelists'
    5019]

  };

  var currentView = 'default';
  var currentPath = document.location.pathname;
  var currentPathArr = currentPath.split('/');
  // find the slug that goes directly after 'wp-admin'. that will help us figure out where in the dashboard the user is currently located
  var indexOfWPAdmin = currentPathArr.indexOf('wp-admin');
  var label = '';

  if ((currentPathArr[indexOfWPAdmin + 1] == "" || currentPathArr[indexOfWPAdmin + 1] == 'index.php') && $('body').hasClass('index-php')) {
    currentView = 'dashboard';
    label = 'Dashboard';
  }
  // start: post types
  else if ($('body').hasClass('post-type-slideshow')) {
      currentView = 'slideshow';
      label = 'Slideshows';
    } else if ($('body').hasClass('post-type-gallery')) {
      currentView = 'gallery';
      label = 'Galleries';
    } else if ($('body').hasClass('post-type-post')) {
      currentView = 'post';
      label = 'Posts';
    } else if ($('body').hasClass('post-type-video')) {
      currentView = 'video';
      label = 'Videos';
    } else if ($('body').hasClass('post-type-attachment')) {
      currentView = 'media';
      label = 'Media';
    } else if ($('body').hasClass('post-type-page')) {
      currentView = 'page';
      label = 'Pages';
    }
    // end: post types

    else if ($('body').hasClass('comment-php') || $('body').hasClass('edit-comments-php')) {
        currentView = 'comments';
        label = 'Comments';
      } else if ($('body').hasClass('post-type-flo_forms') || adminpage && adminpage == 'toplevel_page_flo_forms_settings') {
        currentView = 'flo-forms';
        label = 'FloForms';
      } else if ($('body').hasClass('themes-php') || $('body').hasClass('theme-editor-php')) {
        currentView = 'themes';
        label = 'Themes';
      } else if ($('body').hasClass('nav-menus-php')) {
        currentView = 'menus';
        label = '';
      } else if ($('body').hasClass('widgets-php')) {
        currentView = 'widgets';
        label = 'Widgets';
      } else if ($('body').hasClass('plugins-php') || $('body').hasClass('plugin-install-php') || $('body').hasClass('plugin-editor-php')) {
        currentView = 'plugins';
        label = 'Plugins';
      } else if ($('body').hasClass('users-php') || $('body').hasClass('user-new-php') || $('body').hasClass('profile-php')) {
        currentView = 'users';
        label = 'Users';
      }
      // wp tools tab
      else if ($('body').hasClass('import-php') || $('body').hasClass('export-php')) {
          currentView = 'tools';
          label = 'Tools';
        }

        // start: wp settings tab
        else if ($('body').hasClass('options-general-php')) {
            currentView = 'settings-general';
            label = 'General Settings';
          } else if ($('body').hasClass('options-writing-php')) {
            currentView = 'settings-writing';
            label = 'Writing Settings';
          } else if ($('body').hasClass('options-reading-php')) {
            currentView = 'settings-reading';
            label = 'Reading Settings';
          } else if ($('body').hasClass('options-discussion-php')) {
            currentView = 'settings-discussion';
            label = 'Discussion Settings';
          } else if ($('body').hasClass('options-media-php')) {
            currentView = 'settings-media';
            label = 'Media Settings';
          } else if ($('body').hasClass('options-permalink-php')) {
            currentView = 'settings-permalinks';
            label = 'Permalink Settings';
          }
          // end: wp settings tab

          else if ($('body').hasClass('toplevel_page_flo_instagram')) {
              currentView = 'flo-instagram';
              label = 'FloInstagram';
            } else if (adminpage && (adminpage.includes('flotheme_page_acf') || adminpage == 'toplevel_page_theme-general-settings')) {
              currentView = 'flotheme';
              label = 'FloThemes Settings Page';
            } else if (adminpage && adminpage.includes('flopricing')) {
              currentView = 'flo-hub';
              label = 'FloHub';
            }

  if (recommendedItemIdsList[currentView]) {
    if ($('.flo-support__recommended-articles--title').length && currentView != 'default') {
      $('.flo-support__recommended-articles--title')[0].innerHTML += ' for "' + label + '"';
    }
    return recommendedItemIdsList[currentView];
  } else {
    return recommendedItemIdsList['default'];
  }
}})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJlYWNvbi1pbWFnZS11cGxvYWRlci5qcyIsImJldGEtbG9nLmpzIiwiaGVscHNjb3V0LWJlYWNvbi1jb25maWcuanMiLCJwb3B1cC5tYWluLmpzIiwicmVjb21tZW5kZWQtYXJ0aWNsZXMuanMiXSwibmFtZXMiOlsicHJvY2Vzc0ltZ3VyRmlsZXMiLCJlbHQiLCJkYXRhIiwidmlzdWFsRmVlZGJhY2siLCJmaWxlcyIsImxlbmd0aCIsImFwaVVSTCIsImFwaUtleSIsImZvcm1EYXRhIiwidXBsb2FkZWRBbW91bnQiLCJhbGxJbWd1ckxpbmtzIiwic2V0dGluZ3MiLCJhc3luYyIsImNyb3NzRG9tYWluIiwicHJvY2Vzc0RhdGEiLCJjb250ZW50VHlwZSIsInR5cGUiLCJ1cmwiLCJoZWFkZXJzIiwiQXV0aG9yaXphdGlvbiIsIkFjY2VwdCIsIm1pbWVUeXBlIiwiJCIsImNzcyIsImZpbmQiLCJ0ZXh0IiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbCIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiZmlsZSIsImdldCIsImRvbmUiLCJyZXNwb25zZUpTT04iLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZSIsInN1Y2Nlc3MiLCJwdXNoIiwibGluayIsImxpbmtzVG9TdHJpbmdzIiwiam9pbiIsImF0dGFjaG1lbnRzIiwiSFMiLCJiZWFjb24iLCJpZGVudGlmeSIsIkJldGFMb2ciLCJhcHBDb25maWciLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJwcm9qZWN0SWQiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJkb2NzQXBwIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwidGVybSIsInRlcm1JRCIsInBhZ2VOb3ciLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiZGF0YWJhc2UiLCJyZWYiLCJzZXQiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJlIiwibyIsIm4iLCJIU0NXIiwidCIsInVzZXJDb25maWciLCJyZWFkeVF1ZXVlIiwiY29uZmlnIiwicmVhZHkiLCJkb2NzIiwiZW5hYmxlZCIsImJhc2VVcmwiLCJjb250YWN0IiwiZm9ybUlkIiwiciIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwiYyIsImNyZWF0ZUVsZW1lbnQiLCJzcmMiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiZG9jdW1lbnQiLCJtb2RhbCIsImNvbG9yIiwiaWNvbiIsInBvd2VyZWRCeSIsInNob3dOYW1lIiwic2hvd1N1YmplY3QiLCJ6SW5kZXgiLCJ0b3BBcnRpY2xlcyIsImF1dG9Jbml0IiwiYXR0YWNobWVudCIsImluc3RydWN0aW9ucyIsInRyYW5zbGF0aW9uIiwidG9waWNMYWJlbCIsImNvbnRhY3RMYWJlbCIsInNlbmRMYWJlbCIsInRvcGljcyIsInZhbCIsImxhYmVsIiwib24iLCJiIiwiZG90YiIsImFuYWx5dGljc0NoZWNrYm94IiwiZ2V0RWxlbWVudEJ5SWQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJ0YXJnZXQiLCJjaGVja2VkIiwidmFsdWUiLCJwb3B1cFRyaWdnZXIiLCJ0aGVtZVNsdWciLCJhdHRyIiwiZG9jc1VSTCIsInVzZVRlY2huaWNhbERhdGEiLCJhcnRpY2xlSGlzdG9yeSIsIm9taXREaWN0aW9uYXJ5IiwiY2xlYW5pZnlRdWVyeSIsInN0ciIsIndvcmRzIiwidG9rZW5pemUiLCJmaWx0ZXIiLCJpbmRleE9mIiwidGV4dGlmeSIsImh0bWwiLCJ0bXAiLCJyZXBsYWNlIiwiaW5uZXJIVE1MIiwidGV4dENvbnRlbnQiLCJpbm5lclRleHQiLCJzcGxpdCIsImNvbXBhcmVUd29UZXh0cyIsImFycjEiLCJhcnIyIiwibWF0Y2hlcyIsImUxIiwidG9Mb3dlckNhc2UiLCJlMiIsImNvdW50V29yZHMiLCJ3b3Jkc1RvQ291bnQiLCJ3b3JkTGlzdCIsIm9jY3VycmVuY2VzIiwid29yZFRvQ291bnQiLCJ3b3JkIiwicG9wdXAiLCJjbGFzc05hbWUiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJzZWFyY2hJbnB1dCIsInNlYXJjaEJ1dHRvbiIsInNlYXJjaFJlc3VsdHNXcmFwIiwicmVjb21tZW5kZWRBcnRpY2xlc1dyYXAiLCJkb2NzVGFiVHJpZ2dlciIsImRvY3NUYWIiLCJoc1RhYlRyaWdnZXIiLCJoc1RhYiIsInNlYXJjaFRhYlRyaWdnZXIiLCJzZWFyY2hUYWIiLCJiZXRhTG9nIiwibG9hZCIsIm9uZSIsInJlbW92ZUNsYXNzIiwic2V0VGltZW91dCIsInJlbW92ZSIsImRvY3NTZWFyY2giLCJzZWFyY2hRIiwid3JpdGUiLCJEYXRlIiwiZ2V0VGltZSIsImNsZWFuUXVlcnkiLCJSaVRhIiwic3RlbSIsInF1ZXJ5QXJyYXkiLCJwYXJzZWRTdHIiLCJlbmNvZGVVUklDb21wb25lbnQiLCJ1cmxQYXJhbXMiLCJmZXRjaCIsInRoZW4iLCJqc29uIiwiZmFkZU91dCIsInJlc3VsdHNKU09OIiwiZmlyc3QiLCJzZWNvbmQiLCJ0aGlyZCIsImZvdXJ0aCIsImZpZnRoIiwicmVzdWx0IiwiaW5kZXgiLCJwb3N0VGl0bGUiLCJwb3N0X3RpdGxlIiwicG9zdENvbnRlbnQiLCJ0ZXh0X2NvbnRlbnQiLCJwb3N0U2VjdGlvbnMiLCJhY2YiLCJzZWN0aW9ucyIsInBvc3RTZWN0aW9uc0NvbnRlbnQiLCJzZWN0aW9uIiwiY29udGVudCIsInBvc3RDb250ZW50UGxhaW5UZXh0IiwicG9zdEV4Y2VycHQiLCJzbGljZSIsImV4Y2VycHQiLCJwb3N0VGl0bGVTdGVtbWVkIiwicG9zdFRpdGxlU3RlbW1lZFRva2VucyIsImtleUlzSW5TdHJpbmciLCJjdXJyZW50VmFsdWUiLCJpbmNsdWRlcyIsInJlbGV2YW5jZV9zY29yZSIsImV2ZXJ5Iiwic29tZSIsInN1YnN0cmluZyIsInRpdGxlTWF0Y2hDb3VudCIsIndvcmRDb3VudCIsIndvcmRDb3VudFN1bSIsIk9iamVjdCIsInZhbHVlcyIsIndvcmRDb3VudFZhbHVlIiwid29yZENvdW50TWVhbiIsIm51bSIsIk51bWJlciIsInJvdW5kU3RyaW5nIiwidG9GaXhlZCIsInJvdW5kV29yZENvdW50TWVhbiIsIndvcmRfY291bnQiLCJ3b3JkQ291bnRTY29yZSIsInNvcnQiLCJhIiwic29ydGVkUmVzdWx0c0pTT04iLCJjb25jYXQiLCJpdGVtVXJsIiwic2x1ZyIsInNlYXJjaFJlc3VsdEV4Y2VycHRXcmFwIiwic2VhcmNoUmVzdWx0TGluayIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0SW5kZXgiLCJwYXJlbnRzIiwiYXJ0aWNsZVRvUmVuZGVyIiwicmVuZGVyQXJ0aWNsZSIsImZhZGVJbiIsInRhYlRvU2hvdyIsImFkZENsYXNzIiwia2V5Q29kZSIsImN1cnJlbnRRdWVyeSIsInNpYmxpbmdzIiwiY2xvc2VBcnRpY2xlIiwicHJldkFydGljbGUiLCJzcGxpY2UiLCJnZXRNZW51VVJMIiwibWVudU9iaiIsIm1lbnVXcmFwIiwicXVlcnlTZWxlY3RvciIsIm1lbnVJdGVtV2l0aERyb3Bkb3duIiwic3ViTWVudSIsInNsaWRlVG9nZ2xlIiwiY2hpbGRyZW5TdWJNZW51cyIsImVhY2giLCJoaWRlIiwicGFyZW50IiwidG9nZ2xlQ2xhc3MiLCJhcnRpY2xlTGluayIsImFydGljbGVVUkwiLCJmZXRjaEFuZFJlbmRlckFydGljbGUiLCJmZXRjaFJlY29tbWVuZGVkIiwiY3VycmVudFJlY29tbWVuZGVkQXJ0aWNsZXMiLCJhbGxJdGVtSWRzIiwiZmV0Y2hVUkwiLCJhSW5kZXgiLCJwb3N0X2lkIiwiYkluZGV4IiwicmVjb21tZW5kZWRJdGVtRXhjZXJwdFRleHQiLCJyZWNvbW1lbmRlZEl0ZW0iLCJyZWNvbW1lbmRlZE1lbnVJdGVtIiwiY3VycmVudFZpZXdBcnRpY2xlcyIsInJlY29nbml6ZURhc2hib2FyZFZpZXciLCJoYW5kbGVBcnRpY2xlTGlua0NsaWNrIiwiaGFzQXR0cmlidXRlIiwiYXR0cmlidXRlcyIsImhyZWYiLCJwYXJlbnRBcnRpY2xlV3JhcCIsImNsb3Nlc3QiLCJzdHlsZSIsIm9wYWNpdHkiLCJwb2ludGVyRXZlbnRzIiwiaGFuZGxlQnJlYWRjcnVtYkNsaWNrIiwiYnJlYWRjcnVtYiIsImJyZWFkY3J1bWJJbmRleCIsIm5ld0hpc3RvcnkiLCJjbGVhckhpc3RvcnkiLCJza2lwSGlzdG9yeSIsImFydGljbGVXcmFwIiwiYXJ0aWNsZUNvbnRlbnQiLCJhcnRpY2xlU2VjdGlvbnMiLCJhcnRpY2xlU2VjdGlvbnNXcmFwIiwic2VjdGlvblRpdGxlIiwiYXJ0aWNsZVNlY3Rpb24iLCJ0aXRsZSIsInNlY3Rpb25Db250ZW50IiwiYnJlYWRjcnVtYnNXcmFwIiwicG9zdEZyb21IaXN0b3J5IiwiYnJlYWRjcnVtYkxpbmtzIiwicXVlcnlTZWxlY3RvckFsbCIsImFydGljbGVDb250ZW50VGV4dFdyYXAiLCJhcnRpY2xlQ29udGVudExpbmtzIiwiYXJ0aWNsZUxpbmtIcmVmIiwibGlua1RvRG9jcyIsImFydGljbGVDb250ZW50TGluayIsImNsYXNzTGlzdCIsImFkZCIsImxpbmtzRm9ySW50ZXJuYWxOYXZpZ2F0aW9uIiwib3BlbkFydGljbGUiLCJhcnRpY2xlU2x1ZyIsInN1YnN0ciIsImxhc3RJbmRleE9mIiwiZmV0Y2hQb3N0VVJMIiwibm90aWNlV3JhcCIsIiRwb3B1cCIsImluaXQiLCJvcGVuIiwiYmVhY29uSWZyYW1lIiwiZG9jIiwiY29udGVudERvY3VtZW50IiwiY29udGVudFdpbmRvdyIsIl90aW1lciIsInNldEludGVydmFsIiwicmVhZHlTdGF0ZSIsImNsZWFySW50ZXJ2YWwiLCJiZWFjb25JZnJhbWVDb250ZW50cyIsImJlYWNvbklmcmFtZUhlYWRUYWciLCJoZWFkIiwic3R5bGVUYWdGb3JCZWFjb24iLCJpbnN0cnVjdGlvbnNIVE1MIiwiZmlsZVVwbG9hZEljb24iLCJmaWxlVXBsb2FkVHJpZ2dlciIsImhzU3VjY2Vzc0ljb24iLCJzdWNjZXNzTWVzc2FnZVdyYXAiLCJpbnN0cnVjdGlvbnNXcmFwIiwicHJlcGVuZCIsInVzZXJEYXRhIiwiZmxvX3N1cHBvcnRfdXNlcl9kYXRhIiwibm9kYXRhIiwiZmlsZVVwbG9hZEFjdGlvbnMiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZmlsZVJlbW92ZUFjdGlvbiIsImZpbGVBZGRBY3Rpb24iLCJzdWJtaXRBY3Rpb25zV3JhcCIsImZsb0ZpbGVJbnB1dCIsInN0b3BQcm9wYWdhdGlvbiIsInRyaWdnZXIiLCJ3aWR0aCIsInJlY29tbWVuZGVkSXRlbUlkc0xpc3QiLCJjdXJyZW50VmlldyIsImN1cnJlbnRQYXRoIiwiY3VycmVudFBhdGhBcnIiLCJpbmRleE9mV1BBZG1pbiIsImhhc0NsYXNzIiwiYWRtaW5wYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQUFBLG9CQUFBLFNBQUFBLGlCQUFBLENBQUFDLEdBQUEsRUFBQTtBQUFBLE1BQUFDLElBQUEsdUVBQUEsRUFBQTtBQUFBLE1BQUFDLGNBQUE7O0FBQ0EsTUFBQUYsSUFBQUcsS0FBQSxDQUFBQyxNQUFBLEVBQUE7O0FBRUE7QUFDQSxRQUFBQyxTQUFBLCtCQUFBO0FBQ0EsUUFBQUMsU0FBQSxpQkFBQTs7QUFFQSxRQUFBQyxpQkFBQTtBQUNBLFFBQUFDLGlCQUFBLENBQUE7QUFDQSxRQUFBQyxnQkFBQSxFQUFBOztBQUVBLFFBQUFDLFdBQUE7QUFDQUMsYUFBQSxJQURBO0FBRUFDLG1CQUFBLElBRkE7QUFHQUMsbUJBQUEsS0FIQTtBQUlBQyxtQkFBQSxLQUpBO0FBS0FDLFlBQUEsTUFMQTtBQU1BQyxXQUFBWCxNQU5BO0FBT0FZLGVBQUE7QUFDQUMsdUJBQUEsZUFBQVosTUFEQTtBQUVBYSxnQkFBQTtBQUZBLE9BUEE7QUFXQUMsZ0JBQUE7QUFYQSxLQUFBOztBQWNBOztBQUVBQyxNQUFBbkIsY0FBQSxFQUFBb0IsR0FBQSxDQUFBO0FBQ0Esd0JBQUEsTUFEQTtBQUVBLGlCQUFBO0FBRkEsS0FBQTtBQUlBRCxNQUFBbkIsY0FBQSxFQUFBcUIsSUFBQSxDQUFBLGtCQUFBLEVBQUFDLElBQUEsZ0JBQUF4QixJQUFBRyxLQUFBLENBQUFDLE1BQUE7O0FBRUFxQixVQUFBQyxTQUFBLENBQUFDLE9BQUEsQ0FBQUMsSUFBQSxDQUFBNUIsSUFBQUcsS0FBQSxFQUFB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OztBQUVBLE1BQ0EsQ0FBQTZQLGVBQUFDLGlCQUFBLENBQUEsS0FBQSxFQUFBLElBQ0FELGVBQUFDLGlCQUFBLENBQUEsS0FBQSxXQURBLEtBRUFyVixFQUFBLE1BQUEsRUFBQXNWLFFBQUEsQ0FBQSxXQUFBLENBSEEsRUFJQTtBQUNBSixrQkFBQSxXQUFBO0FBQ0EzUCxZQUFBLFdBQUE7QUFDQTtBQUNBO0FBUkEsT0FTQSxJQUFBdkYsRUFBQSxNQUFBLEVBQUFzVixRQUFBLENBQUEscUJBQUEsQ0FBQSxFQUFBO0FBQ0FKLG9CQUFBLFdBQUE7QUFDQTNQLGNBQUEsWUFBQTtBQUNBLEtBSEEsTUFHQSxJQUFBdkYsRUFBQSxNQUFBLEVBQUFzVixRQUFBLENBQUEsbUJBQUEsQ0FBQSxFQUFBO0FBQ0FKLG9CQUFBLFNBQUE7QUFDQTNQLGNBQUEsV0FBQTtBQUNBLEtBSEEsTUFHQSxJQUFBdkYsRUFBQSxNQUFBLEVBQUFzVixRQUFBLENBQUEsZ0JBQUEsQ0FBQSxFQUFBO0FBQ0FKLG9CQUFBLE1BQUE7QUFDQTNQLGNBQUEsT0FBQTtBQUNBLEtBSEEsTUFHQSxJQUFBdkYsRUFBQSxNQUFBLEVBQUFzVixRQUFBLENBQUEsaUJBQUEsQ0FBQSxFQUFBO0FBQ0FKLG9CQUFBLE9BQUE7QUFDQTNQLGNBQUEsUUFBQTtBQUNBLEtBSEEsTUFHQSxJQUFBdkYsRUFBQSxNQUFBLEVBQUFzVixRQUFBLENBQUEsc0JBQUEsQ0FBQSxFQUFBO0FBQ0FKLG9CQUFBLE9BQUE7QUFDQTNQLGNBQUEsT0FBQTtBQUNBLEtBSEEsTUFHQSxJQUFBdkYsRUFBQSxNQUFBLEVBQUFzVixRQUFBLENBQUEsZ0JBQUEsQ0FBQSxFQUFBO0FBQ0FKLG9CQUFBLE1BQUE7QUFDQTNQLGNBQUEsT0FBQTtBQUNBO0FBQ0E7O0FBSkEsU0FNQSxJQUNBdkYsRUFBQSxNQUFBLEVBQUFzVixRQUFBLENBQUEsYUFBQSxLQUNBdFYsRUFBQSxNQUFBLEVBQUFzVixRQUFBLENBQUEsbUJBQUEsQ0FGQSxFQUdBO0FBQ0FKLHNCQUFBLFVBQUE7QUFDQTNQLGdCQUFB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QUEseUJBQUE7QUFDQSxhQUhBLE1BR0EsSUFBQWdRLGFBQUFBLFVBQUFySixRQUFBLENBQUEsWUFBQSxDQUFBLEVBQUE7QUFDQWdKLDRCQUFBLFNBQUE7QUFDQTNQLHNCQUFBLFFBQUE7QUFDQTs7QUFFQSxNQUFBMFAsdUJBQUFDLFdBQUEsQ0FBQSxFQUFBO0FBQ0EsUUFBQWxWLCtDQUFBakIsTUFBQSxJQUFBbVcsZUFBQSxTQUFBLEVBQUE7QUFDQWxWLHFEQUFBLENBQUEsRUFBQW1ILFNBQUEsZUFBQTVCLEtBQUE7QUFDQTtBQUNBLFdBQUEwUCx1QkFBQUMsV0FBQSxDQUFBO0FBQ0EsR0FMQSxNQUtBO0FBQ0EsV0FBQUQsdUJBQUEsU0FBQSxDQUFBO0FBQ0E7QUFFQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcHJvY2Vzc0ltZ3VyRmlsZXMgPSAoZWx0LCBkYXRhID0ge30sIHZpc3VhbEZlZWRiYWNrKSA9PiB7XG4gIGlmKGVsdC5maWxlcy5sZW5ndGgpIHtcbiAgICBcbiAgICAvLyBkZWNsYXJpbmcgYWxsIG5lY2Vzc2FyeSBzdHVmZlxuICAgIGxldCBhcGlVUkwgPSAnaHR0cHM6Ly9hcGkuaW1ndXIuY29tLzMvaW1hZ2UnO1xuICAgIGxldCBhcGlLZXkgPSAnOGU2ZDc4MWMzZmRmNDIxJztcbiAgICBcbiAgICBsZXQgZm9ybURhdGE7XG4gICAgbGV0IHVwbG9hZGVkQW1vdW50ID0gMDtcbiAgICBsZXQgYWxsSW1ndXJMaW5rcyA9IFtdO1xuICAgIFxuICAgIGxldCBzZXR0aW5ncyA9IHtcbiAgICAgIGFzeW5jOiB0cnVlLFxuICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICBwcm9jZXNzRGF0YTogZmFsc2UsXG4gICAgICBjb250ZW50VHlwZTogZmFsc2UsXG4gICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICB1cmw6IGFwaVVSTCxcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgQXV0aG9yaXphdGlvbjogJ0NsaWVudC1JRCAnICsgYXBpS2V5LFxuICAgICAgICBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgfSxcbiAgICAgIG1pbWVUeXBlOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICB9O1xuICAgIFxuICAgIC8vIGZvciBlYWNoIGZpbGUgc2VuZCB0aGUgcmVxdWVzdCBhbmQgcHJvY2VzcyB0aGUgcmVzcG9uc2VcbiAgICBcbiAgICAkKHZpc3VhbEZlZWRiYWNrKS5jc3Moe1xuICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnLFxuICAgICAgJ29wYWNpdHknOiAnMC4yJ1xuICAgIH0pO1xuICAgICQodmlzdWFsRmVlZGJhY2spLmZpbmQoJy5jb250YWN0LS1hdHRhY2gnKS50ZXh0KGBVcGxvYWRpbmcgJHtlbHQuZmlsZXMubGVuZ3RofSBpbWFnZXMuLi5gKTtcbiAgICBcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGVsdC5maWxlcywgZmlsZSA9PiB7XG4gICAgICBcbiAgICAgIGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoXCJpbWFnZVwiLCBmaWxlKTtcbiAgICAgIHNldHRpbmdzLmRhdGEgPSBmb3JtRGF0YTtcbiAgICAgIFxuICAgICAgJC5nZXQoc2V0dGluZ3MpLmRvbmUocmVzcG9uc2UgPT4ge1xuICAgICAgICBsZXQgcmVzcG9uc2VKU09OID0gSlNPTi5wYXJzZShyZXNwb25zZSk7XG4gICAgICAgIFxuICAgICAgICBpZihyZXNwb25zZUpTT04uc3VjY2Vzcykge1xuICAgICAgICAgIHVwbG9hZGVkQW1vdW50Kys7XG4gICAgICAgICAgYWxsSW1ndXJMaW5rcy5wdXNoKHJlc3BvbnNlSlNPTi5kYXRhLmxpbmspOyAgXG4gICAgICAgICAgaWYodXBsb2FkZWRBbW91bnQgPT0gZWx0LmZpbGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gYWxsIGxpbmtzIGFyZSBsb2FkZWRcbiAgICAgICAgICAgIGxldCBsaW5rc1RvU3RyaW5ncyA9IGFsbEltZ3VyTGlua3Muam9pbignLCAnKTtcbiAgICAgICAgICAgICQodmlzdWFsRmVlZGJhY2spLmNzcyh7XG4gICAgICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdhdXRvJyxcbiAgICAgICAgICAgICAgJ29wYWNpdHknOiAnMSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh2aXN1YWxGZWVkYmFjaykuZmluZCgnLmNvbnRhY3QtLWF0dGFjaCcpLnRleHQoYFVwbG9hZGVkICR7ZWx0LmZpbGVzLmxlbmd0aH0gaW1hZ2VzLmApO1xuICAgICAgICAgICAgZGF0YS5hdHRhY2htZW50cyA9IGxpbmtzVG9TdHJpbmdzO1xuICAgICAgICAgICAgSFMuYmVhY29uLmlkZW50aWZ5KGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICB9KTtcbiAgICBcbiAgfVxufTsiLCJjbGFzcyBCZXRhTG9nIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gU1RBUlQ6IEZJUkVCQVNFIElOSVRcbiAgICBcdHRoaXMuYXBwQ29uZmlnID0ge1xuICAgIFx0XHRhcGlLZXk6IFwiQUl6YVN5QWdBbE00NFlWM2FScDV1RllNWHcyUHQtM2Q4STVaQ1dFXCIsXG4gICAgXHRcdGF1dGhEb21haW46IFwiZmxvc3VwcG9ydC1iYXNlLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgIFx0XHRkYXRhYmFzZVVSTDogXCJodHRwczovL2Zsb3N1cHBvcnQtYmFzZS5maXJlYmFzZWlvLmNvbVwiLFxuICAgIFx0XHRwcm9qZWN0SWQ6IFwiZmxvc3VwcG9ydC1iYXNlXCIsXG4gICAgXHRcdHN0b3JhZ2VCdWNrZXQ6IFwiZmxvc3VwcG9ydC1iYXNlLmFwcHNwb3QuY29tXCIsXG4gICAgXHRcdG1lc3NhZ2luZ1NlbmRlcklkOiBcIjIzNjk4NTk2Nzg5OVwiXG4gICAgXHR9O1xuICAgICAgXG4gICAgICB0aGlzLmRvY3NBcHA7XG4gICAgICBcbiAgICBcdC8vIHVzZSB0aGlzIHRvIHN0b3AgY29ubmVjdGlvbiB0byBmaXJlYmFzZSAoPz8/KVxuICAgIFx0Ly8gZG9jc0FwcC5kZWxldGUoKTtcblxuICAgIC8vIEVORDogRklSRUJBU0UgSU5JVFxuICB9XG4gIFxuICBsb2FkKCkge1xuICAgIHRoaXMuZG9jc0FwcCA9IGZpcmViYXNlLmluaXRpYWxpemVBcHAodGhpcy5hcHBDb25maWcpO1xuICB9XG4gIFxuICAvLyByZWFkaW5nIGlzIGRpc2FibGVkIGZyb20gZmlyZWJhc2UgcnVsZXMgZm9yIG5vd1xuICAvLyByZWFkREIoaWRlbnRpZmllcil7XG5cdC8vIFx0dmFyIHRoZURiID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoaWRlbnRpZmllciArICcvJyk7XG5cdC8vIFx0dGhlRGIub24oJ3ZhbHVlJywgZnVuY3Rpb24oc25hcHNob3QpIHtcblx0Ly8gXHQgIGNvbnNvbGUubG9nKHNuYXBzaG90LnZhbCgpKTtcblx0Ly8gXHR9KTtcblx0Ly8gfVxuICBcbiAgLy8gd3JpdGUgdGVybSBpbiBmaXJlYmFzZVxuICB3cml0ZSh0ZXJtLCB0ZXJtSUQpIHtcbiAgICBcbiAgICBsZXQgcGFnZU5vdyA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICBcbiAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigndGVybV9sb2cvJyArIHRlcm1JRCkuc2V0KHtcbiAgICAgIHRlcm0sIHBhZ2VOb3dcbiAgICB9LCBlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgLy8gVGhlIHdyaXRlIGZhaWxlZC4uLlxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBEYXRhIHNhdmVkIHN1Y2Nlc3NmdWxseSFcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBcbn0iLCIhZnVuY3Rpb24oZSxvLG4pe3dpbmRvdy5IU0NXPW8sd2luZG93LkhTPW4sbi5iZWFjb249bi5iZWFjb258fHt9O3ZhciB0PW4uYmVhY29uO3QudXNlckNvbmZpZz17fSx0LnJlYWR5UXVldWU9W10sdC5jb25maWc9ZnVuY3Rpb24oZSl7dGhpcy51c2VyQ29uZmlnPWV9LHQucmVhZHk9ZnVuY3Rpb24oZSl7dGhpcy5yZWFkeVF1ZXVlLnB1c2goZSl9LG8uY29uZmlnPXtkb2NzOntlbmFibGVkOiExLGJhc2VVcmw6XCJcIn0sY29udGFjdDp7ZW5hYmxlZDohMCxmb3JtSWQ6XCIyYjViZTQ3OS0zNDU5LTExZTgtOGQ2NS0wZWU5YmIwMzI4Y2VcIn19O3ZhciByPWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF0sYz1lLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7Yy50eXBlPVwidGV4dC9qYXZhc2NyaXB0XCIsYy5hc3luYz0hMCxjLnNyYz1cImh0dHBzOi8vZGp0ZmxidDIwYmRkZS5jbG91ZGZyb250Lm5ldC9cIixyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGMscil9KGRvY3VtZW50LHdpbmRvdy5IU0NXfHx7fSx3aW5kb3cuSFN8fHt9KTtcblxuLy8gQmVhY29uIENvbmZpZ1xuSFMuYmVhY29uLmNvbmZpZyh7XG5cdG1vZGFsOiB0cnVlLFxuXHRjb2xvcjogJyMwMDAwMDAnLFxuXHRpY29uOiAnbWVzc2FnZScsXG5cdHBvd2VyZWRCeTogZmFsc2UsXG5cdHNob3dOYW1lOiB0cnVlLFxuXHRzaG93U3ViamVjdDogdHJ1ZSxcblx0ekluZGV4OiAxMDAwMDAwLFxuXHR0b3BBcnRpY2xlczogZmFsc2UsXG5cdGF1dG9Jbml0OiBmYWxzZSxcblx0YXR0YWNobWVudDogdHJ1ZSxcblx0aW5zdHJ1Y3Rpb25zOiAnICcsXG5cdHRyYW5zbGF0aW9uOiB7XG5cdFx0dG9waWNMYWJlbDogJ1N1cHBvcnQgVHlwZScsXG5cdFx0Y29udGFjdExhYmVsOiAnU3VibWl0IGEgVGlja2V0Jyxcblx0XHRzZW5kTGFiZWw6ICdTdWJtaXQnXG5cdH0sXG5cdHRvcGljczogW1xuXHRcdHsgdmFsOiAnYnVnJywgbGFiZWw6ICdCdWcnIH0sXG5cdFx0eyB2YWw6ICdxdWVzdGlvbicsIGxhYmVsOiAnUXVlc3Rpb24nIH0sXG5cdFx0eyB2YWw6ICdjb250YWN0LWZvcm0taXNzdWVzJywgbGFiZWw6ICdDb250YWN0IEZvcm0gSXNzdWVzJyB9LFxuXHRcdHsgdmFsOiAnY3NzLWN1c3RvbWl6YXRpb24nLCBsYWJlbDogJ0NTUyBDdXN0b21pemF0aW9uJyB9LFxuXHRcdHsgdmFsOiAnZmVhdHVyZS1yZXF1ZXN0JywgbGFiZWw6ICdGZWF0dXJlIFJlcXVlc3QnIH0sXG5cdFx0eyB2YWw6ICdmbG9odWInLCBsYWJlbDogJ0Zsb0h1YicgfSxcblx0XHR7IHZhbDogJ2Zsb2Zvcm1zJywgbGFiZWw6ICdGbG9Gb3JtcycgfSxcblx0XHR7IHZhbDogJ2Zsb2luc3RhZ3JhbScsIGxhYmVsOiAnRmxvSW5zdGFncmFtJyB9LFxuXHRcdHsgdmFsOiAnZm9udC1pc3N1ZXMnLCBsYWJlbDogJ0ZvbnQgSXNzdWVzJyB9LFxuXHRcdHsgdmFsOiAnaW1hZ2UtcXVhbGl0eS1hbmQtc2l6aW5nJywgbGFiZWw6ICdJbWFnZSBRdWFsaXR5IGFuZCBTaXppbmcnIH0sXG5cdFx0eyB2YWw6ICdvdGhlcicsIGxhYmVsOiAnT3RoZXInIH1cblx0XVxufSk7XG4iLCIkKHdpbmRvdykub24oXCJsb2FkXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgYiA9IFwiZmxvLXN1cHBvcnRcIjtcbiAgbGV0IGRvdGIgPSBgLiR7Yn1gO1xuXG4gIC8vIHBsdWdpbiBvcHRpb25zXG4gIGxldCBhbmFseXRpY3NDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2J9X19zZXR0aW5ncy1hbmFseXRpY3NgKTtcbiAgaWYgKGFuYWx5dGljc0NoZWNrYm94KSB7XG4gICAgYW5hbHl0aWNzQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0LnZhbHVlID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC52YWx1ZSA9IDA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiBTVEFSVDogQ1JFQVRJTkcgUE9QVVAgTUFSS1VQICovXG4gIGxldCBwb3B1cFRyaWdnZXIgPSAkKGAke2RvdGJ9X19wb3B1cC10cmlnZ2VyYCk7XG4gIGxldCB0aGVtZVNsdWcgPSAkKFwiI2JlYWNvbi1mbG9cIikuYXR0cihcImRhdGEtdGhlbWUtc2x1Z1wiKTtcbiAgLy8gbGV0IGRvY3NVUkwgPSAnLy9kb2NzZmxvdGhlbWVzLnN0YWdpbmcud3BlbmdpbmUuY29tLyc7XG4gIGxldCBkb2NzVVJMID0gXCJodHRwczovL2RvY3MuZmxvdGhlbWVzLmNvbS9cIjtcbiAgLy8gbGV0IGRvY3NVUkwgPSBcImh0dHA6Ly9sb2NhbGhvc3QvbmV3ZG9jcy9cIjtcblxuICBsZXQgdXNlVGVjaG5pY2FsRGF0YSA9ICQoXCIjYmVhY29uLWZsb1wiKS5hdHRyKFwiZGF0YS1hbmFseXRpY3NcIik7XG4gIC8vIGlmKHVzZVRlY2huaWNhbERhdGEpIHtcbiAgLy8gICBsZXQgdXNlckRhdGEgPSBKU09OLnBhcnNlKGZsb19zdXBwb3J0X3VzZXJfZGF0YSk7XG4gIC8vIH1cblxuICAvLyBkZWZpbmluZyBhcyBnbG9iYWwgdmFyaWFibGUgZm9yIHByb3BlciBicmVhZGNydW1iIG1hbmFnZW1lbnQgYWNyb3NzIGRpZmZlcmVudCBhcnRpY2xlc1xuICBsZXQgYXJ0aWNsZUhpc3RvcnkgPSBbXTtcblxuICAvLyBcInVuaW1wb3J0YW50XCIgd29yZHMgLSB0aGUsIG9mLCB0bywgYW5kLCBhLCBpbiwgaXMsIGl0LCB5b3UsIHRoYXQsIGhlLCB3YXMsIGZvciwgb24sIGFyZSwgd2l0aCwgYXMsIEksIGhpcywgdGhleSwgYmUsIGF0LCBvbmUsIGhhdmUgYW5kIHRoaXMuXG4gIC8vIGZvciBub3cgdGFrZW4gZnJvbTogaHR0cHM6Ly9tYXJrc3ByYWd1ZS53b3JkcHJlc3MuY29tL2VudGVycHJpc2Utc2VvLTIvdW5pbXBvcnRhbnQtd29yZHMtaW1wYWN0LXJlbGV2YW5jeS9cbiAgdmFyIG9taXREaWN0aW9uYXJ5ID0gW1xuICAgIFwidGhlXCIsXG4gICAgXCJvZlwiLFxuICAgIFwidG9cIixcbiAgICBcImFuZFwiLFxuICAgIFwiYVwiLFxuICAgIFwiaW5cIixcbiAgICBcImlzXCIsXG4gICAgXCJpdFwiLFxuICAgIFwieW91XCIsXG4gICAgXCJ0aGF0XCIsXG4gICAgXCJoZVwiLFxuICAgIFwid2FzXCIsXG4gICAgXCJmb3JcIixcbiAgICBcIm9uXCIsXG4gICAgXCJhcmVcIixcbiAgICBcIndpdGhcIixcbiAgICBcImFzXCIsXG4gICAgXCJJXCIsXG4gICAgXCJoaXNcIixcbiAgICBcInRoZXlcIixcbiAgICBcImJlXCIsXG4gICAgXCJhdFwiLFxuICAgIFwib25lXCIsXG4gICAgXCJoYXZlXCIsXG4gICAgXCJ0aGlzXCIsXG4gICAgXCJob3dcIixcbiAgICBcIndoeVwiLFxuICAgIFwiYW1cIixcbiAgICBcImRvXCIsXG4gICAgXCJpZlwiLFxuICAgIFwib3JcIixcbiAgICBcIm9rXCIsXG4gICAgXCJ3aGF0XCIsXG4gICAgXCJ3aGVyZVwiLFxuICAgIFwid2hlblwiLFxuICAgIFwid2hvXCIsXG4gICAgXCJ3aGljaFwiLFxuICAgIFwic29cIixcbiAgICBcInRvb1wiLFxuICAgIFwibXlcIixcbiAgICBcIm5vdFwiXG4gIF07XG5cbiAgZnVuY3Rpb24gY2xlYW5pZnlRdWVyeShzdHIpIHtcbiAgICBsZXQgd29yZHMgPSB0b2tlbml6ZShzdHIpO1xuXG4gICAgd29yZHMgPSB3b3Jkcy5maWx0ZXIoZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gb21pdERpY3Rpb25hcnkuaW5kZXhPZih2YWwpID09IC0xO1xuICAgIH0pO1xuXG4gICAgd29yZHMgPSB3b3Jkcy5qb2luKFwiIFwiKTtcblxuICAgIHJldHVybiB3b3JkcztcbiAgfVxuXG4gIC8vIHN0cmlwIEhUTUwgdGFncyBmcm9tIHN0cmluZ3MgKHBvc3QgY29udGVudCB1c3VhbGx5KVxuICBmdW5jdGlvbiB0ZXh0aWZ5KGh0bWwpIHtcbiAgICB2YXIgdG1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBodG1sID0gaHRtbC5yZXBsYWNlKC/igJkvZywgXCJcIik7XG4gICAgdG1wLmlubmVySFRNTCA9IGh0bWw7XG4gICAgcmV0dXJuIHRtcC50ZXh0Q29udGVudCB8fCB0bXAuaW5uZXJUZXh0IHx8IFwiXCI7XG4gIH1cblxuICAvLyBTcGxpdCB0ZXh0IGludG8gYXJyYXkgb2YgdG9rZW5zXG4gIGZ1bmN0aW9uIHRva2VuaXplKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5zcGxpdCgvXFxXKy8pO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcGFyZVR3b1RleHRzKGFycjEsIGFycjIpIHtcbiAgICBsZXQgbWF0Y2hlcyA9IDA7XG4gICAgYXJyMS5mb3JFYWNoKGUxID0+XG4gICAgICBhcnIyLmZvckVhY2goZTIgPT4ge1xuICAgICAgICBpZiAoZTEudG9Mb3dlckNhc2UoKSA9PT0gZTIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIG1hdGNoZXMrKztcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICAgIHJldHVybiBtYXRjaGVzO1xuICB9XG5cbiAgZnVuY3Rpb24gY291bnRXb3JkcyhzdHIsIHdvcmRzVG9Db3VudCkge1xuICAgIGxldCB3b3JkTGlzdCA9IHRva2VuaXplKHN0cik7XG4gICAgbGV0IG9jY3VycmVuY2VzID0ge307XG4gICAgd29yZHNUb0NvdW50LmZvckVhY2god29yZFRvQ291bnQgPT4ge1xuICAgICAgb2NjdXJyZW5jZXNbd29yZFRvQ291bnRdID0gMDtcbiAgICAgIHdvcmRMaXN0LmZvckVhY2god29yZCA9PiB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB3b3JkLnRvTG93ZXJDYXNlKCkgPT0gd29yZFRvQ291bnQudG9Mb3dlckNhc2UoKSB8fFxuICAgICAgICAgIHdvcmQudG9Mb3dlckNhc2UoKSA9PSB3b3JkVG9Db3VudC50b0xvd2VyQ2FzZSgpICsgXCJzXCJcbiAgICAgICAgKSB7XG4gICAgICAgICAgb2NjdXJyZW5jZXNbd29yZFRvQ291bnRdKys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9jY3VycmVuY2VzO1xuICB9XG5cbiAgbGV0IHBvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcG9wdXAuY2xhc3NOYW1lID0gYCR7Yn1gO1xuXG4gIHBvcHVwLmlubmVySFRNTCA9IGBcbiAgICBcbiAgICAgIDxzcGFuIGNsYXNzPVwiJHtifV9fY2xvc2UtdHJpZ2dlclwiPlxuICAgICAgICA8aSBjbGFzcz1cIiR7Yn1fX2Nsb3NlLWljb24gICR7Yn0taWNvbi1jYW5jZWwtMVwiPjwvaT5cbiAgICAgICAgPHN2ZyBjbGFzcz1cIiR7Yn1fX2Nsb3NlLWJ1dHRvbi1iZ1wiIHdpZHRoPVwiMTExcHhcIiBoZWlnaHQ9XCIyM3B4XCIgdmlld0JveD1cIjAgMCAxMTEgMjNcIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHhtbG5zOnhsaW5rPVwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiPlxuICAgICAgICAgIDxnIGlkPVwiUGFnZS0xXCIgc3Ryb2tlPVwibm9uZVwiIHN0cm9rZS13aWR0aD1cIjFcIiBmaWxsPVwibm9uZVwiIGZpbGwtcnVsZT1cImV2ZW5vZGRcIj5cbiAgICAgICAgICAgIDxnIGlkPVwiQXJ0Ym9hcmRcIiB0cmFuc2Zvcm09XCJ0cmFuc2xhdGUoLTI0MC4wMDAwMDAsIC02NC4wMDAwMDApXCIgZmlsbD1cIiNGRkZGRkZcIiBmaWxsLXJ1bGU9XCJub256ZXJvXCI+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMzUxLDg3IEMzMjAuODA2MDEyLDg3IDMyMy43OTk5OTksNjQgMjk2LDY0IEMyNjguMjAwMDAxLDY0IDI2Ni4wOTcyNTYsODcgMjQwLDg3IEMyNzYsODcgMzExLjUsODcgMzUxLDg3IFpcIiBpZD1cIlBhdGgtMlwiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICA8L2c+XG4gICAgICAgIDwvc3ZnPlxuICAgICAgPC9zcGFuPlxuICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX25vdC1zaW5nbGUtZWx0c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fdGFiLXN3aXRjaGVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCIke2J9X190YWItc3dpdGNoICR7Yn1fX3RhYi1zd2l0Y2gtLWRvY3NcIiBkYXRhLXRhYj1cImRvY3MtdGFiXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz1cIiR7Yn0taWNvbi1tZW51XCI+PC9pPlxuICAgICAgICAgICAgRG9jdW1lbnRhdGlvblxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIiR7Yn1fX3RhYi1zd2l0Y2ggJHtifV9fdGFiLXN3aXRjaC0tc2VhcmNoICR7Yn1fX3RhYi1zd2l0Y2gtLWFjdGl2ZVwiIGRhdGEtdGFiPVwic2VhcmNoLXRhYlwiPlxuICAgICAgICAgICAgPGkgY2xhc3M9XCIke2J9LWljb24tc2VhcmNoXCI+PC9pPlxuICAgICAgICAgICAgU2VhcmNoIERvY3NcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCIke2J9X190YWItc3dpdGNoICR7Yn1fX3RhYi1zd2l0Y2gtLWhzXCIgZGF0YS10YWI9XCJocy10YWJcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiJHtifS1pY29uLW1haWxcIj48L2k+XG4gICAgICAgICAgICBTdWJtaXQgYSBUaWNrZXRcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgXG4gICAgICAgICAgPCEtLSBCRVRBOiBGRUVEQkFDSyBUQUIgVFJJR0dFUiAtLT5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIiR7Yn1fX3RhYi1zd2l0Y2ggJHtifV9fdGFiLXN3aXRjaC0tZmVlZGJhY2tcIiBkYXRhLXRhYj1cImZlZWRiYWNrLXRhYlwiIHRpdGxlPVwiTGVhdmUgRmVlZGJhY2tcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiJHtifS1pY29uLWluZm8tb3V0bGluZVwiPjwvaT5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgXG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fdGFicy13cmFwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX2RvY3MtdGFiICR7Yn1fX3RhYlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX2FsbC1hcnRpY2xlcy1tZW51XCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX3NlYXJjaC10YWIgJHtifV9fdGFiICR7Yn1fX2FjdGl2ZS10YWJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19zZWFyY2gtZm9ybVwiPlxuICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cIiR7Yn1fX3NlYXJjaC1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiR290IGEgcXVlc3Rpb24/IEZpcmUgYXdheSFcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIiR7Yn1fX3NlYXJjaC1idXR0b25cIj5TZWFyY2g8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19zZWFyY2gtcmVzdWx0cy13cmFwXCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fcmVjb21tZW5kZWQtYXJ0aWNsZXNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCIke2J9X19yZWNvbW1lbmRlZC1hcnRpY2xlcy0tdGl0bGVcIj5SZWNvbW1lbmRlZCBBcnRpY2xlczwvc3Bhbj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX3JlY29tbWVuZGVkLWxvYWRpbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fc2VhcmNoLWxvYWRpbmctYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX3NlYXJjaC1sb2FkaW5nLWJhclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19zZWFyY2gtbG9hZGluZy1iYXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fc2VhcmNoLWxvYWRpbmctYmFyXCI+PC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8IS0tIG5lZWRzIHNjcm9sbGJhciAtLT5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiJHtifV9fcmVjb21tZW5kZWQtYXJ0aWNsZXMtLWl0ZW1zIG1lbnVcIj48L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX2hzLXRhYiAke2J9X190YWJcIj48L2Rpdj5cbiAgICAgICAgICA8IS0tIEJFVEE6IEZFRURCQUNLIFRBQiAtLT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fZmVlZGJhY2stdGFiICR7Yn1fX3RhYlwiPlxuICAgICAgICAgICAgPGgzIGNsYXNzPVwiJHtifV9fZmVlZGJhY2stbG9hZGluZ1wiPlxuICAgICAgICAgICAgICBMb2FkaW5nIEZlZWRiYWNrIEZvcm1cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkb3RcIj4uPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImRvdFwiPi48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZG90XCI+Ljwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8aWZyYW1lIGNsYXNzPVwiJHtifV9fZmVlZGJhY2staWZyYW1lIHdhaXRpbmctbG9hZFwiIGRhdGEtc3JjPVwiaHR0cHM6Ly9kb2NzLmZsb3RoZW1lcy5jb20vZmxvc3VwcG9ydC1sZWF2ZS1mZWVkYmFja1wiIGZyYW1lYm9yZGVyPVwiMFwiPjwvaWZyYW1lPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19zaW5nbGUtYXJ0aWNsZS13cmFwICR7Yn1fX3RhYlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX2FydGljbGUtYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIiR7Yn1fX2FydGljbGUtY2xvc2VcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIiR7Yn0taWNvbi1hcnJvdy1iYWNrXCI+PC9pPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19icmVhZGNydW1icy13cmFwXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19ub3RpY2Utd3JhcFwiPjwvZGl2PlxuICAgICAgXG4gICAgYDtcblxuICAvLyBpZiB3b3JraW5nIHdpdGggcG9wdXAgY29udGVudHMsIGRlY2xhcmUgYWxsIHZhcmlhYmxlcywgc2VsZWN0b3JzIGV0YyBCRUxPVyB0aGlzIGxpbmU6XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocG9wdXApO1xuXG4gIC8qIFNUQVJUOiBQT1BVUCBWQVJJQUJMRVMgKi9cbiAgbGV0IHNlYXJjaElucHV0ID0gJChgJHtkb3RifV9fc2VhcmNoLWlucHV0YCk7XG4gIGxldCBzZWFyY2hCdXR0b24gPSAkKGAke2RvdGJ9X19zZWFyY2gtYnV0dG9uYCk7XG4gIGxldCBzZWFyY2hSZXN1bHRzV3JhcCA9ICQoYCR7ZG90Yn1fX3NlYXJjaC1yZXN1bHRzLXdyYXBgKTtcbiAgbGV0IHJlY29tbWVuZGVkQXJ0aWNsZXNXcmFwID0gJChgJHtkb3RifV9fcmVjb21tZW5kZWQtYXJ0aWNsZXNgKTtcbiAgbGV0IGRvY3NUYWJUcmlnZ2VyID0gJChgJHtkb3RifV9fdGFiLXN3aXRjaC0tZG9jc2ApO1xuICBsZXQgZG9jc1RhYiA9ICQoYCR7ZG90Yn1fX2RvY3MtdGFiYCk7XG4gIGxldCBoc1RhYlRyaWdnZXIgPSAkKGAke2RvdGJ9X190YWItc3dpdGNoLS1oc2ApO1xuICBsZXQgaHNUYWIgPSAkKGAke2RvdGJ9X19ocy10YWJgKTtcbiAgbGV0IHNlYXJjaFRhYlRyaWdnZXIgPSAkKGAke2RvdGJ9X190YWItLXNlYXJjaGApO1xuICBsZXQgc2VhcmNoVGFiID0gJChgJHtkb3RifV9fc2VhcmNoLXRhYmApO1xuICAvKiBFTkQ6IFBPUFVQIFZBUklBQkxFUyAqL1xuXG4gIC8qIFNUQVJUOiBCRVRBIExPRyAoaW5pdCBmaXJlYmFzZSkgKi9cbiAgbGV0IGJldGFMb2cgPSBuZXcgQmV0YUxvZygpO1xuICBiZXRhTG9nLmxvYWQoKTtcbiAgLyogRU5EOiBCRVRBIExPRyAoaW5pdCBmaXJlYmFzZSkgKi9cblxuICAvKiBTVEFSVDogQkVUQSBBU1lOQyBMT0FEIElGUkFNRSAqL1xuICAkKGAke2RvdGJ9X190YWItc3dpdGNoLS1mZWVkYmFja2ApLm9uZShcImNsaWNrXCIsIGV2ZW50ID0+IHtcbiAgICAkKGAke2RvdGJ9X19mZWVkYmFjay1pZnJhbWVgKS5vbmUoXCJsb2FkXCIsIGUgPT4ge1xuICAgICAgJChlLnRhcmdldCkucmVtb3ZlQ2xhc3MoXCJ3YWl0aW5nLWxvYWRcIik7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAkKGAke2RvdGJ9X19mZWVkYmFjay1sb2FkaW5nYCkucmVtb3ZlKCk7XG4gICAgICB9LCAzMDApO1xuICAgIH0pO1xuICAgICQoYCR7ZG90Yn1fX2ZlZWRiYWNrLWlmcmFtZWApLmF0dHIoXG4gICAgICBcInNyY1wiLFxuICAgICAgJChgJHtkb3RifV9fZmVlZGJhY2staWZyYW1lYCkuYXR0cihcImRhdGEtc3JjXCIpXG4gICAgKTtcbiAgfSk7XG4gIC8qIEVORDogQkVUQSBBU1lOQyBMT0FEIElGUkFNRSAqL1xuXG4gIGZ1bmN0aW9uIGRvY3NTZWFyY2goc2VhcmNoUSkge1xuICAgIGJldGFMb2cud3JpdGUoc2VhcmNoUSwgbmV3IERhdGUoKS5nZXRUaW1lKCkpO1xuXG4gICAgLy8gcHJlcHJvY2VzcyBxdWVyeSB0ZXh0IGZvciByZXN1bHQgc29ydGluZ1xuICAgIGxldCBjbGVhblF1ZXJ5ID0gUmlUYS5zdGVtKHNlYXJjaFEudG9Mb3dlckNhc2UoKSk7XG4gICAgbGV0IHF1ZXJ5QXJyYXkgPSBSaVRhLnRva2VuaXplKGNsZWFuUXVlcnkpO1xuXG4gICAgbGV0IHBhcnNlZFN0ciA9IGVuY29kZVVSSUNvbXBvbmVudChjbGVhbmlmeVF1ZXJ5KHNlYXJjaFEpKTtcblxuICAgIHNlYXJjaFJlc3VsdHNXcmFwLmh0bWwoXCJcIik7XG4gICAgc2VhcmNoUmVzdWx0c1dyYXAuaHRtbChgXG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19zZWFyY2gtbG9hZGluZy1iYXJcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX3NlYXJjaC1sb2FkaW5nLWJhclwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fc2VhcmNoLWxvYWRpbmctYmFyXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19zZWFyY2gtbG9hZGluZy1iYXJcIj48L2Rpdj5cbiAgICAgIGApO1xuXG4gICAgJChgJHtkb3RifV9fcmVjb21tZW5kZWQtYXJ0aWNsZXNgKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbiAgICAkKGAke2RvdGJ9X19zZWFyY2gtcmVzdWx0cy13cmFwYCkuY3NzKFwiZGlzcGxheVwiLCBcImZsZXhcIik7XG5cbiAgICBsZXQgdXJsUGFyYW1zID0gXCJ3cC1qc29uL2Zsb19hcGkvdjEvc2VhcmNoL1wiO1xuICAgIGxldCB1cmwgPSBgJHtkb2NzVVJMfSR7dXJsUGFyYW1zfT9zPSR7cGFyc2VkU3RyfSZ0YWdzPSR7dGhlbWVTbHVnfSxnZW5lcmljYDtcblxuICAgIC8qIFNUQVJUOiBSRU5ERVJJTkcgU0VBUkNIIFJFU1VMVFMgTE9HSUMgKi9cbiAgICBmZXRjaCh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4ocmVzdWx0c0pTT04gPT4ge1xuICAgICAgICBzZWFyY2hSZXN1bHRzV3JhcC5mYWRlT3V0KFwiNDAwXCIsICgpID0+IHtcbiAgICAgICAgICBzZWFyY2hSZXN1bHRzV3JhcC5odG1sKFwiXCIpO1xuXG4gICAgICAgICAgaWYgKHJlc3VsdHNKU09OLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gZGVjbGFyZSA1IGVtcHR5IGFycmF5cyB0aGF0IHdpbGwgaG9sZCB0aGUgcmVzdWx0cyBiYXNlZCBvbiByZWxldmFuY2Ugc2NvcmVcbiAgICAgICAgICAgIGxldCBbZmlyc3QsIHNlY29uZCwgdGhpcmQsIGZvdXJ0aCwgZmlmdGhdID0gW1tdLCBbXSwgW10sIFtdLCBbXV07XG5cbiAgICAgICAgICAgIHJlc3VsdHNKU09OLmZvckVhY2goKHJlc3VsdCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgLyogY291bnQgcmVsZXZhbmNlIHNjb3JlIGZvciBlYWNoIGFydGljbGVcbiAgICAgICAgICAgICAgICAgIFdlIHdpbGwgdHJ5IHRvIG1pbWljIHRoZSBcIm9yZGVyYnk9cmVsZXZhbmNlXCIgbWV0aG9kIHRoYXQgV29yZFByZXNzIGRvZXMgdmlhIGdldF9wb3N0cyBvciBXUF9RdWVyeTogaHR0cHM6Ly9jb3JlLnRyYWMud29yZHByZXNzLm9yZy90aWNrZXQvNzM5NCNjb21tZW50OjcyXG4gICAgICAgICAgICAgICAgICAxIGlzIHRoZSBoaWdoZXN0IHZhbHVlIGFuZCA1IGlzIHRoZSBsb3dlc3Q6XG4gICAgICAgICAgICAgICAgICAgIDEgLSBGdWxsIHNlbnRlbmNlIG1hdGNoZXMgaW4gcG9zdCB0aXRsZXNcbiAgICAgICAgICAgICAgICAgICAgMiAtIEFsbCBzZWFyY2ggdGVybXMgaW4gcG9zdCB0aXRsZXNcbiAgICAgICAgICAgICAgICAgICAgMyAtIEFueSBzZWFyY2ggdGVybXMgaW4gcG9zdCB0aXRsZXNcbiAgICAgICAgICAgICAgICAgICAgNCAtIEZ1bGwgc2VudGVuY2UgbWF0Y2hlcyBpbiBwb3N0IGNvbnRlbnQgb3IgXCJhY2Ygc2VjdGlvbnNcIiBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgIDUgLSBFYWNoIHNlY3Rpb24gYW5kIGFueSByZW1haW5pbmcgcG9zdHMgYXJlIHRoZW4gc29ydGVkIGJ5IGRhdGVcbiAgICAgICAgICAgICAgICAgIGZvciBwb3N0cyB0aGF0IGhhdmUgYSByZWxldmFuY2Ugc2NvcmUgb2YgXCI1XCIgd2Ugd2lsbCBzb3J0IGJ5IHRoZSBhbW91bnQgb2YgdGltZXMgZWFjaCBxdWVyeSB0ZXJtIG9jY3VycyBpbiB0aGUgcG9zdCBjb250ZW50IG9yIFwiYWNmIHNlY3Rpb25zXCIgY29udGVudFxuICAgICAgICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgICBsZXQgcG9zdFRpdGxlID0gcmVzdWx0LnBvc3RfdGl0bGU7XG4gICAgICAgICAgICAgIGxldCBwb3N0Q29udGVudCA9IHJlc3VsdC50ZXh0X2NvbnRlbnQ7XG4gICAgICAgICAgICAgIGxldCBwb3N0U2VjdGlvbnMgPSByZXN1bHQuYWNmLnNlY3Rpb25zO1xuICAgICAgICAgICAgICBsZXQgcG9zdFNlY3Rpb25zQ29udGVudCA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgLy8gaWYgcG9zdCBoYXMgYWNmIHNlY3Rpb25zLCBtZXJnZSB0aGUgc2VjdGlvbnMgY29udGVudCBpbiB0aGUgcG9zdENvbnRlbnQgdmFyaWFibGVcbiAgICAgICAgICAgICAgaWYgKHBvc3RTZWN0aW9ucyAmJiBwb3N0U2VjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcG9zdFNlY3Rpb25zLmZvckVhY2goKHNlY3Rpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoc2VjdGlvbi5jb250ZW50ICYmIHNlY3Rpb24uY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdFNlY3Rpb25zQ29udGVudCArPSBzZWN0aW9uLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcG9zdENvbnRlbnQgKz0gcG9zdFNlY3Rpb25zQ29udGVudDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGxldCBwb3N0Q29udGVudFBsYWluVGV4dCA9IHRleHRpZnkocG9zdENvbnRlbnQpO1xuXG4gICAgICAgICAgICAgIGxldCBwb3N0RXhjZXJwdCA9XG4gICAgICAgICAgICAgICAgcG9zdENvbnRlbnRQbGFpblRleHQubGVuZ3RoID4gMTUwXG4gICAgICAgICAgICAgICAgICA/IHBvc3RDb250ZW50UGxhaW5UZXh0LnNsaWNlKDAsIDE1MCkgKyBcIi4uLlwiXG4gICAgICAgICAgICAgICAgICA6IHBvc3RDb250ZW50UGxhaW5UZXh0O1xuICAgICAgICAgICAgICByZXN1bHQuZXhjZXJwdCA9IHRleHRpZnkocG9zdEV4Y2VycHQpO1xuXG4gICAgICAgICAgICAgIC8vIHByZXByb2Nlc3MgcG9zdCB0aXRsZSBmb3IgZGV0ZXJtaW5pbmcgcmVsZXZhbmNlIHNjb3JlcyAoMiwgMylcbiAgICAgICAgICAgICAgbGV0IHBvc3RUaXRsZVN0ZW1tZWQgPSBSaVRhLnN0ZW0ocG9zdFRpdGxlKTtcbiAgICAgICAgICAgICAgbGV0IHBvc3RUaXRsZVN0ZW1tZWRUb2tlbnMgPSB0b2tlbml6ZShcbiAgICAgICAgICAgICAgICBjbGVhbmlmeVF1ZXJ5KHBvc3RUaXRsZVN0ZW1tZWQpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBmdW5jdGlvbiBrZXlJc0luU3RyaW5nKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwb3N0VGl0bGVTdGVtbWVkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoY3VycmVudFZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3RUaXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFEudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZWxldmFuY2Vfc2NvcmUgPSAxO1xuICAgICAgICAgICAgICAgICAgZmlyc3QucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocXVlcnlBcnJheS5ldmVyeShrZXlJc0luU3RyaW5nKSkge1xuICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlbGV2YW5jZV9zY29yZSA9IDI7XG4gICAgICAgICAgICAgICAgICBzZWNvbmQucHVzaChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICB0b2tlbml6ZShjbGVhbmlmeVF1ZXJ5KGNsZWFuUXVlcnkpKS5zb21lKHN1YnN0cmluZyA9PlxuICAgICAgICAgICAgICAgICAgICBjbGVhbmlmeVF1ZXJ5KHBvc3RUaXRsZVN0ZW1tZWQpXG4gICAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAuaW5jbHVkZXMoc3Vic3RyaW5nKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgLy8gY291bnQgdGhlIHBvc3QgdGl0bGUgd29yZHM6IGhvdyBtYW55IHRpbWVzIHRoZXNlIG1hdGNoIHRoZSBxdWVyeSB3b3JkcyAocmVwZWF0aW5nIGluY3JlYXNlcyBjb3VudCBhcyB3ZWxsKVxuICAgICAgICAgICAgICAgICAgcmVzdWx0LnJlbGV2YW5jZV9zY29yZSA9IDM7XG4gICAgICAgICAgICAgICAgICByZXN1bHQudGl0bGVNYXRjaENvdW50ID0gY29tcGFyZVR3b1RleHRzKFxuICAgICAgICAgICAgICAgICAgICB0b2tlbml6ZShjbGVhbmlmeVF1ZXJ5KGNsZWFuUXVlcnkpKSxcbiAgICAgICAgICAgICAgICAgICAgcG9zdFRpdGxlU3RlbW1lZFRva2Vuc1xuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHRoaXJkLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgUmlUYS5zdGVtKHBvc3RDb250ZW50UGxhaW5UZXh0LnRvTG93ZXJDYXNlKCkpLmluY2x1ZGVzKFxuICAgICAgICAgICAgICAgICAgICBjbGVhbmlmeVF1ZXJ5KGNsZWFuUXVlcnkudG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5yZWxldmFuY2Vfc2NvcmUgPSA0O1xuICAgICAgICAgICAgICAgICAgZm91cnRoLnB1c2gocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gcmVsZXZhbmNlIHNjb3JlIDUsIGNvdW50IGhvdyBtYW55IHRpbWVzIGVhY2ggd29yZCBmcm9tIHRoZSBwb3N0IGNvbnRlbnQgb2NjdXJzIGluIHRoZSBxdWVyeVxuICAgICAgICAgICAgICAgICAgbGV0IHdvcmRDb3VudCA9IGNvdW50V29yZHMoXG4gICAgICAgICAgICAgICAgICAgIHBvc3RDb250ZW50UGxhaW5UZXh0LnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgICAgIHRva2VuaXplKGNsZWFuaWZ5UXVlcnkoc2VhcmNoUSkudG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBsZXQgd29yZENvdW50U3VtID0gMDtcbiAgICAgICAgICAgICAgICAgIE9iamVjdC52YWx1ZXMod29yZENvdW50KS5mb3JFYWNoKHdvcmRDb3VudFZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd29yZENvdW50U3VtICs9IHdvcmRDb3VudFZhbHVlO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBsZXQgd29yZENvdW50TWVhbiA9XG4gICAgICAgICAgICAgICAgICAgIHdvcmRDb3VudFN1bSAvIE9iamVjdC52YWx1ZXMod29yZENvdW50KS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICBsZXQgbnVtID0gTnVtYmVyKHdvcmRDb3VudE1lYW4pOyAvLyBUaGUgTnVtYmVyKCkgb25seSB2aXN1YWxpemVzIHRoZSB0eXBlIGFuZCBpcyBub3QgbmVlZGVkXG4gICAgICAgICAgICAgICAgICBsZXQgcm91bmRTdHJpbmcgPSBudW0udG9GaXhlZCgyKTsgLy8gdG9GaXhlZCgpIHJldHVybnMgYSBzdHJpbmcgKG9mdGVuIHN1aXRhYmxlIGZvciBwcmludGluZyBhbHJlYWR5KVxuICAgICAgICAgICAgICAgICAgbGV0IHJvdW5kV29yZENvdW50TWVhbiA9IE51bWJlcihyb3VuZFN0cmluZyk7XG5cbiAgICAgICAgICAgICAgICAgIHJlc3VsdC53b3JkX2NvdW50ID0ge1xuICAgICAgICAgICAgICAgICAgICB3b3Jkczogd29yZENvdW50LFxuICAgICAgICAgICAgICAgICAgICB3b3JkQ291bnRTY29yZTogcm91bmRXb3JkQ291bnRNZWFuXG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICBmaWZ0aC5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh7Zmlyc3QsIHNlY29uZCwgdGhpcmQsIGZvdXJ0aCwgZmlmdGh9KTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIC8vIGZvciByZXN1bHRzIHRoYXQgaGF2ZSBhIHJlbGV2YW5jZSBzY29yZSBvZiAzIHNvcnQgdGhlbSBieSB0aXRsZU1hdGNoQ291bnRcbiAgICAgICAgICAgICAgdGhpcmQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBiLnRpdGxlTWF0Y2hDb3VudCAtIGEudGl0bGVNYXRjaENvdW50O1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAvLyBmb3IgcmVzdWx0cyB0aGF0IGhhdmUgYSByZWxldmFuY2Ugc2NvcmUgb2YgNSBzb3J0IHRoZW0gYnkgKG1lYW4gd29yZCBjb3VudCAtIHdvcmRjb3VudCBzdW0gZGl2aWRlZCBieSBhbW91bnQgb2Ygd29yZHMpXG4gICAgICAgICAgICAgIGZpZnRoLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICBiLndvcmRfY291bnQud29yZENvdW50U2NvcmUgLSBhLndvcmRfY291bnQud29yZENvdW50U2NvcmVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBsZXQgc29ydGVkUmVzdWx0c0pTT04gPSBmaXJzdC5jb25jYXQoXG4gICAgICAgICAgICAgICAgc2Vjb25kLFxuICAgICAgICAgICAgICAgIHRoaXJkLFxuICAgICAgICAgICAgICAgIGZvdXJ0aCxcbiAgICAgICAgICAgICAgICBmaWZ0aFxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHNXcmFwLmFwcGVuZChgXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiJHtifV9fc2VhcmNoLXJlc3VsdHMtaW5mb1wiPlxuICAgICAgICAgICAgICAgICAgICAgIFNob3dpbmcgJHtzb3J0ZWRSZXN1bHRzSlNPTi5sZW5ndGh9IHJlc3VsdHNcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgYCk7XG5cbiAgICAgICAgICAgICAgc29ydGVkUmVzdWx0c0pTT04uZm9yRWFjaChyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGxldCB3b3JkQ291bnRDb25kaXRpb25hbEluZm8gPSBgXG4gICAgICAgICAgICAgICAgLy8gICA8c3Bhbj5SZWxldmFuY2UgU2NvcmU6ICR7cmVzdWx0LnJlbGV2YW5jZV9zY29yZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgLy8gYDtcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIGlmKHJlc3VsdC50aXRsZU1hdGNoQ291bnQpXG4gICAgICAgICAgICAgICAgLy8gICB3b3JkQ291bnRDb25kaXRpb25hbEluZm8gKz0gYFxuICAgICAgICAgICAgICAgIC8vICAgICA8c3Bhbj5Xb3JkIG1hdGNoZXMgaW4gdGl0bGU6ICR7cmVzdWx0LnRpdGxlTWF0Y2hDb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgICAgLy8gICBgO1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gaWYocmVzdWx0LndvcmRfY291bnQpXG4gICAgICAgICAgICAgICAgLy8gICB3b3JkQ291bnRDb25kaXRpb25hbEluZm8gKz0gYFxuICAgICAgICAgICAgICAgIC8vICAgICA8c3Bhbj4ke0pTT04uc3RyaW5naWZ5KHJlc3VsdC53b3JkX2NvdW50LndvcmRzKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxzcGFuPk1lYW4gVmFsdWU6ICR7cmVzdWx0LndvcmRfY291bnQud29yZENvdW50U2NvcmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIC8vICAgYDtcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIGxldCB3b3JkQ291bnREYXRhID0gYFxuICAgICAgICAgICAgICAgIC8vICAgPHNwYW4gY2xhc3M9XCIke2J9X193b3JkY291bnQtZGF0YS13cmFwXCI+XG4gICAgICAgICAgICAgICAgLy8gICAgIDxpIGNsYXNzPVwiZGFzaGljb25zIGRhc2hpY29ucy1pbmZvXCI+PC9pPlxuICAgICAgICAgICAgICAgIC8vICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fd29yZGNvdW50LWluZm9cIj5cbiAgICAgICAgICAgICAgICAvLyAgICAgICAke3dvcmRDb3VudENvbmRpdGlvbmFsSW5mb31cbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgLy8gICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgLy8gYDtcblxuICAgICAgICAgICAgICAgIGxldCBpdGVtVXJsID0gZG9jc1VSTCArIHRoZW1lU2x1ZyArIFwiLyNcIiArIHJlc3VsdC5zbHVnO1xuXG4gICAgICAgICAgICAgICAgbGV0IHNlYXJjaFJlc3VsdEV4Y2VycHRXcmFwID1cbiAgICAgICAgICAgICAgICAgIHJlc3VsdC5leGNlcnB0Lmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgICAgICAgPyBgPHAgY2xhc3M9XCIke2J9X19zZWFyY2gtcmVzdWx0LWV4Y2VycHRcIj4ke1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmV4Y2VycHRcbiAgICAgICAgICAgICAgICAgICAgICB9PC9wPmBcbiAgICAgICAgICAgICAgICAgICAgOiBcIlwiO1xuXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0c1dyYXAuYXBwZW5kKGBcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fc2VhcmNoLXJlc3VsdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7aXRlbVVybH1cIiB0YXJnZXQ9XCJfYmxhbmtcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCIke2J9X19zZWFyY2gtcmVzdWx0LXBvc3QtdGl0bGVcIj4ke1xuICAgICAgICAgICAgICAgICAgcmVzdWx0LnBvc3RfdGl0bGVcbiAgICAgICAgICAgICAgICB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAke3NlYXJjaFJlc3VsdEV4Y2VycHRXcmFwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cIiR7Yn0taWNvbi1hcnJvdy1yaWdodCAke2J9X19zZWFyY2gtcmVzdWx0LWl0ZW0taWNvblwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYCk7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGxldCBzZWFyY2hSZXN1bHRMaW5rID0gJChgJHtkb3RifV9fc2VhcmNoLXJlc3VsdCA+IGFgKTtcbiAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0TGluay5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0SW5kZXggPSAkKGV2ZW50LnRhcmdldClcbiAgICAgICAgICAgICAgICAgIC5wYXJlbnRzKGAke2RvdGJ9X19zZWFyY2gtcmVzdWx0YClcbiAgICAgICAgICAgICAgICAgIC5pbmRleCgpO1xuICAgICAgICAgICAgICAgIGxldCBhcnRpY2xlVG9SZW5kZXIgPSBzb3J0ZWRSZXN1bHRzSlNPTlt0YXJnZXRJbmRleCAtIDFdO1xuICAgICAgICAgICAgICAgIHJlbmRlckFydGljbGUoYXJ0aWNsZVRvUmVuZGVyLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VhcmNoUmVzdWx0c1dyYXAuaHRtbChcIjxoND5ObyByZXN1bHRzIGZvdW5kPC9oND5cIik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgc2VhcmNoUmVzdWx0c1dyYXAuZmFkZUluKFwiNDAwXCIpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIC8qIEVORDogUkVOREVSSU5HIFNFQVJDSCBSRVNVTFRTIExPR0lDICovXG4gIH1cblxuICAkKGAke2RvdGJ9X190YWItc3dpdGNoYCkub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBsZXQgdGFiVG9TaG93ID0gJCh0aGlzKS5hdHRyKFwiZGF0YS10YWJcIik7XG5cbiAgICAkKGAke2RvdGJ9X190YWItc3dpdGNoLS1hY3RpdmVgKS5yZW1vdmVDbGFzcyhgJHtifV9fdGFiLXN3aXRjaC0tYWN0aXZlYCk7XG4gICAgJCh0aGlzKS5hZGRDbGFzcyhgJHtifV9fdGFiLXN3aXRjaC0tYWN0aXZlYCk7XG4gICAgJChgJHtkb3RifV9fcHJldmlvdXNseS1hY3RpdmUtdGFiYCkucmVtb3ZlQ2xhc3MoXG4gICAgICBgJHtifV9fcHJldmlvdXNseS1hY3RpdmUtdGFiYFxuICAgICk7XG4gICAgJChgJHtkb3RifV9fYWN0aXZlLXRhYmApLnJlbW92ZUNsYXNzKGAke2J9X19hY3RpdmUtdGFiYCk7XG4gICAgJChgJHtkb3RifV9fJHt0YWJUb1Nob3d9YCkuYWRkQ2xhc3MoYCR7Yn1fX2FjdGl2ZS10YWJgKTtcbiAgfSk7XG5cbiAgc2VhcmNoSW5wdXQub24oXCJrZXl1cFwiLCBmdW5jdGlvbihldmVudCkge1xuICAgIC8vIGVzY1xuICAgIGlmIChldmVudC5rZXlDb2RlID09IDI3KSB7XG4gICAgICAkKHRoaXMpLnZhbChcIlwiKTtcbiAgICB9XG5cbiAgICBpZiAoJCh0aGlzKS52YWwoKS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJlY29tbWVuZGVkQXJ0aWNsZXNXcmFwLmNzcyhcImRpc3BsYXlcIiwgXCJmbGV4XCIpO1xuICAgICAgc2VhcmNoUmVzdWx0c1dyYXAuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG4gICAgfVxuXG4gICAgLy8gZW50ZXJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PSAxMykge1xuICAgICAgbGV0IGN1cnJlbnRRdWVyeSA9ICQodGhpcykudmFsKCk7XG4gICAgICBpZiAoY3VycmVudFF1ZXJ5Lmxlbmd0aCkgZG9jc1NlYXJjaChjdXJyZW50UXVlcnkpO1xuICAgIH1cbiAgfSk7XG5cbiAgc2VhcmNoQnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgbGV0IGN1cnJlbnRRdWVyeSA9ICQodGhpcylcbiAgICAgIC5zaWJsaW5ncyhzZWFyY2hJbnB1dClcbiAgICAgIC52YWwoKTtcbiAgICBpZiAoY3VycmVudFF1ZXJ5Lmxlbmd0aCkgZG9jc1NlYXJjaChjdXJyZW50UXVlcnkpO1xuICB9KTtcblxuICAvKiBTVEFSVDogQ0xPU0UgQVJUSUNMRSBBTkQgR0VUIEJBQ0sgVE8gUFJFVklPVVMgU0NSRUVOICovXG4gICQoYCR7ZG90Yn1fX2FydGljbGUtY2xvc2VgKS5vbihcImNsaWNrXCIsICgpID0+IHtcbiAgICBpZiAoYXJ0aWNsZUhpc3RvcnkubGVuZ3RoIDw9IDEpIHtcbiAgICAgIGNsb3NlQXJ0aWNsZSgpO1xuICAgICAgYXJ0aWNsZUhpc3RvcnkgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHByZXZBcnRpY2xlID0gYXJ0aWNsZUhpc3RvcnlbYXJ0aWNsZUhpc3RvcnkubGVuZ3RoIC0gMl07XG4gICAgICBhcnRpY2xlSGlzdG9yeS5zcGxpY2UoYXJ0aWNsZUhpc3RvcnkubGVuZ3RoIC0gMSwgMSk7XG4gICAgICByZW5kZXJBcnRpY2xlKHByZXZBcnRpY2xlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9KTtcbiAgLyogRU5EOiBDTE9TRSBBUlRJQ0xFIEFORCBHRVQgQkFDSyBUTyBQUkVWSU9VUyBTQ1JFRU4gKi9cbiAgbGV0IGdldE1lbnVVUkwgPSBgJHtkb2NzVVJMfXdwLWpzb24vZmxvX2FwaS92MS9tZW51cy8/c2x1Zz0ke3RoZW1lU2x1Z31gO1xuICBsZXQgbWVudU9iaiA9IFwiXCI7XG4gIC8vIGZldGNoKGdldE1lbnVVUkwpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gIC8vICAgcmVzcG9uc2UuanNvbigpLnRoZW4oKHJlc3BvbnNlSlNPTikgPT4ge1xuICAvL1xuICAvLyAgICAgaWYocmVzcG9uc2VKU09OLmxlbmd0aCkge1xuICAvL1xuICAvLyAgICAgICBtZW51T2JqID0gcmVzcG9uc2VKU09OO1xuICAvLyAgICAgICBsZXQgbWVudVdyYXAgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKGAke2RvdGJ9X19hbGwtYXJ0aWNsZXMtbWVudWApO1xuICAvLyAgICAgICBtZW51V3JhcC5pbm5lckhUTUwgPSBtZW51T2JqO1xuICAvL1xuICAvLyAgICAgICAvKiBTVEFSVDogRFJPUERPV04gVE9HR0xFUyAqL1xuICAvLyAgICAgICAgIGxldCBtZW51SXRlbVdpdGhEcm9wZG93biA9ICQoYCR7ZG90Yn0gLm1lbnUgLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gPiBhYCk7XG4gIC8vICAgICAgICAgbWVudUl0ZW1XaXRoRHJvcGRvd24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgLy8gICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIC8vICAgICAgICAgICBsZXQgc3ViTWVudSA9ICQodGhpcykuc2libGluZ3MoJy5zdWItbWVudScpO1xuICAvLyAgICAgICAgICAgc3ViTWVudS5zbGlkZVRvZ2dsZSgnMzUwJywgZnVuY3Rpb24oKSB7XG4gIC8vICAgICAgICAgICAgIGxldCBjaGlsZHJlblN1Yk1lbnVzID0gJCh0aGlzKS5maW5kKCcuc3VibWVudS1vcGVuID4gLnN1Yi1tZW51Jyk7XG4gIC8vICAgICAgICAgICAgIGNoaWxkcmVuU3ViTWVudXMuZWFjaChmdW5jdGlvbigpIHtcbiAgLy8gICAgICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgLy8gICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdzdWJtZW51LW9wZW4nKTtcbiAgLy8gICAgICAgICAgICAgfSk7XG4gIC8vICAgICAgICAgICB9KTtcbiAgLy8gICAgICAgICAgICQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoJ3N1Ym1lbnUtb3BlbicpO1xuICAvLyAgICAgICAgIH0pO1xuICAvLyAgICAgICAvKiBFTkQ6IERST1BET1dOIFRPR0dMRVMgKi9cbiAgLy9cbiAgLy8gICAgICAgLyogU1RBUlQ6IEFSVElDTEVTIFdJVEhJTiBQT1BVUCAqL1xuICAvLyAgICAgICAgIGxldCBhcnRpY2xlTGluayA9ICQoYCR7ZG90Yn0gLm1lbnUgLm1lbnUtaXRlbTpub3QoLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4pID4gYWApO1xuICAvLyAgICAgICAgIGFydGljbGVMaW5rLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gIC8vICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyAgICAgICAgICAgbGV0IGFydGljbGVVUkwgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgLy8gICAgICAgICAgICQodGhpcykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiZmxvLWR1YWwtcmluZ1wiPjwvZGl2PmApO1xuICAvLyAgICAgICAgICAgZmV0Y2hBbmRSZW5kZXJBcnRpY2xlKGFydGljbGVVUkwsIHRydWUpO1xuICAvLyAgICAgICAgIH0pO1xuICAvLyAgICAgICAvKiBFTkQ6IEFSVElDTEVTIFdJVEhJTiBQT1BVUCAqL1xuICAvLyAgICAgfVxuICAvLyAgIH0pO1xuICAvLyB9KTtcblxuICAkLmdldChnZXRNZW51VVJMLCBmdW5jdGlvbihyZXNwb25zZUpTT04pIHtcbiAgICBpZiAocmVzcG9uc2VKU09OLmxlbmd0aCkge1xuICAgICAgbWVudU9iaiA9IHJlc3BvbnNlSlNPTjtcbiAgICAgIGxldCBtZW51V3JhcCA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYCR7ZG90Yn1fX2FsbC1hcnRpY2xlcy1tZW51YCk7XG4gICAgICBtZW51V3JhcC5pbm5lckhUTUwgPSBtZW51T2JqO1xuXG4gICAgICAvKiBTVEFSVDogRFJPUERPV04gVE9HR0xFUyAqL1xuICAgICAgbGV0IG1lbnVJdGVtV2l0aERyb3Bkb3duID0gJChgJHtkb3RifSAubWVudSAubWVudS1pdGVtLWhhcy1jaGlsZHJlbiA+IGFgKTtcbiAgICAgIG1lbnVJdGVtV2l0aERyb3Bkb3duLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IHN1Yk1lbnUgPSAkKHRoaXMpLnNpYmxpbmdzKFwiLnN1Yi1tZW51XCIpO1xuICAgICAgICBzdWJNZW51LnNsaWRlVG9nZ2xlKFwiMzUwXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGxldCBjaGlsZHJlblN1Yk1lbnVzID0gJCh0aGlzKS5maW5kKFwiLnN1Ym1lbnUtb3BlbiA+IC5zdWItbWVudVwiKTtcbiAgICAgICAgICBjaGlsZHJlblN1Yk1lbnVzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgICAgICAgICQodGhpcylcbiAgICAgICAgICAgICAgLnBhcmVudCgpXG4gICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhcInN1Ym1lbnUtb3BlblwiKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgICQodGhpcylcbiAgICAgICAgICAucGFyZW50KClcbiAgICAgICAgICAudG9nZ2xlQ2xhc3MoXCJzdWJtZW51LW9wZW5cIik7XG4gICAgICB9KTtcbiAgICAgIC8qIEVORDogRFJPUERPV04gVE9HR0xFUyAqL1xuXG4gICAgICAvKiBTVEFSVDogQVJUSUNMRVMgV0lUSElOIFBPUFVQICovXG4gICAgICBsZXQgYXJ0aWNsZUxpbmsgPSAkKFxuICAgICAgICBgJHtkb3RifSAubWVudSAubWVudS1pdGVtOm5vdCgubWVudS1pdGVtLWhhcy1jaGlsZHJlbikgPiBhYFxuICAgICAgKTtcbiAgICAgIGFydGljbGVMaW5rLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGFydGljbGVVUkwgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuICAgICAgICAkKHRoaXMpLmFwcGVuZChgPGRpdiBjbGFzcz1cImZsby1kdWFsLXJpbmdcIj48L2Rpdj5gKTtcbiAgICAgICAgZmV0Y2hBbmRSZW5kZXJBcnRpY2xlKGFydGljbGVVUkwsIHRydWUpO1xuICAgICAgfSk7XG4gICAgICAvKiBFTkQ6IEFSVElDTEVTIFdJVEhJTiBQT1BVUCAqL1xuICAgIH1cbiAgfSk7XG5cbiAgLyogU1RBUlQ6IHB1bGwgcmVjb21tZW5kZWQgcmVzb3VyY2VzICovXG5cbiAgZnVuY3Rpb24gZmV0Y2hSZWNvbW1lbmRlZChjdXJyZW50UmVjb21tZW5kZWRBcnRpY2xlcyA9IFtdKSB7XG4gICAgLy8gdXNlIGlkcyBhbmQgZmV0Y2gsIHNpbmNlIG1lbnUgaXRlbSBpZHMgYXJlIGRpZmZlcmVudCBmcm9tIHRoZW1lIHRvIHRoZW1lXG4gICAgbGV0IGFsbEl0ZW1JZHMgPSBjdXJyZW50UmVjb21tZW5kZWRBcnRpY2xlcy5qb2luKFwiLFwiKTtcbiAgICBsZXQgZmV0Y2hVUkwgPSBgJHtkb2NzVVJMfXdwLWpzb24vZmxvX2FwaS92MS9wb3N0cy8/aWRzPSR7YWxsSXRlbUlkc30mcG9zdHNfcGVyX3BhZ2U9JHtcbiAgICAgIGN1cnJlbnRSZWNvbW1lbmRlZEFydGljbGVzLmxlbmd0aFxuICAgIH1gO1xuXG4gICAgZmV0Y2goZmV0Y2hVUkwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4ocmVzcG9uc2VKU09OID0+IHtcbiAgICAgICAgLy8gc29ydCByZXNwb25zZSBzbyB0aGF0IGl0ZW1zIGFyZSBpbiB0aGUgc2FtZSBvcmRlciBhcyBzcGVjaWZpZWQgaW4gdGhlIG9yaWdpbmFsIGFycmF5XG4gICAgICAgIHJlc3BvbnNlSlNPTi5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgbGV0IGFJbmRleCA9IGN1cnJlbnRSZWNvbW1lbmRlZEFydGljbGVzLmluZGV4T2YoYS5wb3N0X2lkKTtcbiAgICAgICAgICBsZXQgYkluZGV4ID0gY3VycmVudFJlY29tbWVuZGVkQXJ0aWNsZXMuaW5kZXhPZihiLnBvc3RfaWQpO1xuXG4gICAgICAgICAgaWYgKGFJbmRleCA+IGJJbmRleCkgcmV0dXJuIDE7XG4gICAgICAgICAgaWYgKGJJbmRleCA+IGFJbmRleCkgcmV0dXJuIC0xO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNwb25zZUpTT04uZm9yRWFjaChyZWNvbW1lbmRlZEl0ZW0gPT4ge1xuICAgICAgICAgIC8vIHN0cmlwIGh0bWwgdGFncyBmcm9tIHRleHQgY29udGVudCBhbmQgZ2V0IG9ubHkgZmlyc3QgMTUwIGNoYXJhY3RlcnNcbiAgICAgICAgICBsZXQgcmVjb21tZW5kZWRJdGVtRXhjZXJwdFRleHQgPSBcIlwiO1xuICAgICAgICAgIGlmIChyZWNvbW1lbmRlZEl0ZW0udGV4dF9jb250ZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlY29tbWVuZGVkSXRlbUV4Y2VycHRUZXh0ID1cbiAgICAgICAgICAgICAgdGV4dGlmeShyZWNvbW1lbmRlZEl0ZW0udGV4dF9jb250ZW50KS5sZW5ndGggPiAxNTBcbiAgICAgICAgICAgICAgICA/IHRleHRpZnkocmVjb21tZW5kZWRJdGVtLnRleHRfY29udGVudCkuc2xpY2UoMCwgMTUwKSArIFwiLi4uXCJcbiAgICAgICAgICAgICAgICA6IHRleHRpZnkocmVjb21tZW5kZWRJdGVtLnRleHRfY29udGVudCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIHJlY29tbWVuZGVkSXRlbS5hY2Yuc2VjdGlvbnMgJiZcbiAgICAgICAgICAgIHJlY29tbWVuZGVkSXRlbS5hY2Yuc2VjdGlvbnNbMF0uY29udGVudC5sZW5ndGggPiAwXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICByZWNvbW1lbmRlZEl0ZW1FeGNlcnB0VGV4dCA9XG4gICAgICAgICAgICAgIHRleHRpZnkocmVjb21tZW5kZWRJdGVtLmFjZi5zZWN0aW9uc1swXS5jb250ZW50KS5sZW5ndGggPiAxNTBcbiAgICAgICAgICAgICAgICA/IHRleHRpZnkocmVjb21tZW5kZWRJdGVtLmFjZi5zZWN0aW9uc1swXS5jb250ZW50KS5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMTUwXG4gICAgICAgICAgICAgICAgICApICsgXCIuLi5cIlxuICAgICAgICAgICAgICAgIDogdGV4dGlmeShyZWNvbW1lbmRlZEl0ZW0uYWNmLnNlY3Rpb25zWzBdLmNvbnRlbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCByZWNvbW1lbmRlZE1lbnVJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICAgICAgICAgIHJlY29tbWVuZGVkTWVudUl0ZW0uY2xhc3NOYW1lID0gYCR7Yn1fX3JlY29tbWVuZGVkLW1lbnUtaXRlbSAke2J9X19yZWNvbW1lbmRlZC1tZW51LWl0ZW0tLSR7XG4gICAgICAgICAgICByZWNvbW1lbmRlZEl0ZW0ucG9zdF9pZFxuICAgICAgICAgIH1gO1xuXG4gICAgICAgICAgcmVjb21tZW5kZWRNZW51SXRlbS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke2J9X19yZWNvbW1lbmRlZC1tZW51LWl0ZW0tLXRpdGxlXCI+JHtcbiAgICAgICAgICAgIHJlY29tbWVuZGVkSXRlbS5wb3N0X3RpdGxlXG4gICAgICAgICAgfTwvc3Bhbj5gO1xuICAgICAgICAgIGlmIChyZWNvbW1lbmRlZEl0ZW1FeGNlcnB0VGV4dC5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmVjb21tZW5kZWRNZW51SXRlbS5pbm5lckhUTUwgKz0gYDxzcGFuIGNsYXNzPVwiJHtifV9fcmVjb21tZW5kZWQtbWVudS1pdGVtLS1leGNlcnB0XCI+JHtyZWNvbW1lbmRlZEl0ZW1FeGNlcnB0VGV4dH08L3NwYW4+YDtcbiAgICAgICAgICByZWNvbW1lbmRlZE1lbnVJdGVtLmlubmVySFRNTCArPSBgPGkgY2xhc3M9XCIke2J9LWljb24tYXJyb3ctcmlnaHQgJHtifV9fcmVjb21tZW5kZWQtbWVudS1pdGVtLS1pY29uXCI+PC9pPmA7XG5cbiAgICAgICAgICAkKGAke2RvdGJ9X19yZWNvbW1lbmRlZC1hcnRpY2xlcy0taXRlbXNgKS5hcHBlbmQoXG4gICAgICAgICAgICAkKHJlY29tbWVuZGVkTWVudUl0ZW0pXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJlY29tbWVuZGVkTWVudUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gJCh0aGlzKS5pbmRleCgpO1xuICAgICAgICAgICAgbGV0IGFydGljbGVUb1JlbmRlciA9IHJlc3BvbnNlSlNPTltpbmRleF07XG4gICAgICAgICAgICByZW5kZXJBcnRpY2xlKGFydGljbGVUb1JlbmRlciwgdHJ1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoYCR7ZG90Yn1fX3JlY29tbWVuZGVkLWxvYWRpbmdgKS5mYWRlT3V0KFwiZmFzdFwiLCAoKSA9PiB7XG4gICAgICAgICAgJChgJHtkb3RifV9fcmVjb21tZW5kZWQtbG9hZGluZ2ApLnJlbW92ZSgpO1xuICAgICAgICAgICQoYCR7ZG90Yn1fX3JlY29tbWVuZGVkLWFydGljbGVzLS1pdGVtc2ApLmZhZGVJbihcImZhc3RcIik7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB0aGUgdmFyIGJlbG93IHdpbGwgYmUgdGhlIHBhZ2UgdHlwZSB3aGVyZSB0aGUgdXNlciBjdXJyZW50bHkgaXMgYXQuXG4gIC8vIHdlJ2xsIGhhdmUgYSBjb25kaXRpb25hbCBhcnRpY2xlIGxpc3QgdG8gcHJvdmlkZSBkZXBlbmRpbmcgb24gdGhlIGxvY2F0aW9uOiAoY2hlY2sgcmVjb21tZW5kZWRJdGVtSWRzTGlzdCB2YXJpYWJsZSlcbiAgbGV0IGN1cnJlbnRWaWV3QXJ0aWNsZXMgPSByZWNvZ25pemVEYXNoYm9hcmRWaWV3KCk7XG4gIGZldGNoUmVjb21tZW5kZWQoY3VycmVudFZpZXdBcnRpY2xlcyk7XG5cbiAgLyogRU5EOiBwdWxsIHJlY29tbWVuZGVkIHJlc291cmNlcyAqL1xuXG4gIGZ1bmN0aW9uIGhhbmRsZUFydGljbGVMaW5rQ2xpY2soZSwgbGluaykge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAobGluay5oYXNBdHRyaWJ1dGUoXCJocmVmXCIpICYmIGxpbmsuYXR0cmlidXRlcy5ocmVmLnZhbHVlLmxlbmd0aCkge1xuICAgICAgbGV0IHBhcmVudEFydGljbGVXcmFwID0gZS50YXJnZXQuY2xvc2VzdChgJHtkb3RifV9fc2luZ2xlLWFydGljbGUtd3JhcGApO1xuICAgICAgcGFyZW50QXJ0aWNsZVdyYXAucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYCR7ZG90Yn1fX2FydGljbGUtd3JhcC0tY29udGVudGBcbiAgICAgICkuc3R5bGUub3BhY2l0eSA9IFwiMC4zXCI7XG4gICAgICBwYXJlbnRBcnRpY2xlV3JhcC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgJHtkb3RifV9fYXJ0aWNsZS13cmFwLS1jb250ZW50YFxuICAgICAgKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICBmZXRjaEFuZFJlbmRlckFydGljbGUobGluay5hdHRyaWJ1dGVzLmhyZWYudmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUJyZWFkY3J1bWJDbGljayhlKSB7XG4gICAgbGV0IGJyZWFkY3J1bWIgPSBlLnRhcmdldDtcbiAgICBsZXQgYnJlYWRjcnVtYkluZGV4ID0gYnJlYWRjcnVtYi5hdHRyaWJ1dGVzW1wiZGF0YS1pbmRleFwiXS52YWx1ZTtcbiAgICBsZXQgYXJ0aWNsZVRvUmVuZGVyID0gYXJ0aWNsZUhpc3RvcnlbYnJlYWRjcnVtYkluZGV4XTtcbiAgICBicmVhZGNydW1iSW5kZXgrKztcbiAgICBsZXQgbmV3SGlzdG9yeSA9IGFydGljbGVIaXN0b3J5LnNsaWNlKDAsIGJyZWFkY3J1bWJJbmRleCk7XG4gICAgYXJ0aWNsZUhpc3RvcnkgPSBuZXdIaXN0b3J5O1xuICAgIHJlbmRlckFydGljbGUoYXJ0aWNsZVRvUmVuZGVyLCBmYWxzZSwgdHJ1ZSk7XG4gIH1cblxuICAvLyBhcnRpY2xlVG9SZW5kZXIgLSAgcGFyYW1ldGVyIHJlcHJlc2VudHMgdGhlIHBvc3Qgb2JqZWN0IHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlclxuICAvLyBjbGVhckhpc3RvcnkgLSBpZiB0aGUgcG9zdCBpcyBhY2Nlc3NlZCBmcm9tIGEgbWFpbiB3aW5kb3csIGJyZWFkY3J1bWJzIG5lZWQgdG8gYmUgY2xlYXJlZFxuICAvLyBza2lwSGlzdG9yeSAtIHRoZXJlIGFyZSBjYXNlcyB3aGVuIHdlIGRvbid0IG5lZWQgdG8gcHVzaCBpdGVtcyB0byBicmVhZGNydW1icywgc28gd2Ugc2tpcCB0aGlzIHZpYSB0aGlzIHBhcmFtZXRlciBwYXNzZWQgYXMgYSBib29sZWFuIHRydWUgdmFsdWVcbiAgZnVuY3Rpb24gcmVuZGVyQXJ0aWNsZShcbiAgICBhcnRpY2xlVG9SZW5kZXIsXG4gICAgY2xlYXJIaXN0b3J5ID0gZmFsc2UsXG4gICAgc2tpcEhpc3RvcnkgPSBmYWxzZVxuICApIHtcbiAgICBsZXQgYXJ0aWNsZVdyYXAgPSAkKGAke2RvdGJ9X19zaW5nbGUtYXJ0aWNsZS13cmFwYCk7XG4gICAgYXJ0aWNsZVdyYXAuZmluZChgJHtkb3RifV9fYXJ0aWNsZS13cmFwLS1jb250ZW50YCkucmVtb3ZlKCk7XG5cbiAgICBsZXQgYXJ0aWNsZVVSTCA9IGAke2RvY3NVUkx9JHt0aGVtZVNsdWd9LyMke2FydGljbGVUb1JlbmRlci5zbHVnfWA7XG5cbiAgICBsZXQgYXJ0aWNsZUNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFydGljbGVDb250ZW50LmNsYXNzTmFtZSA9IGAke2J9X19hcnRpY2xlLXdyYXAtLWNvbnRlbnRgO1xuICAgIGFydGljbGVDb250ZW50LmlubmVySFRNTCA9IGBcbiAgICAgICAgPGgyIGNsYXNzPVwiJHtifV9fYXJ0aWNsZS13cmFwLS10aXRsZVwiPiR7YXJ0aWNsZVRvUmVuZGVyLnBvc3RfdGl0bGV9PC9oMj5cbiAgICAgICAgPGEgaHJlZj1cIiR7YXJ0aWNsZVVSTH1cIiB0aXRsZT1cIk9wZW4gaW4gbmV3IHRhYlwiIHRhcmdldD1cIl9ibGFua1wiIGNsYXNzPVwiJHtifV9fYXJ0aWNsZS13cmFwLS1kaXJlY3QtbGlua1wiPlxuICAgICAgICAgIDxpIGNsYXNzPVwiZmxvLXN1cHBvcnQtaWNvbi1saW5rXCI+PC9pPlxuICAgICAgICA8L2E+XG4gICAgICAgIDxkaXYgY2xhc3M9XCIke2J9X19hcnRpY2xlLXdyYXAtLXRleHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiJHtifV9fYXJ0aWNsZS13cmFwLS13cC1jb250ZW50XCI+XG4gICAgICAgICAgICAke2FydGljbGVUb1JlbmRlci50ZXh0X2NvbnRlbnR9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cIiR7Yn1fX2FydGljbGUtd3JhcC0tc2VjdGlvbnNcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICBgO1xuXG4gICAgbGV0IGFydGljbGVTZWN0aW9ucyA9IGFydGljbGVUb1JlbmRlci5hY2Yuc2VjdGlvbnM7XG5cbiAgICBpZiAoYXJ0aWNsZVNlY3Rpb25zICYmIGFydGljbGVTZWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGxldCBhcnRpY2xlU2VjdGlvbnNXcmFwID0gYXJ0aWNsZUNvbnRlbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgYCR7ZG90Yn1fX2FydGljbGUtd3JhcC0tc2VjdGlvbnNgXG4gICAgICApO1xuICAgICAgYXJ0aWNsZVNlY3Rpb25zLmZvckVhY2goYXJ0aWNsZVNlY3Rpb24gPT4ge1xuICAgICAgICBsZXQgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuICAgICAgICBzZWN0aW9uVGl0bGUuY2xhc3NOYW1lID0gYCR7Yn1fX2FydGljbGUtc2VjdGlvbi10aXRsZWA7XG4gICAgICAgIHNlY3Rpb25UaXRsZS5pbm5lckhUTUwgPSBhcnRpY2xlU2VjdGlvbi50aXRsZTtcbiAgICAgICAgYXJ0aWNsZVNlY3Rpb25zV3JhcC5hcHBlbmRDaGlsZChzZWN0aW9uVGl0bGUpO1xuXG4gICAgICAgIGxldCBzZWN0aW9uQ29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHNlY3Rpb25Db250ZW50LmNsYXNzTmFtZSA9IGAke2J9X19hcnRpY2xlLXNlY3Rpb24tY29udGVudGA7XG4gICAgICAgIHNlY3Rpb25Db250ZW50LmlubmVySFRNTCA9IGFydGljbGVTZWN0aW9uLmNvbnRlbnQ7XG4gICAgICAgIGFydGljbGVTZWN0aW9uc1dyYXAuYXBwZW5kQ2hpbGQoc2VjdGlvbkNvbnRlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGNsZWFySGlzdG9yeSkgYXJ0aWNsZUhpc3RvcnkgPSBbXTtcbiAgICBpZiAoIXNraXBIaXN0b3J5KSBhcnRpY2xlSGlzdG9yeS5wdXNoKGFydGljbGVUb1JlbmRlcik7XG5cbiAgICBsZXQgYnJlYWRjcnVtYnNXcmFwID0gcG9wdXAucXVlcnlTZWxlY3RvcihgJHtkb3RifV9fYnJlYWRjcnVtYnMtd3JhcGApO1xuICAgIGJyZWFkY3J1bWJzV3JhcC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgLy8gYWRkIHRoZSBicmVhZGNydW1ic1xuICAgIGFydGljbGVIaXN0b3J5LmZvckVhY2goKHBvc3RGcm9tSGlzdG9yeSwgaW5kZXgpID0+IHtcbiAgICAgIGlmIChpbmRleCAhPT0gMCAmJiBpbmRleCA8PSBhcnRpY2xlSGlzdG9yeS5sZW5ndGggLSAxKVxuICAgICAgICBicmVhZGNydW1ic1dyYXAuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwiJHtifV9fYnJlYWRjcnVtYi1kZWxpbWl0ZXJcIj4vPC9kaXY+YDtcbiAgICAgIGJyZWFkY3J1bWJzV3JhcC5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgIDxkaXYgZGF0YS1pbmRleD1cIiR7aW5kZXh9XCIgY2xhc3M9XCIke2J9X19icmVhZGNydW1iXCI+XG4gICAgICAgICAgICAke3Bvc3RGcm9tSGlzdG9yeS5wb3N0X3RpdGxlfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgO1xuICAgIH0pO1xuXG4gICAgbGV0IGJyZWFkY3J1bWJMaW5rcyA9IGJyZWFkY3J1bWJzV3JhcC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgYCR7ZG90Yn1fX2JyZWFkY3J1bWI6bm90KDpsYXN0LWNoaWxkKWBcbiAgICApO1xuICAgIGJyZWFkY3J1bWJMaW5rcy5mb3JFYWNoKGJyZWFkY3J1bWIgPT5cbiAgICAgIGJyZWFkY3J1bWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZUJyZWFkY3J1bWJDbGljaylcbiAgICApO1xuXG4gICAgbGV0IGFydGljbGVDb250ZW50VGV4dFdyYXAgPSBhcnRpY2xlQ29udGVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgYCR7ZG90Yn1fX2FydGljbGUtd3JhcC0tdGV4dGBcbiAgICApO1xuICAgIGxldCBhcnRpY2xlQ29udGVudExpbmtzID0gYXJ0aWNsZUNvbnRlbnRUZXh0V3JhcC5xdWVyeVNlbGVjdG9yQWxsKFwiYVwiKTtcblxuICAgIGFydGljbGVDb250ZW50TGlua3MuZm9yRWFjaChhcnRpY2xlQ29udGVudExpbmsgPT4ge1xuICAgICAgbGV0IGFydGljbGVMaW5rSHJlZiA9IFwiXCI7XG4gICAgICBsZXQgbGlua1RvRG9jcyA9IGZhbHNlO1xuICAgICAgaWYgKGFydGljbGVDb250ZW50TGluay5hdHRyaWJ1dGVzLmhyZWYpIHtcbiAgICAgICAgYXJ0aWNsZUxpbmtIcmVmID0gYXJ0aWNsZUNvbnRlbnRMaW5rLmF0dHJpYnV0ZXMuaHJlZi52YWx1ZTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGFydGljbGVMaW5rSHJlZi5pbmNsdWRlcyhcIi8jXCIpICYmXG4gICAgICAgICAgYXJ0aWNsZUxpbmtIcmVmLmluY2x1ZGVzKFwiZG9jc1wiKSAmJlxuICAgICAgICAgIGFydGljbGVMaW5rSHJlZi5pbmNsdWRlcyhcImZsb3RoZW1lc1wiKVxuICAgICAgICApXG4gICAgICAgICAgbGlua1RvRG9jcyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChhcnRpY2xlTGlua0hyZWYubGVuZ3RoICYmIGxpbmtUb0RvY3MpXG4gICAgICAgIGFydGljbGVDb250ZW50TGluay5jbGFzc0xpc3QuYWRkKGAke2J9X19uYXYtd2l0aGluLXBvcHVwYCk7XG4gICAgfSk7XG5cbiAgICBsZXQgbGlua3NGb3JJbnRlcm5hbE5hdmlnYXRpb24gPSBhcnRpY2xlQ29udGVudFRleHRXcmFwLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICBgJHtkb3RifV9fbmF2LXdpdGhpbi1wb3B1cGBcbiAgICApO1xuICAgIFsuLi5saW5rc0ZvckludGVybmFsTmF2aWdhdGlvbl0uZm9yRWFjaChsaW5rID0+XG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PlxuICAgICAgICBoYW5kbGVBcnRpY2xlTGlua0NsaWNrKGV2ZW50LCBsaW5rKVxuICAgICAgKVxuICAgICk7XG5cbiAgICBhcnRpY2xlV3JhcC5hcHBlbmQoYXJ0aWNsZUNvbnRlbnQpO1xuICAgIG9wZW5BcnRpY2xlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBmZXRjaEFuZFJlbmRlckFydGljbGUodXJsLCBjbGVhckhpc3RvcnkgPSBmYWxzZSkge1xuICAgIGxldCBhcnRpY2xlVVJMID0gdXJsLnJlcGxhY2UoL1xcLyQvLCBcIlwiKTtcbiAgICBhcnRpY2xlVVJMID0gYXJ0aWNsZVVSTC5yZXBsYWNlKFwiI1wiLCBcIlwiKTtcbiAgICBsZXQgYXJ0aWNsZVNsdWcgPSBhcnRpY2xlVVJMLnN1YnN0cihhcnRpY2xlVVJMLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpO1xuICAgIGxldCBmZXRjaFBvc3RVUkwgPSBgJHtkb2NzVVJMfXdwLWpzb24vZmxvX2FwaS92MS9wb3N0cy8/c2x1Zz0ke2FydGljbGVTbHVnfWA7XG5cbiAgICBmZXRjaChmZXRjaFBvc3RVUkwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4ocmVzcG9uc2VKU09OID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlSlNPTiAmJiByZXNwb25zZUpTT04ubGVuZ3RoKSB7XG4gICAgICAgICAgcmVuZGVyQXJ0aWNsZShyZXNwb25zZUpTT05bMF0sIGNsZWFySGlzdG9yeSk7XG4gICAgICAgICAgJChgLmZsby1kdWFsLXJpbmdgKS5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUT0RPXG4gICAgICAgICAgbGV0IG5vdGljZVdyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2RvdGJ9X19ub3RpY2Utd3JhcGApO1xuICAgICAgICAgIG5vdGljZVdyYXAuaW5uZXJIVE1MID1cbiAgICAgICAgICAgIFwiT29wcywgdGhlIHJlc291cmNlIHlvdSByZXF1ZXN0ZWQgY291bGQgbm90IGJlIGZvdW5kXCI7XG4gICAgICAgICAgJChub3RpY2VXcmFwKS5mYWRlSW4oXCJmYXN0XCIsICgpID0+IHtcbiAgICAgICAgICAgICQoYCR7ZG90Yn1fX2FydGljbGUtd3JhcC0tY29udGVudGApLmNzcyh7XG4gICAgICAgICAgICAgIG9wYWNpdHk6IFwiMVwiLFxuICAgICAgICAgICAgICBcInBvaW50ZXItZXZlbnRzXCI6IFwiYXV0b1wiXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgJChub3RpY2VXcmFwKS5mYWRlT3V0KFwiZmFzdFwiKTtcbiAgICAgICAgICAgIH0sIDE1MDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZW5BcnRpY2xlKCkge1xuICAgICQoYCR7ZG90Yn1fX2FjdGl2ZS10YWI6bm90KCR7ZG90Yn1fX3NpbmdsZS1hcnRpY2xlLXdyYXApYClcbiAgICAgIC5hZGRDbGFzcyhgJHtifV9fcHJldmlvdXNseS1hY3RpdmUtdGFiYClcbiAgICAgIC5yZW1vdmVDbGFzcyhgJHtifV9fYWN0aXZlLXRhYmApO1xuICAgICQoYCR7ZG90Yn1fX3NpbmdsZS1hcnRpY2xlLXdyYXBgKS5hZGRDbGFzcyhgJHtifV9fYWN0aXZlLXRhYmApO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VBcnRpY2xlKCkge1xuICAgICQoYCR7ZG90Yn1fX3NpbmdsZS1hcnRpY2xlLXdyYXBgKS5yZW1vdmVDbGFzcyhgJHtifV9fYWN0aXZlLXRhYmApO1xuICAgICQoYCR7ZG90Yn1fX3ByZXZpb3VzbHktYWN0aXZlLXRhYmApXG4gICAgICAuYWRkQ2xhc3MoYCR7Yn1fX2FjdGl2ZS10YWJgKVxuICAgICAgLnJlbW92ZUNsYXNzKGAke2J9X19wcmV2aW91c2x5LWFjdGl2ZS10YWJgKTtcbiAgfVxuXG4gIC8qIEVORDogQ1JFQVRJTkcgUE9QVVAgTUFSS1VQICovXG5cbiAgbGV0ICRwb3B1cCA9ICQocG9wdXApO1xuICBwb3B1cFRyaWdnZXIub24oXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgJHBvcHVwLmFkZENsYXNzKGAke2J9X19wb3B1cC12aXNpYmxlYCk7XG5cbiAgICBpZiAoJHBvcHVwLmZpbmQoaHNUYWIpLmZpbmQoXCIjaHMtYmVhY29uXCIpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLyogU1RBUlQ6IElOSVQgSFMgQkVBQ09OICovXG5cbiAgICAgIC8vIGluaXRpYWxpemUgT05MWSBhZnRlciBtb3ZpbmcgdGhlIGJlYWNvbiB3cmFwIHdoZXJlIG5lY2Vzc2FyeSAoaW4gdGhlIHBvcHVwKVxuICAgICAgaHNUYWIuYXBwZW5kKCQoXCIjaHMtYmVhY29uXCIpKTtcbiAgICAgIEhTLmJlYWNvbi5pbml0KCk7XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIEhTLmJlYWNvbi5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGlzLm9wZW4oKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgYmVhY29uSWZyYW1lID0gZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJocy1iZWFjb25cIilcbiAgICAgICAgICAgICAgICAuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpZnJhbWVcIilbMF0sXG4gICAgICAgICAgICAgIGRvYyA9IGJlYWNvbklmcmFtZS5jb250ZW50RG9jdW1lbnQgfHwgYmVhY29uSWZyYW1lLmNvbnRlbnRXaW5kb3c7XG4gICAgICAgICAgICBpZiAoZG9jLmRvY3VtZW50KSBkb2MgPSBkb2MuZG9jdW1lbnQ7XG5cbiAgICAgICAgICAgIHZhciBfdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgaWYgKGRvYy5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoX3RpbWVyKTtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgYmVhY29uSWZyYW1lQ29udGVudHMgPSBiZWFjb25JZnJhbWUuY29udGVudERvY3VtZW50LmJvZHk7XG4gICAgICAgICAgICAgICAgICBsZXQgYmVhY29uSWZyYW1lSGVhZFRhZyA9IGJlYWNvbklmcmFtZS5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgICAgICAgICAgICAgIGxldCBzdHlsZVRhZ0ZvckJlYWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgIFwiLmZsby1iZWFjb24tc3R5bGVzXCJcbiAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgIGxldCBpbnN0cnVjdGlvbnNIVE1MID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICAgIGluc3RydWN0aW9uc0hUTUwuY2xhc3NOYW1lID0gXCJmbG8tdGlja2V0LWhlYWRlclwiO1xuICAgICAgICAgICAgICAgICAgaW5zdHJ1Y3Rpb25zSFRNTC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzdWJtaXQtdGlja2V0LXRpdGxlXCI+Q29udGFjdCBDdXN0b21lciBDYXJlPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3VibWl0LXRpY2tldC1zdWJ0aXRsZVwiPklmIHlvdSBjYW5ub3QgZmluZCBhbnN3ZXJzIHRvIHlvdXIgcXVlc3Rpb25zIHdpdGhpbiB0aGUgZG9jdW1lbnRhdGlvbiwgZmVlbCBmcmVlIHRvIGNvbnRhY3QgdXMgYW5kIHdlIHdpbGwgZ2V0IGJhY2sgdG8geW91IGFzIHNvb24gYXMgcG9zc2libGUuPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICBgO1xuXG4gICAgICAgICAgICAgICAgICBsZXQgZmlsZVVwbG9hZEljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKTtcbiAgICAgICAgICAgICAgICAgIGZpbGVVcGxvYWRJY29uLmNsYXNzTmFtZSA9IGAke2J9LWljb24tZmlsZWA7XG4gICAgICAgICAgICAgICAgICBsZXQgZmlsZVVwbG9hZFRyaWdnZXIgPSBiZWFjb25JZnJhbWVDb250ZW50cy5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgICBcIi5jb250YWN0LS1zdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgbGV0IGhzU3VjY2Vzc0ljb24gPSBiZWFjb25JZnJhbWVDb250ZW50cy5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgICBcIi5jb250YWN0LXN1Y2Nlc3MtLWljb25cIlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICQoaHNTdWNjZXNzSWNvbikucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgICAgICAgIGxldCBzdWNjZXNzTWVzc2FnZVdyYXAgPSBiZWFjb25JZnJhbWVDb250ZW50cy5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgICBcIi5jb250YWN0LXN1Y2Nlc3NcIlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NNZXNzYWdlV3JhcC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCIke2J9LWljb24tbWFpbC1zZW50XCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiJHtifV9fY29udGFjdC1zdWNjZXNzLS10aXRsZVwiPk1lc3NhZ2UgU2VudDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIiR7Yn1fX2NvbnRhY3Qtc3VjY2Vzcy0tZGVzY3JpcHRpb25cIj5TZW5kIHVzIGEgbWVzc2FnZSBhbmQgcmVhZCBvdXIgYW5zd2VyIHdoZW4gaXTigJlzIGNvbnZlbmllbnQgZm9yIHlvdTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9kb2NzLmZsb3RoZW1lcy5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCIgY2xhc3M9XCIke2J9X19jb250YWN0LXN1Y2Nlc3MtLWRvY3MtYnV0dG9uXCI+VmlldyBEb2NzPC9hPlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgICAgbGV0IGluc3RydWN0aW9uc1dyYXAgPSBiZWFjb25JZnJhbWVDb250ZW50cy5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgICAgICAgICBcIi5jb250YWN0LS1pbnN0cnVjdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgYmVhY29uSWZyYW1lSGVhZFRhZy5hcHBlbmRDaGlsZChzdHlsZVRhZ0ZvckJlYWNvbik7XG4gICAgICAgICAgICAgICAgICBpbnN0cnVjdGlvbnNXcmFwLmFwcGVuZENoaWxkKGluc3RydWN0aW9uc0hUTUwpO1xuICAgICAgICAgICAgICAgICAgZmlsZVVwbG9hZFRyaWdnZXIucHJlcGVuZChmaWxlVXBsb2FkSWNvbik7XG5cbiAgICAgICAgICAgICAgICAgIGxldCB1c2VyRGF0YSA9IHt9O1xuICAgICAgICAgICAgICAgICAgaWYgKHVzZVRlY2huaWNhbERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlckRhdGEgPSBKU09OLnBhcnNlKGZsb19zdXBwb3J0X3VzZXJfZGF0YSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB1c2VyRGF0YS5ub2RhdGEgPSBcIkFkZGl0aW9uYWwgaW5mb3JtYXRpb24gdW5hdmFpbGFibGUuXCI7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBIUy5iZWFjb24uaWRlbnRpZnkodXNlckRhdGEpO1xuXG4gICAgICAgICAgICAgICAgICAvKiBTVEFSVDogSU1HVVIgVVBMT0FERVIgKi9cbiAgICAgICAgICAgICAgICAgIGxldCBmaWxlVXBsb2FkQWN0aW9ucyA9IGJlYWNvbklmcmFtZUNvbnRlbnRzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gICAgICAgICAgICAgICAgICAgIFwiY29udGFjdC0tYXR0YWNoXCJcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBsZXQgZmlsZVJlbW92ZUFjdGlvbiA9IGZpbGVVcGxvYWRBY3Rpb25zWzBdO1xuICAgICAgICAgICAgICAgICAgbGV0IGZpbGVBZGRBY3Rpb24gPSBmaWxlVXBsb2FkQWN0aW9uc1sxXTtcblxuICAgICAgICAgICAgICAgICAgbGV0IHN1Ym1pdEFjdGlvbnNXcmFwID0gYmVhY29uSWZyYW1lQ29udGVudHMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgICAgICAgICAgXCJjb250YWN0LS1zdWJtaXRcIlxuICAgICAgICAgICAgICAgICAgKVswXTtcblxuICAgICAgICAgICAgICAgICAgbGV0IGZsb0ZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgICAgICAgICAgICAgICBcImZsby1zdXBwb3J0X19pbWd1ci11cGxvYWRlclwiXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgZmxvRmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZXZlbnQgPT5cbiAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc0ltZ3VyRmlsZXMoZXZlbnQudGFyZ2V0LCB1c2VyRGF0YSwgc3VibWl0QWN0aW9uc1dyYXApXG4gICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICBmaWxlQWRkQWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAkKGZsb0ZpbGVJbnB1dCkudHJpZ2dlcihcImNsaWNrXCIpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAvKiBFTkQ6IElNR1VSIFVQTE9BREVSICovXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0sIDEwKTtcblxuICAgICAgLyogRU5EOiBJTklUIEhTIEJFQUNPTiAqL1xuICAgIH1cbiAgfSk7XG5cbiAgJChgJHtkb3RifV9fY2xvc2UtdHJpZ2dlcmApLm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICRwb3B1cC5yZW1vdmVDbGFzcyhgJHtifV9fcG9wdXAtdmlzaWJsZWApO1xuICAgIGlmICgkKFwiYm9keVwiKS5jc3MoXCJwb3NpdGlvblwiKSA9PSBcImZpeGVkXCIgJiYgJCh3aW5kb3cpLndpZHRoKCkgPCA3NjgpXG4gICAgICAkKFwiYm9keVwiKS5jc3MoXCJwb3NpdGlvblwiLCBcIlwiKTtcbiAgfSk7XG5cbiAgLyogU1RBUlQ6IERFVjogT1BFTiBQT1BVUCBBTkQgU0VBUkNIIE9OIFBBR0UgTE9BRCAqL1xuICAvLyBwb3B1cFRyaWdnZXIudHJpZ2dlcihcImNsaWNrXCIpO1xuICAvLyAkKGAke2RvdGJ9X190YWItc3dpdGNoLS1oc2ApLnRyaWdnZXIoJ2NsaWNrJyk7XG4gIC8vIGxldCBxcXEgPSBcInBhZ2UgYnVpbGRlciBjb21wb25lbnRzXCI7XG4gIC8vICRwb3B1cC5maW5kKFwiLmZsby1zdXBwb3J0X19zZWFyY2gtaW5wdXRcIikudmFsKHFxcSk7XG4gIC8vICRwb3B1cC5maW5kKFwiLmZsby1zdXBwb3J0X19zZWFyY2gtYnV0dG9uXCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcbiAgLyogRU5EOiBERVY6IE9QRU4gUE9QVVAgQU5EIFNFQVJDSCBPTiBQQUdFIExPQUQgKi9cbn0pO1xuIiwiZnVuY3Rpb24gcmVjb2duaXplRGFzaGJvYXJkVmlldygpIHtcbiAgXG4gIGxldCByZWNvbW1lbmRlZEl0ZW1JZHNMaXN0ID0ge1xuICAgIFxuICAgICdkZWZhdWx0JzogW1xuICAgICAgNTI0NCwgLy8gJ2FjdGl2YXRpbmctYS10aGVtZSdcbiAgICAgIDUyNjQsIC8vICdob3ctdG8tdXBkYXRlLWEtZmxvdGhlbWUnXG4gICAgICA1Mjk0LCAvLyAnaW5zdGFsbGluZy1wbHVnaW4td3AtcGx1Z2lucy1kaXJlY3RvcnknXG4gICAgICA1MzA3LCAvLyAnY3JlYXRpbmctYS1tZW51J1xuICAgICAgNTQ3NywgLy8gJ3NvY2lhbC1tZWRpYS1tYW5hZ2VtZW50J1xuICAgICAgNjQ2MiwgLy8gJ2Fzc2lnbmluZy1hLWhvbWVwYWdlJ1xuICAgIF0sXG4gICAgXG4gICAgJ2Zsb3RoZW1lJzogW1xuICAgICAgMTA1NjIsIC8vICdnZXR0aW5nLXN0YXJ0ZWQtZnJvbS1zY3JhdGNoJ1xuICAgICAgNTM0NiwgIC8vICdob3ctdG8taW1wb3J0LWRlbW8tY29udGVudCdcbiAgICAgIDU1MTcsICAvLyAnYWRkaW5nLWdvb2dsZS1hbmFseXRpY3MtdG8tbXktd2Vic2l0ZSdcbiAgICAgIDU1MTMsICAvLyAnaG93LXRvLWFkZC1hLWZhdmljb24nXG4gICAgICA1NDU0LCAgLy8gJ2ZvbnQtc3R5bGVzLW1hbmFnZW1lbnQnXG4gICAgICA2MDkwLCAgLy8gJ2Rlc2t0b3AtaGVhZGVyLWNvbXBvbmVudHMnXG4gICAgICA1NDA0LCAgLy8gJ2dsb2JhbC1oZWFkZXItbGF5b3V0J1xuICAgICAgNTM2MCwgIC8vICdtb2JpbGUtaGVhZGVyLXBvcHVwLWxheW91dCdcbiAgICAgIDU1NjMsICAvLyAncGFnZXMtc2V0dGluZ3MnXG4gICAgICA1NDc3LCAgLy8gJ3NvY2lhbC1tZWRpYS1tYW5hZ2VtZW50J1xuICAgICAgNTQyNSwgIC8vICdmb290ZXItc2VjdGlvbnMtb3ZlcnZpZXcnXG4gICAgICA1NDI2LCAgLy8gJ2Zvb3Rlci1zZWN0aW9ucy1yZS1vcmRlcmluZydcbiAgICAgIDU0MjgsICAvLyAnaGlkaW5nLWRpc2FibGluZy1mb290ZXItc2VjdGlvbnMnXG4gICAgICA1NDMzLCAgLy8gJ2dsb2JhbC1mb290ZXItbGF5b3V0J1xuICAgICAgNTQ2MCwgIC8vICd3aGF0LWlzLWEtc3R5bGUta2l0J1xuICAgICAgNTQ2MSwgIC8vICd1c2luZy1zdHlsZS1raXRzJ1xuICAgIF0sXG4gICAgXG4gICAgJ2Rhc2hib2FyZCc6IFtcbiAgICAgIDEwNTYyLCAvLyAnZ2V0dGluZy1zdGFydGVkLWZyb20tc2NyYXRjaCdcbiAgICAgIDUzNDYsICAvLyAnaG93LXRvLWltcG9ydC1kZW1vLWNvbnRlbnQnXG4gICAgICA1MjU1LCAgLy8gJ3N3aXRjaGluZy1hbm90aGVyLWZsb3RoZW1lJ1xuICAgICAgNTMwNywgIC8vICdjcmVhdGluZy1hLW1lbnUnXG4gICAgICAxMDU0NCwgLy8gJ2NyZWF0aW5nLWEtcGFnZSdcbiAgICAgIDEwNTI1LCAvLyAnY3JlYXRpbmctYmxvZy1wb3N0J1xuICAgIF0sXG4gICAgXG4gICAgJ3NsaWRlc2hvdyc6IFtcbiAgICAgIDU1NTUsIC8vICdtYW5hZ2luZy1zbGlkZXNob3dzJ1xuICAgICAgNDEwNSwgLy8gJ2Zsb3RoZW1lcy1pbWFnZS1zaXplcydcbiAgICAgIDYxNTcsIC8vICdjaGFuZ2luZy1oZWFkZXItY29sb3Itc2xpZGVzaG93cydcbiAgICAgIDYzNDAsIC8vICd3aGF0LWlzLWEtcGFnZS1idWlsZGVyJ1xuICAgICAgNTU0MSwgLy8gJ2J1aWxkaW5nLWEtcGFnZS1mcm9tLXNjcmF0Y2gnXG4gICAgXSxcbiAgICBcbiAgICAnZ2FsbGVyeSc6IFtcbiAgICAgIDYyNTgsIC8vICd3aGF0LWlzLWEtZ2FsbGVyeSdcbiAgICAgIDU2MTcsIC8vICdob3ctdG8tY3JlYXRlLWEtZ2FsbGVyeSdcbiAgICAgIDQxMDUsIC8vICdmbG90aGVtZXMtaW1hZ2Utc2l6ZXMnXG4gICAgICA2MjY5LCAvLyAnZ2FsbGVyeS1pbWFnZS11cGxvYWRlcidcbiAgICAgIDU2MjQsIC8vICdtYW5hZ2luZy1nbG9iYWwtZ2FsbGVyeS1sYXlvdXQnXG4gICAgICA1NjI2LCAvLyAnY3VzdG9tLWdhbGxlcnktbGF5b3V0J1xuICAgICAgNTU2MCwgLy8gJ3BvcnRmb2xpby1wYWdlJ1xuICAgICAgNTYxOCwgLy8gJ2NoYW5nZS1wYXJlbnQtc2x1Zy1nYWxsZXJpZXMnXG4gICAgICA2MjY3LCAvLyAnZ2FsbGVyeS13cC1jb250ZW50LWJsb2NrJ1xuICAgIF0sXG4gICAgXG4gICAgJ3Bvc3QnOiBbXG4gICAgICAxMDUyNSwgLy8gJ2NyZWF0aW5nLWJsb2ctcG9zdCdcbiAgICAgIDU1ODgsICAvLyAndXBsb2FkaW5nLWltYWdlcy1wb3N0LWNvbnRlbnRzJ1xuICAgICAgNTYwMywgIC8vICdtYW5hZ2luZy1nbG9iYWwtcG9zdC1sYXlvdXQnXG4gICAgICA1NjA1LCAgLy8gJ21hbmFnaW5nLWN1c3RvbS1wb3N0LWxheW91dCdcbiAgICAgIDYzODUsICAvLyAnbGlzdGluZy1wYWdlJ1xuICAgICAgNTU1OSwgIC8vICdibG9nLXBvc3RzLXBhZ2UnXG4gICAgXSxcbiAgICBcbiAgICAndmlkZW8nOiBbXG4gICAgICAxMDQ3NiwgLy8gJ3doYXQtaXMtYS12aWRlby1wb3N0J1xuICAgICAgMTA0ODEsIC8vICdob3ctdG8tY3JlYXRlLWEtdmlkZW8tcG9zdCdcbiAgICAgIDEwNDk5LCAvLyAnZ2xvYmFsLXZpZGVvLXBvc3Qtc2V0dGluZ3MnXG4gICAgICA1NjAzLCAgLy8gJ21hbmFnaW5nLWdsb2JhbC1wb3N0LWxheW91dCdcbiAgICAgIDU2MDUsICAvLyAnbWFuYWdpbmctY3VzdG9tLXBvc3QtbGF5b3V0J1xuICAgICAgMTA0OTAsIC8vICdjdXN0b20tdmlkZW8tcG9zdCdcbiAgICAgIDEwNDk0LCAvLyAnY2hhbmdpbmctcGFyZW50LXNsdWctdmlkZW8tcG9zdHMnXG4gICAgXSxcbiAgICBcbiAgICAnbWVkaWEnOiBbXG4gICAgICA0MTA1LCAvLyAnZmxvdGhlbWVzLWltYWdlLXNpemVzJ1xuICAgICAgNTU4OCwgLy8gJ3VwbG9hZGluZy1pbWFnZXMtcG9zdC1jb250ZW50cydcbiAgICAgIDUzMjgsIC8vICdjaGFuZ2luZy1pbWFnZS1zaXplcydcbiAgICAgIDUzMzAsIC8vICd1c2luZy1yZWdlbmVyYXRlLXRodW1ibmFpbHMtcGx1Z2lucydcbiAgICAgIDUzMjksIC8vICdjaGFuZ2luZy11cGxvYWRzLWRpcmVjdG9yeS1wYXRoLXJlc2V0dGluZy11cGxvYWRzLWRpcmVjdG9yeS1wYXRoLWRlZmF1bHQnXG4gICAgXSxcbiAgICBcbiAgICAncGFnZSc6IFtcbiAgICAgIDEwNTQ0LCAvLyAnY3JlYXRpbmctYS1wYWdlJ1xuICAgICAgNTU0MSwgLy8gJ2J1aWxkaW5nLWEtcGFnZS1mcm9tLXNjcmF0Y2gnXG4gICAgICA2MzQwLCAvLyAnd2hhdC1pcy1hLXBhZ2UtYnVpbGRlcidcbiAgICAgIDU1NDAsIC8vICdwYWdlLWJ1aWxkZXItY29tcG9uZW50cydcbiAgICAgIDU1MzksIC8vICdwYWdlLWJ1aWxkZXItaW4tcGFnZS10ZW1wbGF0ZXMnXG4gICAgICA1NDA1LCAvLyAnY3VzdG9tLWhlYWRlci1sYXlvdXQnXG4gICAgICA1NDM0LCAvLyAnY3VzdG9tLWZvb3Rlci1sYXlvdXQnXG4gICAgICA1NTQ1LCAvLyAnd2hhdC1pcy1hLWNvbnRlbnQtYmxvY2snXG4gICAgICA0MTA1LCAvLyAnZmxvdGhlbWVzLWltYWdlLXNpemVzJyAgICAgIFxuICAgIF0sXG4gICAgXG4gICAgJ2NvbW1lbnRzJzogW1xuICAgICAgNTU5NywgLy8gJ3dvcmRwcmVzcy1jb21tZW50cydcbiAgICAgIDU1OTgsIC8vICdmYWNlYm9vay1jb21tZW50cydcbiAgICAgIDU2MDQsIC8vICdyZWNvbW1lbmRlZC1ibG9ja3MtZ2xvYmFsLXBvc3QtbGF5b3V0JyAgIFxuICAgIF0sXG4gICAgXG4gICAgJ2Zsby1mb3Jtcyc6IFtcbiAgICAgIDY0MDAsIC8vICdmbG8tZm9ybXMnXG4gICAgICAxOTEzLCAvLyAnY29udGFjdC1mb3JtLWVtYWlsLWlzc3VlJ1xuICAgIF0sXG4gICAgXG4gICAgJ3RoZW1lcyc6IFtcbiAgICAgIDUyMzYsIC8vICdob3ctdG8tZG93bmxvYWQtYS10aGVtZSdcbiAgICAgIDUyNDcsIC8vICd1cGxvYWRpbmctYS10aGVtZS12aWEtZGFzaGJvYXJkJ1xuICAgICAgNTI0NiwgLy8gJ21hbnVhbC11cGxvYWQtdmlhLWZ0cC1maWxlLW1hbmFnZXInXG4gICAgICA1MjQ0LCAvLyAnYWN0aXZhdGluZy1hLXRoZW1lJ1xuICAgICAgNTI2NCwgLy8gJ2hvdy10by11cGRhdGUtYS1mbG90aGVtZSdcbiAgICAgIDUyNjUsIC8vICdtYW51YWwtZmxvdGhlbWUtdXBkYXRlLXZpYS1mdHAnXG4gICAgICA1MjcwLCAvLyAnaG93LXRvLWRlbGV0ZS1hLXRoZW1lJ1xuICAgICAgNTI3NCwgLy8gJ2N1c3RvbWl6ZS12aWEtY2hpbGQtdGhlbWUnXG4gICAgICA1MjczLCAvLyAnZG93bmxvYWQtaW5zdGFsbC1hLWNoaWxkLXRoZW1lJ1xuICAgICAgNTI3MSwgLy8gJ2Rpc2FibGluZy10aGVtZXMtcmVuYW1pbmctdmlhLWZ0cC1maWxlLW1hbmFnZXInXG4gICAgXSxcbiAgICBcbiAgICAnd2lkZ2V0cyc6IFtcbiAgICAgIDYzMDYsIC8vICd3aGF0LWlzLWEtc2lkZWJhcidcbiAgICAgIDYzMTMsIC8vICdjcmVhdGUtbmV3LXNpZGViYXInXG4gICAgICA1NTAwLCAvLyAnYWRkaW5nLWNvbnRlbnQtdG8tc2lkZWJhcnMnXG4gICAgICA1NDk5LCAvLyAnYWRkaW5nLXNpZGViYXJzLXRvLWEtcGFnZSdcbiAgICAgIDg0MTUsIC8vICd3aWRnZXRzLWluLWZvb3RlcidcbiAgICAgIDU1MDEsIC8vICd3aWRnZXQtdmlzaWJpbGl0eSdcbiAgICBdLFxuICAgIFxuICAgICdtZW51cyc6IFtcbiAgICAgIDUzMDcsIC8vICdjcmVhdGluZy1hLW1lbnUnXG4gICAgICA1MzExLCAvLyAnY3VzdG9tLXVybC1tZW51LWl0ZW1zJ1xuICAgICAgNTMxMCwgLy8gJ25vbi1jbGlja2FibGUtbWVudS1pdGVtcydcbiAgICAgIDUzMDksIC8vICdhZGRpbmctZ2FsbGVyaWVzLW1lbnUnXG4gICAgICA1MzA4LCAvLyAnbWFrZS1tZW51LWl0ZW0tb3Blbi1uZXctdGFiJ1xuICAgICAgNTMxMiwgLy8gJ2Fzc2lnbmluZy1tZW51cy1tYWluLWZvb3Rlci1ldGMnXG4gICAgICA2MTU2LCAvLyAnbWVudS1kcm9wZG93bi10ZXh0LWJhY2tncm91bmQtY29sb3JzJ1xuICAgIF0sXG4gICAgXG4gICAgJ3BsdWdpbnMnOiBbXG4gICAgICA1Mjk0LCAvLyAnaW5zdGFsbGluZy1wbHVnaW4td3AtcGx1Z2lucy1kaXJlY3RvcnknXG4gICAgICA1MjkzLCAvLyAnaW5zdGFsbGluZy1wbHVnaW4temlwLWZpbGUnXG4gICAgICA1MzAyLCAvLyAncmVtb3ZpbmctcmVuYW1pbmctcGx1Z2lucy12aWEtZmlsZS1tYW5hZ2VyLWZ0cCdcbiAgICAgIDUyOTUsIC8vICd1cGRhdGluZy1wbHVnaW5zLWltcG9ydGFuY2UtdXBkYXRlcydcbiAgICAgIDY0MDAsIC8vICdmbG8tZm9ybXMnXG4gICAgICA1MzAwLCAvLyAnZmxvaW5zdGFncmFtJ1xuICAgICAgNTY1NCwgLy8gJ3doZXJlLXRvLWRvd25sb2FkJ1xuICAgICAgNTY1NSwgLy8gJ2hvdy10by11cGxvYWQtZmxvbGF1bmNoJ1xuICAgICAgNTY1MywgLy8gJ3doYXQtaXMtZmxvbGF1bmNoLWFuZC1ob3ctaXQtd29ya3MnXG4gICAgXSxcbiAgICBcbiAgICAndXNlcnMnOiBbXG4gICAgICA1MzI0LCAvLyAnY3JlYXRlLXRlbXBvcmFyeS1hZG1pbmlzdHJhdG9yJ1xuICAgICAgNTY2OCwgLy8gJ2NyZWF0aW5nLXVzZXJzLWNoYW5naW5nLXVzZXItcGFzc3dvcmRzLXVzaW5nLWZsb2xhdW5jaCdcbiAgICBdLFxuICAgIFxuICAgICd0b29scyc6IFtcbiAgICAgIDUzNTcsIC8vICdpbXBvcnRpbmctZXhwb3J0aW5nLXlvdXItY29udGVudC11c2luZy13b3JkcHJlc3MtaW1wb3J0ZXInXG4gICAgICA1MzQ5LCAvLyAndHJvdWJsZXNob290aW5nLXdvcmRwcmVzcy1pbXBvcnRlcidcbiAgICAgIDU2NjcsIC8vICdhZGRpbmctbmV3LWNvbnRlbnQtd2hpbGUtaW4tdGVzdC1tb2RlJ1xuICAgIF0sXG4gICAgXG4gICAgJ3NldHRpbmdzLWdlbmVyYWwnOiBbXG4gICAgICA1MzIxLCAvLyAnc2l0ZS10aXRsZS10YWdsaW5lJ1xuICAgICAgNTMyMywgLy8gJ2NoYW5nZS10aW1lem9uZS10aW1lLWRhdGUtZm9ybWF0LWVtYWlsLWxhbmd1YWdlJ1xuICAgIF0sXG4gICAgXG4gICAgJ3NldHRpbmdzLXdyaXRpbmcnOiBbXG4gICAgICA1MzI1LCAvLyAnc2V0dGluZ3MtJWUyJTg2JTkyLXdyaXRpbmcnXG4gICAgXSxcbiAgICBcbiAgICAnc2V0dGluZ3MtcmVhZGluZyc6IFtcbiAgICAgIDUzMjYsIC8vICdzZXR0aW5ncy0lZTIlODYlOTItcmVhZGluZydcbiAgICAgIDU1NTksIC8vICdibG9nLXBvc3RzLXBhZ2UnXG4gICAgICA2NDYyLCAvLyAnYXNzaWduaW5nLWEtaG9tZXBhZ2UnXG4gICAgXSxcbiAgICBcbiAgICAnc2V0dGluZ3MtZGlzY3Vzc2lvbic6IFtcbiAgICAgIDU1OTcsIC8vICd3b3JkcHJlc3MtY29tbWVudHMnXG4gICAgICA1NjIzLCAvLyAnY29tbWVudHMnXG4gICAgXSxcbiAgICBcbiAgICAnc2V0dGluZ3MtbWVkaWEnOiBbXG4gICAgICA1MzI4LCAvLyAnY2hhbmdpbmctaW1hZ2Utc2l6ZXMnXG4gICAgICA1MzMwLCAvLyAndXNpbmctcmVnZW5lcmF0ZS10aHVtYm5haWxzLXBsdWdpbnMnXG4gICAgXSxcbiAgICBcbiAgICAnc2V0dGluZ3MtcGVybWFsaW5rcyc6IFtcbiAgICAgIDEwNTg3LCAvLyAnc2V0dGluZy11cC1wZXJtYWxpbmtzJ1xuICAgICAgNDE2NCwgIC8vICdjaGFuZ2luZy1wZXJtYWxpbmtzJ1xuICAgICAgNTU4OSwgIC8vICdtYW5hZ2luZy1pbmRpdmlkdWFsLXBvc3QtdXJscy1jaGFuZ2luZy1nbG9iYWwtcGVybWFsaW5rLXN0cnVjdHVyZS1wb3N0cydcbiAgICBdLFxuICAgIFxuICAgICdmbG8taW5zdGFncmFtJzogW1xuICAgICAgNTMwMCwgLy8gJ2Zsb2luc3RhZ3JhbSdcbiAgICAgIDU0MjksIC8vICdhZGRpbmctaW5zdGFncmFtLWZlZWQtZm9vdGVyJ1xuICAgICAgODQxNSwgLy8gJ3dpZGdldHMtaW4tZm9vdGVyJ1xuICAgIF0sXG4gICAgXG4gICAgJ2Zsby1odWInOiBbXG4gICAgICA1MDE0LCAvLyAnZmxvaHViLWluc3RhbGxpbmctZmxvaHViJ1xuICAgICAgNTAxNywgLy8gJ2Zsb2h1Yi11cGRhdGUtcGx1Z2luJ1xuICAgICAgNTAxNSwgLy8gJ2Zsb2h1Yi1nZW5lcmFsLXNldHRpbmdzJ1xuICAgICAgNTAxMiwgLy8gJ2Zsb2h1Yi1wcmljZWxpc3Qtb3ZlcnZpZXcnXG4gICAgICA1MDIzLCAvLyAnZmxvaHViLW5ldy1wcmljZWxpc3QnXG4gICAgICA1MDEzLCAvLyAnZmxvaHViLW1ha2luZy1maXJzdC1wcmljZWxpc3QnXG4gICAgICA1MDE2LCAvLyAnZmxvaHViLXVzaW5nLXRlbXBsYXRlcydcbiAgICAgIDUwMjUsIC8vICdmbG9odWItdXNpbmctY29udGVudC1ibG9ja3MnXG4gICAgICA1MDI0LCAvLyAnZmxvaHViLXVzaW5nLXBhY2thZ2UtYmxvY2tzJ1xuICAgICAgNTAxOCwgLy8gJ2Zsb2h1Yi1wcmljZWxpc3Qtc2V0dGluZ3MnXG4gICAgICA1MDIyLCAvLyAnZmxvaHViLW1lc3NhZ2VzLWludGVncmF0aW9ucydcbiAgICAgIDUwMjEsIC8vICdmbG9odWItYWRkaW5nLWN1c3RvbS1mb250cydcbiAgICAgIDUwMjAsIC8vICdmbG9odWItdHJhbnNsYXRpbmctcHJpY2VsaXN0cydcbiAgICAgIDUwMTksIC8vICdmbG9odWItc2hhcmluZy1wcmljZWxpc3RzJ1xuICAgIF1cbiAgICBcbiAgfTtcbiAgXG4gIGxldCBjdXJyZW50VmlldyA9ICdkZWZhdWx0JztcbiAgbGV0IGN1cnJlbnRQYXRoID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWU7XG4gIGxldCBjdXJyZW50UGF0aEFyciA9IGN1cnJlbnRQYXRoLnNwbGl0KCcvJyk7XG4gIC8vIGZpbmQgdGhlIHNsdWcgdGhhdCBnb2VzIGRpcmVjdGx5IGFmdGVyICd3cC1hZG1pbicuIHRoYXQgd2lsbCBoZWxwIHVzIGZpZ3VyZSBvdXQgd2hlcmUgaW4gdGhlIGRhc2hib2FyZCB0aGUgdXNlciBpcyBjdXJyZW50bHkgbG9jYXRlZFxuICBsZXQgaW5kZXhPZldQQWRtaW4gPSBjdXJyZW50UGF0aEFyci5pbmRleE9mKCd3cC1hZG1pbicpO1xuICBsZXQgbGFiZWwgPSAnJztcbiAgXG4gIGlmKFxuICAgICgoY3VycmVudFBhdGhBcnJbaW5kZXhPZldQQWRtaW4gKyAxXSA9PSBcIlwiKSB8fCBcbiAgICAoY3VycmVudFBhdGhBcnJbaW5kZXhPZldQQWRtaW4gKyAxXSA9PSAnaW5kZXgucGhwJykpICYmXG4gICAgJCgnYm9keScpLmhhc0NsYXNzKCdpbmRleC1waHAnKVxuICApIHtcbiAgICBjdXJyZW50VmlldyA9ICdkYXNoYm9hcmQnO1xuICAgIGxhYmVsID0gJ0Rhc2hib2FyZCc7XG4gIH0gXG4gIC8vIHN0YXJ0OiBwb3N0IHR5cGVzXG4gIGVsc2UgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygncG9zdC10eXBlLXNsaWRlc2hvdycpKSB7XG4gICAgY3VycmVudFZpZXcgPSAnc2xpZGVzaG93JztcbiAgICBsYWJlbCA9ICdTbGlkZXNob3dzJztcbiAgfSBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3Bvc3QtdHlwZS1nYWxsZXJ5JykpIHtcbiAgICBjdXJyZW50VmlldyA9ICdnYWxsZXJ5JztcbiAgICBsYWJlbCA9ICdHYWxsZXJpZXMnO1xuICB9IGVsc2UgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygncG9zdC10eXBlLXBvc3QnKSkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ3Bvc3QnO1xuICAgIGxhYmVsID0gJ1Bvc3RzJztcbiAgfSBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3Bvc3QtdHlwZS12aWRlbycpKSB7XG4gICAgY3VycmVudFZpZXcgPSAndmlkZW8nO1xuICAgIGxhYmVsID0gJ1ZpZGVvcyc7XG4gIH0gZWxzZSBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdwb3N0LXR5cGUtYXR0YWNobWVudCcpKSB7XG4gICAgY3VycmVudFZpZXcgPSAnbWVkaWEnO1xuICAgIGxhYmVsID0gJ01lZGlhJztcbiAgfSBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3Bvc3QtdHlwZS1wYWdlJykpIHtcbiAgICBjdXJyZW50VmlldyA9ICdwYWdlJztcbiAgICBsYWJlbCA9ICdQYWdlcyc7XG4gIH0gXG4gIC8vIGVuZDogcG9zdCB0eXBlc1xuICBcbiAgZWxzZSBpZiAoXG4gICAgJCgnYm9keScpLmhhc0NsYXNzKCdjb21tZW50LXBocCcpIHx8XG4gICAgJCgnYm9keScpLmhhc0NsYXNzKCdlZGl0LWNvbW1lbnRzLXBocCcpXG4gICkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ2NvbW1lbnRzJztcbiAgICBsYWJlbCA9ICdDb21tZW50cyc7XG4gIH0gZWxzZSBpZiAoXG4gICAgJCgnYm9keScpLmhhc0NsYXNzKCdwb3N0LXR5cGUtZmxvX2Zvcm1zJykgfHwgXG4gICAgYWRtaW5wYWdlICYmIGFkbWlucGFnZSA9PSAndG9wbGV2ZWxfcGFnZV9mbG9fZm9ybXNfc2V0dGluZ3MnXG4gICkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ2Zsby1mb3Jtcyc7XG4gICAgbGFiZWwgPSAnRmxvRm9ybXMnO1xuICB9IGVsc2UgaWYgKFxuICAgICQoJ2JvZHknKS5oYXNDbGFzcygndGhlbWVzLXBocCcpIHx8IFxuICAgICQoJ2JvZHknKS5oYXNDbGFzcygndGhlbWUtZWRpdG9yLXBocCcpXG4gICkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ3RoZW1lcyc7XG4gICAgbGFiZWwgPSAnVGhlbWVzJztcbiAgfSBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ25hdi1tZW51cy1waHAnKSkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ21lbnVzJztcbiAgICBsYWJlbCA9ICcnO1xuICB9IGVsc2UgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnd2lkZ2V0cy1waHAnKSkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ3dpZGdldHMnO1xuICAgIGxhYmVsID0gJ1dpZGdldHMnO1xuICB9IGVsc2UgaWYgKFxuICAgICQoJ2JvZHknKS5oYXNDbGFzcygncGx1Z2lucy1waHAnKSB8fFxuICAgICQoJ2JvZHknKS5oYXNDbGFzcygncGx1Z2luLWluc3RhbGwtcGhwJykgfHxcbiAgICAkKCdib2R5JykuaGFzQ2xhc3MoJ3BsdWdpbi1lZGl0b3ItcGhwJylcbiAgKSB7XG4gICAgY3VycmVudFZpZXcgPSAncGx1Z2lucyc7XG4gICAgbGFiZWwgPSAnUGx1Z2lucyc7XG4gIH0gZWxzZSBpZiAoXG4gICAgJCgnYm9keScpLmhhc0NsYXNzKCd1c2Vycy1waHAnKSB8fCBcbiAgICAkKCdib2R5JykuaGFzQ2xhc3MoJ3VzZXItbmV3LXBocCcpIHx8IFxuICAgICQoJ2JvZHknKS5oYXNDbGFzcygncHJvZmlsZS1waHAnKVxuICApIHtcbiAgICBjdXJyZW50VmlldyA9ICd1c2Vycyc7XG4gICAgbGFiZWwgPSAnVXNlcnMnO1xuICB9IFxuICAvLyB3cCB0b29scyB0YWJcbiAgZWxzZSBpZiAoXG4gICAgJCgnYm9keScpLmhhc0NsYXNzKCdpbXBvcnQtcGhwJykgfHwgXG4gICAgJCgnYm9keScpLmhhc0NsYXNzKCdleHBvcnQtcGhwJylcbiAgKSB7XG4gICAgY3VycmVudFZpZXcgPSAndG9vbHMnO1xuICAgIGxhYmVsID0gJ1Rvb2xzJztcbiAgfSBcbiAgXG4gIC8vIHN0YXJ0OiB3cCBzZXR0aW5ncyB0YWJcbiAgZWxzZSBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdvcHRpb25zLWdlbmVyYWwtcGhwJykpIHtcbiAgICBjdXJyZW50VmlldyA9ICdzZXR0aW5ncy1nZW5lcmFsJztcbiAgICBsYWJlbCA9ICdHZW5lcmFsIFNldHRpbmdzJztcbiAgfSBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ29wdGlvbnMtd3JpdGluZy1waHAnKSkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ3NldHRpbmdzLXdyaXRpbmcnO1xuICAgIGxhYmVsID0gJ1dyaXRpbmcgU2V0dGluZ3MnO1xuICB9IGVsc2UgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnb3B0aW9ucy1yZWFkaW5nLXBocCcpKSB7XG4gICAgY3VycmVudFZpZXcgPSAnc2V0dGluZ3MtcmVhZGluZyc7XG4gICAgbGFiZWwgPSAnUmVhZGluZyBTZXR0aW5ncyc7XG4gIH0gZWxzZSBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCdvcHRpb25zLWRpc2N1c3Npb24tcGhwJykpIHtcbiAgICBjdXJyZW50VmlldyA9ICdzZXR0aW5ncy1kaXNjdXNzaW9uJztcbiAgICBsYWJlbCA9ICdEaXNjdXNzaW9uIFNldHRpbmdzJztcbiAgfSBlbHNlIGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ29wdGlvbnMtbWVkaWEtcGhwJykpIHtcbiAgICBjdXJyZW50VmlldyA9ICdzZXR0aW5ncy1tZWRpYSc7XG4gICAgbGFiZWwgPSAnTWVkaWEgU2V0dGluZ3MnO1xuICB9IGVsc2UgaWYgKCQoJ2JvZHknKS5oYXNDbGFzcygnb3B0aW9ucy1wZXJtYWxpbmstcGhwJykpIHtcbiAgICBjdXJyZW50VmlldyA9ICdzZXR0aW5ncy1wZXJtYWxpbmtzJztcbiAgICBsYWJlbCA9ICdQZXJtYWxpbmsgU2V0dGluZ3MnO1xuICB9IFxuICAvLyBlbmQ6IHdwIHNldHRpbmdzIHRhYlxuICBcbiAgZWxzZSBpZiAoJCgnYm9keScpLmhhc0NsYXNzKCd0b3BsZXZlbF9wYWdlX2Zsb19pbnN0YWdyYW0nKSkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ2Zsby1pbnN0YWdyYW0nO1xuICAgIGxhYmVsID0gJ0Zsb0luc3RhZ3JhbSc7XG4gIH0gZWxzZSBpZiAoYWRtaW5wYWdlICYmIChhZG1pbnBhZ2UuaW5jbHVkZXMoJ2Zsb3RoZW1lX3BhZ2VfYWNmJykgfHwgYWRtaW5wYWdlID09ICd0b3BsZXZlbF9wYWdlX3RoZW1lLWdlbmVyYWwtc2V0dGluZ3MnKSkge1xuICAgIGN1cnJlbnRWaWV3ID0gJ2Zsb3RoZW1lJztcbiAgICBsYWJlbCA9ICdGbG9UaGVtZXMgU2V0dGluZ3MgUGFnZSc7XG4gIH0gZWxzZSBpZiAoYWRtaW5wYWdlICYmIGFkbWlucGFnZS5pbmNsdWRlcygnZmxvcHJpY2luZycpKSB7XG4gICAgY3VycmVudFZpZXcgPSAnZmxvLWh1Yic7XG4gICAgbGFiZWwgPSAnRmxvSHViJztcbiAgfVxuICBcbiAgaWYocmVjb21tZW5kZWRJdGVtSWRzTGlzdFtjdXJyZW50Vmlld10pIHtcbiAgICBpZiAoJChgLmZsby1zdXBwb3J0X19yZWNvbW1lbmRlZC1hcnRpY2xlcy0tdGl0bGVgKS5sZW5ndGggJiYgY3VycmVudFZpZXcgIT0gJ2RlZmF1bHQnKSB7XG4gICAgICAkKGAuZmxvLXN1cHBvcnRfX3JlY29tbWVuZGVkLWFydGljbGVzLS10aXRsZWApWzBdLmlubmVySFRNTCArPSBgIGZvciBcIiR7bGFiZWx9XCJgO1xuICAgIH1cbiAgICByZXR1cm4gcmVjb21tZW5kZWRJdGVtSWRzTGlzdFtjdXJyZW50Vmlld107XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHJlY29tbWVuZGVkSXRlbUlkc0xpc3RbJ2RlZmF1bHQnXTtcbiAgfVxuICBcbn0iXX0=
