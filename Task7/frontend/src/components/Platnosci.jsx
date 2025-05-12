import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Platnosci() {
  const { koszyk } = useContext(AppContext);

  const zaplac = () => {
    fetch("http://localhost:8080/platnosc", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dane: koszyk })
    }).then(() => alert("Płatność wysłana!"));
  };

  return (
    <div>
      <h1>Płatności</h1>
      <button onClick={zaplac} disabled={koszyk.length === 0}>
        Zapłać
      </button>
    </div>
  );
}
