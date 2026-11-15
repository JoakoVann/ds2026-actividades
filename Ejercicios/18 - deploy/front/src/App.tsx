import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import { Navigate, Route, Routes } from 'react-router-dom';
import LibroDetalle from './pages/LibroDetalle';
import AltaLibro from './pages/AltaLibro';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import SinPermiso from './pages/SinPermiso';
// import { ContactPage } from './pages/ContactPage'; <-- agregar

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/libros/nuevo" element={<PrivateRoute rol="ADMIN" />}>
          <Route index element={<AltaLibro />} />
        </Route>
        <Route path="/altaLibro" element={<Navigate to="/libros/nuevo" replace />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sin-permiso" element={<SinPermiso />} />
      </Route>
    </Routes>

  );
}

export default App;
