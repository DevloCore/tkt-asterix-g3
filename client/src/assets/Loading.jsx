import React, { useContext } from 'react';
import './loading.css'
import { UserContext } from './contexts/UserContext';

const Loading = () => {
    const userCon = useContext(UserContext);

    return (
        <>
            {userCon.loading && (
                <div className="loadingScreen">
                    <div class="fulfilling-bouncing-circle-spinner">
                        <div className="circle"></div>
                        <div className="orbit"></div>
                    </div>
                    <span className="loadingText">Chargement...</span>
                </div>
            )}
        </>
    );
};

export default Loading;