import './navigation.css';

const Header = ({ userUsername, setIsLoggedIn }) => {
  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };
  return (
    <nav className="header">
      <p>Cinema Guru</p>
      <div className="container">
        <img src="https://picsum.photos/100/100" alt=""></img>
        <p>Welcome {userUsername}</p>
        <span onClick={logout}>Logout</span>
      </div>
    </nav>
  );
};

export default Header;
