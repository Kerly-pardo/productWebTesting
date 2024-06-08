import styles from "./page.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from "react-bootstrap/Alert";
import NavbarHomeComponent from "productWeb/components/shared/navbarHome/page";

export default function Home() {
  return (
    <Container>
      <section id="content" className={styles.content}>
        <Row>
          <Col>
            <Alert  variant="primary">
              Bienvenido a ProductWeb
            </Alert>
          </Col>
          <Col>
            <NavbarHomeComponent/>
          </Col>
        </Row>
      </section>
    </Container>
  );
}
