import WhatsappIcon from "../../assets/images/icons/whatsapp.svg";
import { ITeacher } from "../../pages/TeacherList";
import api from "../../services/api";

import "./styles.css";

interface ITeacherItemProps {
  teacher: ITeacher;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ teacher }) => {
  const createConnection = () => {
    api.post("/connections", {
      user_id: teacher.id,
    });
  };

  return (
    <section>
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
            Preço/hora <strong>R$ {teacher.cost}</strong>
          </p>
          <a
            onClick={createConnection}
            href={`https://api.whatsapp.com/send?phone=${teacher.whatsapp}`}
            type="button"
            target="_blank"
            rel="noreferrer"
          >
            <img src={WhatsappIcon} alt="Whatsapp" />
            Entrar em contato
          </a>
        </footer>
      </article>
    </section>
  );
};

export default TeacherItem;
