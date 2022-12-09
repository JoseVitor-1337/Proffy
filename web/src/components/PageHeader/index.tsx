import { Link } from "react-router-dom";
import "./styles.css";

import LogoImage from "../../assets/images/logo.svg";
import BackIcon from "../../assets/images/icons/back.svg";
import { ReactElement } from "react";

type IPageHeaderProps = {
  title: string;
  description?: string;
  children?: ReactElement;
};

export default function PageHeader({
  children,
  title,
  description,
}: IPageHeaderProps) {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={BackIcon} alt="Voltar" />
        </Link>

        <img src={LogoImage} alt="Logo" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
}
