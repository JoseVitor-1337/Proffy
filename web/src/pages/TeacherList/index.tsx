import "./styles.css";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

export default function TeacherList() {
  return (
    <main id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis">
        <form id="search-teaches">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject" />
          </div>

          <div className="input-block">
            <label htmlFor="week_day">Dia da semana</label>
            <input type="text" id="week_day" />
          </div>

          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input type="text" id="time" />
          </div>
        </form>
      </PageHeader>

      <TeacherItem />
      <TeacherItem />
      <TeacherItem />
      <TeacherItem />
      <TeacherItem />
      <TeacherItem />
      <TeacherItem />
    </main>
  );
}
