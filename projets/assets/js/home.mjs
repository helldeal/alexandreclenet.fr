'use strict'
import {movieDAO} from "./dao/movieDAO.mjs";

document.querySelector("#refreshPopular").addEventListener("click", (event) => {
    document.location.href="/movie/";
});

const input = document.querySelector('#search')
displaymovie(await movieDAO.getPopulars())

async function displaymovie(array){
    const section = document.querySelector('section')
    const loader = document.querySelector('.loader')
    section.style.opacity = 0; 
    loader.style.opacity=1;
    const body=document.querySelector('body')
    if(body.style.backgroundImage=="")body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/w1280${array.results[Math.floor(Math.random() * 20)].backdrop_path})`;
    section.innerHTML = '';
    array.results.forEach(element => {
        const article =document.createElement("article")
        const lien =document.createElement("a")
        lien.href=`movie.html?id=${element.id}`
        const img =document.createElement("img")
        img.src=`https://image.tmdb.org/t/p/w1280${element.poster_path}`
        const div=document.createElement("div")
        const date=document.createElement("div")
        date.innerHTML=element.release_date
        const title=document.createElement("div")
        title.innerHTML=element.title
        const rate=document.createElement("div")
        rate.innerHTML=element.vote_average
        section.appendChild(article);
        article.appendChild(lien);
        lien.appendChild(img);
        lien.appendChild(div);
        div.appendChild(date);
        div.appendChild(title);
        div.appendChild(rate);
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(array.results,array.results.length==0)
    if(array.results.length==0){
        const article =document.createElement("article")
        section.innerHTML = '';
        article.innerHTML="Aucun Film"
        section.appendChild(article);
    }
    loader.style.opacity = 0;
    section.style.opacity = 1;
}

input.addEventListener("keyup", async function(event) {
  if(input.value != "")displaymovie(await movieDAO.find(input.value))
  else displaymovie(await movieDAO.getPopulars())
});