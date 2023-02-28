'use strict'
import {movieDAO} from "./dao/movieDAO.mjs";

document.querySelector("#refreshPopular").addEventListener("click", (event) => {
    document.location.href="/";
});

const input = document.querySelector('#search')
displaymovie(await movieDAO.getPopulars())

function displaymovie(array){
    const section = document.querySelector('section')
    const body=document.querySelector('body')
    body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url(https://image.tmdb.org/t/p/w1280${array.results[Math.floor(Math.random() * 20)].backdrop_path})`;
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
    console.log(body.style.backgroundImage)
}

input.addEventListener("keyup", async function(event) {
  if(input.value != "")displaymovie(await movieDAO.find(input.value))
  else displaymovie(await movieDAO.getPopulars())
});