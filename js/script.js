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

    const elementAttribute = clickedElement.getAttribute('href').slice(1);
    console.log('Element attribute: ', elementAttribute);

  /* find the correct article using the selector (value of 'href' attribute) */

  const listArticles = document.querySelectorAll('.posts article.post');

  for(let listArticle of listArticles){
    const idArticle = listArticle.getAttribute('id');
    if (elementAttribute === idArticle) {
      const correctArticle = listArticle;
      console.log('article id: ', idArticle);
      console.log('correctArticle:', correctArticle);
    }
  }

  /* add class 'active' to the correct article */
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
