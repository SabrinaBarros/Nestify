import React, { useEffect } from 'react';
import {Navigate} from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRouter = ({children, logged, setLogged}) => {

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, user => setLogged(user));
  }, []);

  if(logged) return (<>{children}</>);

  return (<Navigate to="/" />);

}
  
export default ProtectedRouter;
