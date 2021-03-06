import { LeafletMouseEvent } from "leaflet";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useHistory, useParams } from "react-router-dom";
import SideBar from "../components/SideBar";
import api from "../services/api";
import { mapIcon } from "../utils/mapIcon";
import Cookie from "js-cookie";

import { EditOrphanagePage } from "../styles/pages/edit-orphanage";
import { PageCreateOrphanage } from "../styles/pages/create-orphanage";

import FormHeader from "../components/FormHeader";

interface OrphanageParams {
  id: string;
}

const EditOrphanage = () => {
  const history = useHistory();
  if (!Cookie.get("token")) history.push("/");

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
        setPreviewImages((oldImages) => [...oldImages, image.url]);
        setImages((oldImages) => [...oldImages, image.url]);
        return console.log(image);
      });
      setName(name);
      setInstructions(instructions);
      setOpenOnWeekends(open_on_weekends);
      setAbout(about);
      setPosition({ latitude, longitude });
      setPhone(phone);
      setOpeningHours(opening_hours);
    });
  }, [id]);

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

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append("id", id);
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
    console.log(data);

    try {
      await api.post("/orphanage/edit", data);
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
      <EditOrphanagePage>
        <FormHeader name={name} />
        <PageCreateOrphanage>
          <main>
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
          </main>
        </PageCreateOrphanage>
      </EditOrphanagePage>
    </>
  );
};

export default EditOrphanage;
