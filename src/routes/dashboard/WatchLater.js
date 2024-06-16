import {useEffect, useState} from "react";
import axios from "axios";
import MovieCard from "../../components/movies/MovieCard";

const WatchLater = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchWatchLaterMovies = async () => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:8000/api/titles/watchlater", {
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
        fetchWatchLaterMovies()
    }, []);
    return <div className="outlet-container">
        <h1 className="title">MOVIES TO WATCH LATER</h1>
        <div className="movies-container">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie.id}/>
            ))}
        </div>
    </div>;
};

export default WatchLater;
