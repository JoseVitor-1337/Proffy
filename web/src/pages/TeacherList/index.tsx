import "./styles.css";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { useMemo } from "react";

export default function TeacherList() {
  const selectSubjects = useMemo(() => {
    return [
      { label: "Artes", value: "Artes" },
      { label: "Matemática", value: "Matemática" },
      { label: "Geografia", value: "Geografia" },
      { label: "História", value: "História" },
      { label: "Português", value: "Português" },
      { label: "Química", value: "Química" },
      { label: "Biologia", value: "Biologia" },
      { label: "Filosofia", value: "Filosofia" },
      { label: "Física", value: "Física" },
    ];
  }, []);

  const weekDays = useMemo(() => {
    return [
      { label: "Domingo", value: "0" },
      { label: "Segunda-feira", value: "1" },
      { label: "Terça-feira", value: "2" },
      { label: "Quarta-feira", value: "3" },
      { label: "Quinta-feira", value: "4" },
      { label: "Sexta-feira", value: "5" },
      { label: "Sábado", value: "6" },
    ];
  }, []);

  return (
    <main id="page-teacher-list" className="container">
      <PageHeader title="Esses são os proffys disponíveis">
        <form id="search-teaches">
          <Select options={selectSubjects} label="Matéria" name="subject" />
          <Select options={weekDays} label="Dia da semana" name="week_day" />
          <Input type="time" label="Hora" name="time" />
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
