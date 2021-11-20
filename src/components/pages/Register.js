import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const navigate = useNavigate()
  
    const handleSubmit = (evt) => {
        evt.preventDefault();

        fetch(process.env.REACT_APP_API_URL + "/register", {
            method:'POST',
            body: JSON.stringify({ 
                email: email,
                password: password,
                repeatPassword: repeatPassword })
        })
        .then(async response => {
            const data = await response;

            if (!response.ok) {
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            navigate(-1);
            
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

            <div className="formControl">
            <label>Repeat password</label>

            <input
                type="password"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                />
            </div>


        <input type="submit" className="btn-dark" value="Submit" />
        </form>
    );
}

export default Register