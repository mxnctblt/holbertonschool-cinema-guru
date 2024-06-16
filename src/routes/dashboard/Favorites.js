import {useEffect, useState} from "react";
import axios from "axios";
import MovieCard from "../../components/movies/MovieCard";

const Favorites = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:8000/api/titles/favorite", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                    if (response.status === 200) {
                        setMovies(response.data);
                    }
                } catch (e) {
                    console.error(e)
                }
            }
        }
        fetchFavoriteMovies()
    }, []);
    
    return (
        <div className="outlet-container">
            <h1 className="title">MOVIES YOU LIKE</h1>
            <div className="movies-container">
                {movies.map((movie, index) => {
                    return <MovieCard movie={movie} key={movie.id}/>
                })}
            </div>
        </div>
    );
};

export default Favorites;
