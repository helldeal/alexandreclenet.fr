

const key = '381cc2db27bb9cdcd712453cd2b2669b'
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


const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("movie"));
//let element = await movieDAO.getById(id)
//if(element.title == undefined)document.location.href="populaires.html"

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movie: null,
      };
    }
    componentDidMount() {
        movieDAO.getById(id).then((data) => {
            this.setState({ movie: data});
          });
      }
      
    render(){
      const body=document.querySelector('body')
      if(body.style.backgroundImage==""&&this.state.movie!=null)body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url(${imgURL}${this.state.movie.backdrop_path})`;
  
      if(this.state.movie!=null&&this.state.movie.success == false)document.location.href="populaires.html"
      return(
      <div className="container">
          <header>
              <div className="dropdown">
                <a href="../film/populaires.html">Films</a>
                <div className="dropdown-content">
                  <a href="../film/populaires.html">Populaires</a>
                  <a href="../film/du-moment.html">En ce moment</a>
                  <a href="../film/à-venir.html">À venir</a>
                  <a href="../film/mieux-notés.html">Mieux notés</a>
                </div>
              </div>
              <div className="dropdown">
                <a href="../serie/populaires.html">Series</a>
                <div className="dropdown-content">
                  <a href="../serie/populaires.html">Populaires</a>
                  <a href="../serie/du-moment.html">En ce moment</a>
                  <a href="../serie/à-venir.html">À venir</a>
                  <a href="../serie/mieux-notés.html">Mieux notés</a>
                </div>
              </div>
              <div className="dropdown">
                <a href="../acteur/populaires.html">Acteurs</a>
                <div className="dropdown-content">
                  <a href="../acteur/populaires.html">Populaires</a>
                </div>
              </div>
          </header>
  
          <section className="content">

          </section>
  
          <footer>
  
          </footer>
      </div>
    )}
  }
  
  const root = ReactDOM.createRoot(document.querySelector("#app_container"));
  root.render(<App />);