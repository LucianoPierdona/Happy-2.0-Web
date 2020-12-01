import React, { useEffect, useState } from "react";
import mapMarkerImg from "../assets/Local.svg";
import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { mapIcon } from "../utils/mapIcon";
import api from "../services/api";

import { PageMap } from "../styles/pages/orphanages-map";

// Orphanage Icon Props
interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  is_accepted: boolean;
}

// Orphanages Map Locations
const OrphanagesMap = () => {
  // Initial Data
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  // Get all the lists from the database
  useEffect(() => {
    api.get("orphanages").then((res) => {
      setOrphanages(res.data);
    });
  }, []);

  return (
    <PageMap>
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />
          <h1>Escolha um orfanato no mapa</h1>
          <p>Muitas crianças estão esperando a sua visita :{")"}</p>
        </header>
        <footer>
          <strong>Antônio Prado</strong>
          <strong>Rio Grande Do Sul</strong>
        </footer>
      </aside>
      <Map
        center={[-28.8571443, -51.2827246]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {orphanages.map((orphanage) => {
          // if (!orphanage.is_accepted) return;

          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </PageMap>
  );
};

export default OrphanagesMap;
