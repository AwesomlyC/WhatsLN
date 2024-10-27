import React, { useEffect, useState } from 'react';
import pkceChallenge from 'pkce-challenge';
const Account = () => {
    console.log("Loading..");
    const [save, setSave] = useState(null);
    const redirect_uri = "http://localhost:3000/callback"
    const state = 'xyz'
    useEffect(() => {
    

    })
    const test = async () => {
        const challenge = await pkceChallenge(128);
    
        console.log(challenge);
        console.log(challenge.code_verifier);
        console.log(challenge.code_challenge);
        const code_challenge = challenge.code_challenge;
        const client_id = '6be04cad591aae12fa46acb1bf9b12aa';
        localStorage.setItem('code', code_challenge);
        localStorage.setItem('code_verifier', challenge.code_verifier);
        const authUrl = `https://myanimelist.net/v1/oauth2/authorize?` +
            `response_type=code&` +
            `client_id=${client_id}&` +
            `redirect_uri=${encodeURIComponent(redirect_uri)}&` +
            `state=${state}&` +
            `code_challenge=${encodeURIComponent(code_challenge)}&` +
            `code_challenge_method=plain`;
        // Send the user to MAL authorization url
        window.location.href = authUrl;

        // TEST ACCOUNT
        // USERNAME --> random_guy215
        // Password --> Normal
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