import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Produkty from "./components/Produkty";
import Koszyk from "./components/Koszyk";
import Platnosci from "./components/Platnosci";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Produkty</Link> |{" "}
        <Link to="/koszyk">Koszyk</Link> |{" "}
        <Link to="/platnosci">Płatności</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Produkty />} />
        <Route path="/koszyk" element={<Koszyk />} />
        <Route path="/platnosci" element={<Platnosci />} />
      </Routes>
    </Router>
  );
}

export default App;
