import React, { useEffect, useState } from 'react';
import pkceChallenge from 'pkce-challenge';
import axios from 'axios';
const Account = () => {
    const test = async () => {
        // TEST ACCOUNT
        // USERNAME --> random_guy215
        // Password --> Normal
        window.location.href= `http://localhost:5000/api/light-novels/account`
    }

    const testCallback = () => {
        window.location.href = '/Callback';
    }
    return (
         <div>
            <h1>MyAnimeList OAuth2 Example</h1>
            <button onClick={test}>Connect to MAL</button>
            <button onClick={testCallback}>Callback page test</button>

            </div>
    );
};

export default Account;