import React from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
function Callback() {

  const [searchParams] = useSearchParams();
  const authorization_code = searchParams.get('code');
  const state = searchParams.get('state');

  // console.log(state);
  // console.log(authorization_code);
  const exchangeUrl = `https://myanimelist.net/v1/oauth2/token`;
 
  let code_verifier = localStorage.getItem('code_verifier');
  
  const test = async () => {

    window.location.href = `http://localhost:5000/api/light-novels/callback?code=${authorization_code}`;
    // axios.get(`http://localhost:5000/api/light-novels/callback`, {
    //   authorisation_code: authorization_code,
    //   code_verifier: code_verifier
    // }).then(function (response) {
    //   console.log("WORKS IN FRONTEND: " + response.data );
    // }).catch(error => {
    //   console.log("FAILED: " + error);
    // })

    // const url = 'https://myanimelist.net/v1/oauth2/token'
    // const data = {
    //   'client_id': process.env.REACT_APP_CLIENT_ID,
    //   'client_secret': process.env.REACT_APP_CLIENT_SECRET,
    //   'code': authorization_code,
    //   'code_verifier': code_verifier,
    //   'grant_type': 'authorization_code'
    // }
    // axios.post(url, data);
    // localStorage.removeItem('code_verifier');
    // console.log("Deleted code_verifier: " + localStorage.getItem('code_verifier'));
    // code_verifier = localStorage.getItem('code_verifier');
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