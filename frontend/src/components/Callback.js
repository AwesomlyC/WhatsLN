import React from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
function Callback() {

  const [searchParams] = useSearchParams();
  const authorization_code = searchParams.get('code');
  const state = searchParams.get('state');

  console.log(state);
  const code_verifier = localStorage.getItem('code_verifier');
  const client_id = '6be04cad591aae12fa46acb1bf9b12aa';
  const redirect_uri = "http://localhost:3000/callback"
  const exchangeUrl = `https://myanimelist.net/v1/oauth2/token`;
  const client_secret = `7f70fa7edfebc29c65af232e1f5fa445de1577885a80782618063dc9142381aa`;
  // const data = {
  //   grant_type: 'authorization_code',
  //   code: authorization_code,
  //   redirect_uri: redirect_uri,
  //   client_id: client_id,
  //   client_secret: client_secret,
  //   code_verifier: code_verifier
  // }
  // const test = async () => {
  //   try {
  //     // Make the POST request to exchange the authorization code for an access token
  //     const response = await axios.post(exchangeUrl, data, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     });

  //     // Access token response contains token details
  //     console.log('Access Token Response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error exchanging authorization code:', error.response?.data || error.message);
  //     throw error;
  //   }
  // }

  const test = async () => {
    axios.post(`http://localhost:5000/api/light-novels/testoauth`, {
      clientId: client_id,
      clientSecret: client_secret,
      grant_type: "authorization_code",
      code: authorization_code,
      redirect_uri: redirect_uri,
      code_verifier: code_verifier
    }).then(function (response) {
      console.log("WORKS IN FRONTEND: " + response.data );
    }).catch(error => {
      console.log("FAILED: " + error);
    })
  }
  
  return (
      <div>
          Callback
          <br />
          <text>Authorization Code: {authorization_code}</text>
          <br />
      <text>State: {state}</text>
      <br />
      <text>Code_Verifier: {code_verifier}</text>
      <br />
      <button onClick={test}>Connect to MAL</button>
      
        

    </div>
  )
}

export default Callback