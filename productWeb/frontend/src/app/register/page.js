"use client";

import {useEffect, useState} from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {FloatingLabel, FormCheck, FormControl, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/navigation";
import NavbarComponent from "productWeb/components/shared/navbar/page";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function Register() {
  /**
   * Set the state for Register Page
   */
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [firstname, setFirstname] = useState();
  let [lastname, setLastname] = useState();
  let [phone, setPhone] = useState();
  let [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    user && register();
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
   * @returns {string|null}
   * @description this method use for capitalize a word
   */
  const wordToCapitalize = word => {
    let toCapitalize = null;
    if (word !== null && word !== undefined && word.length > 0) {
      toCapitalize = word[0].toUpperCase() + word.slice(1);
    }

    return toCapitalize;
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
  const register = () => {
    // URL of the JSON data
    const url = 'http://localhost:3001/api/v1/users/create';

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
        localStorage.setItem('user', JSON.stringify(data));
        router.push("/login");
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
        email: email,
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        password: password
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
    setUser(buildData({email: email, firstname: firstname, lastname: lastname, phone: phone, password: password}));
  };

  return (
    <Container>
      <Row>
        <NavbarComponent/>
      </Row>
      <Row>
        <Col lg={6}>
          <Form>
            <FormGroup className="mb-3" controlId="emailId">
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingese el email"
                  onChange={event => { onChange(event, setEmail, null) }}
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup className="mb-3" controlId="firstnameId">
              <FloatingLabel
                controlId="firstnameId"
                label="Nombre(s)"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese el nombre"
                  onChange={event => { onChange(event, setFirstname, wordToCapitalize) }}
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup className="mb-3" controlId="lastnameId">
              <FloatingLabel
                controlId="lastnameId"
                label="Apellido(s)"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese Apellido"
                  onChange={event => { onChange(event, setLastname, wordToCapitalize) }}
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup className="mb-3" controlId="phoneId">
              <FloatingLabel
                controlId="phoneId"
                label="Telefono"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Ingrese Telefono"
                  onChange={event => { onChange(event, setPhone, null) }}
                />
              </FloatingLabel>
            </FormGroup>

            <FormGroup className="mb-3" controlId="passwordId">
              <FloatingLabel
                controlId="passwordId"
                label="Password"
                className="mb-3"
              >
              <FormControl
                type="password"
                placeholder="Password"
                onChange={(event) => onChange(event, setPassword, encodeBase64)}
              />
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBasicCheckbox">
              <FormCheck type="checkbox" label="Acepto terminos y condiciones"/>
            </FormGroup>
            <Button variant="primary" type="button" onClick={getFormData}>
              Crear cuenta
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}