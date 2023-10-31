
import React from 'react';
import { BrowserRouter as Router, Route, Link,Routes } from 'react-router-dom';
import Home from "./assets/components/Home";
import Gameblog from './assets/components/Gameblog';
import Search from './assets/components/Search'
import './App.css'
import logo2 from './images/logo2.png'
export default function App() {
    return (
        <div>
            <nav className="navbar">
                <div className="nav-links">
                    <img src={logo2} className='logo'></img>
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/gameSearch" className="nav-link">Search List</Link>
                    <Link to="/gameblog" className="nav-link">DA blog</Link>
                </div>
            </nav>
 
                <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/gameblog" element={<Gameblog />} />
                <Route path="/gameSearch" element={<Search />} />
                </Routes>
        </div>
    )
}
