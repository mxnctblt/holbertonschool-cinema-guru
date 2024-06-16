import {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/general/Button";
import Filter from '../../components/movies/Filter';
import MovieCard from "../../components/movies/MovieCard";


const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [minYear, setMinYear] = useState(1970);
    const [maxYear, setMaxYear] = useState(2022);
    const [genres, setGenres] = useState([]);
    const [sort, setSort] = useState("");
    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const genresString = genres.toString()
                    const sortLower = sort.toLowerCase();
                    const response = await axios.get(
                        `http://localhost:8000/api/titles/advancedsearch?page=${page}&minYear=${minYear}&maxYear=${maxYear}&genres=${genresString}&title=${title}&sort=${sortLower}`,
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        })
                    if (response.status === 200) {
                        setMovies(response.data.titles);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }
        fetchMovies().catch(error => console.log(error));
    }, [page, minYear, maxYear, genres, sort, title]);

    const loadMovies = () => setPage(page + 1)
    return (
        <div className="outlet-container">
            <Filter minYear={minYear} setMinYear={setMinYear}
                    maxYear={maxYear} setMaxYear={setMaxYear}
                    sort={sort} setSort={setSort}
                    genres={genres} setGenres={setGenres}
                    title={title} setTitle={setTitle}
            />
            <div className="movies-container">
                {movies.map((movie) => (
                    <MovieCard movie={movie} key={movie.id}/>
                ))}
            </div>
            <Button label="Load More..." onClick={loadMovies}/>
        </div>
    );
};

export default HomePage;
