import { LeafletMouseEvent } from "leaflet";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory, useParams } from "react-router-dom";
import { createNoSubstitutionTemplateLiteral } from "typescript";
import SideBar from "../components/SideBar";
import api from "../services/api";
import "../styles/pages/edit-orphanage.css";
import { mapIcon } from "../utils/mapIcon";

interface OrphanageProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  phone: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

const EditOrphanage = () => {
  const history = useHistory();
  const { id } = useParams<OrphanageParams>();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [phone, setPhone] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(false);

  useEffect(() => {
    api.get(`orphanages/${id}`).then((res) => {
      console.log(res.data);
      const {
        about,
        instructions,
        latitude,
        longitude,
        name,
        open_on_weekends,
        opening_hours,
        phone,
        images,
      } = res.data;

      images.map((image: any) => {
        setPreviewImages([...previewImages, image.url]);
      });
      setName(name);
      setInstructions(instructions);
      setOpenOnWeekends(open_on_weekends);
      setAbout(about);
      setPosition({ latitude, longitude });
      setPhone(phone);
      setOpeningHours(opening_hours);
    });
  }, []);

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  // Send the data to the database
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(event);

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("phone", phone);
    data.append("open_on_weekends", String(open_on_weekends));
    images.forEach((image) => {
      data.append("images", image);
    });

    try {
      await api.post("/orphanages/create", data);
      alert("Cadastro realizado com sucesso!");
      history.push("/");
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <SideBar />
      <div className="edit-content">
        <div className="edit-header">
          <h1>Editar Perfil de {name}</h1>
        </div>
        <div className="edit-subtitle">
          <h1>Dados</h1>
          <hr />
        </div>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="create-orphanage-form"
        >
          <fieldset>
            <Map
              center={[-28.8571443, -51.2827246]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="name"
                maxLength={300}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages?.map((image) => {
                  console.log(image);
                  return <img key={image} src={image} alt={name} />;
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Abertura</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={(e) => setOpeningHours(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">WhatsApp</label>
              <input
                id="whatsapp"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </div>
    </>
  );
};

export default EditOrphanage;
