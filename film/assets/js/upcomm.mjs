const { Suspense } = React;
const key = "381cc2db27bb9cdcd712453cd2b2669b";
const baseURL = "https://api.themoviedb.org/3";
const imgURL = "https://image.tmdb.org/t/p/w1280";


const movieDAO = {
  getUpcom: async (page = 1) => {
    const suffix = `/movie/upcoming?api_key=${key}&sort_by=release_date.desc&language=fr&page=${page}&region=FR`;
    const res = await fetch(baseURL + suffix);
    const data = await res.json();
    return data;
  },
  find: async (term, page = 1) => {
    

    const suffix = `/search/movie?api_key=${key}&language=fr&query=${term}&page=${page}&include_adult=false`;
    const res = await fetch(baseURL + suffix);
    const data = await res.json();
    return data;
  },
};

class Movies extends React.Component{
    render(){return(
      <article key={this.props.movie.id}>
          <a href={"../film/?movie="+this.props.movie.id}>
              <img src={imgURL+this.props.movie.poster_path} onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="assets/img/notFound.png";
              }}/>
              <div>
                  <div>Date : {this.props.movie.release_date}</div>
                  <div>Titre : {this.props.movie.title}</div>
                  <div>Vote : {Math.round(this.props.movie.vote_average*10)}%</div>
              </div>
          </a>

      </article>
    )}
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      movies: [],
    };
    this.handleInput=this.handleInput.bind(this)
    this.doUpdate = this.doUpdate.bind(this);
  }
  componentDidMount() {
    this.doUpdate();
  }
  
  doUpdate(query) {
    if (query == "" || query== undefined){
      movieDAO.getUpcom().then((data) => {
        this.setState({ movies: data.results});
      });
    }
    else
       movieDAO.find(query).then((data) => {
        this.setState({ movies: data.results });
      });
  }
  handleInput(e){
    this.setState({ query: e.target.value });
    this.doUpdate(e.target.value)

  }
  render(){
    const body=document.querySelector('body')
    if(body.style.backgroundImage==""&&this.state.movies.length>0)body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url(${imgURL}${this.state.movies[Math.floor(Math.random() * 20)].backdrop_path})`;
    let Aucunfilm
    if(this.state.movies.length==0)Aucunfilm=<article>Aucun Film</article>;

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
        <input value={this.state.query} id="search" placeholder="Rechercher..."
        onChange={this.handleInput}/>
    </header>


        <section className="content">
          {Aucunfilm}
            {this.state.movies.map(element => (
              <Movies key={element.id} movie={element}/>
            ))}
        </section>
        <footer>
            <a href="../../">By <span>Al</span>exandre <span>Cl</span>énet</a>
        </footer>
    </div>
  )}
}

const root = ReactDOM.createRoot(document.querySelector("#app_container"));
root.render(<App />);