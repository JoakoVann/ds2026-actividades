import { Container } from 'react-bootstrap';

export default function SinPermiso() {
  return (
    <Container className="py-5 text-center" style={{ marginTop: '70px' }}>
      <h1 className="h2">Sin permiso</h1>
      <p>No tenés permisos para acceder a esta página.</p>
    </Container>
  );
}