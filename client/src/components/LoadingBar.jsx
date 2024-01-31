// LoadingBar.js
import React, { useEffect } from 'react';
import '../css/LoadingBar.css'; // Make sure to import the CSS for styling

const LoadingBar = () => {
    return(
        <div className="loading-bar-container">
            <div className="loading-bar"></div>
        </div>
    );
};

export default LoadingBar;
