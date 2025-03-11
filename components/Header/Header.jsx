import "./header.css";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {

  const auth = getAuth();

  return (
    <div className="header-container">
      <header className="header">

        <h1 className="header__title"> Restaurantes </h1>

        <button className="button" onClick={() => signOut(auth)}> Sair </button>

      </header>
    </div>
  )
};

export default Header