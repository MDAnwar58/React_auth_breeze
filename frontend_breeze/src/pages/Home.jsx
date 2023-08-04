import React from 'react';
import useAuthContext from "../context/AuthContext";

const Home = () => {
    const { user } = useAuthContext();
    return (
        <div className="max-w-7xl mx-auto mt-12">
            {user ? '' : 'Please Login Your Account'}
            <h4>{user ? "Name: "+user.name : ''}</h4>
            <p>{user ? "Email: "+user.email : ''}</p>
        </div>
    );
};

export default Home;