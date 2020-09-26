import React, { useState, FormEvent } from "react";

import "./style.css";

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import api from "../../services/api";

export interface ITeachers {
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
  subject: string;
  cost: string;
  id: string;
}

const TeacherList = () => {
  const [teachers, setTeachers] = useState<ITeachers[]>([]);

  const [subject, setSubject] = useState(``);
  const [weekDay, setWeekDay] = useState(``);
  const [time, setTime] = useState(``);

  async function serchTeachers(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.get("/classes", {
        params: {
          subject,
          weekDay,
          time,
        },
      });

      console.log(response.data);
      setTeachers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os professores disponíveis">
        <form id="search-teachers" onSubmit={serchTeachers}>
          <Select
            label="Matéria"
            name="subject"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "Ciências", label: "Ciências" },
              { value: "Português", label: "Português" },
              { value: "Matemática", label: "Matemática" },
              { value: "História", label: "História" },
              { value: "Química", label: "Química" },
              { value: "Biologia", label: "Biologia" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "Filosofia", label: "Filosofia" },
              { value: "Religião", label: "Religião" },
              { value: "Educação física", label: "Educação física" },
            ]}
          />
          <Select
            label="Dia da semana"
            name="weekDay"
            value={weekDay}
            onChange={(event) => setWeekDay(event.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            label="Hora"
            name="time"
            value={time}
            onChange={(event) => {
              setTime(event.target.value);
            }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher, index) => (
          <TeacherItem key={index} teacher={teacher} />
        ))}
      </main>
    </div>
  );
};

export default TeacherList;
