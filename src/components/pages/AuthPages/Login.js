import { useState } from 'react';
import './Auth.scss';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

const Login = ({setShowLoginMenu}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [cookies, ,] = useCookies(['Access-Token', 'Refresh-Token']);
  
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
            
            console.log("bbz login")
            console.log(cookies['Access-Token'])

            setShowLoginMenu(false)

            navigate('/');
          })
          .catch(error => {
              console.error('There was an error!', error);
          });

          
    }
    return (
        
        <form onSubmit={handleSubmit} style={{position: 'absolute', top: '75px'}}>
            <div className="formControl">
            <label>Elektroninis paštas</label>
            <input
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
                />
                </div>
            <div className="formControl">
            <label>Slaptažodis</label>

            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
            </div>


        <input type="submit" className="btn-dark" value="Prisijungti" />
        </form>
    );
}

export default Login
