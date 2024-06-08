"use client";

import {useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from "next/navigation";
import NavbarComponent from "productWeb/components/shared/navbar/page";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Login() {

  /**
   * Set the state for Login Page
   */
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    user && login();
  }, [user]);

  /**
   *
   * @param event
   * @param setValue
   * @param callback
   */
  const onChange = (event, setValue, callback) => {
    if (callback !== null) {
      setValue(callback(event.target.value));
    } else {
      setValue(event.target.value);
    }
  };

  /**
   * @method
   * @param word
   * @returns {string|undefined}
   * @description this method use for encoded a word in base64
   */
  const encodeBase64 = word => {
    let encodedStringBtoA = undefined;
    if (word !== null && word !== undefined && word.length > 0) {
      encodedStringBtoA = btoa(word);
    }

    return encodedStringBtoA;
  };

  /**
   * @method
   * @description this method use for send to server and save on sessionStorage API
   */
  const login = () => {
    // URL of the JSON data
    const url = 'http://localhost:3001/api/v1/users/authenticate';

    // Use fetch() to get the data
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        // Check if the request was successful
        if (response) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        // Use the JSON data
        console.log(data);
        sessionStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(
          {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            phone: data.phone,
            status: data.status,
            id: data.id
          }));
        router.push("/");
      })
      .catch(error => {
        // Handle the error
        console.error('There has been a problem with your fetch operation:', error);
      });
  };

  /**
   * @method
   * @param data
   * @description this method use for build data for send to server
   */
  const buildData = data => {
    let buildData = null;

    if (data !== null && data !== undefined) {
      buildData = {
        email: data.email,
        password: data.password
      }
    }

    return buildData;
  };

  /**
   * @method
   * @description this method use for get data from the HTML inputs,
   * also through convert to JSON object for next time send to any server
   */
  const getFormData = () => {
    setUser(buildData({email: email, password: password}));

  };

  return (
    <Container>
      <Row>
        <NavbarComponent/>
      </Row>
      <Row>
        <Col lg={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                onChange={(event) => onChange(event, setEmail, null)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=" Ingrese su Password"
                onChange={(event) => onChange(event, setPassword, encodeBase64)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={getFormData}>
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}