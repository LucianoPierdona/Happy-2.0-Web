import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import mapMarkerImg from "../assets/Local.svg";
import { useHistory } from "react-router-dom";

import "../styles/components/side-bar.css";

// Left Bar Component
export default function SideBar() {
  const { goBack } = useHistory();
  return (
    <aside>
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
