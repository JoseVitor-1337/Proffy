import { FormEvent, ChangeEvent, useMemo, useState } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

import "./styles.css";

export interface ITeacher {
  id: number;
  cost: number;
  name: string;
  subject: string;
  avatar: string;
  bio: string;
  whatsapp: string;
}

export default function TeacherList() {
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [filters, setFilters] = useState({
    subject: "",
    week_day: "",
    time: "",
  });

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFilters({ ...filters, [name]: value });
  }

  function onChangeSelect(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;

    setFilters({ ...filters, [name]: value });
  }

  function handleSearchTeachers(event: FormEvent) {
    event.preventDefault();

    api
      .get("/classes", { params: filters })
      .then((response) => {
        setTeachers(response.data.classes);
      })
      .catch(() => {
        alert("Erro ao filtrar");
      });
  }

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
        <form id="search-teachers" onSubmit={handleSearchTeachers}>
          <Select
            options={selectSubjects}
            label="Matéria"
            name="subject"
            value={filters.subject}
            onChange={onChangeSelect}
          />
          <Select
            options={weekDays}
            label="Dia da semana"
            name="week_day"
            value={filters.week_day}
            onChange={onChangeSelect}
          />
          <Input
            type="time"
            label="Hora"
            name="time"
            value={filters.time}
            onChange={onChangeInput}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      {teachers.map((teacher) => (
        <TeacherItem key={teacher.id} teacher={teacher} />
      ))}
    </main>
  );
}
