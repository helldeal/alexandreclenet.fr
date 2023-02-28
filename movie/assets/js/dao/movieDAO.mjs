"use strict"

import {key, baseURL} from "../data/const.mjs";
export const movieDAO = {
    getPopulars : async (page=1) => {
        const suffix = `/movie/popular?api_key=${key}&language=en-US&page=${page}`
        const res  = await fetch(baseURL+suffix)
        const data = await res.json()
        return data
    },
    getById : async (id) =>
    {
        const suffix = `/movie/${id}?api_key=${key}&language=en-US`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
    find : async (term, page=1) =>
    {
        const suffix = `/search/movie?api_key=${key}&language=en-US&query=${term}&page=${page}&include_adult=false`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    }
}