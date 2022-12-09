import { FormEvent, ChangeEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import warningIcon from "../../assets/images/icons/warning.svg";
import Select from "../../components/Select";
import api from "../../services/api";

import "./styles.css";

type IScheduleItem = {
  week_day: string;
  from: string;
  to: string;
};

export default function TeacherForm() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    avatar: "",
    whatsapp: "",
    bio: "",
    subject: "",
    cost: "",
  });

  const [scheduleItems, setScheduleItems] = useState<IScheduleItem[]>([
    { week_day: "", from: "", to: "" },
  ]);

  function handleAddNewScheduleItem() {
    setScheduleItems((currentScheduleItms) => {
      return [...currentScheduleItms, { week_day: "", from: "", to: "" }];
    });
  }

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  }

  function setScheduleItemValue(value: string, name: string, position: number) {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (position !== index) return scheduleItem;

      return { ...scheduleItem, [name]: value };
    });

    setScheduleItems(newArray);
  }

  function onChangeTextarea(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  }

  function onChangeSelect(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
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

  async function handleCreateClass(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post("classes", {
        ...values,
        cost: Number(values.cost),
        schedule: scheduleItems,
      });

      alert("Cadastro realizado com sucesso");

      navigate("/");
    } catch (error) {
      alert("Erro ao cadastrar");
    }
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição."
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              label="Nome completo"
              name="name"
              value={values.name}
              onChange={onChangeInput}
            />
            <Input
              label="Avatar"
              name="avatar"
              value={values.avatar}
              onChange={onChangeInput}
            />
            <Input
              label="Whatsapp"
              name="whatsapp"
              value={values.whatsapp}
              onChange={onChangeInput}
            />
            <Textarea
              label="Biografia"
              name="bio"
              value={values.bio}
              onChange={onChangeTextarea}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              options={selectSubjects}
              label="Matéria"
              name="subject"
              value={values.subject}
              onChange={onChangeSelect}
            />
            <Input
              label="Custo da sua hora/aula"
              name="cost"
              value={values.cost}
              onChange={onChangeInput}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button onClick={handleAddNewScheduleItem} type="button">
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map(({ week_day, from, to }, index) => {
              return (
                <div key={week_day} className="schedule-item">
                  <Select
                    value={week_day}
                    options={weekDays}
                    label="Dia da semana"
                    name="week_day"
                    onChange={(e) =>
                      setScheduleItemValue(e.target.value, "week_day", index)
                    }
                  />
                  <Input
                    value={from}
                    label="Das"
                    name="from"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(e.target.value, "from", index)
                    }
                  />
                  <Input
                    value={to}
                    label="Até"
                    name="to"
                    type="time"
                    onChange={(e) =>
                      setScheduleItemValue(e.target.value, "to", index)
                    }
                  />
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante <br />
              Preencha todos os dados
            </p>

            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
