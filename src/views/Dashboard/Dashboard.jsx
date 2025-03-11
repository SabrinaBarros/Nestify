import app from "../../../firebaseConfig";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import "./dashboard.css"
import loading from "../../assets/bouncing-circles.svg"

const Dashboard = () => {

  const [clients, setClients] = useState({});

  const db = getDatabase(app);
  const collectionRef = ref(db, "clients");

  useEffect(() => {

    onValue(collectionRef, snapshot => {
      setClients(snapshot.val());
    });

  }, []);

  const clientsIds = Object.keys(clients);

  const $clientList = clientsIds.map((clientId) => {
    const client = clients[clientId];

    return (
      <Card key={clientId}>
        <h2 className="dashboard__card__title">{client.name}</h2>
        <ul className="dashboard__card__list">
          <li className="dashboard__card__item"><b>CNPJ:</b> {client.cnpj}</li>
          <li className="dashboard__card__item"><b>E-mail:</b> {client.email}</li>
          <li className="dashboard__card__item"><b>Telefone:</b> {client.phone}</li>
        </ul>
      </Card>
    )

  });

  return (
    <>
      <Header/>

      <section className="card-container">
        { !$clientList.length ? <img className="dashboard__loading" src={loading} alt="Carregando." /> : $clientList }
      </section>

    </>
  )
};

export default Dashboard;
