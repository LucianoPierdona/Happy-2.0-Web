import React, { useEffect, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import api from "../services/api";
import "../styles/pages/edit-orphanage.css";
import { mapIcon } from "../utils/mapIcon";
import Cookie from "js-cookie";
import { FiAlertCircle, FiCheck } from "react-icons/fi";

interface OrphanageProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  description: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  phone: string;
}

interface OrphanageParams {
  id: string;
}

const EditOrphanage = () => {
  const history = useHistory();
  if (!Cookie.get("token")) history.push("/");

  const { id } = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<OrphanageProps>();
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  useEffect(() => {
    api.get(`orphanages/${id}`).then((res) => {
      console.log(res.data);
      setOrphanage(res.data);
      setOpenOnWeekends(res.data.open_on_weekends);
      res.data.images.map((image: any) => {
        setPreviewImages([...previewImages, image.url]);
      });
    });
  }, [id]);

  const deleteOrphanage = () => {
    api.delete(`orphanage/delete/${id}`).then((res) => {
      history.push("/restricted-access/pendents");
    });
  };

  const acceptOrphanage = () => {
    console.log("clicked");
    api.post(`orphanage/accept/${id}`).then((res) => {
      history.push("/restricted-access/");
    });
  };

  if (!orphanage) {
    return <div>Loading.</div>;
  }

  return (
    <>
      <SideBar />
      <div className="edit-content">
        <div className="edit-header">
          <h1>Orfanato {orphanage.name} pendente</h1>
        </div>
        <div className="edit-subtitle">
          <h1>Dados</h1>
          <hr />
        </div>

        <div className="create-orphanage-form">
          <fieldset>
            <Map
              center={[-28.8571443, -51.2827246]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                interactive={false}
                icon={mapIcon}
                position={[orphanage.latitude, orphanage.longitude]}
              />
            </Map>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <p>{orphanage.name}</p>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre</label>
              <p>{orphanage.about}</p>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>
              <div className="images-container">
                {previewImages?.map((image) => {
                  console.log(image);
                  return <img key={image} src={image} alt={orphanage.name} />;
                })}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <p>{orphanage.instructions}</p>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Abertura</label>
              <p>{orphanage.opening_hours}</p>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">WhatsApp</label>
              <p>{orphanage.phone}</p>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <div className="pendent-buttons">
            <button
              className="delete-button"
              type="submit"
              onClick={deleteOrphanage}
            >
              <FiAlertCircle size={20} color="#FFF" />
              Recusar
            </button>
            <button
              className="confirm-button"
              type="submit"
              onClick={acceptOrphanage}
            >
              <FiCheck size={20} color="#FFF" />
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditOrphanage;
