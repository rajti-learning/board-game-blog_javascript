{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

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
    console.log('correctArticle:', correctArticle);

  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks(){

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';


    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for(let article of articles) {


      /* [DONE] get the article id */

      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */ /* get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* [DONE] create HTML of the link */

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

      /* insert link into titleList */
      html = html + linkHTML;
      console.log(html);
    }

    titleList.innerHTML = html;

  }

  generateTitleLinks();
}
