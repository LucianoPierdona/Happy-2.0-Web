import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";

import SideBarAdmin from "../components/SideBarAdmin";
import { mapIcon } from "../utils/mapIcon";
import NoContentIcon from "../assets/NoOrphanages.svg";
import api from "../services/api";

interface RestrictedAccessListProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  is_accepted: boolean;
}

const RestrictedAccessPendents = () => {
  const [orphanages, setOrphanages] = useState<RestrictedAccessListProps[]>([]);

  useEffect(() => {
    api.get("orphanages/list/pendents").then((res) => {
      setOrphanages(res.data);
    });
  }, []);

  return (
    <>
      <SideBarAdmin activeS="active" />
      <div className="list-content">
        <div className="list-header">
          <h1>Orfanatos Pendentes</h1>
          <p>{orphanages.length} Orfanatos Pendentes</p>
        </div>
        <hr />

        {orphanages.length !== 0 ? (
          orphanages.map((orphanage) => {
            return (
              <div className="list-orphanages">
                <div className="map-card" key={orphanage.id}>
                  <Map
                    center={[orphanage.latitude, orphanage.longitude]}
                    zoom={16}
                    style={{ width: "100%", height: 280 }}
                    dragging={false}
                    touchZoom={false}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    doubleClickZoom={false}
                  >
                    <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker
                      interactive={false}
                      icon={mapIcon}
                      position={[orphanage.latitude, orphanage.longitude]}
                    />
                  </Map>
                  <div className="footer-card">
                    <h1 className="card-name">{orphanage.name}</h1>
                    <div className="card-buttons">
                      <Link to={`/restricted-access/edit/${orphanage.id}`}>
                        <FiArrowRight size={20} color="#15C3D6" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-content">
            <img src={NoContentIcon} alt="no content" />
            <p>Nenhum Orfanato Pendente</p>
          </div>
        )}
      </div>
    </>
  );
};

export default RestrictedAccessPendents;
