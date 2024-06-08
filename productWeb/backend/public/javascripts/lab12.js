/**
 *     @author Alejandro Romero <alejo8591@gmail.com>
 *     @fileOverview This script use Function & Scopes in JS
 *     @licence BSD 3-Clause License
 */

// declaration vars
let email = null;
let firstname = null;
let lastName = null;
let phone = null;
let password = null;
let user = {};
const COUNTRY_CODE = "+57";

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
 * @param data
 * @returns {Object|null}
 * @description this method use for build data for send to backend
 */
const buildData = data => {
  let buildData = null;

  if (data !== null && data !== undefined) {
    buildData = {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastName,
      phone: `${COUNTRY_CODE}${data.phone}`,
      password: data.password
    }
  }

  return buildData;
};

/**
 * @method
 * @returns {Object|null}
 * @description this method use for send data to backend
 */
const saveUser = () => {
  const url = 'http://localhost:3000/api/v1/users/create';

// Use fetch() to get the data
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'backend/json'
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
    })
    .catch(error => {
      // Handle the error
      console.error('There has been a problem with your fetch operation:', error);
    });
};

/**
 * @method
 * @returns {Object}
 * @description this method use for get data from the HTML inputs,
 * also through convert to JSON object for next time send to any server
 */
const getDataFormMyForm = () => {

  //1. first step load data from html
  const floatingInputEmail = document.getElementById("floatingInputEmail").value;
  const floatingInputName = document.getElementById("floatingInputName").value;
  const floatingInputLastname = document.getElementById("floatingInputLastname").value;
  const floatingInputPhone = document.getElementById("floatingInputPhone").value;
  const floatingPassword = document.getElementById("floatingPassword").value;


  //2. sanitize data
  email = floatingInputEmail;
  firstname = wordToCapitalize(floatingInputName);
  lastName = wordToCapitalize(floatingInputLastname);
  phone = floatingInputPhone;
  password = encodeBase64(floatingPassword);

  // 3. prepare to send
  user = buildData({firstname: firstname, lastName: lastName, phone: phone, password: password, email: email});

  debugger

  // 4. send data
  saveUser();
};

