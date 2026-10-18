import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { useAuth, type Rol } from '../context/AuthContext';

type PrivateRouteProps = { rol?: Rol };

export default function PrivateRoute({ rol }: PrivateRouteProps) {
  const { cargando, estaAutenticado, tieneRol } = useAuth();

  if (cargando) {
    return (
      <div className="d-flex justify-content-center py-5" role="status" aria-label="Cargando sesión">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!estaAutenticado) return <Navigate to="/login" replace />;
  if (rol && !tieneRol(rol)) return <Navigate to="/sin-permiso" replace />;
  return <Outlet />;
}