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
        <div className='drop-down'>
            <NavDropdown title="About" id="basic-nav-dropdown" className="custom-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                Separated link
                </NavDropdown.Item>
            </NavDropdown>
        </div>
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
