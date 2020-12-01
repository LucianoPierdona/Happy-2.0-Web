import React, { useEffect, useState } from "react";

import SideBarAdmin from "../components/SideBarAdmin";
import api from "../services/api";

import NoContentIcon from "../assets/NoOrphanages.svg";
import OrphanageCard from "../components/OrphanageCard";

import { ListContent } from "../styles/pages/restricted-access";

interface RestrictedAccessListProps {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  is_accepted: boolean;
  type: string;
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
      <ListContent>
        <div className="list-header">
          <h1>Orfanatos Cadastrados</h1>
          <p>{orphanages.length} Orfanatos Cadastrados</p>
        </div>
        <hr />

        {orphanages.length !== 0 ? (
          <div className="list-orphanages">
            {orphanages.map((orphanage) => {
              return (
                <OrphanageCard
                  key={orphanage.id}
                  type="accepted"
                  name={orphanage.name}
                  id={orphanage.id}
                  latitude={orphanage.latitude}
                  longitude={orphanage.longitude}
                />
              );
            })}
          </div>
        ) : (
          <div className="no-content">
            <img src={NoContentIcon} alt="no content" />
            <p>Nenhum Orfanato Encontrado</p>
          </div>
        )}
      </ListContent>
    </>
  );
}
