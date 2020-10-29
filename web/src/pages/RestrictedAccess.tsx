import React, { useEffect, useState } from "react";

import "../styles/pages/restricted-access-list.css";

import SideBarAdmin from "../components/SideBarAdmin";
import api from "../services/api";

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
      </div>
    </>
  );
}
