import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi'; 
import { FaGithub } from 'react-icons/fa';
import logo from '../assets/logo.png';

const navLinkStyle = ({ isActive }) =>
    `px-3 py-2 text-base font-medium transition-colors duration-200 
    ${isActive
        ? 'text-violet-700 border-b-2 border-violet-700'
        : 'text-gray-800 hover:text-violet-500'
    }`;

const Navbar = () => {
    const navLinks = [
        { path: "/", name: "Home" },
        { path: "/apps", name: "Apps" },
        { path: "/my-installations", name: "Installation" },
    ];

    return (
        <div className="navbar bg-white shadow-md border-b border-gray-100 mx-auto max-w-full">

            <div className="navbar-start">

                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-2">
                        <HiMenuAlt3 className="h-6 w-6 text-gray-800" />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-lg z-[10] mt-4 w-52 p-2 shadow-lg text-gray-800 border border-gray-100">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <NavLink to={link.path} className={navLinkStyle}>
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                <Link to="/" className="flex items-center gap-2 ml-4 md:ml-0 cursor-pointer transition-transform hover:scale-[1.05]">
                    <img src={logo} alt="HERO.IO" className="h-7" />
                    <span className="text-xl text-gray-800 font-extrabold">HERO.IO</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex space-x-8 text-gray-800">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <NavLink to={link.path} className={navLinkStyle}>
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="navbar-end">
                <a
                    className="btn border-none bg-purple-700 text-white font-medium py-2 px-5 rounded-lg shadow-md transition-transform duration-200 hover:scale-105 hover:bg-purple-800"
                    href="https://github.com/Shanjida-Islam138"
                    target="_blank"
                    rel="noreferrer">
                    <FaGithub className="h-4 w-4 mr-2" />
                    Contribution
                </a>
            </div>
        </div>
    );
};

export default Navbar;