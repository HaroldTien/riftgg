import React from 'react';
import { Link } from 'react-router-dom';
const AfterLogin = ({ username }) => {
    return (
        <div className="after-login">
            <h1>Welcome, {username}!</h1>
            <p>You have successfully logged in.</p>
            {/* Additional content or links can go here */}
            <Link to='/community/technical' >Go </Link>
        </div>
    );
};

export default AfterLogin;
