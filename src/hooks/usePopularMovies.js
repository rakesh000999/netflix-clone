import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

// custom hook to make Browse Component look clear otherwise we can simply code it there
const usePopularMovies = () => {

    // Fetch data from TMDB API and update store
    const dispatch = useDispatch();

    const getPopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1',
            API_OPTIONS
        );

        const json = await data.json();

        dispatch(addPopularMovies(json.results));
    };

    useEffect(() => {
        getPopularMovies();
    }, []);
};

export default usePopularMovies;