import React, { useEffect, useState } from "react";

import "../styles/pages/restricted-access-list.css";

import SideBarAdmin from "../components/SideBarAdmin";
import api from "../services/api";
import { Map, Marker, TileLayer } from "react-leaflet";
import { mapIcon } from "../utils/mapIcon";
import { FiEdit3, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import NoContentIcon from "../assets/NoOrphanages.svg";

interface RestrictedAccessListProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  is_accepted: boolean;
}

export default function RestrictedAccess() {
  const [orphanages, setOrphanages] = useState<RestrictedAccessListProps[]>([]);

  useEffect(() => {
    api.get("orphanages/list/accepted").then((res) => {
      setOrphanages(res.data);
    });
  }, []);

  return (
    <>
      <SideBarAdmin activeF="active" />
      <div className="list-content">
        <div className="list-header">
          <h1>Orfanatos Cadastrados</h1>
          <p>{orphanages.length} Orfanatos Cadastrados</p>
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
                        <FiEdit3 size={20} color="#15C3D6" />
                      </Link>
                      <Link
                        to={`/restricted-access/delete/${orphanage.id}/${orphanage.name}`}
                      >
                        <FiTrash size={20} color="#15C3D6" />
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
            <p>Nenhum Orfanato Encontrado</p>
          </div>
        )}
      </div>
    </>
  );
}
