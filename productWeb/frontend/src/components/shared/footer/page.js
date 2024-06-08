import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function FooterComponent() {

  return (
    <Container>
      <footer>
        <Row>
          <Col>
            <span>Creado en 2024 &copy;</span>
          </Col>
        </Row>
      </footer>
    </Container>
  );
}