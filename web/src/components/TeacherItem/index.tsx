import React from "react";

import "./style.css";

import { ITeachers } from "../../pages/TeacherList";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import api from "../../services/api";

interface IProps {
  teacher: ITeachers;
}

const TeacherItem: React.FC<IProps> = ({ teacher }) => {
  function createNewConnection() {
    api.post("/connections", {
      user_id: teacher.id,
    });
  }
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ {teacher.cost}</strong>
        </p>
        <a
          onClick={createNewConnection}
          href={`https://wa.me/${teacher.whatsapp}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
