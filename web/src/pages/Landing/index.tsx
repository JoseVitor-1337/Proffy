import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import LogoImage from "../../assets/images/logo.svg";
import LandingImage from "../../assets/images/landing.svg";

import StudyIcon from "../../assets/images/icons/study.svg";
import GiveClassesIcon from "../../assets/images/icons/give-classes.svg";
import PurpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import api from "../../services/api";

export default function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    async function loadAsyncFunction() {
      const response = await api.get("/connections");

      setTotalConnections(response?.data?.total || 0);
    }

    loadAsyncFunction();
  }, []);

  return (
    <main id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={LogoImage} alt="Logo" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={LandingImage}
          alt="Plataform de estudos online"
          className="hero-image"
        />

        <div className="buttons-container">
          <Link to="teacher-list" className="study">
            <img src={StudyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to="teacher-form" className="give-classes">
            <img src={GiveClassesIcon} alt="Dar Aulas" />
            Dar Aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{" "}
          <img src={PurpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </main>
  );
}
