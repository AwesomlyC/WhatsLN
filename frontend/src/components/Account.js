import React from 'react'
import axios from 'axios';
function Account() {



    const retrieveAccount = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_API}/accountinfo`, { withCredentials: true })
        .then(response => {
            console.log(response.data);
        }).catch(error => {
            console.error('error: ' + error);
         })
    }
  return (
    <div>Account</div>
  )
}

export default Account