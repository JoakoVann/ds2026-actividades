import { useState, type FormEvent } from 'react';
import { z } from 'zod';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';

const loginSchema = z.object({
  email: z.string().trim().email('Ingresá un email válido.'),
  password: z.string().min(1, 'La contraseña es obligatoria.'),
});

type LoginData = z.infer<typeof loginSchema>;
type LoginResponse = { token: string };

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginData>({ email: '', password: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors as Partial<Record<keyof LoginData, string>>);
      return;
    }

    setErrors({});
    setServerError(null);
    setLoading(true);
    try {
      const response = await apiFetch<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(result.data),
      });
      localStorage.setItem('token', response.token);
      navigate('/catalogo');
    } catch (reason: unknown) {
      setServerError(reason instanceof Error ? reason.message : 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ marginTop: '70px', maxWidth: '520px' }}>
      <Card className="shadow-sm p-4">
        <Card.Body>
          <h1 className="h2 mb-4">Iniciar sesión</h1>
          {serverError && <Alert variant="danger">{serverError}</Alert>}
          <Form onSubmit={submit} noValidate>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                isInvalid={Boolean(errors.email)}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={form.password}
                isInvalid={Boolean(errors.password)}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit" disabled={loading} className="w-100">
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
