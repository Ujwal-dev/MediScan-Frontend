import React ,{useContext} from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css"
import UserContext from '../../Contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const {user , setUser} = useContext(UserContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    // Clear user data from state
    setUser("");

    // Clear user data from localStorage
    localStorage.removeItem('user');
  };
  return (
    <header className='header'>
        {/* <Logo></Logo> */}
        <h2 className='header--title' onClick={() => navigate("/")}>MEDI-SCAN</h2>
        <span className='header--chatlink' onClick={() => navigate("/chat-bot")}>Medi Chat</span> 
        <span className='header--span'>
      {
        user !== "" ?(
          // Show email if logged in
            <NavDropdown title={user} id="basic-nav-dropdown" className="custom-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>        ) : (
          // Show login/register links if not logged in
          <>
            <Link to="/login">Login</Link> /
            <Link to="/register">Register</Link>
          </>
        )
      }
    </span>
    </header>
  )
}

export default Header
