import { useState, useEffect } from 'react';
import {Routes, Route, NavLink} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ProtectedRouter from "./components/ProtectedRouter";
import Login from "./views/Login/Login";
import Dashboard from "./views/Dashboard/Dashboard";
import Error404 from "./views/Error404";
import './App.css';

const App = () => {

  const [logged, setLogged] = useState(true);

  return (
    <>
      <Routes>

        <Route path="/" element={<Login/>}></Route>

        <Route path="/dashboard" element={
          <ProtectedRouter logged={logged} setLogged={setLogged}>
            <Dashboard/>
          </ProtectedRouter>
        }></Route>

        <Route path="*" element={<Error404 />}/>

      </Routes>
    </>
  )

};

export default App;
