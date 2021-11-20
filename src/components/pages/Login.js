import { useState } from 'react';
import './Login.scss';

const Login = ({setShowLoginMenu}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const handleSubmit = (evt) => {
        evt.preventDefault();

        fetch(process.env.REACT_APP_API_URL + "/login", {
            method:'POST',
            credentials: "include",
            body: JSON.stringify({ 
                email: email,
                password: password })
        })
        .then(async response => {
            const data = await response;
            
            setEmail("")
            setPassword("")

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            const userData = await data.json();
            
            localStorage.setItem('userID', userData['ID'])
            localStorage.setItem('userEmail', userData['Email'])

            setShowLoginMenu(false)
          })
          .catch(error => {
              console.error('There was an error!', error);
          });

          
    }
    return (
        <form className="loginForm" onSubmit={handleSubmit}>
            <div className="formControl">
            <label>Email</label>
            <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                </div>
            <div className="formControl">
            <label>Password</label>

            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </div>


        <input type="submit" className="btn-dark" value="Submit" />
        </form>
    );
}

export default Login
