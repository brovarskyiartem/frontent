import React from 'react';
import { Link } from 'react-router-dom';
import './header_style.css'
const Header = () => {
  return (
    <header className="header">
      <div className="top-navigation-left">
        <Link to="/area" className="nav-link">Місцевість</Link>
        <Link to="/attractions" className="nav-link">Що подивитися</Link>
      </div>
      <Link to="/" className="top-navigation-center">
        <img className="nav-logo" src="./img/logo.png" alt="Logo" />
      </Link>
      <div className="top-navigation-right">
        <Link to="/weather" className="nav-link">Прогноз погоди</Link>
        <Link to="/coments" className="nav-link">Відгуки</Link>
        <Link to="/login" className="nav-link">Увійти</Link>
      </div>
    </header>
  );
};

export default Header;