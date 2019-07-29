$(window).on("load", function() {
  let b = "flo-support";
  let dotb = `.${b}`;

  // plugin options
  let analyticsCheckbox = document.getElementById(`${b}__settings-analytics`);
  if (analyticsCheckbox) {
    analyticsCheckbox.addEventListener("change", event => {
      if (event.target.checked) {
        event.target.value = 1;
      } else {
        event.target.value = 0;
      }
    });
  }

  /* START: CREATING POPUP MARKUP */
  let popupTrigger = $(`${dotb}__popup-trigger`);
  let themeSlug = $("#beacon-flo").attr("data-theme-slug");
  // let docsURL = '//docsflothemes.staging.wpengine.com/';
  let docsURL = "https://docs.flothemes.com/";
  // let docsURL = "http://localhost/newdocs/";

  let useTechnicalData = $("#beacon-flo").attr("data-analytics");
  // if(useTechnicalData) {
  //   let userData = JSON.parse(flo_support_user_data);
  // }

  // defining as global variable for proper breadcrumb management across different articles
  let articleHistory = [];

  // "unimportant" words - the, of, to, and, a, in, is, it, you, that, he, was, for, on, are, with, as, I, his, they, be, at, one, have and this.
  // for now taken from: https://marksprague.wordpress.com/enterprise-seo-2/unimportant-words-impact-relevancy/
  var omitDictionary = [
    "the",
    "of",
    "to",
    "and",
    "a",
    "in",
    "is",
    "it",
    "you",
    "that",
    "he",
    "was",
    "for",
    "on",
    "are",
    "with",
    "as",
    "I",
    "his",
    "they",
    "be",
    "at",
    "one",
    "have",
    "this",
    "how",
    "why",
    "am",
    "do",
    "if",
    "or",
    "ok",
    "what",
    "where",
    "when",
    "who",
    "which",
    "so",
    "too",
    "my",
    "not"
  ];

  function cleanifyQuery(str) {
    let words = tokenize(str);

    words = words.filter(function(val) {
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
    let matches = 0;
    arr1.forEach(e1 =>
      arr2.forEach(e2 => {
        if (e1.toLowerCase() === e2.toLowerCase()) {
          matches++;
        }
      })
    );
    return matches;
  }

  function countWords(str, wordsToCount) {
    let wordList = tokenize(str);
    let occurrences = {};
    wordsToCount.forEach(wordToCount => {
      occurrences[wordToCount] = 0;
      wordList.forEach(word => {
        if (
          word.toLowerCase() == wordToCount.toLowerCase() ||
          word.toLowerCase() == wordToCount.toLowerCase() + "s"
        ) {
          occurrences[wordToCount]++;
        }
      });
    });

    return occurrences;
  }

  let popup = document.createElement("div");
  popup.className = `${b}`;

  popup.innerHTML = `
    
      <span class="${b}__close-trigger">
        <i class="${b}__close-icon  ${b}-icon-cancel-1"></i>
        <svg class="${b}__close-button-bg" width="111px" height="23px" viewBox="0 0 111 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Artboard" transform="translate(-240.000000, -64.000000)" fill="#FFFFFF" fill-rule="nonzero">
              <path d="M351,87 C320.806012,87 323.799999,64 296,64 C268.200001,64 266.097256,87 240,87 C276,87 311.5,87 351,87 Z" id="Path-2"></path>
            </g>
          </g>
        </svg>
      </span>
      <div class="${b}__not-single-elts">
        <div class="${b}__tab-switcher">
          <span class="${b}__tab-switch ${b}__tab-switch--docs" data-tab="docs-tab">
            <i class="${b}-icon-menu"></i>
            Documentation
          </span>
          <span class="${b}__tab-switch ${b}__tab-switch--search ${b}__tab-switch--active" data-tab="search-tab">
            <i class="${b}-icon-search"></i>
            Search Docs
          </span>
          <span class="${b}__tab-switch ${b}__tab-switch--hs" data-tab="hs-tab">
            <i class="${b}-icon-mail"></i>
            Submit a Ticket
          </span>
          
          <!-- BETA: FEEDBACK TAB TRIGGER -->
          <span class="${b}__tab-switch ${b}__tab-switch--feedback" data-tab="feedback-tab" title="Leave Feedback">
            <i class="${b}-icon-info-outline"></i>
          </span>
          
        </div>
        <div class="${b}__tabs-wrap">
          <div class="${b}__docs-tab ${b}__tab">
            <div class="${b}__all-articles-menu"></div>
          </div>
          <div class="${b}__search-tab ${b}__tab ${b}__active-tab">
            <div class="${b}__search-form">
              <input type="text" class="${b}__search-input" placeholder="Got a question? Fire away!" />
              <span class="${b}__search-button">Search</span>
            </div>
            <div class="${b}__search-results-wrap"></div>
            <div class="${b}__recommended-articles">
              <span class="${b}__recommended-articles--title">Recommended Articles</span>
              <div class="${b}__recommended-loading">
                <div class="${b}__search-loading-bar"></div>
                <div class="${b}__search-loading-bar"></div>
                <div class="${b}__search-loading-bar"></div>
                <div class="${b}__search-loading-bar"></div>
              </div>
              <!-- needs scrollbar -->
              <ul class="${b}__recommended-articles--items menu"></ul>
            </div>
          </div>
          <div class="${b}__hs-tab ${b}__tab"></div>
          <!-- BETA: FEEDBACK TAB -->
          <div class="${b}__feedback-tab ${b}__tab">
            <h3 class="${b}__feedback-loading">
              Loading Feedback Form
              <span class="dot">.</span>
              <span class="dot">.</span>
              <span class="dot">.</span>
            </h3>
            <iframe class="${b}__feedback-iframe waiting-load" data-src="https://docs.flothemes.com/flosupport-leave-feedback" frameborder="0"></iframe>
          </div>
          <div class="${b}__single-article-wrap ${b}__tab">
            <div class="${b}__article-actions">
              <span class="${b}__article-close">
                <i class="${b}-icon-arrow-back"></i>
              </span>
              <div class="${b}__breadcrumbs-wrap"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="${b}__notice-wrap"></div>
      
    `;

  // if working with popup contents, declare all variables, selectors etc BELOW this line:
  document.body.appendChild(popup);

  /* START: POPUP VARIABLES */
  let searchInput = $(`${dotb}__search-input`);
  let searchButton = $(`${dotb}__search-button`);
  let searchResultsWrap = $(`${dotb}__search-results-wrap`);
  let recommendedArticlesWrap = $(`${dotb}__recommended-articles`);
  let docsTabTrigger = $(`${dotb}__tab-switch--docs`);
  let docsTab = $(`${dotb}__docs-tab`);
  let hsTabTrigger = $(`${dotb}__tab-switch--hs`);
  let hsTab = $(`${dotb}__hs-tab`);
  let searchTabTrigger = $(`${dotb}__tab--search`);
  let searchTab = $(`${dotb}__search-tab`);
  /* END: POPUP VARIABLES */

  /* START: BETA LOG (init firebase) */
  let betaLog = new BetaLog();
  betaLog.load();
  /* END: BETA LOG (init firebase) */

  /* START: BETA ASYNC LOAD IFRAME */
  $(`${dotb}__tab-switch--feedback`).one("click", event => {
    $(`${dotb}__feedback-iframe`).one("load", e => {
      $(e.target).removeClass("waiting-load");
      setTimeout(function() {
        $(`${dotb}__feedback-loading`).remove();
      }, 300);
    });
    $(`${dotb}__feedback-iframe`).attr(
      "src",
      $(`${dotb}__feedback-iframe`).attr("data-src")
    );
  });
  /* END: BETA ASYNC LOAD IFRAME */

  function docsSearch(searchQ) {
    betaLog.write(searchQ, new Date().getTime());

    // preprocess query text for result sorting
    let cleanQuery = RiTa.stem(searchQ.toLowerCase());
    let queryArray = RiTa.tokenize(cleanQuery);

    let parsedStr = encodeURIComponent(cleanifyQuery(searchQ));

    searchResultsWrap.html("");
    searchResultsWrap.html(`
        <div class="${b}__search-loading-bar"></div>
        <div class="${b}__search-loading-bar"></div>
        <div class="${b}__search-loading-bar"></div>
        <div class="${b}__search-loading-bar"></div>
      `);

    $(`${dotb}__recommended-articles`).css("display", "none");
    $(`${dotb}__search-results-wrap`).css("display", "flex");

    let urlParams = "wp-json/flo_api/v1/search/";
    let url = `${docsURL}${urlParams}?s=${parsedStr}&tags=${themeSlug},generic`;

    /* START: RENDERING SEARCH RESULTS LOGIC */
    fetch(url).then(response => {
      response.json().then(resultsJSON => {
        searchResultsWrap.fadeOut("400", () => {
          searchResultsWrap.html("");

          if (resultsJSON.length) {
            // declare 5 empty arrays that will hold the results based on relevance score
            let [first, second, third, fourth, fifth] = [[], [], [], [], []];

            resultsJSON.forEach((result, index) => {
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

              let postTitle = result.post_title;
              let postContent = result.text_content;
              let postSections = result.acf.sections;
              let postSectionsContent = "";

              // if post has acf sections, merge the sections content in the postContent variable
              if (postSections && postSections.length) {
                postSections.forEach((section, index) => {
                  if (section.content && section.content.length) {
                    postSectionsContent += section.content;
                  }
                });
                postContent += postSectionsContent;
              }

              let postContentPlainText = textify(postContent);

              let postExcerpt =
                postContentPlainText.length > 150
                  ? postContentPlainText.slice(0, 150) + "..."
                  : postContentPlainText;
              result.excerpt = textify(postExcerpt);

              // preprocess post title for determining relevance scores (2, 3)
              let postTitleStemmed = RiTa.stem(postTitle);
              let postTitleStemmedTokens = tokenize(
                cleanifyQuery(postTitleStemmed).toLowerCase()
              );

              function keyIsInString(currentValue) {
                return postTitleStemmed.toLowerCase().includes(currentValue);
              }

              setTimeout(function() {
                if (postTitle.toLowerCase().includes(searchQ.toLowerCase())) {
                  result.relevance_score = 1;
                  first.push(result);
                } else if (queryArray.every(keyIsInString)) {
                  result.relevance_score = 2;
                  second.push(result);
                } else if (
                  tokenize(cleanifyQuery(cleanQuery)).some(substring =>
                    cleanifyQuery(postTitleStemmed)
                      .toLowerCase()
                      .includes(substring)
                  )
                ) {
                  // count the post title words: how many times these match the query words (repeating increases count as well)
                  result.relevance_score = 3;
                  result.titleMatchCount = compareTwoTexts(
                    tokenize(cleanifyQuery(cleanQuery)),
                    postTitleStemmedTokens
                  );
                  third.push(result);
                } else if (
                  RiTa.stem(postContentPlainText.toLowerCase()).includes(
                    cleanifyQuery(cleanQuery.toLowerCase())
                  )
                ) {
                  result.relevance_score = 4;
                  fourth.push(result);
                } else {
                  // relevance score 5, count how many times each word from the post content occurs in the query
                  let wordCount = countWords(
                    postContentPlainText.toLowerCase(),
                    tokenize(cleanifyQuery(searchQ).toLowerCase())
                  );
                  let wordCountSum = 0;
                  Object.values(wordCount).forEach(wordCountValue => {
                    wordCountSum += wordCountValue;
                  });
                  let wordCountMean =
                    wordCountSum / Object.values(wordCount).length;
                  let num = Number(wordCountMean); // The Number() only visualizes the type and is not needed
                  let roundString = num.toFixed(2); // toFixed() returns a string (often suitable for printing already)
                  let roundWordCountMean = Number(roundString);

                  result.word_count = {
                    words: wordCount,
                    wordCountScore: roundWordCountMean
                  };

                  fifth.push(result);
                }
              });
            });

            // console.log({first, second, third, fourth, fifth});
            setTimeout(function() {
              // for results that have a relevance score of 3 sort them by titleMatchCount
              third.sort((a, b) => {
                return b.titleMatchCount - a.titleMatchCount;
              });

              // for results that have a relevance score of 5 sort them by (mean word count - wordcount sum divided by amount of words)
              fifth.sort(function(a, b) {
                return (
                  b.word_count.wordCountScore - a.word_count.wordCountScore
                );
              });

              let sortedResultsJSON = first.concat(
                second,
                third,
                fourth,
                fifth
              );

              searchResultsWrap.append(`
                    <span class="${b}__search-results-info">
                      Showing ${sortedResultsJSON.length} results
                    </span>
                  `);

              sortedResultsJSON.forEach(result => {
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

                let itemUrl = docsURL + themeSlug + "/#" + result.slug;

                let searchResultExcerptWrap =
                  result.excerpt.length > 0
                    ? `<p class="${b}__search-result-excerpt">${
                        result.excerpt
                      }</p>`
                    : "";

                searchResultsWrap.append(`
                      <div class="${b}__search-result">
                        <a href="${itemUrl}" target="_blank">
                          <span class="${b}__search-result-post-title">${
                  result.post_title
                }</span>
                          ${searchResultExcerptWrap}
                          <i class="${b}-icon-arrow-right ${b}__search-result-item-icon"></i>
                        </a>
                      </div>
                    `);
              });

              let searchResultLink = $(`${dotb}__search-result > a`);
              searchResultLink.on("click", function(event) {
                event.preventDefault();
                let targetIndex = $(event.target)
                  .parents(`${dotb}__search-result`)
                  .index();
                let articleToRender = sortedResultsJSON[targetIndex - 1];
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

  $(`${dotb}__tab-switch`).on("click", function() {
    let tabToShow = $(this).attr("data-tab");

    $(`${dotb}__tab-switch--active`).removeClass(`${b}__tab-switch--active`);
    $(this).addClass(`${b}__tab-switch--active`);
    $(`${dotb}__previously-active-tab`).removeClass(
      `${b}__previously-active-tab`
    );
    $(`${dotb}__active-tab`).removeClass(`${b}__active-tab`);
    $(`${dotb}__${tabToShow}`).addClass(`${b}__active-tab`);
  });

  searchInput.on("keyup", function(event) {
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
      let currentQuery = $(this).val();
      if (currentQuery.length) docsSearch(currentQuery);
    }
  });

  searchButton.on("click", function() {
    let currentQuery = $(this)
      .siblings(searchInput)
      .val();
    if (currentQuery.length) docsSearch(currentQuery);
  });

  /* START: CLOSE ARTICLE AND GET BACK TO PREVIOUS SCREEN */
  $(`${dotb}__article-close`).on("click", () => {
    if (articleHistory.length <= 1) {
      closeArticle();
      articleHistory = [];
    } else {
      let prevArticle = articleHistory[articleHistory.length - 2];
      articleHistory.splice(articleHistory.length - 1, 1);
      renderArticle(prevArticle, false, true);
    }
  });
  /* END: CLOSE ARTICLE AND GET BACK TO PREVIOUS SCREEN */
  let getMenuURL = `${docsURL}wp-json/flo_api/v1/menus/?slug=${themeSlug}`;
  let menuObj = "";
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

  $.get(getMenuURL, function(responseJSON) {
    if (responseJSON.length) {
      menuObj = responseJSON;
      let menuWrap = popup.querySelector(`${dotb}__all-articles-menu`);
      menuWrap.innerHTML = menuObj;

      /* START: DROPDOWN TOGGLES */
      let menuItemWithDropdown = $(`${dotb} .menu .menu-item-has-children > a`);
      menuItemWithDropdown.on("click", function(event) {
        event.preventDefault();
        let subMenu = $(this).siblings(".sub-menu");
        subMenu.slideToggle("350", function() {
          let childrenSubMenus = $(this).find(".submenu-open > .sub-menu");
          childrenSubMenus.each(function() {
            $(this).hide();
            $(this)
              .parent()
              .removeClass("submenu-open");
          });
        });
        $(this)
          .parent()
          .toggleClass("submenu-open");
      });
      /* END: DROPDOWN TOGGLES */

      /* START: ARTICLES WITHIN POPUP */
      let articleLink = $(
        `${dotb} .menu .menu-item:not(.menu-item-has-children) > a`
      );
      articleLink.on("click", function(event) {
        event.preventDefault();
        let articleURL = $(this).attr("href");
        $(this).append(`<div class="flo-dual-ring"></div>`);
        fetchAndRenderArticle(articleURL, true);
      });
      /* END: ARTICLES WITHIN POPUP */
    }
  });

  /* START: pull recommended resources */

  function fetchRecommended(currentRecommendedArticles = []) {
    // use ids and fetch, since menu item ids are different from theme to theme
    let allItemIds = currentRecommendedArticles.join(",");
    let fetchURL = `${docsURL}wp-json/flo_api/v1/posts/?ids=${allItemIds}&posts_per_page=${
      currentRecommendedArticles.length
    }`;

    fetch(fetchURL).then(response => {
      response.json().then(responseJSON => {
        // sort response so that items are in the same order as specified in the original array
        responseJSON.sort((a, b) => {
          let aIndex = currentRecommendedArticles.indexOf(a.post_id);
          let bIndex = currentRecommendedArticles.indexOf(b.post_id);

          if (aIndex > bIndex) return 1;
          if (bIndex > aIndex) return -1;
        });

        responseJSON.forEach(recommendedItem => {
          // strip html tags from text content and get only first 150 characters
          let recommendedItemExcerptText = "";
          if (recommendedItem.text_content.length > 0) {
            recommendedItemExcerptText =
              textify(recommendedItem.text_content).length > 150
                ? textify(recommendedItem.text_content).slice(0, 150) + "..."
                : textify(recommendedItem.text_content);
          } else if (
            recommendedItem.acf.sections &&
            recommendedItem.acf.sections[0].content.length > 0
          ) {
            recommendedItemExcerptText =
              textify(recommendedItem.acf.sections[0].content).length > 150
                ? textify(recommendedItem.acf.sections[0].content).slice(
                    0,
                    150
                  ) + "..."
                : textify(recommendedItem.acf.sections[0].content);
          }

          let recommendedMenuItem = document.createElement("li");
          recommendedMenuItem.className = `${b}__recommended-menu-item ${b}__recommended-menu-item--${
            recommendedItem.post_id
          }`;

          recommendedMenuItem.innerHTML = `<span class="${b}__recommended-menu-item--title">${
            recommendedItem.post_title
          }</span>`;
          if (recommendedItemExcerptText.length > 0)
            recommendedMenuItem.innerHTML += `<span class="${b}__recommended-menu-item--excerpt">${recommendedItemExcerptText}</span>`;
          recommendedMenuItem.innerHTML += `<i class="${b}-icon-arrow-right ${b}__recommended-menu-item--icon"></i>`;

          $(`${dotb}__recommended-articles--items`).append(
            $(recommendedMenuItem)
          );

          recommendedMenuItem.addEventListener("click", function() {
            let index = $(this).index();
            let articleToRender = responseJSON[index];
            renderArticle(articleToRender, true);
          });
        });

        $(`${dotb}__recommended-loading`).fadeOut("fast", () => {
          $(`${dotb}__recommended-loading`).remove();
          $(`${dotb}__recommended-articles--items`).fadeIn("fast");
        });
      });
    });
  }

  // the var below will be the page type where the user currently is at.
  // we'll have a conditional article list to provide depending on the location: (check recommendedItemIdsList variable)
  let currentViewArticles = recognizeDashboardView();
  fetchRecommended(currentViewArticles);

  /* END: pull recommended resources */

  function handleArticleLinkClick(e, link) {
    e.preventDefault();
    if (link.hasAttribute("href") && link.attributes.href.value.length) {
      let parentArticleWrap = e.target.closest(`${dotb}__single-article-wrap`);
      parentArticleWrap.querySelector(
        `${dotb}__article-wrap--content`
      ).style.opacity = "0.3";
      parentArticleWrap.querySelector(
        `${dotb}__article-wrap--content`
      ).style.pointerEvents = "none";
      fetchAndRenderArticle(link.attributes.href.value);
    }
  }

  function handleBreadcrumbClick(e) {
    let breadcrumb = e.target;
    let breadcrumbIndex = breadcrumb.attributes["data-index"].value;
    let articleToRender = articleHistory[breadcrumbIndex];
    breadcrumbIndex++;
    let newHistory = articleHistory.slice(0, breadcrumbIndex);
    articleHistory = newHistory;
    renderArticle(articleToRender, false, true);
  }

  // articleToRender -  parameter represents the post object received from the server
  // clearHistory - if the post is accessed from a main window, breadcrumbs need to be cleared
  // skipHistory - there are cases when we don't need to push items to breadcrumbs, so we skip this via this parameter passed as a boolean true value
  function renderArticle(
    articleToRender,
    clearHistory = false,
    skipHistory = false
  ) {
    let articleWrap = $(`${dotb}__single-article-wrap`);
    articleWrap.find(`${dotb}__article-wrap--content`).remove();

    let articleURL = `${docsURL}${themeSlug}/#${articleToRender.slug}`;

    let articleContent = document.createElement("div");
    articleContent.className = `${b}__article-wrap--content`;
    articleContent.innerHTML = `
        <h2 class="${b}__article-wrap--title">${articleToRender.post_title}</h2>
        <a href="${articleURL}" title="Open in new tab" target="_blank" class="${b}__article-wrap--direct-link">
          <i class="flo-support-icon-link"></i>
        </a>
        <div class="${b}__article-wrap--text">
          <div class="${b}__article-wrap--wp-content">
            ${articleToRender.text_content}
          </div>
          <div class="${b}__article-wrap--sections"></div>
        </div>
      `;

    let articleSections = articleToRender.acf.sections;

    if (articleSections && articleSections.length) {
      let articleSectionsWrap = articleContent.querySelector(
        `${dotb}__article-wrap--sections`
      );
      articleSections.forEach(articleSection => {
        let sectionTitle = document.createElement("h2");
        sectionTitle.className = `${b}__article-section-title`;
        sectionTitle.innerHTML = articleSection.title;
        articleSectionsWrap.appendChild(sectionTitle);

        let sectionContent = document.createElement("div");
        sectionContent.className = `${b}__article-section-content`;
        sectionContent.innerHTML = articleSection.content;
        articleSectionsWrap.appendChild(sectionContent);
      });
    }

    if (clearHistory) articleHistory = [];
    if (!skipHistory) articleHistory.push(articleToRender);

    let breadcrumbsWrap = popup.querySelector(`${dotb}__breadcrumbs-wrap`);
    breadcrumbsWrap.innerHTML = "";

    // add the breadcrumbs
    articleHistory.forEach((postFromHistory, index) => {
      if (index !== 0 && index <= articleHistory.length - 1)
        breadcrumbsWrap.innerHTML += `<div class="${b}__breadcrumb-delimiter">/</div>`;
      breadcrumbsWrap.innerHTML += `
          <div data-index="${index}" class="${b}__breadcrumb">
            ${postFromHistory.post_title}
          </div>
        `;
    });

    let breadcrumbLinks = breadcrumbsWrap.querySelectorAll(
      `${dotb}__breadcrumb:not(:last-child)`
    );
    breadcrumbLinks.forEach(breadcrumb =>
      breadcrumb.addEventListener("click", handleBreadcrumbClick)
    );

    let articleContentTextWrap = articleContent.querySelector(
      `${dotb}__article-wrap--text`
    );
    let articleContentLinks = articleContentTextWrap.querySelectorAll("a");

    articleContentLinks.forEach(articleContentLink => {
      let articleLinkHref = "";
      let linkToDocs = false;
      if (articleContentLink.attributes.href) {
        articleLinkHref = articleContentLink.attributes.href.value;
        if (
          articleLinkHref.includes("/#") &&
          articleLinkHref.includes("docs") &&
          articleLinkHref.includes("flothemes")
        )
          linkToDocs = true;
      }

      if (articleLinkHref.length && linkToDocs)
        articleContentLink.classList.add(`${b}__nav-within-popup`);
    });

    let linksForInternalNavigation = articleContentTextWrap.querySelectorAll(
      `${dotb}__nav-within-popup`
    );
    [...linksForInternalNavigation].forEach(link =>
      link.addEventListener("click", event =>
        handleArticleLinkClick(event, link)
      )
    );

    articleWrap.append(articleContent);
    openArticle();
  }

  function fetchAndRenderArticle(url, clearHistory = false) {
    let articleURL = url.replace(/\/$/, "");
    articleURL = articleURL.replace("#", "");
    let articleSlug = articleURL.substr(articleURL.lastIndexOf("/") + 1);
    let fetchPostURL = `${docsURL}wp-json/flo_api/v1/posts/?slug=${articleSlug}`;

    fetch(fetchPostURL).then(response => {
      response.json().then(responseJSON => {
        if (responseJSON && responseJSON.length) {
          renderArticle(responseJSON[0], clearHistory);
          $(`.flo-dual-ring`).remove();
        } else {
          // TODO
          let noticeWrap = document.querySelector(`${dotb}__notice-wrap`);
          noticeWrap.innerHTML =
            "Oops, the resource you requested could not be found";
          $(noticeWrap).fadeIn("fast", () => {
            $(`${dotb}__article-wrap--content`).css({
              opacity: "1",
              "pointer-events": "auto"
            });

            setTimeout(function() {
              $(noticeWrap).fadeOut("fast");
            }, 1500);
          });
        }
      });
    });
  }

  function openArticle() {
    $(`${dotb}__active-tab:not(${dotb}__single-article-wrap)`)
      .addClass(`${b}__previously-active-tab`)
      .removeClass(`${b}__active-tab`);
    $(`${dotb}__single-article-wrap`).addClass(`${b}__active-tab`);
  }

  function closeArticle() {
    $(`${dotb}__single-article-wrap`).removeClass(`${b}__active-tab`);
    $(`${dotb}__previously-active-tab`)
      .addClass(`${b}__active-tab`)
      .removeClass(`${b}__previously-active-tab`);
  }

  /* END: CREATING POPUP MARKUP */

  let $popup = $(popup);
  popupTrigger.on("click", () => {
    $popup.addClass(`${b}__popup-visible`);

    if ($popup.find(hsTab).find("#hs-beacon").length === 0) {
      /* START: INIT HS BEACON */

      // initialize ONLY after moving the beacon wrap where necessary (in the popup)
      hsTab.append($("#hs-beacon"));
      HS.beacon.init();

      setTimeout(function() {
        HS.beacon.ready(function() {
          this.open();

          setTimeout(function() {
            let beaconIframe = document
                .getElementById("hs-beacon")
                .getElementsByTagName("iframe")[0],
              doc = beaconIframe.contentDocument || beaconIframe.contentWindow;
            if (doc.document) doc = doc.document;

            var _timer = setInterval(function() {
              if (doc.readyState == "complete") {
                clearInterval(_timer);

                setTimeout(function() {
                  let beaconIframeContents = beaconIframe.contentDocument.body;
                  let beaconIframeHeadTag = beaconIframe.contentDocument.head;
                  let styleTagForBeacon = document.querySelector(
                    ".flo-beacon-styles"
                  );

                  let instructionsHTML = document.createElement("div");
                  instructionsHTML.className = "flo-ticket-header";
                  instructionsHTML.innerHTML = `
                      <span class="submit-ticket-title">Contact Customer Care</span>
                      <span class="submit-ticket-subtitle">If you cannot find answers to your questions within the documentation, feel free to contact us and we will get back to you as soon as possible.</span>
                    `;

                  let fileUploadIcon = document.createElement("i");
                  fileUploadIcon.className = `${b}-icon-file`;
                  let fileUploadTrigger = beaconIframeContents.querySelector(
                    ".contact--submit"
                  );

                  let hsSuccessIcon = beaconIframeContents.querySelector(
                    ".contact-success--icon"
                  );
                  $(hsSuccessIcon).remove();

                  let successMessageWrap = beaconIframeContents.querySelector(
                    ".contact-success"
                  );
                  successMessageWrap.innerHTML = `
                      <i class="${b}-icon-mail-sent"></i>
                      <span class="${b}__contact-success--title">Message Sent</span>
                      <span class="${b}__contact-success--description">Send us a message and read our answer when it’s convenient for you</span>
                      <a href="https://docs.flothemes.com/" target="_blank" class="${b}__contact-success--docs-button">View Docs</a>
                    `;
                  let instructionsWrap = beaconIframeContents.querySelector(
                    ".contact--instructions"
                  );

                  beaconIframeHeadTag.appendChild(styleTagForBeacon);
                  instructionsWrap.appendChild(instructionsHTML);
                  fileUploadTrigger.prepend(fileUploadIcon);

                  let userData = {};
                  if (useTechnicalData) {
                    userData = JSON.parse(flo_support_user_data);
                  } else {
                    userData.nodata = "Additional information unavailable.";
                  }
                  HS.beacon.identify(userData);

                  /* START: IMGUR UPLOADER */
                  let fileUploadActions = beaconIframeContents.getElementsByClassName(
                    "contact--attach"
                  );
                  let fileRemoveAction = fileUploadActions[0];
                  let fileAddAction = fileUploadActions[1];

                  let submitActionsWrap = beaconIframeContents.getElementsByClassName(
                    "contact--submit"
                  )[0];

                  let floFileInput = document.getElementById(
                    "flo-support__imgur-uploader"
                  );
                  floFileInput.addEventListener("change", event =>
                    processImgurFiles(event.target, userData, submitActionsWrap)
                  );

                  fileAddAction.addEventListener("click", event => {
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

  $(`${dotb}__close-trigger`).on("click", () => {
    $popup.removeClass(`${b}__popup-visible`);
    if ($("body").css("position") == "fixed" && $(window).width() < 768)
      $("body").css("position", "");
  });

  /* START: DEV: OPEN POPUP AND SEARCH ON PAGE LOAD */
  // popupTrigger.trigger("click");
  // $(`${dotb}__tab-switch--hs`).trigger('click');
  // let qqq = "page builder components";
  // $popup.find(".flo-support__search-input").val(qqq);
  // $popup.find(".flo-support__search-button").trigger("click");
  /* END: DEV: OPEN POPUP AND SEARCH ON PAGE LOAD */
});
