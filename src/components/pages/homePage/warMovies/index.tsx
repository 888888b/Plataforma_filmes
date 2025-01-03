import { tmdbObjProps } from "@/components/contexts/tmdbContext";

import DefaultCarousel from "@/components/emblaCarousel/templates/default";

import useTmdbFetch from "@/components/hooks/tmdb";

export default async function WarCarousel() {

    const movies: tmdbObjProps[] = [];
    const { fetchMoviesByGenre } = useTmdbFetch();

    const response = await fetchMoviesByGenre('10752');
    response && movies.push( ...response );

    return movies.length ? ( 
        <DefaultCarousel contentData={movies} contentType="movie"/>
    ) : null;
};