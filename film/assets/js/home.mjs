

const key = '381cc2db27bb9cdcd712453cd2b2669b'
const baseURL = 'https://api.themoviedb.org/3'
const imgURL = 'https://image.tmdb.org/t/p/w1280'

const movieDAO = {
    getById : async (id) =>
    {
        const suffix = `/movie/${id}?api_key=${key}&language=fr`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
    getCredit : async (id) =>
    {
        const suffix = `/movie/${id}/credits?api_key=${key}&language=fr`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    },
    getReco : async (id) =>
    {
        const suffix = `/movie/${id}/recommendations?api_key=${key}&language=fr`
        const res = await fetch(baseURL + suffix)
        const data = await res.json()
        return data
    }
}


const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("movie"));
//let element = await movieDAO.getById(id)
//if(element.title == undefined)document.location.href="populaires.html"

// const constructmovie=await movieDAO.getById(id)
// const constructcast=await movieDAO.getCredit(id)
// const constructreco=await movieDAO.getReco(id)

       

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        movie: null,
        cast:[],
        reco:[]
      };
    }
    componentDidMount() {
        movieDAO.getById(id).then((data) => {
            this.setState({ movie: data});
          });
        movieDAO.getCredit(id).then((data) => {
          this.setState({ cast: data.cast});
        });
        movieDAO.getReco(id).then((data) => {
          this.setState({ reco: data.results});
        });
      }

    render(){
      console.log(this.state.cast)
      const body=document.querySelector('body')
      if(body.style.backgroundImage==""&&this.state.movie!=null)body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)),url(${imgURL}${this.state.movie.backdrop_path})`;
  
      if(this.state.movie!=null&&this.state.movie.success == false){
        document.location.href="populaires.html"
      }
      let moviesec
      if(this.state.movie!=null)moviesec=<Movie movie={this.state.movie}/> 


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
          {moviesec}
          <div className="video">
  
          </div>
          <div className="actor">
            <h1>Casting :</h1>
            {this.state.cast.map(element => (
              <Actor key={element.id} cast={element}/>
            ))}
  
          </div>
          <div className="reco">
            <h1>Recommendations :</h1>
            {this.state.reco.map(element => (
              <Reco key={element.id} movie={element}/>
            ))}
          </div>
          <footer>
            <a href="../../">By <span>Al</span>exandre <span>Cl</span>énet</a>
          </footer>
      </div>
    )}
  }
  
  const root = ReactDOM.createRoot(document.querySelector("#app_container"));
  root.render(<App />);

  function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return hours+"h"+minutes+"m";
  }


  class Movie extends React.Component{
    render(){
      return(
      <section className="content">
          <div className="profil">
            <img src={imgURL + this.props.movie.poster_path} onError={({ currentTarget }) => {
              currentTarget.onerror = null 
              currentTarget.src = "assets/img/notFound.png" // si l'image charge pas
            } } width="480px" />
            <div className="profilinfo">
                <h1>{this.props.movie.title}</h1>
                <p>{this.props.movie.release_date}   {Math.round(this.props.movie.vote_average*10,0)}%  {toHoursAndMinutes(this.props.movie.runtime)}</p>
                <p>{this.props.movie.genres.map(cat =>
                  cat.name+" "  
                )}</p>
                <h2>{this.props.movie.tagline}</h2>
                <p>{this.props.movie.overview}</p>
                <p>Réalisateur :</p>
                <p>Casting :</p>
            </div>
          </div>
  
      </section>
    )}
  }

  
  class Reco extends React.Component{
    render(){
      return(
      <article key={this.props.movie.id}>
          <a href={"../film/?movie="+this.props.movie.id}>
              <img src={imgURL+this.props.movie.poster_path} onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="assets/img/notFound.png";
              }} width="200px"/>
              <div>
                  <div>Date : {this.props.movie.release_date}</div>
                  <div>Titre : {this.props.movie.title}</div>
                  <div>Vote : {this.props.movie.vote_average*10}%</div>
              </div>
          </a>

      </article>
      )
  }}

  class Actor extends React.Component{
    render(){
      return(
        <article key={this.props.cast.id}>
            <a href={"../acteur/?actor="+this.props.cast.id}>
                <img src={imgURL+this.props.cast.profile_path} onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="assets/img/notFound.png";
                }} width="200px"/>
                <div>
                    <div>Role : {this.props.cast.character}</div>
                    <div>Nom : {this.props.cast.name}</div>
                    <div>Vote : {this.props.cast.vote_average*10}%</div>
                </div>
            </a>
  
        </article>
        )
  }}
    