import {useState} from 'react';
import './movies.css';

const Tag = ({genre, filter, genres, setGenres}) => {
    const [selected, SetSelected] = useState(false);

    const handleTag = (selected) => {
        if (selected) {
            const newGenreList = genres.filter(genreItem => genreItem !== genre);
            setGenres(newGenreList)
            SetSelected(false);
        } else {
            setGenres([...genres, genre]);
            SetSelected(true);
        }
    };
    return (
        <li
            className={`tag ${selected && 'selected'}`}
            onClick={() => handleTag(selected)}
        >
            {genre}
        </li>
    );
};

export default Tag;
