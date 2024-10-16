import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import * as Style from '@/components/playerPage/styles';
import WatchTrailer from '@/components/playerPage/trailerPlayback';

import { tmdbObjProps } from "@/components/contexts/tmdbContext";

type headerProps = {
    playerData: tmdbObjProps[];   
};

export default function Header( props: headerProps ) {
    
    /*Função que obtem o ano de lançamento de um filme ou serie*/
    const getReleaseDate = ( date: any[] ) => {
        if ( !date ) return
        const newDate = [];
        for ( let i = 0; i < 4; i++ ) {
            newDate.push( date[i] );
        }
        return newDate;
    };

    const getCompanyLogo = ( companiesList: tmdbObjProps[] ) => {
        for ( let company of companiesList ) {
            if ( company.logo_path ) {
                return (
                    <LazyLoadImage 
                        src={`https://image.tmdb.org/t/p/original${company.logo_path}`} 
                        alt={`${company.name} logo image`} 
                        width={200}
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

    const getRunTime = ( runtime: number | null ) => {

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

    
    return (
        <Style.HeaderWrapper>
            <div className='w-full'>
                { props.playerData?.map( item =>  (
                    <div key={item.id} className="w-full relative">
                        <LazyLoadImage
                            src={`https://image.tmdb.org/t/p/original/${item.backdrop_path ?? item.poster_path}`}
                            alt={`${item.title ?? item.name} serie/movie presentation image`}
                            width='100%'
                            className='bg-darkpurple object-cover w-screen h-screen max-h-[660px] xl:max-h-[750px] 2xl:max-h-[800px]'
                            effect="opacity"
                            placeholderSrc={`https://image.tmdb.org/t/p/w500/${item.poster_path ?? item.backdrop_path}`}
                        />

                        <div className='w-full z-20 absolute bottom-10 px-4 flex flex-col gap-y-1 items-start md:pl-6 lg:pl-8'>
                            <h1 className='font-raleway font-extrabold w-4/5 text-3xl text-start line-clamp-2 md:max-w-md'>
                                { item.title ?? item.name }
                            </h1>

                            <div className="w-full flex flex-row items-center gap-x-5 justify-start">
                                <p className='bg-orangered my-3 rounded-md flex items-center w-fit px-3 h-7 text-base font-normal font-noto_sans'>
                                        { getReleaseDate( item.release_date ?? item.first_air_date )}
                                </p>

                                { item.seasons?.length > 0 && <p className="font-noto_sans whitespace-nowrap text-base font-normal text-neutral-400">{item.seasons.length} Temporada(s)</p> }

                                { getRunTime( item.runtime ?? null )}

                                { getCompanyLogo( item.production_companies )}
                            </div>

                            <WatchTrailer showName={item.name ?? item.title} showKey={item.videos.results[0]?.key ?? null}/>
                        </div>

                        <div className="overlay"></div>
                        <div className='second-overlay'></div>
                    </div>
                ))}

            </div>
        </Style.HeaderWrapper>
    );
};