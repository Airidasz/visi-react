import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.scss";

const Register = () => {
  useEffect(() => {
    document.title = "Registruotis";
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch(process.env.REACT_APP_API_URL + "/register", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        repeatPassword: repeatPassword,
      }),
    })
      .then(async (response) => {
        const data = await response;

        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        navigate(-1);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <div className="pageView">
      <form
        onSubmit={handleSubmit}
        className="form"
        style={{ marginTop: "59px" }}
      >
        <div className="formControl">
          <label>Elektroninio paštas</label>
          <input
            type="email"
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
          <label>Pakartokite slaptažodį</label>

          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <div className="formControl">
          <input type="submit" className="btn-dark" value="Registruotis" />
        </div>
      </form>
    </div>
  );
};

export default Register;
