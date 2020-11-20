'use strict';

const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    
    
    

    /* remove class 'active' from all article links  */
    const activeLink = document.querySelector('.titles a.active');

    if(activeLink) activeLink.classList.remove('active');
    

    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    
    clickedElement.classList.add('active');

    /* remove class 'active' from all articles */
    const activeArticle = document.querySelector('.posts article.active');

    if(activeArticle) activeArticle.classList.remove('active');
    
    /* get 'href' attribute from the clicked link */
    const articleSelektor = clickedElement.getAttribute("href");

    console.log(articleSelektor);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelektor);

    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}
