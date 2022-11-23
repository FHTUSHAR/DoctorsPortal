import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const logOutBtn = () => {
        logOut()
            .then()
            .catch(e => console.log(e))
    }
    const navItems = <React.Fragment>
        <li><Link to={'/home'}>Home</Link></li>
        <li><Link>About</Link></li>
        <li><Link to={'/appointment'}>Appointment</Link></li>
        <li><Link>Reviews</Link></li>
        <li><Link>Contact Us</Link></li>
        {
            user ? <>
                <li><Link to={'/dashboard'}>Dashboard</Link></li>
                <li><button onClick={logOutBtn} className='btn btn-primary text-white'>Log Out</button></li>

            </>
                :
                <>
                    <li><Link to={'/login'}>Login</Link></li>
                </>
        }


    </React.Fragment>
    return (
        <div className="navbar bg-base-100 h-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">Doctors Portal</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {
                        navItems
                    }
                </ul>

            </div>
            <label htmlFor='dashboard-drawer' tabIndex={2} className="btn btn-ghost  lg:hidden ml-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
        </div>
    );
};

export default Navbar;