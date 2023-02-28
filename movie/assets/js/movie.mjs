"use struct"
document.querySelector("#refreshPopular").addEventListener("click", (event) => {
    document.location.href="index.html";
  });
  
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

import {movieDAO} from "./dao/movieDAO.mjs";
let element = await movieDAO.getById(id)

if(element.title == undefined)document.location.href="index.html"
const section = document.querySelector('section')
const article =document.createElement("article")
article.classList.add("movie")
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
article.appendChild(img);
article.appendChild(div);
div.appendChild(date);
div.appendChild(title);
div.appendChild(rate);