import Layout from './components/Layout/Layout';
import Home from './pages/Home';
// import Libros from './pages/LibrosCatalogo';
import { Routes, Route } from 'react-router-dom';
// import { ContactPage } from './pages/ContactPage'; <-- agregar

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"            element={<Home />} />
        {/* <Route path="/catalogo"    element={<Libros />} /> */}
        {/* <Route path="/contacto"    element={<ContactPage />} /> */}
      </Routes>
    </Layout>

  );
}

export default App;
