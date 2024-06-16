import './general.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({title, setTitle}) => {
    const handleInput = (e) => {
        setTitle(e.target.value);
    };
    return (
        <div className="search-bar">
            <input
                className="search-bar-input"
                value={title}
                onChange={handleInput}
                placeholder="Search Movies"
            ></input>
            <FontAwesomeIcon icon={faSearch} className="search-bar-icon"/>
        </div>
    );
};

export default SearchBar;
