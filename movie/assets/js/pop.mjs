
const key = "381cc2db27bb9cdcd712453cd2b2669b";
const baseURL = "https://api.themoviedb.org/3";
const imgURL = "https://image.tmdb.org/t/p/w1280";


const movieDAO = {
  getPopulars: async (page = 1) => {
    const suffix = `/movie/popular?api_key=${key}&language=fr&page=${page}`;
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
          <a href={"movie.html?id="+this.props.movie.id}>
              <img src={imgURL+this.props.movie.poster_path} onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="assets/img/notFound.png";
              }}/>
              <div>
                  <div>Date : {this.props.movie.release_date}</div>
                  <div>Titre : {this.props.movie.title}</div>
                  <div>Vote : {this.props.movie.vote_average*10}%</div>
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
      movieDAO.getPopulars().then((data) => {
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
            <input value={this.state.query} id="search" placeholder="Rechercher..."
            onChange={this.handleInput}/>
        </header>

        <section className="content">
          {Aucunfilm}
            {this.state.movies.map(element => (
              <Movies key={element.id} movie={element}/>
            ))}
        </section>
    </div>
  )}
}

const root = ReactDOM.createRoot(document.querySelector("#app_container"));
root.render(<App />);