import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import { Routes, Route } from 'react-router-dom';
import LibroDetalle from './pages/LibroDetalle';
import AltaLibro from './pages/AltaLibro'
// import { ContactPage } from './pages/ContactPage'; <-- agregar

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/catalogo"    element={<Catalogo />} />
        <Route path="/libros/:id"  element={ <LibroDetalle/>} />
        <Route path="/altaLibro"  element= {<AltaLibro/>} />
      </Routes> 
    </Layout>

  );
}

export default App;
