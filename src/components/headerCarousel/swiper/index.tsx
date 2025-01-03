'use client';

// Interface de tipos para objetos retornados pela api do TMDB
import { tmdbObjProps } from '@/components/contexts/tmdbContext';

// Componente para carregamento preguiçoso de imagens
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

// Icones
import { PiArrowElbowDownRightBold } from "react-icons/pi";

// Modulos do Swiper.js para carousel de slides
import { Pagination, Autoplay, Navigation, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/element/css/autoplay';
import 'swiper/element/css/pagination';
import 'swiper/element/css/navigation';
import 'swiper/css/effect-fade';

import Link from "next/link";

import { HeaderSlides } from '../styles';
import IntroPoster from '../introPoster';

type contentDataProps = Record<string, any>;

type carouselProps = {
    currentPage: string;
    contentData: contentDataProps[];
};

export default function Carousel( props: carouselProps ) {

    /*Função que obtem o ano de lançamento de um filme ou serie*/
    const getReleaseDate = ( date: string ) => {
        const newDate = [];
        for ( let i = 0; i < 4; i++ ) {
            newDate.push( date[i] );
        }
        return newDate.join('');
    };

    // Carrega a imagem de logo da empresa de produção do conteudo caso esteja disponivel
    const getCompanyLogo = ( companiesList: tmdbObjProps[] ) => {
        for ( let company of companiesList ) {
            if ( company.logo_path ) {
                return (
                    <LazyLoadImage 
                        src={`https://image.tmdb.org/t/p/original${company.logo_path}`} 
                        alt={`${company.name} logo image`} 
                        height={28}
                        effect="opacity"
                        placeholderSrc={`https://image.tmdb.org/t/p/w92/${company.logo_path}`}
                        className="object-cover w-fit h-7 bg-neutral-400 rounded-md"
                    />
                )
            }
        };
    
        return null;
    };

    // Obtem o tempo de duração do filme 
    const getRunTime = ( runtime: number ) => {

        if ( !runtime || runtime === 0 ) {
            return
        };

        if ( runtime < 60 ) {
            return <p className="font-noto_sans whitespace-nowrap text-base font-normal text-neutral-400">{ runtime }m</p>
        };

        const hours = ( runtime / 60 ).toFixed(0);
        const minites = runtime % 60;

        return  <p className="font-noto_sans whitespace-nowrap text-base font-normal text-neutral-300">{ hours }h { minites }m</p>
    };

    // Obtem a nota do publico sobre o conteudo
    const getImdbReviews = ( vote_average: number, vote_count: number ) => {
        return (
            <p className='px-4 h-7 bg-darkslateblue whitespace-nowrap text-base font-normal font-noto_sans rounded flex items-center'>
                Imdb: { vote_average.toFixed(0) } 
                <span className='hidden md:inline ml-1'>({ vote_count })</span>
            </p>
        );
    };

    return (
        <HeaderSlides>
            <Swiper
                slidesPerView={1}
                spaceBetween={0}
                autoplay={{ delay: 7000 }}
                speed={200}
                resistance={false}
                loop={true}
                direction='horizontal'
                pagination={{ 
                    el: '.swiper-custom-pagination', 
                    clickable: true,
                }}
                navigation={{
                    prevEl: '.header-slides-prev',
                    nextEl: '.header-slides-next'
                }}
                modules={[ Pagination, Autoplay, Navigation, EffectFade ]}
                effect='fade'
                fadeEffect={{ crossFade: true }}
            >
                { props.currentPage === 'home' ? (
                    <SwiperSlide>
                        <IntroPoster/>
                    </SwiperSlide>
                ) : null }
                
                {/* Gerando slides com base na resposta da api do TMDB */}
                { props.contentData.map(( content ) => (
                    // Gera o slide caso tenha imagens disponiveis
                    content.backdrop_path || content.backdrop_path ? (
                        // Container do slide
                        <SwiperSlide key={ `${props.currentPage}-${content.id}` }>
                            <div className='flex flex-row-reverse slide-container'>
                                <div className='w-screen h-[660px] md:h-[400px] md:w-[50vw] xl:h-[420px]'>
                                    {/* Imagem do slide */}
                                    <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/original${content.poster_path ?? content.backdrop_path}`}
                                        height={'100%'}
                                        width={'100%'}
                                        alt={`${content.title ?? content.name} movie/serie presentation image`}
                                        placeholderSrc={`https://image.tmdb.org/t/p/w92/${content.poster_path ?? content.backdrop_path}`}
                                        className='bg-darkpurple object-cover w-full h-full'
                                        effect='opacity'
                                    />
                                </div>

                                {/* Informações do conteudo */}
                                <div className='w-full z-20 absolute bottom-10 px-4 md:bottom-14 md:pl-6 lg:pl-8 md:static md:w-1/2 md:flex md:items-start md:flex-col md:justify-center'>
                                    
                                    {/* Titulo */}
                                    <h1 className='font-raleway mx-auto w-3/4 font-extrabold text-[26px] text-center line-clamp-1 md:mx-0 md:text-left md:max-w-xs lg:max-w-sm xl:max-w-md md:text-3xl'>
                                        { content.title ?? content.name }
                                    </h1>

                                    <div className='flex gap-x-6 gap-y-3 flex-nowrap items-center mt-2 overflow-hidden justify-center md:justify-start'>

                                        {/* Ano de lançamento */}
                                        <p className='bg-orangered rounded-md w-fit px-3 h-7 flex items-center text-base font-normal font-noto_sans md:mx-0'>
                                            { getReleaseDate( content.release_date ?? content.first_air_date )}
                                        </p>

                                        {/* Numero de temporadas */}
                                        { content.seasons?.length > 0 && <p className="font-noto_sans whitespace-nowrap text-base font-normal text-neutral-400">{content.seasons.length} Temporada(s)</p> }

                                        {/* Tempo de duração */}
                                        {getRunTime( content.runtime ?? null )}

                                        {/* Nota do publico ao conteudo */}
                                        {getImdbReviews( content.vote_average, content.vote_count )}

                                        {/* Logo da produtora */}
                                        <div className='hidden 2xl:inline'>
                                            {getCompanyLogo( content.production_companies )}
                                        </div>
                                    </div>

                                    {/* Descrição */}
                                    <p className='line-clamp-2 text-center w-full mb-4 md:mb-7 mt-2 font-noto_sans text-base md:max-w-full md:text-left text-neutral-300 xl:max-w-md lg:text-[17px] lg:line-clamp-3 lg:max-w-sm leading-relaxed 2xl:max-w-lg'>
                                        { content.overview.length > 3 ? content.overview : `O lançamento de um dos mais aguardados filmes de uma sequencia de sucesso` }
                                    </p>

                                    {/* Link para o player */}
                                    <Link href={`/player/${ props.currentPage === 'home' || props.currentPage === 'movies' ? 'movie' : 'serie' }/${content.id}`}>
                                        
                                        <button className='w-full mx-auto outline-none h-12 btn text-white rounded-md text-base font-noto_sans font-semibold bg-darkslateblue flex justify-center items-center relative md:w-fit md:px-14 md:rounded-lg md:mx-0 hover:bg-darkslateblue border-none'>
                                            <PiArrowElbowDownRightBold className='absolute left-3 top-1/2 -translate-y-1/2' />
                                            Ir para { props.currentPage === 'home' || props.currentPage === 'movies' ? 'o filme' : 'a serie' }
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            <div className="overlay"></div>
                        </SwiperSlide>
                    ) : null
                ))}

                <div className="swiper-controller absolute bottom-0 left-1/2 -translate-x-1/2 box-border flex items-center justify-center mb-2 z-30">
                    {/* Botão para o slide anterior */}
                    <div className='header-slides-prev absolute w-fit rounded-full z-30 -translate-x-20 translate-y-[1px] cursor-pointer items-center justify-center hidden md:inline'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-6 text-neutral-500 hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                        </svg>
                    </div>

                    <div style={{position: 'static'}} className="swiper-custom-pagination"></div>

                     {/* Botão para o proximo slide */}
                     <div className='header-slides-next absolute w-fit rounded-full z-30 translate-x-20 cursor-pointer items-center justify-center translate-y-[1px] hidden md:inline'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-6  text-neutral-500 hover:text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </div>
            </Swiper>
        </HeaderSlides>
    );
};