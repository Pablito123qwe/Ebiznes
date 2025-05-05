import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function Koszyk() {
  const { koszyk, setKoszyk } = useContext(AppContext);

  const usun = (id) => {
    setKoszyk(koszyk.filter(p => p.id !== id));
  };

  const suma = koszyk.reduce((s, p) => s + p.cena, 0).toFixed(2);

  return (
    <div>
      <h1>Koszyk</h1>
      {koszyk.length === 0 ? (
        <p>Twój koszyk jest pusty.</p>
      ) : (
        <ul>
          {koszyk.map((p, i) => (
            <li key={i}>
              {p.nazwa} – {p.cena} zł
              <button onClick={() => usun(p.id)}>Usuń</button>
            </li>
          ))}
        </ul>
      )}
      <p><strong>Suma:</strong> {suma} zł</p>
    </div>
  );
}
