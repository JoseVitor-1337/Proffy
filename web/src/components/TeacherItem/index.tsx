import WhatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

export default function TeacherItem() {
  return (
    <section>
      <article className="teacher-item">
        <header>
          <img
            src="https://randomuser.me/api/portraits/men/86.jpg"
            alt="John Doe"
          />
          <div>
            <strong>John Doe</strong>
            <span>Quimica</span>
          </div>
        </header>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, est!
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          officiis quo, sit tempora libero voluptatum magni suscipit
          perspiciatis beatae autem! Magni fuga illo voluptatibus ducimus vel,
          molestiae commodi sed quibusdam?
        </p>

        <footer>
          <p>
            Preço/hora <strong>R$ 80,00</strong>
          </p>
          <button type="button">
            <img src={WhatsappIcon} alt="Whatsapp" />
            Entrar em contato
          </button>
        </footer>
      </article>
    </section>
  );
}
