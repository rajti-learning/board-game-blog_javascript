'use strict';
{
  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const linkAttribute = clickedElement.getAttribute('href').slice(1);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const listArticles = document.querySelectorAll('.posts article.post');
    let correctArticle;

    for(let listArticle of listArticles){
      const idArticle = listArticle.getAttribute('id');
      if (linkAttribute === idArticle) {
        correctArticle = listArticle;
      }
    }

    /* [DONE] add class 'active' to the correct article */

    correctArticle.classList.add('active');
  }

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector ='.post-tags .list';

  function generateTitleLinks(customSelector = ''){
    console.log('selector', customSelector);
    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';


    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('polaczony article', articles);

    let html = '';

    for(let article of articles) {


      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */ /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* [DONE] insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  function generateTags(){
  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* [DONE] START LOOP: for every article: */

    for (let article of articles) {

    /* [DONE] find tags wrapper */

      const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

      let html = '';

    /* [DONE] get tags from data-tags attribute */

      const articleTags = article.getAttribute('data-tags');

    /* [DONE] split tags into array */

      const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

      for (let tag of articleTagsArray) {

      /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + ' </a></li> ';
      /* add generated code to html variable */
        html = html + linkHTML;
    /* END LOOP: for each tag */
      }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

  generateTags();

  function tagClickHandler(event){
  /* prevent default action for this event */
    event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-','');
  /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
      for (let activeTagLink of activeTagLinks) {
    /* remove class active */
        activeTagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
      }
  /* find all tag links with "href" attribute equal to the "href" constant */
    let sameTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for (let sameTagLink of sameTagLinks){
    /* add class active */
      sameTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
      tagLinks = document.querySelectorAll(optArticleTagsSelector);
  /* START LOOP: for each link */
      for (tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

}
