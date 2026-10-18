import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Header from './Header';
import { useAuth, type Rol, type Usuario } from '../../context/AuthContext';

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

function renderHeader(rol: Rol) {
  const usuario: Usuario = {
    id: 1,
    email: 'ana@example.com',
    nombre: 'Ana',
    rol,
  };

  vi.mocked(useAuth).mockReturnValue({
    usuario,
    cargando: false,
    estaAutenticado: true,
    tieneRol: (rolBuscado) => usuario.rol === rolBuscado,
    login: vi.fn(),
    logout: vi.fn(),
  });

  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
}

describe('Header según el rol', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('muestra la opción para crear libros al administrador', () => {
    renderHeader('ADMIN');

    expect(screen.getByRole('link', { name: 'Nuevo libro' })).toBeTruthy();
  });

  it('oculta la opción para crear libros al cliente', () => {
    renderHeader('CLIENTE');

    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).toBeNull();
  });
});
