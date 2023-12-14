import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Books from "./Components/Books";
import BookDetails from "./Components/Books/BookDetails";
import MaterialDetails from "./Components/Materials/MaterialDetails";
import Materials from "./Components/Materials";
import Autentication from "./Components/Autentication";
import Header from "./Components/Header";
import SignUp from "./Components/CreateAccount";
import Emprestimos from "./Components/Emprestimos";
import UserContext from "./UserContext";
import '../src/Assets/reset.css'
import { useState } from "react";

function App() {
  const [user, setUser] = useState({})
  return (
    <UserContext.Provider value={{user, setUser}}>
      <BrowserRouter>
        <div>
          <Header/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/livros" element={<Books />} />
              <Route path="/livro/:id" element={<BookDetails/>}/>
              <Route path="/materiais" element={<Materials />} />
              <Route path="/material/:id" element={<MaterialDetails/>}/>
              <Route path="/auth" element={<Autentication />} />
              <Route path="/emprestimos" element={<Emprestimos />} />
              <Route path="/criar-conta" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
