import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";

export default function HeaderComponent() {
  return (
    <Container>
      <Row>
        <header>
          <h1>ProductWeb</h1>
          <p>Sitio para gestionar mis productos</p>
        </header>
      </Row>
    </Container>
  );
}