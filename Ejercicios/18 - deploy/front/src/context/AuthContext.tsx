import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { apiFetch, AUTH_UNAUTHORIZED_EVENT } from '../services/api';

export type Rol = 'ADMIN' | 'CLIENTE';

export type Usuario = {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
};

type Credenciales = { email: string; password: string };
type LoginResponse = { token: string; usuario: Usuario };

type AuthContextValue = {
  usuario: Usuario | null;
  cargando: boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(() => Boolean(localStorage.getItem('token')));

  useEffect(() => {
    const cerrarSesion = () => {
      localStorage.removeItem('token');
      setUsuario(null);
      setCargando(false);
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, cerrarSesion);
    return () => window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, cerrarSesion);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('token')) return;

    let activa = true;
    apiFetch<Usuario>('/auth/yo')
      .then((usuarioActual) => {
        if (activa) setUsuario(usuarioActual);
      })
      .catch(() => {
        if (activa) setUsuario(null);
      })
      .finally(() => {
        if (activa) setCargando(false);
      });

    return () => {
      activa = false;
    };
  }, []);

  const login = async (credenciales: Credenciales) => {
    const respuesta = await apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });
    localStorage.setItem('token', respuesta.token);
    setUsuario(respuesta.usuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        login,
        logout,
        estaAutenticado: usuario !== null,
        tieneRol: (rol) => usuario?.rol === rol,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
}