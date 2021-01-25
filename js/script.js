/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */


'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');




  /* remove class 'active' from all article links  */
  const activeLink = document.querySelector('.titles a.active');

  if (activeLink) activeLink.classList.remove('active');


  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);

  clickedElement.classList.add('active');

  /* remove class 'active' from all articles */
  const activeArticle = document.querySelector('.posts article.active');

  if (activeArticle) activeArticle.classList.remove('active');

  /* get 'href' attribute from the clicked link */
  const articleSelektor = clickedElement.getAttribute('href');

  console.log(articleSelektor);

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelektor);

  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};



const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  // eslint-disable-next-line no-unused-vars
  optArticleTagsSelector = '.post-tags .list';


function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = '';

  console.log(titleList);

  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);


  let html = '';

  for (let article of articles) {

    /* get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element and get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;

  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li><br>';

      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');


  /* find all tag links with class active */
  const activeLink = document.querySelectorAll('.post-tags li a.active');

  /* remove class active */
  for (let link of activeLink) {
    link.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetLink = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */
  for (let link of targetLink) {
    /* add class active */
    link.classList.add('active');

    /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"]');

  /* add tagClickHandler as event listener for that link */
  for (let link of links) {
    link.addEventListener('click', tagClickHandler);
  }



}

addClickListenersToTags();

const optArticleAuthorSelector = '.post-author';

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  for (let article of articles) {

    /* find authors wrapper */
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log(authorsWrapper);


    /* make html variable with empty string */
    let html = '';

    /* get authors from data-authors attribute */
    const articleAuthors = article.getAttribute('data-author');
    console.log(articleAuthors);


    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthors + '"</a>';
    console.log(linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert HTML of all the links into the authors wrapper */
    authorsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
}

generateAuthors();


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  console.log(author);

  /* find all links with class active */
  const activeLink = document.querySelectorAll('.post-author .active');

  /* remove class active */
  for (let link of activeLink) {
    link.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetLink = document.querySelectorAll('a[href="' + href + '"]');



  /* add class active */
  for (let link of targetLink) {
    link.classList.add('active');
  }

  /* execute function "generateAuthors" with article selector as argument */
  generateAuthors('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');

  /* add authorClickHandler as event listener for that link */
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }


}

addClickListenersToTags();