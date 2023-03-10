const key = 'XXXX'
const baseURL = 'https://api.themoviedb.org/3'
const imgURL = 'https://image.tmdb.org/t/p/w1280'

const movieDAO = {
    getById : async (id) =>
    {
        const suffix = `/movie/${id}?api_key=${key}&language=en-US`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    }
}

//TODO

const root = ReactDOM.createRoot(document.querySelector('#app_container'));
root.render(<App />);