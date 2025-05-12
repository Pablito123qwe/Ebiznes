import { useEffect, useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Produkty() {
  const [produkty, setProdukty] = useState([]);
  const { koszyk, setKoszyk } = useContext(AppContext);

  useEffect(() => {
    fetch("http://localhost:8080/produkty")
      .then((res) => res.json())
      .then((data) => setProdukty(data.produkty)); // jeśli backend zwraca { produkty: [...] }
  }, []);

  const dodaj = (produkt) => {
    setKoszyk([...koszyk, produkt]);
  };

  return (
    <div>
      <h1>Produkty</h1>
      <ul>
        {produkty.map((p) => (
          <li key={p.id}>
            {p.nazwa} – {p.cena} zł
            <button onClick={() => dodaj(p)}>Dodaj</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
