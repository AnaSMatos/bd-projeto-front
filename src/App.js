import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Books from "./Components/Books";
import Materials from "./Components/Materials";
import Autentication from "./Components/Autentication";
import Header from "./Components/Header";
import SignUp from "./Components/CreateAccount";
import '../src/Assets/reset.css'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/livros" element={<Books />} />
            <Route path="/materiais" element={<Materials />} />
            <Route path="/auth" element={<Autentication />} />
            <Route path="/criar-conta" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
