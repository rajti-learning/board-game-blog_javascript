'use strict';
{

  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: "tag-size-",
    },
  };

  const select = {
    all: {
      articles: '.post',
      titles: '.post-title',

      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',

        active: {
          tags: 'a.active[href^="#tag-"]',
          authors: 'a.active[href^="#author-"]',
        },
      },
    },

    article: {
      tags: '.post-tags .list',
      author: '.post-author',
    },

    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',

      active: {
        titleLinks: '.titles a.active',
        articles: '.posts article.active',
      },
    },
  };

/* ----------------------------------------------------------------------------------------*/
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll(select.listOf.active.titleLinks);

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll(select.listOf.active.articles);

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    const linkAttribute = clickedElement.getAttribute('href');

    const targetArticle = document.querySelector(linkAttribute);

    targetArticle.classList.add('active');
  }

/* ----------------------------------------------------------------------------------------*/

  function generateTitleLinks(customSelector = ''){

    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    const articles = document.querySelectorAll(select.all.articles + customSelector);

    let html = '';

    for(let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(select.all.titles).innerHTML;
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

/* ----------------------------------------------------------------------------------------*/

  function calculateTagsParams(tags) {

    let minTag = 999;
    let maxTag = 0;
    const tagsParams = {};

    for (let tag in tags) {
      if (tags[tag] < minTag) {
        minTag = tags[tag];
      }

      if (tags[tag] > maxTag) {
        maxTag = tags[tag];
      }
    }

    tagsParams['max'] = maxTag;
    tagsParams['min'] = minTag;

    return tagsParams;

  }

/* ----------------------------------------------------------------------------------------*/

  function calculateTagClass(count, params){

    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (opts.tagSizes.count - 1) + 1);
    return opts.tagSizes.classPrefix + classNumber;

  }

/* ----------------------------------------------------------------------------------------*/

  function generateTags(){

    let allTags = {};

    const articles = document.querySelectorAll(select.all.articles);

    for (let article of articles) {
      const tagWrapper = article.querySelector(select.article.tags);
      let html = '';
      const tags = article.getAttribute('data-tags');
      const splitTags = tags.split(' ');

      for (let splitTag of splitTags) {
        const link = '<li><a href="#tag-' + splitTag + '">' + splitTag + '</a></li>';
        html = html + link;

        if (!allTags[splitTag]){
          allTags[splitTag] = 1;
        } else {
          allTags[splitTag]++;
        }
      }

      tagWrapper.innerHTML = html;

    }

    const tagList = document.querySelector(select.listOf.tags);
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';

    for (let tag in allTags) {
      allTagsHTML += '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    }

    tagList.innerHTML = allTagsHTML;

  }

  generateTags();

/* ----------------------------------------------------------------------------------------*/

  function tagClickHandler(event){

    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const activeTagLinks = document.querySelectorAll(select.all.linksTo.active.tags);

    for (let activeTagLink of activeTagLinks) {

      activeTagLink.classList.remove('active');

    }

    const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    for (let targetTagLink of targetTagLinks) {
      targetTagLink.classList.add('active');
    }

    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

/* ----------------------------------------------------------------------------------------*/

  function addClickListenersToTags(){

    const tagLinks = document.querySelectorAll(select.all.linksTo.tags);

    for (let tagLink of tagLinks) {
      tagLink.addEventListener('click', tagClickHandler);
    }
  }

  addClickListenersToTags();

/* ----------------------------------------------------------------------------------------*/

  function generateAuthors(){

    let allAuthors = {};

    const articles = document.querySelectorAll(select.all.articles);

    for (let article of articles) {
      const authorWrapper = article.querySelector(select.article.author);
      const author = article.getAttribute('data-author');
      const html = '<a href="#author-' + author + '">' + author + '</a>';

      authorWrapper.innerHTML = html;

      if (!allAuthors[author]) {
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }

    }

    const authorsList = document.querySelector(select.listOf.authors);
    let allAuthorsHTML = '';

    for (let author in allAuthors) {
      allAuthorsHTML += '<li><a href="#author-' + author + '">' + author + ' (' + allAuthors[author] + ')' + '</a></li>'
    }

    authorsList.innerHTML = allAuthorsHTML;

  }

  generateAuthors();

/* ----------------------------------------------------------------------------------------*/

  function authorClickHandler(event){

    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const activeAuthors = document.querySelectorAll(select.all.linksTo.active.authors);

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }

    const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');

    for (let targetAuthor of targetAuthors) {
      targetAuthor.classList.add('active');
    }

    generateTitleLinks('[data-author=' + author + ']');

  }

/* ----------------------------------------------------------------------------------------*/

  function addClickListenersToAuthors(){

    const authorLinks = document.querySelectorAll(select.all.linksTo.authors);

    for (let authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
    }

  }

  addClickListenersToAuthors();

/* ----------------------------------------------------------------------------------------*/

}
