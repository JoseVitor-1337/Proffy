import React from "react";

import "./style.css";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars3.githubusercontent.com/u/59937924?s=460&v=4"
          alt="github"
        />
        <div>
          <strong>Nome do professor</strong>
          <span>Materia</span>
        </div>
      </header>

      <p>
        To sem criatividade para criar um título
        <br></br>
        <br></br>
        Qualquer coisa sobre ser um professor e passar assuntos do ensino médio
        provavelmente, afinal para o momento em que estamos passando, é uma boa
        ideia a metodologia de estudos online
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 50,00</strong>
        </p>
        <button>
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
