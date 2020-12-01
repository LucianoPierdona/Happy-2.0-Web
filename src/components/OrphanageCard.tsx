import React, { useEffect } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import { FiArrowRight, FiEdit3, FiTrash } from "react-icons/fi";
import { mapIcon } from "../utils/mapIcon";
import { MapCard } from "../styles/components/orphanage-card";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import api from "../services/api";
import { useState } from "react";

interface RestrictedAccessListProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  type: string;
}

const OrphanageCard: React.FC<RestrictedAccessListProps> = ({
  type,
  name,
  id,
  latitude,
  longitude,
}) => {
  const [adminRights, setAdminRights] = useState(false);

  useEffect(() => {
    const token = Cookie.getJSON("token");
    const { email }: any = jwt.decode(token);
    api.get(`user/${email}`).then((res) => {
      setAdminRights(res.data.user.admin_rights);
    });
  }, []);

  const showButtons =
    adminRights && type === "accepted" ? (
      <div className="card-buttons accepted">
        <Link to={`/restricted-access/edit/${id}`}>
          <FiEdit3 size={20} color="#15C3D6" />
        </Link>
        <Link to={`/restricted-access/delete/${id}/${name}`}>
          <FiTrash size={20} color="#15C3D6" />
        </Link>
      </div>
    ) : adminRights && type === "pendent" ? (
      <div className="card-buttons pendents">
        <Link to={`/restricted-access/pendents/${id}`}>
          <FiArrowRight size={20} color="#15C3D6" />
        </Link>
      </div>
    ) : null;

  return (
    <>
      <MapCard key={id}>
        <Map
          center={[latitude, longitude]}
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
            position={[latitude, longitude]}
          />
        </Map>
        <div className="footer-card">
          <h1 className="card-name">{name}</h1>
          {showButtons}
        </div>
      </MapCard>
    </>
  );
};

export default OrphanageCard;
