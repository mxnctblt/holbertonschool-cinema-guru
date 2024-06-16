import './components.css';

const Activity = ({username, movieTitle, type, date}) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    const formatedDate = new Date(date).toLocaleDateString('en-US', options);

    let action
    let word
    let displayType
    switch (type) {
        case 'removeFavorited': {
            action = 'removed'
            word = 'from'
            displayType = 'favorites'
            break
        }
        case 'favorite': {
            action = 'added'
            word = 'to'
            displayType = 'favorites'
            break
        }
        case 'removeWatchLater': {
            action = 'removed'
            word = 'from'
            displayType = 'watch later'
            break
        }
        case 'watchLater': {
            action = 'added'
            word = 'to'
            displayType = 'watch later'
            break
        }
        default:
            break
    }


    return (
        <li>
            <p>
                <span>{username}</span> {action} <span>{movieTitle}</span> {word} {displayType} - {formatedDate}
            </p>
        </li>
    );
};

export default Activity;
