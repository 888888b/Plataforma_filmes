import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { HiXMark } from "react-icons/hi2";
import { IoStar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Search({hide, onValueChange}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const apiKey = "df087968ddf338b4ac0f9876af17f739";
    const resultContainer = useRef();
    let Search = false;
    const main = useRef();
    const SearchBar = useRef();
    const Navigate = useNavigate();
    const btnMovies = useRef();
    const btnSeries = useRef();
    const [type, setType] = useState('filme');
    const [typeContent, setTypeContent] = useState('filme');

    const handleInputChange = (e) => {
        let value = e.target.value;
        setSearchTerm(value);
    }

    if (SearchBar.current) {
        if (hide === false) {
            resultContainer.current.style.zIndex = 140;
            SearchBar.current.style.transform = 'translateY(0%)';
        }else{
            resultContainer.current.style.zIndex = -200;
            SearchBar.current.style.transform = 'translateY(-100%)';
        }
    }

    const SearchNavigate = (e) => {
        const idMovie = e.target.id;
        console.log(e);
        Navigate(`/Page/${idMovie}/${typeContent}`);
        onValueChange(true);
    }

    const btnClickMovies = () => {
        setType('filme');
        btnMovies.current.style.border = '1pt solid white';
        btnSeries.current.style.border = '1pt solid red';
    };

    const btnClickSeries = () => {
        setType('serie');
        btnSeries.current.style.border = '1pt solid white';
        btnMovies.current.style.border = '1pt solid red';
    }

    useEffect(() => {
        if (type === 'filme') {
            const fetchMovies = async () => {
                try{
                    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${searchTerm}`);
                    const data = await response.json();
                    if (Search) {
                        setSearchResult(data.results);
                    }else{
                        setSearchResult([]);
                    }
                }catch (error) {
                    console.log(error);
                }
            }

            if (searchTerm.length > 2) {
                fetchMovies();
                Search = true;
                resultContainer.current.style.height = `450%`;
            }

            setTypeContent('filme');
        }else{
            const fetchMovies = async () => {
                try{
                    const response = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=pt-BR&query=${searchTerm}`);
                    const data = await response.json();
                    if (Search) {
                        setSearchResult(data.results);
                    }else{
                        setSearchResult([]);
                    }
                }catch (error) {
                    console.log(error);
                }
            }

            if (searchTerm.length > 2) {
                fetchMovies();
                Search = true;
                resultContainer.current.style.height = `450%`;
            }

            setTypeContent('serie');
        }


        if (hide === true) {
            setSearchTerm('');
            setSearchResult([]);
        }

        if (searchTerm.length <= 2) {
            Search = false;
            resultContainer.current.style.height = `0%`;
            setSearchResult([]);
        }

    },[searchTerm, hide, type]);

    return(
        <main ref={main} className="search-container-main">
            <div ref={SearchBar} className="search-bar-container">
                <div className="Search-input-container">
                    <LuSearch id="search-icon-bar" className="lupa-icon"/>
                    <input value={searchTerm} onChange={handleInputChange} type="text" className="inputSearch" placeholder="O que voce está procurando ?"></input>
                    <HiXMark onClick={() => onValueChange(true)} className="xmark-icon-input"/>
                </div>
                <div className="Search-options">
                    <label>
                        <button ref={btnMovies} onClick={btnClickMovies}>Filmes</button>
                    </label>

                    <label>
                        <button ref={btnSeries} onClick={btnClickSeries} >Series</button>
                    </label>
                </div>
            </div>

            <div ref={resultContainer} className="container-result">
                {searchResult.length > 0 ? (
                    <div className="titulo-result-container">
                        <h1>Resultados ({searchResult.length})</h1>
                        <hr id="line-result-titulo"></hr>
                    </div>
                ):null}
                {searchResult.map((movie) => (
                    <div className="result-container-movies">
                        <div  className="img-result-container">
                            {movie.poster_path !== null ? (
                                <img id={movie.id} onClick={SearchNavigate} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                            ):(
                                <img id={movie.id} onClick={SearchNavigate} src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}/>
                            )}
                        </div>

                        <div className="result-movies-info">
                            {movie.title ? (
                                <h2 className="pageTitle" id={movie.id} onClick={SearchNavigate} >{movie.title}</h2>
                            ):(
                                <h2 className="pageTitle" id={movie.id} onClick={SearchNavigate}>{movie.name}</h2>
                            )}

                            <div className="result-info-avaliação">
                                <h3>Avaliação</h3>
                                <div className="info-avaliação-div">
                                    <p>{movie.vote_average.toFixed(1)}</p>
                                    <p>/</p>
                                    <p><IoStar className="star-icon-avaliação"/></p>
                                </div>
                            </div>

                            {movie.overview ? (
                                <p id="descrição-result-id" className="descrição-movies-result">{movie.overview}</p>
                            ):(
                                <p className="descrição-movies-result">Descrição indisponivel</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Search;