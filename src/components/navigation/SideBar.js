import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolder, faStar, faClock, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import './navigation.css';
import Activity from '../Activity';

const SideBar = () => {
    const [selected, setSelected] = useState('home');
    const [small, setSmall] = useState(true);
    const [activities, setActivities] = useState([]);
    const [showActivities, setShowActivities] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    const response = await axios.get(
                        'http://localhost:8000/api/activity',
                        {
                            headers: {
                                authorization: `Bearer ${token}`,
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                    if (response.status === 200) {
                        setActivities(response.data);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchActivity();
    }, [showActivities]);

    const setPage = (pageName) => {
        setSelected(pageName);
        navigate(`/${pageName}`);
    };

    const navigationItem =
        [
            {name: 'home', icon: faFolder, nameDisplay: 'Home'},
            {name: 'favorites', icon: faStar, nameDisplay: "Favorites"},
            {name: 'watchlater', icon: faClock, nameDisplay: 'Watch Later'}
        ]

    return (
        <nav
            onMouseEnter={() => {
                setSmall(false)
                setShowActivities(true)
            }}
            onMouseLeave={() => {
                setSmall(true)
                setShowActivities(false)
            }}
            className={`side-bar ${small ? 'side-bar-small' : 'side-bar-expanded'}`}
        >
            <ul className="navigate">
                {navigationItem.map((item, i) => (
                    <li key={i} className={selected === item.name ? "selected" : ""}
                        onClick={() => setPage(item.name)}>
                        <FontAwesomeIcon icon={item.icon} className="icon"/>
                        {
                            !small &&
                            <div className='nav-title-container'>
                                <span className="nav-title">{item.nameDisplay}</span>
                                {selected === item.name && <FontAwesomeIcon icon={faArrowRight} className="icon"/>}
                            </div>
                        }
                    </li>
                ))}
            </ul>
            {showActivities && (
                <div className="activity">
                    <h1>Latest Activities</h1>
                    <ul>
                        {activities.slice(0, 10).map((activity) => (
                            <Activity
                                key={activity.id}
                                username={activity.user.username}
                                date={activity.createdAt}
                                movieTitle={activity.title.title}
                                type={activity.activityType}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default SideBar;
