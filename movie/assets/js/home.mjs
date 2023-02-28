'use strict'
import {movieDAO} from "./dao/movieDAO.mjs";


document.querySelector("#refreshPopular").addEventListener("click", (event) => {
    document.location.href="index.html";
  });
let populars
const params = new URLSearchParams(window.location.search);
const q = (params.get("query"));
console.log(q)
if(q == null)populars= await movieDAO.getPopulars()
else populars = await movieDAO.find(q)
populars.results.forEach(element => {
    const section = document.querySelector('section')
    const article =document.createElement("article")
    const lien =document.createElement("a")
    lien.href=`movie.html?id=${element.id}`
    const img =document.createElement("img")
    img.src=`https://image.tmdb.org/t/p/w1280${element.backdrop_path}`
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


  var input = document.querySelector('#search')
  input.addEventListener("keypress", async function(event) {
      if (event.key == "Enter") {
         document.location.href=`index.html?query=${input.value}`
      }
    });