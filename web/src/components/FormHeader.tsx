import React from "react";
import { EditOrphanagePage } from "../styles/pages/edit-orphanage";

const FormHeader: React.FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <div className="edit-header">
        <h1>Perfil de {name}</h1>
      </div>
      <div className="edit-subtitle">
        <h1>Dados</h1>
        <hr />
      </div>
    </>
  );
};

export default FormHeader;
