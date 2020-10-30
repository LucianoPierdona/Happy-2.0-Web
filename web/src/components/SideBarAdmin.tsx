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

  const firstIsActive = activeF ? activeF : "not-active";
  const secondIsActive = activeS ? activeS : "not-active";

  const firstColorActive = activeF ? "#12afcb" : "#FFF";
  const secondColorActive = activeS ? "#12afcb" : "#FFF";

  return (
    <aside>
      <img src={mapMarkerImg} alt="Happy" />

      <main>
        <button
          type="button"
          className={`button-side-bar first ${firstIsActive}`}
        >
          <FiMapPin size={24} color={firstColorActive} />
        </button>
        <button type="button" className={`button-side-bar ${secondIsActive}`}>
          <FiAlertCircle size={24} color={secondColorActive} />
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
