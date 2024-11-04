import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Login = () => {
    const test = async () => {
        // TEST ACCOUNT
        // USERNAME --> random_guy215
        // Password --> Normal
        window.location.href= `${process.env.REACT_APP_BACKEND_API}/login`
    }

    const testCallback = () => {
        window.location.href = '/Callback';
    }
    const testAccountinfo = () => {
        window.location.href = '/account'
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

export default Login;