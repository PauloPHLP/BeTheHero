import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";
import heroes from "../../assets/heroes.png";
import logo from "../../assets/logo.svg";
import "./styles.css";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      console.log(response)
      
      localStorage.setItem("ngoId", id);
      localStorage.setItem("ngoName", response.data.ngo.name);

      history.push("/profile");
    } catch {
      alert("Erro no login. Tente novamente.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
          <img src={logo} alt="Be The Hero."/>
          <form onSubmit={handleLogin}>
            <h1>Faça seu logon</h1>
            <input 
              placeholder="Seu ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <button type="submit" className="button">Entrar</button>
            <Link to="/register" className="back-link">
              <FiLogIn size={16} color="#E02041"></FiLogIn>
              Não tenho cadastro
            </Link>
          </form>
      </section>
      <img src={heroes} alt="Heroes."/>
    </div>
  );
}