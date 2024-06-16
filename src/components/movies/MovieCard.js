import './movies.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar, faClock} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarRegular, faClock as faClockRegular} from '@fortawesome/free-regular-svg-icons';
import moviePlaceholder from '../../assets/movie-placeholder.png'

const MovieCard = ({movie}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);
    useEffect(() => {
        const fetchFavorite = async (token) => {
            try {
                const response = await axios.get("http://localhost:8000/api/titles/favorite", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                if (response.status === 200) {
                    const favorites = response.data;
                    const isFavoriteMovie = favorites.filter((fav) => fav.imdbId === movie.imdbId)
                    if (isFavoriteMovie.length > 0) {
                        setIsFavorite(true);
                    }
                }
            } catch (e) {
                console.error(e)
            }
        };
        const fetchWatchLater = async (token) => {
            try {
                const response = await axios.get("http://localhost:8000/api/titles/watchlater", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                if (response.status === 200) {
                    const watchlater = response.data;
                    const isWatchLaterMovie = watchlater.filter((watch) => watch.imdbId === movie.imdbId)
                    if (isWatchLaterMovie.length > 0) {
                        setIsWatchLater(true);
                    }
                }
            } catch (e) {
                console.error(e)
            }
        };

        const token = localStorage.getItem('accessToken');
        if (token) {
            fetchFavorite(token);
            fetchWatchLater(token);
        }


    }, [movie]);

    const handleClick = async (type) => {
        if (type === 'watchLater') {
            if (isWatchLater) {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    try {
                        const response = await axios.delete(`http://localhost:8000/api/titles/watchlater/${movie.imdbId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            }
                        });
                        if (response.status === 200) {
                            setIsWatchLater(false);
                        }
                    } catch (e) {
                        console.error(e)
                    }
                }
            } else {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    try {
                        const response = await axios.post(`http://localhost:8000/api/titles/watchlater/${movie.imdbId}`, {},
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                }
                            })
                        if (response.status === 200) {
                            setIsWatchLater(true);
                        }
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
            setIsWatchLater(!isWatchLater);

        } else if (type === 'favorite') {
            if (isFavorite) {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    try {
                        const response = await axios.delete(`http://localhost:8000/api/titles/favorite/${movie.imdbId}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            }
                        });
                        if (response.status === 200) {
                            setIsFavorite(false);
                        }
                    } catch (e) {
                        console.error(e)
                    }
                }
            } else {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    try {
                        const response = await axios.post(`http://localhost:8000/api/titles/favorite/${movie.imdbId}`, {},
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                }
                            })
                        if (response.status === 200) {
                            setIsFavorite(true);
                        }
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
            setIsFavorite(!isFavorite);
        }
    }
    return (
        <li className="movie-card">
            <div className="add-list">
                <FontAwesomeIcon
                    icon={isWatchLater ? faClock : faClockRegular}
                    onClick={() => handleClick('watchLater')}
                />
                <FontAwesomeIcon
                    icon={isFavorite ? faStar : faStarRegular}
                    onClick={() => handleClick('favorite')}
                />
            </div>

            <div className="movie-card-header">
                <img src={movie.imageurls[0] ? movie.imageurls[0] : moviePlaceholder} alt=""
                     onError={(e) => {
                         e.target.src = moviePlaceholder;
                         e.target.onerror = null;
                     }}/>
                <div className="movie-title">{movie.title}</div>
            </div>

            <div className="movie-card-description">
                <p>{movie.synopsis ? movie.synopsis : "Not available"}</p>
                <div className="tags">
                    {movie.genres.map((tag, index) => (
                        <span key={index} className="tag selected">{tag}</span>
                    ))}
                </div>
            </div>
        </li>
    );
};

export default MovieCard;
