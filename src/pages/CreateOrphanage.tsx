import React, { FormEvent, useState, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";

import { FiPlus, FiX } from "react-icons/fi";

import SideBar from "../components/SideBar";
import { mapIcon } from "../utils/mapIcon";
import api from "../services/api";
import { useHistory } from "react-router-dom";

import { PageCreateOrphanage } from "../styles/pages/create-orphanage";

interface previewImagesProps {
  name: string;
  url: string;
}

// Create Orphanage page
export default function CreateOrphanage() {
  const history = useHistory();
  // Initial Map Position
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  // Form Data
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<previewImagesProps[]>([]);
  const [phone, setPhone] = useState("");

  // set the location when users click on the map
  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setPosition({
      latitude: lat,
      longitude: lng,
    });
  }

  // add the selected images to the array to save when the form is submitted
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return {
        name: image.name,
        url: URL.createObjectURL(image),
      };
    });

    setPreviewImages(selectedImagesPreview);
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
      history.push("/success");
    } catch (err) {
      if (err) {
        console.log(err);
      }
    }
  }

  return (
    <PageCreateOrphanage>
      <SideBar />
      <main>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="create-orphanage-form"
        >
          <fieldset>
            <legend>Dados</legend>

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
                {previewImages.map((image) => {
                  return (
                    <div className="image-card" key={image.name}>
                      <img src={image.url} alt={name} />
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => {
                          const removedImageArray = previewImages.filter(
                            (imagePreview) => {
                              if (imagePreview !== image) {
                                return imagePreview;
                              }
                              return null;
                            }
                          );

                          const filteredImages = images.filter((imageArr) => {
                            return imageArr.name !== image.name;
                          });

                          setImages(filteredImages);
                          setPreviewImages(removedImageArray);

                          console.log(previewImages);
                          console.log(images);
                        }}
                      >
                        <FiX size={20} color="#FF669D" />
                      </button>
                    </div>
                  );
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
      </main>
    </PageCreateOrphanage>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
