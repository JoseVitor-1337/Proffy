import { useMemo, useState } from "react";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import warningIcon from "../../assets/images/icons/warning.svg";
import Select from "../../components/Select";

import "./styles.css";

type IScheduleItem = {
  week_day: string;
  from: string;
  to: string;
};

export default function TeacherForm() {
  const defaultScheduleItem = useMemo(() => {
    return { week_day: "", from: "", to: "" };
  }, []);

  const [scheduleItems, setScheduleItems] = useState<IScheduleItem[]>([
    defaultScheduleItem,
  ]);

  function handleAddNewScheduleItem() {
    setScheduleItems((currentScheduleItms) => {
      return [...currentScheduleItms, defaultScheduleItem];
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
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <fieldset>
          <legend>Seus dados</legend>

          <Input label="Nome completo" name="name" />
          <Input label="Avatar" name="avatar" />
          <Input label="Whatsapp" name="whatsapp" />
          <Textarea label="Biografia" name="bio" />
        </fieldset>

        <fieldset>
          <legend>Sobre a aula</legend>

          <Select options={selectSubjects} label="subject" name="Matéria" />
          <Input label="cost" name="Custo da sua hora/aula" />
        </fieldset>

        <fieldset>
          <legend>
            Horários disponíveis
            <button onClick={handleAddNewScheduleItem} type="button">
              + Novo horário
            </button>
          </legend>

          {scheduleItems.map(({ week_day, from, to }) => (
            <div key={week_day} className="schedule-item">
              <Select
                value={week_day}
                options={weekDays}
                label="Dia da semana"
                name="week_day"
              />
              <Input value={from} label="Das" name="from" type="time" />
              <Input value={to} label="Até" name="to" type="time" />
            </div>
          ))}
        </fieldset>

        <footer>
          <p>
            <img src={warningIcon} alt="Aviso importante" />
            Importante <br />
            Preencha todos os dados
          </p>

          <button type="button">Salvar cadastro</button>
        </footer>
      </main>
    </div>
  );
}
