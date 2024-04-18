import React, { useContext } from 'react';
import './loading.css'
import { UserContext } from './contexts/UserContext';

const Loading = () => {
    const userCon = useContext(UserContext);

    return (
        <>
            {userCon.loading && (
                <div class="loadingScreen">
                    <div class="fulfilling-bouncing-circle-spinner">
                        <div class="circle"></div>
                        <div class="orbit"></div>
                    </div>
                    <span class="loadingText">Chargement...</span>
                </div>
            )}
        </>
    );
};

export default Loading;