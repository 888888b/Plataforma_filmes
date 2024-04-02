import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { LuPlay, LuSearch } from "react-icons/lu";
import Search from "/src/components/SearchBar";
import { Swiper, SwiperSlide } from '/src/components/swiper/Swiper.jsx';
import { Pagination } from 'swiper/modules';
import { CgClose } from "react-icons/cg";
import '/src/App.css';
import 'swiper/css';
import 'swiper/element/css/pagination';
import '/src/App.css';

function Header({HeightScroll}) {
  const movieIds = [458156, 346698, 298618, 507089];
  const [moviesDetails, setMoviesDetails] = useState([]);
  const apiKey = "df087968ddf338b4ac0f9876af17f739";
  const apiURL = 'https://api.themoviedb.org/3/';
  const app = useRef();
  const [autorizado, setAutorizado] = useState(false);
  const navigate = useNavigate();
  const [btnAtivo, setBtnAtivo] = useState('btnDesativado');
  const [type, setType] = useState('filme');
  const divOpacity = useRef();
  const [hideBar, setHideBar] = useState(true);
  const ContainerHeader = useRef();

  const btnNavigate = (e) => {
    navigate(`/${e.target.id}`)
    if (e.target.id === '') {
      setBtnAtivo('btnDesativado');
    }
  }

  const handleClick = (e) => {
    const valor = e.target.attributes.value.value;
    navigate(`/Page/${valor}/${type}`);
  }

  const btnClick = () => {
    if (btnAtivo === 'btnDesativado'){
      setBtnAtivo('btnAtivo')
    }else{
      setBtnAtivo('btnDesativado')
    }
  }

  const HandleHideChange = (newValue) => {
    setHideBar(newValue);
    divOpacity.current.style.opacity = '0';
    setTimeout(() => {
      divOpacity.current.style.zIndex = '-200';
    }, 300);
  }

  const hideBarSearch = () => {
    if (hideBar === true) {
      setBtnAtivo('desativado');
      setHideBar(false);
      divOpacity.current.style.opacity = '.9';
      divOpacity.current.style.zIndex = '100';
      divOpacity.current.style.height = `${HeightScroll}px`;
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      setAutorizado(true);
    }, 1000);

    const fetchMovies = async () => {
      try {
        const moviePromises = movieIds.map(async (movieId) => {
           const bilheteria = await fetch(`${apiURL}/movie/${movieId}?api_key=${apiKey}&language=pt-BR&page=1&include_image_language=pt`)
           return bilheteria.json();
        });
         const data = await Promise.all(moviePromises);
         setMoviesDetails(data);
      } catch (error) {
        console.log(error);
      }
       
    }

    fetchMovies();
  },[])
  
  return autorizado ? (
    <main ref={ContainerHeader} id="header-main">
      <div ref={divOpacity} className="opacity-div"></div>
          <div className="header-links">
            <Search onValueChange={HandleHideChange} hide={hideBar}/>
            <div className='links-content'>
              <div id="btn-filmes-series" className="link-icons">
                <button onClick={btnClick} className="btn-menu">|||</button>
                <a className="btn-header" id="Filmes" onClick={btnNavigate}>Filmes</a>
                <a className="btn-header" id="Series" onClick={btnNavigate}>Séries</a>
              </div>

              <div className="links-titulo">
                <h1>MovieZilla</h1>
              </div>

              <div className='link-icons'>
                <LuSearch onClick={hideBarSearch} className='lupa-icon'/>
                <div className="button-header-div">
                  <button className="icon-conta" id='Perfil' onClick={btnNavigate}>C</button>
                  <h3 id="Perfil" onClick={btnNavigate}>Conta</h3>
                </div>
              </div>
              
            </div>
        </div>

        <div className="div-menu" id={btnAtivo}>
          <ul>
            <li><button><CgClose onClick={btnClick} className="close-icon"/></button></li>
            <li><p id="" onClick={btnNavigate}>Inicio</p></li>
            <li><p id="Filmes" onClick={btnNavigate}>Filmes</p></li>
            <li><p id="Series" onClick={btnNavigate}>Series</p></li>
            <li><p onClick={hideBarSearch}>Pesquisar</p></li>
            <li><p id="Perfil" onClick={btnNavigate}>Conta</p></li>
          </ul>
        </div>
      <header>
        <div className='header-images' ref={app}>
          <Swiper className='swiper' slidesPerView={1} autoplay={{delay: 5000}} speed='800' loop='true' pagination={{clickable: true}} modules={[Pagination]}>
              {moviesDetails.map((movie) => (
                <SwiperSlide className='slide'>
                  <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} className="slide-image"/>
                  <div className="header-slide-details">
                    <h1>{movie.title}</h1>
                    <p>{movie.tagline}</p>
                    <button onClick={handleClick} value={movie.id} id="btn-play"><LuPlay onClick={handleClick} value={movie.id} id="icon" /></button>
                  </div>
                  <div className='end-header'></div>
                </SwiperSlide>
              ))};
          </Swiper>

        </div>
      </header>
    </main>
  ) : null;
}


export default Header;