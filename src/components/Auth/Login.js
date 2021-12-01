import { useState } from "react";
import "./Auth.scss";
import { useNavigate } from "react-router-dom";
import SetUserInfo from "../SetUserInfo";

const Login = ({ setShowLoginMenu }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUserInfo = SetUserInfo();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch(process.env.REACT_APP_API_URL + "/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(async (response) => {
        const data = await response;

        setEmail("");
        setPassword("");

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        setUserInfo();
        setShowLoginMenu(false);

        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <form className="form loginForm" onSubmit={handleSubmit}>
      <div className="formControl">
        <label>Elektroninis paštas</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="formControl">
        <label>Slaptažodis</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="formControl">
        <input type="submit" className="btn-dark" value="Prisijungti" />
      </div>
    </form>
  );
};

export default Login;
