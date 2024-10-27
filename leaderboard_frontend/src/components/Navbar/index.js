import { useState } from "react";
import { useAuth } from "../../context/authcontext";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useAuth();
    let parsedUser;

    // Check if user is a string, and parse it if necessary
    if (typeof user === 'string') {
        parsedUser = JSON.parse(user);
    } else {
        parsedUser = user; // Assuming user is an object here
    }

    const { data } = parsedUser || {};
    const { firstName, email, Points } = data || {};

    const [viewProfile, setViewProfile] = useState(false);

    const displayProfile = () => {
        setViewProfile(prev => !prev);
    };

    const logoutUser = () => {
        logout();
    };

    return (
        <nav className="h-16 w-full p-2 flex flex-row justify-between items-center bg-slate-800">
            <div className="flex flex-row justify-between w-2/4">
                <Link to='/' className="underline-offset-0"><p className="text-slate-50">Home</p></Link>
                <Link to='/leaderboard' className="text-slate-50"><p className="">LeaderBoard</p></Link>
                <button className="text-slate-50" type='button' onClick={displayProfile}>View Profile</button>
            </div>
            {viewProfile && (
                <div className="flex flex-col">
                    <p className="text-slate-50">{firstName}</p>
                    <p className="text-slate-50">{email}</p>
                    <p className="text-slate-50">{Points}</p>
                </div>
            )}
            <button className="bg-white h-6 w-24 rounded-xl hover:bg-transparent hover:text-white" type='button' onClick={logoutUser}>Logout</button>
        </nav>
    );
}

export default Navbar;
