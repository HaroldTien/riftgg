// ErrorPage.js
import React from 'react';
import NavBar from '../components/NavBar';
import { useTranslation } from 'react-i18next';
import '../css/ErrorPage.css'; // Make sure to import the CSS for styling

const ErrorPage = () => {
    const {t} = useTranslation();
    return (
        <>
            <NavBar />
            <div className="error-container">
                
                <h2>{t('SummonerNotFound')}</h2>
                <p>{t('summonerNotFound-description')}.</p>
                <button onClick={() => window.location='/'}>{t('backToHome')}</button>
            </div>
        </>

    );
};

export default ErrorPage;
