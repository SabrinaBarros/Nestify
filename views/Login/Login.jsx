import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Navigate, NavLink} from "react-router-dom";
import app from "../../../firebaseConfig";
import Card from "../../components/Card/Card";
import "./login.css"

const Login = () => {

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginState, setLoginState] = useState(null);

  const auth = getAuth(app);

  const handleUserEmail = (e) => setUserEmail(e.target.value);
  const handleUserPassword = (e) => setUserPassword(e.target.value);

  const login = () => {

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(() => {

        setLoginState('success')

      })
      .catch((error) => {

        console.error(error.code)
        console.error(error.message)

        setLoginState('error');

      });

  };

  const keyDownLogin = e => {
    if (e.key === 'Enter') {
      login();
    }
  }

  if(loginState === 'success') return (<Navigate to="/dashboard" />);

  return (
    <main className="login">

      <Card>
        <h1 className="login-title">Nestify</h1>

        <label className="login__input-label" htmlFor="userEmail"> Usuário </label>

        <input
          className="login-input"
          id="userEmail"
          type="email"
          placeholder="E-mail"
          value={userEmail}
          onChange={handleUserEmail}
          onKeyDown={keyDownLogin}
        />

        <label className="login__input-label" htmlFor="userPassword"> Senha </label>

        <input
          className="login-input"
          id="userPassword"
          type="password"
          placeholder="Senha"
          value={userPassword}
          onChange={handleUserPassword}
          onKeyDown={keyDownLogin}
        />

        <button
          className="button"
          onClick={login}
          disabled={!(userEmail && userPassword)}
        >
          Entrar 
        </button>

        { loginState === 'error' && (<span className="invalid-user"> Usuário e/ou senha inválidos. </span>) }

      </Card>
    </main>
  )

};

export default Login;
