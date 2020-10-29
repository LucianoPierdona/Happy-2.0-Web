import React from "react";
import { FiAlertCircle, FiLogOut, FiMapPin } from "react-icons/fi";
import Cookie from "js-cookie";
import mapMarkerImg from "../assets/Local.svg";

import "../styles/components/side-bar-admin.css";
import { useHistory } from "react-router-dom";

interface SideBarProps {
  activeF?: string;
  activeS?: string;
}
// Left Bar Component
const SideBarAdmin: React.FC<SideBarProps> = ({ activeF, activeS }) => {
  const history = useHistory();

  function logoutUser() {
    Cookie.remove("token");
    history.push("/");
  }

  return (
    <aside>
      <img src={mapMarkerImg} alt="Happy" />

      <main>
        <button type="button" className={`${activeF} first`}>
          <FiMapPin size={24} color={activeF ? "#0089A5" : "#FFF"} />
        </button>
        <button type="button" className={`${activeS}`}>
          <FiAlertCircle size={24} color={activeS ? "#0089A5" : "#FFF"} />
        </button>
      </main>

      <footer>
        <button type="button" onClick={logoutUser}>
          <FiLogOut size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
};

export default SideBarAdmin;
