"use client";

import {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {FloatingLabel, FormControl, FormGroup, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useRouter} from "next/navigation";
import NavbarComponent from "productWeb/components/shared/navbar/page";

export default function UserProfile(props) {
  const {email} = props.params || null;
  const router = useRouter();

  /**
   * Set the state for Register Page
   */
  let [firstname, setFirstname] = useState();
  let [lastname, setLastname] = useState();
  let [phone, setPhone] = useState();
  let [userUpdate, setUserUpdate] = useState(undefined);

  let [editUserFlag, setEditUserFlag] = useState(true);

  let [show, setShow] = useState(false);

  useEffect(() => {
    console.log(email)
    if (email && userUpdate === undefined && editUserFlag === true) {
      const userSession = JSON.parse(localStorage.getItem('user')) || null;
      console.log(userSession)
      if (userSession) {
        setUserUpdate(userSession);
        setEditUserFlag(true);
        setFirstname(userSession.firstname);
        setLastname((userSession.lastname));
        setPhone(userSession.phone);
      }
    }
  }, []);

  useEffect(() => {
    userUpdate && editUserFlag !== true && update();
  }, [userUpdate]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
   * @description this method use for send to server and update and localStorage
   */
  const update = () => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = sessionStorage.getItem('token') || null;
    // URL of the JSON data
    const url = `http://localhost:3001/api/v1/users/${email}/update`;

    if (userUpdate && email && user && token) {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` || ''
        },
        body: JSON.stringify(userUpdate)
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
          localStorage.setItem('user', JSON.stringify(
            {
              email: data.email,
              firstname: data.firstname,
              lastname: data.lastname,
              phone: data.phone,
              status: data.status,
              id: data.id
            }));
          setEditUserFlag(true);
        })
        .catch(error => {
          // Handle the error
          console.error('There has been a problem with your fetch operation:', error);
        });
    } else {
      setEditUserFlag(true);
    }
  };

  /**
   * @method
   * @description this method use for delete user on server and remove localStorage and sessionStorage
   */
  const deleteUser = () => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const token = sessionStorage.getItem('token') || null;
    // URL of the JSON data
    const url = `http://localhost:3001/api/v1/users/${email}/delete`;

    if (userUpdate && email && user && token) {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` || ''
        }
      })
        .then(data => {
          // Use the JSON data
          localStorage.removeItem('user');
          sessionStorage.removeItem('token');
          setEditUserFlag(true);
          setShow(false);
          router.push('/');
        })
        .catch(error => {
          // Handle the error
          console.error('There has been a problem with your fetch operation:', error);
        });
    } else {
      setEditUserFlag(true);
    }
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
        firstname: firstname,
        lastname: lastname,
        phone: phone,
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
    userUpdate && console.log(userUpdate)
    setUserUpdate(buildData({
      firstname: firstname, lastname: lastname, phone: phone
    }));
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
                  value={email && userUpdate && userUpdate.email}
                  disabled={true}
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
                  onChange={event => {
                    onChange(event, setFirstname, wordToCapitalize)
                  }}
                  value={firstname}
                  disabled={editUserFlag}
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
                  onChange={event => {
                    onChange(event, setLastname, wordToCapitalize)
                  }}
                  value={lastname}
                  disabled={editUserFlag}
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
                  onChange={event => {
                    onChange(event, setPhone, null)
                  }}
                  value={phone}
                  disabled={editUserFlag}
                />
              </FloatingLabel>
            </FormGroup>
            {
              email && userUpdate && editUserFlag ?
                <Button
                  variant="info"
                  type="button"
                  onClick={event => setEditUserFlag(false)}>
                  Editar usuario
                </Button> :
                <div>
                  <Button variant="primary" type="button" onClick={getFormData}>
                    Actualizar usuario
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={event => setEditUserFlag(true)}>
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={event => setShow(true)}>
                    Eliminar
                  </Button>
                </div>
            }
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Atencion</Modal.Title>
              </Modal.Header>
              <Modal.Body>esta seguro de eliminar el
                usuario <strong>{userUpdate && userUpdate.email}</strong></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="danger" onClick={deleteUser}>
                  Aceptar
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}