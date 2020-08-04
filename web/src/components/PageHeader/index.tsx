import React from "react";
import { Link } from "react-router-dom";

import "./style.css";

import logo from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

interface Props {
  title: string;
}

const PageHeader: React.FC<Props> = ({ title, children }) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <img src={logo} alt="Logo" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>

        {children}
      </div>
    </header>
  );
};

export default PageHeader;
