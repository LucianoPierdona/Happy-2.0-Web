import React from "react";
import Cookie from "js-cookie";
import { Link, useHistory, useParams } from "react-router-dom";
import DeleteIcon from "../assets/DeleteIcon.svg";
import api from "../services/api";

import { DeleteBlock } from "../styles/pages/delete";

interface OrphanageParams {
  id: string;
  name: string;
}

const DeleteOrphanage = () => {
  const history = useHistory();
  if (!Cookie.get("token")) {
    history.push("/");
  }

  const { id, name } = useParams<OrphanageParams>();

  const deleteOrphanage = () => {
    api.delete(`/orphanage/delete/${id}`).then((res) => {
      alert("Orfanato Excluido com sucesso!");
      history.push("/restricted-access");
    });
  };

  return (
    <DeleteBlock>
      <div className="delete-content">
        <h1>Excluir!</h1>
        <p>Você tem certeza que quer excluir {name}?</p>
        <div className="delete-buttons">
          <Link to="/restricted-access">Voltar</Link>
          <button onClick={deleteOrphanage}>Excluir</button>
        </div>
      </div>
      <img src={DeleteIcon} alt="delete" />
    </DeleteBlock>
  );
};

export default DeleteOrphanage;
