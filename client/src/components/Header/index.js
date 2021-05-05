import React from 'react';
// link component for nav so you can change the URL while staying on the same page
import { Link } from 'react-router-dom'
import Auth from '../../utils/auth'

const Header = () => {

  const logout = event => {
    // override <a> elements default nature of having browser load a different resource
    event.preventDefault()
    Auth.logout()
  }

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <h1>Deep Thoughts</h1>
        </Link>

        <nav className="text-center">
          {/* uses to instead of href */}
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )
        }
        </nav>
      </div>
    </header>
  );
};

export default Header;
