import React, { useEffect, useState } from "react";

import SideBarAdmin from "../components/SideBarAdmin";

import NoContentIcon from "../assets/NoOrphanages.svg";
import api from "../services/api";

import OrphanageCard from "../components/OrphanageCard";
import { ListContent } from "../styles/pages/restricted-access";

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
      <ListContent>
        <div className="list-header">
          <h1>Orfanatos Pendentes</h1>
          <p>{orphanages.length} Orfanatos Pendentes</p>
        </div>
        <hr />

        {orphanages.length !== 0 ? (
          <div className="list-orphanages">
            {orphanages.map((orphanage) => {
              return (
                <OrphanageCard
                  key={orphanage.id}
                  type="pendent"
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
            <p>Nenhum Orfanato Pendente</p>
          </div>
        )}
      </ListContent>
    </>
  );
};

export default RestrictedAccessPendents;
