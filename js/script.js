/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTags: Handlebars.compile(document.querySelector('#template-article-tags').innerHTML),
  articleAuthor: Handlebars.compile(document.querySelector('#template-article-author').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorsLink: Handlebars.compile(document.querySelector('#template-authors-link').innerHTML),
};

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
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list',
  optArticleAuthorSelector = '.post-author';



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
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

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

function calculateTagsParams(tags) {
  const params = { min: 9999, max: 0 };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}



function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  return 'tag-size-' + classNumber;

}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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

      const linkHTMLData = { tag: tag, };
      const linkHTML = templates.articleTags(linkHTMLData);

      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {

        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }


      /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */
  const allTagsData = { tags: [] };


  /* [NEW] generate code of a link and add it to allTagsHTML */
  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  }

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
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



function generateAuthors() {
  /* create w new variable allAuthors with an empty array */
  let allAuthors = {};

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
    const linkHTMLData = { author: articleAuthors };
    const linkHTML = templates.articleAuthor(linkHTMLData);
    console.log(linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors[articleAuthors]) {
      /* [NEW] add tag to allTags object */
      allAuthors[articleAuthors] = 1;
    } else {
      allAuthors[articleAuthors]++;
    }

    /* insert HTML of all the links into the authors wrapper */
    authorsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector('.authors');

  /* [NEW] create variable for all links HTML code */
  const allAuthorsData = { authors: [] };

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let articleAuthors in allAuthors) {
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allAuthorsData.authors.push({
      author: articleAuthors,
      count: allAuthors[articleAuthors]
    });
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  authorsList.innerHTML = templates.authorsLink(allAuthorsData);

}

generateAuthors();


function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(activeLinks);

  /* remove class active */
  for (let link of activeLinks) {
    link.classList.remove('active');
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const targetLinks = document.querySelectorAll('a[href="' + href + '"]');



  /* add class active */
  for (let link of targetLinks) {
    link.classList.add('active');
  }

  /* execute function "generateAuthors" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}


function addClickListenersToAuthors() {
  /* find all links to authors */
  const links = document.querySelectorAll('a[href^="#author-"]');

  /* add authorClickHandler as event listener for that link */
  for (let link of links) {
    link.addEventListener('click', authorClickHandler);
  }


}

addClickListenersToAuthors(); 