import { useEffect, useState } from 'react';
import axios from 'axios';
import Authentication from './routes/auth/Authentication';
import Dashboard from './routes/dashboard/Dahsbord';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userUsername, setUserUsername] = useState('');

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const fetchAuth = async (token) => {
      if (token) {
        try {
          const response = await axios.post(
            'http://localhost:8000/api/auth',
            {},
            {
              headers: {
                authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            }
          );
          if (response.status === 200) {
            const username = response.data.username;
            setIsLoggedIn(true);
            setUserUsername(username);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchAuth(accessToken);
  }, []);
  return isLoggedIn ? (
    <Dashboard userUsername={userUsername} setIsLoggedIn={setIsLoggedIn} />
  ) : (
    <Authentication
      setIsLoggedIn={setIsLoggedIn}
      setUserUsername={setUserUsername}
    />
  );
}

export default App;
