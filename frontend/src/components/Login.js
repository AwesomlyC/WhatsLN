import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Account = () => {
    const test = async () => {
        // TEST ACCOUNT
        // USERNAME --> random_guy215
        // Password --> Normal
        window.location.href= `http://localhost:5000/api/light-novels/login`
    }

    const testCallback = () => {
        window.location.href = '/Callback';
    }
    const testAccountinfo = () => {
        axios.get('http://localhost:5000/api/light-novels/accountinfo', { withCredentials: true })
            .then(response => {
                console.log(response.data);
            }).catch(error => {
                console.error('error: ' + error);
             })
    }
    return (
         <div>
            <h1>MyAnimeList OAuth2 Example</h1>
            <button onClick={test}>Connect to MAL</button>
            <button onClick={testCallback}>Callback page test</button>
            <button onClick={testAccountinfo}>Account info button</button>


            </div>
    );
};

export default Account;